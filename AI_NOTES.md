# AI Collaboration & Project Notes

**Proje:** Murat Dokuz - Sınıf Öğretmeni (Öğrenci & Veli Platformu)
**Altyapı:** Next.js 16 (App Router), React 19, Vanilla CSS (Tailwind KULLANILMIYOR)
**Tasarım Dili:** Derin Kırmızı (Kardinal), Turkuaz (Teal) ve Kirli Beyaz (Soft Gray). Modern, yumuşak geçişli ve güven veren bir UI.
**GitHub Repo:** `https://github.com/ozandokuz/muratdokuz.com`
**Canlı Site (Vercel):** `main` branch'e her push'ta otomatik deploy.

**Son güncelleme:** 15 Temmuz 2026

> **Kurallar için `AGENTS.md`'ye bak.** Bu dosya sadece *güncel durum* ve *yapılacaklar* içindir.

---

## 🔴 Projenin Aşaması (ÖNCE BUNU OKU)

Proje **test aşamasında**. Canlıda olması bilinçli bir tercih — Ozan test edebilmek için istedi.

- **Domain HENÜZ BAĞLI DEĞİL.** Site sadece Vercel'in geçici adresinden erişilebiliyor, kimse URL'yi bilmiyor.
- **Domain bağlanması en son adım.** Domain bağlanmadan önce aşağıdaki "Domain öncesi zorunlu" listesi bitmiş olmalı.
- Bu yüzden Firestore'un test modunda olması şu an **kabul edilmiş bir risk**, acil değil. Ama gerçek veli trafiği gelmeden kapatılacak.

---

## ✅ Mevcut Durum

### Sayfalar ve Rotalar
- `/` — Ana Sayfa. Duyurular Firebase'den ✅ dinamik. Ödev bölümü ⚠️ hâlâ statik şablon.
- `/duyurular` — ✅ Firebase'den dinamik, çalışıyor.
- `/odevler` — ⚠️ Statik. Hardcoded "11-15 Nisan Haftası" gösteriyor.
- `/sorular` — ⚠️ Statik. "İndir (PDF)" butonları hiçbir şey yapmıyor.
- `/sorular/[id]` — ⚠️ Statik, dosya içinde mock veri objesi var (`matematik`, `turkce`, `fen-bilimleri`).
- `/hakkimda` — Statik biyografi (zaten dinamik olması gerekmiyor).
- `/admin` — ✅ Firebase Auth ile giriş çalışıyor.
- `/admin/dashboard` — ✅ Duyuru + Haftalık Ödev **ekleme** formları çalışıyor. Listeleme/silme yok.

