import React from 'react';

export const DeviceFrame = ({ title, subtitle, badge, badgeColor = '#3A7CA5', children }) => {
  return (
    <div className="device-wrapper">
      {/* 端末上部の説明プレート */}
      <div className="device-meta-header">
        <span className="device-type-badge" style={{ backgroundColor: badgeColor }}>
          {badge}
        </span>
        <div className="device-titles">
          <h2 className="device-title">{title}</h2>
          <span className="device-subtitle">{subtitle}</span>
        </div>
      </div>

      {/* スマートフォン筐体モック */}
      <div className="phone-chassis">
        {/* ベゼル・ダイナミックアイランド/ノッチ */}
        <div className="phone-notch">
          <div className="speaker-slit" />
          <div className="camera-lens" />
        </div>

        {/* 端末スクリーン */}
        <div className="phone-screen">
          {children}
        </div>

        {/* ホームバー */}
        <div className="phone-home-indicator-bar" />
      </div>

      <style>{`
        .device-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 440px;
          height: 100%;
          justify-content: center;
        }

        .device-meta-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
          width: 100%;
          padding: 0 6px;
        }

        .device-type-badge {
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 9px;
          border-radius: 6px;
          letter-spacing: 0.04em;
          flex-shrink: 0;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        .device-titles {
          display: flex;
          flex-direction: column;
        }

        .device-title {
          font-size: 18px;
          font-weight: 700;
          color: #F1F5F9;
          letter-spacing: -0.01em;
          margin: 0;
          line-height: 1.2;
        }

        .device-subtitle {
          font-size: 12px;
          color: #94A3B8;
        }

        .phone-chassis {
          position: relative;
          width: 100%;
          height: 870px;
          max-height: calc(100vh - 100px);
          background: #1e293b;
          border-radius: 44px;
          padding: 8px;
          box-shadow: 
            0 0 0 1px rgba(255, 255, 255, 0.15),
            0 24px 48px -12px rgba(0, 0, 0, 0.7),
            0 12px 24px -6px rgba(0, 0, 0, 0.5),
            inset 0 0 4px 2px rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .phone-notch {
          position: absolute;
          top: 12px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 18px;
          background: #090e17;
          border-radius: 20px;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .speaker-slit {
          width: 32px;
          height: 3px;
          background: #1e293b;
          border-radius: 2px;
        }

        .camera-lens {
          width: 7px;
          height: 7px;
          background: #0f172a;
          border: 1.5px solid #1e293b;
          border-radius: 50%;
        }

        .phone-screen {
          width: 100%;
          height: 100%;
          border-radius: 32px;
          overflow: hidden;
          background: var(--bg-base);
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .phone-home-indicator-bar {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 110px;
          height: 4px;
          background: rgba(0, 0, 0, 0.25);
          border-radius: 2px;
          z-index: 40;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};
