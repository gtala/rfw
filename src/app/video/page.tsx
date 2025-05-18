'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function VideoContent() {
  const params = useSearchParams();
  const src = params.get('src');
  if (!src) return <div style={{color:'#fff',background:'#000',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>No video</div>;
  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'auto',
    }}>
      <video
        src={src}
        controls
        playsInline
        muted
        style={{
          maxWidth: '100vw',
          maxHeight: '100vh',
          width: 'auto',
          height: 'auto',
          background: '#000',
          display: 'block',
        }}
      />
    </div>
  );
}

export default function VideoPage() {
  return (
    <Suspense fallback={<div style={{color:'#fff',background:'#000',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Cargando…</div>}>
      <VideoContent />
    </Suspense>
  );
} 