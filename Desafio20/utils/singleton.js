

class Singleton {
    static dataConnection;
    constructor() {
        if (Singleton.dataConnection) return Singleton.dataConnection;
        this.fecha = new Date().toLocaleDateString();
        Singleton.dataConnection = this;
    }
}

module.exports = Singleton;