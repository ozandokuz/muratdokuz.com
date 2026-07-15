"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getDuyurular, silDuyuru } from '@/lib/duyurular';
import { getOdevler, silOdev } from '@/lib/odevler';
import { getGaleri, silFoto, KATEGORILER } from '@/lib/galeri';
import { getBaglantilar, silBaglanti, HEDEF_GRUPLAR } from '@/lib/baglantilar';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Yayınlanan içerik listeleri
  const [duyuruListesi, setDuyuruListesi] = useState([]);
  const [odevListesi, setOdevListesi] = useState([]);
  const [fotoListesi, setFotoListesi] = useState([]);
  const [baglantiListesi, setBaglantiListesi] = useState([]);
  const [listeYukleniyor, setListeYukleniyor] = useState(true);
  const [silinenId, setSilinenId] = useState(null);

  // Galeri Form State
  const [fotoTitle, setFotoTitle] = useState('');
  const [fotoUrl, setFotoUrl] = useState('');
  const [fotoKategori, setFotoKategori] = useState(KATEGORILER[0]);
  const [isFotoSubmitting, setIsFotoSubmitting] = useState(false);

  // Bağlantı Form State
  const [linkTitle, setLinkTitle] = useState('');
  const [linkDesc, setLinkDesc] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkGrup, setLinkGrup] = useState(HEDEF_GRUPLAR[0]);
  const [isLinkSubmitting, setIsLinkSubmitting] = useState(false);

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

  const listeleriYenile = useCallback(async () => {
    setListeYukleniyor(true);
    try {
      const [duyurular, odevler, fotolar, baglantilar] = await Promise.all([
        getDuyurular(),
        getOdevler(),
        getGaleri(),
        getBaglantilar(),
      ]);
      setDuyuruListesi(duyurular);
      setOdevListesi(odevler);
      setFotoListesi(fotolar);
      setBaglantiListesi(baglantilar);
    } catch (err) {
      console.error("Listeler çekilirken hata oluştu: ", err);
    } finally {
      setListeYukleniyor(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/admin');
      } else {
        setUser(currentUser);
        listeleriYenile();
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router, listeleriYenile]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin');
  };

  const handleSil = async (tur, id, baslik) => {
    if (!confirm(`"${baslik}" kalıcı olarak silinecek. Emin misiniz?`)) return;

    const siliciler = {
      duyuru: silDuyuru,
      odev: silOdev,
      foto: silFoto,
      baglanti: silBaglanti,
    };

    setSilinenId(id);
    try {
      await siliciler[tur](id);
      await listeleriYenile();
    } catch (err) {
      console.error(err);
      alert("Silinemedi: " + err.message);
    }
    setSilinenId(null);
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
      await listeleriYenile();
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
      await listeleriYenile();
    } catch (err) {
      console.error(err);
      alert("Bir hata oluştu: " + err.message);
    }
    setIsOdevSubmitting(false);
  };

  const handleAddFoto = async (e) => {
    e.preventDefault();
    if (!fotoTitle || !fotoUrl) return alert("Lütfen başlık ve fotoğraf bağlantısını girin.");

    setIsFotoSubmitting(true);
    try {
      await addDoc(collection(db, 'galeri'), {
        title: fotoTitle,
        imageUrl: fotoUrl,
        category: fotoKategori,
        date: serverTimestamp(),
      });
      alert("Fotoğraf galeriye eklendi.");
      setFotoTitle('');
      setFotoUrl('');
      await listeleriYenile();
    } catch (err) {
      console.error(err);
      alert("Bir hata oluştu: " + err.message);
    }
    setIsFotoSubmitting(false);
  };

  const handleAddBaglanti = async (e) => {
    e.preventDefault();
    if (!linkTitle || !linkUrl) return alert("Lütfen başlık ve bağlantı adresini girin.");

    setIsLinkSubmitting(true);
    try {
      await addDoc(collection(db, 'baglantilar'), {
        title: linkTitle,
        description: linkDesc,
        url: linkUrl,
        targetGroup: linkGrup,
        date: serverTimestamp(),
      });
      alert("Bağlantı eklendi.");
      setLinkTitle('');
      setLinkDesc('');
      setLinkUrl('');
      await listeleriYenile();
    } catch (err) {
      console.error(err);
      alert("Bir hata oluştu: " + err.message);
    }
    setIsLinkSubmitting(false);
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

        {/* Galeri Ekleme Kartı */}
        <div className="card" style={{ borderTop: '4px solid #d97706' }}>
          <h3 style={{ color: '#d97706', marginBottom: '1rem' }}>🖼️ Galeriye Fotoğraf Ekle</h3>
          <form onSubmit={handleAddFoto} className="admin-form">
            <input
              type="text"
              className="form-input"
              placeholder="Fotoğraf Başlığı (Örn: Müze Gezisi)"
              value={fotoTitle}
              onChange={(e) => setFotoTitle(e.target.value)}
            />
            <input
              type="url"
              className="form-input"
              placeholder="Fotoğraf bağlantısı (https://...)"
              value={fotoUrl}
              onChange={(e) => setFotoUrl(e.target.value)}
            />
            <select className="form-input" value={fotoKategori} onChange={(e) => setFotoKategori(e.target.value)}>
              {KATEGORILER.map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
            <p className="form-ipucu">
              Cloudinary bağlanınca burası "Fotoğraf Seç" butonuna dönüşecek.
            </p>
            <button type="submit" disabled={isFotoSubmitting} className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
              {isFotoSubmitting ? 'Ekleniyor...' : 'Fotoğrafı Yayınla'}
            </button>
          </form>
        </div>

        {/* Bağlantı Ekleme Kartı */}
        <div className="card" style={{ borderTop: '4px solid #4f46e5' }}>
          <h3 style={{ color: '#4f46e5', marginBottom: '1rem' }}>🔗 Faydalı Bağlantı Ekle</h3>
          <form onSubmit={handleAddBaglanti} className="admin-form">
            <input
              type="text"
              className="form-input"
              placeholder="Başlık (Örn: EBA Giriş)"
              value={linkTitle}
              onChange={(e) => setLinkTitle(e.target.value)}
            />
            <textarea
              className="form-input"
              rows="2"
              placeholder="Kısa açıklama (Örn: Dijital kütüphane ve ders tekrarları)"
              value={linkDesc}
              onChange={(e) => setLinkDesc(e.target.value)}
            />
            <input
              type="url"
              className="form-input"
              placeholder="Adres (https://...)"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
            <select className="form-input" value={linkGrup} onChange={(e) => setLinkGrup(e.target.value)}>
              {HEDEF_GRUPLAR.map((g) => (
                <option key={g} value={g}>
                  {g === 'Genel' ? 'Genel (her iki sekmede de görünür)' : `${g} sekmesinde`}
                </option>
              ))}
            </select>
            <button type="submit" disabled={isLinkSubmitting} className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
              {isLinkSubmitting ? 'Ekleniyor...' : 'Bağlantıyı Yayınla'}
            </button>
          </form>
        </div>

      </div>

      <h2 className="section-title" style={{ marginTop: '4rem' }}>Yayınlanan İçerikler</h2>

      {listeYukleniyor ? (
        <p className="durum-mesaji">Yükleniyor...</p>
      ) : (
        <div className="grid-2" style={{ marginBottom: '4rem' }}>
          <div className="card" style={{ borderTop: '4px solid var(--color-primary)' }}>
            <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>
              📣 Duyurular ({duyuruListesi.length})
            </h3>
            {duyuruListesi.length === 0 ? (
              <p className="liste-bos">Henüz duyuru eklenmemiş.</p>
            ) : (
              duyuruListesi.map((duyuru) => (
                <div key={duyuru.id} className="liste-satir">
                  <div className="liste-bilgi">
                    <strong>{duyuru.title}</strong>
                    <span>{duyuru.date?.toDate ? duyuru.date.toDate().toLocaleDateString('tr-TR') : 'Yeni'}</span>
                  </div>
                  <button
                    type="button"
                    className="btn-sil"
                    disabled={silinenId === duyuru.id}
                    onClick={() => handleSil('duyuru', duyuru.id, duyuru.title)}
                  >
                    {silinenId === duyuru.id ? 'Siliniyor...' : 'Sil'}
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="card" style={{ borderTop: '4px solid var(--color-secondary)' }}>
            <h3 style={{ color: 'var(--color-secondary)', marginBottom: '1rem' }}>
              📚 Haftalık Ödevler ({odevListesi.length})
            </h3>
            {odevListesi.length === 0 ? (
              <p className="liste-bos">Henüz ödev programı eklenmemiş.</p>
            ) : (
              odevListesi.map((odev, index) => (
                <div key={odev.id} className="liste-satir">
                  <div className="liste-bilgi">
                    <strong>
                      {odev.weekTitle}
                      {index === 0 && <span className="liste-rozet">Aktif</span>}
                    </strong>
                    <span>{odev.date?.toDate ? odev.date.toDate().toLocaleDateString('tr-TR') : 'Yeni'}</span>
                  </div>
                  <button
                    type="button"
                    className="btn-sil"
                    disabled={silinenId === odev.id}
                    onClick={() => handleSil('odev', odev.id, odev.weekTitle)}
                  >
                    {silinenId === odev.id ? 'Siliniyor...' : 'Sil'}
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="card" style={{ borderTop: '4px solid #d97706' }}>
            <h3 style={{ color: '#d97706', marginBottom: '1rem' }}>
              🖼️ Galeri ({fotoListesi.length})
            </h3>
            {fotoListesi.length === 0 ? (
              <p className="liste-bos">Henüz fotoğraf eklenmemiş.</p>
            ) : (
              fotoListesi.map((foto) => (
                <div key={foto.id} className="liste-satir">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="liste-onizleme" src={foto.imageUrl} alt="" />
                  <div className="liste-bilgi" style={{ flex: 1 }}>
                    <strong>{foto.title}</strong>
                    <span>{foto.category}</span>
                  </div>
                  <button
                    type="button"
                    className="btn-sil"
                    disabled={silinenId === foto.id}
                    onClick={() => handleSil('foto', foto.id, foto.title)}
                  >
                    {silinenId === foto.id ? 'Siliniyor...' : 'Sil'}
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="card" style={{ borderTop: '4px solid #4f46e5' }}>
            <h3 style={{ color: '#4f46e5', marginBottom: '1rem' }}>
              🔗 Faydalı Bağlantılar ({baglantiListesi.length})
            </h3>
            {baglantiListesi.length === 0 ? (
              <p className="liste-bos">Henüz bağlantı eklenmemiş.</p>
            ) : (
              baglantiListesi.map((baglanti) => (
                <div key={baglanti.id} className="liste-satir">
                  <div className="liste-bilgi">
                    <strong>{baglanti.title}</strong>
                    <span>{baglanti.targetGroup}</span>
                  </div>
                  <button
                    type="button"
                    className="btn-sil"
                    disabled={silinenId === baglanti.id}
                    onClick={() => handleSil('baglanti', baglanti.id, baglanti.title)}
                  >
                    {silinenId === baglanti.id ? 'Siliniyor...' : 'Sil'}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </main>
  );
}
