import "./globals.css";
import Link from 'next/link';

export const metadata = {
  title: "Murat Dokuz - Sınıf Öğretmeni",
  description: "Öğrenciler ve veliler için duyuru, haber ve haftalık ödev platformu.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <nav className="navbar">
          <div className="logo">
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Murat Dokuz | Sınıf Öğretmeni</Link>
          </div>
          <ul className="nav-links">
            <li><Link href="/">Ana Sayfa</Link></li>
            <li><Link href="/duyurular">Duyurular</Link></li>
            <li><Link href="/odevler">Ödevler</Link></li>
            <li><Link href="/sorular">Soru Bankası</Link></li>
            <li><Link href="/hakkimda">Hakkımda</Link></li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
