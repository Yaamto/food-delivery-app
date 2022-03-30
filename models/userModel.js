const mongoose = require("mongoose");
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');


const UserSchema = new Schema(
  {
        username: {
            type: String,
            required: true,
        },
        address: {
          type: String,
          required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        })
      
        
          UserSchema.statics.login = async function(email, password) {
            const user = await this.findOne({ email });
            if (user) {
      
                return user;
              
            }
            throw Error('incorrect email')
          };

        module.exports = {User: mongoose.model('user', UserSchema )};