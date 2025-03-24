// const mongoose = require("mongoose");

// const blackListTokenSchema = new mongoose.Schema({
//     token: { 
//         type: String, 
//         required: true, 
//         unique: true 
//     },
//     createdAt: { 
//         type: Date, 
//         default: Date.now 
//     }
// });

// // 🔥 Apply TTL index correctly
// blackListTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

// module.exports = mongoose.model("BlacklistToken", blackListTokenSchema);




const mongoose = require("mongoose");

const blackListTokenSchema = new mongoose.Schema({
    token: { 
        type: String, 
        required: true, 
        unique: true 
    },
    createdAt : { 
        type: Date, 
        default: Date.now ,
    expireAfterSeconds: 86400
    }
}); 

 module.exports = mongoose.model("blacklistToken", blackListTokenSchema);
