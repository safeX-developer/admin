import React, { useState, useEffect } from 'react';
import { Search } from '@mui/icons-material';
import { useApp } from '../context/app.context';
import { useNavigate, useLocation } from 'react-router-dom';
import UserDetailsModal from '../modal/UserDetails';

export default function Users() {
  const { api } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  // Parse URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const userIdFromUrl = queryParams.get('user');

  const fetchUsers = async (page = 1, limit = 10, query = searchQuery) => {
    setLoading(true);
    try {
      const response = await api.getAllUsers(page, limit, query);
      setUsers(response.users || []);
      setPagination(response.pagination || {
        page: 1,
        limit: 10,
        total: 0,
        pages: 0
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user details by ID
  const fetchUserDetails = async (userId) => {
    try {
      const user = await api.getUserById(userId);
      setSelectedUser(user);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [api]);

  // Check for user ID in URL when component mounts or URL changes
  useEffect(() => {
    if (userIdFromUrl) {
      fetchUserDetails(userIdFromUrl);
    } else {
      setShowModal(false);
    }
  }, [userIdFromUrl]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(1, pagination.limit, searchQuery);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.pages) {
      fetchUsers(newPage, pagination.limit);
    }
  };

  // Get full name
  const getFullName = (user) => {
    return `${user.firstName || ''} ${user.lastName || ''}`.trim();
  };

  // Truncate userId for display
  const truncateUserId = (userId) => {
    if (!userId) return '';
    return `${userId.substring(0, 8)}...${userId.substring(userId.length - 10)}`;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Handle username click
  const handleUsernameClick = (userId) => {
    navigate(`?user=${userId}`);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    navigate(location.pathname); // Remove query params
  };

  // Generate pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5;
    let startPage = Math.max(1, pagination.page - Math.floor(maxButtons / 2));
    let endPage = Math.min(pagination.pages, startPage + maxButtons - 1);
    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(pagination.page - 1)}
        disabled={pagination.page === 1}
        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="sr-only">Previous</span>
        &larr;
      </button>
    );

    // Page buttons
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
            pagination.page === i
              ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {i}
        </button>
      );
    }

    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(pagination.page + 1)}
        disabled={pagination.page === pagination.pages}
        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="sr-only">Next</span>
        &rarr;
      </button>
    );

    return buttons;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        <p className="text-gray-500 mt-1">Manage platform users and their permissions</p>
      </div>
      
      {/* Search and filters */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <form onSubmit={handleSearch} className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="text-gray-400" fontSize="small" />
          </div>
          <input
            type="text"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="Search by user ID, username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="hidden">Search</button>
        </form>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <select
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
            onChange={(e) => {
              // Handle verification status filter
              const isVerified = e.target.value === "" ? undefined : e.target.value === "verified";
              fetchUsers(1, pagination.limit, searchQuery, isVerified);
            }}
          >
            <option value="">All Statuses</option>
            <option value="verified">Verified</option>
            <option value="not-verified">Not Verified</option>
          </select>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Export
          </button>
        </div>
      </div>
      
      {/* Users table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    UserId
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Full Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Transactions
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <tr key={user.userId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div
                            className="text-sm text-blue-600 font-medium cursor-pointer hover:underline"
                            onClick={() => handleUsernameClick(user.userId)}
                          >
                            @{user.username}
                          </div>
                          <div className="text-sm font-medium text-gray-900 mb-1">
                            {truncateUserId(user.userId)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{getFullName(user)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.country}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.totalTransactions || 0}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${user.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {user.isVerified ? 'Verified' : 'Not Verified'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-500">
                        {formatDate(user.createdAt)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
        
        {/* Pagination */}
        {!loading && users.length > 0 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button 
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button 
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(pagination.page * pagination.limit, pagination.total)}
                  </span>{' '}
                  of <span className="font-medium">{pagination.total}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  {renderPaginationButtons()}
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {showModal && selectedUser && (
        <UserDetailsModal 
          user={selectedUser} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}
