"use client";
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getGaleri } from '@/lib/galeri';
import Lightbox from '@/components/Lightbox';

const TUMU = 'Tümü';

export default function Galeri() {
  const [fotograflar, setFotograflar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hata, setHata] = useState('');
  const [aktifKategori, setAktifKategori] = useState(TUMU);
  const [secilenFoto, setSecilenFoto] = useState(null);

  // Sabit referans: Lightbox'ın effect'i her render'da yeniden kurulmasın.
  const kapat = useCallback(() => setSecilenFoto(null), []);

  useEffect(() => {
    const fetchGaleri = async () => {
      try {
        setFotograflar(await getGaleri());
      } catch (err) {
        console.error("Galeri çekilirken hata oluştu: ", err);
        setHata("Fotoğraflar şu anda yüklenemedi. Lütfen sayfayı yenileyin.");
      } finally {
        setLoading(false);
      }
    };

    fetchGaleri();
  }, []);

  // Filtre butonları sabit listeden değil, gerçekten yüklenmiş
  // fotoğrafların kategorilerinden üretilir — boş kategori butonu çıkmasın.
  const kategoriler = useMemo(() => {
    const mevcut = [...new Set(fotograflar.map((f) => f.category).filter(Boolean))];
    return [TUMU, ...mevcut];
  }, [fotograflar]);

  const gosterilen = aktifKategori === TUMU
    ? fotograflar
    : fotograflar.filter((f) => f.category === aktifKategori);

  return (
    <main className="container">
      <h1 className="section-title" style={{ marginTop: '2rem' }}>Fotoğraf Galerisi</h1>

      <p className="kvkk-uyari">
        🔒 Öğrenci fotoğrafları veli izniyle paylaşılmaktadır.
      </p>

      {loading ? (
        <p className="durum-mesaji">Yükleniyor...</p>
      ) : hata ? (
        <div className="card hata-kutusu">{hata}</div>
      ) : fotograflar.length === 0 ? (
        <div className="card bos-durum">
          <p>Henüz fotoğraf paylaşılmadı.</p>
        </div>
      ) : (
        <>
          {kategoriler.length > 2 && (
            <div className="filtre-satiri">
              {kategoriler.map((kategori) => (
                <button
                  key={kategori}
                  type="button"
                  className={kategori === aktifKategori ? 'filtre-btn aktif' : 'filtre-btn'}
                  onClick={() => setAktifKategori(kategori)}
                >
                  {kategori}
                </button>
              ))}
            </div>
          )}

          <div className="galeri-grid">
            {gosterilen.map((foto) => (
              <button
                key={foto.id}
                type="button"
                className="galeri-kart"
                onClick={() => setSecilenFoto(foto)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={foto.imageUrl} alt={foto.title} loading="lazy" />
                <div className="galeri-kart-bilgi">
                  <strong>{foto.title}</strong>
                  <span>{foto.category}</span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      <Lightbox foto={secilenFoto} onKapat={kapat} />
    </main>
  );
}
