module.exports = {
  isLongEnough(password) {
    return password.length >= 6;
  },
  isStrongEnough(password) {
    // At least one number, one lowercase and one uppercase letter
    // At least six characters
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return regex.test(password);
  },
};
