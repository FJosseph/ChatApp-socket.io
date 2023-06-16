const {Router} = require('express')
const { createUser, loginUser, getUSer } = require('../controllers/user')
const verify = require('../controllers/auth')
const route = Router()

route.post('/signin', async(req, res)=>{
    const {username, password} = req.body
    try {
        const user = await loginUser(username, password)
        res.send(user)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})
route.post('/signup', async(req, res)=>{
    const {firstname, lastname, username, password} = req.body
    try {
        const user = await createUser(firstname, lastname, username, password)
        res.send(user)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})

route.get('/user', verify, async(req, res)=>{
    const {idUser} = req
    try {
        const user = await getUSer(idUser)
        res.send(user) 
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})

module.exports = route