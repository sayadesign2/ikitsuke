import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { UserScreen } from '../user/UserScreen';
import { FamilyScreen } from '../family/FamilyScreen';
import { 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';

export const SCENES = [
  {
    id: 1,
    phase: '01',
    category: 'おでかけ',
    phaseName: '行き先選択',
    title: '写真とアイコンだけで\n「いつもの居場所」を選ぶ',
    userAction: '写真からワンタップで選択（文字入力・地図操作ゼロ）',
    familyAction: '安全な乗降場所・家族ウォレット事前設定済み',
    durationSec: 6.5,
    setup: (app) => {
      app.forceSetTripStatus(null);
      app.setUserModal(null);
      app.setFamilyTab('timeline');
    }
  },
  {
    id: 2,
    phase: '02',
    category: 'おでかけ',
    phaseName: '意思決定',
    title: '誤操作を防ぐ\n「2秒長押し」の自立配車',
    userAction: '青ゲージ伸長による2秒長押し配車（誤タップ防止）',
    familyAction: '「サニーマートへ手配開始」の通知をサイレント受信',
    durationSec: 6.5,
    setup: (app) => {
      app.setUserModal(null);
      app.setFamilyTab('timeline');
      app.forceSetTripStatus('DISPATCHING');
    }
  },
  {
    id: 3,
    phase: '03',
    category: 'おでかけ',
    phaseName: '安心移動',
    title: '出先で帰れないを防ぐ\n安心の配車と見守り',
    userAction: '顔なじみの山本乗務員が到着・乗車サポート',
    familyAction: '帰りの手配も安心。配慮メモが乗務員へ自動伝達',
    durationSec: 7.0,
    setup: (app) => {
      app.setUserModal(null);
      app.setFamilyTab('timeline');
      app.forceSetTripStatus('RIDING');
    }
  },
  {
    id: 4,
    phase: '04',
    category: 'おでかけ',
    phaseName: '手ぶら到着',
    title: '財布取り出しゼロ到着\n＆三者分散自動決済',
    userAction: '小銭の支払い焦りゼロで店舗到着・滞在',
    familyAction: '自動決済完了ログ受信（家族・店舗・自治体で按分）',
    durationSec: 7.0,
    setup: (app) => {
      app.setUserModal(null);
      app.setFamilyTab('timeline');
      app.forceSetTripStatus('ARRIVED');
    }
  },
  {
    id: 5,
    phase: '05',
    category: 'おでかけ',
    phaseName: '安心帰宅',
    title: '手帳に思い出が蓄積\n無事に帰宅して見守り完了',
    userAction: '無事帰宅・おでかけスタンプ獲得の達成感',
    familyAction: '帰宅ログを受信。おでかけの見守りが無事完了',
    durationSec: 7.0,
    setup: (app) => {
      app.setUserModal(null);
      app.setFamilyTab('timeline');
      app.forceSetTripStatus('ARRIVED');
    }
  },
  {
    id: 6,
    phase: '06',
    category: '家族黒子設定',
    phaseName: 'イキツケ登録',
    title: '迷わない乗降場所と写真を\n家族が黒子として代理登録',
    userAction: '本人は操作不要。安心な「いつもの場所」が自動反映',
    familyAction: '「店舗東側スロープ前」など安全な停車位置を事前指定',
    durationSec: 7.0,
    setup: (app) => {
      app.forceSetTripStatus(null);
      app.setUserModal(null);
      app.setFamilyTab('destinations');
    }
  },
  {
    id: 7,
    phase: '07',
    category: '家族黒子設定',
    phaseName: '配慮メモ',
    title: '本人の尊厳を守る\nサイレントなドライバー配慮メモ',
    userAction: '杖歩行や耳の遠さを気にせず、丁寧なおもてなしを体験',
    familyAction: '「介護」ではなく「おもてなし」として乗務員端末へ事前共有',
    durationSec: 7.0,
    setup: (app) => {
      app.forceSetTripStatus(null);
      app.setUserModal(null);
      app.setFamilyTab('notes');
    }
  },
  {
    id: 8,
    phase: '08',
    category: '家族黒子設定',
    phaseName: '分散決済',
    title: '家族・店舗・自治体で支える\n三者分散ウォレット',
    userAction: '車内での小銭精算不安ゼロ。完全キャッシュレス移動',
    familyAction: '家族¥1,500＋店舗¥500＋市補助¥1,000の経済合理性',
    durationSec: 7.0,
    setup: (app) => {
      app.forceSetTripStatus(null);
      app.setUserModal(null);
      app.setFamilyTab('wallet');
    }
  },
  {
    id: 9,
    phase: '09',
    category: '家族黒子設定',
    phaseName: 'イキツケ手帳',
    title: 'おでかけ実績と思い出が残る\nサカエさんのイキツケ手帳',
    userAction: '訪問回数や歩行スタンプで自己肯定感と外出習慣が定着',
    familyAction: '母が元気に地域へ出かけている様子を見守りログで確認',
    durationSec: 7.0,
    setup: (app) => {
      app.forceSetTripStatus(null);
      app.setFamilyTab('timeline');
      app.setUserModal('stampBook');
    }
  },
  {
    id: 10,
    phase: '✦',
    category: '総括',
    phaseName: 'サービス価値',
    title: '自立と尊厳を守り\n地域で持続するモビリティへ',
    userAction: '80歳のプライドを守る直感・失敗ゼロのUI',
    familyAction: '送迎負担から解放され、親の外出を黒子として支える',
    durationSec: 6.5,
    setup: (app) => {
      if (app.activeTrip) app.cancelTrip();
      app.setUserModal(null);
      app.setFamilyTab('timeline');
    }
  }
];

export const VideoPresentationPage = () => {
  const app = useApp();
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const scene = SCENES[currentSceneIdx];

  // シーンが変わるたびに状態をセットアップ
  useEffect(() => {
    if (scene && scene.setup) {
      scene.setup(app);
    }
    window.currentSceneIndex = currentSceneIdx;
    window.isPresentationFinished = currentSceneIdx >= SCENES.length - 1;
  }, [currentSceneIdx]);

  // 自動シーン進行
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (currentSceneIdx < SCENES.length - 1) {
        setCurrentSceneIdx(prev => prev + 1);
      } else {
        setIsPlaying(false);
      }
    }, scene.durationSec * 1000);

    return () => clearTimeout(timer);
  }, [currentSceneIdx, isPlaying, scene]);

  return (
    <div className="vp-root">
      {/* 背景グロー */}
      <div className="vp-glow vp-glow-1" />
      <div className="vp-glow vp-glow-2" />

      {/* ━━ メインステージ: 左テキスト ＋ 右スマホ2台 ━━ */}
      <main className="vp-stage">

        {/* 左カラム：シーン情報 */}
        <aside className="vp-info">
          {/* ブランドロゴ ＆ コントロール */}
          <div className="vp-brand-row">
            <div className="vp-brand">
              <span className="vp-brand-badge">IKITSUKE</span>
              <span className="vp-brand-name">イキツケ</span>
            </div>
            <button
              type="button"
              className="vp-play-toggle-btn"
              onClick={() => setIsPlaying(prev => !prev)}
              aria-label={isPlaying ? '自動進行を一時停止' : '自動進行を再生'}
            >
              {isPlaying ? '⏸ 一時停止' : '▶ 自動再生'}
            </button>
          </div>

          {/* シーンインジケーター（10シーン対応・グループ別） */}
          <div className="vp-steps-container">
            <div className="vp-steps-group">
              <span className="vp-steps-group-label">🚗 おでかけ:</span>
              <div className="vp-steps">
                {SCENES.slice(0, 5).map((s, idx) => {
                  const isCur = idx === currentSceneIdx;
                  const isDone = idx < currentSceneIdx;
                  return (
                    <button
                      key={s.id}
                      className={`vp-step ${isCur ? 'cur' : ''} ${isDone ? 'done' : ''}`}
                      onClick={() => setCurrentSceneIdx(idx)}
                    >
                      {isDone ? <CheckCircle2 size={13} /> : <span>{s.phase}</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="vp-steps-group">
              <span className="vp-steps-group-label">⚙️ 家族設定:</span>
              <div className="vp-steps">
                {SCENES.slice(5).map((s, idx) => {
                  const actualIdx = idx + 5;
                  const isCur = actualIdx === currentSceneIdx;
                  const isDone = actualIdx < currentSceneIdx;
                  return (
                    <button
                      key={s.id}
                      className={`vp-step ${isCur ? 'cur' : ''} ${isDone ? 'done' : ''}`}
                      onClick={() => setCurrentSceneIdx(actualIdx)}
                    >
                      {isDone ? <CheckCircle2 size={13} /> : <span>{s.phase}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* シーンタイトル */}
          <div className="vp-scene-badge">
            <span className="vp-dot" />
            <span className="vp-badge-cat">{scene.category}</span>
            <span className="vp-badge-sep">/</span>
            <span>SCENE {scene.phase} {scene.phaseName}</span>
          </div>

          <h1 className="vp-title">{scene.title}</h1>

          {/* 本人 / 家族 アクション */}
          <div className="vp-actors">
            <div className="vp-actor vp-actor-user">
              <span className="vp-actor-label">👵 本人の体験</span>
              <span className="vp-actor-text">{scene.userAction}</span>
            </div>
            <div className="vp-actor vp-actor-family">
              <span className="vp-actor-label">📱 家族の黒子支援</span>
              <span className="vp-actor-text">{scene.familyAction}</span>
            </div>
          </div>

          {/* コアバリュー */}
          <div className="vp-value">
            <ShieldCheck size={18} className="vp-value-icon" />
            <p>
              <strong>直感2秒長押し</strong> × <strong>安心の見守り</strong> × <strong>三者分散決済</strong>
            </p>
          </div>
        </aside>

        {/* 右カラム：スマホ2台 */}
        <div className="vp-phones">
          {/* 本人端末 */}
          <div className="vp-phone-col">
            <div className="vp-phone-label">
              <span className="vp-phone-badge" style={{ background: '#16324F' }}>本人端末</span>
              <span className="vp-phone-name">イキツケ</span>
            </div>
            <div className="vp-phone-body">
              <div className="vp-phone-notch">
                <div className="vp-speaker" />
                <div className="vp-camera" />
              </div>
              <div className="vp-phone-screen">
                <UserScreen />
              </div>
              <div className="vp-home-bar" />
            </div>
          </div>

          {/* 家族端末 */}
          <div className="vp-phone-col">
            <div className="vp-phone-label">
              <span className="vp-phone-badge" style={{ background: '#2563EB' }}>家族端末</span>
              <span className="vp-phone-name">イキツケ かぞく</span>
            </div>
            <div className="vp-phone-body">
              <div className="vp-phone-notch">
                <div className="vp-speaker" />
                <div className="vp-camera" />
              </div>
              <div className="vp-phone-screen">
                <FamilyScreen />
              </div>
              <div className="vp-home-bar" />
            </div>
          </div>
        </div>
      </main>

      <style>{`
        /* ═══════ ルート ═══════ */
        .vp-root {
          width: 100vw;
          height: 100vh;
          background: #060b14;
          background-image:
            radial-gradient(at 0% 30%, rgba(30, 58, 138, 0.3) 0, transparent 55%),
            radial-gradient(at 100% 70%, rgba(14, 116, 144, 0.2) 0, transparent 55%);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
          color: #F8FAFC;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Hiragino Sans", sans-serif;
        }

        .vp-glow {
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          filter: blur(140px);
          pointer-events: none;
          z-index: 0;
        }
        .vp-glow-1 { top: -5%; left: -8%; background: rgba(56, 189, 248, 0.07); }
        .vp-glow-2 { bottom: -5%; right: -8%; background: rgba(99, 102, 241, 0.07); }

        /* ═══════ メインステージ ═══════ */
        .vp-stage {
          flex: 1;
          display: flex;
          align-items: stretch;
          padding: 12px 24px 12px 28px;
          gap: 24px;
          z-index: 1;
          overflow: hidden;
          height: 100vh;
          box-sizing: border-box;
        }

        /* ═══════ 左カラム（テキスト：コンパクトに縮小） ═══════ */
        .vp-info {
          width: 320px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 12px;
        }

        /* ブランド行 */
        .vp-brand-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .vp-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .vp-brand-badge {
          background: linear-gradient(135deg, #0284C7, #2563EB);
          color: #fff;
          font-weight: 800;
          font-size: 11px;
          letter-spacing: 0.08em;
          padding: 3px 8px;
          border-radius: 6px;
        }
        .vp-brand-name {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .vp-play-toggle-btn {
          background: rgba(30, 41, 59, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #E2E8F0;
          font-size: 11.5px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .vp-play-toggle-btn:hover {
          background: rgba(56, 189, 248, 0.2);
          border-color: #38BDF8;
          color: #38BDF8;
        }

        /* ステップコンテナ */
        .vp-steps-container {
          display: flex;
          flex-direction: column;
          gap: 6px;
          background: rgba(15, 23, 42, 0.5);
          padding: 7px 10px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.07);
        }

        .vp-steps-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .vp-steps-group-label {
          font-size: 11px;
          font-weight: 700;
          color: #94A3B8;
          width: 76px;
          flex-shrink: 0;
        }

        .vp-steps {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
        }
        .vp-step {
          width: 32px; height: 24px;
          border-radius: 5px;
          background: rgba(30, 41, 59, 0.7);
          border: 1px solid rgba(255,255,255,0.08);
          color: #94A3B8;
          font-size: 11px;
          font-weight: 700;
          font-family: monospace;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .vp-step.cur {
          background: rgba(37, 99, 235, 0.35);
          border-color: #38BDF8;
          color: #38BDF8;
          box-shadow: 0 0 10px rgba(56,189,248,0.35);
        }
        .vp-step.done {
          border-color: rgba(16,185,129,0.4);
          color: #10B981;
        }

        /* シーンバッジ */
        .vp-scene-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(56,189,248,0.12);
          border: 1px solid rgba(56,189,248,0.3);
          color: #38BDF8;
          font-size: 12.5px;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 999px;
          width: fit-content;
          letter-spacing: 0.03em;
        }
        .vp-badge-cat {
          color: #F8FAFC;
        }
        .vp-badge-sep {
          opacity: 0.4;
          font-size: 11px;
        }
        .vp-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #38BDF8;
          box-shadow: 0 0 8px #38BDF8;
          animation: vpPulse 1.8s infinite;
        }
        @keyframes vpPulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 1; }
        }

        /* タイトル */
        .vp-title {
          font-size: 24px;
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.3;
          letter-spacing: -0.02em;
          margin: 0;
          white-space: pre-line;
        }

        /* アクター情報 */
        .vp-actors {
          display: flex;
          flex-direction: column;
          gap: 8px;
          background: rgba(30,41,59,0.55);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 12px;
          backdrop-filter: blur(10px);
        }
        .vp-actor {
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding: 8px 10px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .vp-actor-user {
          border-color: rgba(56, 189, 248, 0.25);
          background: rgba(56, 189, 248, 0.06);
        }
        .vp-actor-family {
          border-color: rgba(129, 140, 248, 0.25);
          background: rgba(129, 140, 248, 0.06);
        }

        .vp-actor-label {
          display: block;
          font-size: 11.5px;
          font-weight: 700;
          margin-bottom: 1px;
        }
        .vp-actor-user .vp-actor-label { color: #38BDF8; }
        .vp-actor-family .vp-actor-label { color: #A5B4FC; }

        .vp-actor-text {
          font-size: 14px;
          font-weight: 600;
          color: #F1F5F9;
          line-height: 1.35;
        }

        /* コアバリュー */
        .vp-value {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          background: rgba(15,23,42,0.6);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          padding: 10px 12px;
        }
        .vp-value-icon { color: #38BDF8; flex-shrink: 0; margin-top: 1px; width: 16px; height: 16px; }
        .vp-value p {
          font-size: 12.5px;
          color: #94A3B8;
          line-height: 1.4;
          margin: 0;
        }
        .vp-value strong { color: #E2E8F0; }

        /* ═══════ 右カラム（スマホ2台：大きくワイドに表示） ═══════ */
        .vp-phones {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          min-width: 0;
          height: 100%;
        }

        .vp-phone-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          max-height: 100%;
          flex: 1;
          max-width: 440px;
          min-width: 320px;
        }

        .vp-phone-label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
          flex-shrink: 0;
        }
        .vp-phone-badge {
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 5px;
          letter-spacing: 0.04em;
        }
        .vp-phone-name {
          font-size: 15px;
          font-weight: 700;
          color: #E2E8F0;
        }

        /* スマホ筐体 — 縦横比率をバランスよく広げてUIを最大化 */
        .vp-phone-body {
          position: relative;
          width: 100%;
          height: calc(100% - 32px);
          max-height: calc(100% - 32px);
          aspect-ratio: 9 / 18.5;
          background: #1e293b;
          border-radius: 40px;
          padding: 8px;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.12),
            0 24px 48px -12px rgba(0,0,0,0.65),
            inset 0 0 3px 1px rgba(255,255,255,0.08);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-sizing: border-box;
        }

        .vp-phone-notch {
          position: absolute;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 84px; height: 16px;
          background: #060b14;
          border-radius: 16px;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }
        .vp-speaker { width: 28px; height: 3px; background: #1e293b; border-radius: 2px; }
        .vp-camera { width: 6px; height: 6px; background: #0f172a; border: 1.5px solid #1e293b; border-radius: 50%; }

        .vp-phone-screen {
          width: 100%;
          flex: 1;
          height: 100%;
          border-radius: 32px;
          overflow: hidden;
          background: var(--bg-base, #F8FAFC);
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .vp-home-bar {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 90px; height: 4px;
          background: rgba(0,0,0,0.2);
          border-radius: 2px;
          z-index: 40;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};
