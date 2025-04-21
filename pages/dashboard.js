import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DashboardService from '../services/DashboardService';

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

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.bridgetunesDark};
  text-align: center;
  margin-bottom: 2rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 3rem;
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr 3fr;
  }
`;

const SidebarCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  height: fit-content;
`;

const UserInfo = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.gray200};
`;

const UserAvatar = styled.div`
  width: 80px;
  height: 80px;
  background-color: ${props => props.theme.colors.mtnYellow};
  color: ${props => props.theme.colors.mtnBlack};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  margin: 0 auto 1rem;
`;

const UserName = styled.h2`
  font-size: 1.25rem;
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.bridgetunesDark};
  margin-bottom: 0.5rem;
`;

const UserMsisdn = styled.p`
  color: ${props => props.theme.colors.gray600};
  margin-bottom: 1rem;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.375rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background-color: ${props => props.theme.colors.green100};
  color: ${props => props.theme.colors.green800};
`;

const UserStats = styled.div``;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.gray100};
  
  &:last-child {
    border-bottom: none;
  }
`;

const StatLabel = styled.span`
  color: ${props => props.theme.colors.gray600};
`;

const StatValue = styled.span`
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.bridgetunesDark};
`;

const MainCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 2px solid ${props => props.theme.colors.gray200};
  margin-bottom: 1.5rem;
`;

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.active ? props.theme.colors.bridgetunesBlue : props.theme.colors.gray600};
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.active ? props.theme.colors.bridgetunesBlue : 'transparent'};
  margin-bottom: -2px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${props => props.theme.colors.bridgetunesBlue};
  }
`;

const TabContent = styled.div`
  display: ${props => props.active ? 'block' : 'none'};
`;

const EntriesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: ${props => props.theme.colors.gray50};
`;

const TableHeadCell = styled.th`
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.gray700};
  font-size: 0.875rem;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid ${props => props.theme.colors.gray100};
  
  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 0.75rem 1rem;
  color: ${props => props.theme.colors.gray700};
  font-size: 0.875rem;
`;

const AmountCell = styled(TableCell)`
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.green600};
`;

const PointsCell = styled(TableCell)`
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.bridgetunesBlue};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  border: 1px solid ${props => props.active ? props.theme.colors.bridgetunesBlue : props.theme.colors.gray300};
  border-radius: 0.375rem;
  background-color: ${props => props.active ? props.theme.colors.bridgetunesBlue : 'white'};
  color: ${props => props.active ? 'white' : props.theme.colors.gray700};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  
  &:hover:not(:disabled) {
    background-color: ${props => props.active ? props.theme.colors.bridgetunesBlue : props.theme.colors.gray100};
  }
`;

const NotificationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NotificationItem = styled.div`
  display: flex;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${props => props.unread ? props.theme.colors.blue50 : props.theme.colors.gray50};
  border-left: 3px solid ${props => {
    switch(props.type) {
      case 'draw_announcement': return props.theme.colors.purple500;
      case 'recharge_confirmation': return props.theme.colors.green500;
      case 'win_notification': return props.theme.colors.yellow500;
      default: return props.theme.colors.gray500;
    }
  }};
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
    switch(props.type) {
      case 'draw_announcement': return props.theme.colors.purple100;
      case 'recharge_confirmation': return props.theme.colors.green100;
      case 'win_notification': return props.theme.colors.yellow100;
      default: return props.theme.colors.gray100;
    }
  }};
  color: ${props => {
    switch(props.type) {
      case 'draw_announcement': return props.theme.colors.purple700;
      case 'recharge_confirmation': return props.theme.colors.green700;
      case 'win_notification': return props.theme.colors.yellow700;
      default: return props.theme.colors.gray700;
    }
  }};
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const NotificationTitle = styled.h3`
  font-size: 1rem;
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.bridgetunesDark};
`;

const NotificationDate = styled.span`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.gray500};
`;

const NotificationMessage = styled.p`
  color: ${props => props.theme.colors.gray700};
  font-size: 0.875rem;
  line-height: 1.5;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const RealTimeNotification = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 350px;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  padding: 1rem;
  z-index: 100;
  animation: slideIn 0.3s ease-out;
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: none;
  border: none;
  color: ${props => props.theme.colors.gray500};
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.gray700};
  }
`;

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

