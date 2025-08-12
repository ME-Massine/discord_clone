// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Channel from "./pages/Channel";
import CalendarPage from "./pages/Calendar";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
// import BusinessDashboard from "./components/BusinessDashboard";
// import TaskManager from "./components/TaskManager";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-transparent text-white overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Navbar */}
          <Navbar />
          
          {/* Page Content */}
          <div className="flex-1 overflow-hidden">
            <Routes>
              <Route index element={<Home />} />
              <Route path="channel/:id" element={<Channel />} />
              <Route path="/calendar" element={<CalendarPage />} />
              {/* <Route path="/dashboard" element={<BusinessDashboard />} />
              <Route path="/tasks" element={<TaskManager />} />
              <Route path="/analytics" element={<BusinessDashboard />} /> */}
              
              {/* Catch-all route for any unmatched paths */}
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
