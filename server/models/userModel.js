import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
        min: 6,
        max: 64
    },
    picture: {
        type: String,
        default: "/avatar.png"
    },
    role: {
        type: [String],
        default: ["Subscriber"],
        enum: ["Subscriber", "Instructor", "Admin"]
    },
    stripe_account_id: "",
    stripe_seller: {},
    stripeSesstion: {},
},
    {
        timestamps: true
    }
);

export default mongoose.model('User', userSchema);