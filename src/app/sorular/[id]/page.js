"use client";
import React from 'react';
import Link from 'next/link';

export default function SoruBankasiDetay({ params }) {
  // Unwrap params carefully for Next 15 compatibility
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;

  // Mock veritabanı
  const data = {
    'matematik': {
      title: 'Matematik Soru Bankası',
      desc: 'Doğal sayılar, toplama, çıkarma ve çarpma işlemleri pratik testleri.',
      color: 'var(--color-primary)',
      tests: [
        { name: 'Test 1: Doğal Sayılar', questions: 20 },
        { name: 'Test 2: Toplama İşlemi', questions: 15 },
        { name: 'Test 3: Çıkarma İşlemi', questions: 15 },
        { name: 'Test 4: Çarpım Tablosu', questions: 30 },
      ]
    },
    'turkce': {
      title: 'Türkçe Yaprak Testler',
      desc: 'Okuduğunu anlama, yazım kuralları ve eş anlamlı/zıt anlamlı kelimeler.',
      color: 'var(--color-secondary)',
      tests: [
        { name: 'Yaprak Test 1: Okuduğunu Anlama', questions: 10 },
        { name: 'Yaprak Test 2: Yazım Kuralları', questions: 20 },
        { name: 'Yaprak Test 3: Eş Anlamlı Kelimeler', questions: 15 },
      ]
    },
    'fen-bilimleri': {
      title: 'Fen Bilimleri Çalışma Fasikülü',
      desc: 'Duyu organlarımız ve çevre bilinci konularında tekrar soruları.',
      color: '#d97706',
      tests: [
        { name: 'Fasikül Bölüm 1: Duyu Organlarımız', questions: 25 },
        { name: 'Fasikül Bölüm 2: Çevremizi Koruyalım', questions: 20 },
      ]
    }
  };

  const bank = data[id];

  if (!bank) {
    return (
      <main className="container">
        <h1 className="section-title">Soru bankası bulunamadı.</h1>
        <Link href="/sorular" className="btn btn-secondary">Geri Dön</Link>
      </main>
    );
  }

  return (
    <main className="container">
      <Link href="/sorular" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 'bold' }}>
        &larr; Soru Bankalarına Dön
      </Link>
      
      <div className="card" style={{ borderTop: `4px solid ${bank.color}`, marginBottom: '3rem' }}>
        <h1 style={{ color: bank.color, marginBottom: '1rem' }}>{bank.title}</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{bank.desc}</p>
      </div>

      <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>İçerik Listesi</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {bank.tests.map((test, index) => (
          <div key={index} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem' }}>
            <div>
              <h3 style={{ marginBottom: '0.25rem' }}>{test.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{test.questions} Soru</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>PDF İndir</button>
              <button className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }} onClick={() => alert("Online çözme modülü yapım aşamasında!")}>Çözmeye Başla</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
