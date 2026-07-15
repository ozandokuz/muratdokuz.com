import "./globals.css";
import Navbar from '@/components/Navbar';

export const metadata = {
  title: "Murat Dokuz - Sınıf Öğretmeni",
  description: "Öğrenciler ve veliler için duyuru, haber ve haftalık ödev platformu.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
