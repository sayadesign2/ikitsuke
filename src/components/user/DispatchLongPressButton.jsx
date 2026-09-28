import React, { useState, useRef, useEffect } from 'react';
import { Car } from 'lucide-react';

export const DispatchLongPressButton = ({ destination, onComplete, disabled = false }) => {
  const [progress, setProgress] = useState(0);
  const [isPressing, setIsPressing] = useState(false);
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(null);
  const DURATION = 2000; // 2.0秒 (DESIGN.md仕様)

  const triggerHaptics = (intensity = 'light') => {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      if (intensity === 'success') {
        window.navigator.vibrate([40, 60, 100]);
      } else {
        window.navigator.vibrate(15);
      }
    }
  };

  const startPress = (e) => {
    if (disabled) return;
    // 右クリックなどは除外
    if (e.button && e.button !== 0) return;

    setIsPressing(true);
    startTimeRef.current = performance.now();
    triggerHaptics('light');

    const updateLoop = (now) => {
      const elapsed = now - startTimeRef.current;
      const currentProgress = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(currentProgress);

      // 周期的な微弱バイブレーション
      if (Math.floor(elapsed) % 350 < 30) {
        triggerHaptics('light');
      }

      if (currentProgress >= 100) {
        setIsPressing(false);
        setProgress(0);
        triggerHaptics('success');
        if (onComplete) {
          onComplete(destination);
        }
      } else {
        animationFrameRef.current = requestAnimationFrame(updateLoop);
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateLoop);
  };

  const cancelPress = () => {
    if (!isPressing) return;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setIsPressing(false);
    setProgress(0);
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="dispatch-btn-container">
      <button
        type="button"
        className={`dispatch-long-press-button ${isPressing ? 'is-pressing' : ''} ${disabled ? 'is-disabled' : ''}`}
        onMouseDown={startPress}
        onMouseUp={cancelPress}
        onMouseLeave={cancelPress}
        onTouchStart={startPress}
        onTouchEnd={cancelPress}
        onTouchCancel={cancelPress}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            if (!isPressing) startPress(e);
          }
        }}
        onKeyUp={cancelPress}
        aria-label={`${destination.name}へタクシーを呼ぶ。2秒長押しで確定`}
        aria-live="assertive"
        disabled={disabled}
      >
        {/* 背景の進捗ゲージ (不透明度18%のネイビーがリニア伸長) */}
        <div
          className="dispatch-progress-gauge"
          style={{
            width: `${progress}%`,
            transition: isPressing ? 'none' : 'width 0.2s ease-out',
          }}
        />

        <div className="dispatch-content">
          <div className="dispatch-icon-wrap">
            <Car size={26} strokeWidth={2.4} />
          </div>
          <div className="dispatch-text-wrap">
            <span className="dispatch-primary-text">タクシーを呼ぶ</span>
            <span className="dispatch-sub-text">
              {isPressing ? 'そのまま長押ししてください…' : '2秒長押しで呼べます'}
            </span>
          </div>
        </div>

        {/* ゲージ数値インジケーター */}
        {isPressing && (
          <div className="dispatch-percent-bubble">
            {Math.round(progress)}%
          </div>
        )}
      </button>

      <style>{`
        .dispatch-btn-container {
          position: relative;
          width: 100%;
        }

        .dispatch-long-press-button {
          position: relative;
          width: 100%;
          min-height: 70px;
          background-color: var(--accent-blue-bg);
          border: 2px solid var(--accent-blue-border);
          border-radius: var(--radius-button);
          color: var(--navy-action);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.2s ease;
          box-shadow: 0 2px 6px rgba(22, 50, 79, 0.05);
          cursor: pointer;
        }

        .dispatch-long-press-button:active,
        .dispatch-long-press-button.is-pressing {
          transform: scale(0.985);
          border-color: var(--navy-action);
          box-shadow: 0 4px 14px rgba(22, 50, 79, 0.12);
        }

        .dispatch-long-press-button.is-disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .dispatch-progress-gauge {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          background: linear-gradient(90deg, rgba(22, 50, 79, 0.18) 0%, rgba(58, 124, 165, 0.35) 100%);
          pointer-events: none;
          z-index: 1;
        }

        .dispatch-content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 18px;
          pointer-events: none;
        }

        .dispatch-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #ffffff;
          box-shadow: 0 2px 6px rgba(22, 50, 79, 0.08);
          color: var(--navy-action);
        }

        .dispatch-text-wrap {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .dispatch-primary-text {
          font-size: 22px;
          font-weight: 800;
          line-height: 1.25;
          color: var(--navy-action);
          letter-spacing: -0.01em;
        }

        .dispatch-sub-text {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-secondary);
          margin-top: 3px;
        }

        .dispatch-percent-bubble {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 3;
          background: var(--navy-action);
          color: #ffffff;
          font-size: 13px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 999px;
          animation: popBubble 0.2s ease-out;
        }

        @keyframes popBubble {
          from { transform: translateY(-50%) scale(0.8); opacity: 0; }
          to { transform: translateY(-50%) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
