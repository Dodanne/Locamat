import { Conversation, Message, User, Equipment } from "../models/index.js";
import { Op } from "sequelize";
import { createMessageService } from "../services/conversation.service.js";

export const findConversation = async (conversation_id, user_id) => {
  return await Conversation.findOne({
    where: {
      conversation_id,
      [Op.or]: [{ owner_id: user_id }, { renter_id: user_id }],
    },
  });
};

export const getConversations = async (req, res) => {
  try {
    const user_id = req.user.id;
    const data = await Conversation.findAll({
      where: {
        [Op.or]: [{ owner_id: user_id }, { renter_id: user_id }],
      },
      include: [
        {
          model: User,
          as: "owner",
          attributes: [
            "user_id",
            "first_name",
            "last_name",
            "photo",
            "city",
            "rating_avg",
            "rating_count",
          ],
        },
        {
          model: User,
          as: "renter",
          attributes: [
            "user_id",
            "first_name",
            "last_name",
            "photo",
            "city",
            "rating_avg",
            "rating_count",
          ],
        },
        {
          model: Equipment,
          as: "equipment",
          attributes: ["equipment_id", "title", "photo"],
        },
        {
          model: Message,
          as: "messages",
          limit: 1,
          order: [["createdAt", "DESC"]],
        },
      ],
      order: [["updatedAt", "DESC"]],
    });

    res.json(data);
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const createConversation = async (req, res) => {
  try {
    const { owner_id, renter_id, equipment_id } = req.body;
    const existingConversation = await Conversation.findOne({
      where: {
        [Op.or]: [
          { owner_id, renter_id, equipment_id },
          { owner_id: renter_id, renter_id: owner_id, equipment_id },
        ],
      },
    });
    if (existingConversation) {
      return res.json({ conversation: existingConversation, created: false });
    }
    const data = await Conversation.create({
      owner_id,
      renter_id,
      equipment_id,
    });
    res.json({ conversation: data, created: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
// export const createMessage = async (req, res) => {
//   try {
//     const { conversation_id, content } = req.body;
//     const sender_id = req.user.user_id;

//     const { message } = await createMessageService({
//       conversation_id,
//       sender_id,
//       content,
//     });
//     res.json(message);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Erreur lors de la creation du message" });
//   }
// };
export const getMessages = async (req, res) => {
  try {
    const user_id = req.user.id;
    const conversation_id = req.params.conversation_id;
    const conversation = await findConversation(conversation_id, user_id);
    if (!conversation) {
      return res.json({ error: "Conversation non trouvee" });
    }
    const data = await Message.findAll({
      where: { conversation_id },
      order: [["createdAt", "ASC"]],
    });
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
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export default {
  getConversations,
  createConversation,
  getMessages,
  // createMessage,
  findConversation,
};
