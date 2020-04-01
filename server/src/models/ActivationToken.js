const mongoose = require('mongoose');
const { developerSchema } = require('./Developer');

const { Schema } = mongoose;

const activationTokenSchema = Schema(
  {
    developer: {
      type: developerSchema,
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

const ActivationToken = mongoose.model('ActivationToken', activationTokenSchema);

module.exports = ActivationToken;
