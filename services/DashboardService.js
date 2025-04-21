import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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
  font-size: 3rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.bridgetunesDark};
  text-align: center;
  margin-bottom: 2rem;
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
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${props => props.theme.colors.mtnYellow};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: white;
  margin-bottom: 1rem;
`;

const UserName = styled.h2`
  font-size: 1.5rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.bridgetunesDark};
  margin-bottom: 0.5rem;
`;

const PhoneNumber = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.mtnGray};
  margin-bottom: 1rem;
`;

const StatusBadge = styled.div`
  background-color: ${props => props.theme.colors.mtnGreen};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  margin-bottom: 1.5rem;
`;

const ProfileInfo = styled.div`
  width: 100%;
  margin-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.mtnLightGray};
  padding-top: 1rem;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const InfoLabel = styled.span`
  color: ${props => props.theme.colors.mtnGray};
`;

const InfoValue = styled.span`
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.bridgetunesDark};
`;

const ContentCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.mtnLightGray};
  margin-bottom: 1.5rem;
`;

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.active ? props.theme.colors.mtnBlue : props.theme.colors.mtnGray};
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.active ? props.theme.colors.mtnBlue : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${props => props.theme.colors.mtnBlue};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  border-bottom: 1px solid ${props => props.theme.colors.mtnLightGray};
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 0.75rem 0.5rem;
  color: ${props => props.theme.colors.mtnGray};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid ${props => props.theme.colors.mtnLightGray};
  
  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 0.75rem 0.5rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  background-color: ${props => props.active ? props.theme.colors.mtnBlue : 'white'};
  color: ${props => props.active ? 'white' : props.theme.colors.mtnGray};
  border: 1px solid ${props => props.active ? props.theme.colors.mtnBlue : props.theme.colors.mtnLightGray};
  border-radius: 0.25rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  
  &:hover:not(:disabled) {
    background-color: ${props => props.active ? props.theme.colors.mtnBlue : props.theme.colors.mtnLightGray};
  }
`;

const NotificationItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.mtnLightGray};
  
  &:last-child {
    border-bottom: none;
  }
`;

const NotificationTitle = styled.h3`
  font-size: 1rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: 0.5rem;
`;

const NotificationMessage = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.mtnGray};
  margin-bottom: 0.5rem;
