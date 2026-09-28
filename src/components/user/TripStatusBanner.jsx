import React from 'react';
import { Car, Clock, X, CheckCircle, Shield, Navigation } from 'lucide-react';

export const TripStatusBanner = ({ trip, onCancel, onAdvance }) => {
  if (!trip) return null;

  const getStatusContent = () => {
    switch (trip.status) {
      case 'DISPATCHING':
        return {
          title: 'タクシーを手配しています',
          desc: '提携会社（土佐ハイヤー）へ通信中…',
          badge: '手配中',
          badgeBg: 'var(--navy-action)',
          pulse: true,
          icon: <Clock size={20} className="status-spin" />,
        };
      case 'ARRIVING':
        return {
          title: 'お迎えのタクシーが近づいています',
          desc: `${trip.driver?.company} ${trip.driver?.carModel} が約2分で到着します`,
          badge: 'まもなく到着',
          badgeBg: '#D97706',
          pulse: true,
          icon: <Car size={20} />,
        };
      case 'RIDING':
        return {
          title: trip.mode === 'TAXI' ? '目的地へ向かっています' : trip.mode === 'WALK' ? '徒歩でお出かけ中' : 'バスで移動中',
          desc: `「${trip.destination.name}」へ移動中・予定${trip.etaMinutes}分`,
          badge: '移動中',
          badgeBg: '#059669',
          pulse: false,
          icon: <Navigation size={20} />,
        };
      case 'ARRIVED':
        return {
          title: `「${trip.destination.name}」に到着しました`,
          desc: trip.mode === 'TAXI' ? '事前決済済みのためお財布の取り出しは不要です' : 'お疲れさまでした。イキツケ手帳に記録しました',
          badge: '到着完了',
          badgeBg: '#059669',
          pulse: false,
          icon: <CheckCircle size={20} />,
        };
      case 'RETURNED':
        return {
          title: 'ご帰宅を確認しました',
          desc: '無事にご帰宅されました。ゆっくりお休みください',
          badge: '帰宅完了',
          badgeBg: '#16324F',
          pulse: false,
          icon: <Shield size={20} />,
        };
      default:
        return null;
    }
  };

  const status = getStatusContent();
  if (!status) return null;

  return (
    <div className="trip-status-banner" role="status" aria-live="polite">
      <div className="banner-top">
        <span className="banner-badge" style={{ backgroundColor: status.badgeBg }}>
          {status.icon}
          {status.badge}
        </span>
        {trip.status !== 'ARRIVED' && trip.status !== 'RETURNED' && (
          <button
            type="button"
            className="cancel-btn"
            onClick={onCancel}
            aria-label={trip.mode === 'TAXI' ? '配車をキャンセルする' : '移動を終了する'}
          >
            <X size={14} />
            <span>
              {trip.mode === 'TAXI' ? '配車をやめる' : 'お出かけをやめる'}
            </span>
          </button>
        )}
      </div>

      <h3 className="banner-title">{status.title}</h3>
      <p className="banner-desc">{status.desc}</p>

      {/* タクシードライバー情報カード */}
      {trip.driver && trip.mode === 'TAXI' && (trip.status === 'ARRIVING' || trip.status === 'RIDING') && (
        <div className="driver-info-box">
          <div className="driver-avatar">🚕</div>
          <div className="driver-details">
            <div className="driver-name-row">
              <strong>{trip.driver.name} 乗務員</strong>
              <span className="car-tag">{trip.driver.carModel}</span>
            </div>
            <div className="driver-sub-row">
              <span>{trip.driver.company}</span>
              <span className="car-plate">{trip.driver.carNumber}</span>
            </div>
          </div>
        </div>
      )}

      {/* 画面内ステータス進行補助ボタン */}
      <div className="banner-actions">
        {trip.status === 'ARRIVING' && (
          <button type="button" className="advance-state-btn" onClick={onAdvance}>
            <span>乗車しました</span>
          </button>
        )}
        {trip.status === 'RIDING' && (
          <button type="button" className="advance-state-btn success-btn" onClick={onAdvance}>
            <span>目的地に到着した</span>
          </button>
        )}
        {trip.status === 'ARRIVED' && (
          <button type="button" className="advance-state-btn" onClick={onAdvance}>
            <span>自宅へ無事帰宅した</span>
          </button>
        )}
        {trip.status === 'RETURNED' && (
          <button type="button" className="advance-state-btn" onClick={onAdvance}>
            <span>ホーム画面に戻る</span>
          </button>
        )}
      </div>

      <style>{`
        .trip-status-banner {
          background: #FFFFFF;
          border: 2px solid var(--navy-action);
          border-radius: var(--radius-card);
          padding: 16px;
          margin-bottom: 20px;
          box-shadow: 0 10px 28px -4px rgba(22, 50, 79, 0.15);
          animation: slideDown 0.25s ease-out;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .banner-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .banner-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #ffffff;
          font-size: 13px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: var(--radius-badge);
        }

        .cancel-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: var(--text-secondary);
          background: #F1F5F9;
          padding: 6px 10px;
          border-radius: 8px;
          font-weight: 600;
          transition: background 0.15s;
        }

        .cancel-btn:hover {
          background: #E2E8F0;
          color: var(--text-primary);
        }

        .banner-title {
          font-size: 19px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .banner-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .driver-info-box {
          margin-top: 12px;
          background: #F8FAFC;
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 10px 12px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .driver-avatar {
          font-size: 24px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .driver-details {
          flex: 1;
        }

        .driver-name-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: var(--text-primary);
        }

        .car-tag {
          font-size: 11px;
          background: #E2E8F0;
          color: #334155;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 600;
        }

        .driver-sub-row {
          display: flex;
          gap: 8px;
          font-size: 12px;
          color: var(--text-secondary);
          margin-top: 2px;
        }

        .car-plate {
          font-weight: 700;
          color: var(--navy-action);
        }

        .banner-actions {
          margin-top: 12px;
        }

        .advance-state-btn {
          width: 100%;
          min-height: 48px;
          background: var(--navy-action);
          color: #ffffff;
          font-size: 15px;
          font-weight: 700;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s, transform 0.1s;
        }

        .advance-state-btn:hover {
          background: var(--navy-light);
        }

        .advance-state-btn:active {
          transform: scale(0.98);
        }

        .advance-state-btn.success-btn {
          background: var(--emerald-success);
        }

        .status-spin {
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
