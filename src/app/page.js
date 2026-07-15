"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getDuyurular } from '@/lib/duyurular';
import { getOdevler } from '@/lib/odevler';
import HaftaTablosu from '@/components/HaftaTablosu';

export default function Home() {
  const [duyurular, setDuyurular] = useState([]);
  const [guncelOdev, setGuncelOdev] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVeriler = async () => {
      try {
        const [duyuruListesi, odevListesi] = await Promise.all([
          getDuyurular(2),
          getOdevler(1),
        ]);

        setDuyurular(duyuruListesi);
        setGuncelOdev(odevListesi[0] ?? null);
      } catch (err) {
        console.error("Ana sayfa verileri çekilirken hata oluştu: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVeriler();
  }, []);

  return (
    <>
      <main className="container">
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">Murat Öğretmen'in Sınıfına Hoş Geldiniz</h1>
            <p className="hero-subtitle">
              Sevgili öğrencilerim ve değerli veliler, 3-A sınıfı ile ilgili tüm duyuruları, 
              haftalık ödevleri ve sınıf içi etkinliklerimizi buradan takip edebilirsiniz. Yeni dönemimiz hepimiz için aydınlık olsun.
            </p>
            <div className="hero-actions">
              <Link href="/odevler" className="btn btn-primary">Tüm Ödevler</Link>
              <Link href="/duyurular" className="btn btn-secondary">Tüm Duyurular</Link>
            </div>
          </div>
        </section>

        <div className="grid-2">
          <section id="duyurular">
            <div className="bolum-basligi">
              <h2 className="section-title">Güncel Duyurular</h2>
              <Link href="/duyurular" className="bolum-basligi-link">Tümünü Gör &rarr;</Link>
            </div>
            
            {loading ? (
              <p>Yükleniyor...</p>
            ) : duyurular.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                <p style={{ color: 'var(--text-secondary)' }}>Henüz duyuru bulunmuyor.</p>
              </div>
            ) : (
              duyurular.map((duyuru, index) => {
                const isEven = index % 2 === 0;
                const badgeStyle = isEven 
                  ? {} 
                  : { backgroundColor: '#ccfbf1', color: '#0f766e', borderColor: '#99f6e4' };
                
                let day = "-";
                let month = "Yeni";
                
                if (duyuru.date?.toDate) {
                  const dateObj = duyuru.date.toDate();
                  day = dateObj.getDate().toString();
                  month = dateObj.toLocaleString('tr-TR', { month: 'short' });
                }

                return (
                  <div key={duyuru.id} className="card announcement-card">
                    <div className="date-badge" style={badgeStyle}>
                      <div className="date-month">{month}</div>
                      <div className="date-day">{day}</div>
                    </div>
                    <div className="announcement-content">
                      <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)', fontSize: '1.25rem' }}>{duyuru.title}</h3>
                      <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {duyuru.content}
                      </p>
                    </div>
                  </div>
                )
              })
            )}
          </section>

          <section id="odevler">
            <h2 className="section-title">Haftalık Ödev Tablosu</h2>
            <div className="card" style={{ padding: '2.5rem', textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              {loading ? (
                <p style={{ color: 'var(--text-secondary)' }}>Yükleniyor...</p>
              ) : guncelOdev ? (
                <>
                  <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)', fontSize: '1.5rem' }}>{guncelOdev.weekTitle}</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '300px' }}>Bu haftanın gün gün ödev dağılımını aşağıdan inceleyebilirsiniz.</p>
                  <a href="#haftalik" className="btn btn-primary">Tüm Programı Görüntüle</a>
                </>
              ) : (
                <>
                  <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)', fontSize: '1.5rem' }}>Ödev Yayınlanmadı</h3>
                  <p style={{ color: 'var(--text-secondary)', maxWidth: '300px' }}>Bu hafta için henüz bir ödev programı paylaşılmadı.</p>
                </>
              )}
            </div>
          </section>
        </div>

        <section id="haftalik" style={{ marginTop: '5rem', marginBottom: '3rem' }}>
          <h2 className="section-title">Gün Gün Ödev Dağılımı</h2>
          {loading ? (
            <p className="durum-mesaji">Yükleniyor...</p>
          ) : guncelOdev ? (
            <HaftaTablosu odev={guncelOdev} />
          ) : (
            <div className="card bos-durum">
              <p>Henüz bir ödev programı yayınlanmadı.</p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
