import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'QuickUnitSwap — convert and calculate with 150+ units across 15 categories';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0f1c 0%, #1e1b4b 50%, #0a0f1c 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* Grid dots background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(99,102,241,0.15) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            display: 'flex',
          }}
        />

        {/* Glow orb */}
        <div
          style={{
            position: 'absolute',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
          }}
        />

        {/* Logo badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 80,
            height: 80,
            borderRadius: 20,
            background: '#6366f1',
            fontSize: 40,
            marginBottom: 32,
            boxShadow: '0 0 60px rgba(99,102,241,0.6)',
          }}
        >
          ⚡
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: '#f8fafc',
              letterSpacing: '-2px',
              lineHeight: 1,
              textAlign: 'center',
            }}
          >
            Total
            <span style={{ color: '#818cf8' }}>Unit</span>
            Converter
          </div>

          <div
            style={{
              fontSize: 28,
              color: '#94a3b8',
              fontWeight: 400,
              marginTop: 16,
              textAlign: 'center',
            }}
          >
            150+ units · 15 categories · Free &amp; instant
          </div>
        </div>

        {/* Category pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
            justifyContent: 'center',
            marginTop: 40,
            maxWidth: 900,
          }}
        >
          {[
            '📏 Length', '⬛ Area', '🧪 Volume', '⚖️ Weight', '🌡️ Temperature',
            '⚡ Energy', ' Data', '⛽ Fuel', '⏱️ Time',
          ].map((label) => (
            <div
              key={label}
              style={{
                background: 'rgba(99,102,241,0.15)',
                border: '1px solid rgba(99,102,241,0.3)',
                borderRadius: 9999,
                padding: '6px 16px',
                fontSize: 20,
                color: '#c7d2fe',
                fontWeight: 500,
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* URL badge */}
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            fontSize: 18,
            color: '#64748b',
            letterSpacing: '0.05em',
          }}
        >
          quickunitswap.com
        </div>
      </div>
    ),
    { ...size }
  );
}
