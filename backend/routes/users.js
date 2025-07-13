const express = require('express');
const router = express.Router();
const {
  getUsers,
  createUser,
  claimPoints,
  getLeaderboard
} = require('../controllers/userController');

router.get('/', getUsers);
router.post('/', createUser);
router.post('/claim', claimPoints);
router.get('/leaderboard', getLeaderboard);

module.exports = router;
