"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Duyuru Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ödev Form State
  const [weekTitle, setWeekTitle] = useState('');
  const [pazartesi, setPazartesi] = useState('');
  const [sali, setSali] = useState('');
  const [carsamba, setCarsamba] = useState('');
  const [persembe, setPersembe] = useState('');
  const [cuma, setCuma] = useState('');
  const [isOdevSubmitting, setIsOdevSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/admin');
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin');
  };

  const handleAddDuyuru = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert("Lütfen tüm alanları doldurun.");
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'duyurular'), {
        title,
        content,
        date: serverTimestamp()
      });
      alert("Harika! Duyuru başarıyla veritabanına eklendi.");
      setTitle('');
      setContent('');
    } catch (err) {
      console.error(err);
      alert("Bir hata oluştu: " + err.message);
    }
    setIsSubmitting(false);
  };

  const handleAddOdev = async (e) => {
    e.preventDefault();
    if (!weekTitle) return alert("Lütfen hafta başlığını girin.");
    
    setIsOdevSubmitting(true);
    try {
      await addDoc(collection(db, 'odevler'), {
        weekTitle,
        pazartesi,
        sali,
        carsamba,
        persembe,
        cuma,
        date: serverTimestamp()
      });
      alert("Harika! Haftalık ödev başarıyla veritabanına eklendi.");
      setWeekTitle('');
      setPazartesi(''); setSali(''); setCarsamba(''); setPersembe(''); setCuma('');
    } catch (err) {
      console.error(err);
      alert("Bir hata oluştu: " + err.message);
    }
    setIsOdevSubmitting(false);
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '5rem' }}>Yükleniyor...</div>;
  if (!user) return null;

  return (
    <main className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', marginTop: '2rem' }}>
        <h1 className="section-title" style={{ margin: 0, left: 0, transform: 'none' }}>Yönetim Paneli</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/" className="btn btn-secondary" style={{ fontSize: '0.9rem' }}>Siteye Dön</Link>
          <button onClick={handleLogout} className="btn btn-primary" style={{ fontSize: '0.9rem', backgroundColor: '#e74c3c' }}>Çıkış Yap</button>
        </div>
      </div>

      <div className="grid-2">
        {/* Duyuru Ekleme Kartı */}
        <div className="card" style={{ borderTop: '4px solid var(--color-primary)' }}>
          <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>📣 Yeni Duyuru Ekle</h3>
          <form onSubmit={handleAddDuyuru} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="text" 
              placeholder="Duyuru Başlığı (Örn: Veli Toplantısı)" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--color-muted)', backgroundColor: '#fafaf9', fontSize: '1rem' }}
            />
            <textarea 
              placeholder="Duyurunun detaylarını buraya yazın..." 
              rows="4"
              value={content}
              onChange={e => setContent(e.target.value)}
              style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--color-muted)', backgroundColor: '#fafaf9', resize: 'vertical', fontSize: '1rem' }}
            />
            <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
              {isSubmitting ? 'Ekleniyor...' : 'Duyuruyu Yayınla'}
            </button>
          </form>
        </div>

        {/* Soru Bankası Bilgi Kartı */}
        <div className="card">
          <h3 style={{ color: '#d97706', marginBottom: '1rem' }}>📄 Soru Bankası Sistemi</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
            Soru bankaları çok büyük PDF dosyaları içerdiği için ücretsiz plan sınırlarını aşabilir. 
            Bu nedenle yeni testleri eklemek için dosyaları <b>public</b> klasörüne sürükleyip bırakmanız daha sağlıklı olacaktır.
          </p>
        </div>

        {/* Ödev Ekleme Kartı */}
        <div className="card" style={{ gridColumn: '1 / -1', borderTop: '4px solid var(--color-secondary)' }}>
          <h3 style={{ color: 'var(--color-secondary)', marginBottom: '1rem' }}>📚 Haftalık Ödev Programı Ekle</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Birden fazla ders eklemek için aralarına boşluk (Enter) bırakın.</p>
          <form onSubmit={handleAddOdev} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="text" 
              placeholder="Hafta Başlığı (Örn: 18-22 Nisan Haftası)" 
              value={weekTitle}
              onChange={e => setWeekTitle(e.target.value)}
              style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--color-muted)', backgroundColor: '#fafaf9', fontSize: '1rem', fontWeight: 'bold' }}
            />
            
            <div className="grid-2" style={{ gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Pazartesi</label>
                <textarea rows="3" placeholder="📚 Türkçe: Sayfa 15..." value={pazartesi} onChange={e => setPazartesi(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--color-muted)' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Salı</label>
                <textarea rows="3" placeholder="🧮 Matematik: Test 2..." value={sali} onChange={e => setSali(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--color-muted)' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Çarşamba</label>
                <textarea rows="3" placeholder="🧪 Fen: Araştırma ödevi..." value={carsamba} onChange={e => setCarsamba(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--color-muted)' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Perşembe</label>
                <textarea rows="3" placeholder="🎨 Görsel: Resim çizimi..." value={persembe} onChange={e => setPersembe(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--color-muted)' }} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Cuma / Hafta Sonu</label>
                <textarea rows="3" placeholder="📖 Kitap okuma saati..." value={cuma} onChange={e => setCuma(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--color-muted)' }} />
              </div>
            </div>

            <button type="submit" disabled={isOdevSubmitting} className="btn btn-secondary" style={{ alignSelf: 'center', padding: '0.75rem 3rem', marginTop: '1rem' }}>
              {isOdevSubmitting ? 'Ekleniyor...' : 'Haftalık Ödevi Yayınla'}
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}
