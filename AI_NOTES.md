# AI Collaboration & Project Notes

**Proje:** Murat Dokuz - Sınıf Öğretmeni (Öğrenci & Veli Platformu)
**Altyapı:** Next.js 16 (App Router), React 19, Vanilla CSS (Tailwind KULLANILMIYOR)
**Tasarım Dili:** Derin Kırmızı (Kardinal), Turkuaz (Teal) ve Kirli Beyaz (Soft Gray). Modern, yumuşak geçişli ve güven veren bir UI.
**GitHub Repo:** `https://github.com/ozandokuz/muratdokuz.com`
**Canlı Site (Vercel):** `https://muratdokuzcom.vercel.app` — `main`'e her push'ta otomatik deploy.

**Son güncelleme:** 16 Temmuz 2026

> **Kurallar için `AGENTS.md`'ye bak.** Bu dosya sadece *güncel durum* ve *yapılacaklar* içindir.

---

## 👉 NEREDE KALDIK (16 Tem 2026, gece)

**Sıradaki iş: soru bankasını Firebase'e bağlamak.** Sitede statik kalan tek yer orası — `/sorular` ve `/sorular/[id]` hâlâ dosyanın içindeki mock veri objesiyle çalışıyor, "İndir (PDF)" butonları hiçbir şey yapmıyor. Aşağıdaki "Yapılacaklar" listesinde 3. madde, detayı orada.

**Başlamadan önce Ozan'a sorulacak:** elinde hangi PDF'ler var? Dosyalar `public/` klasörüne konacak (Storage yok, bkz. AGENTS.md), o yüzden `pdfUrl` alanına ne yazılacağını bilmek gerekiyor.

**Ozan'da bekleyen (acil değil, ikisi de opsiyonel):**
- Cloudinary Media Library'deki iki test dosyasını silmek.
- İsterse `allowed_formats` curl'ünü çalıştırmak (aşağıda Cloudinary bölümünde).

**Bu oturumda bitenler:** ödevler Firebase'e bağlandı · admin listeleme/silme · mobil hamburger menü · galeri + faydalı bağlantılar sayfaları · Cloudinary yükleme · GitHub→Vercel otomatik deploy düzeltildi.

**Veritabanı şu an neredeyse boş:** sadece 1 duyuru ("Emeklilik Duyurusu") var; `odevler`, `galeri`, `baglantilar` boş. Sayfalar bu yüzden "henüz yok" gösteriyor — **hata değil**. Test etmek için admin panelinden içerik ekle.

---

## 🔴 Projenin Aşaması (ÖNCE BUNU OKU)

Proje **test aşamasında**. Canlıda olması bilinçli bir tercih — Ozan test edebilmek için istedi.

- **Domain HENÜZ BAĞLI DEĞİL.** Site sadece Vercel'in geçici adresinden erişilebiliyor, kimse URL'yi bilmiyor.
- **⚠️ 16 Tem 2026'da düzeltildi: GitHub → Vercel otomatik deploy aslında hiç kurulmamıştı.** Bu notlarda "her push'ta otomatik deploy olur" yazıyordu ama doğru değildi; Vercel'de tek bir manuel CLI deploy'u vardı (15 Tem 22:56) ve o tarihten sonraki hiçbir commit canlıya çıkmamıştı. Canlı site 3 saat boyunca admin paneli ve dinamik duyurular olmadan duruyordu. `vercel git connect` ile bağlandı, artık gerçekten otomatik. **Ders: "deploy oldu" varsayma, `npx vercel ls` ile deployment tarihine bak.**
- **Domain bağlanması en son adım.** Domain bağlanmadan önce aşağıdaki "Domain öncesi zorunlu" listesi bitmiş olmalı.
- Bu yüzden Firestore'un test modunda olması şu an **kabul edilmiş bir risk**, acil değil. Ama gerçek veli trafiği gelmeden kapatılacak.

---

## ✅ Mevcut Durum

