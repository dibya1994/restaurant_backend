const express = require('express');


const {list, add, store, edit, update, userDelete} = require('../controllers/brandController');
const validationRule= require('../middlewares/validation-rule');
const router = express.Router();

router.get('/api/user-list', list);
router.get('/brand-add', add);
router.post('/api/user-store', store);
router.get('/api/user-edit/:id', edit);
router.post('/api/user-update', update);
router.post('/api/user-delete', userDelete);

module.exports = {
    routes:router
}