### Firebase (`src/lib/firebase.js`)
- **Proje:** `muratdokuz-f8e5b`
- **Auth:** E-posta/Şifre aktif. Yönetici: `admin@muratdokuz.com`
- **Firestore:** ⚠️ **Test modunda** (şema için `AGENTS.md`'ye bak).
- **Storage:** Kurulmadı (Spark planında ücretli). PDF'ler `public/` klasöründen servis edilecek.

---

## 🚧 Yapılacaklar

### Domain öncesi zorunlu (domain bağlanmadan bunlar bitecek)

1. **Firestore güvenlik kurallarını yaz.** Şu an test modu: internetteki herkes `duyurular`/`odevler` koleksiyonuna yazabilir ve silebilir — admin girişi güvenlik sağlamıyor, güvenlik Firestore kurallarında yaşar. Hedef kural: *herkes okur, sadece giriş yapmış admin yazar.*
   - **İkinci ve daha sinsi sebep:** Test modu kuralları ~30 gün sonra kendiliğinden expire olur ve **tüm okumaları reddeder**. O gün site hata vermez, sadece "Henüz duyuru bulunmuyor" gösterir (çünkü `catch` bloğu sadece `console.error` yapıyor). Yani veriler duruyorken site sessizce boşalmış görünür. Kural yazılırken hata mesajı da UI'ya bağlanmalı.

### Öncelikli özellikler

2. **`/odevler` sayfasını Firebase'e bağla:** `odevler` koleksiyonundan en güncel haftayı çekip listele. Admin formu hazır, sadece okuma yazılacak. Ana sayfadaki statik ödev bloğu da (`src/app/page.js` içindeki `hw-grid`) buradan beslenmeli.
3. **`/sorular` ve `/sorular/[id]` sayfalarını Firebase'e bağla:** `sorular` koleksiyonu oluştur — her belge bir soru bankası: `{ title, subject, description, pdfUrl }`. `pdfUrl`, `public/` klasöründeki dosyayı işaret eder (örn. `/matematik-test-1.pdf`). Admin paneline ekleme formu da yazılacak.
4. **Admin Paneli - Listeleme & Silme:** Formlar sadece ekleme yapıyor. Ekli duyuru/ödevleri listeleyen, yanında "Sil" butonu olan bir sekme eklenmeli.

### İkincil

5. **İletişim Formu:** Veliler için `EmailJS` veya `Resend` ile.

---

## 🧹 Teknik Borç (15 Temmuz 2026 kod incelemesinde çıktı)

Hiçbiri siteyi bozmuyor, ama biriktikçe iş çıkarır:

- **Tailwind hâlâ kurulu.** `package.json`'da `tailwindcss` + `@tailwindcss/postcss` var ve `postcss.config.mjs` her build'de çalıştırıyor — "Tailwind YOK" kuralına rağmen. `create-next-app` kalıntısı, temizlenecek.
- **Inline style dağınıklığı.** `AGENTS.md` "stiller globals.css'te" diyor ama sayfalar inline `style={{...}}` dolu. İki sistem karışmış; renk değiştirmek için hem CSS değişkenine hem onlarca dosyaya dokunmak gerekiyor. Yeni kod yazarken globals.css'e class ekle, inline'ı çoğaltma.
- **Her sayfa `"use client"`.** Duyurular server component'te çekilse SEO kazanılır ve "Yükleniyor..." flaşı kalkar. Next 16'nın asıl kozu kullanılmıyor. Domain bağlanmadan önce en azından `/duyurular` server'a alınabilir.
- **`storage` boşuna export ediliyor.** `src/lib/firebase.js:21` — Storage kurulmadı ama modül yine de import ediliyor, bundle'a yük.
- **`alert()` ile bildirim.** Admin panelinde ekleme sonrası `alert()` kullanılıyor. Çalışıyor ama kaba.
- **Eski yorum:** `src/app/sorular/[id]/page.js` içindeki yorum "Next 15 compatibility" diyor, proje Next 16.

---

## 📁 Dosya Yapısı (Özet)

```
muratdokuz.com/
├── public/
│   └── ataturk.jpg             # Ana sayfa hero arka planı
├── src/
│   ├── app/
│   │   ├── globals.css         # Tüm stiller burada olmalı (bkz. teknik borç)
│   │   ├── layout.js           # Navbar (ortak) burada
│   │   ├── page.js             # Ana Sayfa - duyurular dinamik, ödevler statik
│   │   ├── duyurular/page.js   # ✅ Firebase'den dinamik
│   │   ├── odevler/page.js     # ⚠️ Statik
│   │   ├── sorular/
│   │   │   ├── page.js         # ⚠️ Statik
│   │   │   └── [id]/page.js    # ⚠️ Statik + mock veri
│   │   ├── hakkimda/page.js
│   │   └── admin/
│   │       ├── page.js         # ✅ Firebase Auth girişi
│   │       └── dashboard/page.js  # ✅ Duyuru + Ödev ekleme
│   └── lib/
│       └── firebase.js         # Firebase config ve export'lar
├── AGENTS.md                   # Kalıcı kurallar (Claude + AGY ortak)
├── CLAUDE.md                   # AGENTS.md + AI_NOTES.md'yi import eder
├── AI_NOTES.md                 # Bu dosya — güncel durum
└── package.json
```

---

*Not: Bu projeyi farklı AI asistanlar (Gemini/Antigravity veya Claude) dönüşümlü geliştirebilir. Bu dosya her iki tarafın da anlayacağı şekilde güncel tutulmalı ve **her zaman GitHub'a push edilmeli** — yerel makine kaybolabilir, repo tek gerçek kaynaktır. Yeni özellik eklendiğinde burayı güncelle. Vanilla CSS kuralına kesinlikle uy, Tailwind ekleme.*