// Helper function to format time
const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
};

// Helper function to format relative time
const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  
  if (diffSec < 60) {
    return 'Just now';
  } else if (diffMin < 60) {
    return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
  } else if (diffHour < 24) {
    return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
  } else if (diffDay < 7) {
    return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
  } else {
    return formatDate(dateString);
  }
};

// Helper function to format currency
const formatCurrency = (amount) => {
  return '₦' + amount.toLocaleString();
};

// Dashboard component
export default function Dashboard() {
  // User state
  const [msisdn, setMsisdn] = useState('08012345678'); // Would come from auth in real app
  const [userAccount, setUserAccount] = useState(null);
  
  // Tabs state
  const [activeTab, setActiveTab] = useState('entries');
  
  // Entries state
  const [entries, setEntries] = useState([]);
  const [entriesPage, setEntriesPage] = useState(1);
  const [entriesPagination, setEntriesPagination] = useState(null);
  
  // Notifications state
  const [notifications, setNotifications] = useState([]);
  const [notificationsPage, setNotificationsPage] = useState(1);
  const [notificationsPagination, setNotificationsPagination] = useState(null);
  
  // Real-time notification state
  const [realTimeNotification, setRealTimeNotification] = useState(null);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  
  // Load user account data
  useEffect(() => {
    const loadUserAccount = async () => {
      try {
        const account = await DashboardService.getUserAccount(msisdn);
        setUserAccount(account);
      } catch (error) {
        console.error('Error loading user account:', error);
      }
    };
    
    loadUserAccount();
  }, [msisdn]);
  
  // Load entries data
  useEffect(() => {
    const loadEntries = async () => {
      setIsLoading(true);
      try {
        const result = await DashboardService.getUserEntries(msisdn, entriesPage);
        setEntries(result.entries);
        setEntriesPagination(result.pagination);
      } catch (error) {
        console.error('Error loading entries:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadEntries();
  }, [msisdn, entriesPage]);
  
  // Load notifications data
  useEffect(() => {
    const loadNotifications = async () => {
      setIsLoading(true);
      try {
        const result = await DashboardService.getUserNotifications(msisdn, notificationsPage);
        setNotifications(result.notifications);
        setNotificationsPagination(result.pagination);
      } catch (error) {
        console.error('Error loading notifications:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (activeTab === 'notifications') {
      loadNotifications();
    }
  }, [msisdn, notificationsPage, activeTab]);
  
  // Check for real-time notifications
  useEffect(() => {
    const checkRealTimeNotifications = async () => {
      try {
        const result = await DashboardService.checkRealTimeNotifications(msisdn);
        if (result.hasNotification) {
          setRealTimeNotification(result.notification);
          
          // Auto-dismiss after 5 seconds
          setTimeout(() => {
            setRealTimeNotification(null);
          }, 5000);
        }
      } catch (error) {
        console.error('Error checking real-time notifications:', error);
      }
    };
    
    // Check every 30 seconds
    const interval = setInterval(checkRealTimeNotifications, 30000);
    
    // Initial check
    checkRealTimeNotifications();
    
    return () => clearInterval(interval);
  }, [msisdn]);
  
  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  // Handle entries pagination
  const handleEntriesPageChange = (page) => {
    setEntriesPage(page);
  };
  
  // Handle notifications pagination
  const handleNotificationsPageChange = (page) => {
    setNotificationsPage(page);
  };
  
  // Handle notification read
  const handleNotificationRead = async (notificationId) => {
    try {
      await DashboardService.markNotificationAsRead(notificationId);
      
      // Update local state
      setNotifications(notifications.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true } 
          : notification
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };
  
  // Handle real-time notification dismiss
  const handleDismissRealTimeNotification = () => {
    setRealTimeNotification(null);
  };
  
  // Render notification icon based on type
  const renderNotificationIcon = (type) => {
    switch (type) {
      case 'draw_announcement':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) ;
      case 'recharge_confirmation':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1 10H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) ;
      case 'win_notification':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) ;
      default:
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) ;
    }
  };

  return (
    <PageContainer>
      <Head>
        <title>My Dashboard | MyNumba Don Win | Bridgetunes</title>
        <meta name="description" content="Track your entries and chances in the MyNumba Don Win promotion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <MainContent>
        <PageTitle>My Dashboard</PageTitle>
        
        <DashboardGrid>
          {/* Sidebar */}
          <SidebarCard>
            {userAccount ? (
              <>
                <UserInfo>
                  <UserAvatar>{userAccount.name.charAt(0)}</UserAvatar>
                  <UserName>{userAccount.name}</UserName>
                  <UserMsisdn>{userAccount.msisdn}</UserMsisdn>
                  <StatusBadge>{userAccount.status}</StatusBadge>
                </UserInfo>
                
                <UserStats>
                  <StatItem>
                    <StatLabel>Opted In</StatLabel>
                    <StatValue>{userAccount.optedIn ? 'Yes' : 'No'}</StatValue>
                  </StatItem>
                  <StatItem>
                    <StatLabel>Opt-In Date</StatLabel>
                    <StatValue>{userAccount.optInDate}</StatValue>
                  </StatItem>
                  <StatItem>
                    <StatLabel>Total Topups</StatLabel>
                    <StatValue>{userAccount.totalTopups}</StatValue>
                  </StatItem>
                  <StatItem>
                    <StatLabel>Total Amount</StatLabel>
                    <StatValue>{formatCurrency(userAccount.totalAmount)}</StatValue>
                  </StatItem>
                  <StatItem>
                    <StatLabel>Eligible Draws</StatLabel>
                    <StatValue>{userAccount.eligibleDraws}</StatValue>
                  </StatItem>
                </UserStats>
              </>
            ) : (
              <LoadingSpinner>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 12 12"
                      to="360 12 12"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </path>
                  <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 12 12"
                      to="360 12 12"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </path>
                  <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 12 12"
                      to="360 12 12"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </path>
                  <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 12 12"
                      to="360 12 12"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </path>
                  <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 12 12"
                      to="360 12 12"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </path>
                  <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 12 12"
                      to="360 12 12"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </path>
                  <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 12 12"
                      to="360 12 12"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </path>
                  <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 12 12"
                      to="360 12 12"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </path>
                </svg>
              </LoadingSpinner>
            ) }
          </SidebarCard>
          
          {/* Main Content */}
          <MainCard>
            <TabsContainer>
              <Tab 
                active={activeTab === 'entries'} 
                onClick={() => handleTabChange('entries')}
              >
                My Entries
              </Tab>
              <Tab 
                active={activeTab === 'notifications'} 
                onClick={() => handleTabChange('notifications')}
              >
                Notifications
              </Tab>
            </TabsContainer>
            
            {/* Entries Tab */}
            <TabContent active={activeTab === 'entries'}>
              {isLoading ? (
                <LoadingSpinner>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 12 12"
                        to="360 12 12"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </path>
                    <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 12 12"
                        to="360 12 12"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </path>
                    <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 12 12"
                        to="360 12 12"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </path>
                    <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 12 12"
                        to="360 12 12"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </path>
                    <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 12 12"
                        to="360 12 12"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </path>
                    <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 12 12"
                        to="360 12 12"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </path>
                    <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 12 12"
                        to="360 12 12"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </path>
                    <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 12 12"
                        to="360 12 12"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </svg>
                </LoadingSpinner>
              )  : (
                <>
                  <EntriesTable>
                    <TableHead>
                      <tr>
                        <TableHeadCell>Date</TableHeadCell>
                        <TableHeadCell>Time</TableHeadCell>
                        <TableHeadCell>Amount</TableHeadCell>
                        <TableHeadCell>Points</TableHeadCell>
                        <TableHeadCell>Eligible Draws</TableHeadCell>
                      </tr>
                    </TableHead>
                    <TableBody>
                      {entries.map(entry => (
                        <TableRow key={entry.id}>
                          <TableCell>{entry.date}</TableCell>
                          <TableCell>{entry.time}</TableCell>
                          <AmountCell>{formatCurrency(entry.amount)}</AmountCell>
                          <PointsCell>{entry.points}</PointsCell>
                          <TableCell>{entry.eligibleDraws.join(', ')}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </EntriesTable>
                  
                  {entriesPagination && (
                    <Pagination>
                      <PaginationButton
                        onClick={() => handleEntriesPageChange(entriesPagination.page - 1)}
                        disabled={entriesPagination.page === 1}
                      >
                        Previous
                      </PaginationButton>
                      
                      {Array.from({ length: entriesPagination.totalPages }, (_, i) => i + 1).map(page => (
                        <PaginationButton
                          key={page}
                          active={page === entriesPagination.page}
                          onClick={() => handleEntriesPageChange(page)}
                        >
                          {page}
                        </PaginationButton>
                      ))}
                      
                      <PaginationButton
                        onClick={() => handleEntriesPageChange(entriesPagination.page + 1)}
                        disabled={entriesPagination.page === entriesPagination.totalPages}
                      >
                        Next
                      </PaginationButton>
                    </Pagination>
                  )}
                </>
              )}
            </TabContent>
            
            {/* Notifications Tab */}
            <TabContent active={activeTab === 'notifications'}>
              {isLoading ? (
                <LoadingSpinner>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 12 12"
                        to="360 12 12"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </path>
                    <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 12 12"
                        to="360 12 12"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </path>
                    <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 12 12"
                        to="360 12 12"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </path>
                    <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 12 12"
                        to="360 12 12"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </path>
                    <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 12 12"
                        to="360 12 12"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </path>
                    <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 12 12"
                        to="360 12 12"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </path>
                    <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 12 12"
                        to="360 12 12"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </path>
                    <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 12 12"
                        to="360 12 12"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </svg>
                </LoadingSpinner>
              )  : (
                <>
                  <NotificationsList>
                    {notifications.map(notification => (
                      <NotificationItem 
                        key={notification.id} 
                        unread={!notification.read}
                        type={notification.type}
                        onClick={() => !notification.read && handleNotificationRead(notification.id)}
                      >
                        <NotificationIcon type={notification.type}>
                          {renderNotificationIcon(notification.type)}
                        </NotificationIcon>
                        <NotificationContent>
                          <NotificationHeader>
                            <NotificationTitle>{notification.title}</NotificationTitle>
                            <NotificationDate>{formatRelativeTime(notification.date)}</NotificationDate>
                          </NotificationHeader>
                          <NotificationMessage>{notification.message}</NotificationMessage>
                        </NotificationContent>
                      </NotificationItem>
                    ))}
                  </NotificationsList>
                  
                  {notificationsPagination && (
                    <Pagination>
                      <PaginationButton
                        onClick={() => handleNotificationsPageChange(notificationsPagination.page - 1)}
                        disabled={notificationsPagination.page === 1}
                      >
                        Previous
                      </PaginationButton>
                      
                      {Array.from({ length: notificationsPagination.totalPages }, (_, i) => i + 1).map(page => (
                        <PaginationButton
                          key={page}
                          active={page === notificationsPagination.page}
                          onClick={() => handleNotificationsPageChange(page)}
                        >
                          {page}
                        </PaginationButton>
                      ))}
                      
                      <PaginationButton
                        onClick={() => handleNotificationsPageChange(notificationsPagination.page + 1)}
                        disabled={notificationsPagination.page === notificationsPagination.totalPages}
                      >
                        Next
                      </PaginationButton>
                    </Pagination>
                  )}
                </>
              )}
            </TabContent>
          </MainCard>
        </DashboardGrid>
      </MainContent>
      
      {/* Real-time notification */}
      {realTimeNotification && (
        <RealTimeNotification>
          <CloseButton onClick={handleDismissRealTimeNotification}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </CloseButton>
          <NotificationItem 
            unread={true}
            type={realTimeNotification.type}
          >
            <NotificationIcon type={realTimeNotification.type}>
              {renderNotificationIcon(realTimeNotification.type) }
            </NotificationIcon>
            <NotificationContent>
              <NotificationHeader>
                <NotificationTitle>{realTimeNotification.title}</NotificationTitle>
                <NotificationDate>Just now</NotificationDate>
              </NotificationHeader>
              <NotificationMessage>{realTimeNotification.message}</NotificationMessage>
            </NotificationContent>
          </NotificationItem>
        </RealTimeNotification>
      )}

      {/* Footer */}
      <Footer />
    </PageContainer>
  );
}
