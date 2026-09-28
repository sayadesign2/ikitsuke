import React from 'react';
import { X, Footprints, Bus, MapPin, Shield, CheckCircle, Clock, ArrowRight, AlertCircle, Compass } from 'lucide-react';

export const TransitGuideModal = ({ isOpen, onClose, destination, mode, onStartTrip }) => {
  if (!isOpen || !destination) return null;

  const isWalk = mode === 'WALK';
  const walkData = destination.walkGuide || {
    route: '幹線道路を避けた安全な生活道路ルート',
    points: [
      '歩道と車道が分離された平坦なルートです',
      '途中に休憩可能な日陰ベンチがあります',
      '段差の少ない舗装路です'
    ],
    safetyBackup: '途中で疲れたら、アプリからいつでも現在地へタクシーを呼べます'
  };

  const busData = destination.busGuide || {
    boardingStop: '最寄りの町内バス停（徒歩2〜3分）',
    dropoffStop: `${destination.name}前（降りてすぐ正面入口）`,
    fare: '運賃 約200円（降車時払い・福祉パス対応）',
    departureDetail: `${destination.busNextDeparture}（約15分間隔で運行）`,
    stepCount: '乗降ステップが低く乗り降りしやすい低床バスです'
  };

  return (
    <div className="transit-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="transit-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* ヘッダー */}
        <div className="transit-modal-header">
          <div className="transit-header-left">
            <div className={`transit-badge-icon ${isWalk ? 'walk-bg' : 'bus-bg'}`}>
              {isWalk ? <Footprints size={22} /> : <Bus size={22} />}
            </div>
            <div>
              <span className="transit-sub-label">{isWalk ? '安心のお散歩道案内' : 'バスの乗り方ガイド'}</span>
              <h2 className="transit-modal-title">{destination.name}</h2>
            </div>
          </div>
          <button type="button" className="close-btn" onClick={onClose} aria-label="閉じる">
            <X size={20} />
          </button>
        </div>

        {/* 徒歩ガイドの場合 */}
        {isWalk ? (
          <div className="guide-body-scroll">
            {/* サマリーカード */}
            <div className="summary-pill-card">
              <div className="pill-item">
                <span className="pill-label">徒歩の目安</span>
                <strong className="pill-val">{destination.walkMin}分</strong>
              </div>
              <div className="pill-divider" />
              <div className="pill-item">
                <span className="pill-label">移動距離</span>
                <strong className="pill-val">{destination.walkDistance}</strong>
              </div>
              <div className="pill-divider" />
              <div className="pill-item">
                <span className="pill-label">道の平坦さ</span>
                <strong className="pill-val text-green">坂なし・平坦</strong>
              </div>
            </div>

            {/* おすすめの道順 */}
            <div className="guide-section">
              <div className="guide-sec-title">
                <Compass size={17} className="sec-icon" />
                <strong>おすすめの歩行ルート</strong>
              </div>
              <p className="route-desc-box">{walkData.route}</p>
            </div>

            {/* 安全安心チェックポイント */}
            <div className="guide-section">
              <div className="guide-sec-title">
                <Shield size={17} className="sec-icon text-green" />
                <strong>歩きやすさ・安心ポイント</strong>
              </div>
              <div className="points-checklist">
                {walkData.points.map((pt, idx) => (
                  <div key={idx} className="point-row">
                    <CheckCircle size={16} className="point-check" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 見守りサポートのアナウンス */}
            <div className="safety-callout-card">
              <div className="safety-callout-icon">🛡️</div>
              <div className="safety-callout-text">
                <strong>疲れたらいつでもタクシーを呼べます</strong>
                <p>
                  いつでもタクシーを呼べるよう控えています。途中で足が痛くなったり荷物が重くなった場合も、ボタン一つですぐに呼ぶことができます。
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* バスガイドの場合 */
          <div className="guide-body-scroll">
            {/* バス発車時刻ハイライト */}
            <div className="bus-highlight-banner">
              <div className="bus-time-col">
                <span className="bus-time-label">次の発車時刻</span>
                <strong className="bus-time-val">{destination.busNextDeparture}</strong>
                <span className="bus-sub-freq">{busData.departureDetail}</span>
              </div>
              <div className="bus-line-badge">
                {destination.busLine}
              </div>
            </div>

            {/* 乗降バス停ステップ案内 */}
            <div className="guide-section">
              <div className="guide-sec-title">
                <MapPin size={17} className="sec-icon text-blue" />
                <strong>バスの乗り降り案内</strong>
              </div>
              <div className="bus-step-route">
                <div className="bus-stop-node">
                  <span className="node-marker boarding">乗る</span>
                  <div className="node-info">
                    <strong>{busData.boardingStop}</strong>
                    <span className="node-sub">ご自宅からすぐ乗車できます</span>
                  </div>
                </div>

                <div className="route-line-connector">
                  <span className="connector-label">乗車時間：約{destination.busMin}分</span>
                </div>

                <div className="bus-stop-node">
                  <span className="node-marker dropoff">降りる</span>
                  <div className="node-info">
                    <strong>{busData.dropoffStop}</strong>
                    <span className="node-sub">目的地目の前のバス停です</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 運賃・お支払い・乗降性 */}
            <div className="guide-section">
              <div className="guide-sec-title">
                <Clock size={17} className="sec-icon text-amber" />
                <strong>運賃とお支払い方法</strong>
              </div>
              <div className="fare-box">
                <p className="fare-line">💰 {busData.fare}</p>
                <p className="bus-care-line">♿ {busData.stepCount}</p>
              </div>
            </div>
          </div>
        )}

        {/* 出発ボタン */}
        <div className="transit-footer-actions">
          <button
            type="button"
            className="start-mobility-btn"
            onClick={() => {
              onStartTrip(destination, mode);
              onClose();
            }}
          >
            <span>{isWalk ? '🚶 このルートで歩いて出かける' : '🚌 このバスに乗って出かける'}</span>
          </button>
        </div>
      </div>

      <style>{`
        .transit-modal-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 1000;
          border-radius: 36px;
          overflow: hidden;
          padding-top: 36px;
          animation: fadeIn 0.2s ease-out;
        }

        .transit-modal-content {
          background: var(--bg-base);
          width: 100%;
          max-width: 480px;
          border-radius: 26px 26px 0 0;
          padding: 20px 18px 36px;
          max-height: calc(100% - 24px);
          overflow-y: auto;
          box-shadow: var(--shadow-modal);
          animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
        }

        .transit-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }

        .transit-header-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .transit-badge-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .walk-bg { background: #ECFDF5; color: #059669; border: 1px solid #A7F3D0; }
        .bus-bg { background: #FFF7ED; color: #EA580C; border: 1px solid #FED7AA; }

        .transit-sub-label {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .transit-modal-title {
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.25;
        }

        .close-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #E2E8F0;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .guide-body-scroll {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding-bottom: 8px;
        }

        .summary-pill-card {
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          padding: 12px;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }

        .pill-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .pill-label {
          font-size: 11px;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .pill-val {
          font-size: 17px;
          font-weight: 700;
          color: var(--navy-action);
          margin-top: 2px;
        }

        .text-green { color: #059669; }
        .text-blue { color: #2563EB; }
        .text-amber { color: #D97706; }

        .pill-divider {
          width: 1px;
          height: 28px;
          background: #E2E8F0;
        }

        .guide-section {
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          padding: 14px;
        }

        .guide-sec-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .route-desc-box {
          font-size: 13px;
          color: var(--text-primary);
          background: #F8FAFC;
          border-radius: 8px;
          padding: 10px 12px;
          line-height: 1.5;
          font-weight: 600;
        }

        .points-checklist {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .point-row {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.45;
        }

        .point-check {
          color: #059669;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .safety-callout-card {
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
          border-radius: 14px;
          padding: 12px 14px;
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .safety-callout-icon {
          font-size: 22px;
        }

        .safety-callout-text strong {
          font-size: 13px;
          color: #1E3A8A;
          display: block;
          margin-bottom: 2px;
        }

        .safety-callout-text p {
          font-size: 11px;
          color: #2563EB;
          line-height: 1.4;
        }

        /* バス */
        .bus-highlight-banner {
          background: linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%);
          border: 1px solid #FED7AA;
          border-radius: 14px;
          padding: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .bus-time-col {
          display: flex;
          flex-direction: column;
        }

        .bus-time-label {
          font-size: 11px;
          font-weight: 700;
          color: #C2410C;
        }

        .bus-time-val {
          font-size: 24px;
          font-weight: 800;
          color: #9A3412;
          font-family: var(--font-en);
          line-height: 1.15;
          margin: 2px 0;
        }

        .bus-sub-freq {
          font-size: 11px;
          color: #EA580C;
          font-weight: 600;
        }

        .bus-line-badge {
          background: #EA580C;
          color: #ffffff;
          font-size: 12px;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 8px;
        }

        .bus-step-route {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 4px;
        }

        .bus-stop-node {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #F8FAFC;
          border-radius: 10px;
          padding: 8px 10px;
        }

        .node-marker {
          font-size: 10px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 6px;
          color: #ffffff;
        }

        .node-marker.boarding { background: #EA580C; }
        .node-marker.dropoff { background: #059669; }

        .node-info {
          display: flex;
          flex-direction: column;
        }

        .node-info strong {
          font-size: 13px;
          color: var(--text-primary);
        }

        .node-sub {
          font-size: 11px;
          color: var(--text-muted);
        }

        .route-line-connector {
          padding-left: 20px;
          border-left: 2px dashed #CBD5E1;
          margin: 0 0 0 16px;
          font-size: 11px;
          color: var(--text-secondary);
          padding-top: 4px;
          padding-bottom: 4px;
        }

        .fare-box {
          background: #F8FAFC;
          border-radius: 8px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .fare-line {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .bus-care-line {
          font-size: 11px;
          color: var(--text-secondary);
        }

        .transit-footer-actions {
          margin-top: 14px;
        }

        .start-mobility-btn {
          width: 100%;
          min-height: 50px;
          background: var(--navy-action);
          color: #ffffff;
          font-size: 15px;
          font-weight: 700;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s;
        }

        .start-mobility-btn:hover {
          background: var(--navy-light);
        }
      `}</style>
    </div>
  );
};
