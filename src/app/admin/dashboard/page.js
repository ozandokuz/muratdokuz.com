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
        <div className="card" style={{ gridColumn: '1 / -1', borderTop: '4px solid var(--color-primary)' }}>
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

        <div className="card">
          <h3 style={{ color: 'var(--color-secondary)', marginBottom: '1rem' }}>📚 Yeni Ödev Ekle</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Ödev sistemi bir sonraki aşamada aktif edilecektir.</p>
          <button className="btn btn-secondary" disabled>Yakında Aktif</button>
        </div>

        <div className="card">
          <h3 style={{ color: '#d97706', marginBottom: '1rem' }}>📄 Soru Bankası</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>PDF'leri sitenin ana kod klasörüne yerleştirerek ücretsiz yayınlayacağız.</p>
          <button className="btn btn-secondary" disabled>Manuel Yüklenecek</button>
        </div>
      </div>
    </main>
  );
}