### Sayfalar ve Rotalar
- `/` — Ana Sayfa. Duyurular ✅ dinamik. Ödev bölümü de ✅ dinamik (en güncel haftayı gösterir).
- `/duyurular` — ✅ Firebase'den dinamik, çalışıyor.
- `/odevler` — ✅ Firebase'den dinamik. Güncel hafta açık, geçmiş haftalar `<details>` ile açılır-kapanır.
- `/sorular` — ⚠️ Statik. "İndir (PDF)" butonları hiçbir şey yapmıyor.
- `/sorular/[id]` — ⚠️ Statik, dosya içinde mock veri objesi var (`matematik`, `turkce`, `fen-bilimleri`).
- `/galeri` — ✅ Firebase'den dinamik. KVKK uyarısı, kategori filtresi, lightbox.
- `/baglantilar` — ✅ Firebase'den dinamik. "Öğrenciler İçin" / "Veliler İçin" sekmeleri.
- `/hakkimda` — Statik biyografi (zaten dinamik olması gerekmiyor).
- `/admin` — ✅ Firebase Auth ile giriş çalışıyor.
- `/admin/dashboard` — ✅ Ekleme formları + "Yayınlanan İçerikler" listesi (onaylı silme ile) çalışıyor.

### Mobil
✅ Hamburger menü var (`src/components/Navbar.js`). **1024px** altında navbar hamburger'a dönüşür (menü 7 maddeye çıktığı için eşik 768'den yükseltildi — altında etiketler sığmıyordu), menü açılır panel olur, aktif sayfa rozetle işaretlenir. 520px altında ödev tablosu tek sütuna, galeri iki sütuna iner. Menü **client component** olduğu için `layout.js` server component kalabildi.

Menüde kısa etiket (`Galeri`, `Bağlantılar`, `Hakkımda`), sayfa başlığında tam ad (`Fotoğraf Galerisi`, `Faydalı Bağlantılar`) kullanılıyor — 7 uzun etiket masaüstünde sığmıyor.

