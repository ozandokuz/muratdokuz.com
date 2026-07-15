"use client";
import React, { useEffect, useState } from 'react';
import { getOdevler } from '@/lib/odevler';
import HaftaTablosu from '@/components/HaftaTablosu';

export default function Odevler() {
  const [odevler, setOdevler] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hata, setHata] = useState('');

  useEffect(() => {
    const fetchOdevler = async () => {
      try {
        setOdevler(await getOdevler());
      } catch (err) {
        console.error("Ödevler çekilirken hata oluştu: ", err);
        setHata("Ödevler şu anda yüklenemedi. Lütfen sayfayı yenileyin.");
      } finally {
        setLoading(false);
      }
    };

    fetchOdevler();
  }, []);

  const [guncel, ...gecmis] = odevler;

  return (
    <main className="container">
      <h1 className="section-title" style={{ marginTop: '2rem' }}>Geçmiş ve Güncel Ödevler</h1>

      {loading ? (
        <p className="durum-mesaji">Yükleniyor...</p>
      ) : hata ? (
        <div className="card hata-kutusu">{hata}</div>
      ) : !guncel ? (
        <div className="card bos-durum">
          <p>Henüz bir ödev programı yayınlanmadı.</p>
        </div>
      ) : (
        <>
          <section>
            <div className="hafta-baslik">
              <h2>{guncel.weekTitle}</h2>
              <span className="hafta-rozet">Aktif Hafta</span>
            </div>
            <HaftaTablosu odev={guncel} />
          </section>

          {gecmis.length > 0 && (
            <section style={{ marginTop: '4rem', marginBottom: '3rem' }}>
              <h2 className="section-title">Geçmiş Haftalar</h2>
              {gecmis.map((odev) => (
                <details key={odev.id} className="gecmis-hafta">
                  <summary>{odev.weekTitle}</summary>
                  <HaftaTablosu odev={odev} />
                </details>
              ))}
            </section>
          )}
        </>
      )}
    </main>
  );
}
