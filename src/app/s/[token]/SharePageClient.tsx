'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  SharedShipmentResult,
  SharedShipmentGoods,
  SharedShipmentContainer,
  SharedShipmentOrder,
  PlatformInfo,
  getStatusConfig,
  TYPE_LABELS,
} from './types';

// ============================================================================
// Icons (inline SVG for zero dependencies)
// ============================================================================

function PackageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" />
    </svg>
  );
}

function TruckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" />
    </svg>
  );
}

function ShipIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76" /><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" /><path d="M12 10v4" /><path d="M12 2v3" />
    </svg>
  );
}

function PlaneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12h20" /><path d="M13 2v6l7 4-7 4v6l10-8z" /><path d="M11 2v6L4 12l7 4v6L1 12z" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.801 10A10 10 0 1 1 17 3.335" /><path d="m9 11 3 3L22 4" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" />
    </svg>
  );
}

function QrIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="5" height="5" x="3" y="3" rx="1" /><rect width="5" height="5" x="16" y="3" rx="1" /><rect width="5" height="5" x="3" y="16" rx="1" /><path d="M21 16h-3a2 2 0 0 0-2 2v3" /><path d="M21 21v.01" /><path d="M12 7v3a2 2 0 0 1-2 2H7" /><path d="M3 12h.01" /><path d="M12 3h.01" /><path d="M12 16v.01" /><path d="M16 12h1" /><path d="M21 12v.01" /><path d="M12 21v-1" />
    </svg>
  );
}

function SmartphoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

// ============================================================================
// Helpers
// ============================================================================

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '-';
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatDateTime(dateStr: string | undefined): string {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '-';
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

function getShippingModeIcon(mode?: string) {
  if (!mode) return <TruckIcon className="w-4 h-4" />;
  const m = mode.toUpperCase();
  if (m === 'AIR') return <PlaneIcon className="w-4 h-4" />;
  if (m === 'SEA') return <ShipIcon className="w-4 h-4" />;
  return <TruckIcon className="w-4 h-4" />;
}

// ============================================================================
// Sub-Components
// ============================================================================

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg bg-[#0277BD] flex items-center justify-center">
        <PackageIcon className="w-5 h-5 text-white" />
      </div>
      <span className="font-bold text-[#0277BD] text-lg tracking-tight">ChinaLink Express</span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config = getStatusConfig(status);
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold"
      style={{ color: config.color, backgroundColor: config.bg }}
    >
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: config.color }} />
      {config.label}
    </span>
  );
}

function DetailRow({ label, value, icon }: { label: string; value?: string | number | null; icon?: React.ReactNode }) {
  if (value === undefined || value === null || value === '') return null;
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-[var(--border)] last:border-0">
      <span className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
        {icon}
        {label}
      </span>
      <span className="text-sm font-medium text-[var(--text-primary)]">{value}</span>
    </div>
  );
}

