import { collection, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";

// targetGroup değerleri. "Genel" olanlar her iki sekmede de görünür —
// EBA gibi linkler hem öğrenciyi hem veliyi ilgilendiriyor.
export const HEDEF_GRUPLAR = ["Öğrenci", "Veli", "Genel"];

export const SEKMELER = [
  { key: "Öğrenci", label: "Öğrenciler İçin" },
  { key: "Veli", label: "Veliler İçin" },
];

export async function getBaglantilar() {
  const snapshot = await getDocs(query(collection(db, "baglantilar"), orderBy("date", "desc")));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function silBaglanti(id) {
  await deleteDoc(doc(db, "baglantilar", id));
}

export function grubaGoreFiltrele(baglantilar, sekmeKey) {
  return baglantilar.filter((b) => b.targetGroup === sekmeKey || b.targetGroup === "Genel");
}
