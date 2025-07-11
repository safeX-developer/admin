import React, { useState } from 'react';
import TradesTable from './transactions/TradesTable';
import RewardsTable from './transactions/RewardsTable';

export default function Transactions() {
  const [activeTab, setActiveTab] = useState('trades');

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
        <p className="text-gray-500 mt-1">Monitor all platform transactions and rewards</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <button
              onClick={() => setActiveTab('trades')}
              className={`inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 ${
                activeTab === 'trades'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
            >
              Trades
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => setActiveTab('rewards')}
              className={`inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 ${
                activeTab === 'rewards'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
            >
              Rewards
            </button>
          </li>
        </ul>
      </div>

      {/* Tab content */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {activeTab === 'trades' ? <TradesTable /> : <RewardsTable />}
      </div>
    </div>
  );
}
