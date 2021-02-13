import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const SALT = 10;

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});


// bcrypt
userSchema.pre('save', function(next){
    var aUser = this;
    if (aUser.isModified('password')) {
        bcrypt.genSalt(SALT, function(err, salt){
            if (err) 
                return next(err)
            bcrypt.hash(aUser.password, salt, function(err, hash) {
                if (err) 
                    return next(err)
                aUser.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

// for comparing the users entered password with DB during login 
userSchema.methods.comparePassword = function(clientPassword, callBack){
    bcrypt.compare(clientPassword, aUser.password, function(err, isMatch){
        if (err) 
            return callBack(err);
        else {
            if(!isMatch)
                callBack(null, isMatch);
            return callBack(null, aUser);
        }
   });
}

export default mongoose.model('user', userSchema);