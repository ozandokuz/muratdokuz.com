import { GUNLER, parseGorevler } from "@/lib/odevler";

export default function HaftaTablosu({ odev }) {
  return (
    <div className="hw-grid">
      {GUNLER.map((gun) => {
        const gorevler = parseGorevler(odev[gun.key]);

        return (
          <div key={gun.key} className="hw-day">
            <div className="hw-day-header">
              <div className="hw-day-name">{gun.label}</div>
              <div className="hw-day-date">
                {gorevler.length > 0 ? `${gorevler.length} görev` : "Ödev yok"}
              </div>
            </div>

            {gorevler.length === 0 ? (
              <p className="hw-empty">Bu güne ödev verilmedi.</p>
            ) : (
              gorevler.map((gorev, index) => (
                <div key={index} className="hw-task">
                  {gorev.ders && <strong>{gorev.ders}</strong>}
                  {gorev.aciklama}
                </div>
              ))
            )}
          </div>
        );
      })}
    </div>
  );
}
