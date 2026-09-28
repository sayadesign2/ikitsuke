import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, HandMetal, Car, ShoppingBag, Home, CheckCircle2, FileHeart, Wallet, BookOpen, Settings } from 'lucide-react';

export const UserFlowStepper = () => {
  const {
    activeTrip,
    startDispatch,
    advanceTrip,
    destinations,
    cancelTrip,
    familyTab,
    setFamilyTab,
    userModal,
    setUserModal
  } = useApp();

  // 'dispatch' (おでかけ・配車) | 'family' (家族支援・設定)
  const [journeyMode, setJourneyMode] = useState('dispatch');

  // 1. おでかけ・配車ジャーニー (5ステップ)
  const dispatchSteps = [
    {
      id: 'step-1',
      number: '01',
      title: '口実・行き先セット',
      statusMatch: ['IDLE'],
      userAction: '写真から直感選択',
      userDetail: '「いつもの場所」を写真とアイコンでワンタップ。失敗不安を排除',
      familyAction: '見守りログ待機中',
      familyDetail: '安全な乗降位置とウォレットを家族が黒子として設定済み',
      icon: <MapPin size={16} />,
      onJump: () => {
        if (activeTrip) cancelTrip();
        setUserModal(null);
        setFamilyTab('timeline');
      }
    },
    {
      id: 'step-2',
      number: '02',
      title: '2秒長押し配車決定',
      statusMatch: ['DISPATCHING'],
      userAction: '青ゲージ伸長で配車',
      userDetail: '誤タップを防ぐ2秒長押し。本人の自立的な意思決定を支援',
      familyAction: '配車リクエストをリアルタイム受信',
      familyDetail: '「サニーマートへ手配開始」をサイレント通知で見守り',
      icon: <HandMetal size={16} />,
      onJump: () => {
        setUserModal(null);
        setFamilyTab('timeline');
        if (!activeTrip && destinations.length > 0) {
          startDispatch(destinations[0]);
        }
      }
    },
    {
      id: 'step-3',
      number: '03',
      title: '安心の配車＆乗車',
      statusMatch: ['ARRIVING', 'RIDING'],
      userAction: '見守りタクシーに乗車',
      userDetail: '顔なじみの山本乗務員が到着。乗降サポートで安心移動',
      familyAction: '配車見守り＆配慮メモ伝達',
      familyDetail: '帰りの足も安心。「杖歩行・耳遠い」を乗務員へ事前共有',
      icon: <Car size={16} />,
      onJump: () => {
        setUserModal(null);
        setFamilyTab('timeline');
        if (!activeTrip && destinations.length > 0) {
          startDispatch(destinations[0]);
        }
        setTimeout(() => advanceTrip(), 100);
      }
    },
    {
      id: 'step-4',
      number: '04',
      title: '完全手ぶら到着・滞在',
      statusMatch: ['ARRIVED'],
      userAction: '財布取り出しゼロで到着',
      userDetail: '自動決済のため車内での焦りや支払いの認知的負担ゼロ',
      familyAction: '到着・自動決済ログを受信',
      familyDetail: '家族負担¥1,500、店舗協賛¥500、市補助¥1,000が自動適用',
      icon: <ShoppingBag size={16} />,
      onJump: () => {
        setUserModal(null);
        setFamilyTab('timeline');
        if (!activeTrip && destinations.length > 0) {
          startDispatch(destinations[0]);
        }
        setTimeout(() => advanceTrip(), 100);
        setTimeout(() => advanceTrip(), 200);
      }
    },
    {
      id: 'step-5',
      number: '05',
      title: '安心帰宅・イキツケ手帳',
      statusMatch: ['RETURNED'],
      userAction: '無事帰宅＆手帳に思い出蓄積',
      userDetail: '帰れない不安なく帰着。おでかけスタンプと歩行記録を獲得',
      familyAction: '帰宅ログ受信＆見守り完了',
      familyDetail: '無事帰宅を確認し、おでかけの見守りを完了',
      icon: <Home size={16} />,
      onJump: () => {
        setUserModal(null);
        setFamilyTab('timeline');
        if (!activeTrip && destinations.length > 0) {
          startDispatch(destinations[0]);
        }
        setTimeout(() => advanceTrip(), 100);
        setTimeout(() => advanceTrip(), 200);
        setTimeout(() => advanceTrip(), 300);
      }
    }
  ];

  // 2. 家族の黒子支援・設定ジャーニー (4ステップ)
  const familySteps = [
    {
      id: 'fam-step-1',
      number: 'F1',
      title: 'イキツケ登録・安全乗降位置',
      tabMatch: 'destinations',
      modalMatch: null,
      userAction: '「いつもの場所」が自動表示',
      userDetail: '本人は地図検索不要。写真と安全な乗降場所がセットされたカードが届く',
      familyAction: '安全な乗降位置と写真を事前指定',
      familyDetail: '「店舗東側・スロープ前」など、迷わず安全に乗れる場所を家族が代理登録',
      icon: <MapPin size={16} />,
      onJump: () => {
        if (activeTrip) cancelTrip();
        setUserModal(null);
        setFamilyTab('destinations');
      }
    },
    {
      id: 'fam-step-2',
      number: 'F2',
      title: 'ドライバー配慮メモ伝達',
      tabMatch: 'notes',
      modalMatch: null,
      userAction: '説明不要で丁寧なおもてなし',
      userDetail: '「杖歩行」「耳が遠い」などの申し送りが乗務員へ事前共有され尊厳を守る',
      familyAction: '本人のプライドを守る配慮メモ設定',
      familyDetail: '「介護」ではなく「おもてなし」として乗務員端末へサイレント伝達',
      icon: <FileHeart size={16} />,
      onJump: () => {
        if (activeTrip) cancelTrip();
        setUserModal(null);
        setFamilyTab('notes');
      }
    },
    {
      id: 'fam-step-3',
      number: 'F3',
      title: '三者分散決済ウォレット',
      tabMatch: 'wallet',
      modalMatch: null,
      userAction: '財布取り出し不要・手ぶら乗車',
      userDetail: '降車時に小銭を探す焦りがゼロ。家族ウォレットから自動で按分決済',
      familyAction: '家族・店舗・自治体の分散支援',
      familyDetail: '家族¥1,500＋店舗¥500＋市補助¥1,000の持続可能な経済設計を可視化',
      icon: <Wallet size={16} />,
      onJump: () => {
        if (activeTrip) cancelTrip();
        setUserModal(null);
        setFamilyTab('wallet');
      }
    },
    {
      id: 'fam-step-4',
      number: 'F4',
      title: '思い出蓄積・イキツケ手帳',
      tabMatch: 'timeline',
      modalMatch: 'stampBook',
      userAction: '手帳スタンプとお出かけ記録',
      userDetail: 'お出かけ実績が手帳にスタンプとして残り、外出の自己肯定感と居場所定着へ',
      familyAction: '見守りログとお出かけ履歴',
      familyDetail: '母が元気に外出できている様子をそっと見守り、会話のきっかけに',
      icon: <BookOpen size={16} />,
      onJump: () => {
        if (activeTrip) cancelTrip();
        setFamilyTab('timeline');
        setUserModal('stampBook');
      }
    }
  ];

  const currentStatus = activeTrip ? activeTrip.status : 'IDLE';

  const activeDispatchIndex = dispatchSteps.findIndex(step => step.statusMatch.includes(currentStatus));
  const activeFamilyIndex = familySteps.findIndex(step => {
    if (step.modalMatch) {
      return userModal === step.modalMatch;
    }
    return familyTab === step.tabMatch && !userModal;
  });

  const activeSteps = journeyMode === 'dispatch' ? dispatchSteps : familySteps;
  const activeIndex = journeyMode === 'dispatch' ? activeDispatchIndex : activeFamilyIndex;

  return (
    <aside className="sidebar-stepper" aria-label="ユーザー行動フロー">
      {/* サイドバー上部タイトル */}
      <div className="stepper-sidebar-header">
        <div className="stepper-header-tag-row">
          <span className="stepper-badge">行動ジャーニー連動</span>
          <span className="stepper-current-pill">
            <span className="live-dot" />
            {journeyMode === 'dispatch' ? `STEP 0${activeDispatchIndex >= 0 ? activeDispatchIndex + 1 : 1} / 05` : `STEP 0${activeFamilyIndex >= 0 ? activeFamilyIndex + 1 : 1} / 04`}
          </span>
        </div>
        <h2 className="stepper-sidebar-title">利用体験シミュレーション</h2>
        <p className="stepper-sidebar-hint">ステップをクリックしてシーンを瞬時に切り替え可能</p>

        {/* ジャーニー切り替えタブ */}
        <div className="journey-mode-tabs">
          <button
            type="button"
            className={`journey-tab-btn ${journeyMode === 'dispatch' ? 'is-active' : ''}`}
            onClick={() => {
              setJourneyMode('dispatch');
              setUserModal(null);
            }}
          >
            <Car size={13} />
            <span>🚗 配車ジャーニー</span>
          </button>
          <button
            type="button"
            className={`journey-tab-btn ${journeyMode === 'family' ? 'is-active' : ''}`}
            onClick={() => {
              setJourneyMode('family');
              familySteps[0].onJump();
            }}
          >
            <Settings size={13} />
            <span>⚙️ 家族設定・黒子支援</span>
          </button>
        </div>
      </div>

      {/* 縦型ステップリスト */}
      <div className="stepper-step-list">
        {activeSteps.map((step, idx) => {
          const isCurrent = idx === activeIndex;
          const isPast = idx < activeIndex;

          return (
            <div
              key={step.id}
              className={`sidebar-step-card ${isCurrent ? 'is-active' : ''} ${isPast ? 'is-past' : ''}`}
              onClick={step.onJump}
              role="button"
              tabIndex={0}
              aria-label={`ステップ ${step.number}: ${step.title} に切り替える`}
            >
              {/* カードヘッダー */}
              <div className="step-card-top">
                <div className="step-num-plate">
                  {isPast ? <CheckCircle2 size={13} className="done-icon" /> : step.number}
                </div>
                <h3 className="step-card-name">{step.title}</h3>
                <div className="step-icon-badge">{step.icon}</div>
              </div>

              {/* 2者の体験要約 */}
              <div className="step-actors-grid">
                <div className="actor-mini-row user-row">
                  <span className="actor-mini-label user-label">本人</span>
                  <span className="actor-mini-action">{step.userAction}</span>
                </div>
                <div className="actor-mini-row family-row">
                  <span className="actor-mini-label family-label">家族</span>
                  <span className="actor-mini-action">{step.familyAction}</span>
                </div>
              </div>

              {/* アクティブ時のみ詳細解説を表示 */}
              {isCurrent && (
                <div className="step-active-expanded">
                  <div className="active-detail-text">
                    <strong>本人体験:</strong> {step.userDetail}
                  </div>
                  <div className="active-detail-text">
                    <strong>家族支援:</strong> {step.familyDetail}
                  </div>
                </div>
              )}

              {/* アクティブインジケーター左バー */}
              {isCurrent && <div className="active-left-indicator" />}
            </div>
          );
        })}
      </div>

      <style>{`
        .sidebar-stepper {
          width: 380px;
          min-width: 360px;
          max-width: 400px;
          height: 100%;
          background: rgba(15, 23, 42, 0.85);
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(14px);
          display: flex;
          flex-direction: column;
          padding: 16px;
          overflow-y: auto;
          flex-shrink: 0;
        }

        .stepper-sidebar-header {
          margin-bottom: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .stepper-header-tag-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .stepper-badge {
          background: #3A7CA5;
          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 4px;
          letter-spacing: 0.04em;
        }

        .stepper-current-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          color: #38BDF8;
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.25);
          padding: 2px 8px;
          border-radius: 999px;
        }

        .live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #38BDF8;
          box-shadow: 0 0 6px #38BDF8;
          animation: pulseDot 1.8s infinite;
        }

        @keyframes pulseDot {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }

        .stepper-sidebar-title {
          font-size: 16px;
          font-weight: 700;
          color: #F8FAFC;
          letter-spacing: -0.01em;
          margin: 0;
        }

        .stepper-sidebar-hint {
          font-size: 11px;
          color: #94A3B8;
          margin-top: 2px;
          margin-bottom: 10px;
        }

        .journey-mode-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
          background: rgba(15, 23, 42, 0.6);
          padding: 3px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .journey-tab-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 6px 4px;
          background: transparent;
          border: none;
          border-radius: 6px;
          font-size: 11.5px;
          font-weight: 700;
          color: #94A3B8;
          cursor: pointer;
          transition: all 0.15s ease;
          white-space: nowrap;
        }

        .journey-tab-btn:hover {
          color: #F1F5F9;
          background: rgba(255, 255, 255, 0.05);
        }

        .journey-tab-btn.is-active {
          color: #0F172A;
          background: #38BDF8;
          box-shadow: 0 2px 8px rgba(56, 189, 248, 0.35);
        }

        .stepper-step-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        .sidebar-step-card {
          position: relative;
          background: rgba(30, 41, 59, 0.55);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 10px 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          cursor: pointer;
          transition: all 0.18s ease;
          overflow: hidden;
        }

        .sidebar-step-card:hover {
          background: rgba(30, 41, 59, 0.85);
          border-color: rgba(56, 189, 248, 0.35);
          transform: translateX(2px);
        }

        .sidebar-step-card.is-active {
          background: rgba(22, 50, 79, 0.95);
          border-color: #38BDF8;
          box-shadow: 0 0 16px rgba(56, 189, 248, 0.25);
        }

        .sidebar-step-card.is-past {
          border-color: rgba(16, 185, 129, 0.25);
          opacity: 0.85;
        }

        .step-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .step-num-plate {
          background: rgba(255, 255, 255, 0.12);
          color: #F8FAFC;
          font-family: var(--font-en);
          font-size: 11px;
          font-weight: 700;
          padding: 1px 6px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 24px;
        }

        .done-icon {
          color: #10B981;
        }

        .step-card-name {
          font-size: 13px;
          font-weight: 700;
          color: #FFFFFF;
          flex: 1;
          letter-spacing: -0.01em;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .step-icon-badge {
          color: #38BDF8;
          display: flex;
          align-items: center;
        }

        .step-actors-grid {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .actor-mini-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          line-height: 1.3;
        }

        .actor-mini-label {
          font-size: 9px;
          font-weight: 700;
          padding: 1px 4px;
          border-radius: 3px;
          flex-shrink: 0;
        }

        .user-label {
          background: rgba(56, 189, 248, 0.2);
          color: #38BDF8;
        }

        .family-label {
          background: rgba(129, 140, 248, 0.2);
          color: #A5B4FC;
        }

        .actor-mini-action {
          color: #CBD5E1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .step-active-expanded {
          margin-top: 4px;
          padding-top: 6px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          gap: 4px;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-3px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .active-detail-text {
          font-size: 11px;
          color: #94A3B8;
          line-height: 1.35;
        }

        .active-detail-text strong {
          color: #E2E8F0;
        }

        .active-left-indicator {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: #38BDF8;
          box-shadow: 0 0 8px #38BDF8;
        }
      `}</style>
    </aside>
  );
};
