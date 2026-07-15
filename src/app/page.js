"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

export default function Home() {
  const [duyurular, setDuyurular] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDuyurular = async () => {
      try {
        const q = query(collection(db, 'duyurular'), orderBy('date', 'desc'), limit(2));
        const querySnapshot = await getDocs(q);
        const fetched = [];
        querySnapshot.forEach((doc) => {
          fetched.push({ id: doc.id, ...doc.data() });
        });
        setDuyurular(fetched);
      } catch (err) {
        console.error("Duyurular çekilirken hata oluştu: ", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDuyurular();
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 className="section-title" style={{ margin: 0, paddingBottom: 0 }}>Güncel Duyurular</h2>
              <Link href="/duyurular" style={{ color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '0.9rem' }}>Tümünü Gör &rarr;</Link>
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
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)', fontSize: '1.5rem' }}>Örnek Şablon Haftası</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '300px' }}>Ödev sistemi veritabanına bağlanana kadar bu alan tasarım ön izlemesi olarak kalacaktır.</p>
              <a href="#haftalik" className="btn btn-primary">Tüm Programı Görüntüle</a>
            </div>
          </section>
        </div>

        <section id="haftalik" style={{ marginTop: '5rem', marginBottom: '3rem' }}>
          <h2 className="section-title">Gün Gün Ödev Dağılımı (Ön İzleme)</h2>
          <div className="hw-grid">
            {/* Monday */}
            <div className="hw-day">
              <div className="hw-day-header">
                <div className="hw-day-name">Pazartesi</div>
                <div className="hw-day-date">Tasarım Şablonu</div>
              </div>
              <div className="hw-task">
                <strong>📚 Türkçe</strong>
                Okuma metni (Sayfa 45) ve soruları cevaplanacak.
              </div>
              <div className="hw-task">
                <strong>✏️ Matematik</strong>
                Çarpım tablosu tekrarı.
              </div>
            </div>
            
            {/* Tuesday */}
            <div className="hw-day">
              <div className="hw-day-header">
                <div className="hw-day-name">Salı</div>
                <div className="hw-day-date">Tasarım Şablonu</div>
              </div>
              <div className="hw-task">
                <strong>🧮 Matematik</strong>
                Problemler kitabı sayfa 22-23 tamamlanacak.
              </div>
              <div className="hw-task">
                <strong>📖 Hayat Bilgisi</strong>
                Geri dönüşüm araştırma yazısı.
              </div>
            </div>

            {/* Wednesday */}
            <div className="hw-day">
              <div className="hw-day-header">
                <div className="hw-day-name">Çarşamba</div>
                <div className="hw-day-date">Tasarım Şablonu</div>
              </div>
              <div className="hw-task">
                <strong>🧪 Fen Bilimleri</strong>
                Bitkinin bölümleri çizilecek.
              </div>
              <div className="hw-task">
                <strong>📚 Türkçe</strong>
                Yazım kuralları çalışma kağıdı.
              </div>
            </div>

            {/* Thursday */}
            <div className="hw-day">
              <div className="hw-day-header">
                <div className="hw-day-name">Perşembe</div>
                <div className="hw-day-date">Tasarım Şablonu</div>
              </div>
              <div className="hw-task">
                <strong>🎨 Görsel Sanatlar</strong>
                İlkbahar konulu pastel boya çalışması.
              </div>
              <div className="hw-task">
                <strong>🧮 Matematik</strong>
                Kesirler giriş çalışma kağıdı.
              </div>
            </div>

            {/* Friday */}
            <div className="hw-day">
              <div className="hw-day-header">
                <div className="hw-day-name">Cuma</div>
                <div className="hw-day-date">Tasarım Şablonu</div>
              </div>
              <div className="hw-task">
                <strong>📝 Haftasonu</strong>
                Seçili hikaye kitabı bitirilecek.
              </div>
              <div className="hw-task">
                <strong>🔍 Tekrar</strong>
                Haftanın öğrenilen kelimeleri ezberlenecek.
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
