// src/pages/Channel.jsx
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Message from '../components/Message';
import Poll from '../components/Poll';

const dummyMessages = [
  {
    id: 1,
    author: 'Alice',
    content: 'Hey team! Let’s get started.',
    timestamp: '10:00 AM',
  },
  {
    id: 2,
    author: 'Bob',
    content: 'Good morning! Any updates on the poll feature?',
    timestamp: '10:01 AM',
  },
];

export default function Channel() {
  const { id } = useParams();

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto space-y-6">
          <h2 className="text-2xl font-bold mb-4">Channel #{id}</h2>

          {/* Messages */}
          <section>
            {dummyMessages.map((msg) => (
              <Message
                key={msg.id}
                author={msg.author}
                content={msg.content}
                timestamp={msg.timestamp}
              />
            ))}
          </section>

          {/* Example Poll */}
          <Poll
            question="What feature should we add next?"
            options={['Threaded replies', 'Voice Chat', 'Message Reactions']}
          />
        </main>
      </div>
    </div>
  );
}
