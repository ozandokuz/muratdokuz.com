# AI Collaboration & Project Notes

**Proje:** Murat Dokuz - Sınıf Öğretmeni (Öğrenci & Veli Platformu)
**Altyapı:** Next.js (App Router), Vanilla CSS (Tailwind KULLANILMIYOR)
**Tasarım Dili:** Derin Kırmızı (Kardinal), Turkuaz (Teal) ve Kirli Beyaz (Soft Gray). Modern, yumuşak geçişli ve güven veren bir UI.

## Mevcut Durum (Gemini Tarafından Teslim Edildi)
- Next.js (App Router) ile proje iskeleti kuruldu.
- Tailwind devre dışı bırakıldı. Tamamen özel CSS ile `src/app/globals.css` dosyası üzerinden "premium" bir tasarım inşa edildi.
- **Ana Sayfa:** Karşılama bölümünün arka planında Atatürk portresi (`public/ataturk.jpg`) ve şık bir karanlık katman (overlay) kullanıldı.
- **Sayfalar ve Rotalar (Routing):**
  - `/` (Ana Sayfa)
  - `/duyurular` (Geçmiş ve yeni duyurular)
  - `/odevler` (Haftalık ödev geçmişi)
  - `/sorular` (Soru bankası ana sayfası)
  - `/sorular/[id]` (Dinamik rota: Her bir soru bankasının testlerini ve detaylarını gösteren alt sayfa)
  - `/hakkimda` (Öğretmen biyografisi)
- **Yayınlama (Deployment):** Proje GitHub'a (`ozandokuz/muratdokuz.com`) yüklendi ve Vercel üzerinden canlıya alındı.

## Sıradaki Hedefler (Geliştirilecek Özellikler)
- **Yönetim Paneli (Admin / CMS):** Öğretmenin kodlara dokunmadan sisteme duyuru ve ödev girebilmesi için bir veritabanı (Firebase, Supabase vb.) entegrasyonu.
- **İletişim Formu:** Velilerin mesaj gönderebilmesi için çalışan bir form altyapısı (örneğin Resend veya EmailJS ile).
- **Dosya Yükleme:** Soru bankaları sayfasına gerçekten PDF yüklenebilmesi için dosya depolama (Storage) sistemi kurulması.

---
*Note to Claude or other AI Agents: Please use this file as the source of truth for the project's state. Whenever you add a new feature, database, or major architectural change, please update this file so the next AI (or Gemini) can seamlessly pick up where you left off. Keep the code clean and strictly follow the custom vanilla CSS conventions in globals.css unless requested otherwise.*
