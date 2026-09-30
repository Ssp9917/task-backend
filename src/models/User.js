import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    user_name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    mobile: {
      type: String,
      default: null,
    },
    profileImgUrl: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    role_id: {
      type: String,
      required: false,
    },
    is_owner: Boolean,
    status: {
      type: Boolean,
      default: true,
    },
    firebase_token: {
      type: String,
      default: null,
    },
    statusUpdatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: false,
    },
    statusUpdatedAt: {
      type: Date,
      required: false,
    },

    isDisable: {
      type: Boolean,
      default: false,
    },
    is_employee: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    reportingTo: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: false,
    },
    employee_code: {
      type: String,
      default: null,
    },
    googleTokens: {
      access_token: { type: String },
      refresh_token: { type: String },
      expiry_date: { type: Number },
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  return next();
});

userSchema.methods.comparePassword = function (pass) {
  return bcrypt.compare(pass, this.password);
};

export default mongoose.model("users", userSchema, "users");
