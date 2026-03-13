import { Conversation, Message, User, Equipment } from "../models/index.js";
import { Op } from "sequelize";

export const getConversations = async (req, res) => {
  try {
    const user_id = req.user.id;
    const data = await Conversation.findAll({
      where: {
        [Op.or]: [{ user1_id: user_id }, { user2_id: user_id }],
      },
      include: [
        {
          model: User,
          as: "user1",
          attributes: ["user_id", "first_name", "last_name", "photo", "city"],
        },
        {
          model: User,
          as: "user2",
          attributes: ["user_id", "first_name", "last_name", "photo", "city"],
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
