const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const EventSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

EventSchema.plugin(mongoosePaginate);


EventSchema.method("toJSON",function() {
   const {__v,_id,...object} = this.toObject();

    object.id = _id;

    return object;

});

module.exports = model("Event", EventSchema);
