import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Conversation } from '../../types/Conversation';
import { Message } from '../../types/Message';
import FormatDate from '../FormatDate';
import getInitials from '../GetInitials';
import { BsCheck2All } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function MessageDetails({
  messages,
  conversation,
  sendMessage,
}: {
  messages: Message[];
  conversation: Conversation;
  sendMessage: (content: string) => void;
}) {
  const { user_id } = useAuth();
  const otherUser = conversation.owner_id === user_id ? conversation.renter : conversation.owner;
  const [input, setInput] = useState('');

  function handleSend() {
    if (input.trim() === '') return;
    sendMessage(input);
    setInput('');
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-center p-4 border-b border-gray-200 shrink-0">
        <Link to={`/user-profile/${otherUser.user_id}`} className="flex items-center gap-4">
          <span className="relative flex shrink-0 overflow-hidden rounded-full h-16 w-16 md:h-24 md:w-24">
            {conversation && otherUser.photo && otherUser.photo !== 'NULL' ? (
              <img
                src={otherUser.photo}
                alt={otherUser.first_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="flex items-center justify-center w-full h-full text-2xl font-bold text-white bg-accent rounded-full">
                {getInitials(otherUser)}
              </span>
            )}
          </span>
          <h2 className="text-lg font-medium text-gray-900">
            {otherUser.first_name} {otherUser.last_name}
          </h2>
          <div className="flex gap-2">
            <div className="flex gap-1">
              <FaStar className="text-yellow-400 transform translate-y-1" />
              <span className="text-gray-900">{otherUser.rating_avg}</span>
            </div>
            <span className="text-gray-500">({otherUser.rating_count} avis)</span>
          </div>
        </Link>
        <div className="ml-auto text-gray-500 text-sm italic">
          {conversation.owner_id === otherUser.user_id
            ? 'proprietaire du materiel'
            : 'locataire du materiel'}
        </div>
      </div>
      <div className=" flex flex-col flex-1 min-h-0">
        <div id="message-container" className="flex-1 overflow-y-auto p-4">
          {messages.map((message) =>
            message.sender_id === otherUser.user_id ? (
              <div key={message.message_id} className="mb-1">
                <p className="text-sm text-gray-500 mb-1">{FormatDate(message.updatedAt)}</p>
                <div className="inline-block bg-gray-300 px-4 py-2 rounded-lg max-w-s">
                  {message.content}
                </div>
              </div>
            ) : (
              <div key={message.message_id} className="flex flex-1 p-2 justify-end ">
                <div className="mb-1 ">
                  <p className="text-sm text-gray-500 mb-1">{FormatDate(message.updatedAt)}</p>
                  <div className="inline-block bg-accent text-white px-4 py-2 rounded-lg max-w-s">
                    {message.content}
                  </div>
                  <p className="text-lg mb-1 flex justify-end">
                    {message.read ? (
                      <BsCheck2All className="text-accent" />
                    ) : (
                      <BsCheck2All className="text-gray-500" />
                    )}
                  </p>
                </div>
              </div>
            ),
          )}
        </div>
        <div className="sticky bottom-0 bg-white flex items-center gap-4 p-4 border-t border-gray-200 shrink-0">
          <input
            type="text"
            className="form-input flex-1 rounded-lg border-gray-300 focus:ring focus:ring-primary focus:ring-opacity-50"
            placeholder="Écrire un message..."
            value={input}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className=" btn-primary rounded-lg" onClick={handleSend}>
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}
