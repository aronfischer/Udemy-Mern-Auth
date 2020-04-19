const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

// User Schema
const UserSchema = new Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    role: { type: String, default: "member" },
    hashed_password: { type: String, required: true },
    salt: { type: String, required: true },
    resetPasswordToken: { type: String, default: "" },
  },
  { timestamps: true }
);

// Virtual
UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.createSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// Methods
// Create Salt : Return a random string to add additional security to our hashed_password
UserSchema.method.createSalt = function () {
  return crypto.randomBytes(16).toString("hex");
};

// Encrypts users password
UserSchema.method.encryptPassword = function (password) {
  return crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

// Authenticates user : Returns true or false
UserSchema.method.authenticate = function (password) {
  return encryptPassword(password) === this.hashed_password;
};

module.exports = mongoose.model("User", UserSchema);
