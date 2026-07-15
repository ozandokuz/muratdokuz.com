"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKLER = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/duyurular', label: 'Duyurular' },
  { href: '/odevler', label: 'Ödevler' },
  { href: '/sorular', label: 'Soru Bankası' },
  { href: '/hakkimda', label: 'Hakkımda' },
];

export default function Navbar() {
  const [acik, setAcik] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="/" onClick={() => setAcik(false)}>Murat Dokuz | Sınıf Öğretmeni</Link>
      </div>

      <button
        type="button"
        className="menu-btn"
        onClick={() => setAcik(!acik)}
        aria-label={acik ? 'Menüyü kapat' : 'Menüyü aç'}
        aria-expanded={acik}
      >
        <span className={acik ? 'menu-ikon acik' : 'menu-ikon'} />
      </button>

      <ul className={acik ? 'nav-links acik' : 'nav-links'}>
        {LINKLER.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={pathname === link.href ? 'active' : undefined}
              onClick={() => setAcik(false)}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
