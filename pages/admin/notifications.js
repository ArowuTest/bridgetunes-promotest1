import React, { useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
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

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.bridgetunesDark};
  margin-bottom: 2rem;
  text-align: center;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 2rem;
  overflow-x: auto;
`;

const Tab = styled.button`
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#f59e0b' : 'transparent'};
  color: ${props => props.active ? '#1f2937' : '#6b7280'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    color: #1f2937;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  background-color: ${props => props.primary ? '#0056b3' : 'white'};
  color: ${props => props.primary ? 'white' : '#333'};
  border: 1px solid ${props => props.primary ? '#0056b3' : '#d1d5db'};
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.primary ? '#003d7a' : '#f3f4f6'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const SegmentCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  background: white;
`;

const SegmentTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const SegmentDescription = styled.p`
  color: #6b7280;
  margin-bottom: 1rem;
  font-size: 0.875rem;
`;

const SegmentStats = styled.div`
  display: flex;
  margin-bottom: 1rem;
  gap: 1rem;
`;

const StatItem = styled.div`
  flex: 1;
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
`;

const StatValue = styled.div`
  font-size: 1.125rem;
  font-weight: bold;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  width: 100%;
  max-width: 300px;
`;

// Mock data
const mockSegments = [
  {
    id: 1,
    name: 'High Value Users',
    description: 'Users with total recharge amount over ₦5,000',
    userCount: 2345,
    createdAt: '2025-04-10'
  },
  {
    id: 2,
    name: 'Recent Opt-ins',
    description: 'Users who opted in within the last 7 days',
    userCount: 876,
    createdAt: '2025-04-12'
  },
  {
    id: 3,
    name: 'Inactive Users',
    description: 'Users with no recharge in the last 14 days',
    userCount: 1543,
    createdAt: '2025-04-14'
  },
  {
    id: 4,
    name: 'Weekend Rechargers',
    description: 'Users who typically recharge on weekends',
    userCount: 3210,
    createdAt: '2025-04-15'
  }
];

const mockTemplates = [
  {
    id: 1,
    name: 'Recharge Confirmation',
    type: 'SMS',
    content: 'Thank you for recharging ₦{{amount}}. You have earned {{points}} points for the MyNumba Don Win promotion!'
  },
  {
    id: 2,
    name: 'Draw Announcement',
    type: 'SMS',
    content: 'The MyNumba Don Win draw will take place today at 8:00 PM. Make sure you have recharged to be eligible!'
  },
  {
    id: 3,
    name: 'Win Notification',
    type: 'SMS',
    content: 'Congratulations! You have won {{prize}} in the MyNumba Don Win promotion. Your prize will be processed within 48 hours.'
  }
];

const mockCampaigns = [
  {
    id: 1,
    name: 'Weekend Draw Reminder',
    segment: 'Weekend Rechargers',
    template: 'Draw Announcement',
    status: 'Scheduled',
    scheduledDate: '2025-04-20'
  },
  {
    id: 2,
    name: 'Inactive User Re-engagement',
    segment: 'Inactive Users',
    template: 'Recharge Confirmation',
    status: 'Active',
    scheduledDate: '2025-04-16'
  }
];

const NotificationManagement = () => {
  const [activeTab, setActiveTab] = useState('segments');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter data based on search term
  const filteredSegments = mockSegments.filter(segment => 
    segment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    segment.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <PageContainer>
      <Head>
        <title>Notification Management | MyNumba Don Win</title>
        <meta name="description" content="Manage notifications for MyNumba Don Win promotion" />
      </Head>

      <Header />

      <MainContent>
        <PageTitle>Notification Management</PageTitle>
        
        <TabsContainer>
          <Tab 
            active={activeTab === 'segments'} 
            onClick={() => setActiveTab('segments')}
          >
            User Segments
          </Tab>
          <Tab 
            active={activeTab === 'templates'} 
            onClick={() => setActiveTab('templates')}
          >
            Notification Templates
          </Tab>
          <Tab 
            active={activeTab === 'campaigns'} 
            onClick={() => setActiveTab('campaigns')}
          >
            Campaigns
          </Tab>
          <Tab 
            active={activeTab === 'logs'} 
            onClick={() => setActiveTab('logs')}
          >
            Notification Logs
          </Tab>
          <Tab 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')}
          >
            API Settings
          </Tab>
        </TabsContainer>
        
        {activeTab === 'segments' && (
          <>
            <Card>
              <CardTitle>
                User Segments
                <Button primary>Create Segment</Button>
              </CardTitle>
              
              <SearchInput 
                type="text" 
                placeholder="Search segments..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              <Grid>
                {filteredSegments.map(segment => (
                  <SegmentCard key={segment.id}>
                    <SegmentTitle>{segment.name}</SegmentTitle>
                    <SegmentDescription>{segment.description}</SegmentDescription>
                    
                    <SegmentStats>
                      <StatItem>
                        <StatLabel>Users</StatLabel>
                        <StatValue>{segment.userCount.toLocaleString()}</StatValue>
                      </StatItem>
                      <StatItem>
                        <StatLabel>Created</StatLabel>
                        <StatValue>{formatDate(segment.createdAt)}</StatValue>
                      </StatItem>
                    </SegmentStats>
                    
                    <ButtonGroup>
                      <Button>Edit</Button>
                      <Button primary>Create Campaign</Button>
                    </ButtonGroup>
                  </SegmentCard>
                ))}
              </Grid>
            </Card>
          </>
        )}
        
        {activeTab === 'templates' && (
          <Card>
            <CardTitle>
              Notification Templates
              <Button primary>Create Template</Button>
            </CardTitle>
            
            <Grid>
              {mockTemplates.map(template => (
                <SegmentCard key={template.id}>
                  <SegmentTitle>{template.name}</SegmentTitle>
                  <SegmentDescription>Type: {template.type}</SegmentDescription>
                  <div style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '0.25rem', marginBottom: '1rem' }}>
                    {template.content}
                  </div>
                  <ButtonGroup>
                    <Button>Edit</Button>
                    <Button primary>Use Template</Button>
                  </ButtonGroup>
                </SegmentCard>
              ))}
            </Grid>
          </Card>
        )}
        
        {activeTab === 'campaigns' && (
          <Card>
            <CardTitle>
              Notification Campaigns
              <Button primary>Create Campaign</Button>
            </CardTitle>
            
            <Grid>
              {mockCampaigns.map(campaign => (
                <SegmentCard key={campaign.id}>
                  <SegmentTitle>{campaign.name}</SegmentTitle>
                  <SegmentStats>
                    <StatItem>
                      <StatLabel>Segment</StatLabel>
                      <StatValue>{campaign.segment}</StatValue>
                    </StatItem>
                    <StatItem>
                      <StatLabel>Template</StatLabel>
                      <StatValue>{campaign.template}</StatValue>
                    </StatItem>
                  </SegmentStats>
                  <SegmentStats>
                    <StatItem>
                      <StatLabel>Status</StatLabel>
                      <StatValue>{campaign.status}</StatValue>
                    </StatItem>
                    <StatItem>
                      <StatLabel>Scheduled</StatLabel>
                      <StatValue>{formatDate(campaign.scheduledDate)}</StatValue>
                    </StatItem>
                  </SegmentStats>
                  <ButtonGroup>
                    <Button>Edit</Button>
                    {campaign.status === 'Scheduled' ? (
                      <Button primary>Start</Button>
                    ) : campaign.status === 'Active' ? (
                      <Button>Pause</Button>
                    ) : (
                      <Button primary>Resume</Button>
                    )}
                  </ButtonGroup>
                </SegmentCard>
              ))}
            </Grid>
          </Card>
        )}
        
        {activeTab === 'logs' && (
          <Card>
            <CardTitle>Notification Logs</CardTitle>
            <p>Notification delivery logs will appear here.</p>
          </Card>
        )}
        
        {activeTab === 'settings' && (
          <Card>
            <CardTitle>API Settings</CardTitle>
            <p>API configuration settings will appear here.</p>
          </Card>
        )}
      </MainContent>

      <Footer />
    </PageContainer>
  );
};

export default NotificationManagement;


