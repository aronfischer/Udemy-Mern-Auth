const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

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
// Create salt: creates a random string, which adds additional security to our hashed password
UserSchema.method.createSalt = function () {
  // Create salt
  return crypto.randomBytes(16).toString("hex");
};

// Encrypt a user password
UserSchema.method.encryptPassword = function (password) {
  return crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

// Authenticate : Return true or false
UserSchema.method.authenticate = function (password) {
  return this.encryptPassword(password) === this.hashed_password;
};
