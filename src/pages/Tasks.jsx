import React, { useState, useEffect } from 'react';
import { Add, MoreVert, YouTube, Facebook, Twitter, Chat, ChevronLeft, ChevronRight, TaskAlt } from '@mui/icons-material';
import CreateTaskModal from './tasks/CreateTaskModal';
import EditTaskModal from './tasks/EditTaskModal';
import DeleteTaskModal from './tasks/DeleteTaskModal';
import { useApp } from '../context/app.context';

export default function Tasks() {
  const { api } = useApp();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  // Fetch tasks with pagination
  const fetchTasks = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const response = await api.getTasks({ page, limit });
      setTasks(response.data.tasks);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(pagination.page, pagination.limit);
  }, []);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.pages) {
      setPagination({ ...pagination, page: newPage });
      fetchTasks(newPage, pagination.limit);
    }
  };

  // Handle limit change
  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    setPagination({ ...pagination, limit: newLimit, page: 1 });
    fetchTasks(1, newLimit);
  };

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
 
  // Dropdown menu states
  const [openMenuId, setOpenMenuId] = useState(null);

  // Toggle dropdown menu
  const toggleMenu = (taskId, e) => {
    e.stopPropagation();
    if (openMenuId === taskId) {
      setOpenMenuId(null);
    } else {
      setOpenMenuId(taskId);
    }
  };

  // Handle create task
  const handleCreateTask = async (newTask) => {
    try {
      setLoading(true);
      await api.createTask(newTask);
      fetchTasks(pagination.page, pagination.limit);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle edit task
  const handleEditTask = async (updatedTask) => {

    try {
      setLoading(true);
      await api.editTask(updatedTask.taskId, updatedTask);
      fetchTasks(pagination.page, pagination.limit);
      setIsEditModalOpen(false);
      setCurrentTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete task
  const handleDeleteTask = async (taskId) => {
    try {
      setLoading(true);
      await api.deleteTask(taskId);
      fetchTasks(pagination.page, pagination.limit);
      setIsDeleteModalOpen(false);
      setCurrentTask(null);
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setLoading(false);
    }
  };

  // Open edit modal
  const openEditModal = (task) => {
    setCurrentTask(task);
    setIsEditModalOpen(true);
    setOpenMenuId(null);
  };

  // Open delete modal
  const openDeleteModal = (task) => {
    setCurrentTask(task);
    setIsDeleteModalOpen(true);
    setOpenMenuId(null);
  };

  // Get icon based on task type
  const getTaskTypeIcon = (type) => {
    switch (type) {
      case 'youtube':
        return <YouTube className="text-red-600" />;
      case 'facebook':
        return <Facebook className="text-blue-600" />;
      case 'twitter':
        return <Twitter className="text-blue-400" />;
      case 'discord':
        // Using Chat icon as a replacement for Discord
        return <Chat className="text-indigo-600" />;
      default:
        return null;
    }
  };

  // Format task type for display
  const formatTaskType = (type) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenuId(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Generate pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;
    let startPage = Math.max(1, pagination.page - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(pagination.pages, startPage + maxVisibleButtons - 1);
    
    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }
    
    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(pagination.page - 1)}
        disabled={pagination.page === 1}
        className={`px-3 py-1 rounded-md ${
          pagination.page === 1 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'text-gray-700 hover:bg-gray-200'
        }`}
      >
        <ChevronLeft fontSize="small" />
      </button>
    );
    
    // Page buttons
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded-md ${
            pagination.page === i 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-700 hover:bg-gray-200'
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
        className={`px-3 py-1 rounded-md ${
          pagination.page === pagination.pages 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'text-gray-700 hover:bg-gray-200'
        }`}
      >
        <ChevronRight fontSize="small" />
      </button>
    );
    
    return buttons;
  };

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
            <p className="text-gray-500 mt-1">Manage reward tasks for users</p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
          >
            <Add className="mr-1" fontSize="small" />
            Create Task
          </button>
        </div>

        {/* Tasks table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reward
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Link
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  // Loading state
                  <tr>
                    <td colSpan="7" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                        <p className="text-gray-500">Loading tasks...</p>
                      </div>
                    </td>
                  </tr>
                ) : tasks.length === 0 ? (
                  // Empty state
                  <tr>
                    <td colSpan="7" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <TaskAlt className="text-gray-400 text-6xl mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No tasks found</h3>
                        <p className="text-gray-500 mb-4">Create your first task to get started</p>
                        <button
                          onClick={() => setIsCreateModalOpen(true)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                        >
                          <Add className="mr-1" fontSize="small" />
                          Create Task
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  // Tasks list
                  tasks.map((task, index) => (
                    <tr key={task.taskId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{task.taskId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getTaskTypeIcon(task.type)}
                          <span className="ml-2 text-sm text-gray-900">{formatTaskType(task.type)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{task.rewardAmount} points</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-md">
                          {task.description.length > 50
                            ? `${task.description.substring(0, 50)}...`
                            : task.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href={task.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-900 hover:underline"
                        >
                          View Link
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${task.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {task.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                        <button
                          onClick={(e) => toggleMenu(task.taskId, e)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <MoreVert />
                        </button>
                         
                        {/* Dropdown menu */}
                        {openMenuId === task.taskId && (
                          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                            <div className="py-1" role="menu" aria-orientation="vertical">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openEditModal(task);
                                }}
                                className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                              >
                                Edit Task
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openDeleteModal(task);
                                }}
                                className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                role="menuitem"
                              >
                                Delete Task
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination controls */}
          {!loading && tasks.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm text-gray-700 mr-2">
                  Showing {(pagination.page - 1) * pagination.limit + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} tasks
                </span>
                <select
                  value={pagination.limit}
                  onChange={handleLimitChange}
                  className="border border-gray-300 rounded-md text-sm px-2 py-1"
                >
                  <option value="5">5 per page</option>
                  <option value="10">10 per page</option>
                  <option value="25">25 per page</option>
                  <option value="50">50 per page</option>
                </select>
              </div>
              <div className="flex space-x-1">
                {renderPaginationButtons()}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {isCreateModalOpen && (
        <CreateTaskModal
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateTask}
        />
      )}
       
      {isEditModalOpen && currentTask && (
        <EditTaskModal
          task={currentTask}
          onClose={() => {
            setIsEditModalOpen(false);
            setCurrentTask(null);
          }}
          onSubmit={handleEditTask}
        />
      )}
       
      {isDeleteModalOpen && currentTask && (
        <DeleteTaskModal
          task={currentTask}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setCurrentTask(null);
          }}
          onConfirm={() => handleDeleteTask(currentTask.taskId)}
        />
      )}
    </>
  );
}
