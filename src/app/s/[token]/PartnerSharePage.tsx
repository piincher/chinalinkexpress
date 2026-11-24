/**
 * /s/:token for a partner's end customer (type "partner_customer").
 *
 * Partner-branded (business name on top, "via ChinaLink Express" at the
 * bottom). The customer sees every carton the partner attributed to them,
 * where it is, reception photos and, if the partner allows it, what they owe
 * the PARTNER. Collected by the partner in Bamako = "Arrivé chez <partner>".
 *
 * shortcut: French only — partners' customers are in Mali; add the site's
 * locale files if a partner outside the francophone area asks.
 */

import type { PartnerShareData, PartnerShareCarton } from './types';

const STEPS = ['RECEIVED', 'LOADED', 'IN_TRANSIT', 'ARRIVED', 'WITH_PARTNER'] as const;
type Step = (typeof STEPS)[number];

const STEP_OF_STATUS: Record<string, Step> = {
  RECEIVED_AT_WAREHOUSE: 'RECEIVED',
  PACKED: 'RECEIVED',
  ASSIGNED_TO_CONTAINER: 'RECEIVED',
  LOADED_IN_CONTAINER: 'LOADED',
  IN_TRANSIT: 'IN_TRANSIT',
  ARRIVED_DESTINATION: 'ARRIVED',
  READY_FOR_PICKUP: 'ARRIVED',
  WITH_PARTNER: 'WITH_PARTNER',
};

const fcfa = (n: number) => `${new Intl.NumberFormat('fr-FR').format(n).replace(/ /g, ' ')} FCFA`;
const day = (iso: string) => new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

function stepLabel(step: Step, partner: string, air: boolean) {
  switch (step) {
    case 'RECEIVED': return 'Reçu à l’entrepôt en Chine';
    case 'LOADED': return air ? 'Prêt pour le vol' : 'Chargé dans le conteneur';
    case 'IN_TRANSIT': return 'En route';
    case 'ARRIVED': return 'Arrivé à destination';
    case 'WITH_PARTNER': return `Arrivé chez ${partner}`;
  }
}

function stepDate(step: Step, dates: PartnerShareCarton['dates']) {
  switch (step) {
    case 'RECEIVED': return dates.RECEIVED_AT_WAREHOUSE;
    case 'LOADED': return dates.LOADED_IN_CONTAINER;
    case 'IN_TRANSIT': return dates.IN_TRANSIT;
    case 'ARRIVED': return dates.ARRIVED_DESTINATION || dates.READY_FOR_PICKUP;
    case 'WITH_PARTNER': return dates.DELIVERED;
  }
}

const card: React.CSSProperties = {
  padding: 'var(--space-lg)',
  borderRadius: 'var(--radius-panel)',
  background: 'var(--color-paper)',
  border: '1px solid var(--color-rule)',
};
const muted: React.CSSProperties = { margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-neutral)' };

