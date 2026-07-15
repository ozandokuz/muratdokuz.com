"use client";
import React, { useEffect, useState } from 'react';
import { getBaglantilar, grubaGoreFiltrele, SEKMELER } from '@/lib/baglantilar';

function DisLinkIkonu() {
  return (
    <svg className="dis-link-ikon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 3h7v7" />
      <path d="M10 14 21 3" />
      <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
    </svg>
  );
}

export default function Baglantilar() {
  const [baglantilar, setBaglantilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hata, setHata] = useState('');
  const [aktifSekme, setAktifSekme] = useState(SEKMELER[0].key);

  useEffect(() => {
    const fetchBaglantilar = async () => {
      try {
        setBaglantilar(await getBaglantilar());
      } catch (err) {
        console.error("Bağlantılar çekilirken hata oluştu: ", err);
        setHata("Bağlantılar şu anda yüklenemedi. Lütfen sayfayı yenileyin.");
      } finally {
        setLoading(false);
      }
    };

    fetchBaglantilar();
  }, []);

  const gosterilen = grubaGoreFiltrele(baglantilar, aktifSekme);

  return (
    <main className="container">
      <h1 className="section-title" style={{ marginTop: '2rem' }}>Faydalı Bağlantılar</h1>

      {loading ? (
        <p className="durum-mesaji">Yükleniyor...</p>
      ) : hata ? (
        <div className="card hata-kutusu">{hata}</div>
      ) : baglantilar.length === 0 ? (
        <div className="card bos-durum">
          <p>Henüz bağlantı eklenmedi.</p>
        </div>
      ) : (
        <>
          <div className="sekme-satiri" role="tablist">
            {SEKMELER.map((sekme) => (
              <button
                key={sekme.key}
                type="button"
                role="tab"
                aria-selected={sekme.key === aktifSekme}
                className={sekme.key === aktifSekme ? 'sekme-btn aktif' : 'sekme-btn'}
                onClick={() => setAktifSekme(sekme.key)}
              >
                {sekme.label}
              </button>
            ))}
          </div>

          {gosterilen.length === 0 ? (
            <div className="card bos-durum">
              <p>Bu grup için henüz bağlantı eklenmedi.</p>
            </div>
          ) : (
            <div className="grid-2" style={{ marginBottom: '3rem' }}>
              {gosterilen.map((baglanti) => (
                <a
                  key={baglanti.id}
                  href={baglanti.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card baglanti-kart"
                >
                  <div className="baglanti-baslik">
                    <h3>{baglanti.title}</h3>
                    <DisLinkIkonu />
                  </div>
                  <p>{baglanti.description}</p>
                  {baglanti.targetGroup === 'Genel' && (
                    <span className="baglanti-rozet">Herkes İçin</span>
                  )}
                </a>
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}
