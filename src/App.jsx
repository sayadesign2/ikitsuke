import React, { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { DemoHeader } from './components/demo/DemoHeader';
import { DeviceFrame } from './components/demo/DeviceFrame';
import { UserFlowStepper } from './components/demo/UserFlowStepper';
import { UserScreen } from './components/user/UserScreen';
import { FamilyScreen } from './components/family/FamilyScreen';
import { VideoPresentationPage } from './components/video/VideoPresentationPage';
import { Info, ShieldCheck, Heart, Landmark, Video } from 'lucide-react';
import './App.css';

function MainDemo() {
  const [viewMode, setViewMode] = useState('dual'); // 'dual' | 'user' | 'family' | 'video'

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'video') {
      setViewMode('video');
    }
  }, []);

  if (viewMode === 'video') {
    return <VideoPresentationPage />;
  }

  return (
    <div className="prototype-root">
      {/* デモ制御グローバルヘッダー */}
      <DemoHeader viewMode={viewMode} setViewMode={setViewMode} />

      {/* 16:9 ワイドデモレイアウト（左ステップ固定 ＋ 右スマートフォンステージ） */}
      <div className="demo-main-layout">
        {/* 左側固定：利用体験行動フローステッパー */}
        <UserFlowStepper />

        {/* 右側：スマートフォン実機ステージ（本人＆家族） */}
        <main className="devices-stage">
          {/* 本人用アプリ端末 */}
          {(viewMode === 'dual' || viewMode === 'user') && (
            <DeviceFrame
              title="本人用：イキツケ"
              subtitle="80歳の自立と尊厳を守る極小UI"
              badge="本人端末"
              badgeColor="#16324F"
            >
              <UserScreen />
            </DeviceFrame>
          )}

          {/* 家族用アプリ端末 */}
          {(viewMode === 'dual' || viewMode === 'family') && (
            <DeviceFrame
              title="家族用：イキツケ かぞく"
              subtitle="黒子として移動インフラを支える"
              badge="家族端末"
              badgeColor="#2563EB"
            >
              <FamilyScreen />
            </DeviceFrame>
          )}
        </main>
      </div>

      {/* サービスコンセプト＆ビジネスモデル解説（ページ下部） */}
      <footer className="concept-explainer-section">
        <div className="explainer-container">
          <div className="explainer-header">
            <span className="explainer-tag">サービスアーキテクチャ</span>
            <h3 className="explainer-title">イキツケが実現する2層構造と経済合理性</h3>
          </div>

          <div className="explainer-grid">
            <div className="explainer-card">
              <div className="card-icon-header">
                <Heart size={20} className="explainer-icon red" />
                <h4>自立と尊厳の保護</h4>
              </div>
              <p>
                「家族に頭を下げて送迎を頼む」福祉的依存を排し、写真とアイソメトリックアイコン＋2秒長押しだけで完結。地図操作や文字入力を全廃し、認知的失敗体験をゼロ化します。
              </p>
            </div>

            <div className="explainer-card">
              <div className="card-icon-header">
                <ShieldCheck size={20} className="explainer-icon green" />
                <h4>出先で帰れないを防ぐ見守り</h4>
              </div>
              <p>
                外出中はいつでもタクシーを手配できる体制をキープ。無事に帰宅した場合は見守りを完了し、民間タクシー逼迫時も提携事業所へ柔軟に連携します。
              </p>
            </div>

            <div className="explainer-card">
              <div className="card-icon-header">
                <Landmark size={20} className="explainer-icon blue" />
                <h4>三者分散のエコシステム</h4>
              </div>
              <p>
                短距離メーターではなく昼の定額チャーター枠（約¥3,000）として買い取り。家族負担（¥1,500）＋店舗協賛金（¥500）＋自治体MaaS補助（¥1,000）で地方タクシーの収益化と持続性を両立します。
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainDemo />
    </AppProvider>
  );
}
