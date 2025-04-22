import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Head from 'next/head';
import AnimatedHeader from '../components/AnimatedHeader';
import Footer from '../components/Footer';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const slideInLeft = keyframes`
  from { transform: translateX(-30px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const slideInRight = keyframes`
  from { transform: translateX(30px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const rotateY = keyframes`
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const spinDigit = keyframes`
  0% { transform: translateY(-400%); }
  100% { transform: translateY(400%); }
`;

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.mtnLight};
  background-image: linear-gradient(to bottom, #f8f9fa, #e9ecef);
  overflow-x: hidden;
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  animation: ${fadeIn} 0.8s ease-out;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  animation: ${slideUp} 0.8s ease-out;
`;

const HeaderDecoration = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, ${props => props.theme.colors.mtnYellow}, ${props => props.theme.colors.mtnYellow}80);
  border-radius: 50%;
  z-index: -1;
  opacity: 0.7;
  animation: ${pulse} 3s infinite ease-in-out;
`;

const PageTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.bridgetunesDark};
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  
  &:after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 6px;
    background: linear-gradient(to right, ${props => props.theme.colors.mtnYellow}, ${props => props.theme.colors.bridgetunesBlue});
    border-radius: 3px;
    animation: ${pulse} 2s infinite ease-in-out;
  }
`;

const PageDescription = styled.p`
  font-size: 1.4rem;
  color: ${props => props.theme.colors.gray600};
  max-width: 700px;
  margin: 2rem auto 0;
  line-height: 1.8;
  animation: ${fadeIn} 0.8s ease-out 0.3s forwards;
  opacity: 0;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 24px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
  padding: 2.5rem;
  margin-bottom: 2.5rem;
  border: 1px solid ${props => props.theme.colors.gray100};
  transition: all 0.5s ease;
  transform: translateY(20px);
  opacity: 0;
  animation: ${slideUp} 0.8s ease-out forwards;
  animation-delay: ${props => props.delay || '0s'};
  
  &:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
    transform: translateY(-10px) scale(1.01);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, transparent 0%, transparent 50%, rgba(255, 204, 0, 0.05) 50%, rgba(255, 204, 0, 0.05) 100%);
    z-index: -1;
    border-radius: 24px;
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const CardTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.bridgetunesDark};
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${props => props.theme.colors.gray200};
  display: flex;
  align-items: center;
  position: relative;
  
  svg {
    margin-right: 1rem;
    color: ${props => props.theme.colors.mtnYellow};
    transition: all 0.3s ease;
  }
  
  ${Card}:hover & svg {
    transform: scale(1.2) rotate(10deg);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 50px;
    height: 2px;
    background-color: ${props => props.theme.colors.mtnYellow};
    transition: width 0.5s ease;
  }
  
  ${Card}:hover &::after {
    width: 100%;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.gray700};
  margin-bottom: 0.75rem;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  
  ${FormGroup}:hover & {
    color: ${props => props.theme.colors.bridgetunesBlue};
    transform: translateX(5px);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid ${props => props.theme.colors.gray300};
  border-radius: 12px;
  font-size: 1.1rem;
  background-color: white;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23555' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E") ;
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.bridgetunesBlue};
    box-shadow: 0 0 0 4px rgba(0, 86, 179, 0.15);
    transform: scale(1.01);
  }
  
  ${FormGroup}:hover & {
    border-color: ${props => props.theme.colors.bridgetunesBlue};
  }
`;

const DateSelectionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
`;

const DigitSelectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const DigitCheckbox = styled.div`
  position: relative;
  transform: scale(0.9);
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: ${props => props.index * 0.05}s;
`;

const DigitInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  
  &:checked + label {
    background: linear-gradient(135deg, ${props => props.theme.colors.mtnYellow}, ${props => props.theme.colors.yellow600});
    color: ${props => props.theme.colors.mtnBlack};
    font-weight: ${props => props.theme.fontWeights.bold};
    border-color: ${props => props.theme.colors.mtnYellow};
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(255, 204, 0, 0.3);
  }
  
  &:focus + label {
    box-shadow: 0 0 0 4px rgba(255, 204, 0, 0.3);
  }
`;

const DigitLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  height: 56px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${props => props.recommended ? props.theme.colors.yellow50 : 'white'};
  border: 2px solid ${props => props.recommended ? props.theme.colors.yellow200 : props.theme.colors.gray300};
  
  ${props => props.recommended && `
    font-weight: ${props.theme.fontWeights.medium};
    color: ${props.theme.colors.yellow800};
    animation: ${pulse} 2s infinite;
  `}
  
  &:hover {
    background-color: ${props => props.recommended ? props.theme.colors.yellow100 : props.theme.colors.gray100};
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
`;

const AllDigitsButton = styled.button`
  grid-column: span 2;
  background: linear-gradient(to right, ${props => props.theme.colors.gray200}, ${props => props.theme.colors.gray300});
  color: ${props => props.theme.colors.gray800};
  border: none;
  border-radius: 12px;
  padding: 1rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(to right, ${props => props.theme.colors.gray300}, ${props => props.theme.colors.gray400});
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.1);
  }
