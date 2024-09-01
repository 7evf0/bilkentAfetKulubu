const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
    name: String,
    type: String,
    content_sid: String,
    creation_date: Date
});

module.exports = mongoose.model("Component", componentSchema);