// components/DrawAnimation.js
import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

// Animations
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const numberChange = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  10% {
    transform: translateY(-100%);
  }
  20% {
    transform: translateY(-200%);
  }
  30% {
    transform: translateY(-300%);
  }
  40% {
    transform: translateY(-400%);
  }
  50% {
    transform: translateY(-500%);
  }
  60% {
    transform: translateY(-600%);
  }
  70% {
    transform: translateY(-700%);
  }
  80% {
    transform: translateY(-800%);
  }
  90% {
    transform: translateY(-900%);
  }
`;

// Styled Components
const AnimationContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 300px;
  margin: 0 auto;
  background-color: ${props => props.theme.colors.gray100};
  border-radius: ${props => props.theme.radii.lg};
  box-shadow: ${props => props.theme.shadows.md};
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SpinningCircle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 8px solid ${props => props.theme.colors.bridgetunesBlue};
  border-top-color: ${props => props.theme.colors.mtnYellow};
  
  /* Only animate when stage is 'drawing' */
  animation: ${props => props.isSpinning ? css`${spin} 3s linear ${props.animationIterations || 'infinite'}` : 'none'};
  
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerCircle = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${props => props.theme.shadows.sm};
`;

const NumberContainer = styled.div`
  font-size: 3rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.bridgetunesDark};
  display: flex;
  overflow: hidden;
`;

const NumberColumn = styled.div`
  height: 4.5rem;
  overflow: hidden;
`;

const NumberScroller = styled.div`
  /* Only animate when stage is 'drawing' */
  animation: ${props => props.isSpinning ? css`${numberChange} 0.5s ${props.animationIterations || 'infinite'}` : 'none'};
  animation-timing-function: steps(1);
`;

const NumberDigit = styled.div`
  height: 4.5rem;
  line-height: 4.5rem;
`;

const WinnerDisplay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const WinnerTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.bridgetunesBlue};
  margin-bottom: 1rem;
`;

const WinnerNumber = styled.div`
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.mtnYellow};
  margin-bottom: 1rem;
`;

const PrizeAmount = styled.div`
  font-size: ${props => props.theme.fontSizes['xl']};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.bridgetunesDark};
`;

const IdleMessage = styled.div`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.gray600};
  text-align: center;
`;

const DrawAnimation = ({ stage, winningNumber, prizeAmount }) => {
  const [displayWinner, setDisplayWinner] = useState(false);
  const [animationIterations, setAnimationIterations] = useState('infinite');
  
  useEffect(() => {
    if (stage === 'complete' && winningNumber) {
      // Set animation to run only 3 times before stopping
      setAnimationIterations('3');
      
      // Show winner after animation completes
      const timer = setTimeout(() => {
        setDisplayWinner(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    } else if (stage === 'idle') {
      setDisplayWinner(false);
    }
  }, [stage, winningNumber]);
  
  // Generate random digits for animation
  const renderNumberScroller = () => {
    return (
      <NumberScroller isSpinning={stage === 'drawing'} animationIterations={animationIterations}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(digit => (
          <NumberDigit key={digit}>{digit}</NumberDigit>
        ))}
      </NumberScroller>
    );
  };
  
  // Render idle state
  if (stage === 'idle') {
    return (
      <AnimationContainer>
        <IdleMessage>
          Select a date and ending digits, then click "Execute Draw" to start
        </IdleMessage>
      </AnimationContainer>
    );
  }
  
  return (
    <AnimationContainer>
      {!displayWinner ? (
        <SpinningCircle isSpinning={stage === 'drawing'} animationIterations={animationIterations}>
          <InnerCircle>
            <NumberContainer>
              <NumberColumn>{renderNumberScroller()}</NumberColumn>
              <NumberColumn>{renderNumberScroller()}</NumberColumn>
              <NumberColumn>{renderNumberScroller()}</NumberColumn>
              <NumberColumn>{renderNumberScroller()}</NumberColumn>
            </NumberContainer>
          </InnerCircle>
        </SpinningCircle>
      ) : (
        <WinnerDisplay>
          <WinnerTitle>Winner!</WinnerTitle>
          <WinnerNumber>{winningNumber}</WinnerNumber>
          <PrizeAmount>Prize: ₦{prizeAmount ? prizeAmount.toLocaleString() : '0'}</PrizeAmount>
        </WinnerDisplay>
      )}
    </AnimationContainer>
  );
};

export default DrawAnimation;


