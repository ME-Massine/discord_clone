// src/pages/CalendarPage.jsx
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';

const locales = { 'en-US': enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarPage = () => {
  const [events, setEvents] = useState([
    {
      title: 'Team Sync Meeting',
      start: new Date(),
      end: new Date(new Date().getTime() + 60 * 60 * 1000),
      type: 'meeting'
    },
    {
      title: 'Code Review Session',
      start: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
      end: new Date(new Date().getTime() + 3 * 60 * 60 * 1000),
      type: 'development'
    },
    {
      title: 'Gaming Night',
      start: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      end: new Date(new Date().getTime() + 26 * 60 * 60 * 1000),
      type: 'social'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
    type: 'meeting'
  });

  const eventTypes = [
    { value: 'meeting', label: 'Meeting', icon: '🤝', color: 'from-blue-500 to-cyan-500' },
    { value: 'development', label: 'Development', icon: '💻', color: 'from-green-500 to-emerald-500' },
    { value: 'social', label: 'Social', icon: '🎉', color: 'from-purple-500 to-pink-500' },
    { value: 'deadline', label: 'Deadline', icon: '⏰', color: 'from-red-500 to-orange-500' }
  ];

  const handleAddEvent = () => {
    const start = new Date(newEvent.start);
    const end = new Date(newEvent.end);
    if (!newEvent.title || isNaN(start) || isNaN(end)) return;

    setEvents([...events, { 
      title: newEvent.title, 
      start, 
      end, 
      type: newEvent.type 
    }]);
    setNewEvent({ title: '', start: '', end: '', type: 'meeting' });
    setShowModal(false);
  };

  const getEventStyle = (event) => {
    const type = eventTypes.find(t => t.value === event.type);
    if (!type) return {};
    
    return {
      backgroundColor: 'rgba(147, 51, 234, 0.8)',
      borderRadius: '8px',
      border: 'none',
      color: 'white',
      padding: '4px 8px'
    };
  };

  return (
    <div className="h-full w-full bg-transparent text-white p-6 overflow-y-auto relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/10 to-pink-900/10"></div>
      <div className="absolute top-20 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl floating-animation"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl floating-animation" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-black gradient-text mb-2">📅 Channel Calendar</h1>
              <p className="text-white/70 text-lg">Schedule and organize team events seamlessly</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-purple-500/25 hover:scale-105 transition-all duration-300"
            >
              ✨ Create Event
            </button>
          </div>

          {/* Event Type Legend */}
          <div className="flex flex-wrap gap-4">
            {eventTypes.map((type) => (
              <div key={type.value} className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl">
                <span className="text-lg">{type.icon}</span>
                <span className="text-white font-medium">{type.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar Container */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            className="text-white"
            eventPropGetter={getEventStyle}
            views={['month', 'week', 'day', 'agenda']}
            defaultView="month"
            selectable
            popup
            onSelectEvent={(event) => console.log('Event clicked:', event)}
          />
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">📅</div>
            <div className="text-2xl font-bold text-white">{events.length}</div>
            <div className="text-white/60">Total Events</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">🤝</div>
            <div className="text-2xl font-bold text-white">{events.filter(e => e.type === 'meeting').length}</div>
            <div className="text-white/60">Meetings</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">💻</div>
            <div className="text-2xl font-bold text-white">{events.filter(e => e.type === 'development').length}</div>
            <div className="text-white/60">Development</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">🎉</div>
            <div className="text-2xl font-bold text-white">{events.filter(e => e.type === 'social').length}</div>
            <div className="text-white/60">Social</div>
          </div>
        </div>
      </div>

      {/* Create Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900/95 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-md">
            <h3 className="text-2xl font-bold text-white mb-6">✨ Create New Event</h3>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Event Title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass-input"
              />
              
              <select
                value={newEvent.type}
                onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass-input"
              >
                {eventTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.icon} {type.label}
                  </option>
                ))}
              </select>
              
              <input
                type="datetime-local"
                value={newEvent.start}
                onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass-input"
              />
              
              <input
                type="datetime-local"
                value={newEvent.end}
                onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass-input"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold rounded-xl transition-all duration-300"
              >
                Create Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