### Firebase (`src/lib/firebase.js`)
- **Proje:** `muratdokuz-f8e5b`
- **Auth:** E-posta/Şifre aktif. Yönetici: `admin@muratdokuz.com`
- **Firestore:** ⚠️ **Test modunda** (şema için `AGENTS.md`'ye bak).
- **Veri durumu (15 Tem 2026):** `duyurular` içinde 1 kayıt var. **`odevler` koleksiyonu tamamen boş** — admin formu bugüne dek hiç kullanılmamış. Bu yüzden `/odevler` ve ana sayfanın ödev bölümü şu an "Henüz bir ödev programı yayınlanmadı" gösteriyor; bu **doğru davranış, hata değil**. Test etmek için admin panelinden bir hafta ekle.
- **Storage:** Kurulmadı (Spark planında ücretli). PDF'ler `public/` klasöründen servis edilecek.

---

## 🚧 Yapılacaklar

### Domain öncesi zorunlu (domain bağlanmadan bunlar bitecek)

1. **Firestore güvenlik kurallarını yaz.** Şu an test modu: internetteki herkes `duyurular`/`odevler` koleksiyonuna yazabilir ve silebilir — admin girişi güvenlik sağlamıyor, güvenlik Firestore kurallarında yaşar. Hedef kural: *herkes okur, sadece giriş yapmış admin yazar.*
   - **İkinci ve daha sinsi sebep:** Test modu kuralları ~30 gün sonra kendiliğinden expire olur ve **tüm okumaları reddeder**. O gün site hata vermez, sadece "Henüz duyuru bulunmuyor" gösterir (çünkü `catch` bloğu sadece `console.error` yapıyor). Yani veriler duruyorken site sessizce boşalmış görünür. Kural yazılırken hata mesajı da UI'ya bağlanmalı.

### Öncelikli özellikler

2. ~~**`/odevler` sayfasını Firebase'e bağla**~~ ✅ **Bitti (15 Tem 2026).** Detay için aşağıdaki "Ödev sistemi nasıl çalışıyor" bölümüne bak.
3. **`/sorular` ve `/sorular/[id]` sayfalarını Firebase'e bağla:** `sorular` koleksiyonu oluştur — her belge bir soru bankası: `{ title, subject, description, pdfUrl }`. `pdfUrl`, `public/` klasöründeki dosyayı işaret eder (örn. `/matematik-test-1.pdf`). Admin paneline ekleme formu da yazılacak.
4. ~~**Admin Paneli - Listeleme & Silme**~~ ✅ **Bitti (16 Tem 2026).** Dashboard'ın altında "Yayınlanan İçerikler" bölümü; her satırda tarih + Sil butonu, silmeden önce `confirm()` onayı, silince liste kendini tazeliyor.

### İkincil

5. **İletişim Formu:** Veliler için `EmailJS` veya `Resend` ile.
6. **Düzenleme (edit) özelliği:** Şu an bir duyuruyu düzeltmek için silip yeniden yazmak gerekiyor.

---

## 📐 Ödev sistemi nasıl çalışıyor

Admin panelindeki form her günü **tek bir textarea** olarak kaydeder. Ekrandaki kartlara dönüşmesi bir metin ayrıştırma kuralına dayanır — bilmeden dokunma:

- **Satır başına bir görev.** Öğretmen Enter'a basarak birden fazla ders yazar.
- **`Ders: açıklama` biçimi.** İlk iki noktadan bölünür; sol taraf kalın başlık (`<strong>`), sağ taraf açıklama olur.
  - Örnek: `📚 Türkçe: Okuma metni sayfa 45` → **📚 Türkçe** başlığı + "Okuma metni sayfa 45" metni.
- **İki nokta yoksa** satırın tamamı açıklama olarak basılır, başlık çıkmaz. (Bozulmaz, sadece kalın başlıksız görünür.)
- **Boş gün** bırakılırsa o kart "Ödev yok" gösterir.

İlgili dosyalar:
- `src/lib/odevler.js` — `GUNLER` listesi, `parseGorevler()` ayrıştırıcı, `getOdevler(adet)` sorgusu.
- `src/components/HaftaTablosu.js` — bir haftayı `hw-grid` olarak basan ortak bileşen. Hem ana sayfa hem `/odevler` bunu kullanır, tabloyu değiştireceksen tek yer burası.

Gün sırası ve renkler `globals.css`'teki `.hw-day:nth-child(n)` kurallarına bağlı — `GUNLER` dizisinin sırasını değiştirirsen renkler kayar.

---

## 🖼️ Cloudinary — fotoğraf yükleme (16 Tem 2026) ✅ ÇALIŞIYOR

Admin panelinde **"📷 Fotoğraf Seç"** butonu var; öğretmen dosyayı seçer, tarayıcıdan doğrudan Cloudinary'ye yüklenir, dönen adres `imageUrl` olarak Firestore'a yazılır.

**Ayarlar (`src/lib/cloudinary.js`):**
- Cloud name: `zchruwpo`
- Unsigned preset: `dokuzm`
- Klasör: `galeri` (preset'te tanımlı değil, **upload çağrısında `folder` parametresiyle** gönderiliyor)

**⚠️ API secret bu repoda YOK ve asla olmayacak.** Repo public. Cloud name ve preset adı gizli değil — unsigned upload'da zaten tarayıcıya gidiyorlar, her görsel URL'inde görünüyorlar. Secret sunucu tarafı imzalı işlemler için; bizim sunucumuz yok.

**Asıl kazanç — otomatik optimizasyon.** `optimizeUrl(url, genislik)` fonksiyonu URL'e `f_auto,q_auto,w_N` ekliyor. Ölçülen gerçek sonuç: 291KB'lık orijinal fotoğraf, galeri kartında **30KB** (600px), lightbox'ta **92KB** (1400px) olarak iniyor. Cloudinary'yi seçme sebebi buydu:
- Firebase Storage → Blaze planı (kredi kartı) istiyor, üstelik otomatik boyutlandırma yok.
- Vercel Blob (Hobby) → aylık **1GB trafik**, optimizasyon yok. 3MB'lık telefon fotoğraflarıyla dolu galeri ~90MB/sayfa eder → ayda ~11 görüntüleme.
- Cloudinary ücretsiz → kart yok, ~5GB depolama + 10GB trafik, optimizasyon dahil.

`optimizeUrl` Cloudinary dışı adresleri **olduğu gibi bırakır**, eski/elle girilmiş linkler bozulmaz.

**Tarayıcı tarafı kontrol var:** `dosyayiDenetle()` yüklemeden önce türü (jpg/png/webp) ve boyutu (≤10MB) kontrol ediyor. **Bu bir güvenlik sınırı değil** — kodu okuyan biri atlayabilir. Öğretmen yanlış dosya seçince boşuna yükleme yapmasın diye.

**⚠️ Preset kısıtları konulamadı — arama yapıp zaman harcamayın:** `Allowed formats` ve `Max file size` **Cloudinary'nin yeni konsolunda YOK.** Preset editörünün altı sekmesinin (General / Transform / Manage and Analyze / Optimize and Deliver / Advanced / Addons) hepsine bakıldı. Dokümantasyonda geçen "Upload Control" bölümü **eski arayüze ait**, artık öyle bir sekme yok.

Tek yol Admin API. Ozan kendi secret'ıyla şunu çalıştırabilir (secret repoya/Claude'a girmez):
```bash
curl -X PUT "https://api.cloudinary.com/v1_1/zchruwpo/upload_presets/dokuzm" \
  -u "114958297412555:SECRET" \
  -d "allowed_formats=jpg,png,webp"
```
`allowed_formats` API'de var. `max_file_size`'ın preset üzerinden ayarlanabildiği **doğrulanmadı**, kaynaklar çelişiyor.

**Karar: domain öncesine bırakıldı.** Gerekçe: koruduğu senaryo birinin siteyi bulup JS'ten preset adını çıkarıp hesaba çöp yüklemesi; domain yok, adres bilinmiyor, tarayıcı kontrolü var. Bu ölçekte öncelik değil.

**Not:** Unsigned upload ile yüklenen dosya API secret olmadan **silinemez**. Admin panelinden bir fotoğrafı silmek Firestore kaydını siler ama dosya Cloudinary'de kalır. Ücretsiz kota için sorun değil; temizlik gerekirse Cloudinary Media Library'den elle yapılır.

Kısmi çözüm mevcut ama bağlanmadı: preset'in **Advanced** sekmesindeki `Return delete token` açılırsa yükleme sonrası 10 dakika geçerli bir silme jetonu dönüyor. Formdaki "Kaldır" butonu böylece öksüz dosya bırakmaz. Sadece 10 dakikalık pencere olduğu için panelden eski fotoğrafı silmeyi çözmez. Ozan'a soruldu, öncelik verilmedi.

**Media Library'de iki test dosyası duruyor** (preset denenirken yüklendi, secret olmadığı için silinemedi): kökte `glxmiicszfj5ciwkfryr` ve `galeri/kg5glvomahbaq0y3omen`. Ozan elle silecek.

---

## 🧹 Teknik Borç (15 Temmuz 2026 kod incelemesinde çıktı)

Hiçbiri siteyi bozmuyor, ama biriktikçe iş çıkarır:

- **Tailwind hâlâ kurulu.** `package.json`'da `tailwindcss` + `@tailwindcss/postcss` var ve `postcss.config.mjs` her build'de çalıştırıyor — "Tailwind YOK" kuralına rağmen. `create-next-app` kalıntısı, temizlenecek.
- **Inline style dağınıklığı.** `AGENTS.md` "stiller globals.css'te" diyor ama sayfalar hâlâ inline `style={{...}}` dolu. Yeni yazılan kısımlar (ödev tablosu, admin listesi, mobil menü) class kullanıyor; eski sayfalar temizlenmedi. Yeni kod yazarken globals.css'e class ekle, inline'ı çoğaltma.
- **`.section-title` ortalama hack'i.** `left: 50%; transform: translateX(-50%)` ile ortalanıyor; bu yüzden flex satırının içine koyunca sola kayıp yanındaki elemanın üstüne biniyor. Şu an `.bolum-basligi` sınıfı bunu iptal ediyor, admin sayfası da elle `left: 0` yazıyor. Doğru çözüm `margin-inline: auto` ile değiştirmek ama tüm kullanımları test etmek gerekir.
- **Her sayfa `"use client"`.** Duyurular server component'te çekilse SEO kazanılır ve "Yükleniyor..." flaşı kalkar. Next 16'nın asıl kozu kullanılmıyor. Domain bağlanmadan önce en azından `/duyurular` server'a alınabilir.
- **`storage` boşuna export ediliyor.** `src/lib/firebase.js:21` — Storage kurulmadı ama modül yine de import ediliyor, bundle'a yük.
- **`alert()` ile bildirim.** Admin panelinde ekleme sonrası `alert()` kullanılıyor. Çalışıyor ama kaba.
- **Eski yorum:** `src/app/sorular/[id]/page.js` içindeki yorum "Next 15 compatibility" diyor, proje Next 16.
- **`<img>` kullanılıyor, `next/image` değil.** Optimizasyonu Cloudinary yaptığı için (`f_auto,q_auto,w_N`) `next/image`'a geçmenin kazancı sınırlı; geçilirse `next.config.mjs`'e `remotePatterns` ile `res.cloudinary.com` eklenmeli.

---

## 📁 Dosya Yapısı (Özet)

```
muratdokuz.com/
├── public/
│   └── ataturk.jpg             # Ana sayfa hero arka planı
├── src/
│   ├── app/
│   │   ├── globals.css         # Tüm stiller burada olmalı (bkz. teknik borç)
│   │   ├── layout.js           # Navbar'ı çağırır (server component)
│   │   ├── page.js             # ✅ Ana Sayfa - duyurular + güncel hafta dinamik
│   │   ├── duyurular/page.js   # ✅ Firebase'den dinamik
│   │   ├── odevler/page.js     # ✅ Firebase'den dinamik
│   │   ├── sorular/
│   │   │   ├── page.js         # ⚠️ Statik
│   │   │   └── [id]/page.js    # ⚠️ Statik + mock veri
│   │   ├── galeri/page.js      # ✅ Filtre + lightbox
│   │   ├── baglantilar/page.js # ✅ Sekmeli liste
│   │   ├── hakkimda/page.js
│   │   └── admin/
│   │       ├── page.js         # ✅ Firebase Auth girişi
│   │       └── dashboard/page.js  # ✅ Ekleme formları + listeleme/silme
│   ├── components/
│   │   ├── Navbar.js           # Hamburger menü (client component)
│   │   ├── FotoYukle.js        # Cloudinary "Fotoğraf Seç" butonu
│   │   ├── Lightbox.js         # Galeri modal'ı
│   │   └── HaftaTablosu.js     # Haftalık ödev tablosu (ana sayfa + /odevler ortak)
│   └── lib/
│       ├── firebase.js         # Firebase config ve export'lar
│       ├── duyurular.js        # Duyuru sorgusu + silme
│       ├── odevler.js          # Ödev sorgusu + silme + satır ayrıştırma
│       ├── galeri.js           # Galeri sorgusu + silme + KATEGORILER
│       ├── baglantilar.js      # Bağlantı sorgusu + silme + sekme filtresi
│       └── cloudinary.js       # Yükleme + optimizeUrl (API secret YOK)
├── AGENTS.md                   # Kalıcı kurallar (Claude + AGY ortak)
├── CLAUDE.md                   # AGENTS.md + AI_NOTES.md'yi import eder
├── AI_NOTES.md                 # Bu dosya — güncel durum
└── package.json
```

---

*Not: Bu projeyi farklı AI asistanlar (Gemini/Antigravity veya Claude) dönüşümlü geliştirebilir. Bu dosya her iki tarafın da anlayacağı şekilde güncel tutulmalı ve **her zaman GitHub'a push edilmeli** — yerel makine kaybolabilir, repo tek gerçek kaynaktır. Yeni özellik eklendiğinde burayı güncelle. Vanilla CSS kuralına kesinlikle uy, Tailwind ekleme.*
