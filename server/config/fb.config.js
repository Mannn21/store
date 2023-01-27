const { initializeApp, cert } = require('firebase-admin/app')
const { getStorage } = require('firebase-admin/storage')

const serviceAccount = require('../creds.json')

initializeApp({
    credential: cert(serviceAccount),
    storageBucket: 'Images/'
})

const db = getStorage()

module.exports = { db }