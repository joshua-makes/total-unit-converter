import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleTouchIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: 'linear-gradient(135deg, #6366f1 0%, #3730a3 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Top arrow line */}
        <div
          style={{
            position: 'absolute',
            top: 54,
            left: 30,
            width: 90,
            height: 14,
            background: 'white',
            borderRadius: 7,
            display: 'flex',
          }}
        />
        {/* Top arrowhead */}
        <div
          style={{
            position: 'absolute',
            top: 35,
            left: 106,
            width: 36,
            height: 36,
            borderTop: '14px solid white',
            borderRight: '14px solid white',
            transform: 'rotate(45deg)',
            display: 'flex',
          }}
        />
        {/* Bottom arrow line */}
        <div
          style={{
            position: 'absolute',
            bottom: 54,
            right: 30,
            width: 90,
            height: 14,
            background: 'white',
            borderRadius: 7,
            display: 'flex',
          }}
        />
        {/* Bottom arrowhead */}
        <div
          style={{
            position: 'absolute',
            bottom: 35,
            right: 106,
            width: 36,
            height: 36,
            borderBottom: '14px solid white',
            borderLeft: '14px solid white',
            transform: 'rotate(45deg)',
            display: 'flex',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
