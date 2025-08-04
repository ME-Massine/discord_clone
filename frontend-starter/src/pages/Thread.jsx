import { useParams } from 'react-router-dom';

export default function Thread() {
  const { id, threadId } = useParams();
  return <div className="p-4 text-xl">🧵 Thread {threadId} in Channel {id}</div>;
}
