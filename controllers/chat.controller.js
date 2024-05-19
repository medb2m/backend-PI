import Chat from '../models/chat.model.js'

// add Message to chat
export function addMessage (req, res) {
    Chat.create(req.body).then(newMsg => {
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