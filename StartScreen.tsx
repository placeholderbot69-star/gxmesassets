import { useState, useEffect, useRef } from 'react';

interface StartScreenProps {
  onEnter: () => void;
}

export default function StartScreen({ onEnter }: StartScreenProps) {
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      if (startTimeRef.current !== null) {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTimeRef.current;
        // Calculate progress (100% = 1000ms)
        const progress = Math.min((elapsedTime / 1000) * 100, 100);
        setHoldProgress(progress);
        
        if (progress >= 100) {
          setIsRevealed(true);
          // Cancel any pending animation frames
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }
          // Wait 500ms before transitioning
          setTimeout(() => {
            onEnter();
          }, 500);
        } else {
          // Continue animation loop
          animationFrameRef.current = requestAnimationFrame(updateProgress);
        }
      }
    };

    if (isHolding && !isRevealed) {
      startTimeRef.current = Date.now();
      animationFrameRef.current = requestAnimationFrame(updateProgress);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHolding, isRevealed, onEnter]);

  const handleMouseDown = () => {
    if (!isRevealed) {
      setIsHolding(true);
    }
  };

  const handleMouseUp = () => {
    setIsHolding(false);
    if (!isRevealed) {
      setHoldProgress(0);
    }
  };

  const handleMouseLeave = () => {
    setIsHolding(false);
    if (!isRevealed) {
      setHoldProgress(0);
    }
  };

  // Touch support
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent scrolling
    if (!isRevealed) {
      setIsHolding(true);
    }
  };

  const handleTouchEnd = () => {
    setIsHolding(false);
    if (!isRevealed) {
      setHoldProgress(0);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white overflow-hidden cursor-pointer"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-50" />
      
      {/* Animated particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-red-500/20"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 10 + 5}s infinite linear`,
              animationDelay: Math.random() * 5 + 's'
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.5; }
          100% { transform: translateY(0) translateX(0); opacity: 0.2; }
        }
      `}</style>

      <div className="relative z-10 flex flex-col items-center space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white drop-shadow-lg">
            AMONGUS
          </h1>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white drop-shadow-lg">
            GXMES
          </h2>
          <div className="text-xl md:text-2xl font-medium text-gray-300 mt-4">
            HOLD TO ENTER
          </div>
        </div>

        <div className="w-64 md:w-96 space-y-4">
          <div className="h-4 bg-gray-800 rounded-full overflow-hidden relative shadow-inner">
            <div 
              className={`h-full transition-all duration-75 ease-linear ${
                isRevealed ? 'bg-green-500' : 'bg-red-600'
              }`}
              style={{ width: `${holdProgress}%` }}
            >
              {isHolding && !isRevealed && (
                <div className="w-full h-full animate-pulse bg-red-500/30" />
              )}
            </div>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
              {isRevealed ? 'ACCESS GRANTED' : `${Math.round(holdProgress)}%`}
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-500">
            {isHolding && !isRevealed && 'Authentication in progress...'}
            {!isHolding && !isRevealed && 'Press and hold to authenticate'}
            {isRevealed && 'Authentication successful'}
          </div>
        </div>

        <div className="absolute bottom-8 text-center space-y-2">
          <div className="text-xs text-gray-600">AMONGUS GXMES v1.0.0</div>
          <div className="text-xs text-gray-700">SECURE PROXY NETWORK • 172.64.149.154:80</div>
        </div>

        {/* Visual feedback for holding */}
        {isHolding && !isRevealed && (
          <div className="absolute inset-0 bg-red-600/5 pointer-events-none animate-pulse" />
        )}
      </div>
    </div>
  );
}