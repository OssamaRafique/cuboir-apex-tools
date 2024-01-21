import mongoose, { Schema, Document } from "mongoose";

export interface IUser {
  sub: string;
  name: string;
  picture: string;
}

interface IUserDocument extends IUser, Document {}

const UserSchema: Schema<IUserDocument> = new Schema({
  sub: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  picture: { type: String, required: true },
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
