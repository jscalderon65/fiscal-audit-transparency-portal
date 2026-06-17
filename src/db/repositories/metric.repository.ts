import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { db } from "../config";
import type { BuildingMetric } from "../types/metric";

const COLLECTION = "metrics";

export async function getMetricsByBuildingCode(buildingCode: string): Promise<BuildingMetric[]> {
  const q = query(collection(db, COLLECTION), where("buildingCode", "==", buildingCode));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as BuildingMetric));
}

export async function createMetric(metric: BuildingMetric & { buildingCode: string }): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), metric);
  return ref.id;
}

export async function updateMetric(id: string, data: Partial<BuildingMetric>): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), data);
}

export async function deleteMetric(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}
