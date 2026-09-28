import React from 'react';
import { X, Award, Footprints, Calendar, MapPin } from 'lucide-react';

export const StampBookModal = ({ isOpen, onClose, stampBook }) => {
  if (!isOpen) return null;

  return (
    <div className="stamp-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="stamp-modal-title">
      <div className="stamp-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* モーダルヘッダー */}
        <div className="stamp-modal-header">
          <div className="stamp-header-left">
            <span className="stamp-book-icon">📖</span>
            <div>
              <h2 id="stamp-modal-title" className="stamp-modal-title">サカエさんのイキツケ手帳</h2>
              <p className="stamp-modal-sub">街の安心な居場所とお出かけの記録</p>
            </div>
          </div>
          <button type="button" className="stamp-close-btn" onClick={onClose} aria-label="閉じる">
            <X size={20} />
          </button>
        </div>

        {/* サマリーカード */}
        <div className="stamp-summary-banner">
          <div className="summary-stat">
            <span className="stat-label">街のイキツケ</span>
            <strong className="stat-num">5 <small>カ所</small></strong>
          </div>
          <div className="stat-divider" />
          <div className="summary-stat">
            <span className="stat-label">今週の訪問</span>
            <strong className="stat-num">{stampBook.length} <small>回</small></strong>
          </div>
          <div className="stat-divider" />
          <div className="summary-stat">
            <span className="stat-label">歩行歩数</span>
            <strong className="stat-num">3,890 <small>歩</small></strong>
          </div>
        </div>

        {/* スタンプ履歴リスト */}
        <div className="stamp-list-container">
          <h3 className="stamp-list-heading">最近のお出かけ履歴</h3>
          <div className="stamp-items">
            {stampBook.map((stamp) => (
              <div key={stamp.id} className="stamp-item-card">
                <div className="stamp-mark-circle">
                  <span className="stamp-emoji">{stamp.badgeIcon || '📍'}</span>
                  <span className="stamp-seal">済</span>
                </div>
                <div className="stamp-details">
                  <div className="stamp-top-line">
                    <strong className="stamp-dest-name">{stamp.destName}</strong>
                    <span className="stamp-date">{stamp.date}</span>
                  </div>
                  <p className="stamp-note">{stamp.note}</p>
                  <div className="stamp-metrics-tags">
                    <span className="stamp-tag mode-tag">{stamp.modeLabel}</span>
                    <span className="stamp-tag steps-tag">
                      <Footprints size={12} />
                      {stamp.steps}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 閉じるボタン */}
        <div className="stamp-modal-footer">
          <button type="button" className="stamp-footer-close-btn" onClick={onClose}>
            とじる
          </button>
        </div>
      </div>

      <style>{`
        .stamp-modal-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.65);
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

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .stamp-modal-content {
          background: var(--bg-base);
          width: 100%;
          max-width: 480px;
          border-radius: 24px 24px 0 0;
          padding: 20px 18px 36px;
          max-height: calc(100% - 24px);
          overflow-y: auto;
          box-shadow: var(--shadow-modal);
          animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }

        .stamp-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .stamp-header-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .stamp-book-icon {
          font-size: 28px;
        }

        .stamp-modal-title {
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .stamp-modal-sub {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .stamp-close-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #E2E8F0;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stamp-summary-banner {
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          padding: 14px 16px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-bottom: 20px;
          box-shadow: var(--shadow-card);
        }

        .summary-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-label {
          font-size: 12px;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .stat-num {
          font-size: 24px;
          color: var(--navy-action);
          font-weight: 700;
          font-family: var(--font-en);
        }

        .stat-num small {
          font-size: 14px;
          font-family: var(--font-ud);
          margin-left: 2px;
        }

        .stat-divider {
          width: 1px;
          height: 36px;
          background: #E2E8F0;
        }

        .stamp-list-heading {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 10px;
        }

        .stamp-items {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .stamp-item-card {
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          padding: 12px;
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .stamp-mark-circle {
          position: relative;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #FFFBEB;
          border: 2px dashed #F59E0B;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stamp-emoji {
          font-size: 20px;
        }

        .stamp-seal {
          position: absolute;
          bottom: -2px;
          right: -2px;
          background: #DC2626;
          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid #ffffff;
        }

        .stamp-details {
          flex: 1;
        }

        .stamp-top-line {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }

        .stamp-dest-name {
          font-size: 15px;
          color: var(--text-primary);
        }

        .stamp-date {
          font-size: 11px;
          color: var(--text-muted);
        }

        .stamp-note {
          font-size: 12px;
          color: var(--text-secondary);
          margin: 3px 0 6px;
        }

        .stamp-metrics-tags {
          display: flex;
          gap: 6px;
        }

        .stamp-tag {
          font-size: 11px;
          padding: 2px 6px;
          border-radius: 6px;
          font-weight: 600;
        }

        .mode-tag {
          background: #F1F5F9;
          color: var(--text-secondary);
        }

        .steps-tag {
          background: #ECFDF5;
          color: #059669;
          display: inline-flex;
          align-items: center;
          gap: 3px;
        }

        .stamp-modal-footer {
          margin-top: 18px;
        }

        .stamp-footer-close-btn {
          width: 100%;
          min-height: 48px;
          background: #E2E8F0;
          color: var(--text-primary);
          font-size: 16px;
          font-weight: 700;
          border-radius: 14px;
        }
      `}</style>
    </div>
  );
};
