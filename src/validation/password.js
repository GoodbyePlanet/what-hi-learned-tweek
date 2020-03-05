module.exports = {
  isLongEnough: function(password) {
    return password.length >= 6;
  },
  isStrongEnough: function(password) {
    // At least one number, one lowercase and one uppercase letter
    // At least six characters
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    console.log('IS STROGN ENOUGH', regex.test(password));
    return regex.test(password);
  },
};