`;

const PrizeStructureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 2rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const PrizeCard = styled.div`
  background-color: ${props => props.theme.colors.gray50};
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid ${props => props.theme.colors.gray200};
  transition: all 0.4s ease;
  transform: scale(0.95);
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-out forwards, ${slideUp} 0.8s ease-out forwards;
  animation-delay: ${props => props.delay || '0s'};
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.theme.colors.mtnYellow};
  }
`;

const PrizeCardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.bridgetunesDark};
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.gray200};
  position: relative;
  
  &::before {
    content: '🏆';
    margin-right: 10px;
    font-size: 1.2rem;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(to right, ${props => props.theme.colors.mtnYellow}, ${props => props.theme.colors.yellow300});
    border-radius: 3px;
    transition: width 0.3s ease;
  }
  
  ${PrizeCard}:hover &::after {
    width: 100%;
  }
`;

const PrizeList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const PrizeItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.gray100};
  transition: all 0.3s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    transform: translateX(10px);
    padding-left: 10px;
  }
`;

const PrizeName = styled.span`
  font-weight: ${props => props.theme.fontWeights.medium};
  position: relative;
  padding-left: 25px;
  
  &::before {
    content: '🎁';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    transition: all 0.3s ease;
  }
  
  ${PrizeItem}:hover &::before {
    transform: translateY(-50%) scale(1.2);
  }
`;

const PrizeValue = styled.span`
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.green600};
  transition: all 0.3s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${props => props.theme.colors.green600};
    transition: width 0.3s ease;
  }
  
  ${PrizeItem}:hover & {
    color: ${props => props.theme.colors.green500};
    transform: scale(1.1);
    
    &::after {
      width: 100%;
    }
  }
`;

const DrawDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 2rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const DetailItem = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid ${props => props.theme.colors.gray200};
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  transform: translateY(20px);
  opacity: 0;
  animation: ${slideUp} 0.5s ease-out forwards;
  animation-delay: ${props => props.index * 0.1 + 0.3}s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
    border-color: ${props => props.theme.colors.bridgetunesBlue};
  }
`;

const DetailLabel = styled.span`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.gray600};
  margin-bottom: 0.75rem;
  transition: all 0.3s ease;
  
  ${DetailItem}:hover & {
    color: ${props => props.theme.colors.bridgetunesBlue};
  }
`;

const DetailValue = styled.span`
  font-size: 1.25rem;
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.bridgetunesDark};
  transition: all 0.3s ease;
  
  ${DetailItem}:hover & {
    transform: scale(1.05);
  }
`;

