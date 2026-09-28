import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, CheckSquare, Square, Save, HeartHandshake } from 'lucide-react';

export const DriverNotesTab = () => {
  const { driverNotes, toggleDriverNote, updateCustomNote, pushNotification } = useApp();
  const [customText, setCustomText] = useState(driverNotes.custom || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveCustom = () => {
    updateCustomNote(customText);
    setIsSaved(true);
    pushNotification({
      type: 'NOTES_UPDATED',
      title: 'ドライバーへの配慮メモを更新しました',
      body: '配車時に提携タクシーの乗務員端末へ自動伝達されます。'
    });
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="family-tab-content">
      <div className="notes-header">
        <h2 className="section-title">ドライバー配慮メモ</h2>
      </div>

      {/* 定型チェック項目 */}
      <div className="notes-items-group">
        <label className="group-label">基本配慮事項</label>
        {driverNotes.items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`note-toggle-card ${item.active ? 'is-active' : ''}`}
            onClick={() => toggleDriverNote(item.id)}
          >
            <div className="checkbox-wrap">
              {item.active ? (
                <CheckSquare size={20} className="check-icon active" />
              ) : (
                <Square size={20} className="check-icon inactive" />
              )}
            </div>
            <span className="note-text">{item.text}</span>
          </button>
        ))}
      </div>

      {/* 自由記述メモ */}
      <div className="custom-note-group">
        <label className="group-label">追加の連絡メモ</label>
        <textarea
          rows={3}
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder="例: トランクに手押し車（シルバーカー）を積みます"
          className="custom-note-textarea"
        />
        <button
          type="button"
          className={`save-custom-btn ${isSaved ? 'saved' : ''}`}
          onClick={handleSaveCustom}
        >
          <Save size={16} />
          <span>{isSaved ? '保存しました！' : 'メモを保存・更新'}</span>
        </button>
      </div>

      <style>{`
        .notes-header {
          margin-bottom: 14px;
        }

        .driver-memo-box {
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
          border-radius: 14px;
          padding: 12px;
          display: flex;
          gap: 12px;
          align-items: flex-start;
          margin-bottom: 18px;
        }

        .memo-icon-badge {
          background: #3B82F6;
          color: #ffffff;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .memo-box-text strong {
          font-size: 15px;
          color: #1E3A8A;
          display: block;
          margin-bottom: 3px;
        }

        .memo-box-text p {
          font-size: 13.5px;
          color: #2563EB;
          line-height: 1.4;
        }

        .group-label {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--text-secondary);
          margin-bottom: 9px;
          display: block;
        }

        .notes-items-group {
          display: flex;
          flex-direction: column;
          gap: 9px;
          margin-bottom: 18px;
        }

        .note-toggle-card {
          background: #FFFFFF;
          border: 1.5px solid var(--border-subtle);
          border-radius: 12px;
          padding: 13px 15px;
          display: flex;
          align-items: center;
          gap: 12px;
          text-align: left;
          transition: all 0.15s ease;
        }

        .note-toggle-card.is-active {
          border-color: #3B82F6;
          background: #F8FAFC;
        }

        .check-icon.active {
          color: #3B82F6;
        }

        .check-icon.inactive {
          color: #94A3B8;
        }

        .note-text {
          font-size: 15px;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.35;
        }

        .custom-note-group {
          margin-top: 16px;
        }

        .custom-note-textarea {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #CBD5E1;
          border-radius: 10px;
          padding: 12px;
          font-size: 14px;
          font-family: inherit;
          color: var(--text-primary);
          resize: vertical;
          margin-bottom: 10px;
        }

        .save-custom-btn {
          width: 100%;
          min-height: 46px;
          background: var(--navy-action);
          color: #ffffff;
          font-size: 15px;
          font-weight: 700;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.15s;
        }

        .save-custom-btn.saved {
          background: var(--emerald-success);
        }
      `}</style>
    </div>
  );
};
