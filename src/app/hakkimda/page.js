export default function Hakkimda() {
  return (
    <main className="container">
      <h1 className="section-title" style={{ marginTop: '2rem' }}>Hakkımda</h1>
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem', display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>
        <div style={{ flex: '1' }}>
          <h2 style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontSize: '2rem' }}>Murat Dokuz</h2>
          <h3 style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Uzman Sınıf Öğretmeni</h3>
          <p style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
            Merhaba, ben Murat Dokuz. Yılların getirdiği sınıf öğretmenliği tecrübemle, çocuklarımızın eğitim hayatındaki ilk ve en önemli adımlarını sağlam atmaları için çalışıyorum.
          </p>
          <p style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
            Eğitim felsefem; her çocuğun kendi öğrenme hızına ve şekline saygı duyarak, onlara sadece akademik bilgiyi değil, aynı zamanda iyi bir insan olma erdemlerini de aşılamaktır.
          </p>
          <p style={{ lineHeight: '1.8' }}>
            Velilerimizle sürekli iletişim halinde kalarak, okul-aile işbirliğinin en güzel örneklerini sergilemek benim için çok değerli. Bu web sitesini de bu iletişimi daha şeffaf ve erişilebilir kılmak için kurduk. Yeni dönemimiz hepimiz için aydınlık olsun.
          </p>
        </div>
      </div>
    </main>
  );
}
