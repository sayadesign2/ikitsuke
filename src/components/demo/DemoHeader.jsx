import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Play, RotateCcw, FastForward, Smartphone, Eye, Sparkles, Check } from 'lucide-react';
import { IkitsukeLogo } from '../brand/IkitsukeLogo';

export const DemoHeader = ({ viewMode, setViewMode }) => {
  const { activeTrip, advanceTrip, resetAllState, destinations, startDispatch } = useApp();
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const autoPlayTimerRef = useRef(null);

  // 自動デモ進行ロジック
  useEffect(() => {
    if (!isAutoPlaying) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      // まだトリップがなければ開始
      if (!activeTrip) {
        if (destinations.length > 0) {
          startDispatch(destinations[0]);
        }
      } else if (activeTrip.status === 'RETURNED') {
        advanceTrip(); // リセット
        setIsAutoPlaying(false);
      } else {
        advanceTrip();
      }
    }, 3200);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlaying, activeTrip, destinations]);

  return (
    <header className="demo-global-header">
      <div className="demo-header-container">
        {/* ブランド・コンセプト */}
        <div className="demo-brand-col">
          <div className="demo-logo-row" style={{ alignItems: 'center' }}>
            <span className="demo-app-badge">プロトタイプ</span>
            <IkitsukeLogo height={32} showTagline={false} />
            <span className="demo-title-sub" style={{ marginLeft: '4px' }}>居場所定着＆ハイブリッド・モビリティ</span>
          </div>
          <p className="demo-concept-summary">
            免許返納期の自立とプライドを守る本人用極小UI × 家族の黒子支援インフラ
          </p>
        </div>

        {/* コントロール群 */}
        <div className="demo-controls-col">
          {/* 表示切り替え */}
          <div className="view-mode-toggle" role="group" aria-label="表示端末の選択">
            <button
              type="button"
              className={`view-btn ${viewMode === 'dual' ? 'active' : ''}`}
              onClick={() => setViewMode('dual')}
            >
              <Smartphone size={15} />
              <span>2台並列表示</span>
            </button>
            <button
              type="button"
              className={`view-btn ${viewMode === 'user' ? 'active' : ''}`}
              onClick={() => setViewMode('user')}
            >
              <span>👵 本人アプリのみ</span>
            </button>
            <button
              type="button"
              className={`view-btn ${viewMode === 'family' ? 'active' : ''}`}
              onClick={() => setViewMode('family')}
            >
              <span>📱 家族アプリのみ</span>
            </button>
            <button
              type="button"
              className={`view-btn ${viewMode === 'video' ? 'active' : ''}`}
              onClick={() => setViewMode('video')}
              style={{ background: viewMode === 'video' ? 'linear-gradient(135deg, #0284C7, #2563EB)' : undefined, color: '#fff' }}
            >
              <span>🎬 動画プレゼンモード</span>
            </button>
          </div>

          {/* デモ操作アクション */}
          <div className="demo-action-buttons">
            <button
              type="button"
              className={`action-pill-btn auto-play-btn ${isAutoPlaying ? 'playing' : ''}`}
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            >
              <Play size={14} fill={isAutoPlaying ? 'currentColor' : 'none'} />
              <span>{isAutoPlaying ? '自動実演を一時停止' : 'シナリオ自動実演'}</span>
            </button>

            {activeTrip && (
              <button
                type="button"
                className="action-pill-btn step-forward-btn"
                onClick={advanceTrip}
                title="次の移動ステータスへ進める"
              >
                <FastForward size={14} />
                <span>
                  {activeTrip.status === 'DISPATCHING' ? '車接近中へ' :
                   activeTrip.status === 'ARRIVING' ? '乗車中へ' :
                   activeTrip.status === 'RIDING' ? '到着へ' :
                   activeTrip.status === 'ARRIVED' ? '帰宅完了へ' : '完了'}
                </span>
              </button>
            )}

            <button
              type="button"
              className="action-pill-btn reset-btn"
              onClick={() => {
                setIsAutoPlaying(false);
                resetAllState();
              }}
              title="初期状態に戻す"
            >
              <RotateCcw size={14} />
              <span>リセット</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .demo-global-header {
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 8px 24px;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
          height: 52px;
          display: flex;
          align-items: center;
        }

        .demo-header-container {
          width: 100%;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .demo-brand-col {
          display: flex;
          flex-direction: column;
        }

        .demo-logo-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .demo-app-badge {
          background: #3A7CA5;
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 6px;
          letter-spacing: 0.05em;
        }

        .demo-main-title {
          font-size: 20px;
          font-weight: 800;
          color: #F8FAFC;
          letter-spacing: -0.02em;
        }

        .demo-title-sub {
          font-size: 13px;
          color: #94A3B8;
          font-weight: 500;
        }

        .demo-concept-summary {
          font-size: 12px;
          color: #64748B;
          margin-top: 3px;
        }

        .demo-controls-col {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .view-mode-toggle {
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          padding: 3px;
          display: flex;
          gap: 4px;
        }

        .view-btn {
          color: #94A3B8;
          font-size: 12px;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: 7px;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.15s ease;
        }

        .view-btn.active {
          background: #16324F;
          color: #FFFFFF;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }

        .demo-action-buttons {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .action-pill-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #E2E8F0;
          font-size: 12px;
          font-weight: 600;
          padding: 7px 14px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.15s ease;
        }

        .action-pill-btn:hover {
          background: rgba(255, 255, 255, 0.16);
          color: #FFFFFF;
        }

        .auto-play-btn.playing {
          background: #059669;
          border-color: #10B981;
          color: #FFFFFF;
        }

        .step-forward-btn {
          background: #1E3A8A;
          border-color: #3B82F6;
          color: #BFDBFE;
        }

        .reset-btn {
          color: #94A3B8;
        }

        @media (max-width: 900px) {
          .demo-header-container {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </header>
  );
};
