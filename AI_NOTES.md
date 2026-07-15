# AI Collaboration & Project Notes

**Proje:** Murat Dokuz - Sınıf Öğretmeni (Öğrenci & Veli Platformu)  
**Altyapı:** Next.js (App Router), Vanilla CSS (Tailwind KULLANILMIYOR)  
**Tasarım Dili:** Derin Kırmızı (Kardinal), Turkuaz (Teal) ve Kirli Beyaz (Soft Gray). Modern, yumuşak geçişli ve güven veren bir UI.  
**GitHub Repo:** `https://github.com/ozandokuz/muratdokuz.com`  
**Canlı Site (Vercel):** Vercel ile GitHub entegrasyonu kuruldu. `main` branch'e her push'ta otomatik deploy olur.

---

## ✅ Mevcut Durum (Teslim Tarihi: 15 Temmuz 2026)

### Sayfalar ve Rotalar
- `/` — Ana Sayfa (Duyurular ve Ödevler dinamik olarak Firebase'den çekiliyor)
- `/duyurular` — Tüm duyuruları Firebase'den listeleyen sayfa ✅ Dinamik
- `/odevler` — Haftalık ödev sayfası (henüz Firebase'e bağlanmadı, şablon gösteriyor)
- `/sorular` — Soru bankası ana sayfası (henüz Firebase'e bağlanmadı, statik)
- `/sorular/[id]` — Dinamik rota: Her soru bankasının detay sayfası
- `/hakkimda` — Öğretmen biyografi sayfası
- `/admin` — Şifreli yönetici giriş sayfası ✅ Firebase Auth ile çalışıyor
- `/admin/dashboard` — Yönetim Paneli (Duyuru + Haftalık Ödev formu) ✅ Firebase ile çalışıyor

### Firebase Entegrasyonu (`src/lib/firebase.js`)
- **Firebase Projesi:** `muratdokuz-f8e5b`
- **Authentication:** E-posta/Şifre ile aktif. Yönetici hesabı `admin@muratdokuz.com` kullanıcısı oluşturuldu.
- **Firestore Database:** Test modunda kuruldu.
  - `duyurular` koleksiyonu: `{ title, content, date }` alanları mevcut.
  - `odevler` koleksiyonu: `{ weekTitle, pazartesi, sali, carsamba, persembe, cuma, date }` alanları mevcut.
- **Storage:** Firebase ücretsiz planı (Spark) Storage için ücret gerektirdiğinden KURULMADI. PDF'ler `public/` klasörüne manuel eklenerek Vercel üzerinden sunulacak.

### Tasarım Detayları
- Tüm stiller `src/app/globals.css` içinde özel CSS değişkenleri ile tanımlı.
- Herhangi bir CSS framework (Tailwind vb.) KULLANILMAMAKTADIR.
- Anasayfada `public/ataturk.jpg` görseli hero bölümünde arka plan olarak kullanılıyor.

---

## 🚧 Sıradaki Hedefler (Yapılacaklar)

### Öncelikli
1. **`/odevler` sayfasını Firebase'e bağla:** `odevler` koleksiyonundan en güncel haftayı çekip listele. Admin paneli formu hazır, sadece okuma kısmı yazılacak.
2. **`/sorular` ve `/sorular/[id]` sayfalarını Firebase'e bağla:** `sorular` adlı bir koleksiyon oluştur. Her belge bir soru bankasını (kitabı) temsil etsin: `{ title, subject, description, pdfUrl }` alanlarıyla. Admin paneline de bu koleksiyona ekleme formu yazılacak.
3. **Admin Paneli - Listeleme & Silme:** Mevcut formlar sadece ekleme yapıyor. Ekli duyuruları ve ödevleri listeleyen ve yanlarında "Sil" butonu olan bir sekme eklenmeli.

### İkincil
4. **İletişim Formu:** Velilerin mesaj gönderebilmesi için `EmailJS` veya `Resend` ile çalışan bir form oluştur.
5. **Güvenlik Kuralları:** Firebase Firestore kurallarını `Test Mode`dan çıkarıp sadece admin'in yazabildiği, herkesin okuyabildiği güvenli kurallara taşı.

---

## 📁 Dosya Yapısı (Özet)

```
muratdokuz.com/
├── public/
│   └── ataturk.jpg
├── src/
│   ├── app/
│   │   ├── globals.css         # Tüm stiller burada
│   │   ├── layout.js           # Navbar (ortak) burada
│   │   ├── page.js             # Ana Sayfa - Firebase'den duyuru çekiyor
│   │   ├── duyurular/
│   │   │   └── page.js         # ✅ Firebase'den dinamik
│   │   ├── odevler/
│   │   │   └── page.js         # ⚠️ Henüz statik, bağlanacak
│   │   ├── sorular/
│   │   │   ├── page.js         # ⚠️ Henüz statik
│   │   │   └── [id]/
│   │   │       └── page.js     # ⚠️ Henüz statik
│   │   ├── hakkimda/
│   │   │   └── page.js
│   │   └── admin/
│   │       ├── page.js         # ✅ Firebase Auth ile giriş
│   │       └── dashboard/
│   │           └── page.js     # ✅ Duyuru + Ödev ekleme formu
│   └── lib/
│       └── firebase.js         # Firebase config ve export'lar
├── AI_NOTES.md                 # Bu dosya
└── package.json
```

---

*Not: Bu projeyi farklı AI asistanlar (Gemini/Antigravity veya Claude) birlikte geliştirmektedir. Bu dosya her iki tarafın da anlayabileceği şekilde güncel tutulmalıdır. Yeni özellik eklendiğinde bu dosyayı güncelle. Vanilla CSS kurallarına kesinlikle uy, Tailwind ekleme.*
