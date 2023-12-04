/* eslint-disable jest/require-hook */
const express = require('express');

const router = express.Router();
const AppController = require('../controllers/AppController');

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
module.exports = router;
