"use client";
import { useEffect } from 'react';
import { optimizeUrl } from '@/lib/cloudinary';

export default function Lightbox({ foto, onKapat }) {
  // Esc ile kapansın; modal açıkken arka plan kaymasın.
  // foto kontrolü şart: bu bileşen kapalıyken de render edildiği için
  // guard olmazsa galeri sayfası açılır açılmaz body kilitleniyor.
  useEffect(() => {
    if (!foto) return;

    const handleKey = (e) => {
      if (e.key === 'Escape') onKapat();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [foto, onKapat]);

  if (!foto) return null;

  const tarih = foto.date?.toDate ? foto.date.toDate().toLocaleDateString('tr-TR') : null;

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={foto.title}
      onClick={onKapat}
    >
      <button type="button" className="lightbox-kapat" onClick={onKapat} aria-label="Kapat">
        &times;
      </button>

      {/* İçeriğe tıklayınca kapanmasın, sadece arka plana tıklayınca kapansın */}
      <figure className="lightbox-icerik" onClick={(e) => e.stopPropagation()}>
        {/* Büyük görünüm — 1400px retina ekranlarda da yeterli */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={optimizeUrl(foto.imageUrl, 1400)} alt={foto.title} />
        <figcaption>
          <strong>{foto.title}</strong>
          <span>
            {foto.category}
            {tarih && ` · ${tarih}`}
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
