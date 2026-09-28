import React from 'react';
import { Sparkles, Plus, Heart, Users, MessageCircleHeart } from 'lucide-react';

export const RecommendCard = ({ recommendation, onAdd }) => {
  if (!recommendation) return null;

  return (
    <div className="recommend-card">
      <div className="recommend-badge-row">
        <span className="recommend-chip">
          <Sparkles size={14} />
          {recommendation.tag || '新しいイキツケ候補'}
        </span>
        <span className="recommend-social-proof">
          <Heart size={14} className="recommend-heart-icon" />
          {recommendation.subname}
        </span>
      </div>

      {recommendation.comfortReason && (
        <div className="recommend-comfort-quote">
          <MessageCircleHeart size={16} className="comfort-quote-icon" />
          <p className="comfort-quote-text">{recommendation.comfortReason}</p>
        </div>
      )}

      <div className="recommend-body">
        <div className="recommend-img-box">
          <img src={recommendation.image} alt={recommendation.name} />
        </div>
        <div className="recommend-text-box">
          <h3 className="recommend-title">{recommendation.name}</h3>
          <p className="recommend-desc">{recommendation.description}</p>
          <div className="recommend-quick-metrics">
            <span>🚶 目安{recommendation.walkMin}分</span>
            <span>・</span>
            <span>🚕 タクシーで{recommendation.taxiMin}分</span>
          </div>
        </div>
      </div>

      {/* 新しいイキツケに登録するボタン */}
      <button
        type="button"
        className="secondary-action-btn"
        onClick={onAdd}
        aria-label={`${recommendation.name}をイキツケに登録する`}
      >
        <Plus size={18} />
        <span>「イキツケ」に登録して居場所を増やす</span>
      </button>

      <style>{`
        .recommend-card {
          background: #FFFFFF;
          border: 1px solid #FED7AA;
          border-radius: var(--radius-card);
          padding: 16px;
          margin-top: 24px;
          margin-bottom: 24px;
          box-shadow: 0 4px 16px rgba(194, 65, 12, 0.06);
          position: relative;
        }

        .recommend-badge-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          flex-wrap: wrap;
          gap: 6px;
        }

        .recommend-chip {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #FFF7ED;
          color: #C2410C;
          border: 1px solid #FFEDD5;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: var(--radius-badge);
        }

        .recommend-social-proof {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 700;
          color: #9A3412;
        }

        .recommend-heart-icon {
          color: #EA580C;
          fill: #FFEDD5;
        }

        .recommend-comfort-quote {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          background: #FFFBEB;
          border: 1px solid #FDE68A;
          border-radius: 10px;
          padding: 9px 12px;
          margin-bottom: 12px;
        }

        .comfort-quote-icon {
          color: #D97706;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .comfort-quote-text {
          font-size: 12px;
          color: #92400E;
          font-weight: 600;
          line-height: 1.45;
          margin: 0;
        }

        .recommend-body {
          display: flex;
          gap: 12px;
          margin-bottom: 14px;
        }

        .recommend-img-box {
          width: 80px;
          height: 80px;
          border-radius: 12px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .recommend-img-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .recommend-text-box {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .recommend-title {
          font-size: 17px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .recommend-desc {
          font-size: 12px;
          color: var(--text-secondary);
          margin-top: 3px;
          line-height: 1.4;
        }

        .recommend-quick-metrics {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted);
          margin-top: 6px;
          display: flex;
          gap: 6px;
        }

        /* 二次動線ボタンスタイル */
        .secondary-action-btn {
          width: 100%;
          min-height: 52px;
          background: #FFF7ED;
          border: 1.5px dashed #FDBA74;
          border-radius: 16px;
          color: #C2410C;
          font-size: 15px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .secondary-action-btn:hover {
          background: #FFEDD5;
          border-color: #FB923C;
          color: #9A3412;
        }

        .secondary-action-btn:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
};
