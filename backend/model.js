const mongoose = require("mongoose");
const schema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    items: { type: Array, default: [] }
});

module.exports = mongoose.model("ToDo",schema);