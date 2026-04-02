import { FaSearch } from 'react-icons/fa';
import ConversationsList from '../../components/chat/ConversationsList';
import MessageDetails from '../../components/chat/MessageDetails';
import { useEffect, useState } from 'react';
import { ConversationsApi } from '../../services/ConversationsApi';
import socket from '../../config/socket';
import { Conversation } from '../../types/Conversation';
import { Message } from '../../types/Message';
import { useLocation } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

export default function ChatPage() {
  const location = useLocation();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showMessages, setShowMessages] = useState(false);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const { getConversations, getMessages } = ConversationsApi();

  useEffect(() => {
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    async function fetchConversations() {
      try {
        const data = await getConversations();
        setConversations(data);

        if (data.length === 0) return;

        const stateId = location.state?.conversationId;
        const active = stateId
          ? data.find((conv: Conversation) => conv.conversation_id === stateId)
          : data[0];
        setActiveConversation(active ?? data[0]);
      } catch (err) {
        console.log(err);
      }
    }
    fetchConversations();
  }, [location.state]);

  useEffect(() => {
    //rejoindre
    if (activeConversation) {
      socket.emit('join_conversation', activeConversation.conversation_id);
    }
    setMessages([]);
    //charger les messages
    async function fetchMessages() {
      if (!activeConversation) return;
      try {
        const data = await getMessages(activeConversation.conversation_id);
        setMessages(data);
        socket.emit('read_messages', { conversation_id: activeConversation.conversation_id });
      } catch (err) {
        console.log(err);
      }
    }
    fetchMessages();
    //nouveau message reçu
    function onNewMessage(message: Message) {
      setMessages((prev) => [...prev, message]);
      socket.emit('read_messages', { conversation_id: activeConversation?.conversation_id });
    }
    function onMessageRead({
      conversation_id,
      user_id,
    }: {
      conversation_id: number;
      user_id: number;
    }) {
      if (conversation_id === activeConversation?.conversation_id) {
        setMessages((prev) =>
          prev.map((msg) => (msg.sender_id !== user_id ? { ...msg, read: true } : msg)),
        );
      }
    }
    // mise a jour des conv
    function conversationUpdated({
      conversation_id,
      last_message,
    }: {
      conversation_id: number;
      last_message: Message;
    }) {
      setConversations((prev) => {
        const updated = prev.map((conv) =>
          conv.conversation_id === conversation_id
            ? { ...conv, messages: [last_message], updatedAt: last_message.createdAt }
            : conv,
        );
        return updated.sort(
          (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        );
      });
    }
    socket.on('conversation_updated', conversationUpdated);
    socket.on('new_message', onNewMessage);
    socket.on('read_messages', onMessageRead);
    return () => {
      socket.emit('leave_conversation', activeConversation?.conversation_id);
      socket.off('conversation_updated', conversationUpdated);
      socket.off('new_message', onNewMessage);
      socket.off('read_messages', onMessageRead);
    };
  }, [activeConversation]);

  async function sendMessage(content: string) {
    if (!activeConversation || content.trim() === '') return;
    try {
      socket.emit('send_message', {
        conversation_id: activeConversation.conversation_id,
        content,
      });
    } catch (err) {
      console.log(err);
    }
  }
  function onSelectConversation(id: number) {
    const conv = conversations.find((c) => c.conversation_id === id);
    if (conv) {
      setActiveConversation(conv);
      setShowMessages(true);
    }
  }
  if (conversations.length === 0) {
    return (
      <div className={`container ${showMessages ? '' : 'py-8'}`}>
        <h1 className="text-3xl text-gray-900 mb-6">Messages</h1>
        <div className="flex flex-col gap-6 rounded-xl bg-white p-4">
          <p className="text-gray-500">Vous n'avez aucune conversation pour le moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className={`text-3xl text-gray-900 mb-6 ${showMessages ? 'hidden lg:block' : ''}`}>
        Messages
      </h1>
      <div className="rounded-xl bg-white h-[calc(100dvh-4rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
          <div
            className={`border-r border-gray-200 overflow-y-auto ${showMessages ? 'hidden lg:block' : 'block'}`}
          >
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <FaSearch className="absolute left-3 mt-1 top-1/2 translate-y-1/2 text-gray-400" />
                <input className="form-input pl-10" placeholder="Rechercher une conversation..." />
              </div>
            </div>
            <ConversationsList
              conversations={conversations}
              activeId={activeConversation?.conversation_id ?? null}
              onSelectConversation={onSelectConversation}
            />
          </div>

          <div
            className={`lg:col-span-2 flex flex-col min-h-0 ${showMessages ? 'block' : 'hidden lg:flex'}`}
          >
            {activeConversation && (
              <>
                <button
                  className="lg:hidden flex items-center gap-2 p-3 text-sm text-gray-500 border-b border-gray-200"
                  onClick={() => setShowMessages(false)}
                >
                  <IoIosArrowBack /> Retour
                </button>
                <MessageDetails
                  conversation={activeConversation}
                  messages={messages}
                  sendMessage={sendMessage}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