const TotalPrizeValue = styled(DetailValue)`
  color: ${props => props.theme.colors.green600};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${props => props.theme.colors.green600};
    transition: width 0.3s ease;
  }
  
  ${DetailItem}:hover & {
    &::before {
      width: 100%;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const Button = styled.button`
  background: linear-gradient(135deg, ${props => props.theme.colors.bridgetunesBlue}, ${props => props.theme.colors.bridgetunesLightBlue || '#3B82F6'});
  color: white;
  font-weight: ${props => props.theme.fontWeights.semibold};
  padding: 1.25rem 3rem;
  border: none;
  border-radius: 50px;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.5s ease;
  box-shadow: 0 10px 20px rgba(0, 86, 179, 0.2);
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, ${props => props.theme.colors.bridgetunesLightBlue || '#3B82F6'}, ${props => props.theme.colors.bridgetunesBlue});
    z-index: -1;
    transition: opacity 0.5s ease;
    opacity: 0;
  }
  
  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 15px 30px rgba(0, 86, 179, 0.3);
    
    &::before {
      opacity: 1;
    }
  }
  
  &:active {
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: linear-gradient(to right, #a0a0a0, #c0c0c0);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ResultsSection = styled.div`
  margin-top: 4rem;
  opacity: 0;
  transform: translateY(30px);
  animation: ${fadeIn} 0.8s ease-out forwards, ${slideUp} 0.8s ease-out forwards;
  animation-delay: 0.5s;
`;

const AlertBox = styled.div`
  background-color: ${props => props.type === 'warning' ? props.theme.colors.yellow50 : props.theme.colors.green50};
  border-left: 4px solid ${props => props.type === 'warning' ? props.theme.colors.yellow500 : props.theme.colors.green500};
  color: ${props => props.type === 'warning' ? props.theme.colors.yellow800 : props.theme.colors.green800};
  padding: 1.5rem 2rem;
  margin-bottom: 2.5rem;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%);
    background-size: 200% 100%;
    animation: ${shimmer} 2s infinite;
    pointer-events: none;
  }
`;

const AlertTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: ${props => props.theme.fontWeights.semibold};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  
  &::before {
    content: ${props => props.type === 'warning' ? '"⚠️"' : '"✅"'};
    margin-right: 0.75rem;
    font-size: 1.5rem;
  }
`;

const AlertMessage = styled.p`
  margin: 0;
  padding-left: 2.25rem;
`;

const SlotMachineContainer = styled.div`
  background: linear-gradient(to bottom, #2c3e50, #1a1a2e);
  border-radius: 24px;
  padding: 3rem 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent);
    z-index: 1;
    pointer-events: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);
    z-index: 1;
    pointer-events: none;
  }
`;

const SlotMachineTitle = styled.h3`
  font-size: 2rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: white;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 2;
  
  &::before, &::after {
    content: '🎰';
    margin: 0 1rem;
    font-size: 1.8rem;
    animation: ${bounce} 2s infinite ease-in-out;
  }
  
  &::before {
    animation-delay: 0s;
  }
  
  &::after {
    animation-delay: 0.5s;
  }
`;

const SlotDisplay = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  perspective: 1000px;
`;

const DigitContainer = styled.div`
  width: 80px;
  height: 120px;
  margin: 0 0.5rem;
  background-color: white;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), inset 0 0 10px rgba(0, 0, 0, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 2;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 2;
  }
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    width: 100px;
    height: 150px;
    margin: 0 1rem;
  }
`;

const DigitScroller = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${spinDigit} ${props => props.duration || '3s'} cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
  animation-play-state: ${props => props.spinning ? 'running' : 'paused'};
`;

const Digit = styled.div`
  font-size: 4rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.bridgetunesDark};
  line-height: 1;
  margin: 0.5rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 5rem;
  }
`;

