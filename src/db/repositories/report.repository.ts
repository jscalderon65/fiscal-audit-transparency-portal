import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
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

export async function uploadReportPdfWithProgress(
  buildingCode: string,
  reportId: string,
  file: File,
  onProgress: (progress: number) => void
): Promise<string> {
  const storageRef = ref(storage, `buildings/${buildingCode}/reports/${reportId}.pdf`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        onProgress(Math.round(progress * 100));
      },
      (error) => reject(error),
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadUrl);
      }
    );
  });
}

export async function updateReport(id: string, data: Partial<BuildingReport>): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), data);
}

export async function deleteReport(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}

export async function downloadPdf(url: string, filename: string): Promise<void> {
  try {
    const response = await fetch(`${url}?alt=media`);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = blobUrl;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(blobUrl);
  } catch {
    window.open(url, "_blank");
  }
}
