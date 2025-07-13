const User = require('../models/User');
const History = require('../models/History');

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.createUser = async (req, res) => {
  const { name } = req.body;
  const newUser = new User({ name });
  await newUser.save();
  res.status(201).json(newUser);
};

exports.claimPoints = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const points = Math.floor(Math.random() * 10) + 1;
  user.totalPoints += points;
  await user.save();

  const history = new History({
    userId: user._id,
    userName: user.name,
    points,
  });
  await history.save();

  res.json({ message: 'Points claimed', user, points });
};

exports.getLeaderboard = async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  res.json(users);
};
