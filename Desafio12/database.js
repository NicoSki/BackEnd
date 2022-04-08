const mongoose = require("mongoose");

const mongo_uri = `mongodb+srv://root:coderhouse@clusterncs.dulz4.mongodb.net/basecoderatlas`;

mongoose.connect(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then((db) => console.log("La base de mongo esta conectada"))
    .catch((error) => console.log(error))