import React, { useState, useEffect } from 'react';
import { Add, MoreVert, YouTube, Facebook, Twitter, Chat } from '@mui/icons-material';
import CreateTaskModal from './tasks/CreateTaskModal';
import EditTaskModal from './tasks/EditTaskModal';
import DeleteTaskModal from './tasks/DeleteTaskModal';

export default function Tasks() {
  const [tasks, setTasks] = useState([
    {
      id: 'TASK-001',
      type: 'youtube',
      rewardAmount: 50,
      description: 'Watch our product introduction video and subscribe to our channel',
      link: 'https://youtube.com/watch?v=example1',
      isActive: true
    },
    {
      id: 'TASK-002',
      type: 'twitter',
      rewardAmount: 30,
      description: 'Follow our Twitter account and retweet our latest announcement',
      link: 'https://twitter.com/example/status/123456789',
      isActive: true
    },
    {
      id: 'TASK-003',
      type: 'discord',
      rewardAmount: 40,
      description: 'Join our Discord server and introduce yourself in the #general channel',
      link: 'https://discord.gg/example',
      isActive: true
    },
    {
      id: 'TASK-004',
      type: 'facebook',
      rewardAmount: 25,
      description: 'Like our Facebook page and share our latest post',
      link: 'https://facebook.com/example',
      isActive: true
    },
    {
      id: 'TASK-005',
      type: 'youtube',
      rewardAmount: 60,
      description: 'Watch our tutorial video and leave a comment',
      link: 'https://youtube.com/watch?v=example2',
      isActive: false
    },
  ]);

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  
  // Dropdown menu states
  const [openMenuId, setOpenMenuId] = useState(null);

  // Toggle dropdown menu
  const toggleMenu = (taskId) => {
    if (openMenuId === taskId) {
      setOpenMenuId(null);
    } else {
      setOpenMenuId(taskId);
    }
  };

  // Handle create task
  const handleCreateTask = (newTask) => {
    // Generate a new task ID
    const taskId = `TASK-${String(tasks.length + 1).padStart(3, '0')}`;
    setTasks([...tasks, { ...newTask, id: taskId, isActive: true }]);
    setIsCreateModalOpen(false);
  };

  // Handle edit task
  const handleEditTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    setIsEditModalOpen(false);
    setCurrentTask(null);
  };

  // Handle delete task
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setIsDeleteModalOpen(false);
    setCurrentTask(null);
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
                {tasks.map((task, index) => (
                  <tr key={task.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{task.id}</div>
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
                          {task.description.length > 13 
                            ? `${task.description.substring(0, 13)}...` 
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
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMenu(task.id);
                        }}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <MoreVert />
                      </button>
                      
                      {/* Dropdown menu */}
                      {openMenuId === task.id && (
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
                ))}
              </tbody>
            </table>
          </div>
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
          onConfirm={() => handleDeleteTask(currentTask.id)}
        />
      )}
    </>
  );
}
