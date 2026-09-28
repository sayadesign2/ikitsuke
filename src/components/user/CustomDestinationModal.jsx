import React, { useState } from 'react';
import { X, Search, Mic, MapPin, Building, Cross, Coffee, Landmark, Car, Plus, Check } from 'lucide-react';
import { DispatchLongPressButton } from './DispatchLongPressButton';
import { MobilityTiles } from './MobilityTiles';

export const CustomDestinationModal = ({ isOpen, onClose, onDispatch, onAddToFavorites, stockSpots = [] }) => {
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [isListening, setIsListening] = useState(false);

  // 家族が登録したストック枠をスポット形式に整形
  const familyStockSpots = (stockSpots || []).map(spot => ({
    ...spot,
    category: 'FAMILY',
    categoryLabel: '家族が登録',
    isFamilyStock: true,
  }));

  // 高知県高知市の候補スポットリスト
  const presetSpots = [
    {
      id: 'spot-1',
      name: '高知赤十字病院',
      subname: '総合病院・眼科・整形外科',
      address: '高知市秦南町1丁目4-63-11',
      category: 'MEDICAL',
      categoryLabel: '医療・病院',
      badge: '総合病院',
      badgeColor: '#059669',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
      walkMin: 35,
      walkDistance: '2.4km',
      busMin: 14,
      busLine: '県交北部バス',
      busNextDeparture: '10:35発',
      taxiMin: 7,
      taxiFare: '1,500',
      totalFare: '3,000',
      safeBoardingPoint: '正面エントランス車寄せ・警備員案内ブース前',
    },
    {
      id: 'spot-2',
      name: '高知市中央公民館',
      subname: '市民講座・サークル活動・図書館',
      address: '高知市本町4丁目1-37',
      category: 'PUBLIC',
      categoryLabel: '公共・文化',
      badge: '公共施設',
      badgeColor: '#2563EB',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
      walkMin: 20,
      walkDistance: '1.3km',
      busMin: 8,
      busLine: '市街地周遊',
      busNextDeparture: '10:42発',
      taxiMin: 4,
      taxiFare: '1,500',
      totalFare: '3,000',
      safeBoardingPoint: '南側ロータリー・屋根付き乗降スペース',
    },
    {
      id: 'spot-3',
      name: 'イオンモール高知',
      subname: '大型商業施設・衣料品・専門店街',
      address: '高知市秦南町1丁目4-8',
      category: 'SHOPPING',
      categoryLabel: 'お買い物',
      badge: '大型店',
      badgeColor: '#D97706',
      image: 'https://images.unsplash.com/photo-1567449303183-ae0d6ed1498e?auto=format&fit=crop&w=800&q=80',
      walkMin: 45,
      walkDistance: '3.1km',
      busMin: 18,
      busLine: 'とさでん交通直行便',
      busNextDeparture: '10:30発',
      taxiMin: 9,
      taxiFare: '1,500',
      totalFare: '3,000',
      safeBoardingPoint: '専門店街東入口前タクシー乗り場・ベンチあり',
    },
    {
      id: 'spot-4',
      name: '高知城 歴史公園',
      subname: '追手門前の散歩道・茶屋',
      address: '高知市丸ノ内1丁目2-1',
      category: 'CULTURE',
      categoryLabel: '散歩・憩い',
      badge: '公園・名所',
      badgeColor: '#7C3AED',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
      walkMin: 25,
      walkDistance: '1.6km',
      busMin: 10,
      busLine: '中心街循環',
      busNextDeparture: '10:28発',
      taxiMin: 5,
      taxiFare: '1,500',
      totalFare: '3,000',
      safeBoardingPoint: '高知城歴史博物館前・平坦な乗降帯',
    },
  ];

  const allAvailableSpots = [...familyStockSpots, ...presetSpots];

  // 音声入力シミュレーション
  const handleVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => {
      setKeyword('赤十字病院');
      setIsListening(false);
    }, 1200);
  };

  // フィルタリング
  const filteredSpots = allAvailableSpots.filter((spot) => {
    const matchesCategory = selectedCategory === 'ALL' || spot.category === selectedCategory;
    const matchesKeyword = !keyword || spot.name.includes(keyword) || spot.subname.includes(keyword);
    return matchesCategory && matchesKeyword;
  });

  if (!isOpen) return null;

  return (
    <div className="custom-dest-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="custom-dest-content" onClick={(e) => e.stopPropagation()}>
        {/* ヘッダー */}
        <div className="custom-modal-header">
          <div className="header-badge-row">
            <span className="advanced-pill">高度な場所指定</span>
            <h2 className="custom-modal-title">その他の場所を指定する</h2>
          </div>
          <button type="button" className="close-btn" onClick={onClose} aria-label="閉じる">
            <X size={20} />
          </button>
        </div>

        {/* 検索・音声入力バー */}
        <div className="search-bar-wrap">
          <div className="search-input-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="search-input"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="行きたい場所の名前を入力 例: 赤十字病院"
            />
            {keyword && (
              <button type="button" className="clear-kw-btn" onClick={() => setKeyword('')}>
                <X size={15} />
              </button>
            )}
          </div>
          <button
            type="button"
            className={`voice-mic-btn ${isListening ? 'listening' : ''}`}
            onClick={handleVoiceInput}
            title="音声で話して検索"
          >
            <Mic size={18} />
            <span>{isListening ? '聞いています…' : '声で探す'}</span>
          </button>
        </div>

        {/* カテゴリフィルター */}
        <div className="category-tabs">
          <button
            type="button"
            className={`cat-chip ${selectedCategory === 'ALL' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('ALL')}
          >
            すべて
          </button>
          {familyStockSpots.length > 0 && (
            <button
              type="button"
              className={`cat-chip ${selectedCategory === 'FAMILY' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('FAMILY')}
            >
              登録済みイキツケ
            </button>
          )}
          <button
            type="button"
            className={`cat-chip ${selectedCategory === 'MEDICAL' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('MEDICAL')}
          >
            🏥 病院・医院
          </button>
          <button
            type="button"
            className={`cat-chip ${selectedCategory === 'SHOPPING' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('SHOPPING')}
          >
            🛒 お買い物
          </button>
          <button
            type="button"
            className={`cat-chip ${selectedCategory === 'PUBLIC' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('PUBLIC')}
          >
            🏛️ 公民館・役所
          </button>
          <button
            type="button"
            className={`cat-chip ${selectedCategory === 'CULTURE' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('CULTURE')}
          >
            🌳 公園・憩い
          </button>
        </div>

        {/* 候補スポット一覧 */}
        {!selectedSpot ? (
          <div className="spots-scroll-list">
            {filteredSpots.map((spot) => (
              <div
                key={spot.id}
                className="spot-candidate-card"
                onClick={() => setSelectedSpot(spot)}
                role="button"
                tabIndex={0}
              >
                <div className="spot-thumb">
                  <img src={spot.image} alt={spot.name} />
                </div>
                <div className="spot-info">
                  <div className="spot-title-line">
                    <strong className="spot-name">{spot.name}</strong>
                    <span className="spot-badge" style={{ backgroundColor: spot.badgeColor }}>
                      {spot.badge}
                    </span>
                  </div>
                  <p className="spot-sub">{spot.subname}</p>
                  <div className="spot-meta-row">
                    <span>🚕 タクシーで約{spot.taxiMin}分</span>
                    <span>・</span>
                    <span>🚶 徒歩{spot.walkMin}分</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* 選択したスポットの詳細＆配車画面 */
          <div className="selected-spot-view">
            <button
              type="button"
              className="back-to-list-btn"
              onClick={() => setSelectedSpot(null)}
            >
              ← 別の場所を選び直す
            </button>

            <div className="selected-card">
              <div className="selected-visual">
                <img src={selectedSpot.image} alt={selectedSpot.name} />
                <span className="selected-badge" style={{ backgroundColor: selectedSpot.badgeColor }}>
                  {selectedSpot.badge}
                </span>
              </div>
              <div className="selected-body">
                <h3 className="selected-title">{selectedSpot.name}</h3>
                <p className="selected-sub">{selectedSpot.subname}</p>

                <div className="selected-pin-info">
                  <MapPin size={15} />
                  <span>
                    乗降場所：{selectedSpot.safeBoardingPoint ? selectedSpot.safeBoardingPoint.replace(/（[^）]*）|\([^)]*\)/g, '').trim() : ''}
                  </span>
                </div>

                <MobilityTiles destination={selectedSpot} />

                {/* 2秒長押し配車ボタン */}
                <DispatchLongPressButton
                  destination={selectedSpot}
                  onComplete={(dest) => {
                    onDispatch(dest);
                    onClose();
                  }}
                />

                {/* いつもの場所に追加するボタン */}
                <button
                  type="button"
                  className="add-fav-btn"
                  onClick={() => {
                    onAddToFavorites(selectedSpot);
                    onClose();
                  }}
                >
                  <Plus size={16} />
                  <span>この場所を「いつもの場所」に登録する</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .custom-dest-backdrop {
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

        .custom-dest-content {
          background: var(--bg-base);
          width: 100%;
          max-width: 480px;
          border-radius: 26px 26px 0 0;
          padding: 20px 18px 36px;
          max-height: calc(100% - 24px);
          overflow-y: auto;
          box-shadow: var(--shadow-modal);
          animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .custom-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 14px;
        }

        .header-badge-row {
          display: flex;
          flex-direction: column;
        }

        .advanced-pill {
          font-size: 11px;
          font-weight: 700;
          color: #2563EB;
          letter-spacing: 0.04em;
        }

        .custom-modal-title {
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
          margin-top: 2px;
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

        .search-bar-wrap {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
        }

        .search-input-box {
          flex: 1;
          background: #FFFFFF;
          border: 1.5px solid var(--border-subtle);
          border-radius: 12px;
          padding: 0 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .search-icon {
          color: var(--text-muted);
        }

        .search-input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 13px;
          font-family: inherit;
          color: var(--text-primary);
          outline: none;
          height: 44px;
        }

        .clear-kw-btn {
          color: var(--text-muted);
        }

        .voice-mic-btn {
          background: var(--accent-blue-bg);
          border: 1.5px solid var(--accent-blue-border);
          border-radius: 12px;
          color: var(--navy-action);
          padding: 0 12px;
          font-size: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 5px;
          white-space: nowrap;
          transition: all 0.15s;
        }

        .voice-mic-btn.listening {
          background: #EF4444;
          border-color: #DC2626;
          color: #ffffff;
          animation: pulse 1s infinite;
        }

        .category-tabs {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          padding-bottom: 8px;
          margin-bottom: 12px;
        }

        .cat-chip {
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: 999px;
          padding: 5px 12px;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          white-space: nowrap;
          transition: all 0.15s;
        }

        .cat-chip.active {
          background: var(--navy-action);
          color: #ffffff;
          border-color: var(--navy-action);
        }

        .spots-scroll-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-height: 52vh;
          overflow-y: auto;
        }

        .spot-candidate-card {
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          padding: 10px;
          display: flex;
          gap: 12px;
          cursor: pointer;
          transition: all 0.15s;
        }

        .spot-candidate-card:hover {
          border-color: var(--navy-action);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(22, 50, 79, 0.08);
        }

        .spot-thumb {
          width: 64px;
          height: 64px;
          border-radius: 10px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .spot-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .spot-info {
          flex: 1;
          min-width: 0;
        }

        .spot-title-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 6px;
        }

        .spot-name {
          font-size: 15px;
          color: var(--text-primary);
        }

        .spot-badge {
          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 999px;
        }

        .spot-sub {
          font-size: 11px;
          color: var(--text-secondary);
          margin-top: 2px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .spot-meta-row {
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 4px;
          display: flex;
          gap: 6px;
        }

        /* 選択詳細 */
        .back-to-list-btn {
          font-size: 13px;
          font-weight: 700;
          color: var(--navy-action);
          margin-bottom: 12px;
          display: inline-flex;
          align-items: center;
        }

        .selected-card {
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: var(--shadow-card);
        }

        .selected-visual {
          position: relative;
          height: 130px;
        }

        .selected-visual img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .selected-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 999px;
        }

        .selected-body {
          padding: 14px;
        }

        .selected-title {
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .selected-sub {
          font-size: 12px;
          color: var(--text-secondary);
          margin: 2px 0 10px;
        }

        .selected-pin-info {
          background: #F1F5F9;
          border-radius: 8px;
          padding: 8px 10px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          color: #059669;
          margin-bottom: 12px;
        }

        .add-fav-btn {
          width: 100%;
          min-height: 44px;
          background: #F8FAFC;
          border: 1px dashed #CBD5E1;
          border-radius: 12px;
          margin-top: 10px;
          color: #334E68;
          font-size: 13px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .add-fav-btn:hover {
          background: var(--accent-blue-bg);
          border-color: var(--accent-blue-border);
          color: var(--navy-action);
        }
      `}</style>
    </div>
  );
};