`;

const NotificationMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: ${props => props.theme.colors.mtnLightGray};
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  
  &:after {
    content: '';
    width: 40px;
    height: 40px;
    border: 4px solid ${props => props.theme.colors.mtnLightGray};
    border-top: 4px solid ${props => props.theme.colors.mtnBlue};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default function Dashboard() {
  const [msisdn, setMsisdn] = useState('08012345678');
  const [userAccount, setUserAccount] = useState(null);
  const [activeTab, setActiveTab] = useState('entries');
  const [entries, setEntries] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [entriesPage, setEntriesPage] = useState(1);
  const [notificationsPage, setNotificationsPage] = useState(1);
  const [entriesPagination, setEntriesPagination] = useState({
    currentPage: 1,
    totalPages: 1
  });
  const [notificationsPagination, setNotificationsPagination] = useState({
    currentPage: 1,
    totalPages: 1
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load user account data
  useEffect(() => {
    const loadUserAccount = async () => {
      try {
        const accountData = await DashboardService.getUserAccount(msisdn);
        setUserAccount(accountData);
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
        const entriesData = await DashboardService.getUserEntries(msisdn, entriesPage);
        setEntries(entriesData.entries);
        setEntriesPagination({
          currentPage: entriesData.currentPage,
          totalPages: entriesData.totalPages
        });
      } catch (error) {
        console.error('Error loading entries:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (activeTab === 'entries') {
      loadEntries();
    }
  }, [msisdn, entriesPage, activeTab]);

  // Load notifications data
  useEffect(() => {
    const loadNotifications = async () => {
      setIsLoading(true);
      try {
        const notificationsData = await DashboardService.getUserNotifications(msisdn, notificationsPage);
        setNotifications(notificationsData.notifications);
        setNotificationsPagination({
          currentPage: notificationsData.currentPage,
          totalPages: notificationsData.totalPages
        });
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

  // Format currency
  const formatCurrency = (amount) => {
    return `₦${amount.toLocaleString()}`;
  };

  // Get user initials
  const getUserInitials = () => {
    if (!userAccount || !userAccount.name) return '';
    
    const nameParts = userAccount.name.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`;
    }
    
    return nameParts[0][0];
  };

  return (
    <PageContainer>
      <Header />
      
      <MainContent>
        <PageTitle>My Dashboard</PageTitle>
        
        <DashboardGrid>
          {/* User Profile Card */}
          <ProfileCard>
            <Avatar>{userAccount ? getUserInitials() : 'J'}</Avatar>
            <UserName>{userAccount ? userAccount.name : 'John Doe'}</UserName>
            <PhoneNumber>{msisdn}</PhoneNumber>
            <StatusBadge>ACTIVE</StatusBadge>
            
            <ProfileInfo>
              <InfoRow>
                <InfoLabel>Opted In</InfoLabel>
                <InfoValue>{userAccount ? (userAccount.optedIn ? 'Yes' : 'No') : 'Yes'}</InfoValue>
              </InfoRow>
              
              <InfoRow>
                <InfoLabel>Opt-In Date</InfoLabel>
                <InfoValue>{userAccount ? userAccount.optInDate : '2025-04-01'}</InfoValue>
              </InfoRow>
              
              <InfoRow>
                <InfoLabel>Total Topups</InfoLabel>
                <InfoValue>{userAccount ? userAccount.totalTopups : 15}</InfoValue>
              </InfoRow>
              
              <InfoRow>
                <InfoLabel>Total Amount</InfoLabel>
                <InfoValue>{userAccount ? formatCurrency(userAccount.totalAmount) : '₦7,500'}</InfoValue>
              </InfoRow>
              
              <InfoRow>
                <InfoLabel>Eligible Draws</InfoLabel>
                <InfoValue>{userAccount ? userAccount.eligibleDraws : 12}</InfoValue>
              </InfoRow>
            </ProfileInfo>
          </ProfileCard>
          
          {/* Content Card */}
          <ContentCard>
            <TabsContainer>
              <Tab 
                active={activeTab === 'entries'} 
                onClick={() => setActiveTab('entries')}
              >
                My Entries
              </Tab>
              <Tab 
                active={activeTab === 'notifications'} 
                onClick={() => setActiveTab('notifications')}
              >
                Notifications
              </Tab>
            </TabsContainer>
            
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                {/* Entries Tab */}
                {activeTab === 'entries' && (
                  <>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableHeader>Date</TableHeader>
                          <TableHeader>Time</TableHeader>
                          <TableHeader>Amount</TableHeader>
                          <TableHeader>Points</TableHeader>
                          <TableHeader>Eligible Draws</TableHeader>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {entries.map(entry => (
                          <TableRow key={entry.id}>
                            <TableCell>{entry.date}</TableCell>
                            <TableCell>{entry.time}</TableCell>
                            <TableCell>₦{entry.amount}</TableCell>
                            <TableCell>{entry.points}</TableCell>
                            <TableCell>{entry.drawId}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    <Pagination>
                      <PaginationButton 
                        disabled={entriesPagination.currentPage <= 1}
                        onClick={() => setEntriesPage(entriesPagination.currentPage - 1)}
                      >
                        Previous
                      </PaginationButton>
                      
                      {Array.from({ length: entriesPagination.totalPages }, (_, i) => i + 1).map(page => (
                        <PaginationButton 
                          key={page}
                          active={page === entriesPagination.currentPage}
                          onClick={() => setEntriesPage(page)}
                        >
                          {page}
                        </PaginationButton>
                      ))}
                      
                      <PaginationButton 
                        disabled={entriesPagination.currentPage >= entriesPagination.totalPages}
                        onClick={() => setEntriesPage(entriesPagination.currentPage + 1)}
                      >
                        Next
                      </PaginationButton>
                    </Pagination>
                  </>
                )}
                
                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <>
                    {notifications.map(notification => (
                      <NotificationItem key={notification.id}>
                        <NotificationTitle>{notification.title}</NotificationTitle>
                        <NotificationMessage>{notification.message}</NotificationMessage>
                        <NotificationMeta>
                          <span>{notification.date} {notification.time}</span>
                          <span>{notification.read ? 'Read' : 'Unread'}</span>
                        </NotificationMeta>
                      </NotificationItem>
                    ))}
                    
                    <Pagination>
                      <PaginationButton 
                        disabled={notificationsPagination.currentPage <= 1}
                        onClick={() => setNotificationsPage(notificationsPagination.currentPage - 1)}
                      >
                        Previous
                      </PaginationButton>
                      
                      {Array.from({ length: notificationsPagination.totalPages }, (_, i) => i + 1).map(page => (
                        <PaginationButton 
                          key={page}
                          active={page === notificationsPagination.currentPage}
                          onClick={() => setNotificationsPage(page)}
                        >
                          {page}
                        </PaginationButton>
                      ))}
                      
                      <PaginationButton 
                        disabled={notificationsPagination.currentPage >= notificationsPagination.totalPages}
                        onClick={() => setNotificationsPage(notificationsPagination.currentPage + 1)}
                      >
                        Next
                      </PaginationButton>
                    </Pagination>
                  </>
                )}
              </>
            )}
          </ContentCard>
        </DashboardGrid>
      </MainContent>
      
      <Footer />
    </PageContainer>
  );
}


