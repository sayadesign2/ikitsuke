import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Trash2, MapPin, Building2, ChevronUp, ChevronDown, Check, Sparkles } from 'lucide-react';

export const DestinationsTab = () => {
  const { destinations, addDestinationByFamily, deleteDestination, moveDestination } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);

  // 新規追加フォーム入力値
  const [newName, setNewName] = useState('');
  const [newSubname, setNewSubname] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newBadge, setNewBadge] = useState('お気に入り');
  const [newBoardingPoint, setNewBoardingPoint] = useState('');
  const [newTaxiMin, setNewTaxiMin] = useState(5);
  const [newWalkMin, setNewWalkMin] = useState(15);
  const [selectedImage, setSelectedImage] = useState(
    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'
  );

  const sampleImages = [
    { label: '商店・スーパー', url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80' },
    { label: '病院・調剤', url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80' },
    { label: '喫茶・広場', url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80' },
    { label: '公民館・公園', url: 'https://images.unsplash.com/photo-1509024644558-2f56ce76c490?auto=format&fit=crop&w=800&q=80' },
    { label: '友人宅・知人', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80' },
  ];

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    addDestinationByFamily({
      name: newName,
      subname: newSubname || '家族が登録した行き先',
      address: newAddress.trim() || '高知市内',
      badge: newBadge,
      safeBoardingPoint: newBoardingPoint || '安全な建物前停車スペース',
      taxiMin: Number(newTaxiMin) || 5,
      walkMin: Number(newWalkMin) || 15,
      image: selectedImage,
    });

    setNewName('');
    setNewSubname('');
    setNewAddress('');
    setNewBoardingPoint('');
    setShowAddModal(false);
  };

  return (
    <div className="family-tab-content">
      <div className="dest-tab-header">
        <div className="dest-tab-header-titles">
          <h2 className="section-title">イキツケの登録・管理</h2>
        </div>
        <button
          type="button"
          className="add-dest-btn"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={15} />
          <span>新規登録</span>
        </button>
      </div>

      {/* ステータスバナー */}
      <div className="dest-stats-bar">
        <div className="stat-pill primary">
          <span className="stat-dot active" />
          <span className="stat-pill-text">登録中: <strong>{destinations.length}件</strong></span>
        </div>
      </div>

      {/* イキツケ一覧リスト */}
      <div className="dest-section">
        <div className="dest-admin-list">
          {destinations.map((dest, index) => (
            <div key={dest.id} className="dest-admin-card">
              <div className="dest-admin-thumb">
                <img src={dest.image} alt={dest.name} />
                <span className="dest-admin-order">{index + 1}</span>
              </div>
              <div className="dest-admin-info">
                <div className="dest-admin-name-row">
                  <strong className="dest-admin-name">{dest.name}</strong>
                  <span className="dest-admin-badge">{dest.badge}</span>
                </div>
                {dest.address && (
                  <div className="dest-admin-address">
                    <Building2 size={12} />
                    <span>{dest.address}</span>
                  </div>
                )}
                <p className="dest-admin-sub">{dest.subname}</p>
                <div className="dest-admin-pin">
                  <MapPin size={13} />
                  <span>{dest.safeBoardingPoint ? dest.safeBoardingPoint.replace(/（[^）]*）|\([^)]*\)/g, '').trim() : ''}</span>
                </div>
              </div>
              <div className="dest-admin-actions">
                <div className="order-reorder-btns">
                  <button
                    type="button"
                    className="reorder-btn"
                    disabled={index === 0}
                    onClick={() => moveDestination(dest.id, 'up')}
                    aria-label={`${dest.name}を上に移動`}
                    title="上へ移動"
                  >
                    <ChevronUp size={16} />
                  </button>
                  <button
                    type="button"
                    className="reorder-btn"
                    disabled={index === destinations.length - 1}
                    onClick={() => moveDestination(dest.id, 'down')}
                    aria-label={`${dest.name}を下に移動`}
                    title="下へ移動"
                  >
                    <ChevronDown size={16} />
                  </button>
                </div>
                <button
                  type="button"
                  className="delete-dest-btn"
                  onClick={() => deleteDestination(dest.id)}
                  aria-label={`${dest.name}を削除`}
                  title="削除"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
          {destinations.length === 0 && (
            <div className="dest-empty-notice">
              登録されたイキツケがありません。右上の新規登録ボタンから追加してください。
            </div>
          )}
        </div>
      </div>

      {/* 新規登録モーダル */}
      {showAddModal && (
        <div className="admin-modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="admin-modal-title">新しい行き先を登録</h3>
            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label>
                  施設・場所の名前
                  <span className="req-tag">必須</span>
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="例: 高知記念病院、イオンモール高知"
                />
              </div>

              <div className="form-group">
                <label>
                  住所・所在地（配車目的地）
                  <span className="req-tag">必須</span>
                </label>
                <input
                  type="text"
                  required
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="例: 高知県高知市本町2-1-1"
                />
              </div>

              <div className="form-group">
                <label>用途・ひとことメモ</label>
                <input
                  type="text"
                  value={newSubname}
                  onChange={(e) => setNewSubname(e.target.value)}
                  placeholder="例: 整形外科の定期リハビリ、新鮮なお魚の買い出し"
                />
              </div>

              <div className="form-group">
                <label>安全な乗降位置・ドライバーへの共有メモ</label>
                <input
                  type="text"
                  value={newBoardingPoint}
                  onChange={(e) => setNewBoardingPoint(e.target.value)}
                  placeholder="例: 正面玄関ロータリー・車寄せの屋根下"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>バッジ表示</label>
                  <select value={newBadge} onChange={(e) => setNewBadge(e.target.value)}>
                    <option value="いつもの店">いつもの店</option>
                    <option value="かかりつけ">かかりつけ</option>
                    <option value="憩いの場">憩いの場</option>
                    <option value="お気に入り">お気に入り</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>車での目安時間（分）</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={newTaxiMin}
                    onChange={(e) => setNewTaxiMin(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>写真の選択</label>
                <div className="img-selector-grid">
                  {sampleImages.map((img) => (
                    <button
                      key={img.url}
                      type="button"
                      className={`img-opt-btn ${selectedImage === img.url ? 'selected' : ''}`}
                      onClick={() => setSelectedImage(img.url)}
                    >
                      <img src={img.url} alt={img.label} />
                      <span>{img.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="admin-modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowAddModal(false)}
                >
                  キャンセル
                </button>
                <button type="submit" className="btn-submit">
                  イキツケに登録する
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .dest-tab-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 12px;
        }

        .dest-tab-header-titles {
          flex: 1;
          min-width: 0;
        }

        .dest-sub-desc {
          font-size: 11px;
          color: var(--text-secondary);
          line-height: 1.45;
          margin-top: 2px;
        }

        .desc-chunk {
          display: inline-block;
          white-space: nowrap;
        }

        .brand-keyword {
          white-space: nowrap;
          font-weight: 700;
          color: var(--navy-action);
        }

        .add-dest-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: var(--navy-action);
          color: #ffffff;
          font-size: 13px;
          font-weight: 700;
          padding: 8px 14px;
          border-radius: 10px;
          transition: background 0.15s;
          box-shadow: 0 2px 4px rgba(22, 50, 79, 0.12);
          white-space: nowrap;
          flex-shrink: 0;
        }

        .add-dest-btn:hover {
          background: #11283F;
        }

        .dest-stats-bar {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 16px;
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 10px 12px;
        }

        .stat-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 700;
          border-radius: 20px;
          white-space: nowrap;
        }

        .stat-pill.primary {
          color: var(--navy-action);
        }

        .stat-pill-text strong {
          color: #2563EB;
        }

        .dest-reorder-hint {
          font-size: 11px;
          color: var(--text-secondary);
          line-height: 1.35;
        }

        .stat-dot.active {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #059669;
          flex-shrink: 0;
        }

        .dest-section {
          margin-bottom: 22px;
        }

        .dest-section-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 8px;
        }

        .dest-section-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .dest-section-hint {
          font-size: 10px;
          color: var(--text-secondary);
        }

        .dest-admin-list {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .dest-admin-card {
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          padding: 10px 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
          transition: all 0.15s;
        }

        .dest-admin-thumb {
          position: relative;
          width: 54px;
          height: 54px;
          border-radius: 10px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .dest-admin-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .dest-admin-order {
          position: absolute;
          top: 3px;
          left: 3px;
          background: rgba(22, 50, 79, 0.85);
          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dest-admin-info {
          flex: 1;
          min-width: 0;
        }

        .dest-admin-name-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .dest-admin-name {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .dest-admin-badge {
          font-size: 11.5px;
          background: #F1F5F9;
          color: var(--text-secondary);
          padding: 2px 7px;
          border-radius: 4px;
          font-weight: 600;
          flex-shrink: 0;
          white-space: nowrap;
        }

        .dest-admin-address {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12.5px;
          color: #1D4ED8;
          margin-top: 2px;
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .dest-admin-address svg {
          flex-shrink: 0;
        }

        .dest-admin-sub {
          font-size: 12.5px;
          color: var(--text-secondary);
          margin-top: 3px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .dest-admin-pin {
          display: flex;
          align-items: flex-start;
          gap: 4px;
          font-size: 12.5px;
          color: #059669;
          margin-top: 4px;
          font-weight: 600;
          line-height: 1.35;
          word-break: break-word;
        }

        .dest-admin-pin svg {
          flex-shrink: 0;
          margin-top: 1px;
        }

        .dest-admin-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .order-reorder-btns {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .reorder-btn {
          width: 28px;
          height: 20px;
          background: #F1F5F9;
          color: #475569;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
          cursor: pointer;
        }

        .reorder-btn:hover:not(:disabled) {
          background: #E2E8F0;
          color: var(--navy-action);
        }

        .reorder-btn:disabled {
          opacity: 0.25;
          cursor: not-allowed;
        }

        .delete-dest-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          color: #94A3B8;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
          cursor: pointer;
        }

        .delete-dest-btn:hover {
          background: #FEE2E2;
          color: #DC2626;
        }

        .dest-empty-notice {
          font-size: 12px;
          color: var(--text-secondary);
          background: #F8FAFC;
          border: 1px dashed #CBD5E1;
          border-radius: 10px;
          padding: 16px;
          text-align: center;
          line-height: 1.5;
        }

        /* モーダル */
        .admin-modal-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(3px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 16px;
          border-radius: 36px;
          overflow: hidden;
        }

        .admin-modal {
          background: #FFFFFF;
          border-radius: 20px;
          width: 100%;
          max-width: 440px;
          padding: 20px;
          box-shadow: var(--shadow-modal);
        }

        .admin-modal-title {
          font-size: 17px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .form-group {
          margin-bottom: 12px;
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 4px;
          display: flex;
          align-items: center;
        }

        .req-tag {
          font-size: 10px;
          color: #DC2626;
          background: #FEE2E2;
          padding: 1px 5px;
          border-radius: 4px;
          font-weight: 600;
          margin-left: 6px;
        }

        .form-group input,
        .form-group select {
          border: 1px solid #CBD5E1;
          border-radius: 8px;
          padding: 8px 10px;
          font-size: 13px;
          font-family: inherit;
          color: var(--text-primary);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .img-selector-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-top: 4px;
        }

        .img-opt-btn {
          border: 2px solid transparent;
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2px;
          background: #F8FAFC;
        }

        .img-opt-btn img {
          width: 100%;
          height: 44px;
          object-fit: cover;
          border-radius: 6px;
        }

        .img-opt-btn span {
          font-size: 10px;
          color: var(--text-secondary);
          margin-top: 2px;
        }

        .img-opt-btn.selected {
          border-color: var(--navy-action);
          background: #EAF2F7;
        }

        .admin-modal-actions {
          display: flex;
          gap: 10px;
          margin-top: 18px;
        }

        .btn-cancel {
          flex: 1;
          height: 40px;
          background: #F1F5F9;
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 13px;
          border-radius: 8px;
        }

        .btn-submit {
          flex: 2;
          height: 40px;
          background: var(--navy-action);
          color: #ffffff;
          font-weight: 700;
          font-size: 13px;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};
