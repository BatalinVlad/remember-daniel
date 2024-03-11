const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Letter = require('../models/letter');

const getLetters = async (req, res, next) => {
    let letters;
    try {
      letters = await Letter.find();
    } catch (err) {
      const error = new HttpError('fetching letters failed, please try again later', 500)
      return next(error);
    }
    res.json({ loadedLetters: letters.map(letter => letter.toObject({ getters: true })) })
  };


const createLetter = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    const createdLetter = new Letter({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        isApproved: false,
        letter: req.body.letter
    });

    try {
        await createdLetter.save();
    } catch (err) {
        const error = new HttpError('Something went wrong, could not save', 500);
        return next(error);
    }

    res.status(201).json({ letter: createdLetter.toObject({ getters: true }) });
}

exports.getLetters = getLetters;
exports.createLetter = createLetter;
