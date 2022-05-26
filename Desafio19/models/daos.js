let mongo = require("./db/mongo");

class DAOS {

    async nuevo(user) {
        try {
            return mongo.nuevo(user);
        } catch (error) {
            console.log(error);
        }
    }

    async todos_usuarios(){
        try {
            return mongo.todos();
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = new DAOS();