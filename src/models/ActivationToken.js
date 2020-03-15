const mongoose = require('mongoose');
const { userSchema } = require('../models/User');

const { Schema } = mongoose;

const activationTokenSchema = Schema(
  {
    user: {
      type: userSchema,
      required: true,
    },
    token: { type: String, required: true },
    redeemed: { type: Boolean, default: false },
    invalidated: { type: Boolean, default: false },
    alreadyUsed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const ActivationToken = mongoose.model(
  'ActivationToken',
  activationTokenSchema,
);

module.exports = ActivationToken;