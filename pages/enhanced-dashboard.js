import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Head from 'next/head';
import AnimatedHeader from '../components/AnimatedHeader';
import Footer from '../components/Footer';
import DashboardService from '../services/DashboardService';

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
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const countUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.mtnLight};
  background-image: url('/hero-pattern.svg');
  background-attachment: fixed;
  background-size: cover;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  animation: ${fadeIn} 0.8s ease-out;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.bridgetunesDark};
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  animation: ${slideUp} 0.8s ease-out;
  
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

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 300px 1fr;
  }
`;

const ProfileCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(20px);
  opacity: 0;
  animation: ${slideUp} 0.8s ease-out forwards;
  animation-delay: 0.2s;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.theme.colors.mtnYellow}50;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, transparent 0%, transparent 50%, rgba(255, 204, 0, 0.05) 50%, rgba(255, 204, 0, 0.05) 100%);
    z-index: 0;
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const AvatarContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.mtnYellow}20;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border-radius: 50%;
    background: linear-gradient(135deg, ${props => props.theme.colors.mtnYellow}, ${props => props.theme.colors.bridgetunesBlue});
    z-index: -1;
    opacity: 0.7;
    animation: ${rotate} 10s linear infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    background-color: white;
    z-index: -1;
    margin: 3px;
  }
`;

const Avatar = styled.div`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.mtnYellow};
  animation: ${float} 3s ease-in-out infinite;
`;

const UserName = styled.h2`
  font-size: 1.5rem;
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.bridgetunesDark};
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background-color: ${props => props.theme.colors.mtnYellow};
    transition: width 0.3s ease;
  }
  
  ${ProfileCard}:hover &::after {
    width: 100%;
  }
`;

const UserMsisdn = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.gray600};
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
`;

const StatsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const StatItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.gray100};
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    transform: translateX(5px);
    padding-left: 5px;
  }
`;

const StatLabel = styled.span`
  color: ${props => props.theme.colors.gray700};
  font-size: 0.875rem;
`;

const StatValue = styled.span`
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.bridgetunesDark};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${props => props.theme.colors.mtnYellow};
    transition: width 0.3s ease;
  }
  
  ${StatItem}:hover &::after {
    width: 100%;
  }
`;

const TabsContainer = styled.div`
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.gray200};
  transform: translateY(20px);
  opacity: 0;
  animation: ${slideUp} 0.8s ease-out forwards;
  animation-delay: 0.3s;
`;

const TabNav = styled.nav`
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabButton = styled.button`
  padding: 1rem 1.25rem;
  white-space: nowrap;
  font-size: 1rem;
  font-weight: ${props => props.active ? props.theme.fontWeights.semibold : props.theme.fontWeights.medium};
  color: ${props => props.active ? props.theme.colors.bridgetunesDark : props.theme.colors.gray600};
  background-color: transparent;
  border: none;
  border-bottom: 2px solid ${props => props.active ? props.theme.colors.mtnYellow : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    color: ${props => props.theme.colors.bridgetunesDark};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${props => props.theme.colors.mtnYellow};
    transform: translateX(${props => props.active ? '0' : '-100%'});
    transition: transform 0.3s ease;
  }
  
  &:hover::after {
    transform: translateX(0);
  }
`;

const TabContent = styled.div`
  display: ${props => props.active ? 'block' : 'none'};
  animation: ${fadeIn} 0.5s ease-out;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transform: translateY(20px);
  opacity: 0;
  animation: ${slideUp} 0.8s ease-out forwards;
  animation-delay: ${props => props.delay || '0.4s'};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.theme.colors.bridgetunesBlue}50;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, transparent 0%, transparent 50%, rgba(0, 86, 179, 0.05) 50%, rgba(0, 86, 179, 0.05) 100%);
    z-index: 0;
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.bridgetunesDark};
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.gray200};
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  
  svg {
    margin-right: 0.75rem;
    color: ${props => props.theme.colors.bridgetunesBlue};
    transition: all 0.3s ease;
  }
  
  ${Card}:hover & svg {
    transform: scale(1.2) rotate(10deg);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 50px;
    height: 2px;
    background-color: ${props => props.theme.colors.bridgetunesBlue};
    transition: width 0.5s ease;
  }
  
  ${Card}:hover &::after {
    width: 100%;
  }
