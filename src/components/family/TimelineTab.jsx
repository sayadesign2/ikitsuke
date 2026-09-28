import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Navigation, AlertCircle, Footprints, Clock, Car, Shield, Home, MapPin } from 'lucide-react';

export const TimelineTab = () => {
  const { notifications, activeTrip, advanceTrip } = useApp();

  const getNotifIcon = (type) => {
    switch (type) {
      case 'SAFE_RETURN':
        return <Shield size={18} className="icon-safe" />;
      case 'ARRIVED':
      case 'DISPATCH_COMPLETED':
        return <CheckCircle2 size={18} className="icon-success" />;
      case 'DISPATCH_REQUESTED':
        return <Car size={18} className="icon-car" />;
      case 'WALK_STARTED':
        return <Footprints size={18} className="icon-walk" />;
      default:
        return <Clock size={18} className="icon-clock" />;
    }
  };

  const renderStatusContent = () => {
    if (!activeTrip) {
      return (
        <span className="live-status-pill">
          <Home size={17} className="status-svg-icon text-navy" />
          <span>自宅で待機中</span>
        </span>
      );
    }

    switch (activeTrip.status) {
      case 'DISPATCHING':
        return (
          <span className="live-status-pill">
            <Clock size={17} className="status-svg-icon status-spin text-amber" />
            <span>タクシー手配中</span>
          </span>
        );
      case 'ARRIVING':
        return (
          <span className="live-status-pill">
            <Car size={17} className="status-svg-icon text-amber" />
            <span>車の到着を待機中</span>
          </span>
        );
      case 'RIDING':
        return (
          <span className="live-status-pill">
            <Navigation size={17} className="status-svg-icon text-emerald" />
            <span>「{activeTrip.destination.name}」へ移動中</span>
          </span>
        );
      case 'ARRIVED':
        return (
          <span className="live-status-pill">
            <MapPin size={17} className="status-svg-icon text-emerald" />
            <span>「{activeTrip.destination.name}」に滞在中</span>
          </span>
        );
      case 'RETURNED':
        return (
          <span className="live-status-pill">
            <Home size={17} className="status-svg-icon text-navy" />
            <span>自宅に無事帰宅</span>
          </span>
        );
      default:
        return (
          <span className="live-status-pill">
            <Home size={17} className="status-svg-icon text-navy" />
            <span>自宅で待機中</span>
          </span>
        );
    }
  };

  return (
    <div className="family-tab-content">
      {/* リアルタイム見守りステータスヘッダー */}
      <div className="live-status-card">
        <div className="live-pulse-dot" />
        <div className="live-status-info">
          <span className="live-label">現在の状況</span>
          <strong className="live-value">
            {renderStatusContent()}
          </strong>
        </div>
      </div>

      <div className="timeline-header-row">
        <h2 className="section-title">見守りログ</h2>
      </div>

      {/* タイムラインリスト */}
      <div className="timeline-list">
        {notifications.map((item, index) => (
          <div key={item.id} className="timeline-item">
            <div className="timeline-spine">
              <div className="timeline-icon-box">
                {getNotifIcon(item.type)}
              </div>
              {index < notifications.length - 1 && <div className="timeline-line" />}
            </div>

            <div className="timeline-card">
              <div className="timeline-card-header">
                <strong className="timeline-title">{item.title}</strong>
                <span className="timeline-time">{item.timestamp}</span>
              </div>
              <p className="timeline-body">{item.body}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .family-tab-content {
          width: 100%;
        }

        .live-status-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 13px 16px;
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
        }

        .live-pulse-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.25);
          animation: pulseGreen 1.8s infinite;
          flex-shrink: 0;
        }

        @keyframes pulseGreen {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          70% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }

        .live-status-info {
          display: flex;
          flex-direction: column;
        }

        .live-label {
          font-size: 12.5px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .live-value {
          font-size: 16.5px;
          font-weight: 800;
          color: var(--text-primary);
          margin-top: 2px;
        }

        .live-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .status-svg-icon {
          flex-shrink: 0;
          margin-top: -1px;
        }

        .status-svg-icon.text-navy { color: #16324F; }
        .status-svg-icon.text-amber { color: #D97706; }
        .status-svg-icon.text-emerald { color: #059669; }

        .status-spin {
          animation: spin 3s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .timeline-header-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 14px;
        }

        .section-title {
          font-size: 18px;
          font-weight: 800;
          color: var(--text-primary);
        }

        .section-sub {
          font-size: 12.5px;
          color: var(--text-muted);
        }

        .timeline-list {
          display: flex;
          flex-direction: column;
        }

        .timeline-item {
          display: flex;
          gap: 12px;
          position: relative;
        }

        .timeline-spine {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .timeline-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #F1F5F9;
          border: 1px solid #CBD5E1;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .icon-safe { color: #16324F; }
        .icon-success { color: #059669; }
        .icon-car { color: #3A7CA5; }
        .icon-walk { color: #10B981; }
        .icon-clock { color: #64748B; }

        .timeline-line {
          width: 2px;
          flex: 1;
          background: #E2E8F0;
          margin: 4px 0;
        }

        .timeline-card {
          flex: 1;
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 13px 15px;
          margin-bottom: 14px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
        }

        .timeline-card-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 4px;
        }

        .timeline-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .timeline-time {
          font-size: 12.5px;
          color: var(--text-muted);
          white-space: nowrap;
        }

        .timeline-body {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.45;
        }
      `}</style>
    </div>
  );
};
