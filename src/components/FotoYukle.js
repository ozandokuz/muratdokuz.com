"use client";
import { useRef, useState } from 'react';
import { fotoYukle, optimizeUrl } from '@/lib/cloudinary';

export default function FotoYukle({ deger, onYuklendi }) {
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState('');
  const inputRef = useRef(null);

  const handleDosya = async (e) => {
    const dosya = e.target.files?.[0];
    if (!dosya) return;

    setHata('');
    setYukleniyor(true);
    try {
      onYuklendi(await fotoYukle(dosya));
    } catch (err) {
      console.error(err);
      setHata('Fotoğraf yüklenemedi. Tekrar deneyin.');
    } finally {
      setYukleniyor(false);
      // Aynı dosyayı tekrar seçebilmek için input'u sıfırla.
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="foto-yukle">
      <input
        ref={inputRef}
        id="foto-dosya"
        type="file"
        accept="image/*"
        onChange={handleDosya}
        disabled={yukleniyor}
        hidden
      />

      {deger ? (
        <div className="foto-onizleme">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={optimizeUrl(deger, 200)} alt="Yüklenen fotoğraf" />
          <div>
            <strong>Fotoğraf yüklendi</strong>
            <button type="button" onClick={() => onYuklendi('')}>Kaldır</button>
          </div>
        </div>
      ) : (
        <label htmlFor="foto-dosya" className={yukleniyor ? 'foto-sec yukleniyor' : 'foto-sec'}>
          {yukleniyor ? 'Yükleniyor...' : '📷 Fotoğraf Seç'}
        </label>
      )}

      {hata && <p className="foto-hata">{hata}</p>}
    </div>
  );
}
