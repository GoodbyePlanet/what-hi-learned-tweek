const ActivationToken = require('../models/ActivationToken');
const shortid = require('shortid');

// TODO REFACTOR THIS
const createActivationToken = async user => {
  console.log('INSIDE CREATE ACTIVATION TOKEN', user);
  const activationToken = new ActivationToken({
    user: user._id,
    token: shortid.generate(),
  });

  await activationToken.save(err => {
    if (!err) {
      console.log('NO ERRORS FOUND', activationToken._id);
      const populated = ActivationToken.findById(activationToken._id)
        .populate('user')
        .exec((err, user) => {
          if (err) {
            console.log(err);
          }
          console.log('POPULATED', user);
        });
    }
  });
};

module.exports = { createActivationToken };
