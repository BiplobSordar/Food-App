// Loader.js
const Loading = () => {
    return (
        <div className="min-h-screen w-full bg-white flex items-center justify-center relative">
        <div className="w-20 h-20 border-4 border-t-8 border-orange border-solid rounded-full animate-spin"></div>
        <span className="text-xl font-bold text-orange pl-5">Loading....</span>
      </div>
    );
};

export default Loading;
