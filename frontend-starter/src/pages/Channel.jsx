import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import MessageInput from "../components/MessageInput";



const Channel = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("messages");
    const [input, setInput] = useState("");
    const [toast, setToast] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Debug logging
    console.log('Channel component rendered with id:', id);

    // Helper function to get channel name
    const getChannelName = (id) => {
        const channelNames = {
            1: "general",
            2: "announcements",
            3: "development",
            4: "marketing",
            5: "sales",
            6: "hr",
            7: "finance",
            8: "support"
        };
        return channelNames[id] || `channel-${id}`;
    };

    // Load messages for this channel from localStorage
    const [messages, setMessages] = useState(() => {
        try {
            const saved = localStorage.getItem(`messages-${id}`);
            return saved
                ? JSON.parse(saved)
                : [
                    { id: 1, sender: "Alice Johnson", text: `Welcome to the ${getChannelName(id)} channel! Please review our updated communication guidelines.`, timestamp: new Date(Date.now() - 3600000), pinned: false },
                    { id: 2, sender: "Bob Smith", text: "Thank you for the update. I'll make sure our team follows the new protocols.", timestamp: new Date(Date.now() - 1800000), pinned: false },
                    { id: 3, sender: "Carol Davis", text: "Great initiative! This will definitely improve our workflow efficiency.", timestamp: new Date(Date.now() - 900000), pinned: false },
                ];
        } catch (error) {
            console.error('Error loading messages:', error);
            return [
                { id: 1, sender: "System", text: `Welcome to the ${getChannelName(id)} channel!`, timestamp: new Date(), pinned: false }
            ];
        }
    });

    // Set loading to false after component mounts
    useEffect(() => {
        console.log('Channel useEffect - setting loading to false');
        setIsLoading(false);
    }, []);

    // Show loading state
    if (isLoading) {
        console.log('Channel is loading...');
        return (
            <div className="h-full w-full flex items-center justify-center bg-transparent">
                <div className="text-white text-lg">Loading channel...</div>
            </div>
        );
    }

    console.log('Channel rendering with messages:', messages.length);



    // Save messages for this channel
    useEffect(() => {
        localStorage.setItem(`messages-${id}`, JSON.stringify(messages));
    }, [messages, id]);

    const handleSend = (messageText) => {
        if (!messageText.trim()) return;
        const newMsg = { 
            id: Date.now(), 
            sender: "You", 
            text: messageText, 
            timestamp: new Date(),
            pinned: false 
        };
        setMessages((prev) => [...prev, newMsg]);
        setInput("");
    };

    const togglePin = (msgId) => {
        setMessages((prevMessages) =>
            prevMessages.map((msg) => {
                if (msg.id === msgId) {
                    const pinnedNow = !msg.pinned;
                    showToast(pinnedNow ? "Message pinned" : "Message unpinned");
                    return { ...msg, pinned: pinnedNow };
                }
                return msg;
            })
        );
    };

    const unpinAll = () => {
        setMessages((prevMessages) =>
            prevMessages.map((msg) => ({ ...msg, pinned: false }))
        );
        showToast("All messages unpinned");
    };



    const showToast = (text) => {
        setToast(text);
        setTimeout(() => setToast(null), 2500);
    };

    const pinnedMessages = messages.filter((msg) => msg.pinned);

    return (
        <div className="flex flex-col h-full bg-transparent text-white relative">


            {/* Toast Notification */}
            {toast && (
                <div className="absolute top-4 right-4 z-50 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-xl shadow-2xl animate-fadeInUp">
                    {toast}
                </div>
            )}

            {/* Header Tabs */}
            <div className="bg-black/20 backdrop-blur-xl border-b border-white/10 p-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <h2 className="text-2xl font-bold text-white">#{getChannelName(id)}</h2>
                        <div className="flex items-center space-x-2 text-sm text-white/60">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span>Active now</span>
                        </div>
                    </div>
                    
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setActiveTab("messages")}
                            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                                activeTab === "messages"
                                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25"
                                    : "bg-white/10 hover:bg-white/20 text-white/70 hover:text-white border border-white/20"
                            }`}
                        >
                            📨 Messages
                        </button>
                        <button
                            onClick={() => setActiveTab("pinned")}
                            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                                activeTab === "pinned"
                                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/25"
                                    : "bg-white/10 hover:bg-white/20 text-white/70 hover:text-white border border-white/20"
                            }`}
                        >
                            📌 Pinned
                        </button>
                        <button
                            onClick={() => setActiveTab("calendar")}
                            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                                activeTab === "calendar"
                                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25"
                                    : "bg-white/10 hover:bg-white/20 text-white/70 hover:text-white border border-white/20"
                            }`}
                        >
                            📆 Calendar
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden">
                {/* Messages Tab */}
                {activeTab === "messages" && (
                    <div className="flex flex-col h-full">
                        <div className="flex-1 overflow-y-auto p-4">
                            <div className="space-y-4">
                                {messages.map((message) => (
                                    <div key={message.id} className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-4">
                                        <div className="flex items-start space-x-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                                                {message.sender.charAt(0)}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <span className="font-semibold text-white">{message.sender}</span>
                                                    <span className="text-xs text-white/60">
                                                        {message.timestamp.toLocaleTimeString()}
                                                    </span>
                                                </div>
                                                <p className="text-white/90">{message.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <MessageInput onSend={handleSend} />
                    </div>
                )}

                {/* Pinned Messages Tab */}
                {activeTab === "pinned" && (
                    <div className="flex flex-col h-full p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Pinned Tab Active</h3>
                        <p className="text-white/70">This is the pinned messages tab content.</p>
                    </div>
                )}

                {/* Calendar Tab */}
                {activeTab === "calendar" && (
                    <div className="flex flex-col h-full p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Calendar Tab Active</h3>
                        <p className="text-white/70">This is the calendar tab content.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Channel;
