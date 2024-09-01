const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    phone_number: String,
    last_contact_msg_sid: String,
    last_msg_send: Date,
    name: String,
    event_name: String,
});

module.exports = mongoose.model("User", userSchema);