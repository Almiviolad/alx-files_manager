const express = require('express');

const router = express.Router();
const AppController = require('../controllers/AppController');
const UsersController = require('../controllers/UsersController');

router.use(express.json());
router.get('/status', (req, res) => {
  const result = AppController.getStatus();
  if (result.redis && result.db) {
    res.status(200).json(result);
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/stats', async (req, res) => {
  try {
    const result = await AppController.getStats();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.post('/users', async (req, res) => {
  try {
    const newUser = await UsersController.postNew(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
