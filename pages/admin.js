import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const StatLabel = styled.h3`
  font-size: 0.875rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.gray500};
  margin-bottom: 0.25rem;
`;

const StatValue = styled.p`
  font-size: 1.875rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  margin: 0;
`;

const StatTrend = styled.p`
  font-size: 0.875rem;
  color: ${props => props.positive ? 'green' : props.theme.colors.gray600};
  margin-top: 0.5rem;
  margin-bottom: 0;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ChartCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
`;

const ChartTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: 1rem;
`;

const ChartContainer = styled.div`
  height: 240px;
  position: relative;
`;

const TablesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const TableCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
`;

const TableTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: 1rem;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: ${props => props.theme.colors.gray50};
`;

const TableHeadCell = styled.th`
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.gray500};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid ${props => props.theme.colors.gray200};
`;

const TableBody = styled.tbody`
  background-color: white;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: ${props => props.theme.colors.gray50};
  }
`;

const TableCell = styled.td`
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.gray700};
  border-bottom: 1px solid ${props => props.theme.colors.gray200};
  white-space: nowrap;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 16rem;
`;

const SpinnerAnimation = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 0.25rem solid ${props => props.theme.colors.gray200};
  border-top-color: ${props => props.theme.colors.mtnYellow};
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ContactButton = styled.button`
  background-color: ${props => props.theme.colors.bridgetunesBlue};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.theme.colors.bridgetunesDark};
  }
