const {User} = require('../db')
const jwt = require('jsonwebtoken')

const verify = async(req, res, next)=>{
    const token = req.headers['x-access-token']
    if(!token) res.status(404).json({message: 'Token must provide'})
    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        req.idUser = decode.idUser
        next()        
    } catch (error) {
        res.status(404).json({auth: false, message: error.message})
    }
}


module.exports = verify