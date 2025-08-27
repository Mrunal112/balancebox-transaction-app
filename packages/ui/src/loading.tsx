interface LoadingScreenProps {
  title?: string;
  message?: string;
}

export const LoadingScreen = ({ 
  title = "Loading BalanceBox...", 
  message = "Please wait while we set things up" 
}: LoadingScreenProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
        <p className="text-gray-500 mt-2">{message}</p>
      </div>
    </div>
  );
};
