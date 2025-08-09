"use client";

import { useState } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "completed";
  category: string;
  dueDate: string;
  aiSuggestions: string[];
  createdAt: Date;
}

interface TaskCardProps {
  task: Task;
  onStatusUpdate: (id: string, status: Task["status"]) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onStatusUpdate, onDelete }: TaskCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-100 border-red-200";
      case "medium": return "text-yellow-600 bg-yellow-100 border-yellow-200";
      case "low": return "text-green-600 bg-green-100 border-green-200";
      default: return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600 bg-green-100 border-green-200";
      case "in-progress": return "text-blue-600 bg-blue-100 border-blue-200";
      case "todo": return "text-gray-600 bg-gray-100 border-gray-200";
      default: return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high": return "🔥";
      case "medium": return "⚡";
      case "low": return "🌱";
      default: return "📌";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return "✅";
      case "in-progress": return "🚀";
      case "todo": return "⏳";
      default: return "📋";
    }
  };

  const isOverdue = () => {
    if (!task.dueDate) return false;
    return new Date(task.dueDate) < new Date() && task.status !== "completed";
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      {/* Task Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-xl font-bold text-gray-900">{task.title}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(task.priority)}`}>
                {getPriorityIcon(task.priority)} {task.priority}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(task.status)}`}>
                {getStatusIcon(task.status)} {task.status}
              </span>
            </div>
            
            {/* Overdue Warning */}
            {isOverdue() && (
              <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg">
                <span className="text-red-700 text-sm font-medium">⚠️ Overdue! Due date: {new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            )}
            
            {task.description && (
              <p className="text-gray-600 mb-4 leading-relaxed">{task.description}</p>
            )}
            
            {/* Task Meta */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              {task.category && (
                <span className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
                  <span>🏷️</span>
                  {task.category}
                </span>
              )}
              {task.dueDate && (
                <span className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                  isOverdue() ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  <span>📅</span>
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
              <span className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
                <span>🕒</span>
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* AI Suggestions */}
            {task.aiSuggestions.length > 0 && (
              <div className="mb-4">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-2 transition-colors"
                >
                  <span>🤖</span>
                  AI Suggestions ({task.aiSuggestions.length})
                  <span className={`transform transition-transform ${showDetails ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                
                {showDetails && (
                  <div className="mt-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-sm font-medium text-blue-800 mb-3">💡 AI-Powered Recommendations:</p>
                    <ul className="space-y-2">
                      {task.aiSuggestions.map((suggestion, index) => (
                        <li key={index} className="text-sm text-blue-700 flex items-start gap-2">
                          <span className="text-blue-500 mt-0.5">•</span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          {task.status !== "completed" && (
            <button
              onClick={() => onStatusUpdate(task.id, "completed")}
              className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors flex items-center gap-2"
            >
              <span>✅</span>
              Complete
            </button>
          )}
          {task.status === "todo" && (
            <button
              onClick={() => onStatusUpdate(task.id, "in-progress")}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors flex items-center gap-2"
            >
              <span>🚀</span>
              Start
            </button>
          )}
          <button
            onClick={() => onDelete(task.id)}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors flex items-center gap-2"
          >
            <span>🗑️</span>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
