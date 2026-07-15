// Bu iki değer GİZLİ DEĞİL: unsigned upload'da tarayıcıya gitmek zorundalar ve
// cloud name zaten her görsel URL'inde görünüyor. Gizlemenin faydası yok.
//
// ⚠️ API SECRET ASLA BURAYA (ya da bu repoya) KONULMAZ. Repo GitHub'da herkese
// açık. Secret sunucu tarafı imzalı işlemler için; bizim sunucumuz yok ve
// tarayıcıdan yapılan yükleme secret istemiyor.
export const CLOUD_NAME = "zchruwpo";
export const UPLOAD_PRESET = "dokuzm";
const KLASOR = "galeri";

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
