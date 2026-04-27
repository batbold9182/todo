const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    name: String,
    id: Number,
    userId: String
})

module.exports = mongoose.model("Data",dataSchema,);