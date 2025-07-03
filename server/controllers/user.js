import asyncHandler from 'express-async-handler';
import generate_token from '../utils/generate_token.js';
import User from '../models/user.js';

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.match_password(password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      is_admin: user.is_admin,
      token: generate_token(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Fields cannot be blank ');
  }
  const user_found = await User.findOne({ email });
  if (user_found) {
    res.status(400);
    throw new Error('User already exists');
  }
  const { _doc: user } = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      is_admin: user.is_admin,
      token: generate_token(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const profile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const update_profile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.name;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updated_user = await user.save();
    res.json({
      _id: updated_user._id,
      name: updated_user.name,
      email: updated_user.email,
      token: generate_token(updated_user._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { login, register, profile, update_profile };
