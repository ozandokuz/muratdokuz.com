export default function Duyurular() {
  return (
    <main className="container">
      <h1 className="section-title" style={{ marginTop: '2rem' }}>Tüm Duyurular</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        <div className="card announcement-card">
          <div className="date-badge">
            <div className="date-month">Nis</div>
            <div className="date-day">15</div>
          </div>
          <div className="announcement-content">
            <h3>Müze Gezisi Hatırlatması</h3>
            <p>Cuma günü gerçekleştireceğimiz Bilim Müzesi gezisi için izin belgelerini ve katılım paylarını perşembe gününe kadar teslim etmeyi unutmayalım.</p>
          </div>
        </div>

        <div className="card announcement-card">
          <div className="date-badge" style={{ backgroundColor: '#ccfbf1', color: '#0f766e', borderColor: '#99f6e4' }}>
            <div className="date-month">Nis</div>
            <div className="date-day">18</div>
          </div>
          <div className="announcement-content">
            <h3>Veli Toplantısı</h3>
            <p>Önümüzdeki hafta perşembe akşamı saat 19:00'da genel değerlendirme için çevrimiçi (Zoom üzerinden) veli toplantımız olacaktır.</p>
          </div>
        </div>

        <div className="card announcement-card">
          <div className="date-badge" style={{ backgroundColor: '#fef08a', color: '#854d0e', borderColor: '#fde047' }}>
            <div className="date-month">Nis</div>
            <div className="date-day">05</div>
          </div>
          <div className="announcement-content">
            <h3>Okuma Bayramı Hazırlıkları</h3>
            <p>Okuma bayramımız için öğrencilerimize dağıtılan şiirlerin her akşam ezber tekrarı yapılması rica olunur. Kostümlerle ilgili detaylar önümüzdeki hafta paylaşılacaktır.</p>
          </div>
        </div>

      </div>
    </main>
  );
}
