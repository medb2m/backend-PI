import Chat from '../models/chat.model.js'

// add Message to chat
export function addMessage (req, res) {
    const messageData = {
        name: req.user.username,
        message: req.body.message,
        userID: req.user.id
    };

    Chat.create(messageData).then(newMsg => {
        if (res) {
            res.status(201).json(newMsg);
        }
    })
    .catch(err => {
        if(res) {
            res.status(500).json(err)
        }
    })
}

// get all messages in the chat
export function getAll (req, res) {
    Chat.find({}).then( messages => {
        res.status(200).json(messages)
    })
    .catch(err => {
        res.status(500).json(err)
    })
}