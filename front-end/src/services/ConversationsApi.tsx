import apiAuth from '../api/axiosAuth';

export function ConversationsApi() {
  async function getConversations() {
    try {
      const res = await apiAuth.get(`/conversations`);
      return res.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async function getMessages(conversationId: number) {
    try {
      const res = await apiAuth.get(`/conversations/${conversationId}/messages`);
      return res.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  // async function postMessage(conversation_id: number, content: string, sender_id: number) {
  //   try {
  //     const res = await apiAuth.post(`/messages`, {
  //       content,
  //       sender_id,
  //       conversation_id,
  //     });
  //     return res.data;
  //   } catch (err) {
  //     console.log(err);
  //     return [];
  //   }
  // }
  async function createConversation({
    owner_id,
    renter_id,
    equipment_id,
  }: {
    owner_id: number;
    renter_id: number;
    equipment_id?: number;
  }) {
    try {
      const res = await apiAuth.post(`/conversations`, {
        owner_id,
        renter_id,
        equipment_id,
      });
      return res.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  return {
    getConversations,
    getMessages,
    // postMessage,
    createConversation,
  };
}
