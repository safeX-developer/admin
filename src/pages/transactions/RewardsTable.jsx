import React, { useState } from 'react';
import { Search } from '@mui/icons-material';

export default function RewardsTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [rewards, setRewards] = useState([
    {
      id: 'RWD-123456',
      type: 'daily task',
      date: '2023-10-15T14:32:45Z',
      userId: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t',
      rewardAmount: '10 points',
      rewardBalance: '250 points'
    },
    {
      id: 'RWD-123457',
      type: 'youtube',
      date: '2023-10-14T09:15:22Z',
      userId: '0x9s8r7q6p5o4n3m2l1k0j9i8h7g6f5e4d3c2b1a',
      rewardAmount: '50 points',
      rewardBalance: '350 points'
    },
    {
      id: 'RWD-123458',
      type: 'referral',
      date: '2023-10-14T18:45:12Z',
      userId: '0x2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u',
      rewardAmount: '100 points',
      rewardBalance: '450 points'
    },
    {
      id: 'RWD-123459',
      type: 'twitter',
      date: '2023-10-13T11:28:36Z',
      userId: '0x8t7s6r5q4p3o2n1m0l9k8j7i6h5g4f3e2d1c',
      rewardAmount: '30 points',
      rewardBalance: '180 points'
    },
    {
      id: 'RWD-123460',
      type: 'linking social media',
      date: '2023-10-12T16:52:08Z',
      userId: '0x3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v',
      rewardAmount: '20 points',
      rewardBalance: '120 points'
    },
    {
      id: 'RWD-123461',
      type: 'daily task',
      date: '2023-10-11T08:41:19Z',
      userId: '0x7r6q5p4o3n2m1l0k9j8i7h6g5f4e3d2c1b',
      rewardAmount: '10 points',
      rewardBalance: '210 points'
    },
  ]);

  // Filter rewards based on search query
  const filteredRewards = rewards.filter(reward => 
    reward.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reward.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reward.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Truncate wallet address for display
  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Get icon for reward type
  const getRewardTypeIcon = (type) => {
    switch (type) {
      case 'daily task':
        return '📅';
      case 'youtube':
        return '▶️';
      case 'referral':
        return '👥';
      case 'twitter':
        return '🐦';
      case 'linking social media':
        return '🔗';
      default:
        return '🎁';
    }
  };

  return (
    <div>
      {/* Search and filters */}
      <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="text-gray-400" fontSize="small" />
          </div>
          <input
            type="text"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="Search by reward ID, wallet address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5">
            <option value="">All Types</option>
            <option value="daily task">Daily Task</option>
            <option value="youtube">YouTube</option>
            <option value="referral">Referral</option>
            <option value="twitter">Twitter</option>
            <option value="linking social media">Linking Social Media</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Export
          </button>
        </div>
      </div>

      {/* Rewards table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reward
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User Wallet
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reward Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reward Balance
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredRewards.map((reward, index) => (
              <tr key={reward.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full mr-2 bg-blue-100 text-blue-800">
                        {getRewardTypeIcon(reward.type)}
                      </span>
                      <span className="text-sm font-medium text-gray-900 capitalize">
                        {reward.type}
                      </span>
                    </div>
                    <div className="text-sm text-blue-600 font-medium mt-1">
                      {reward.id}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatDate(reward.date)}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{truncateAddress(reward.userId)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-green-600">{reward.rewardAmount}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{reward.rewardBalance}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredRewards.length}</span> of{' '}
              <span className="font-medium">{rewards.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Previous</span>
                &larr;
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100">
                1
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                3
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Next</span>
                &rarr;
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}