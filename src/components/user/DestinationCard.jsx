import React from 'react';
import { MapPin, Car } from 'lucide-react';
import { MobilityTiles } from './MobilityTiles';
import { DispatchLongPressButton } from './DispatchLongPressButton';

export const DestinationCard = ({ destination, onDispatch, onOpenGuide, isTripActive = false }) => {
  return (
    <article className="destination-card" aria-labelledby={`dest-title-${destination.id}`}>
      {/* ビジュアルヘッダー (150px) */}
      <div className="card-visual-header">
        <img
          src={destination.image}
          alt={destination.name}
          className="card-header-image"
          loading="lazy"
        />
        <div className="card-header-overlay" />
        
        {/* バッジ */}
        <div className="card-badge" style={{ backgroundColor: destination.badgeColor || '#16324F' }}>
          {destination.badge}
        </div>

        {/* タクシー目安時間ピル */}
        <div className="card-eta-pill">
          <Car size={13} style={{ display: 'inline-block', verticalAlign: '-1px', marginRight: '4px' }} />
          タクシーで約{destination.taxiMin}分
        </div>
      </div>

      {/* カードコンテンツ */}
      <div className="card-body">
        <div className="card-heading">
          <h2 id={`dest-title-${destination.id}`} className="card-title">
            {destination.name}
          </h2>
          <p className="card-subname">{destination.subname}</p>
        </div>

        {/* 安全な乗降場所の手がかり */}
        {destination.safeBoardingPoint && (
          <div className="boarding-hint">
            <MapPin size={14} className="boarding-hint-icon" />
            <span className="boarding-hint-text">
              {destination.safeBoardingPoint.replace(/（[^）]*）|\([^)]*\)/g, '').trim()}
            </span>
          </div>
        )}

        {/* 移動手段の目安（タップで安心道順・乗り場ガイド） */}
        <MobilityTiles destination={destination} onOpenGuide={onOpenGuide} />

        {/* 配車ボタン（2秒長押し） */}
        <DispatchLongPressButton
          destination={destination}
          onComplete={onDispatch}
          disabled={isTripActive}
        />
      </div>

      <style>{`
        .destination-card {
          background-color: var(--surface-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-card);
          box-shadow: var(--shadow-card);
          overflow: hidden;
          margin-bottom: 12px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .destination-card:hover {
          box-shadow: 0 12px 30px -6px rgba(22, 50, 79, 0.1);
        }

        .card-visual-header {
          position: relative;
          height: 110px;
          width: 100%;
          overflow: hidden;
          background-color: #E2E8F0;
        }

        .card-header-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .destination-card:hover .card-header-image {
          transform: scale(1.03);
        }

        .card-header-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.3) 0%, rgba(15, 23, 42, 0.05) 50%, rgba(15, 23, 42, 0.5) 100%);
        }

        .card-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          color: #ffffff;
          font-size: 12px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: var(--radius-badge);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
          letter-spacing: 0.02em;
        }

        .card-eta-pill {
          position: absolute;
          bottom: 10px;
          right: 12px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(4px);
          color: var(--navy-action);
          font-size: 13.5px;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
        }

        .card-body {
          padding: 14px 16px 16px;
        }

        .card-heading {
          margin-bottom: 8px;
        }

        .card-title {
          font-size: 26px;
          font-weight: 800;
          line-height: 1.25;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }

        .card-subname {
          font-size: 15px;
          font-weight: 500;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        .boarding-hint {
          display: flex;
          align-items: center;
          gap: 7px;
          background: #F1F5F9;
          border-radius: 8px;
          padding: 7px 12px;
          margin-bottom: 12px;
        }

        .boarding-hint-icon {
          color: var(--navy-action);
          flex-shrink: 0;
          margin-top: 1px;
        }

        .boarding-hint-text {
          font-size: 14px;
          color: var(--text-secondary);
          font-weight: 600;
          line-height: 1.4;
          word-break: break-word;
        }
      `}</style>
    </article>
  );
};
