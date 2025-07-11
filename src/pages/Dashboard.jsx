import React, { useState, useEffect } from 'react';
import {
  PeopleAlt,
  SwapHoriz,
  PersonPin,
  AccountBalance
} from '@mui/icons-material';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Dashboard() {
  // Sample data - replace with actual API calls
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 12458,
    totalTrades: 1245,
    activeUsers: 856,
    totalTurnover: 2345678
  });

  // Sample chart data - replace with actual API data
  const [chartData, setChartData] = useState({
    userGrowth: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'New Users',
          data: [1200, 1900, 3000, 5000, 6000, 8000, 12458],
          borderColor: 'rgba(59, 130, 246, 1)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    },
    tradingVolume: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Trading Volume',
          data: [30000, 45000, 28000, 52000, 75000, 48000, 60000],
          backgroundColor: 'rgba(139, 92, 246, 0.8)',
          borderRadius: 6
        }
      ]
    }
  });

  // Format numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Format currency
  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  // Chart options
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          boxWidth: 6
        }
      },
      title: {
        display: true,
        text: 'User Growth Over Time',
        font: {
          size: 16
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          boxWidth: 6
        }
      },
      title: {
        display: true,
        text: 'Weekly Trading Volume',
        font: {
          size: 16
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="p-3">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users Card */}
        <div
          className="bg-white rounded-xl p-6 shadow-lg relative overflow-hidden"
          style={{
            boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3), 0 4px 6px -2px rgba(59, 130, 246, 0.2)'
          }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <h2 className="text-2xl font-bold text-gray-800 mt-2">{formatNumber(dashboardData.totalUsers)}</h2>
              <p className="text-xs text-green-600 mt-2 font-medium">↑ 12% from last month</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md">
              <PeopleAlt className="text-white" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
        </div>

        {/* Total Trades Card */}
        <div
          className="bg-white rounded-xl p-6 shadow-lg relative overflow-hidden"
          style={{
            boxShadow: '0 10px 15px -3px rgba(139, 92, 246, 0.3), 0 4px 6px -2px rgba(139, 92, 246, 0.2)'
          }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Trades (24h)</p>
              <h2 className="text-2xl font-bold text-gray-800 mt-2">{formatNumber(dashboardData.totalTrades)}</h2>
              <p className="text-xs text-green-600 mt-2 font-medium">↑ 8% from yesterday</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-md">
              <SwapHoriz className="text-white" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-purple-600"></div>
        </div>

        {/* Active Users Card */}
        <div
          className="bg-white rounded-xl p-6 shadow-lg relative overflow-hidden"
          style={{
            boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.3), 0 4px 6px -2px rgba(16, 185, 129, 0.2)'
          }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <h2 className="text-2xl font-bold text-gray-800 mt-2">{formatNumber(dashboardData.activeUsers)}</h2>
              <p className="text-xs text-green-600 mt-2 font-medium">↑ 5% from last week</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md">
              <PersonPin className="text-white" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
        </div>

        {/* Total Turnover Card */}
        <div
          className="bg-white rounded-xl p-6 shadow-lg relative overflow-hidden"
          style={{
            boxShadow: '0 10px 15px -3px rgba(245, 158, 11, 0.3), 0 4px 6px -2px rgba(245, 158, 11, 0.2)'
          }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Turnover</p>
              <h2 className="text-2xl font-bold text-gray-800 mt-2">{formatCurrency(dashboardData.totalTurnover)}</h2>
              <p className="text-xs text-green-600 mt-2 font-medium">↑ 15% from last month</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md">
              <AccountBalance className="text-white" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart - User Growth */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="h-80">
            <Line data={chartData.userGrowth} options={lineChartOptions} />
          </div>
        </div>

        {/* Bar Chart - Trading Volume */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="h-80">
            <Bar data={chartData.tradingVolume} options={barChartOptions} />
          </div>
        </div>
      </div>

      {/* Additional dashboard content */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {/* Activity items */}
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="text-sm font-medium text-gray-800">New user registered</p>
              <p className="text-xs text-gray-500">2 minutes ago</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <p className="text-sm font-medium text-gray-800">Trade completed</p>
              <p className="text-xs text-gray-500">15 minutes ago</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="text-sm font-medium text-gray-800">User profile updated</p>
              <p className="text-xs text-gray-500">1 hour ago</p>
            </div>
          </div>
        </div>

        {/* Platform Health */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Platform Health</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Server Status</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">API Response Time</span>
              <span className="text-sm font-medium text-gray-800">45ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Error Rate</span>
              <span className="text-sm font-medium text-gray-800">0.02%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database Load</span>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '28%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