`;

const EntriesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  position: relative;
  z-index: 1;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const EntryCard = styled.div`
  background-color: ${props => props.theme.colors.gray50};
  border-radius: 0.75rem;
  padding: 1.25rem;
  border: 1px solid ${props => props.theme.colors.gray100};
  transition: all 0.3s ease;
  transform: scale(0.98);
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out forwards, ${slideUp} 0.5s ease-out forwards;
  animation-delay: ${props => 0.5 + props.index * 0.1}s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
    border-color: ${props => props.theme.colors.bridgetunesBlue}30;
    background-color: white;
  }
`;

const EntryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${props => props.theme.colors.gray200};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 30px;
    height: 2px;
    background-color: ${props => props.theme.colors.bridgetunesBlue};
    transition: width 0.3s ease;
  }
  
  ${EntryCard}:hover &::after {
    width: 100%;
  }
`;

const EntryDate = styled.span`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.gray600};
  transition: all 0.3s ease;
  
  ${EntryCard}:hover & {
    color: ${props => props.theme.colors.gray800};
  }
`;

const EntryAmount = styled.span`
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.green600};
  transition: all 0.3s ease;
  
  ${EntryCard}:hover & {
    transform: scale(1.1);
  }
`;

const EntryDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EntryInfo = styled.div``;

const EntryType = styled.div`
  font-weight: ${props => props.theme.fontWeights.medium};
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
  
  ${EntryCard}:hover & {
    color: ${props => props.theme.colors.bridgetunesBlue};
  }
`;

const EntryDescription = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.gray600};
`;

const EntryPoints = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const PointsLabel = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.gray600};
  margin-bottom: 0.25rem;
`;

const PointsValue = styled.div`
  font-size: 1.25rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.mtnYellow};
  transition: all 0.3s ease;
  
  ${EntryCard}:hover & {
    transform: scale(1.2);
    text-shadow: 0 2px 10px rgba(255, 204, 0, 0.3);
  }
`;

const NotificationCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  padding: 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid ${props => props.theme.colors.gray100};
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  transform: scale(0.98);
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out forwards, ${slideUp} 0.5s ease-out forwards;
  animation-delay: ${props => 0.5 + props.index * 0.1}s;
  position: relative;
  z-index: 1;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border-color: ${props => {
      switch (props.type) {
        case 'win_notification':
          return props.theme.colors.green500;
        case 'recharge_confirmation':
          return props.theme.colors.bridgetunesBlue;
        case 'points_update':
          return props.theme.colors.mtnYellow;
        default:
          return props.theme.colors.gray300;
      }
    }};
  }
  
  ${props => props.unread && `
    &::before {
      content: '';
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: ${props.theme.colors.bridgetunesBlue};
      animation: ${pulse} 2s infinite;
    }
  `}
`;

const NotificationIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  flex-shrink: 0;
  background-color: ${props => {
    switch (props.type) {
      case 'win_notification':
        return props.theme.colors.green100;
      case 'recharge_confirmation':
        return props.theme.colors.blue100;
      case 'points_update':
        return props.theme.colors.yellow100;
      default:
        return props.theme.colors.gray100;
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'win_notification':
        return props.theme.colors.green600;
      case 'recharge_confirmation':
        return props.theme.colors.blue600;
      case 'points_update':
        return props.theme.colors.yellow600;
      default:
        return props.theme.colors.gray600;
    }
  }};
  transition: all 0.3s ease;
  
  ${NotificationCard}:hover & {
    transform: scale(1.2);
  }
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const NotificationTitle = styled.h4`
  font-size: 1rem;
  font-weight: ${props => props.theme.fontWeights.semibold};
  margin: 0;
  color: ${props => props.theme.colors.bridgetunesDark};
  transition: all 0.3s ease;
  
  ${NotificationCard}:hover & {
    color: ${props => {
      switch (props.type) {
        case 'win_notification':
          return props.theme.colors.green600;
        case 'recharge_confirmation':
          return props.theme.colors.bridgetunesBlue;
        case 'points_update':
          return props.theme.colors.yellow600;
        default:
          return props.theme.colors.bridgetunesDark;
      }
    }};
  }
