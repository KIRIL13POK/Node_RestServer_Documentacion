const {Router}= require ('express');

const { userGet,
        userPut, 
        userPost, 
        userDelete,
        userPatch } = require('../controllers/user.controller');

const { check } = require('express-validator');

const router = Router();

router.get('/', userGet);

router.post('/',[
    check('correo', 'El correo no es válido').isEmail()
],userPost);

router.put('/:id', userPut);
router.patch('/',userPatch);
router.delete('/',userDelete);



module.exports = router;