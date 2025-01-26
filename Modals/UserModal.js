import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

// User schema
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    profileImage: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "receptionist", "staff"],
      default: "receptionist",
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: function () {
        return this.role === "staff";
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  console.log("Password match result:", match);
  return match;
};


export const UserModal = mongoose.model("User", userSchema);
