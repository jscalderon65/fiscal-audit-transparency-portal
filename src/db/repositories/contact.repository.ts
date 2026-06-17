import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "../config";

const COLLECTION = "contactMessages";

export interface ContactMessage {
  id?: string;
  name: string;
  unit: string;
  message: string;
  buildingCode: string;
  createdAt?: any;
}

export async function saveContactMessage(data: Omit<ContactMessage, "id" | "createdAt">): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as ContactMessage));
}
