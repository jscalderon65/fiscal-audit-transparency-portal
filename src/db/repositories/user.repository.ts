import { doc, getDoc, setDoc, writeBatch } from "firebase/firestore";
import { db } from "../config";
import type { User } from "../types/user";

const COLLECTION = "users";

export async function getUserByCedula(cedula: string): Promise<User | null> {
  const snapshot = await getDoc(doc(db, COLLECTION, cedula));
  if (!snapshot.exists()) return null;
  return snapshot.data() as User;
}

export async function createUser(user: User): Promise<void> {
  await setDoc(doc(db, COLLECTION, user.cedula), user);
}

export async function importUsers(users: User[]): Promise<void> {
  const batch = writeBatch(db);
  for (const user of users) {
    batch.set(doc(db, COLLECTION, user.cedula), user);
  }
  await batch.commit();
}
