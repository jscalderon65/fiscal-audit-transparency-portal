import { doc, getDoc, setDoc, deleteDoc, getDocs, collection, query, where, writeBatch } from "firebase/firestore";
import { db } from "../config";
import type { User } from "../types/user";

const COLLECTION = "users";

export async function getUserByCedula(cedula: string): Promise<User | null> {
  const snapshot = await getDoc(doc(db, COLLECTION, cedula));
  if (!snapshot.exists()) return null;
  return snapshot.data() as User;
}

export async function getUsersByBuildingSlug(slug: string): Promise<User[]> {
  const q = query(collection(db, COLLECTION), where("buildingSlug", "==", slug));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => d.data() as User);
}

export async function createUser(user: User): Promise<void> {
  await setDoc(doc(db, COLLECTION, user.cedula), user);
}

export async function deleteUser(cedula: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, cedula));
}

export async function importUsers(users: User[]): Promise<void> {
  const batch = writeBatch(db);
  for (const user of users) {
    batch.set(doc(db, COLLECTION, user.cedula), user);
  }
  await batch.commit();
}
