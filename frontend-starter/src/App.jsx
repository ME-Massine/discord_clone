// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Channel from "./pages/Channel";
import CalendarPage from "./pages/Calendar";
import Sidebar from "./components/Sidebar"; // ✅ import the reusable sidebar

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-800 text-white">
        {/* ✅ Use Sidebar component */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <Routes>
            <Route index element={<Home />} />
            <Route path="channel/:id" element={<Channel />} />
            <Route path="/calendar" element={<CalendarPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