const SlotMachineControls = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 2;
`;

const SpinButton = styled.button`
  background: linear-gradient(135deg, ${props => props.theme.colors.mtnYellow}, ${props => props.theme.colors.yellow600});
  color: ${props => props.theme.colors.mtnBlack};
  font-weight: ${props => props.theme.fontWeights.bold};
  padding: 1.25rem 3rem;
  border: none;
  border-radius: 50px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px rgba(255, 204, 0, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, ${props => props.theme.colors.yellow600}, ${props => props.theme.colors.mtnYellow});
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  
  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 15px 35px rgba(255, 204, 0, 0.4);
    
    &::before {
      opacity: 1;
    }
  }
  
  &:active {
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: linear-gradient(to right, #a0a0a0, #c0c0c0);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const WinnersSection = styled.div`
  margin-top: 4rem;
`;

const WinnersGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const WinnerCard = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid ${props => props.theme.colors.gray200};
  transition: all 0.4s ease;
  transform: translateY(20px);
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out forwards, ${slideUp} 0.5s ease-out forwards;
  animation-delay: ${props => 0.5 + props.index * 0.1}s;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
    border-color: ${props => props.theme.colors.mtnYellow};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(to right, ${props => props.theme.colors.mtnYellow}, ${props => props.theme.colors.yellow300});
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease;
  }
  
  &:hover::before {
    transform: scaleX(1);
  }
`;

const WinnerCardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const WinnerIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.yellow50};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
  font-size: 2rem;
  flex-shrink: 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border-radius: 50%;
    background: linear-gradient(135deg, ${props => props.theme.colors.mtnYellow}, ${props => props.theme.colors.yellow300});
    z-index: -1;
    opacity: 0.7;
    animation: ${pulse} 2s infinite;
  }
`;

const WinnerInfo = styled.div`
  flex: 1;
`;

const WinnerTitle = styled.h4`
  font-size: 1.5rem;
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.bridgetunesDark};
  margin: 0 0 0.5rem;
`;

const WinnerSubtitle = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.gray600};
  margin: 0;
`;

const WinnerDetails = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${props => props.theme.colors.gray200};
`;

const WinnerDetail = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailName = styled.span`
  color: ${props => props.theme.colors.gray700};
`;

const DetailText = styled.span`
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.bridgetunesDark};
`;

const PrizeAmount = styled(DetailText)`
  color: ${props => props.theme.colors.green600};
  font-weight: ${props => props.theme.fontWeights.bold};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${props => props.theme.colors.green600};
    transition: width 0.3s ease;
  }
  
  ${WinnerDetail}:hover & {
    &::after {
      width: 100%;
    }
  }
`;

const ConsolationWinnersContainer = styled.div`
  margin-top: 3rem;
`;

const ConsolationWinnersTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.bridgetunesDark};
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(to right, ${props => props.theme.colors.mtnYellow}, ${props => props.theme.colors.yellow300});
    border-radius: 3px;
  }
`;

const ConsolationWinnersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ConsolationWinnerCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid ${props => props.theme.colors.gray200};
  transition: all 0.3s ease;
  transform: translateY(20px);
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out forwards, ${slideUp} 0.5s ease-out forwards;
  animation-delay: ${props => 1 + props.index * 0.05}s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.theme.colors.mtnYellow};
  }
`;

const ConsolationWinnerMsisdn = styled.div`
  font-size: 1.125rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.bridgetunesDark};
  margin-bottom: 0.75rem;
  text-align: center;
`;

const ConsolationWinnerPrize = styled.div`
  font-size: 1rem;
  color: ${props => props.theme.colors.green600};
  font-weight: ${props => props.theme.fontWeights.semibold};
  text-align: center;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${props => props.theme.colors.green600};
    transition: width 0.3s ease;
  }
  
  ${ConsolationWinnerCard}:hover & {
    &::after {
      width: 100%;
    }
  }
`;

const ConfettiContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;
`;

const Confetti = styled.div`
  position: absolute;
  width: ${props => props.size || '10px'};
  height: ${props => props.size || '10px'};
  background-color: ${props => props.color || props.theme.colors.mtnYellow};
  border-radius: ${props => props.type === 'circle' ? '50%' : '0'};
  top: -20px;
  left: ${props => props.left || '50%'};
  opacity: ${props => props.opacity || 1};
  animation: ${props => css`
    ${float} ${props.duration || '4s'} ease-in-out infinite,
    ${fadeIn} 0.5s ease-out forwards
  `};
  animation-delay: ${props => props.delay || '0s'};
  transform-origin: center center;
`;

