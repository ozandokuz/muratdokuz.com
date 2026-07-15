<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Proje Kuralları (muratdokuz.com)

Bu dosya kalıcı kurallardır. Projenin **güncel durumu** ve yapılacaklar `AI_NOTES.md` içindedir — koda dokunmadan önce onu oku.

## Kesin kurallar

- **Vanilla CSS. Tailwind YOK.** Hiçbir CSS framework eklenmeyecek. Stiller `src/app/globals.css` içindeki CSS değişkenleri ile yazılır.
- **Arayüz dili Türkçe.** Kullanıcıya görünen tüm metinler, buton etiketleri ve hata mesajları Türkçe.
- **Firebase Storage kullanılmıyor** (Spark planında ücretli). PDF'ler `public/` klasörüne konur, `/dosya.pdf` şeklinde servis edilir.
- **Fotoğraflar Cloudinary'de.** Yükleme `src/lib/cloudinary.js` üzerinden, tarayıcıdan doğrudan. **API secret bu repoya asla girmez** — repo public ve unsigned upload secret istemiyor. Görsel gösterirken `optimizeUrl(url, genislik)` kullan, ham `imageUrl`'i doğrudan basma.

## Firebase kalıpları (mevcut kodda doğru kurulmuş, bozma)

- `src/lib/firebase.js` init'i `getApps().length` ile korunuyor — SSR'da tekrar init hatasını önler.
- Tarih yazarken **her zaman** `serverTimestamp()`, asla `new Date()`.
- Tarih okurken **her zaman** `date?.toDate` kontrolü — `serverTimestamp()` sunucuya yazılmadan önce client'ta bir an `null` döner, kontrolsüz okursan patlar.

## Firestore veri şeması

| Koleksiyon | Alanlar |
|---|---|
| `duyurular` | `title`, `content`, `date` (serverTimestamp) |
| `odevler` | `weekTitle`, `pazartesi`, `sali`, `carsamba`, `persembe`, `cuma`, `date` (serverTimestamp) |
| `galeri` | `title`, `imageUrl`, `category`, `date` (serverTimestamp) |
| `baglantilar` | `title`, `description`, `url`, `targetGroup`, `date` (serverTimestamp) |

Koleksiyon adları Türkçe, alan adları mevcut haliyle korunur (`weekTitle` gibi karışıklıklar dahil) — yenisini uydurma, şemayı değiştireceksen bu tabloyu da güncelle.

## Çalışma şekli

- Bu proje farklı AI asistanlar (Claude / Gemini-Antigravity) tarafından dönüşümlü geliştirilebilir. Her anlamlı değişiklikten sonra `AI_NOTES.md` güncellenir ve **GitHub'a push edilir** — tek gerçek kaynak repo'dur, yerel makine değil.
- `main` branch'e her push Vercel'e otomatik deploy olur.