`;

const NotificationMessage = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.gray700};
  margin: 0 0 0.5rem;
`;

const NotificationTime = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.gray500};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  padding: 1.25rem;
  border: 1px solid ${props => props.theme.colors.gray100};
  transition: all 0.3s ease;
  transform: translateY(20px);
  opacity: 0;
  animation: ${slideUp} 0.5s ease-out forwards;
  animation-delay: ${props => 0.3 + props.index * 0.1}s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    border-color: ${props => props.theme.colors.mtnYellow}50;
  }
`;

const StatCardTitle = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.gray600};
  margin-bottom: 0.75rem;
  transition: all 0.3s ease;
  
  ${StatCard}:hover & {
    color: ${props => props.theme.colors.bridgetunesDark};
  }
`;

const StatCardValue = styled.div`
  font-size: 1.5rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.bridgetunesDark};
  transition: all 0.3s ease;
  
  ${StatCard}:hover & {
    transform: scale(1.1);
    color: ${props => props.theme.colors.bridgetunesBlue};
  }
`;

const ChartContainer = styled.div`
  margin-top: 2rem;
  height: 300px;
  position: relative;
  z-index: 1;
`;

const ChartBar = styled.div`
  position: absolute;
  bottom: 0;
  width: 24px;
  background: linear-gradient(to top, ${props => props.theme.colors.bridgetunesBlue}, ${props => props.theme.colors.bridgetunesLightBlue});
  border-radius: 4px 4px 0 0;
  transform: scaleY(0);
  transform-origin: bottom;
  animation: ${props => css`
    ${slideUp} 1s ease-out forwards
  `};
  animation-delay: ${props => 0.5 + props.index * 0.1}s;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scaleY(1.05) !important;
    background: linear-gradient(to top, ${props => props.theme.colors.mtnYellow}, ${props => props.theme.colors.yellow500});
    box-shadow: 0 0 15px rgba(255, 204, 0, 0.5);
  }
  
  &::after {
    content: '${props => props.value}';
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.75rem;
    font-weight: ${props => props.theme.fontWeights.medium};
    color: ${props => props.theme.colors.gray700};
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::after {
    opacity: 1;
  }
`;

const ChartAxis = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: ${props => props.theme.colors.gray300};
`;

const ChartLabels = styled.div`
  position: absolute;
  bottom: -25px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
`;

const ChartLabel = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.gray600};
  transform: translateY(10px);
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: ${props => 1 + props.index * 0.05}s;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  position: relative;
  z-index: 1;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  border: 1px solid ${props => props.active ? props.theme.colors.bridgetunesBlue : props.theme.colors.gray300};
  border-radius: 0.375rem;
  background-color: ${props => props.active ? props.theme.colors.bridgetunesBlue : 'white'};
  color: ${props => props.active ? 'white' : props.theme.colors.gray700};
  font-weight: ${props => props.active ? props.theme.fontWeights.medium : props.theme.fontWeights.normal};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background-color: ${props => props.active ? props.theme.colors.bridgetunesBlue : props.theme.colors.gray100};
    transform: translateY(-2px);
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid ${props => props.theme.colors.gray200};
  border-top: 4px solid ${props => props.theme.colors.bridgetunesBlue};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.error};
  color: white;
  font-size: 0.75rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulse} 2s infinite;
`;

const RealTimeNotification = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  padding: 1.25rem;
  max-width: 350px;
  z-index: 90;
  border-left: 4px solid ${props => {
    switch (props.type) {
      case 'win_notification':
        return props.theme.colors.green500;
      case 'recharge_confirmation':
        return props.theme.colors.bridgetunesBlue;
      case 'draw_announcement':
        return props.theme.colors.mtnYellow;
      default:
        return props.theme.colors.gray400;
    }
  }};
  transform: translateX(120%);
  animation: ${slideInRight} 0.5s forwards, ${fadeIn} 0.5s forwards;
  
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
    z-index: -1;
    border-radius: 0.75rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  color: ${props => props.theme.colors.gray500};
  cursor: pointer;
  font-size: 1rem;
  padding: 0.25rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.gray700};
    transform: rotate(90deg);
  }
