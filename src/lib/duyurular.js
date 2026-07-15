import { collection, getDocs, deleteDoc, doc, query, orderBy, limit } from "firebase/firestore";
import { db } from "./firebase";

// adet verilmezse tüm duyuruları, yeniden eskiye döner.
export async function getDuyurular(adet) {
  const kisitlar = [orderBy("date", "desc")];
  if (adet) kisitlar.push(limit(adet));

  const snapshot = await getDocs(query(collection(db, "duyurular"), ...kisitlar));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function silDuyuru(id) {
  await deleteDoc(doc(db, "duyurular", id));
}
