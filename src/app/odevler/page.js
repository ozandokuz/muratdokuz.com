export default function Odevler() {
  return (
    <main className="container">
      <h1 className="section-title" style={{ marginTop: '2rem' }}>Geçmiş ve Güncel Ödevler</h1>
      
      <div className="card" style={{ marginBottom: '2rem', borderTop: '4px solid var(--color-primary)' }}>
        <h3 style={{ marginBottom: '1rem' }}>11 - 15 Nisan Haftası (Aktif)</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Bu haftanın detaylı ödev dağılımını ana sayfada görebilirsiniz. Tüm testler soru bankasından verilmiştir.</p>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>4 - 8 Nisan Haftası</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Matematik zaman ölçüleri tamamlandı, Türkçe hikaye haritası oluşturma ödevi teslim edildi.</p>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>28 Mart - 1 Nisan Haftası</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Fen bilimleri bitki çimlendirme deneyi sonuçları gözlemlendi.</p>
      </div>
    </main>
  );
}
