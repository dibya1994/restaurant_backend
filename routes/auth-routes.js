const express = require('express');


const {signup, signin , notes} = require('../controllers/authController');
const auth = require('../middlewares/auth');
const router = express.Router();


router.post('/api/signup', signup);
router.post('/api/signin', signin);
router.get('/api/notes', auth, notes);

module.exports = {
    routes:router
}