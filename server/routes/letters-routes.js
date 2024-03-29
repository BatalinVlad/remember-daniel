const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

const lettersController = require('../controllers/letters-controller');

router.get('/', lettersController.getLetters);

router.post('/create/',
    [
        check('firstName')
            .not()
            .isEmpty(),
    ],
    [
        check('lastName')
            .not()
            .isEmpty(),
    ],
    [
        check('letter')
            .not()
            .isEmpty(),
    ],
    lettersController.createLetter);

router.put('/:lid', lettersController.updateLetter)

router.delete('/:lid', lettersController.deleteLetter)

module.exports = router;
