import React from 'react';
import { useApp } from '../../context/AppContext';
import { CreditCard, Receipt, Building2, Landmark, CheckCircle2, ChevronRight, PieChart } from 'lucide-react';

export const WalletTab = () => {
  const { transactions } = useApp();

  return (
    <div className="family-tab-content">
      <div className="wallet-header">
        <h2 className="section-title">家族ウォレット</h2>
      </div>

      {/* 家族カード情報バナー */}
      <div className="card-wallet-badge">
        <div className="card-top-row">
          <div className="card-type-box">
            <CreditCard size={20} />
            <span>家族代理決済カード</span>
          </div>
          <span className="card-status-pill">自動引き落とし中</span>
        </div>
        <div className="card-number-row">
          <span>•••• •••• •••• 8823</span>
          <span className="card-exp">08/29</span>
        </div>
        <div className="card-holder-row">
          <span>名義：サトウ ヨウコ</span>
          <span className="card-brand">VISA</span>
        </div>
      </div>

      {/* 三者負担エコシステムの解説カード */}
      <div className="ecosystem-box">
        <div className="ecosystem-title-row">
          <PieChart size={17} className="ecosystem-icon" />
          <strong>定額チャーター枠 ¥3,000 の内訳</strong>
        </div>
        <div className="ecosystem-progress-bar">
          <div className="bar-segment family" style={{ width: '50%' }}>家族 50%</div>
          <div className="bar-segment sponsor" style={{ width: '16.7%' }}>17%</div>
          <div className="bar-segment subsidy" style={{ width: '33.3%' }}>市補助 33%</div>
        </div>
        <div className="ecosystem-legend">
          <div className="legend-item">
            <span className="legend-dot dot-family" />
            <span className="legend-name">ご家族負担: <strong>¥1,500 (50%)</strong></span>
          </div>
          <div className="legend-item">
            <span className="legend-dot dot-sponsor" />
            <span className="legend-name">店舗協賛金: <strong>¥500 (17%)</strong></span>
          </div>
          <div className="legend-item">
            <span className="legend-dot dot-subsidy" />
            <span className="legend-name">自治体MaaS補助: <strong>¥1,000 (33%)</strong></span>
          </div>
        </div>
      </div>

      {/* 利用履歴一覧 */}
      <div className="tx-section">
        <h3 className="group-label">直近の運行決済履歴</h3>
        <div className="tx-list">
          {transactions.map((tx) => (
            <div key={tx.id} className="tx-card">
              <div className="tx-top-row">
                <strong className="tx-dest">{tx.destination}</strong>
                <span className="tx-family-cost">¥{tx.familyPayment.toLocaleString()}</span>
              </div>
              <div className="tx-meta-row">
                <span>{tx.date}</span>
                <span>{tx.driver}</span>
              </div>
              <div className="tx-breakdown-row">
                <span className="breakdown-tag">全額¥{tx.totalCharter.toLocaleString()}</span>
                <span className="breakdown-arrow">＝</span>
                <span className="breakdown-chip family">家族¥{tx.familyPayment}</span>
                <span className="breakdown-plus">＋</span>
                <span className="breakdown-chip sponsor">協賛¥{tx.sponsorDiscount}</span>
                <span className="breakdown-plus">＋</span>
                <span className="breakdown-chip subsidy">補助¥{tx.subsidyDiscount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .wallet-header {
          margin-bottom: 14px;
        }

        .card-wallet-badge {
          background: linear-gradient(135deg, #16324F 0%, #24466B 100%);
          color: #ffffff;
          border-radius: 16px;
          padding: 16px 18px;
          box-shadow: 0 8px 20px -4px rgba(22, 50, 79, 0.25);
          margin-bottom: 18px;
        }

        .card-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .card-type-box {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
        }

        .card-status-pill {
          background: rgba(16, 185, 129, 0.2);
          border: 1px solid rgba(16, 185, 129, 0.4);
          color: #6EE7B7;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 999px;
        }

        .card-number-row {
          font-family: var(--font-en);
          font-size: 17px;
          letter-spacing: 2px;
          font-weight: 600;
          display: flex;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .card-exp {
          font-size: 13px;
          color: #94A3B8;
        }

        .card-holder-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: #CBD5E1;
        }

        .card-brand {
          font-family: var(--font-en);
          font-weight: 800;
          font-size: 18px;
          letter-spacing: 1px;
          color: #FFFFFF;
        }

        .ecosystem-box {
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          padding: 14px;
          margin-bottom: 18px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
        }

        .ecosystem-title-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14.5px;
          color: var(--text-primary);
          margin-bottom: 10px;
        }

        .ecosystem-icon {
          color: var(--navy-action);
        }

        .ecosystem-progress-bar {
          height: 26px;
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          font-size: 12px;
          font-weight: 700;
          color: #ffffff;
          line-height: 26px;
          text-align: center;
          margin-bottom: 10px;
        }

        .bar-segment.family { background: #16324F; }
        .bar-segment.sponsor { background: #EA580C; }
        .bar-segment.subsidy { background: #059669; }

        .ecosystem-legend {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-bottom: 8px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--text-secondary);
        }

        .legend-dot {
          width: 10px;
          height: 10px;
          border-radius: 3px;
        }

        .dot-family { background: #16324F; }
        .dot-sponsor { background: #EA580C; }
        .dot-subsidy { background: #059669; }

        .ecosystem-note {
          font-size: 12px;
          color: var(--text-muted);
          line-height: 1.45;
          border-top: 1px dashed #E2E8F0;
          padding-top: 8px;
          margin-top: 6px;
        }

        .group-label {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-secondary);
          margin-bottom: 10px;
          display: block;
        }

        .tx-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .tx-card {
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 13px 14px;
        }

        .tx-top-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 4px;
        }

        .tx-dest {
          font-size: 15.5px;
          color: var(--text-primary);
        }

        .tx-family-cost {
          font-size: 18px;
          font-weight: 800;
          color: var(--navy-action);
          font-family: var(--font-en);
        }

        .tx-meta-row {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: 6px;
        }

        .tx-breakdown-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 4px 6px;
          font-size: 11.5px;
          background: #F8FAFC;
          padding: 6px 10px;
          border-radius: 6px;
          color: var(--text-secondary);
        }

        .breakdown-tag {
          font-weight: 700;
          color: var(--text-primary);
          white-space: nowrap;
        }

        .breakdown-arrow,
        .breakdown-plus {
          color: #94A3B8;
          font-size: 9px;
        }

        .breakdown-chip {
          display: inline-flex;
          align-items: center;
          font-weight: 600;
          font-size: 10px;
          padding: 1px 5px;
          border-radius: 4px;
          white-space: nowrap;
        }

        .breakdown-chip.family {
          background: #EAF2F7;
          color: var(--navy-action);
        }

        .breakdown-chip.sponsor {
          background: #FFF7ED;
          color: #C2410C;
        }

        .breakdown-chip.subsidy {
          background: #ECFDF5;
          color: #059669;
        }
      `}</style>
    </div>
  );
};
