import { Schema, model } from 'mongoose';
import { User } from '../intefaces/auth';

const UserSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
});

export default model<User>('User', UserSchema);