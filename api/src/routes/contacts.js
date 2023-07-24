const { Router } = require("express");
const { addContact, decodeTokenQR } = require("../controllers/user");

const route = Router()

route.post('/', async (req, res)=>{
    const {new_contact} = req.body
    const {user_id, new_contact_token} = req.query
    try {
        if(new_contact_token){
            const new_contact_qr = decodeTokenQR(new_contact_token)
            const user = await addContact(new_contact_qr, user_id)
            return res.send(user)
        }
        const user = await addContact(new_contact, user_id)
        res.send(user)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})

module.exports = route