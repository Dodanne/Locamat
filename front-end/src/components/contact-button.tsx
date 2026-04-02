import { ConversationsApi } from '../services/ConversationsApi';
import { useAuth } from '../contexts/AuthContext';
import { CiChat1 } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { Equipment } from '../types/Equipment';

export default function ContactButton({ equipment }: { equipment: Equipment }) {
  const { createConversation } = ConversationsApi();
  const { user_id } = useAuth();
  const navigate = useNavigate();

  async function handleClick() {
    if (!equipment) return;
    try {
      const { conversation } = await createConversation({
        owner_id: equipment.owner_id,
        renter_id: Number(user_id),
        equipment_id: equipment.equipment_id,
      });
      navigate(`/chat`, { state: { conversationId: conversation.conversation_id } });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <button className="btn p-3 bg-gray-100 hover:bg-gray-200  text-gray-900" onClick={handleClick}>
      {' '}
      <CiChat1 className="text-xl " strokeWidth={1} />{' '}
      <span className="hidden md:block"> Contacter </span>
    </button>
  );
}