function Timeline({ events }: { events: SharedShipmentResult['timeline'] }) {
  if (!events || events.length === 0) {
    return (
      <div className="text-center py-8 text-[var(--text-muted)]">
        <ClockIcon className="w-10 h-10 mx-auto mb-2 opacity-50" />
        <p className="text-sm">Aucun historique disponible</p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {events.map((event, index) => {
        const config = getStatusConfig(event.status);
        const isLast = index === events.length - 1;
        return (
          <div key={index} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div
                className="w-3 h-3 rounded-full shrink-0 mt-1.5"
                style={{ backgroundColor: config.color }}
              />
              {!isLast && <div className="w-0.5 flex-1 bg-[var(--border)] my-1" />}
            </div>
            <div className={`pb-6 ${isLast ? '' : ''}`}>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-[var(--text-primary)]">{config.label}</span>
                <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">{formatDate(event.timestamp)}</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">{event.location}</p>
              {event.description && (
                <p className="text-xs text-[var(--text-tertiary)] mt-0.5">{event.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DetailCard({ data }: { data: SharedShipmentResult }) {
  const { type, data: details, estimatedDelivery } = data;

  return (
    <div className="card-surface rounded-2xl p-5">
      <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Détails</h2>

      {type === 'goods' && (
        <>
          <DetailRow label="Description" value={(details as SharedShipmentGoods).description} />
          <DetailRow label="Catégorie" value={(details as SharedShipmentGoods).category} />
          <DetailRow label="Poids" value={(details as SharedShipmentGoods).weightKg ? `${(details as SharedShipmentGoods).weightKg} kg` : undefined} />
          <DetailRow label="Volume" value={(details as SharedShipmentGoods).cbm ? `${(details as SharedShipmentGoods).cbm} CBM` : undefined} />
          <DetailRow label="Quantité" value={(details as SharedShipmentGoods).quantity} />
          <DetailRow
            label="Mode d'expédition"
            value={(details as SharedShipmentGoods).shippingMode}
            icon={getShippingModeIcon((details as SharedShipmentGoods).shippingMode)}
          />
          {(details as SharedShipmentGoods).container?.virtualContainerNumber && (
            <DetailRow label="Container" value={(details as SharedShipmentGoods).container?.virtualContainerNumber} />
          )}
          {(details as SharedShipmentGoods).airwayBill?.awbNumber && (
            <DetailRow label="AWB" value={(details as SharedShipmentGoods).airwayBill?.awbNumber} />
          )}
        </>
      )}

      {type === 'container' && (
        <>
          <DetailRow label="Numéro Container" value={(details as SharedShipmentContainer).containerNumber} />
          <DetailRow label="Compagnie" value={(details as SharedShipmentContainer).shippingLine} />
          <DetailRow
            label="Mode d'expédition"
            value={(details as SharedShipmentContainer).shippingMode}
            icon={getShippingModeIcon((details as SharedShipmentContainer).shippingMode)}
          />
          <DetailRow label="Origine" value={(details as SharedShipmentContainer).origin} />
          <DetailRow label="Destination" value={(details as SharedShipmentContainer).destination} />
          <DetailRow label="Marchandises" value={`${(details as SharedShipmentContainer).goodsCount} article(s)`} />
        </>
      )}

      {type === 'order' && (
        <>
          <DetailRow label="Commande" value={(details as SharedShipmentOrder).orderId} />
          <DetailRow
            label="Mode d'expédition"
            value={(details as SharedShipmentOrder).shippingMode}
            icon={getShippingModeIcon((details as SharedShipmentOrder).shippingMode)}
          />
          <DetailRow label="Destination" value={(details as SharedShipmentOrder).destinationCountry} />
          <DetailRow label="Ligne" value={(details as SharedShipmentOrder).shipmentLine} />
          <DetailRow label="Poids" value={(details as SharedShipmentOrder).packageWeight} />
          <DetailRow label="Quantité" value={(details as SharedShipmentOrder).quantity} />
          <DetailRow label="Marchandises" value={`${(details as SharedShipmentOrder).goodsCount} article(s)`} />
        </>
      )}

      {estimatedDelivery && (
        <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-[#EFF8FF]">
          <ClockIcon className="w-5 h-5 text-[#0277BD] shrink-0" />
          <div>
            <p className="text-xs text-[var(--text-secondary)]">Livraison estimée</p>
            <p className="text-base font-bold text-[#0277BD]">{formatDate(estimatedDelivery)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ErrorState({ title, message, action }: { title: string; message: string; action?: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <header className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center">
          <Logo />
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-[#FEF2F2] flex items-center justify-center mx-auto mb-4">
            <AlertIcon className="w-8 h-8 text-[#EF4444]" />
          </div>
          <h1 className="text-xl font-bold text-[var(--text-primary)] mb-2">{title}</h1>
          <p className="text-sm text-[var(--text-secondary)] mb-6">{message}</p>
          {action || (
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0277BD] text-white rounded-xl text-sm font-semibold hover:bg-[#01579B] transition-colors"
            >
              Retour à l'accueil
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}

function AppCTA({ token, platform }: { token: string; platform: PlatformInfo }) {
  const appUrl = `chinalinkexpress://s/${token}`;
  const webUrl = typeof window !== 'undefined' ? window.location.href : `https://chinalinkexpress.com/s/${token}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(webUrl)}`;

  return (
    <div className="card-surface rounded-2xl p-5 space-y-4">
      <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
        Ouvrir dans l'application
      </h3>

      {platform.isIOS && (
        <>
          <a
            href={appUrl}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#0277BD] text-white rounded-xl text-sm font-semibold hover:bg-[#01579B] transition-colors"
          >
            <SmartphoneIcon className="w-5 h-5" />
            Ouvrir dans ChinaLink Express
          </a>
          <p className="text-xs text-[var(--text-muted)] text-center">
            iPhone détecté. Si l'app est installée, elle s'ouvrira automatiquement.
          </p>
        </>
      )}

      {platform.isAndroid && (
        <>
          <a
            href={`intent://s/${token}#Intent;scheme=chinalinkexpress;package=com.nuvotech.chinalinkexpress;end`}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#0277BD] text-white rounded-xl text-sm font-semibold hover:bg-[#01579B] transition-colors"
          >
            <SmartphoneIcon className="w-5 h-5" />
            Ouvrir dans ChinaLink Express
          </a>
          <p className="text-xs text-[var(--text-muted)] text-center">
            Android détecté. Si l'app est installée, elle s'ouvrira automatiquement.
          </p>
        </>
      )}

      {platform.isDesktop && (
        <div className="text-center">
          <div className="inline-block p-3 bg-white rounded-xl border border-[var(--border)] mb-3">
            <img src={qrUrl} alt="QR Code" className="w-32 h-32" />
          </div>
          <p className="text-xs text-[var(--text-muted)] mb-4">
            Scannez ce QR code avec votre téléphone pour ouvrir le suivi dans l'app.
          </p>
        </div>
      )}

      <div className="pt-3 border-t border-[var(--border)]">
        <p className="text-xs text-[var(--text-muted)] text-center mb-3">Vous n'avez pas l'app ?</p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <a
            href="https://apps.apple.com/app/chinalink-express"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface-lowered)] transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.05.05-2.31.71-3.06 1.63-.68.83-1.27 2.15-1.11 3.23 1.18.09 2.38-.66 3.1-1.75z"/></svg>
            App Store
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.nuvotech.chinalinkexpress"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface-lowered)] transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.59.69.59 1.19s-.22.9-.57 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.27 1.31zM6.05 2.66l10.76 6.22-2.27 2.27L6.05 2.66z"/></svg>
            Google Play
          </a>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Main Client Component
// ============================================================================

interface SharePageClientProps {
  token: string;
  initialData: SharedShipmentResult | null;
  platform: PlatformInfo;
}

export function SharePageClient({ token, initialData, platform }: SharePageClientProps) {
  const [data, setData] = useState<SharedShipmentResult | null>(initialData);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  // Client-side fetch if server-side fetch failed (e.g. API transient error)
  useEffect(() => {
    if (initialData) return;

    async function fetchClientSide() {
      try {
        const res = await fetch(`https://api.chinalinkexpress.com/api/v2/public/share/${token}`);
        if (res.status === 404) {
          setError('not_found');
          return;
        }
        if (res.status === 410) {
          setError('expired');
          return;
        }
        if (!res.ok) throw new Error('API error');
        const json = await res.json();
        setData(json.data);
      } catch {
        setError('api_down');
      } finally {
        setLoading(false);
      }
    }

    fetchClientSide();
  }, [initialData, token]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-[var(--border)] border-t-[#0277BD] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-[var(--text-secondary)]">Chargement du suivi...</p>
        </div>
      </div>
    );
  }

  // Error states
  if (error === 'not_found' || (!data && !loading)) {
    return (
      <ErrorState
        title="Lien introuvable"
        message="Ce lien de suivi n'existe pas ou a été supprimé. Vérifiez l'URL ou contactez l'expéditeur."
      />
    );
  }

  if (error === 'expired') {
    return (
      <ErrorState
        title="Lien expiré"
        message="Ce lien de suivi a expiré ou a été révoqué. Demandez à l'expéditeur de générer un nouveau lien."
      />
    );
  }

  if (error === 'api_down') {
    return (
      <ErrorState
        title="Service temporairement indisponible"
        message="Impossible de charger les informations de suivi pour le moment. Veuillez réessayer plus tard."
      />
    );
  }

  if (!data) {
    return (
      <ErrorState
        title="Erreur inconnue"
        message="Une erreur est survenue lors du chargement du suivi. Veuillez réessayer."
      />
    );
  }

  // Main content
  const { type, data: details, currentStatus, timeline, sharedAt } = data;
  const typeLabel = TYPE_LABELS[type] || type;
  const statusConfig = getStatusConfig(currentStatus);

  let reference = '';
  if (type === 'goods') reference = (details as SharedShipmentGoods).goodsId || '';
  else if (type === 'container') reference = (details as SharedShipmentContainer).containerNumber || '';
  else if (type === 'order') reference = (details as SharedShipmentOrder).orderId || '';

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="border-b border-[var(--border)] bg-[var(--surface)] sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <Logo />
          <Link
            href="/"
            className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            Accueil
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-4 py-6 space-y-5">
        {/* Status Card */}
        <div className="card-surface rounded-2xl p-5 text-center">
          <p className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider mb-2">
            {typeLabel}
          </p>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-3 break-all">
            {reference}
          </h1>
          <div className="flex justify-center">
            <StatusBadge status={currentStatus} />
          </div>
          {sharedAt && (
            <p className="text-xs text-[var(--text-muted)] mt-3">
              Partagé le {formatDate(sharedAt)}
            </p>
          )}
        </div>

        {/* Details */}
        <DetailCard data={data} />

        {/* Timeline */}
        <div className="card-surface rounded-2xl p-5">
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Historique</h2>
          <Timeline events={timeline} />
        </div>

        {/* App CTA */}
        <AppCTA token={token} platform={platform} />

        {/* Footer note */}
        <p className="text-center text-xs text-[var(--text-muted)] pb-4">
          Données fournies par ChinaLink Express. Les délais sont indicatifs.
        </p>
      </main>
    </div>
  );
}
