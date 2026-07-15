// Bu iki değer GİZLİ DEĞİL: unsigned upload'da tarayıcıya gitmek zorundalar ve
// cloud name zaten her görsel URL'inde görünüyor. Gizlemenin faydası yok.
//
// ⚠️ API SECRET ASLA BURAYA (ya da bu repoya) KONULMAZ. Repo GitHub'da herkese
// açık. Secret sunucu tarafı imzalı işlemler için; bizim sunucumuz yok ve
// tarayıcıdan yapılan yükleme secret istemiyor.
export const CLOUD_NAME = "zchruwpo";
export const UPLOAD_PRESET = "dokuzm";
const KLASOR = "galeri";

export const IZINLI_TURLER = ["image/jpeg", "image/png", "image/webp"];
export const MAKS_BAYT = 10 * 1024 * 1024; // 10 MB

// Yüklemeden önce dosyayı ele. Bu bir güvenlik sınırı DEĞİL — tarayıcıdaki
// kontrol atlanabilir, gerçek sınır Cloudinary preset'indeki "Upload Control"
// ayarları. Buradaki kontrol öğretmen yanlış dosya seçtiğinde 10MB'ı boşuna
// yükleyip hata almasın diye.
export function dosyayiDenetle(dosya) {
  if (!IZINLI_TURLER.includes(dosya.type)) {
    return "Sadece JPG, PNG veya WEBP yükleyebilirsiniz.";
  }
  if (dosya.size > MAKS_BAYT) {
    const mb = (dosya.size / 1024 / 1024).toFixed(1);
    return `Fotoğraf çok büyük (${mb} MB). En fazla 10 MB olmalı.`;
  }
  return null;
}

// Tarayıcıdan doğrudan Cloudinary'ye yükler, görselin kalıcı adresini döner.
export async function fotoYukle(dosya) {
  const form = new FormData();
  form.append("file", dosya);
  form.append("upload_preset", UPLOAD_PRESET);
  form.append("folder", KLASOR);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: form,
  });
  const veri = await res.json();

  if (veri.error) throw new Error(veri.error.message);
  return veri.secure_url;
}

// Cloudinary URL'ine dönüşüm ekler: f_auto (tarayıcıya göre WebP/AVIF),
// q_auto (otomatik kalite), w_ (genişlik). Öğretmenin yüklediği 3MB'lık
// telefon fotoğrafı böylece ~10'da bire iniyor.
// Cloudinary dışı bir adres gelirse (eski kayıt, elle yapıştırılmış link)
// olduğu gibi bırakır — bozulmasın.
export function optimizeUrl(url, genislik = 800) {
  if (!url || !url.includes(`res.cloudinary.com/${CLOUD_NAME}`) || !url.includes("/upload/")) {
    return url;
  }
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${genislik}/`);
}
