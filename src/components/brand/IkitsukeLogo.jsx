import React from 'react';

/**
 * イキツケ公式ブランドロゴコンポーネント（暖簾ピクトグラム版）
 * 
 * コンセプト:
 * - ダークネイビーの暖簾を少しめくり、中を覗き込む温かいイエローのピクトグラム
 * - 余計な背景や顔のパーツを排した、極めてミニマルな2色フラットデザイン
 * 
 * @param {'horizontal' | 'vertical' | 'symbol' | 'icon'} variant
 * @param {'primary' | 'white'} theme
 * @param {number | string} height
 * @param {boolean} showTagline
 */
export const IkitsukeLogo = ({
  variant = 'horizontal',
  theme = 'primary',
  height = 36,
  showTagline = false,
  className = '',
  ...props
}) => {
  const isWhite = theme === 'white';
  const navyColor = isWhite ? '#FFFFFF' : '#14243B';
  const yellowColor = '#F5BA42';
  const titleColor = isWhite ? '#FFFFFF' : '#14243B';
  const subColor = '#E6A21E';
  const taglineColor = isWhite ? '#94A3B8' : '#64748B';

  // 角丸正方形アプリアイコン
  const renderIcon = (h) => (
    <svg
      viewBox="0 0 100 100"
      height={h}
      style={{ height: h, width: 'auto', display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
      aria-label="イキツケ アプリアイコン"
      {...props}
    >
      <rect width="100" height="100" rx="22" fill="#14243B" />
      <rect x="18" y="18" width="64" height="4" rx="2" fill={yellowColor} />
      <rect x="52" y="23" width="26" height="46" rx="2" fill="#1E375A" stroke={yellowColor} strokeWidth="2.2" />
      <path
        d="M22 23 L 48 23 L 48 38 C 48 38, 42 46, 33 58 C 29 53, 25 44, 22 35 Z"
        fill="#1E375A"
        stroke={yellowColor}
        strokeWidth="2.2"
      />
      <circle cx="58" cy="46" r="10" fill={yellowColor} />
      <path
        d="M36 60 C 39 53, 44 55, 48 60 L 55 68 C 60 65, 66 65, 72 69 C 76 71, 78 75, 78 82 L 47 82 C 47 76, 43 72, 40 70 Z"
        fill={yellowColor}
      />
    </svg>
  );

  if (variant === 'icon' || variant === 'symbol') {
    return renderIcon(height);
  }

  // デフォルト: horizontal (横組み)
  return (
    <div
      className={`ikitsuke-logo-wrap ${className}`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}
      {...props}
    >
      {renderIcon(height)}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {showTagline && (
          <span
            style={{
              fontSize: '10px',
              fontWeight: 600,
              color: taglineColor,
              letterSpacing: '0.04em',
              marginBottom: '-2px',
              fontFamily: "'LINE Seed JP', sans-serif"
            }}
          >
            高齢者の自立と外出支援
          </span>
        )}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '7px' }}>
          <span
            style={{
              fontSize: typeof height === 'number' ? `${Math.round(height * 0.68)}px` : '24px',
              fontWeight: 800,
              color: titleColor,
              letterSpacing: '0.06em',
              lineHeight: 1.1,
              fontFamily: "'LINE Seed JP', 'Hiragino Kaku Gothic ProN', sans-serif"
            }}
          >
            イキツケ
          </span>
          <span
            style={{
              fontSize: typeof height === 'number' ? `${Math.round(height * 0.3)}px` : '11px',
              fontWeight: 800,
              color: subColor,
              letterSpacing: '0.24em',
              fontFamily: "'Montserrat', 'Inter', sans-serif"
            }}
          >
            IKITSUKE
          </span>
        </div>
      </div>
    </div>
  );
};
