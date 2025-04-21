import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.mtnLight};
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.bridgetunesDark};
  margin: 0;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const TabsContainer = styled.div`
  margin-bottom: 2rem;
  border-bottom: 1px solid ${props => props.theme.colors.gray200};
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
  font-size: 0.875rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.active ? props.theme.colors.bridgetunesDark : props.theme.colors.gray500};
  background: transparent;
  border: none;
  border-bottom: 2px solid ${props => props.active ? props.theme.colors.mtnYellow : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${props => props.active ? props.theme.colors.bridgetunesDark : props.theme.colors.gray700};
    border-bottom-color: ${props => props.active ? props.theme.colors.mtnYellow : props.theme.colors.gray300};
  }
`;

// ... [rest of the styled components] ...

// Mock data for user segments
const mockSegments = [
  {
    id: 1,
    name: 'High Value Users',
    description: 'Users with total recharge amount over ₦5,000',
    userCount: 2345,
    criteria: {
      totalRecharge: { min: 5000 },
      optInStatus: true
    },
    createdAt: '2025-04-10'
  },
  // ... [rest of the mock segments] ...
];

// Mock data for notification templates
const mockTemplates = [
  {
    id: 1,
    name: 'Recharge Confirmation',
    type: 'sms',
    content: 'Thank you for recharging ₦{{amount}}. You have earned {{points}} points for the MyNumba Don Win promotion!',
    variables: ['amount', 'points'],
    createdAt: '2025-04-05'
  },
  // ... [rest of the mock templates] ...
];

// Mock data for notification campaigns
const mockCampaigns = [
  {
    id: 1,
    name: 'Weekend Draw Reminder',
    segmentId: 4,
    templateId: 2,
    status: 'scheduled',
    scheduledDate: '2025-04-20T10:00:00',
    recurrence: 'weekly',
    createdAt: '2025-04-15'
  },
  // ... [rest of the mock campaigns] ...
];

// Mock data for notification logs
const mockNotificationLogs = [
  {
    id: 1,
    campaignId: 3,
    msisdn: '08012345678',
    status: 'delivered',
    sentAt: '2025-04-14T12:05:23',
    deliveredAt: '2025-04-14T12:05:25'
  },
  // ... [rest of the mock logs] ...
];

export default function NotificationManagement() {
  const [activeTab, setActiveTab] = useState('segments');
  const [segments, setSegments] = useState(mockSegments);
  const [templates, setTemplates] = useState(mockTemplates);
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [logs, setLogs] = useState(mockNotificationLogs);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Form states
  const [segmentForm, setSegmentForm] = useState({
    name: '',
    description: '',
    criteria: {
      totalRecharge: { min: '', max: '' },
      lastRecharge: { before: '', after: '' },
      optInDate: { from: '', to: '' },
      optInStatus: true,
      rechargePattern: ''
    }
  });
  
  // ... [rest of the component code] ...

  return (
    <PageContainer>
      <Head>
        <title>Notification Management | MyNumba Don Win</title>
        <meta name="description" content="Manage notifications for MyNumba Don Win promotion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <MainContent>
        {/* ... [rest of the JSX] ... */}
      </MainContent>

      {/* Footer */}
      <Footer />
    </PageContainer>
  );
}
