const {Router}= require ('express');

const { userGet,
        userPut, 
        userPost, 
        userDelete,
        userPatch } = require('../controllers/user.controller');

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', userGet);

router.post('/',[
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('nombre', 'El nombre es obligaorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']), 
    validarCampos
],userPost);

router.put('/:id', userPut);
router.patch('/',userPatch);
router.delete('/',userDelete);



module.exports = router;