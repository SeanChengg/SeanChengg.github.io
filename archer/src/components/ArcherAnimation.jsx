import { useEffect, useRef, useState } from 'react';
import { BASE } from '../config';

const VIDEO_SRC = `${BASE}images/archer/Archer_Html/patina_loop.mp4`;

/** Playback faster than encoded fps (no re-encode). */
const PLAYBACK_RATE = 1.5;

/** Shorter box = less vertical space; video uses cover + zoom to crop edges toward center (ring). */
const CROP_BOX_HEIGHT = 1020;
/** >1 zooms past cover for a tighter crop on the subject */
const CENTER_ZOOM = 1.12;

/** Smooth patina playback — single H.264/VP9 file instead of 300 canvas blits (no flicker). */
export default function ArcherAnimation() {
  const videoRef = useRef(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const syncMotion = () => {
      v.playbackRate = mq.matches ? 1 : PLAYBACK_RATE;
      if (mq.matches) {
        v.pause();
        v.currentTime = 0;
      } else {
        const p = v.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      }
    };

    syncMotion();
    mq.addEventListener('change', syncMotion);
    return () => mq.removeEventListener('change', syncMotion);
  }, []);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 1289,
        marginTop: 56,
        position: 'relative',
        background: '#f3f3f3',
        borderRadius: 16,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: CROP_BOX_HEIGHT,
          overflow: 'hidden',
          background: '#f3f3f3',
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          controls={false}
          poster={`${BASE}images/archer/Hero_Image.png`}
          onError={() => setLoadError(true)}
          onLoadedData={(e) => {
            setLoadError(false);
            const el = e.currentTarget;
            try {
              el.playbackRate = window.matchMedia('(prefers-reduced-motion: reduce)').matches
                ? 1
                : PLAYBACK_RATE;
            } catch (_) {}
          }}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: '100%',
            height: '100%',
            transform: `translate(-50%, -50%) scale(${CENTER_ZOOM})`,
            objectFit: 'cover',
            objectPosition: 'center center',
            background: '#f3f3f3',
          }}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      </div>
      {loadError && (
        <p
          style={{
            margin: 0,
            padding: '14px 18px',
            fontSize: 15,
            fontFamily: 'system-ui, sans-serif',
            color: '#5c5c5c',
            background: '#ececec',
            borderTop: '1px solid #ddd',
          }}
        >
          No patina video yet — poster only. In{' '}
          <code style={{ fontSize: 13 }}>archer/images/archer/Archer_Html/</code> run{' '}
          <code style={{ fontSize: 13 }}>./encode-patina.sh</code> (keeps PNGs there; writes{' '}
          <code style={{ fontSize: 13 }}>patina_loop.mp4</code> next to them), then refresh.
        </p>
      )}
    </div>
  );
}
