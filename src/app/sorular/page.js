"use client";
import Link from 'next/link';

export default function Sorular() {
  return (
    <main className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', marginBottom: '3rem' }}>
        <h1 className="section-title" style={{ margin: 0, left: '0', transform: 'none' }}>Soru Bankası</h1>
        <button className="btn btn-primary" onClick={() => alert("Soru Bankası Ekleme Paneli (Yönetici Girişi Gerektirir) - İleride eklenecek!")}>+ Yeni Ekle</button>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>Matematik Soru Bankası</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Doğal sayılar, toplama, çıkarma ve çarpma işlemleri pratik testleri.</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>İndir (PDF)</button>
            <Link href="/sorular/matematik" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', textDecoration: 'none' }}>İncele</Link>
          </div>
        </div>

        <div className="card">
          <h3 style={{ color: 'var(--color-secondary)', marginBottom: '1rem' }}>Türkçe Yaprak Testler</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Okuduğunu anlama, yazım kuralları ve eş anlamlı/zıt anlamlı kelimeler.</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>İndir (PDF)</button>
            <Link href="/sorular/turkce" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', textDecoration: 'none' }}>İncele</Link>
          </div>
        </div>

        <div className="card">
          <h3 style={{ color: '#d97706', marginBottom: '1rem' }}>Fen Bilimleri Çalışma Fasikülü</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Duyu organlarımız ve çevre bilinci konularında tekrar soruları.</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>İndir (PDF)</button>
            <Link href="/sorular/fen-bilimleri" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', textDecoration: 'none' }}>İncele</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
