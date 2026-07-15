"use client";
import React, { useEffect, useState } from 'react';
import { getDuyurular } from '@/lib/duyurular';

export default function Duyurular() {
  const [duyurular, setDuyurular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hata, setHata] = useState('');

  useEffect(() => {
    const fetchDuyurular = async () => {
      try {
        setDuyurular(await getDuyurular());
      } catch (err) {
        console.error("Duyurular çekilirken hata oluştu: ", err);
        setHata("Duyurular şu anda yüklenemedi. Lütfen sayfayı yenileyin.");
      } finally {
        setLoading(false);
      }
    };

    fetchDuyurular();
  }, []);

  return (
    <main className="container">
      <h1 className="section-title" style={{ marginTop: '2rem' }}>Tüm Duyurular</h1>
      
      {loading ? (
        <p className="durum-mesaji">Yükleniyor...</p>
      ) : hata ? (
        <div className="card hata-kutusu">{hata}</div>
      ) : duyurular.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Henüz yayınlanmış bir duyuru bulunmuyor.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
          {duyurular.map((duyuru) => (
            <div key={duyuru.id} className="card" style={{ borderLeft: '4px solid var(--color-primary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary)', margin: 0 }}>{duyuru.title}</h2>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', backgroundColor: '#f3f4f6', padding: '0.3rem 0.8rem', borderRadius: '1rem' }}>
                  {duyuru.date?.toDate ? duyuru.date.toDate().toLocaleDateString('tr-TR') : 'Yeni'}
                </span>
              </div>
              <p style={{ color: 'var(--text-primary)', lineHeight: '1.6', whiteSpace: 'pre-wrap', margin: 0 }}>
                {duyuru.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
