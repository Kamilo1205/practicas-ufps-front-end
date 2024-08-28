const LoadingMini = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-6 h-6">
        <div className="absolute top-0 left-0 right-0 bottom-0 animate-spin rounded-full border-4 border-blue-200 border-t-4 border-t-white"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center p-2"></div>
      </div>
    </div>
  );
};

export default LoadingMini;
