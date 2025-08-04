import {useParams} from "react-router-dom";
import {useState, useRef, useEffect} from "react";
import {Calendar, dateFnsLocalizer} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import {enUS} from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
    "en-US": enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const Channel = () => {
    const {id} = useParams();
    const [activeTab, setActiveTab] = useState("messages");
    const bottomRef = useRef(null);
    const [input, setInput] = useState("");
    const [newEvent, setNewEvent] = useState({title: "", start: "", end: ""});

    const [messages, setMessages] = useState([]);
    const [events, setEvents] = useState([]);

    // Load saved messages and events on mount
    useEffect(() => {
        const savedMessages =
            JSON.parse(localStorage.getItem(`messages-${id}`)) ||
            [
                {sender: "Alice", text: `Welcome to channel ${id}`},
                {sender: "Bob", text: "Hey there!"},
            ];
        const savedEvents = JSON.parse(localStorage.getItem(`events-${id}`)) || [];
        setMessages(savedMessages);
        setEvents(savedEvents);
    }, [id]);

    // Save messages to localStorage when updated
    useEffect(() => {
        localStorage.setItem(`messages-${id}`, JSON.stringify(messages));
        bottomRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages, id]);

    // Save events to localStorage when updated
    useEffect(() => {
        localStorage.setItem(`events-${id}`, JSON.stringify(events));
    }, [events, id]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        setMessages([...messages, {sender: "You", text: input}]);
        setInput("");
    };

    const handleAddEvent = (e) => {
        e.preventDefault();
        if (!newEvent.title || !newEvent.start || !newEvent.end) return;
        setEvents([
            ...events,
            {
                ...newEvent,
                start: new Date(newEvent.start),
                end: new Date(newEvent.end),
            },
        ]);
        setNewEvent({title: "", start: "", end: ""});
    };
    const handleDeleteMessage = (index) => {
        const newMessages = [...messages];
        newMessages.splice(index, 1);
        setMessages(newMessages);
    };

    return (
        <div className="flex flex-col h-full bg-gray-900 text-white">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <h2 className="text-xl font-bold">#{id}</h2>
                <div className="space-x-4">
                    <button
                        onClick={() => setActiveTab("messages")}
                        className={`px-3 py-1 rounded ${
                            activeTab === "messages" ? "bg-indigo-600" : "bg-gray-700"
                        }`}
                    >
                        📨 Messages
                    </button>
                    <button
                        onClick={() => setActiveTab("calendar")}
                        className={`px-3 py-1 rounded ${
                            activeTab === "calendar" ? "bg-indigo-600" : "bg-gray-700"
                        }`}
                    >
                        📆 Calendar
                    </button>
                </div>
            </div>

            {/* MESSAGES TAB */}
            {activeTab === "messages" && (
                <>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, idx) => (
                            <div key={idx} className="flex items-start space-x-3">
                                <div
                                    className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold">
                                    {msg.sender.charAt(0).toUpperCase()}
                                </div>
                                <div
                                    className="relative group bg-gray-700 rounded-lg px-4 py-2 max-w-md hover:bg-gray-600 transition">
                                    <div className="font-semibold text-indigo-300">{msg.sender}</div>
                                    <div className="text-white">{msg.text}</div>

                                    {/* Hover Actions */}
                                    {msg.sender === "You" && (
                                        <button
                                            onClick={() => handleDeleteMessage(idx)}
                                            className="absolute top-2 right-2 text-sm text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
                                            title="Delete message"
                                        >
                                            🗑️
                                        </button>
                                    )}

                                </div>

                            </div>
                        ))}
                        <div ref={bottomRef}/>
                    </div>

                    <form
                        onSubmit={handleSend}
                        className="p-4 border-t border-gray-700 bg-gray-800 flex items-center space-x-2"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 p-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring"
                        />
                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
                        >
                            Send
                        </button>
                    </form>
                </>
            )}

            {/* CALENDAR TAB */}
            {activeTab === "calendar" && (
                <div className="flex flex-col flex-1 p-4 space-y-4 bg-white text-gray-900 overflow-y-auto">
                    <form onSubmit={handleAddEvent} className="space-y-2">
                        <input
                            type="text"
                            placeholder="Event Title"
                            value={newEvent.title}
                            onChange={(e) =>
                                setNewEvent({...newEvent, title: e.target.value})
                            }
                            className="p-2 border rounded w-full"
                        />
                        <input
                            type="datetime-local"
                            value={newEvent.start}
                            onChange={(e) =>
                                setNewEvent({...newEvent, start: e.target.value})
                            }
                            className="p-2 border rounded w-full"
                        />
                        <input
                            type="datetime-local"
                            value={newEvent.end}
                            onChange={(e) =>
                                setNewEvent({...newEvent, end: e.target.value})
                            }
                            className="p-2 border rounded w-full"
                        />
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                        >
                            Add Event
                        </button>
                    </form>

                    <div className="h-[400px]">
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            style={{
                                height: "100%",
                                backgroundColor: "white",
                                color: "black",
                                padding: "1rem",
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Channel;
