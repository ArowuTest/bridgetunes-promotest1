import React, { useState, useEffect, useRef } from 'react';

const DrawAnimation = ({ onComplete, prizeCategory, isVisible }) => {
  const [animationState, setAnimationState] = useState('idle'); // idle, spinning, slowing, complete
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [displayNumbers, setDisplayNumbers] = useState([]);
  const animationRef = useRef(null);
  const spinningSpeed = useRef(50); // ms between number changes
  const spinningDuration = 3000; // total spinning time in ms
  const slowingDuration = 2000; // time to slow down in ms
  
  // Generate a pool of random numbers for the animation
  useEffect(() => {
    if (isVisible && animationState === 'idle') {
      // Start with a pool of random numbers
      const numbers = Array.from({ length: 100 }, () => 
        Math.floor(Math.random() * 10000000).toString().padStart(8, '0')
      );
      setDisplayNumbers(numbers);
      setAnimationState('spinning');
      
      // Schedule the slowing down phase
      setTimeout(() => {
        setAnimationState('slowing');
      }, spinningDuration);
    }
  }, [isVisible, animationState]);
  
  // Handle the animation states
  useEffect(() => {
    let interval;
    
    if (animationState === 'spinning') {
      // Fast spinning phase
      interval = setInterval(() => {
        setDisplayNumbers(prev => {
          const newNumbers = [...prev];
          newNumbers.unshift(newNumbers.pop());
          return newNumbers;
        });
      }, spinningSpeed.current);
    } 
    else if (animationState === 'slowing') {
      // Gradually slow down
      let elapsed = 0;
      const slowingInterval = 50; // ms
      
      interval = setInterval(() => {
        elapsed += slowingInterval;
        const progress = Math.min(elapsed / slowingDuration, 1);
        const newSpeed = spinningSpeed.current + (progress * 200); // Gradually increase delay
        
        clearInterval(interval);
        
        if (progress >= 1) {
          // Animation complete
          const winningNumber = displayNumbers[0];
          setSelectedNumber(winningNumber);
          setAnimationState('complete');
          
          // Notify parent component
          setTimeout(() => {
            onComplete(winningNumber);
          }, 1000);
        } else {
          // Continue slowing down
          interval = setInterval(() => {
            setDisplayNumbers(prev => {
              const newNumbers = [...prev];
              newNumbers.unshift(newNumbers.pop());
              return newNumbers;
            });
          }, newSpeed);
        }
      }, slowingInterval);
    }
    
    return () => clearInterval(interval);
  }, [animationState, onComplete]);
  
  // Different styles based on prize category
  const getBallColor = () => {
    switch(prizeCategory) {
      case 'jackpot':
        return 'bg-gradient-to-br from-yellow-300 to-yellow-600 border-yellow-400';
      case 'second':
        return 'bg-gradient-to-br from-gray-300 to-gray-500 border-gray-400';
      case 'third':
        return 'bg-gradient-to-br from-amber-600 to-amber-800 border-amber-700';
      default:
        return 'bg-gradient-to-br from-blue-300 to-blue-500 border-blue-400';
    }
  };
  
  const getSize = () => {
    switch(prizeCategory) {
      case 'jackpot':
        return 'w-64 h-64 text-3xl';
      case 'second':
        return 'w-56 h-56 text-2xl';
      case 'third':
        return 'w-48 h-48 text-xl';
      default:
        return 'w-40 h-40 text-lg';
    }
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`relative ${getSize()} rounded-full ${getBallColor()} border-8 flex items-center justify-center shadow-lg animate-spin-slow overflow-hidden`}>
        <div className="absolute inset-0 rounded-full bg-black bg-opacity-10"></div>
        <div className="z-10 font-mono font-bold text-black">
          {displayNumbers[0]}
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <h3 className="text-xl font-bold mb-2">
          {prizeCategory === 'jackpot' ? 'Grand Prize Winner' : 
           prizeCategory === 'second' ? 'Second Prize Winner' :
           prizeCategory === 'third' ? 'Third Prize Winner' : 'Consolation Prize Winner'}
        </h3>
        <p className="text-gray-600">
          {animationState === 'spinning' && 'Selecting winner...'}
          {animationState === 'slowing' && 'Finalizing selection...'}
          {animationState === 'complete' && 'Winner selected!'}
        </p>
      </div>
    </div>
  );
};

export default DrawAnimation;