function Carton({ carton, partner }: { carton: PartnerShareCarton; partner: string }) {
  const step = STEP_OF_STATUS[carton.status];
  const current = step ? STEPS.indexOf(step) : -1;
  const air = carton.mode === 'AIR';
  const title = step ? stepLabel(step, partner, air) : 'En cours de traitement';

  return (
    <article className="ptrack">
      <div className="ptrack-head">
        <div className="ptrack-meta">
          <span style={{ fontFamily: 'var(--font-mono)' }}>{carton.code}</span>
          {carton.mode ? <span className="ptrack-chip">{air ? 'Aérien' : 'Maritime'}</span> : null}
        </div>
        {carton.description ? <p style={{ ...muted, color: 'var(--color-ink-2)' }}>{carton.description}</p> : null}
        <h2 className="ptrack-status" style={{ fontSize: 'var(--text-xl)' }}>{title}</h2>
        {current >= 0 ? (
          <div className="ptrack-bar" aria-hidden="true">
            <span style={{ width: `${((current + 1) / STEPS.length) * 100}%` }} />
          </div>
        ) : null}
      </div>

      {carton.estimatedArrival && current < STEPS.indexOf('ARRIVED') ? (
        <p className="ptrack-eta">Arrivée prévue : {day(carton.estimatedArrival)}</p>
      ) : null}

      {current >= 0 ? (
        <ol className="ptrack-steps">
          {STEPS.map((s, i) => {
            const when = i <= current ? stepDate(s, carton.dates) : null;
            return (
              <li key={s} aria-current={i === current ? 'step' : undefined} data-state={i < current ? 'done' : i === current ? 'now' : 'next'}>
                <span className="ptrack-dot" aria-hidden="true">{i < current ? '✓' : null}</span>
                <span className="ptrack-label">
                  {stepLabel(s, partner, air)}
                  {when ? <time dateTime={when}>{day(when)}</time> : null}
                </span>
              </li>
            );
          })}
        </ol>
      ) : null}

      {carton.photos.length ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(6.5rem, 1fr))', gap: 'var(--space-xs)' }}>
          {carton.photos.map((url, i) => (
            <a key={url} href={url} target="_blank" rel="noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element -- signed Spaces URLs, not in next/image domains */}
              <img src={url} alt={`Photo ${i + 1} du colis ${carton.code} à la réception`} loading="lazy"
                style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: 'var(--radius-input)', display: 'block', background: 'var(--color-paper-2)' }} />
            </a>
          ))}
        </div>
      ) : null}

      {carton.price ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-sm)', flexWrap: 'wrap', paddingTop: 'var(--space-sm)', borderTop: '1px solid var(--color-rule)', fontSize: 'var(--text-sm)' }}>
          {'pending' in carton.price ? (
            <span style={{ color: 'var(--color-neutral)' }}>Prix à venir</span>
          ) : (
            <>
              <span>Prix : <strong>{fcfa(carton.price.sellPrice)}</strong></span>
              <span style={{ color: carton.price.remaining > 0 ? 'var(--color-ink)' : 'var(--color-neutral)' }}>
                {carton.price.remaining > 0 ? <>Reste : <strong>{fcfa(carton.price.remaining)}</strong></> : 'Soldé'}
              </span>
            </>
          )}
        </div>
      ) : null}
    </article>
  );
}

export function PartnerSharePage({ data }: { data: PartnerShareData }) {
  const partner = data.partner.name;
  const phone = (data.partner.phoneNumber || '').replace(/\D/g, '');

  return (
    <main style={{ minHeight: '100vh', background: 'var(--color-paper-2)', color: 'var(--color-ink)', padding: '2rem 1rem 3rem', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '36rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        <header style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
          <p style={{ ...muted, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Suivi de vos colis</p>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', lineHeight: 1.1 }}>{partner}</h1>
          <p style={{ margin: 0, color: 'var(--color-ink-2)' }}>
            Bonjour {data.customer.name}, voici où en sont vos colis.
          </p>
        </header>

        {phone ? (
          <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer"
              style={{ padding: '0.7rem 1.1rem', borderRadius: 'var(--radius-pill)', background: 'var(--color-accent)', color: 'var(--color-accent-ink)', fontWeight: 600, textDecoration: 'none' }}>
              Écrire à {partner} sur WhatsApp
            </a>
            <a href={`tel:+${phone}`}
              style={{ padding: '0.7rem 1.1rem', borderRadius: 'var(--radius-pill)', border: '1px solid var(--color-rule-2)', color: 'var(--color-ink)', fontWeight: 600, textDecoration: 'none' }}>
              Appeler
            </a>
          </div>
        ) : null}

        {data.totals && (data.totals.sold > 0 || data.totals.unpriced > 0) ? (
          <section style={{ ...card, display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 'var(--space-sm)' }} aria-label="Montants">
            {[
              ['Total', data.totals.sold],
              ['Payé', data.totals.paid],
              ['Reste à payer', data.totals.remaining],
            ].map(([label, value]) => (
              <div key={label as string} style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', minWidth: 0 }}>
                <span style={muted}>{label}</span>
                <strong style={{ fontSize: 'var(--text-base)', overflowWrap: 'anywhere' }}>{fcfa(value as number)}</strong>
              </div>
            ))}
            {data.totals.unpriced > 0 ? (
              <p style={{ ...muted, gridColumn: '1 / -1' }}>
                {data.totals.unpriced === 1 ? '1 colis n’a pas encore de prix.' : `${data.totals.unpriced} colis n’ont pas encore de prix.`}
              </p>
            ) : null}
          </section>
        ) : null}

        {data.cartons.length ? (
          data.cartons.map((carton) => <Carton key={carton.code} carton={carton} partner={partner} />)
        ) : (
          <p style={{ ...card, margin: 0 }}>Aucun colis pour le moment. Ils apparaîtront ici dès leur réception à l’entrepôt.</p>
        )}

        <footer style={{ ...muted, textAlign: 'center', paddingTop: 'var(--space-md)' }}>
          Expédié via ChinaLink Express
        </footer>
      </div>
    </main>
  );
}