// Mock data for prize structure
const PRIZE_STRUCTURE = {
  daily: {
    jackpot: 1000000,
    second: 350000,
    third: 150000,
    consolation: 75000
  },
  saturday: {
    jackpot: 3000000,
    second: 1000000,
    third: 500000,
    consolation: 100000
  }
};

// Mock data for draw details
const DRAW_DETAILS = {
  id: 'DRAW-20250421',
  date: '2025-04-21',
  type: 'daily',
  totalParticipants: 12500,
  totalPrizeValue: PRIZE_STRUCTURE.daily.jackpot + PRIZE_STRUCTURE.daily.second + PRIZE_STRUCTURE.daily.third + (PRIZE_STRUCTURE.daily.consolation * 10)
};

// Mock data for winners
const WINNERS = {
  jackpot: {
    msisdn: '0801****789',
    drawId: DRAW_DETAILS.id,
    date: DRAW_DETAILS.date,
    prizeAmount: PRIZE_STRUCTURE.daily.jackpot,
    prizeType: 'Jackpot'
  },
  second: {
    msisdn: '0802****456',
    drawId: DRAW_DETAILS.id,
    date: DRAW_DETAILS.date,
    prizeAmount: PRIZE_STRUCTURE.daily.second,
    prizeType: '2nd Prize'
  },
  third: {
    msisdn: '0803****123',
    drawId: DRAW_DETAILS.id,
    date: DRAW_DETAILS.date,
    prizeAmount: PRIZE_STRUCTURE.daily.third,
    prizeType: '3rd Prize'
  },
  consolation: Array.from({ length: 10 }, (_, i) => ({
    msisdn: `080${Math.floor(Math.random() * 10)}****${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    drawId: DRAW_DETAILS.id,
    date: DRAW_DETAILS.date,
    prizeAmount: PRIZE_STRUCTURE.daily.consolation,
    prizeType: 'Consolation Prize'
  }))
};

const EnhancedDrawManagement = () => {
  const [drawType, setDrawType] = useState('daily');
  const [drawDate, setDrawDate] = useState(DRAW_DETAILS.date);
  const [selectedDigits, setSelectedDigits] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confetti, setConfetti] = useState([]);
  
  const digitRefs = useRef([]);
  
  // Generate random digits
  const generateRandomDigits = () => {
    const digits = [];
    for (let i = 0; i < 10; i++) {
      digits.push(Math.floor(Math.random() * 10));
    }
    return digits;
  };
  
  // Handle digit selection
  const handleDigitSelect = (digit) => {
    if (selectedDigits.includes(digit)) {
      setSelectedDigits(selectedDigits.filter(d => d !== digit));
    } else {
      setSelectedDigits([...selectedDigits, digit]);
    }
  };
  
  // Handle select all digits
  const handleSelectAllDigits = () => {
    if (selectedDigits.length === 10) {
      setSelectedDigits([]);
    } else {
      setSelectedDigits([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    }
  };
  
  // Handle spin
  const handleSpin = () => {
    setIsSpinning(true);
    setShowResults(false);
    
    // Generate confetti
    const newConfetti = [];
    for (let i = 0; i < 100; i++) {
      newConfetti.push({
        id: i,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 10 + 5}px`,
        color: [
          '#FFCC00', // MTN Yellow
          '#0056B3', // Bridgetunes Blue
          '#10B981', // Green
          '#F59E0B', // Amber
          '#EF4444', // Red
          '#3B82F6', // Blue
          '#8B5CF6', // Purple
          '#EC4899', // Pink
          '#F97316', // Orange
          '#14B8A6', // Teal
        ][Math.floor(Math.random() * 10)],
        type: Math.random() > 0.5 ? 'circle' : 'square',
        duration: `${Math.random() * 5 + 3}s`,
        delay: `${Math.random() * 2}s`,
        opacity: Math.random() * 0.5 + 0.5
      });
    }
    
    // Stop spinning after 3 seconds
    setTimeout(() => {
      setIsSpinning(false);
      setShowResults(true);
      setShowConfetti(true);
      setConfetti(newConfetti);
      
      // Hide confetti after 5 seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    }, 3000);
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return `₦${amount.toLocaleString()}`;
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Get prize icon
  const getPrizeIcon = (prizeType) => {
    switch (prizeType) {
      case 'Jackpot':
        return '🏆';
      case '2nd Prize':
        return '🥈';
      case '3rd Prize':
        return '🥉';
      default:
        return '🎁';
    }
  };
  
  return (
    <PageContainer>
      <Head>
        <title>Enhanced Draw Management | MyNumba Don Win</title>
        <meta name="description" content="Draw management for MyNumba Don Win promotion" />
      </Head>
      
      <AnimatedHeader />
      
      <MainContent>
        <PageHeader>
          <HeaderDecoration />
          <PageTitle>Draw Management</PageTitle>
          <PageDescription>
            Configure and run draws for the MyNumba Don Win promotion. Select draw type, date, and eligible digits to find winners.
          </PageDescription>
        </PageHeader>
        
        <Card delay="0.2s">
          <CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Draw Configuration
          </CardTitle>
          
          <FormGrid>
            <FormGroup>
              <Label htmlFor="drawType">Draw Type</Label>
              <Select 
                id="drawType" 
                value={drawType}
                onChange={(e)  => setDrawType(e.target.value)}
              >
                <option value="daily">Daily Draw</option>
                <option value="saturday">Saturday Special Draw</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="drawDate">Draw Date</Label>
              <Select 
                id="drawDate" 
                value={drawDate}
                onChange={(e) => setDrawDate(e.target.value)}
              >
                <option value="2025-04-21">April 21, 2025</option>
                <option value="2025-04-22">April 22, 2025</option>
                <option value="2025-04-23">April 23, 2025</option>
                <option value="2025-04-24">April 24, 2025</option>
                <option value="2025-04-25">April 25, 2025</option>
                <option value="2025-04-26">April 26, 2025 (Saturday)</option>
              </Select>
            </FormGroup>
          </FormGrid>
          
          <FormGroup>
            <Label>Eligible Last Digits</Label>
            <DigitSelectionGrid>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit, index) => (
                <DigitCheckbox key={digit} index={index}>
                  <DigitInput 
                    type="checkbox" 
                    id={`digit-${digit}`} 
                    checked={selectedDigits.includes(digit)}
                    onChange={() => handleDigitSelect(digit)}
                  />
                  <DigitLabel 
                    htmlFor={`digit-${digit}`}
                    recommended={[0, 5].includes(digit)}
                  >
                    {digit}
                  </DigitLabel>
                </DigitCheckbox>
              ))}
              <AllDigitsButton onClick={handleSelectAllDigits}>
                {selectedDigits.length === 10 ? 'Clear All' : 'Select All'}
              </AllDigitsButton>
            </DigitSelectionGrid>
          </FormGroup>
          
          <PrizeStructureGrid>
            <PrizeCard delay="0.4s">
              <PrizeCardTitle>Daily Draw Prizes</PrizeCardTitle>
              <PrizeList>
                <PrizeItem>
                  <PrizeName>Jackpot</PrizeName>
                  <PrizeValue>{formatCurrency(PRIZE_STRUCTURE.daily.jackpot)}</PrizeValue>
                </PrizeItem>
                <PrizeItem>
                  <PrizeName>2nd Prize</PrizeName>
                  <PrizeValue>{formatCurrency(PRIZE_STRUCTURE.daily.second)}</PrizeValue>
                </PrizeItem>
                <PrizeItem>
                  <PrizeName>3rd Prize</PrizeName>
                  <PrizeValue>{formatCurrency(PRIZE_STRUCTURE.daily.third)}</PrizeValue>
                </PrizeItem>
                <PrizeItem>
                  <PrizeName>Consolation (10)</PrizeName>
                  <PrizeValue>{formatCurrency(PRIZE_STRUCTURE.daily.consolation)}</PrizeValue>
                </PrizeItem>
              </PrizeList>
            </PrizeCard>
            
            <PrizeCard delay="0.5s">
              <PrizeCardTitle>Saturday Special Prizes</PrizeCardTitle>
              <PrizeList>
                <PrizeItem>
                  <PrizeName>Jackpot</PrizeName>
                  <PrizeValue>{formatCurrency(PRIZE_STRUCTURE.saturday.jackpot)}</PrizeValue>
                </PrizeItem>
                <PrizeItem>
                  <PrizeName>2nd Prize</PrizeName>
                  <PrizeValue>{formatCurrency(PRIZE_STRUCTURE.saturday.second)}</PrizeValue>
                </PrizeItem>
                <PrizeItem>
                  <PrizeName>3rd Prize</PrizeName>
                  <PrizeValue>{formatCurrency(PRIZE_STRUCTURE.saturday.third)}</PrizeValue>
                </PrizeItem>
                <PrizeItem>
                  <PrizeName>Consolation (10)</PrizeName>
                  <PrizeValue>{formatCurrency(PRIZE_STRUCTURE.saturday.consolation)}</PrizeValue>
                </PrizeItem>
              </PrizeList>
            </PrizeCard>
          </PrizeStructureGrid>
          
          <DrawDetailsGrid>
            <DetailItem index={0}>
              <DetailLabel>Draw ID</DetailLabel>
              <DetailValue>{DRAW_DETAILS.id}</DetailValue>
            </DetailItem>
            <DetailItem index={1}>
              <DetailLabel>Total Participants</DetailLabel>
              <DetailValue>{DRAW_DETAILS.totalParticipants.toLocaleString()}</DetailValue>
            </DetailItem>
            <DetailItem index={2}>
              <DetailLabel>Total Prize Value</DetailLabel>
              <TotalPrizeValue>{formatCurrency(DRAW_DETAILS.totalPrizeValue)}</TotalPrizeValue>
            </DetailItem>
          </DrawDetailsGrid>
          
          <ButtonContainer>
            <Button onClick={handleSpin} disabled={isSpinning || selectedDigits.length === 0}>
              {isSpinning ? 'Spinning...' : 'Run Draw'}
            </Button>
          </ButtonContainer>
        </Card>
        
        {isSpinning && (
          <SlotMachineContainer>
            <SlotMachineTitle>Finding Winners</SlotMachineTitle>
            <SlotDisplay>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <DigitContainer key={index} ref={el => digitRefs.current[index] = el}>
                  <DigitScroller spinning={isSpinning} duration={`${2 + index * 0.5}s`}>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit, i) => (
                      <Digit key={i}>{digit}</Digit>
                    ))}
                  </DigitScroller>
                </DigitContainer>
              ))}
            </SlotDisplay>
            <SlotMachineControls>
              <SpinButton disabled>Spinning...</SpinButton>
            </SlotMachineControls>
          </SlotMachineContainer>
        )}
        
        {showResults && (
          <ResultsSection>
            <AlertBox type="success">
              <AlertTitle type="success">Draw Completed Successfully</AlertTitle>
              <AlertMessage>
                The draw for {formatDate(drawDate)} has been completed successfully. 
                {drawType === 'daily' ? 'Daily' : 'Saturday Special'} prizes have been awarded to the winners below.
              </AlertMessage>
            </AlertBox>
            
            <WinnersSection>
              <WinnersGrid>
                <WinnerCard index={0}>
                  <WinnerCardHeader>
                    <WinnerIcon>{getPrizeIcon('Jackpot')}</WinnerIcon>
                    <WinnerInfo>
                      <WinnerTitle>Jackpot Winner</WinnerTitle>
                      <WinnerSubtitle>Grand Prize</WinnerSubtitle>
                    </WinnerInfo>
                  </WinnerCardHeader>
                  <WinnerDetails>
                    <WinnerDetail>
                      <DetailName>MSISDN</DetailName>
                      <DetailText>{WINNERS.jackpot.msisdn}</DetailText>
                    </WinnerDetail>
                    <WinnerDetail>
                      <DetailName>Draw Date</DetailName>
                      <DetailText>{formatDate(WINNERS.jackpot.date)}</DetailText>
                    </WinnerDetail>
                    <WinnerDetail>
                      <DetailName>Prize</DetailName>
                      <PrizeAmount>{formatCurrency(WINNERS.jackpot.prizeAmount)}</PrizeAmount>
                    </WinnerDetail>
                  </WinnerDetails>
                </WinnerCard>
                
                <WinnerCard index={1}>
                  <WinnerCardHeader>
                    <WinnerIcon>{getPrizeIcon('2nd Prize')}</WinnerIcon>
                    <WinnerInfo>
                      <WinnerTitle>2nd Prize Winner</WinnerTitle>
                      <WinnerSubtitle>Silver Award</WinnerSubtitle>
                    </WinnerInfo>
                  </WinnerCardHeader>
                  <WinnerDetails>
                    <WinnerDetail>
                      <DetailName>MSISDN</DetailName>
                      <DetailText>{WINNERS.second.msisdn}</DetailText>
                    </WinnerDetail>
                    <WinnerDetail>
                      <DetailName>Draw Date</DetailName>
                      <DetailText>{formatDate(WINNERS.second.date)}</DetailText>
                    </WinnerDetail>
                    <WinnerDetail>
                      <DetailName>Prize</DetailName>
                      <PrizeAmount>{formatCurrency(WINNERS.second.prizeAmount)}</PrizeAmount>
                    </WinnerDetail>
                  </WinnerDetails>
                </WinnerCard>
                
                <WinnerCard index={2}>
                  <WinnerCardHeader>
                    <WinnerIcon>{getPrizeIcon('3rd Prize')}</WinnerIcon>
                    <WinnerInfo>
                      <WinnerTitle>3rd Prize Winner</WinnerTitle>
                      <WinnerSubtitle>Bronze Award</WinnerSubtitle>
                    </WinnerInfo>
                  </WinnerCardHeader>
                  <WinnerDetails>
                    <WinnerDetail>
                      <DetailName>MSISDN</DetailName>
                      <DetailText>{WINNERS.third.msisdn}</DetailText>
                    </WinnerDetail>
                    <WinnerDetail>
                      <DetailName>Draw Date</DetailName>
                      <DetailText>{formatDate(WINNERS.third.date)}</DetailText>
                    </WinnerDetail>
                    <WinnerDetail>
                      <DetailName>Prize</DetailName>
                      <PrizeAmount>{formatCurrency(WINNERS.third.prizeAmount)}</PrizeAmount>
                    </WinnerDetail>
                  </WinnerDetails>
                </WinnerCard>
              </WinnersGrid>
              
              <ConsolationWinnersContainer>
                <ConsolationWinnersTitle>Consolation Prize Winners</ConsolationWinnersTitle>
                <ConsolationWinnersGrid>
                  {WINNERS.consolation.map((winner, index) => (
                    <ConsolationWinnerCard key={index} index={index}>
                      <ConsolationWinnerMsisdn>{winner.msisdn}</ConsolationWinnerMsisdn>
                      <ConsolationWinnerPrize>{formatCurrency(winner.prizeAmount)}</ConsolationWinnerPrize>
                    </ConsolationWinnerCard>
                  ))}
                </ConsolationWinnersGrid>
              </ConsolationWinnersContainer>
            </WinnersSection>
          </ResultsSection>
        )}
        
        {showConfetti && (
          <ConfettiContainer>
            {confetti.map(item => (
              <Confetti 
                key={item.id}
                left={item.left}
                size={item.size}
                color={item.color}
                type={item.type}
                duration={item.duration}
                delay={item.delay}
                opacity={item.opacity}
              />
            ))}
          </ConfettiContainer>
        )}
      </MainContent>
      
      <Footer />
    </PageContainer>
  );
};

export default EnhancedDrawManagement;

