const mongoose = require("mongoose");

const DBConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });

        console.log("Database online");
    } catch (error) {
        console.error(object);
        throw new Error("Error al cargar la DB");
    }
};


module.exports = DBConnection;