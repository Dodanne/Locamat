import { useAuth } from '../../contexts/AuthContext';
import { Conversation } from '../../types/Conversation';
import FormatDate from '../FormatDate';
import { IoLocationOutline } from 'react-icons/io5';
import { FiTrash2 } from 'react-icons/fi';
import { ConversationsApi } from '../../services/ConversationsApi';

type ConversationsListProps = {
  conversations: Conversation[];
  activeId: number | null;
  onSelectConversation: (id: number) => void;
  ondeleteConversation: (id: number) => void;
};

export default function ConversationsList({
  conversations,
  activeId,
  onSelectConversation,
  ondeleteConversation,
}: ConversationsListProps) {
  const { user_id } = useAuth();
  const { deleteConversation } = ConversationsApi();

  async function handleDelete(conversation_id: number) {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette conversation ?')) return;
    try {
      await deleteConversation(conversation_id);
      ondeleteConversation(conversation_id);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      {conversations.map((conversation) => {
        const otherUser =
          conversation.owner_id === user_id ? conversation.renter : conversation.owner;
        const lastMessage =
          conversation.messages && conversation.messages.length > 0
            ? conversation.messages[conversation.messages.length - 1]
            : null;

        return (
          <div
            className={`p-2 border-b cursor-pointer border-gray-200 hover:bg-gray-200 ${activeId === conversation.conversation_id ? 'bg-blue-100' : ''}`}
            key={conversation.conversation_id}
            onClick={() => onSelectConversation(conversation.conversation_id)}
          >
            <div className="flex items-center gap-4">
              <img
                src={conversation.equipment.photo}
                alt={conversation.equipment.title}
                className="w-20 h-20 rounded-2xl shrink-0 object-cover"
              />

              <div className="flex justify-between items-center w-full pr-5">
                <div className="">
                  <p className="text-sm font-medium text-gray-900">
                    {conversation.equipment.title}
                  </p>
                  <p className="text-sm  italic text-primary line-clamp-1">
                    {lastMessage ? lastMessage.content : 'Pas de message'}
                  </p>
                  <p className="text-xs text-gray-500 flex ">
                    {otherUser.first_name} {otherUser.last_name} -{' '}
                    <IoLocationOutline className="translate-y-0.5" /> {otherUser.city}
                  </p>
                  <p className="text-xs text-gray-500">{FormatDate(conversation.updatedAt)}</p>
                </div>
                <div>
                  <button
                    className=" text-red-600 hover:text-red-400"
                    onClick={() => handleDelete(conversation.conversation_id)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
