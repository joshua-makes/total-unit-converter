import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'QuickUnitSwap — convert and calculate with 150+ units across 15 categories';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function TwitterImage() {
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
              display: 'flex',
            }}
          >
            QuickUnitSwap
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#94a3b8',
              fontWeight: 400,
              marginTop: 16,
              display: 'flex',
            }}
          >
            150+ units · 15 categories · Free &amp; instant
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
