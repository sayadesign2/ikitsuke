import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DestinationCard } from './DestinationCard';
import { TripStatusBanner } from './TripStatusBanner';
import { RecommendCard } from './RecommendCard';
import { StampBookModal } from './StampBookModal';
import { CustomDestinationModal } from './CustomDestinationModal';
import { TransitGuideModal } from './TransitGuideModal';
import { BookOpen, Sun, Sparkles, PlusCircle } from 'lucide-react';

export const UserScreen = () => {
  const {
    destinations,
    homeDestinations,
    recommendation,
    stampBook,
    activeTrip,
    userModal,
    setUserModal,
    startDispatch,
    startAlternativeTrip,
    advanceTrip,
    cancelTrip,
    addFromRecommendation,
    addCustomDestination,
  } = useApp();

  const [isCustomDestOpen, setIsCustomDestOpen] = useState(false);
  const [transitGuide, setTransitGuide] = useState(null); // { destination, mode: 'WALK' | 'BUS' }

  // 現在の日時
  const todayLabel = '9月13日 日曜日';

  return (
    <div className="user-app-container">
      {/* OSステータスバー風ヘッダー */}
      <div className="phone-top-bar">
        <span className="phone-clock">10:18</span>
        <div className="phone-top-icons">
          <span className="network-dot" />
          <span className="network-dot" />
          <span className="network-dot" />
          <span className="battery-icon">98%</span>
        </div>
      </div>

      {/* 本人アプリメインヘッダー */}
      <header className="user-header">
        <div className="user-header-left">
          <div className="user-greeting-meta">
            <span className="user-date">9月13日(日)</span>
            <span className="user-weather">
              <Sun size={13} className="weather-sun-icon" />
              高知市 24℃
            </span>
          </div>
          <h1 className="user-app-title">サカエさんのイキツケ</h1>
        </div>

        {/* イキツケ手帳ボタン */}
        <button
          type="button"
          className="stamp-book-trigger-btn"
          onClick={() => setUserModal('stampBook')}
          aria-label="イキツケ手帳を開く"
        >
          <BookOpen size={16} />
          <span className="trigger-label">手帳</span>
          <span className="stamp-badge-count">{stampBook.length}</span>
        </button>
      </header>

      {/* メインスクロール領域 */}
      <main className="user-content-scroll">
        {/* 移動状態進行バナー */}
        {activeTrip && (
          <TripStatusBanner
            trip={activeTrip}
            onCancel={cancelTrip}
            onAdvance={advanceTrip}
          />
        )}

        {/* ガイダンス */}
        <div className="user-sub-guidance">
          <span>タクシーを呼ぶときは</span>
          <strong className="guidance-accent">「長押し」</strong>
          <span>します</span>
        </div>

        {/* いつもの行き先カードリスト（4件以上もすべて表示） */}
        <div className="destinations-list">
          {destinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              onDispatch={startDispatch}
              onOpenGuide={(dest, mode) => setTransitGuide({ destination: dest, mode })}
              isTripActive={!!activeTrip}
            />
          ))}
        </div>

        {/* DESIGN.md 二次動線ボタン: その他の場所を指定する */}
        <button
          type="button"
          className="secondary-custom-dest-btn"
          onClick={() => setIsCustomDestOpen(true)}
          aria-label="その他の場所を指定する"
        >
          <PlusCircle size={18} />
          <span>＋ その他の場所を指定する</span>
        </button>

        {/* 街の動きレコメンド枠 */}
        {recommendation && (
          <RecommendCard
            recommendation={recommendation}
            onAdd={addFromRecommendation}
          />
        )}

        {/* 本人アプリの安心安全フッター */}
        <footer className="user-footer-safety">
          <div className="safety-icon-box">🛡️</div>
          <p className="safety-text">
            ご家族と土佐ハイヤー運行管理センターが見守っています
          </p>
        </footer>
      </main>

      {/* 徒歩・バスの安心おでかけガイドモーダル */}
      <TransitGuideModal
        isOpen={!!transitGuide}
        onClose={() => setTransitGuide(null)}
        destination={transitGuide?.destination}
        mode={transitGuide?.mode}
        onStartTrip={(dest, mode) => {
          startAlternativeTrip(dest, mode);
        }}
      />

      {/* 高度な場所指定モーダル */}
      <CustomDestinationModal
        isOpen={isCustomDestOpen}
        onClose={() => setIsCustomDestOpen(false)}
        stockSpots={destinations}
        onDispatch={(dest) => {
          startDispatch(dest);
        }}
        onAddToFavorites={(spot) => {
          addCustomDestination(spot);
        }}
      />

      {/* イキツケ手帳モーダル */}
      <StampBookModal
        isOpen={userModal === 'stampBook'}
        onClose={() => setUserModal(null)}
        stampBook={stampBook}
      />

      <style>{`
        .user-app-container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          background-color: var(--bg-base);
          color: var(--text-primary);
          overflow: hidden;
          position: relative;
        }

        .phone-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 18px 4px;
          font-size: 14px;
          font-weight: 700;
          color: var(--text-secondary);
          flex-shrink: 0;
        }

        .phone-top-icons {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .network-dot {
          width: 5px;
          height: 5px;
          background: var(--text-secondary);
          border-radius: 50%;
        }

        .battery-icon {
          font-size: 12px;
          margin-left: 4px;
        }

        .user-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          background: #FFFFFF;
          border-bottom: 1px solid var(--border-subtle);
          flex-shrink: 0;
        }

        .user-header-left {
          min-width: 0;
          flex: 1;
        }

        .user-greeting-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 3px;
        }

        .user-weather {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          color: #EA580C;
        }

        .weather-sun-icon {
          color: #F59E0B;
        }

        .user-app-title {
          font-size: 23px;
          font-weight: 800;
          color: var(--navy-action);
          letter-spacing: -0.02em;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .stamp-book-trigger-btn {
          position: relative;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: var(--accent-blue-bg);
          border: 1.5px solid var(--accent-blue-border);
          border-radius: 20px;
          padding: 7px 14px;
          color: var(--navy-action);
          transition: all 0.15s ease;
          flex-shrink: 0;
        }

        .stamp-book-trigger-btn:hover {
          background: #DCECF7;
        }

        .trigger-label {
          font-size: 13.5px;
          font-weight: 700;
          margin-top: 0;
          white-space: nowrap;
        }

        .stamp-badge-count {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #DC2626;
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          min-width: 18px;
          height: 18px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4px;
        }

        .user-content-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 14px 16px 32px;
        }

        .user-sub-guidance {
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 10px 14px;
          margin-bottom: 14px;
          font-size: 14px;
          color: var(--text-secondary);
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 3px 6px;
          line-height: 1.45;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.02);
        }

        .guidance-accent {
          font-size: 15px;
          font-weight: 800;
          color: var(--navy-action);
        }

        .guidance-unit {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          gap: 2px;
        }

        .guidance-accent {
          color: var(--navy-action);
          font-weight: 700;
          text-decoration: underline;
        }

        .destinations-list {
          display: flex;
          flex-direction: column;
        }

        /* DESIGN.md 二次動線ボタン仕様 */
        .secondary-custom-dest-btn {
          width: 100%;
          min-height: 54px;
          background: transparent;
          border: 1.5px dashed #CBD5E1;
          border-radius: 18px;
          color: #334E68;
          font-size: 16px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 4px;
          margin-bottom: 16px;
          transition: all 0.15s ease;
          box-sizing: border-box;
        }

        .secondary-custom-dest-btn:hover {
          background: var(--accent-blue-bg);
          border-color: var(--accent-blue-border);
          color: var(--navy-action);
          transform: translateY(-1px);
        }

        .secondary-custom-dest-btn:active {
          transform: scale(0.985);
        }

        .user-footer-safety {
          margin-top: 16px;
          background: rgba(22, 50, 79, 0.04);
          border-radius: 14px;
          padding: 12px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .safety-icon-box {
          font-size: 20px;
        }

        .safety-text {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.4;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};
