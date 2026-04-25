import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 7,
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
            top: 9,
            left: 5,
            width: 17,
            height: 3,
            background: 'white',
            borderRadius: 2,
            display: 'flex',
          }}
        />
        {/* Top arrowhead */}
        <div
          style={{
            position: 'absolute',
            top: 5,
            left: 18,
            width: 7,
            height: 7,
            borderTop: '3px solid white',
            borderRight: '3px solid white',
            transform: 'rotate(45deg)',
            display: 'flex',
          }}
        />
        {/* Bottom arrow line */}
        <div
          style={{
            position: 'absolute',
            bottom: 9,
            right: 5,
            width: 17,
            height: 3,
            background: 'white',
            borderRadius: 2,
            display: 'flex',
          }}
        />
        {/* Bottom arrowhead */}
        <div
          style={{
            position: 'absolute',
            bottom: 5,
            right: 18,
            width: 7,
            height: 7,
            borderBottom: '3px solid white',
            borderLeft: '3px solid white',
            transform: 'rotate(45deg)',
            display: 'flex',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
