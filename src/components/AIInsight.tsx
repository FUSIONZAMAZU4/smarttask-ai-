"use client";

interface AIInsightProps {
  type: "success" | "info" | "warning" | "tip";
  message: string;
  icon: string;
  onClose?: () => void;
}

export default function AIInsight({ type, message, icon, onClose }: AIInsightProps) {
  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-800";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "tip":
        return "bg-purple-50 border-purple-200 text-purple-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  return (
    <div className={`border-l-4 p-4 rounded-r-lg ${getTypeStyles()} animate-pulse`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <span className="text-xl">{icon}</span>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span className="sr-only">Close</span>
            <span className="text-lg">×</span>
          </button>
        )}
      </div>
    </div>
  );
}
