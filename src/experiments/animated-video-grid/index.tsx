import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import './style.css';

interface GridItem {
  id: number;
  size: 'wide' | 'tall' | '';
}

const ITEM_COUNT = 16;

function AnimatedVideoGrid() {
  const [items, setItems] = useState<GridItem[]>(
    Array.from({ length: ITEM_COUNT }, (_, i) => ({ id: i + 1, size: '' }))
  );
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());
  const streamRef = useRef<MediaStream | null>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      streamRef.current = stream;
      videoRefs.current.forEach((video) => {
        video.srcObject = stream;
        video.play();
      });
    });
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const setVideoRef = (id: number) => (el: HTMLVideoElement | null) => {
    if (el) {
      videoRefs.current.set(id, el);
      if (streamRef.current) {
        el.srcObject = streamRef.current;
        el.play();
      }
    } else {
      videoRefs.current.delete(id);
    }
  };

  const withViewTransition = (update: () => void) => {
    if ('startViewTransition' in document) {
      (document as Document & { startViewTransition: (cb: () => void) => void }).startViewTransition(
        () => { flushSync(update); }
      );
    } else {
      update();
    }
  };

  const handleRandomize = () => {
    withViewTransition(() => {
      setItems((prev) =>
        [...prev]
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }, index) => ({
            ...value,
            size: (index % 3 === 0 ? 'wide' : index % 3 === 1 ? 'tall' : '') as GridItem['size'],
          }))
      );
    });
  };

  const handleToggleVideo = () => {
    if (playing) {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      videoRefs.current.forEach((video) => {
        video.srcObject = null;
      });
    } else {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        streamRef.current = stream;
        videoRefs.current.forEach((video) => {
          video.srcObject = stream;
          video.play();
        });
      });
    }
    setPlaying((prev) => !prev);
  };

  const handleOrder = () => {
    withViewTransition(() => {
      setItems((prev) =>
        [...prev].sort((a, b) => a.id - b.id).map((item) => ({ ...item, size: '' as const }))
      );
    });
  };

  return (
    <div className="stage">
      <div className="controls">
        <button className="randomize" onClick={handleRandomize}>Randomize</button>
        <button className="order" onClick={handleOrder}>Order</button>
        <button onClick={handleToggleVideo}>{playing ? 'Stop' : 'Play'}</button>
      </div>
      <div className="grid">
        {items.map((item) => {
          const col = (item.id - 1) % 4;
          const row = Math.floor((item.id - 1) / 4);
          return (
            <div
              key={item.id}
              className={`item item${item.id}`}
              data-item={item.id}
              data-size={item.size || undefined}
              style={{
                viewTransitionName: `item${item.id}`,
                '--x': `${-col * 25}%`,
                '--y': `${-row * 25}%`,
              } as React.CSSProperties}
            >
              <video
                ref={setVideoRef(item.id)}
                className="output"
                autoPlay
                muted
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AnimatedVideoGrid;
