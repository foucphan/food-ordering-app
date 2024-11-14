import bcrypts from "bcryptjs";
import { model, models, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      validate: (pass) => {
        if (!pass?.length || pass.length < 5) {
          new Error("password must be at least 5 characters");
        }
      },
    },
  },
  { timestamps: true }
);

// UserSchema.pre("save", (next, ...rest) => {
//   console.log(rest);
//   next();
// });
UserSchema.post("validate", function (user) {
  const nothashedPassword = user.password;
  const salt = bcrypts.genSaltSync(10);
  user.password = bcrypts.hashSync(nothashedPassword, salt);
});

export const User = models?.User || model("User", UserSchema);
