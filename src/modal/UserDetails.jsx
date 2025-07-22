import React from 'react';
import { Close as CloseIcon } from '@mui/icons-material';
import { useApp } from '../context/app.context';
import { useState } from 'react';
import { useEffect } from 'react';

const UserDetailsModal = ({ onClose }) => {
    const { api } = useApp();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const queryParams = new URLSearchParams(location.search);
    const userIdFromUrl = queryParams.get('user');


    useEffect(()=>{
       async function getUser(){
            const user = await api.getUserById(userIdFromUrl);
            setUser(user?.data);
            setLoading(false);
        }
        getUser();
    }, [api]);

    if (!user && loading) {
        return (
            <div className="fixed inset-0 bg-white flex justify-center items-center z-50">
                <p className="text-gray-500">Loading user details...</p>
            </div>
        )
    }

    if(!user) {
        return (
            <div className="fixed inset-0 bg-white flex justify-center items-center z-50">
                <p className="text-gray-500">User not found</p>
            </div>
        )
    }



  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format transaction value
  const formatTransactionValue = (value) => {
    if (!value) return 'N/A';
    return `${value.amount} ${value.currency}`;
  };

  return (
    <div className="fixed inset-0 bg-[#0000008c] bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header with close button */}
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">User Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <CloseIcon fontSize="large" />
          </button>
        </div>

        {/* User details content */}
        <div className="p-6">
          {/* Basic Info Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Username</p>
                  <p className="text-base font-medium">@{user.username}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="text-base font-medium">{user.firstName} {user.lastName}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-base font-medium">{user.email || 'Not provided'}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">User ID</p>
                  <p className="text-base font-medium break-all">{user.userId}</p>
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-base font-medium">{user.city}, {user.state}, {user.country}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-base font-medium">{user.address}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Joined Date</p>
                  <p className="text-base font-medium">{formatDate(user.createdAt)}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="text-base font-medium">{formatDate(user.updatedAt)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Status Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Account Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Verification Status</p>
                <div className="flex items-center">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${user.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {user.isVerified ? 'Verified' : 'Not Verified'}
                  </span>
                  <p className="ml-2 text-sm">Level: {user.verificationLevel}</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">2FA Status</p>
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${user.is_2Fa ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {user.is_2Fa ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Account Status</p>
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${user.is_suspend ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                  {user.is_suspend ? 'Suspended' : 'Active'}
                </span>
              </div>
            </div>
          </div>

          {/* Transaction Stats Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Transaction Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Total Transactions</p>
                <p className="text-xl font-bold text-blue-600">{user.totalTransactions}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Transaction Value</p>
                <p className="text-xl font-bold text-green-600">{formatTransactionValue(user.totalTransactionValue)}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Completed Orders</p>
                <p className="text-xl font-bold text-purple-600">{user.completedOrders}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Completion Rate</p>
                <p className="text-xl font-bold text-orange-600">{user.completionRates}%</p>
              </div>
            </div>
          </div>

          {/* Referral Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Referral Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Referral Code</p>
                  <p className="text-base font-medium">{user.referralCode}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Referred By</p>
                  <p className="text-base font-medium">{user.referredBy || 'None'}</p>
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Total Referrals</p>
                  <p className="text-base font-medium">{user.totalReferrals}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Total Commission</p>
                  <p className="text-base font-medium">{user.totalCommission} {user.commissionCurrency}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ratings Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">User Ratings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Good Ratings</p>
                <p className="text-xl font-bold text-green-600">{user.goodRating}</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Bad Ratings</p>
                <p className="text-xl font-bold text-red-600">{user.badRating}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-end mt-8">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Edit User
            </button>
            <button className={`${user.is_suspend ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors`}>
              {user.is_suspend ? 'Activate Account' : 'Suspend Account'}
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
