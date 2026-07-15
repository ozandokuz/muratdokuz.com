import { collection, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";

// Kategoriler admin formunda seçenek olarak sunulur; yeni kategori
// eklemek için buraya yazman yeterli, sayfa filtresi kendini günceller.
export const KATEGORILER = ["Sınıf İçi", "Geziler", "Etkinlikler"];

// Tüm fotoğrafları yeniden eskiye döner.
export async function getGaleri() {
  const snapshot = await getDocs(query(collection(db, "galeri"), orderBy("date", "desc")));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function silFoto(id) {
  await deleteDoc(doc(db, "galeri", id));
}
