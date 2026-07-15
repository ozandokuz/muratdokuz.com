import { collection, getDocs, deleteDoc, doc, query, orderBy, limit } from "firebase/firestore";
import { db } from "./firebase";

export const GUNLER = [
  { key: "pazartesi", label: "Pazartesi" },
  { key: "sali", label: "Salı" },
  { key: "carsamba", label: "Çarşamba" },
  { key: "persembe", label: "Perşembe" },
  { key: "cuma", label: "Cuma" },
];

// Admin panelindeki form her günü tek bir textarea olarak kaydeder:
// satır başına bir görev, "Ders: açıklama" biçiminde. İki nokta yoksa
// satırın tamamı açıklama sayılır.
export function parseGorevler(metin) {
  if (!metin) return [];

  return metin
    .split("\n")
    .map((satir) => satir.trim())
    .filter(Boolean)
    .map((satir) => {
      const ayirac = satir.indexOf(":");
      if (ayirac === -1) return { ders: null, aciklama: satir };

      return {
        ders: satir.slice(0, ayirac).trim(),
        aciklama: satir.slice(ayirac + 1).trim(),
      };
    });
}

// adet verilmezse tüm haftaları, yeniden eskiye döner.
export async function getOdevler(adet) {
  const kisitlar = [orderBy("date", "desc")];
  if (adet) kisitlar.push(limit(adet));

  const snapshot = await getDocs(query(collection(db, "odevler"), ...kisitlar));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function silOdev(id) {
  await deleteDoc(doc(db, "odevler", id));
}
