const express = require('express');
const uuid = require('uuid');
let User = require('../../models/User');

const {validationResult } = require('express-validator');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
  } catch (err) {
    res.status(500).send('Server errror');
  }
});

router.get(
  '/:id',
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.send(user);
    } catch (err) {
      res.status(500).send('Server  error');
    }
  }
);

router.post(
  '/',
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const user = new User({
        id: uuid.v4(),
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
      });
      const newUser = await user.save();
      res.send(newUser);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

router.delete('/', async (req, res) => {
  try {
    // find the element
    await User.remove({ id: req.body.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put(
  '/',
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const user = await User.where({ id : req.body.id}).update({ email :  req.body.email, password : req.body.password,
      name : req.body.name});
      if (!user) {
        return res.status(404).send('User not found');
      }
     
      res.send('user updated');
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

module.exports = router;