`;

const EnhancedDashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [entries, setEntries] = useState({ entries: [], pagination: {} });
  const [notifications, setNotifications] = useState({ notifications: [], pagination: {} });
  const [statistics, setStatistics] = useState(null);
  const [activeTab, setActiveTab] = useState('activity');
  const [loading, setLoading] = useState(true);
  const [entriesPage, setEntriesPage] = useState(1);
  const [notificationsPage, setNotificationsPage] = useState(1);
  const [realTimeNotification, setRealTimeNotification] = useState(null);
  const [notificationCheckInterval, setNotificationCheckInterval] = useState(null);
  
  // Mock MSISDN for demo purposes
  const msisdn = '08012345678';
  
  // Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch user info
        const userInfoData = await DashboardService.getUserInfo(msisdn);
        setUserInfo(userInfoData);
        
        // Fetch entries
        const entriesData = await DashboardService.getUserEntries(msisdn, entriesPage);
        setEntries(entriesData);
        
        // Fetch notifications
        const notificationsData = await DashboardService.getUserNotifications(msisdn, notificationsPage);
        setNotifications(notificationsData);
        
        // Fetch statistics
        const statisticsData = await DashboardService.getUserStatistics(msisdn);
        setStatistics(statisticsData);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [msisdn, entriesPage, notificationsPage]);
  
  // Check for real-time notifications
  useEffect(() => {
    const checkForNotifications = async () => {
      try {
        const result = await DashboardService.checkForNewNotifications(msisdn);
        if (result.hasNotification) {
          setRealTimeNotification(result.notification);
          
          // Auto-dismiss after 5 seconds
          setTimeout(() => {
            setRealTimeNotification(null);
          }, 5000);
        }
      } catch (error) {
        console.error('Error checking for notifications:', error);
      }
    };
    
    // Check for notifications every 30 seconds
    const interval = setInterval(checkForNotifications, 30000);
    setNotificationCheckInterval(interval);
    
    // Initial check
    checkForNotifications();
    
    return () => {
      if (notificationCheckInterval) {
        clearInterval(notificationCheckInterval);
      }
    };
  }, [msisdn]);
  
  // Handle pagination for entries
  const handleEntriesPageChange = (page) => {
    setEntriesPage(page);
  };
  
  // Handle pagination for notifications
  const handleNotificationsPageChange = (page) => {
    setNotificationsPage(page);
  };
  
  // Mark notification as read
  const handleMarkAsRead = async (notificationId) => {
    try {
      await DashboardService.markNotificationAsRead(notificationId);
      
      // Update notifications list
      setNotifications(prev => ({
        ...prev,
        notifications: prev.notifications.map(notification => 
          notification.id === notificationId 
            ? { ...notification, read: true } 
            : notification
        )
      }));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };
  
  // Dismiss real-time notification
  const dismissRealTimeNotification = () => {
    setRealTimeNotification(null);
  };
  
  // Generate chart data
  const generateChartData = () => {
    if (!statistics || !statistics.topupHistory) return [];
    
    return statistics.topupHistory.slice(-7).map((item, index) => ({
      date: item.date,
      amount: item.amount,
      height: (item.amount / 1000) * 100, // Scale height based on amount
      left: `${index * (100 / 6)}%` // Distribute bars evenly
    }));
  };
  
  const chartData = statistics ? generateChartData() : [];
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Format time
  const formatTime = (dateString) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(dateString).toLocaleTimeString('en-US', options);
  };
  
  // Get notification icon
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'win_notification':
        return '🏆';
      case 'recharge_confirmation':
        return '💰';
      case 'draw_announcement':
        return '📅';
      case 'points_update':
        return '⭐';
      default:
        return 'ℹ️';
    }
  };
  
  return (
    <PageContainer>
      <Head>
        <title>Enhanced Dashboard | MyNumba Don Win</title>
        <meta name="description" content="User dashboard for MyNumba Don Win promotion" />
      </Head>
      
      <AnimatedHeader />
      
      <MainContent>
        <PageTitle>Your Dashboard</PageTitle>
        
        {loading ? (
          <LoadingOverlay>
            <LoadingSpinner />
          </LoadingOverlay>
        ) : (
          <DashboardGrid>
            {/* User Profile Card */}
            <div>
              <ProfileCard>
                <AvatarContainer>
                  <Avatar>👤</Avatar>
                </AvatarContainer>
                <UserName>User Account</UserName>
                <UserMsisdn>{userInfo?.msisdn}</UserMsisdn>
                <StatsList>
                  <StatItem>
                    <StatLabel>Opt-In Status</StatLabel>
                    <StatValue>{userInfo?.optInStatus ? 'Active' : 'Inactive'}</StatValue>
                  </StatItem>
                  <StatItem>
                    <StatLabel>Join Date</StatLabel>
                    <StatValue>{formatDate(userInfo?.joinDate)}</StatValue>
                  </StatItem>
                  <StatItem>
                    <StatLabel>Total Entries</StatLabel>
                    <StatValue>{userInfo?.totalEntries}</StatValue>
                  </StatItem>
                  <StatItem>
                    <StatLabel>Total Points</StatLabel>
                    <StatValue>{userInfo?.totalChances}</StatValue>
                  </StatItem>
                  <StatItem>
                    <StatLabel>Total Recharge</StatLabel>
                    <StatValue>₦{userInfo?.totalRecharge.toLocaleString()}</StatValue>
                  </StatItem>
                  <StatItem>
                    <StatLabel>Eligible Draws</StatLabel>
                    <StatValue>{userInfo?.eligibleDraws}</StatValue>
                  </StatItem>
                </StatsList>
              </ProfileCard>
              
              {/* Statistics Card */}
              <Card delay="0.3s">
                <CardTitle>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                  Statistics
                </CardTitle>
                
                <StatsGrid>
                  <StatCard index={0}>
                    <StatCardTitle>Total Topups</StatCardTitle>
                    <StatCardValue>{statistics?.totalTopups}</StatCardValue>
                  </StatCard>
                  <StatCard index={1}>
                    <StatCardTitle>Average Topup</StatCardTitle>
                    <StatCardValue>₦{statistics?.averageTopup}</StatCardValue>
                  </StatCard>
                  <StatCard index={2}>
                    <StatCardTitle>Draws Participated</StatCardTitle>
                    <StatCardValue>{statistics?.participatedDraws}</StatCardValue>
                  </StatCard>
                  <StatCard index={3}>
                    <StatCardTitle>Total Winnings</StatCardTitle>
                    <StatCardValue>₦{statistics?.totalWinnings.toLocaleString() }</StatCardValue>
                  </StatCard>
                </StatsGrid>
                
                <ChartContainer>
                  <ChartAxis />
                  {chartData.map((bar, index) => (
                    <ChartBar 
                      key={index}
                      style={{ 
                        height: `${bar.height}%`, 
                        left: bar.left 
                      }}
                      index={index}
                      value={`₦${bar.amount}`}
                    />
                  ))}
                  <ChartLabels>
                    {chartData.map((bar, index) => (
                      <ChartLabel key={index} index={index}>
                        {formatDate(bar.date).split(' ')[1]}
                      </ChartLabel>
                    ))}
                  </ChartLabels>
                </ChartContainer>
              </Card>
            </div>
            
            {/* Main Content Area */}
            <div>
              <TabsContainer>
                <TabNav>
                  <TabButton 
                    active={activeTab === 'activity'} 
                    onClick={() => setActiveTab('activity')}
                  >
                    Recent Activity
                  </TabButton>
                  <TabButton 
                    active={activeTab === 'notifications'} 
                    onClick={() => setActiveTab('notifications')}
                  >
                    Notifications
                    {notifications?.notifications?.filter(n => !n.read).length > 0 && (
                      <NotificationBadge>
                        {notifications.notifications.filter(n => !n.read).length}
                      </NotificationBadge>
                    )}
                  </TabButton>
                </TabNav>
              </TabsContainer>
              
              {/* Activity Tab */}
              <TabContent active={activeTab === 'activity'}>
                <Card>
                  <CardTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                    </svg>
                    Recent Recharges
                  </CardTitle>
                  
                  <EntriesGrid>
                    {entries?.entries?.map((entry, index)  => (
                      <EntryCard key={entry.id} index={index}>
                        <EntryHeader>
                          <EntryDate>{formatDate(entry.date)}</EntryDate>
                          <EntryAmount>₦{entry.amount}</EntryAmount>
                        </EntryHeader>
                        <EntryDetails>
                          <EntryInfo>
                            <EntryType>Recharge</EntryType>
                            <EntryDescription>{entry.time}</EntryDescription>
                          </EntryInfo>
                          <EntryPoints>
                            <PointsLabel>Points Earned</PointsLabel>
                            <PointsValue>{entry.points}</PointsValue>
                          </EntryPoints>
                        </EntryDetails>
                      </EntryCard>
                    ))}
                  </EntriesGrid>
                  
                  {entries?.pagination?.totalPages > 1 && (
                    <PaginationContainer>
                      <PaginationButton 
                        onClick={() => handleEntriesPageChange(entriesPage - 1)}
                        disabled={entriesPage === 1}
                      >
                        Previous
                      </PaginationButton>
                      
                      {Array.from({ length: entries.pagination.totalPages }, (_, i) => i + 1).map(page => (
                        <PaginationButton 
                          key={page}
                          active={page === entriesPage}
                          onClick={() => handleEntriesPageChange(page)}
                        >
                          {page}
                        </PaginationButton>
                      ))}
                      
                      <PaginationButton 
                        onClick={() => handleEntriesPageChange(entriesPage + 1)}
                        disabled={entriesPage === entries.pagination.totalPages}
                      >
                        Next
                      </PaginationButton>
                    </PaginationContainer>
                  )}
                </Card>
              </TabContent>
              
              {/* Notifications Tab */}
              <TabContent active={activeTab === 'notifications'}>
                <Card>
                  <CardTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    Your Notifications
                  </CardTitle>
                  
                  {notifications?.notifications?.map((notification, index)  => (
                    <NotificationCard 
                      key={notification.id} 
                      index={index}
                      type={notification.type}
                      unread={!notification.read}
                      onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                    >
                      <div style={{ display: 'flex' }}>
                        <NotificationIcon type={notification.type}>
                          {getNotificationIcon(notification.type)}
                        </NotificationIcon>
                        <NotificationContent>
                          <NotificationHeader>
                            <NotificationTitle type={notification.type}>
                              {notification.title}
                            </NotificationTitle>
                          </NotificationHeader>
                          <NotificationMessage>
                            {notification.message}
                          </NotificationMessage>
                          <NotificationTime>
                            {formatDate(notification.date)} at {formatTime(notification.date)}
                          </NotificationTime>
                        </NotificationContent>
                      </div>
                    </NotificationCard>
                  ))}
                  
                  {notifications?.pagination?.totalPages > 1 && (
                    <PaginationContainer>
                      <PaginationButton 
                        onClick={() => handleNotificationsPageChange(notificationsPage - 1)}
                        disabled={notificationsPage === 1}
                      >
                        Previous
                      </PaginationButton>
                      
                      {Array.from({ length: notifications.pagination.totalPages }, (_, i) => i + 1).map(page => (
                        <PaginationButton 
                          key={page}
                          active={page === notificationsPage}
                          onClick={() => handleNotificationsPageChange(page)}
                        >
                          {page}
                        </PaginationButton>
                      ))}
                      
                      <PaginationButton 
                        onClick={() => handleNotificationsPageChange(notificationsPage + 1)}
                        disabled={notificationsPage === notifications.pagination.totalPages}
                      >
                        Next
                      </PaginationButton>
                    </PaginationContainer>
                  )}
                </Card>
              </TabContent>
            </div>
          </DashboardGrid>
        )}
        
        {/* Real-time notification */}
        {realTimeNotification && (
          <RealTimeNotification type={realTimeNotification.type}>
            <CloseButton onClick={dismissRealTimeNotification}>×</CloseButton>
            <NotificationHeader>
              <NotificationIcon type={realTimeNotification.type}>
                {getNotificationIcon(realTimeNotification.type)}
              </NotificationIcon>
              <NotificationTitle type={realTimeNotification.type}>
                {realTimeNotification.title}
              </NotificationTitle>
            </NotificationHeader>
            <NotificationMessage>
              {realTimeNotification.message}
            </NotificationMessage>
            <NotificationTime>
              Just now
            </NotificationTime>
          </RealTimeNotification>
        )}
      </MainContent>
      
      <Footer />
    </PageContainer>
  );
};

export default EnhancedDashboard;
