const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CitiSchema = Schema({
    lat: { type: String, required: true },
    lon: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
});
module.exports = mongoose.model("cities", CitiSchema);
