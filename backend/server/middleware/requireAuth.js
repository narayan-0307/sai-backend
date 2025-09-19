const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requireAuth = async (req, res, next) => {

    const secret = process.env.USER_SECRET || 'dev_secret_change_me'

    // verify auth
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization Token Required' })
    }

    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, secret)

        req.user = await User.findOne({ _id }).select('_id')
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Request is not authorized' })
    }

}

module.exports = requireAuth