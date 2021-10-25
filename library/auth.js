const bcrypt = require("bcryptjs"); // responsible for encrypting the password

// hashing
const hashing = async (value) => {
  try {
    const salt = await bcrypt.genSalt(10); // generating salt
    const hash = await bcrypt.hash(value.toString(), salt); // hashing with generated salt and converting to string hash function accept the string
    return hash;
  } catch (e) {
    console.log("bcrypt hash error", e);
  }
};

// hashCompare

// comparing hashed password(db) with the req password from client
const hashCompare = async (currentValue, hashPassword) => {
  try {
    return await bcrypt.compare(
      currentValue.toString(),
      hashPassword.toString()
    );
  } catch (e) {
    console.log("bcrypt compare error", e);
  }
};

module.exports = { hashing, hashCompare };
