import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

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
        { id: 'DRW-37', date: 'Apr 15, 2025', day: 'Monday', eligibleUsers: 4521, winners: 13, totalPrize: 245000 },
        { id: 'DRW-36', date: 'Apr 14, 2025', day: 'Saturday', eligibleUsers: 18934, winners: 23, totalPrize: 1850000 },
        { id: 'DRW-35', date: 'Apr 13, 2025', day: 'Friday', eligibleUsers: 3876, winners: 13, totalPrize: 245000 },
        { id: 'DRW-34', date: 'Apr 12, 2025', day: 'Thursday', eligibleUsers: 4102, winners: 13, totalPrize: 245000 },
        { id: 'DRW-33', date: 'Apr 11, 2025', day: 'Wednesday', eligibleUsers: 3945, winners: 13, totalPrize: 245000 }
      ];
      setRecentDraws(mockRecentDraws);

      // Generate mock recent winners
      const mockRecentWinners = [
        { id: 'WIN-523', msisdn: '23480******34', prize: 'Jackpot', amount: 100000, drawId: 'DRW-37', date: 'Apr 15, 2025' },
        { id: 'WIN-522', msisdn: '23481******21', prize: '2nd Prize', amount: 50000, drawId: 'DRW-37', date: 'Apr 15, 2025' },
        { id: 'WIN-521', msisdn: '23480******78', prize: '3rd Prize', amount: 25000, drawId: 'DRW-37', date: 'Apr 15, 2025' },
        { id: 'WIN-520', msisdn: '23481******45', prize: 'Consolation', amount: 5000, drawId: 'DRW-37', date: 'Apr 15, 2025' },
        { id: 'WIN-519', msisdn: '23480******12', prize: 'Consolation', amount: 5000, drawId: 'DRW-37', date: 'Apr 15, 2025' },
        { id: 'WIN-518', msisdn: '23481******67', prize: 'Grand Prize', amount: 1000000, drawId: 'DRW-36', date: 'Apr 14, 2025' },
        { id: 'WIN-517', msisdn: '23480******89', prize: '2nd Prize', amount: 500000, drawId: 'DRW-36', date: 'Apr 14, 2025' },
        { id: 'WIN-516', msisdn: '23481******23', prize: '3rd Prize', amount: 250000, drawId: 'DRW-36', date: 'Apr 14, 2025' }
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

  const userGrowthOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'User Growth Trend',
      },
    },
  };

  // Format currency
  const formatCurrency = (amount) => {
    return '₦' + amount.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-mtn-light">
      <Head>
        <title>Admin Dashboard | MyNumba Don Win</title>
        <meta name="description" content="Admin dashboard for MyNumba Don Win promotion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="bg-mtn-black text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <a className="text-2xl font-bold text-mtn-yellow">MyNumba Don Win</a>
            </Link>
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                <li><Link href="/"><a className="hover:text-mtn-yellow transition-colors">Home</a></Link></li>
                <li><Link href="/draw-management"><a className="hover:text-mtn-yellow transition-colors">Draw Management</a></Link></li>
                <li><Link href="/admin"><a className="text-mtn-yellow">Admin Dashboard</a></Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
          <div className="flex space-x-2">
            <button className="btn-secondary">Export Data</button>
            <button className="btn-primary">Refresh</button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-mtn-yellow text-mtn-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-mtn-yellow text-mtn-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('users')}
              >
                Users
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'topups'
                    ? 'border-mtn-yellow text-mtn-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('topups')}
              >
                Topups
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'draws'
                    ? 'border-mtn-yellow text-mtn-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('draws')}
              >
                Draws
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'winners'
                    ? 'border-mtn-yellow text-mtn-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('winners')}
              >
                Winners
              </button>
            </nav>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-mtn-yellow"></div>
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Total Users</h3>
                    <p className="text-3xl font-bold">{dashboardStats.totalUsers.toLocaleString()}</p>
                    <p className="text-sm text-green-600 mt-2">
                      +{(dashboardStats.totalUsers - userGrowthData[0]?.users).toLocaleString()} since campaign start
                    </p>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Total Topups</h3>
                    <p className="text-3xl font-bold">{dashboardStats.totalTopups.toLocaleString()}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Avg {Math.round(dashboardStats.totalTopups / dashboardStats.totalUsers * 100) / 100} per user
                    </p>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Total Commission</h3>
                    <p className="text-3xl font-bold">{formatCurrency(dashboardStats.totalCommission)}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Avg {formatCurrency(Math.round(dashboardStats.totalCommission / dashboardStats.totalTopups))} per topup
                    </p>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Total Prize Amount</h3>
                    <p className="text-3xl font-bold">{formatCurrency(dashboardStats.totalPrizeAmount)}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      {dashboardStats.totalWinners} winners across {dashboardStats.drawsCompleted} draws
                    </p>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold mb-4">Topup Distribution</h3>
                    <div className="h-64">
                      <Doughnut data={topupDistributionData} />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold mb-4">User Growth Trend</h3>
                    <div className="h-64">
                      <Bar data={userGrowthChartData} options={userGrowthOptions} />
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold mb-4">Recent Draws</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Winners</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prize Amount</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {recentDraws.map((draw, index) => (
                            <tr key={index}>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600">{draw.id}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{draw.date}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{draw.day}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{draw.winners}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{formatCurrency(draw.totalPrize)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold mb-4">Recent Winners</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MSISDN</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prize</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Draw</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {recentWinners.map((winner, index) => (
                            <tr key={index}>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{winner.msisdn}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{winner.prize}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{formatCurrency(winner.amount)}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600">{winner.drawId}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{winner.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">User Management</h2>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search users..."
                        className="input-field pr-10"
                      />
                      <span className="absolute right-3 top-2">🔍</span>
                    </div>
                    <button className="btn-secondary">Filter</button>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <span className="text-sm font-medium text-gray-500">Total Users:</span>
                      <span className="ml-2 font-bold">{dashboardStats.totalUsers.toLocaleString()}</span>
                    </div>
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <span className="text-sm font-medium text-gray-500">Active Users:</span>
                      <span className="ml-2 font-bold">{dashboardStats.activeUsers.toLocaleString()}</span>
                    </div>
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <span className="text-sm font-medium text-gray-500">Opt-Out Rate:</span>
                      <span className="ml-2 font-bold">
                        {Math.round((1 - dashboardStats.activeUsers / dashboardStats.totalUsers) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MSISDN</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opt-In Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topups</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* Mock user data */}
                      {[...Array(10)].map((_, index) => {
                        const isActive = Math.random() > 0.2;
                        const topups = Math.floor(Math.random() * 20) + 1;
                        const points = topups * (Math.floor(Math.random() * 15) + 5);
                        const msisdn = `2348${Math.floor(Math.random() * 10)}${Math.floor(1000000 + Math.random() * 9000000)}`;
                        const maskedMsisdn = `${msisdn.substring(0, 5)}******${msisdn.substring(msisdn.length - 2)}`;
                        
                        return (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{maskedMsisdn}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {isActive ? 'Active' : 'Opted Out'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Apr {Math.floor(Math.random() * 15) + 1}, 2025
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{topups}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{points}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                              {isActive ? (
                                <button className="text-red-600 hover:text-red-900">Opt-Out</button>
                              ) : (
                                <button className="text-green-600 hover:text-green-900">Opt-In</button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Showing 1-10 of {dashboardStats.totalUsers.toLocaleString()} users
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-500 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-500 hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Topups Tab */}
            {activeTab === 'topups' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Topup Management</h2>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search topups..."
                        className="input-field pr-10"
                      />
                      <span className="absolute right-3 top-2">🔍</span>
                    </div>
                    <button className="btn-secondary">Filter</button>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <span className="text-sm font-medium text-gray-500">Total Topups:</span>
                      <span className="ml-2 font-bold">{dashboardStats.totalTopups.toLocaleString()}</span>
                    </div>
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <span className="text-sm font-medium text-gray-500">Total Revenue:</span>
                      <span className="ml-2 font-bold">{formatCurrency(dashboardStats.totalRevenue)}</span>
                    </div>
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <span className="text-sm font-medium text-gray-500">Total Commission:</span>
                      <span className="ml-2 font-bold">{formatCurrency(dashboardStats.totalCommission)}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-bold mb-3">Topup Distribution</h3>
                    <div className="h-64">
                      <Doughnut data={topupDistributionData} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-3">Commission by Topup Range</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topup Range</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission Rate</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Commission</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₦0-₦199</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{topupData[0]?.count.toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₦5</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(topupData[0]?.commission)}</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₦200-₦499</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{topupData[1]?.count.toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₦10</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(topupData[1]?.commission)}</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₦500-₦999</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{topupData[2]?.count.toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₦15</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(topupData[2]?.commission)}</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₦1000+</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{topupData[3]?.count.toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₦25</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(topupData[3]?.commission)}</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">Total</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{dashboardStats.totalTopups.toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{formatCurrency(dashboardStats.totalCommission)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-3">Recent Topups</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MSISDN</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* Mock topup data */}
                      {[...Array(10)].map((_, index) => {
                        const amount = Math.floor(Math.random() * 2000) + 100;
                        const channels = ['Scratch Card', 'MTN App', 'Web', 'USSD'];
                        const channel = channels[Math.floor(Math.random() * channels.length)];
                        const commission = amount >= 1000 ? 25 : (amount >= 500 ? 15 : (amount >= 200 ? 10 : 5));
                        const points = amount >= 500 ? 
                                      (amount >= 1000 ? 25 : 15) : 
                                      (amount >= 200 ? 10 : 5);
                        const msisdn = `2348${Math.floor(Math.random() * 10)}${Math.floor(1000000 + Math.random() * 9000000)}`;
                        const maskedMsisdn = `${msisdn.substring(0, 5)}******${msisdn.substring(msisdn.length - 2)}`;
                        const hour = Math.floor(Math.random() * 24);
                        const minute = Math.floor(Math.random() * 60);
                        const day = Math.floor(Math.random() * 15) + 1;
                        
                        return (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{maskedMsisdn}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(amount)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{channel}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Apr {day}, {hour.toString().padStart(2, '0')}:{minute.toString().padStart(2, '0')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(commission)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{points}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Showing 1-10 of {dashboardStats.totalTopups.toLocaleString()} topups
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-500 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-500 hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Draws Tab */}
            {activeTab === 'draws' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Draw Management</h2>
                  <div className="flex space-x-2">
                    <Link href="/draw-management">
                      <a className="btn-primary">New Draw</a>
                    </Link>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <span className="text-sm font-medium text-gray-500">Total Draws:</span>
                      <span className="ml-2 font-bold">{dashboardStats.drawsCompleted}</span>
                    </div>
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <span className="text-sm font-medium text-gray-500">Total Winners:</span>
                      <span className="ml-2 font-bold">{dashboardStats.totalWinners}</span>
                    </div>
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <span className="text-sm font-medium text-gray-500">Total Prize Amount:</span>
                      <span className="ml-2 font-bold">{formatCurrency(dashboardStats.totalPrizeAmount)}</span>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Draw ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Eligible Numbers</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Winners</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prize Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentDraws.map((draw, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{draw.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{draw.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{draw.day}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {draw.day === 'Saturday' ? 'All' : 
                             draw.day === 'Monday' ? '0, 1' :
                             draw.day === 'Tuesday' ? '2, 3' :
                             draw.day === 'Wednesday' ? '4, 5' :
                             draw.day === 'Thursday' ? '6, 7' : '8, 9'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{draw.eligibleUsers.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{draw.winners}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(draw.totalPrize)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                            <button className="text-green-600 hover:text-green-900">Export</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Showing 1-5 of {dashboardStats.drawsCompleted} draws
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-500 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-500 hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Winners Tab */}
            {activeTab === 'winners' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Winner Management</h2>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search winners..."
                        className="input-field pr-10"
                      />
                      <span className="absolute right-3 top-2">🔍</span>
                    </div>
                    <button className="btn-secondary">Filter</button>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <span className="text-sm font-medium text-gray-500">Total Winners:</span>
                      <span className="ml-2 font-bold">{dashboardStats.totalWinners}</span>
                    </div>
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <span className="text-sm font-medium text-gray-500">Total Prize Amount:</span>
                      <span className="ml-2 font-bold">{formatCurrency(dashboardStats.totalPrizeAmount)}</span>
                    </div>
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <span className="text-sm font-medium text-gray-500">Avg Prize per Winner:</span>
                      <span className="ml-2 font-bold">
                        {formatCurrency(Math.round(dashboardStats.totalPrizeAmount / dashboardStats.totalWinners))}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Winner ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MSISDN</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prize Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Draw ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentWinners.map((winner, index) => {
                        const statuses = ['Pending', 'Notified', 'Claimed', 'Paid'];
                        const status = statuses[Math.floor(Math.random() * statuses.length)];
                        const statusColor = 
                          status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          status === 'Notified' ? 'bg-blue-100 text-blue-800' :
                          status === 'Claimed' ? 'bg-purple-100 text-purple-800' :
                          'bg-green-100 text-green-800';
                        
                        return (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{winner.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{winner.msisdn}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{winner.prize}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(winner.amount)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{winner.drawId}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{winner.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}>
                                {status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                              {status === 'Pending' && (
                                <button className="text-green-600 hover:text-green-900">Notify</button>
                              )}
                              {status === 'Notified' && (
                                <button className="text-purple-600 hover:text-purple-900">Mark Claimed</button>
                              )}
                              {status === 'Claimed' && (
                                <button className="text-green-600 hover:text-green-900">Process Payment</button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Showing 1-8 of {dashboardStats.totalWinners} winners
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-500 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-500 hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-mtn-black text-white py-6 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Bridgetunes. All rights reserved.</p>
          <p className="text-sm text-gray-400 mt-2">MyNumba Don Win Promotion</p>
        </div>
      </footer>
    </div>
  );
}
