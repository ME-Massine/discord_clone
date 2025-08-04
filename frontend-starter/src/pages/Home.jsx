// src/pages/Home.jsx

const Home = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-gray-800 text-white p-8 animate-fade-in">
      <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-500 drop-shadow-lg">
        🏠 Welcome to My Discord Clone
      </h1>
      <p className="text-lg text-center max-w-xl text-gray-300">
        This is a lightweight real-time messaging app inspired by Discord, built using React and TailwindCSS. Use the sidebar to navigate to channels and chat in real-time.
      </p>
    </div>
  );
};

export default Home;
