import { Op } from "sequelize";
import { findConversation } from "../controllers/conversation.controller.js";
import Message from "../models/Message.js";

export const createMessageService = async ({
  conversation_id,
  sender_id,
  content,
}) => {
  try {
    const conversation = await findConversation(conversation_id, sender_id);

    if (!conversation) {
      throw new Error("Conversation non trouvee");
    }
    const data = await Message.create({ conversation_id, sender_id, content });
    await conversation.update({ updatedAt: new Date() });

    const receiver_id =
      conversation.owner_id === sender_id
        ? conversation.renter_id
        : conversation.owner_id;
    return { message: data, receiver_id };
  } catch (err) {
    console.log(err);
    throw new Error("Erreur lors de la creation du message");
  }
};

export const markMessagesAsReadService = async ({
  conversation_id,
  user_id,
}) => {
  try {
    const conversation = await findConversation(conversation_id, user_id);
    if (!conversation) {
      throw new Error("Conversation non trouvee");
    }
    await Message.update(
      { read: true },
      {
        where: {
          conversation_id,
          sender_id: { [Op.ne]: user_id },
          read: false,
        },
      },
    );
    return true;
  } catch (err) {
    console.log(err);
    throw new Error("Erreur lors de la mise à jour des messages");
  }
};
