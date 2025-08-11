import {useParams} from "react-router-dom";
import {useState, useRef, useEffect} from "react";
import {Calendar, dateFnsLocalizer} from "react-big-calendar";
import {format, parse, startOfWeek, getDay} from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {enUS} from "date-fns/locale";

const locales = {"en-US": enUS};
const localizer = dateFnsLocalizer({format, parse, startOfWeek, getDay, locales});

const Channel = () => {
    const {id} = useParams();
    const [activeTab, setActiveTab] = useState("messages");
    const bottomRef = useRef(null);
    const [input, setInput] = useState("");
    const [toast, setToast] = useState(null);

    // Load messages for this channel from localStorage
    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem(`messages-${id}`);
        return saved
            ? JSON.parse(saved)
            : [
                {id: 1, sender: "Alice", text: `Welcome to channel ${id}`, pinned: false},
                {id: 2, sender: "Bob", text: "Hey there!", pinned: false},
            ];
    });

    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({title: "", start: "", end: ""});

    // Save messages for this channel
    useEffect(() => {
        localStorage.setItem(`messages-${id}`, JSON.stringify(messages));
    }, [messages, id]);

    // Scroll to bottom for messages tab
    useEffect(() => {
        if (activeTab === "messages") {
            bottomRef.current?.scrollIntoView({behavior: "smooth"});
        }
    }, [messages, activeTab]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        const newMsg = {id: Date.now(), sender: "You", text: input, pinned: false};
        setMessages((prev) => [...prev, newMsg]);
        setInput("");
    };

    const togglePin = (msgId) => {
        setMessages((prevMessages) =>
            prevMessages.map((msg) => {
                if (msg.id === msgId) {
                    const pinnedNow = !msg.pinned;
                    showToast(pinnedNow ? "Message pinned" : "Message unpinned");
                    return {...msg, pinned: pinnedNow};
                }
                return msg;
            })
        );
    };

    const unpinAll = () => {
        setMessages((prevMessages) =>
            prevMessages.map((msg) => ({...msg, pinned: false}))
        );
        showToast("All messages unpinned");
    };

    const handleAddEvent = (e) => {
        e.preventDefault();
        if (!newEvent.title || !newEvent.start || !newEvent.end) return;
        setEvents((prev) => [
            ...prev,
            {
                ...newEvent,
                start: new Date(newEvent.start),
                end: new Date(newEvent.end),
            },
        ]);
        setNewEvent({title: "", start: "", end: ""});
    };

    const showToast = (text) => {
        setToast(text);
        setTimeout(() => setToast(null), 2500);
    };

    const pinnedMessages = messages.filter((msg) => msg.pinned);

    return (
        <div className="flex flex-col h-full bg-gray-900 text-white relative">
            {/* Toast Notification */}
            {toast && (
                <div
                    className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded shadow-lg animate-fadeIn">
                    {toast}
                </div>
            )}

            {/* Header Tabs */}
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <h2 className="text-xl font-bold">#{id}</h2>
                <div className="space-x-2">
                    <button
                        onClick={() => setActiveTab("messages")}
                        className={`px-3 py-1 rounded ${activeTab === "messages" ? "bg-indigo-600" : "bg-gray-700"}`}
                    >
                        📨 Messages
                    </button>
                    <button
                        onClick={() => setActiveTab("pinned")}
                        className={`px-3 py-1 rounded ${activeTab === "pinned" ? "bg-yellow-500" : "bg-gray-700"}`}
                    >
                        📌 Pinned
                    </button>
                    <button
                        onClick={() => setActiveTab("calendar")}
                        className={`px-3 py-1 rounded ${activeTab === "calendar" ? "bg-indigo-600" : "bg-gray-700"}`}
                    >
                        📆 Calendar
                    </button>
                </div>
            </div>

            {/* Messages */}
            {activeTab === "messages" && (
                <>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg) => (
                            <div key={msg.id} className="flex items-start space-x-3 group">
                                <div
                                    className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold">
                                    {msg.sender.charAt(0).toUpperCase()}
                                </div>
                                <div className="bg-gray-700 rounded-lg px-4 py-2 max-w-md relative">
                                    <div className="font-semibold text-indigo-300">{msg.sender}</div>
                                    <div className="text-white">{msg.text}</div>
                                    {msg.sender === "You" && (
                                        <button
                                            onClick={() => togglePin(msg.id)}
                                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-yellow-400"
                                        >
                                            📌
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

            {/* Pinned Messages */}
            {activeTab === "pinned" && (
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Pinned Messages</h3>
                        {pinnedMessages.length > 0 && (
                            <button
                                onClick={unpinAll}
                                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
                            >
                                Unpin All
                            </button>
                        )}
                    </div>

                    {pinnedMessages.length === 0 ? (
                        <p className="text-gray-400">No pinned messages yet.</p>
                    ) : (
                        pinnedMessages.map((msg) => (
                            <div key={msg.id} className="flex items-start space-x-3">
                                <div
                                    className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold">
                                    {msg.sender.charAt(0).toUpperCase()}
                                </div>
                                <div className="bg-gray-700 rounded-lg px-4 py-2 max-w-md relative">
                                    <div className="font-semibold text-indigo-300">{msg.sender}</div>
                                    <div className="text-white">{msg.text}</div>
                                    {msg.sender === "You" && (
                                        <button
                                            onClick={() => togglePin(msg.id)}
                                            className="absolute top-1 right-1 text-yellow-400"
                                        >
                                            📌
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Calendar */}
            {activeTab === "calendar" && (
                <div className="flex flex-col flex-1 p-4 space-y-4 bg-white text-gray-900 overflow-y-auto">
                    <form onSubmit={handleAddEvent} className="space-y-2">
                        <input
                            type="text"
                            placeholder="Event Title"
                            value={newEvent.title}
                            onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                            className="p-2 border rounded w-full"
                        />
                        <input
                            type="datetime-local"
                            value={newEvent.start}
                            onChange={(e) => setNewEvent({...newEvent, start: e.target.value})}
                            className="p-2 border rounded w-full"
                        />
                        <input
                            type="datetime-local"
                            value={newEvent.end}
                            onChange={(e) => setNewEvent({...newEvent, end: e.target.value})}
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
