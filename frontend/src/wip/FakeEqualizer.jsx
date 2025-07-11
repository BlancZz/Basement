import React, { useEffect, useState } from 'react';

export default function FakeEqualizer({
  colors = ['#D8A7B1', '#A3B18A', '#7A9E9F'],
  mode = 1,
  brightness = 0,
}) {
  const [heights, setHeights] = useState(Array(30).fill(16));

  useEffect(() => {
    if (mode !== 1) return;

    const interval = setInterval(() => {
      const newHeights = Array.from(
        { length: 40 },
        () => 8 + Math.floor(Math.random() * 40)
      );
      setHeights(newHeights);
    }, 300);

    return () => clearInterval(interval);
  }, [mode]);

  function adjustColorBrightness(hex, amount) {
    let usePound = false;

    if (hex[0] === '#') {
      hex = hex.slice(1);
      usePound = true;
    }

    let num = parseInt(hex, 16);

    let r = (num >> 16) + amount;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    let g = ((num >> 8) & 0x00ff) + amount;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    let b = (num & 0x0000ff) + amount;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    return (
      (usePound ? '#' : '') +
      ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')
    );
  }

  colors = colors.map((c) => adjustColorBrightness(c, brightness));

  const delays = React.useMemo(
    () => [...Array(40)].map(() => (Math.random() * 1.2).toFixed(2) + 's'),
    []
  );

  // === Mode 1: Random Height Bars ===
  if (mode === 1) {
    return (
      <div className="w-full flex justify-center mt-8 transform rotate-180 overflow-hidden">
        <div className="flex flex-wrap justify-center gap-1">
          {heights.map((h, i) => (
            <div
              key={i}
              className="w-2 rounded-full transition-all duration-300"
              style={{
                height: `${h}px`,
                backgroundColor: colors[i % colors.length],
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // === Mode 2: Wave Animation ===
  if (mode === 2) {
    return (
      <div className="w-full flex justify-center mt-8 transform rotate-180 overflow-hidden">
        <div className="flex flex-wrap justify-center gap-1">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full animate-equalizer"
              style={{
                animationDelay: `${i * 0.05}s`,
                backgroundColor: colors[i % colors.length],
              }}
            />
          ))}
        </div>

        <style jsx>{`
          @keyframes equalizer {
            0%,
            100% {
              height: 8px;
              opacity: 0.6;
            }
            50% {
              height: 32px;
              opacity: 1;
            }
          }
          .animate-equalizer {
            animation: equalizer 1s ease-in-out infinite;
            transform-origin: bottom;
          }
        `}</style>
      </div>
    );
  }

  // === Mode 3: Ripple Animation ===
  if (mode === 3) {
    const totalBars = 40;
    const center = Math.floor(totalBars / 2);

    return (
      <div className="w-full flex justify-center mt-8 transform rotate-180 overflow-hidden">
        <div className="flex flex-wrap justify-center gap-1">
          {Array.from({ length: totalBars }).map((_, i) => {
            const distance = Math.abs(i - center);
            return (
              <div
                key={i}
                className="w-2 h-2 rounded-full animate-ripple"
                style={{
                  animationDelay: `${distance * 0.07}s`,
                  backgroundColor: colors[i % colors.length],
                }}
              />
            );
          })}
        </div>

        <style jsx>{`
          @keyframes ripple {
            0%,
            100% {
              height: 10px;
              opacity: 0.6;
            }
            50% {
              height: 36px;
              opacity: 1;
            }
          }
          .animate-ripple {
            animation: ripple 1s ease-in-out infinite;
            transform-origin: bottom;
          }
        `}</style>
      </div>
    );
  }

  if (mode === 4) {
    return (
      <div className="w-full flex justify-center mt-8 transform rotate-180 overflow-hidden">
        <div className="flex flex-wrap justify-center gap-1">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full animate-pulse-bars"
              style={{
                backgroundColor: colors[i % colors.length],
              }}
            />
          ))}
        </div>

        <style jsx>{`
          @keyframes pulse-bars {
            0%,
            100% {
              height: 10px;
              opacity: 0.5;
            }
            50% {
              height: 36px;
              opacity: 1;
            }
          }
          .animate-pulse-bars {
            animation: pulse-bars 1.2s ease-in-out infinite;
            transform-origin: bottom;
          }
        `}</style>
      </div>
    );
  }

  if (mode === 5) {
    return (
      <div className="w-full flex justify-center mt-8 transform rotate-180 overflow-hidden">
        <div className="flex flex-wrap justify-center gap-1">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full animate-stagger"
              style={{
                animationDelay: `${(i % 10) * 0.1}s`,
                backgroundColor: colors[i % colors.length],
              }}
            />
          ))}
        </div>

        <style jsx>{`
          @keyframes stagger {
            0%,
            100% {
              height: 10px;
              opacity: 0.5;
            }
            40% {
              height: 28px;
              opacity: 1;
            }
            70% {
              height: 14px;
              opacity: 0.8;
            }
          }
          .animate-stagger {
            animation: stagger 1.5s ease-in-out infinite;
            transform-origin: bottom;
          }
        `}</style>
      </div>
    );
  }

  if (mode === 6) {
    return (
      <div className="w-full flex justify-center mt-8 transform rotate-180 overflow-hidden">
        <div className="flex flex-wrap justify-center gap-1">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full animate-wave-ping"
              style={{
                animationDelay: `${i * 0.03}s`,
                animationDuration: `1.5s`,
                backgroundColor: colors[i % colors.length],
              }}
            ></div>
          ))}
        </div>

        <style jsx>{`
          @keyframes wavePing {
            0%,
            100% {
              height: 6px;
              opacity: 0.4;
            }
            25% {
              height: 12px;
              opacity: 0.7;
            }
            50% {
              height: 28px;
              opacity: 1;
            }
            75% {
              height: 12px;
              opacity: 0.7;
            }
          }
          .animate-wave-ping {
            animation: wavePing ease-in-out infinite;
            transform-origin: bottom;
          }
        `}</style>
      </div>
    );
  }

  if (mode === 7) {
    return (
      <div className="w-full flex justify-center mt-8 transform rotate-180 overflow-hidden">
        <div className="flex justify-center gap-1">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="w-2 rounded-full animate-expandCenter"
              style={{
                backgroundColor: colors[i % colors.length],
                animationDelay: delays[i],
              }}
            />
          ))}
        </div>

        <style jsx>{`
          @keyframes expandCenter {
            0%,
            100% {
              height: 16px;
              margin-top: 8px;
            }
            50% {
              height: 48px;
              margin-top: 0px;
            }
          }
          .animate-expandCenter {
            animation: expandCenter 1.2s ease-in-out infinite;
            transform-origin: center;
          }
        `}</style>
      </div>
    );
  }

  if (mode === 8) {
    return (
      <div className="w-full flex justify-center mt-8 transform rotate-180 overflow-hidden">
        <div className="flex justify-center gap-2">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="w-3 rounded-full animate-heartbeat"
              style={{
                animationDelay: `${(i % 5) * 0.1}s`,
                backgroundColor: colors[i % colors.length],
              }}
            />
          ))}
        </div>

        <style jsx>{`
          @keyframes heartbeat {
            0%,
            100% {
              height: 12px;
              opacity: 0.7;
              margin-top: 10px;
            }
            14%,
            28% {
              height: 40px;
              opacity: 1;
              margin-top: 0;
            }
            42% {
              height: 24px;
              margin-top: 6px;
            }
          }
          .animate-heartbeat {
            animation: heartbeat 1.4s ease-in-out infinite;
            transform-origin: bottom;
            transition: background-color 0.3s ease;
          }
        `}</style>
      </div>
    );
  }

  if (mode === 9) {
    return (
      <div className="w-full flex justify-center mt-8 overflow-hidden">
        <div className="flex justify-center gap-1">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="w-2 rounded-sm animate-anger-bar"
              style={{
                animationDelay: `${(i % 5) * 0.1}s`,
                backgroundColor: colors[i % colors.length],
              }}
            />
          ))}
        </div>

        <style jsx>{`
          @keyframes anger-bar {
            0%,
            100% {
              height: 12px;
              opacity: 0.8;
              transform: translateX(0) skew(0deg);
            }
            25% {
              height: 40px;
              opacity: 1;
              transform: translateX(-3px) skew(-30deg);
            }
            50% {
              height: 20px;
              opacity: 0.9;
              transform: translateX(3px) skew(30deg);
            }
            75% {
              height: 38px;
              opacity: 1;
              transform: translateX(-2px) skew(-10deg);
            }
          }
          .animate-anger-bar {
            animation: anger-bar 1s ease-in-out infinite;
            transform-origin: bottom;
          }
        `}</style>
      </div>
    );
  }
  if (mode === 10) {
    return (
      <div className="w-full flex justify-center mt-8 overflow-hidden">
        <div className="flex justify-center gap-1">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="w-2 rounded-sm animate-chaos-bar"
              style={{
                animationDelay: `${(i % 7) * 0.13}s`,
                animationDuration: `${1 + (i % 5) * 0.1}s`,
                backgroundColor: colors[i % colors.length],
              }}
            />
          ))}
        </div>

        <style jsx>{`
          @keyframes chaos-bar {
            0%,
            100% {
              height: 14px;
              opacity: 0.7;
              transform: translateX(0) scaleY(1);
            }
            20% {
              height: 48px;
              transform: translateX(-2px) scaleY(1.2);
              opacity: 1;
            }
            40% {
              height: 22px;
              transform: translateX(3px) scaleY(0.9);
            }
            60% {
              height: 36px;
              transform: translateX(-4px) scaleY(1.3);
            }
            80% {
              height: 18px;
              transform: translateX(2px) scaleY(0.8);
              opacity: 0.9;
            }
          }

          .animate-chaos-bar {
            animation: chaos-bar infinite ease-in-out;
            transform-origin: bottom;
          }
        `}</style>
      </div>
    );
  }

  if (mode === 11) {
    return (
      <div className="w-full flex justify-center overflow-hidden">
        <div className="relative w-[300px] h-[300px]">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-8 rounded-sm origin-center animate-orbit"
              style={{
                top: '50%',
                left: '50%',
                marginTop: '-4px',
                marginLeft: '-1px',
                transform: `rotate(${(360 / 20) * i}deg) translateX(120px)`,
                animationDelay: `${i * 0.1}s`,
                backgroundColor: colors[i % colors.length],
              }}
            />
          ))}
          <style jsx>{`
            @keyframes orbit {
              0% {
                transform: rotate(0deg) translateX(120px) rotate(0deg);
              }
              100% {
                transform: rotate(360deg) translateX(120px) rotate(-360deg);
              }
            }
            .animate-orbit {
              animation: orbit 6s linear infinite;
            }
          `}</style>
        </div>
      </div>
    );
  }

  if (mode === 12) {
    return (
      <div className="w-full flex justify-center mt-8 overflow-hidden">
        <div className="flex justify-center gap-2">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full animate-bubble"
              style={{
                backgroundColor: colors[i % colors.length],
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>

        <style jsx>{`
          @keyframes bubble {
            0% {
              transform: translateY(0);
              opacity: 0.5;
            }
            50% {
              transform: translateY(-20px);
              opacity: 1;
            }
            100% {
              transform: translateY(0);
              opacity: 0.5;
            }
          }

          .animate-bubble {
            animation: bubble 2s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  if (mode === 13) {
    return (
      <div className="w-full flex justify-center mt-8 overflow-hidden">
        <div className="flex justify-center gap-[2px]">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="w-[3px] rounded-sm animate-blast"
              style={{
                backgroundColor: colors[i % colors.length],
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>

        <style jsx>{`
          @keyframes blast {
            0% {
              height: 8px;
              opacity: 0.2;
            }
            25% {
              height: 52px;
              opacity: 1;
            }
            50% {
              height: 24px;
              opacity: 0.6;
            }
            75% {
              height: 48px;
              opacity: 0.9;
            }
            100% {
              height: 12px;
              opacity: 0.4;
            }
          }

          .animate-blast {
            animation: blast 0.6s ease-in-out infinite;
            transform-origin: bottom;
          }
        `}</style>
      </div>
    );
  }

  return null;
}
