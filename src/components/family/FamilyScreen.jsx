import React from 'react';
import { useApp } from '../../context/AppContext';
import { TimelineTab } from './TimelineTab';
import { DestinationsTab } from './DestinationsTab';
import { DriverNotesTab } from './DriverNotesTab';
import { WalletTab } from './WalletTab';
import { Bell, MapPin, FileHeart, Wallet, ShieldCheck, User } from 'lucide-react';

export const FamilyScreen = () => {
  const { familyTab, setFamilyTab, liveToast, notifications } = useApp();

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="family-app-container">
      {/* 家族スマホステータスバー */}
      <div className="phone-top-bar-family">
        <span className="phone-clock">10:18</span>
        <div className="phone-top-icons">
          <span className="network-dot" />
          <span className="network-dot" />
          <span className="network-dot" />
          <span className="battery-icon">85%</span>
        </div>
      </div>

      {/* 家族アプリヘッダー */}
      <header className="family-header">
        <div className="family-header-left">
          <div className="family-user-pill">
            <div className="family-avatar-box">
              <User size={18} className="family-avatar-icon" />
            </div>
            <div className="family-user-text">
              <span className="family-relation">母の見守り</span>
              <strong className="family-parent-name">サカエさん</strong>
            </div>
          </div>
        </div>
        <div className="family-header-right">
          <span className="family-app-brand">イキツケ かぞく</span>
        </div>
      </header>

      {/* リアルタイムトースト通知（本人側の操作に反応） */}
      {liveToast && (
        <div className="family-live-toast" role="alert">
          <div className="toast-dot" />
          <div className="toast-body">
            <strong className="toast-title">{liveToast.title}</strong>
            <p className="toast-msg">{liveToast.body}</p>
          </div>
        </div>
      )}

      {/* メインコンテンツスクロール領域 */}
      <main className="family-content-scroll">
        {familyTab === 'timeline' && <TimelineTab />}
        {familyTab === 'destinations' && <DestinationsTab />}
        {familyTab === 'notes' && <DriverNotesTab />}
        {familyTab === 'wallet' && <WalletTab />}
      </main>

      {/* 下部ナビゲーションバー */}
      <nav className="family-bottom-nav" aria-label="家族アプリナビゲーション">
        <button
          type="button"
          className={`nav-btn ${familyTab === 'timeline' ? 'is-active' : ''}`}
          onClick={() => setFamilyTab('timeline')}
        >
          <div className="nav-icon-wrap">
            <Bell size={20} />
            {unreadCount > 0 && <span className="nav-unread-dot" />}
          </div>
          <span>見守りログ</span>
        </button>

        <button
          type="button"
          className={`nav-btn ${familyTab === 'destinations' ? 'is-active' : ''}`}
          onClick={() => setFamilyTab('destinations')}
        >
          <div className="nav-icon-wrap">
            <MapPin size={20} />
          </div>
          <span>イキツケ設定</span>
        </button>

        <button
          type="button"
          className={`nav-btn ${familyTab === 'notes' ? 'is-active' : ''}`}
          onClick={() => setFamilyTab('notes')}
        >
          <div className="nav-icon-wrap">
            <FileHeart size={20} />
          </div>
          <span>配慮メモ</span>
        </button>

        <button
          type="button"
          className={`nav-btn ${familyTab === 'wallet' ? 'is-active' : ''}`}
          onClick={() => setFamilyTab('wallet')}
        >
          <div className="nav-icon-wrap">
            <Wallet size={20} />
          </div>
          <span>ウォレット</span>
        </button>
      </nav>

      <style>{`
        .family-app-container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          background-color: #F8FAFC;
          color: var(--text-primary);
          overflow: hidden;
          position: relative;
        }

        .phone-top-bar-family {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 18px 4px;
          font-size: 13px;
          font-weight: 700;
          color: #64748B;
          flex-shrink: 0;
          background: #FFFFFF;
        }

        .family-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 16px;
          background: #FFFFFF;
          border-bottom: 1px solid var(--border-subtle);
          flex-shrink: 0;
        }

        .family-user-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #F1F5F9;
          padding: 6px 12px;
          border-radius: 999px;
        }

        .family-avatar-box {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #EEF2F6;
          color: #16324F;
          border: 1.5px solid #CBD5E1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .family-user-text {
          display: flex;
          flex-direction: column;
        }

        .family-relation {
          font-size: 10px;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .family-parent-name {
          font-size: 13px;
          color: var(--navy-action);
        }

        .family-app-brand {
          font-size: 13px;
          font-weight: 800;
          color: #2563EB;
          letter-spacing: -0.02em;
        }

        .family-live-toast {
          position: absolute;
          top: 86px;
          left: 12px;
          right: 12px;
          z-index: 50;
          background: #1E293B;
          color: #FFFFFF;
          border-radius: 12px;
          padding: 12px 14px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.3);
          animation: slideDownToast 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideDownToast {
          from { transform: translateY(-16px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .toast-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #38BDF8;
          margin-top: 5px;
          flex-shrink: 0;
        }

        .toast-body {
          flex: 1;
        }

        .toast-title {
          font-size: 13px;
          display: block;
          color: #F8FAFC;
        }

        .toast-msg {
          font-size: 11px;
          color: #CBD5E1;
          margin-top: 2px;
          line-height: 1.35;
        }

        .family-content-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 16px 16px 36px;
          box-sizing: border-box;
        }

        .family-tab-content {
          width: 100%;
        }

        .family-bottom-nav {
          height: 72px;
          padding-bottom: 14px;
          background: #FFFFFF;
          border-top: 1px solid var(--border-subtle);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          flex-shrink: 0;
          box-sizing: border-box;
        }

        .nav-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #64748B;
          font-size: 11px;
          font-weight: 600;
          gap: 3px;
          transition: color 0.15s;
        }

        .nav-btn.is-active {
          color: #2563EB;
        }

        .nav-icon-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-unread-dot {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #EF4444;
          border: 1.5px solid #FFFFFF;
        }
      `}</style>
    </div>
  );
};