`;

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalTopups: 0,
    totalRevenue: 0,
    totalCommission: 0,
    drawsCompleted: 0,
    totalWinners: 0,
    totalPrizeAmount: 0
  });
  const [topupData, setTopupData] = useState([]);
  const [userGrowthData, setUserGrowthData] = useState([]);
  const [recentDraws, setRecentDraws] = useState([]);
  const [recentWinners, setRecentWinners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading dashboard data
  useEffect(() => {
    // Simulate API call delay
    const loadData = setTimeout(() => {
      // Generate mock dashboard stats
      setDashboardStats({
        totalUsers: 24567,
        activeUsers: 18934,
        totalTopups: 42891,
        totalRevenue: 15678900,
        totalCommission: 642350,
        drawsCompleted: 37,
        totalWinners: 523,
        totalPrizeAmount: 8750000
      });

      // Generate mock topup data
      const mockTopupData = [
        { amount: '₦0-₦199', count: 8765, commission: 43825 },
        { amount: '₦200-₦499', count: 12543, commission: 125430 },
        { amount: '₦500-₦999', count: 15672, commission: 235080 },
        { amount: '₦1000+', count: 5911, commission: 147775 }
      ];
      setTopupData(mockTopupData);

      // Generate mock user growth data
      const mockUserGrowthData = [
        { date: 'Apr 1', users: 15234 },
        { date: 'Apr 2', users: 16102 },
        { date: 'Apr 3', users: 17456 },
        { date: 'Apr 4', users: 18901 },
        { date: 'Apr 5', users: 20345 },
        { date: 'Apr 6', users: 21789 },
        { date: 'Apr 7', users: 22567 },
        { date: 'Apr 8', users: 23102 },
        { date: 'Apr 9', users: 23789 },
        { date: 'Apr 10', users: 24567 }
      ];
      setUserGrowthData(mockUserGrowthData);

      // Generate mock recent draws
      const mockRecentDraws = [
        { id: 'DRW-37', date: 'Apr 15, 2025', day: 'Monday', eligibleUsers: 4521, winners: 13, totalPrize: 2025000 },
        { id: 'DRW-36', date: 'Apr 14, 2025', day: 'Saturday', eligibleUsers: 18934, winners: 23, totalPrize: 5100000 },
        { id: 'DRW-35', date: 'Apr 13, 2025', day: 'Friday', eligibleUsers: 3876, winners: 13, totalPrize: 2025000 },
        { id: 'DRW-34', date: 'Apr 12, 2025', day: 'Thursday', eligibleUsers: 4102, winners: 13, totalPrize: 2025000 },
        { id: 'DRW-33', date: 'Apr 11, 2025', day: 'Wednesday', eligibleUsers: 3945, winners: 13, totalPrize: 2025000 }
      ];
      setRecentDraws(mockRecentDraws);

      // Generate mock recent winners with full unmasked MSISDNs
      const mockRecentWinners = [
        { id: 'WIN-523', msisdn: '2348012345634', fullMsisdn: '2348012345634', prize: 'Jackpot', amount: 1000000, drawId: 'DRW-37', date: 'Apr 15, 2025' },
        { id: 'WIN-522', msisdn: '2348123456721', fullMsisdn: '2348123456721', prize: '2nd Prize', amount: 350000, drawId: 'DRW-37', date: 'Apr 15, 2025' },
        { id: 'WIN-521', msisdn: '2348034567878', fullMsisdn: '2348034567878', prize: '3rd Prize', amount: 150000, drawId: 'DRW-37', date: 'Apr 15, 2025' },
        { id: 'WIN-520', msisdn: '2348145678945', fullMsisdn: '2348145678945', prize: 'Consolation', amount: 75000, drawId: 'DRW-37', date: 'Apr 15, 2025' },
        { id: 'WIN-519', msisdn: '2348056789012', fullMsisdn: '2348056789012', prize: 'Consolation', amount: 75000, drawId: 'DRW-37', date: 'Apr 15, 2025' },
        { id: 'WIN-518', msisdn: '2348167890167', fullMsisdn: '2348167890167', prize: 'Consolation', amount: 75000, drawId: 'DRW-37', date: 'Apr 15, 2025' },
        { id: 'WIN-517', msisdn: '2348078901289', fullMsisdn: '2348078901289', prize: 'Consolation', amount: 75000, drawId: 'DRW-37', date: 'Apr 15, 2025' },
        { id: 'WIN-516', msisdn: '2348189012323', fullMsisdn: '2348189012323', prize: 'Consolation', amount: 75000, drawId: 'DRW-37', date: 'Apr 15, 2025' },
        { id: 'WIN-515', msisdn: '2348090123467', fullMsisdn: '2348090123467', prize: 'Consolation', amount: 75000, drawId: 'DRW-37', date: 'Apr 15, 2025' },
        { id: 'WIN-514', msisdn: '2348101234589', fullMsisdn: '2348101234589', prize: 'Consolation', amount: 75000, drawId: 'DRW-37', date: 'Apr 15, 2025' },
        { id: 'WIN-513', msisdn: '2348112345667', fullMsisdn: '2348112345667', prize: 'Grand Prize', amount: 3000000, drawId: 'DRW-36', date: 'Apr 14, 2025' },
        { id: 'WIN-512', msisdn: '2348023456789', fullMsisdn: '2348023456789', prize: '2nd Prize', amount: 1000000, drawId: 'DRW-36', date: 'Apr 14, 2025' },
        { id: 'WIN-511', msisdn: '2348134567823', fullMsisdn: '2348134567823', prize: '3rd Prize', amount: 500000, drawId: 'DRW-36', date: 'Apr 14, 2025' }
      ];
      setRecentWinners(mockRecentWinners);

      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(loadData);
  }, []);

  // Prepare chart data
  const topupDistributionData = {
    labels: topupData.map(item => item.amount),
    datasets: [
      {
        label: 'Topup Distribution',
        data: topupData.map(item => item.count),
        backgroundColor: [
          'rgba(255, 204, 0, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(75, 192, 192, 0.8)'
        ],
        borderColor: [
          'rgba(255, 204, 0, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const userGrowthChartData = {
    labels: userGrowthData.map(item => item.date),
    datasets: [
      {
        label: 'Total Users',
        data: userGrowthData.map(item => item.users),
        backgroundColor: 'rgba(255, 204, 0, 0.5)',
        borderColor: 'rgba(255, 204, 0, 1)',
        borderWidth: 2,
      },
    ],
  };

  // Chart options with size constraints
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 12,
          padding: 10,
          font: {
            size: 11
          }
        }
      },
      title: {
        display: false
      }
    },
    cutout: '65%'
  };

  const userGrowthOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 12,
          padding: 10,
          font: {
            size: 11
          }
        }
      },
      title: {
        display: false
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          font: {
            size: 10
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: 10
          }
        }
      }
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return '₦' + amount.toLocaleString();
  };

  // Handle contact winner
  const handleContactWinner = (msisdn) => {
    alert(`Contacting winner with MSISDN: ${msisdn}`);
    // In a real implementation, this would open a modal or redirect to a contact form
  };

  return (
    <PageContainer>
      <Head>
        <title>Admin Dashboard | MyNumba Don Win</title>
        <meta name="description" content="Admin dashboard for MyNumba Don Win promotion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <MainContent>
        <PageHeader>
          <PageTitle>Admin Dashboard</PageTitle>
          <ButtonGroup>
            <button className="btn-secondary">Export Data</button>
            <button className="btn-primary">Refresh</button>
          </ButtonGroup>
        </PageHeader>

        {/* Dashboard Tabs */}
        <TabsContainer>
          <TabNav>
            <TabButton 
              active={activeTab === 'overview'} 
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </TabButton>
            <TabButton 
              active={activeTab === 'users'} 
              onClick={() => setActiveTab('users')}
            >
              Users
            </TabButton>
            <TabButton 
              active={activeTab === 'topups'} 
              onClick={() => setActiveTab('topups')}
            >
              Topups
            </TabButton>
            <TabButton 
              active={activeTab === 'draws'} 
              onClick={() => setActiveTab('draws')}
            >
              Draws
            </TabButton>
            <TabButton 
              active={activeTab === 'winners'} 
              onClick={() => setActiveTab('winners')}
            >
              Winners
            </TabButton>
          </TabNav>
        </TabsContainer>

        {isLoading ? (
          <LoadingSpinner>
            <SpinnerAnimation />
          </LoadingSpinner>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                {/* Stats Cards */}
                <StatsGrid>
                  <StatCard>
                    <StatLabel>Total Users</StatLabel>
                    <StatValue>{dashboardStats.totalUsers.toLocaleString()}</StatValue>
                    <StatTrend positive>
                      +{(dashboardStats.totalUsers - userGrowthData[0]?.users).toLocaleString()} since campaign start
                    </StatTrend>
                  </StatCard>
                  <StatCard>
                    <StatLabel>Total Topups</StatLabel>
                    <StatValue>{dashboardStats.totalTopups.toLocaleString()}</StatValue>
                    <StatTrend>
                      Avg {Math.round(dashboardStats.totalTopups / dashboardStats.totalUsers * 100) / 100} per user
                    </StatTrend>
                  </StatCard>
                  <StatCard>
                    <StatLabel>Total Commission</StatLabel>
                    <StatValue>{formatCurrency(dashboardStats.totalCommission)}</StatValue>
                    <StatTrend>
                      Avg {formatCurrency(Math.round(dashboardStats.totalCommission / dashboardStats.totalTopups))} per topup
                    </StatTrend>
                  </StatCard>
                  <StatCard>
                    <StatLabel>Total Prize Amount</StatLabel>
                    <StatValue>{formatCurrency(dashboardStats.totalPrizeAmount)}</StatValue>
                    <StatTrend>
                      {dashboardStats.totalWinners} winners across {dashboardStats.drawsCompleted} draws
                    </StatTrend>
                  </StatCard>
                </StatsGrid>

                {/* Charts */}
                <ChartsGrid>
                  <ChartCard>
                    <ChartTitle>Topup Distribution</ChartTitle>
                    <ChartContainer>
                      <Doughnut data={topupDistributionData} options={doughnutOptions} />
                    </ChartContainer>
                  </ChartCard>
                  <ChartCard>
                    <ChartTitle>User Growth Trend</ChartTitle>
                    <ChartContainer>
                      <Bar data={userGrowthChartData} options={userGrowthOptions} />
                    </ChartContainer>
                  </ChartCard>
                </ChartsGrid>

                {/* Tables */}
                <TablesGrid>
                  <TableCard>
                    <TableTitle>Recent Draws</TableTitle>
                    <TableWrapper>
                      <Table>
                        <TableHead>
                          <tr>
                            <TableHeadCell>Draw ID</TableHeadCell>
                            <TableHeadCell>Date</TableHeadCell>
                            <TableHeadCell>Day</TableHeadCell>
                            <TableHeadCell>Eligible Users</TableHeadCell>
                            <TableHeadCell>Winners</TableHeadCell>
                            <TableHeadCell>Total Prize</TableHeadCell>
                          </tr>
                        </TableHead>
                        <TableBody>
                          {recentDraws.map(draw => (
                            <TableRow key={draw.id}>
                              <TableCell>{draw.id}</TableCell>
                              <TableCell>{draw.date}</TableCell>
                              <TableCell>{draw.day}</TableCell>
                              <TableCell>{draw.eligibleUsers.toLocaleString()}</TableCell>
                              <TableCell>{draw.winners}</TableCell>
                              <TableCell>{formatCurrency(draw.totalPrize)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableWrapper>
                  </TableCard>
                  <TableCard>
                    <TableTitle>Recent Winners</TableTitle>
                    <TableWrapper>
                      <Table>
                        <TableHead>
                          <tr>
                            <TableHeadCell>Winner ID</TableHeadCell>
                            <TableHeadCell>MSISDN</TableHeadCell>
                            <TableHeadCell>Prize</TableHeadCell>
                            <TableHeadCell>Amount</TableHeadCell>
                            <TableHeadCell>Draw ID</TableHeadCell>
                            <TableHeadCell>Date</TableHeadCell>
                          </tr>
                        </TableHead>
                        <TableBody>
                          {recentWinners.slice(0, 5).map(winner => (
                            <TableRow key={winner.id}>
                              <TableCell>{winner.id}</TableCell>
                              <TableCell>{winner.msisdn.substring(0, 5) + '******' + winner.msisdn.substring(winner.msisdn.length - 2)}</TableCell>
                              <TableCell>{winner.prize}</TableCell>
                              <TableCell>{formatCurrency(winner.amount)}</TableCell>
                              <TableCell>{winner.drawId}</TableCell>
                              <TableCell>{winner.date}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableWrapper>
                  </TableCard>
                </TablesGrid>
              </div>
            )}

            {/* Winners Tab */}
            {activeTab === 'winners' && (
              <div>
                <TableCard>
                  <TableTitle>All Winners</TableTitle>
                  <TableWrapper>
                    <Table>
                      <TableHead>
                        <tr>
                          <TableHeadCell>Winner ID</TableHeadCell>
                          <TableHeadCell>MSISDN (Full)</TableHeadCell>
                          <TableHeadCell>Prize</TableHeadCell>
                          <TableHeadCell>Amount</TableHeadCell>
                          <TableHeadCell>Draw ID</TableHeadCell>
                          <TableHeadCell>Date</TableHeadCell>
                          <TableHeadCell>Actions</TableHeadCell>
                        </tr>
                      </TableHead>
                      <TableBody>
                        {recentWinners.map(winner => (
                          <TableRow key={winner.id}>
                            <TableCell>{winner.id}</TableCell>
                            <TableCell>{winner.fullMsisdn}</TableCell>
                            <TableCell>{winner.prize}</TableCell>
                            <TableCell>{formatCurrency(winner.amount)}</TableCell>
                            <TableCell>{winner.drawId}</TableCell>
                            <TableCell>{winner.date}</TableCell>
                            <TableCell>
                              <ContactButton onClick={() => handleContactWinner(winner.fullMsisdn)}>
                                Contact
                              </ContactButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableWrapper>
                </TableCard>
              </div>
            )}

            {/* Other tabs would be implemented here */}
            {activeTab === 'users' && (
              <div>
                <TableCard>
                  <TableTitle>User Management</TableTitle>
                  <p>User management interface would be implemented here.</p>
                </TableCard>
              </div>
            )}

            {activeTab === 'topups' && (
              <div>
                <TableCard>
                  <TableTitle>Topup Transactions</TableTitle>
                  <p>Topup transaction history would be implemented here.</p>
                </TableCard>
              </div>
            )}

            {activeTab === 'draws' && (
              <div>
                <TableCard>
                  <TableTitle>Draw History</TableTitle>
                  <p>Complete draw history and management would be implemented here.</p>
                </TableCard>
              </div>
            )}
          </>
        )}
      </MainContent>

      {/* Footer */}
      <Footer />
    </PageContainer>
  );
}

