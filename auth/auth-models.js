const data = require('../database/dbConfig')

module.exports = {
    register,
    login
}


function register(userData) {
    return data('users')
    .insert(userData)
}

function login(userName) {
    return data('users')
    .where(userName)
}