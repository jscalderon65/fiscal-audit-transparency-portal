import { doc, getDoc, setDoc, updateDoc, getDocs, collection, addDoc, query, where } from "firebase/firestore";
import { db } from "../config";
import type { Building } from "../types/building";

const COLLECTION = "buildings";

function formatDocument(id: string, data: Record<string, any>): Building {
  return {
    id,
    ...data,
    createdAt: data.createdAt?.toDate?.() ?? data.createdAt,
  } as Building;
}

export async function getBuildingById(id: string): Promise<Building | null> {
  const snapshot = await getDoc(doc(db, COLLECTION, id));
  if (!snapshot.exists()) return null;
  return formatDocument(snapshot.id, snapshot.data());
}

export async function getBuildingBySlug(slug: string): Promise<Building | null> {
  const q = query(collection(db, COLLECTION), where("slug", "==", slug));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return formatDocument(doc.id, doc.data());
}

export async function createBuilding(building: Omit<Building, "id">): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), building);
  return ref.id;
}

export async function updateBuilding(id: string, data: Partial<Building>): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), data);
}

export async function listBuildings(): Promise<Building[]> {
  const snapshot = await getDocs(collection(db, COLLECTION));
  return snapshot.docs.map((document) => formatDocument(document.id, document.data()));
}
