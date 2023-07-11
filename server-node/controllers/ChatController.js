import asyncHandler from "express-async-handler";
import ConversationModel from "../models/ConversationModel.js";
import { MessageModel } from "../models/MessageModel.js";

const getAllConversation = asyncHandler(async (req, res) => {
  try {
    const allConversation = await ConversationModel.find().sort({
      updateAt: -1,
    });
    res.json(allConversation);
  } catch (error) {
    res.json({ message: error.message });
  }
});

const getMessageByConversation = asyncHandler(async (req, res) => {
  try {
    const user = await ConversationModel.findOne({
      $or: [{ idUser: req.query.idUser }, { _id: req.query.idConversation }],
    }).exec();

    if (!user) {
      return res.status(400).json({
        message: "Failed",
      });
    }

    const messages = await MessageModel.find({
      nameConversation: user.name,
    })
      .populate("idConversation")
      .exec();
    return res.status(200).json({
      messageList: messages,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const postSaveMessage = asyncHandler(async (req, res) => {
  try {
    const messageText = new MessageModel({
      sender: req.body.sender,
      message: req.body.message,
      idConversation: req.body.idConversation,
    });
    const createMessage = await messageText.save();
    res.send(createMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { getAllConversation, getMessageByConversation, postSaveMessage };
