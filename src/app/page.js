import Link from 'next/link';

export default function Home() {
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
            <h2 className="section-title">Güncel Duyurular</h2>
            
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
          </section>

          <section id="odevler">
            <h2 className="section-title">Haftalık Ödev Tablosu</h2>
            <div className="card" style={{ padding: '2.5rem', textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)', fontSize: '1.5rem' }}>11-15 Nisan Haftası</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '300px' }}>Öğrencilerimiz ödevlerini her günün akşamında düzenli olarak yapmalıdır.</p>
              <a href="#haftalik" className="btn btn-primary">Tüm Programı Görüntüle</a>
            </div>
          </section>
        </div>

        <section id="haftalik" style={{ marginTop: '5rem', marginBottom: '3rem' }}>
          <h2 className="section-title">Gün Gün Ödev Dağılımı</h2>
          <div className="hw-grid">
            {/* Monday */}
            <div className="hw-day">
              <div className="hw-day-header">
                <div className="hw-day-name">Pazartesi</div>
                <div className="hw-day-date">11 Nisan</div>
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
                <div className="hw-day-date">12 Nisan</div>
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
                <div className="hw-day-date">13 Nisan</div>
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
                <div className="hw-day-date">14 Nisan</div>
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
                <div className="hw-day-date">15 Nisan</div>
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
