import React from 'react';
import { Footprints, Bus, ChevronRight } from 'lucide-react';

export const MobilityTiles = ({ destination, onOpenGuide }) => {
  return (
    <div className="mobility-tiles-grid" aria-label="移動手段の目安">
      {/* 徒歩目安情報タイル */}
      <div
        className="mobility-tile walk-tile"
        onClick={() => onOpenGuide && onOpenGuide(destination, 'WALK')}
        role="button"
        tabIndex={0}
        aria-label={`徒歩の目安 ${destination.walkMin}分。タップで道順を表示`}
      >
        <div className="tile-icon-plate walk-plate">
          <Footprints size={18} strokeWidth={2.4} />
        </div>
        <div className="tile-info">
          <div className="tile-header-line">
            <span className="tile-badge-label">徒歩</span>
            <span className="tile-action-hint">道順 ›</span>
          </div>
          <div className="tile-main-line">
            <strong className="tile-primary-val">{destination.walkMin}分</strong>
            <span className="tile-secondary-val">({destination.walkDistance})</span>
          </div>
        </div>
      </div>

      {/* バス発車情報タイル */}
      <div
        className="mobility-tile bus-tile"
        onClick={() => onOpenGuide && onOpenGuide(destination, 'BUS')}
        role="button"
        tabIndex={0}
        aria-label={`次のバス ${destination.busNextDeparture}。タップで乗り場と運賃を表示`}
      >
        <div className="tile-icon-plate bus-plate">
          <Bus size={18} strokeWidth={2.4} />
        </div>
        <div className="tile-info">
          <div className="tile-header-line">
            <span className="tile-badge-label">バス</span>
            <span className="tile-action-hint">乗場 ›</span>
          </div>
          <div className="tile-main-line">
            <strong className="tile-primary-val">{destination.busNextDeparture}</strong>
            <span className="tile-secondary-val">(約{destination.busMin}分)</span>
          </div>
        </div>
      </div>

      <style>{`
        .mobility-tiles-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 12px;
        }

        .mobility-tile {
          min-height: 48px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          padding: 7px 9px;
          display: flex;
          align-items: center;
          gap: 8px;
          text-align: left;
          cursor: pointer;
          user-select: none;
          transition: all 0.15s ease;
          overflow: hidden;
        }

        .mobility-tile:hover {
          background: #EEF4F8;
          border-color: #CBD5E1;
          transform: translateY(-1px);
        }

        .mobility-tile:active {
          transform: scale(0.98);
        }

        .tile-icon-plate {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .walk-plate {
          background: #ECFDF5;
          color: #059669;
          border: 1px solid #A7F3D0;
        }

        .bus-plate {
          background: #FFF7ED;
          color: #EA580C;
          border: 1px solid #FED7AA;
        }

        .tile-info {
          display: flex;
          flex-direction: column;
          min-width: 0;
          flex: 1;
          gap: 2px;
        }

        .tile-header-line {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .tile-badge-label {
          font-size: 12.5px;
          font-weight: 700;
          color: #475569;
        }

        .tile-action-hint {
          font-size: 11.5px;
          font-weight: 700;
          color: #2563EB;
          letter-spacing: -0.02em;
        }

        .tile-main-line {
          display: flex;
          align-items: baseline;
          gap: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tile-primary-val {
          font-size: 15.5px;
          font-weight: 800;
          color: #0F172A;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        .tile-secondary-val {
          font-size: 12px;
          font-weight: 600;
          color: #64748B;
          letter-spacing: -0.01em;
        }
      `}</style>
    </div>
  );
};
