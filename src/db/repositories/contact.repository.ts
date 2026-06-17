import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config";

const COLLECTION = "contactMessages";

export interface ContactMessage {
  name: string;
  unit: string;
  message: string;
  buildingCode: string;
  createdAt: ReturnType<typeof serverTimestamp>;
}

export async function saveContactMessage(data: Omit<ContactMessage, "createdAt">): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}
