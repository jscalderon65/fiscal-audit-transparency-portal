import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../config";
import type { BuildingReport } from "../types/report";

const COLLECTION = "reports";

export async function getReportsByBuildingCode(buildingCode: string): Promise<BuildingReport[]> {
  const q = query(collection(db, COLLECTION), where("buildingCode", "==", buildingCode));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), createdAt: doc.data().createdAt?.toDate?.() ?? doc.data().createdAt } as BuildingReport));
}

export async function createReport(report: BuildingReport & { buildingCode: string }): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), report);
  return ref.id;
}

export async function uploadReportPdf(buildingCode: string, reportId: string, file: File): Promise<string> {
  const storageRef = ref(storage, `buildings/${buildingCode}/reports/${reportId}.pdf`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

export async function updateReport(id: string, data: Partial<BuildingReport>): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), data);
}

export async function deleteReport(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}
