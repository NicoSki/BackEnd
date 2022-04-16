const mongoose = require("mongoose");

<<<<<<< HEAD
const mongo_uri = `mongodb+srv://root:coderhouse@clusterncs.dulz4.mongodb.net/Desafio12`;
=======
const mongo_uri = `mongodb+srv://root:coderhouse@clusterncs.dulz4.mongodb.net/basecoderatlas`;
>>>>>>> aad8c196a69872afdf09a23c0f301d300c36d416

mongoose.connect(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then((db) => console.log("La base de mongo esta conectada"))
    .catch((error) => console.log(error))