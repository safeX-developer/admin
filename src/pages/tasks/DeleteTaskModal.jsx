import React from 'react';
import { Close, Warning } from '@mui/icons-material';

export default function DeleteTaskModal({ task, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-[#00000070] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Delete Task</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <Close />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-center mb-4 text-yellow-500">
            <Warning style={{ fontSize: 48 }} />
          </div>
          
          <h3 className="text-lg font-medium text-center text-gray-900 mb-2">
            Are you sure you want to delete this task?
          </h3>
          
          <p className="text-sm text-center text-gray-500 mb-4">
            This action cannot be undone. This will permanently delete the task "{task.id}: {task.description.substring(0, 30)}..."
          </p>
          
          <div className="mt-6 flex justify-center space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}