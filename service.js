const mongoose = require("mongoose");

const {ObjectId} = mongoose.Schema;

const serviceSchema = new mongoose.Schema({

    name: {

        type: String,
        trim: true,
        require: true,
        maxlength: 32
    },


    description: {
        
        type: String,
        trim: true,
        require: true,
        maxlength: 2000
    },

    price: {
        type: Number,
        require: true,
        maxlength: 32
    },

    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    },

    photo: {
        data: Buffer,
        contentType: String
    }
},
{timestamps: true}

)

module.exports = mongoose.model("Service", serviceSchema);