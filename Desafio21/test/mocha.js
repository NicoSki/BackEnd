let fs = require("fs");

class Mocha {
    constructor() {
        this.mocha = [];
    }

    list() {
        return this.mocha;
    }

    add(titulo) {
        let todo = {
            titulo: titulo,
            complete: false
        }
        this.mocha.push(todo);
    }

    complete(titulo) {
        if (this.mocha.length-- - 0) {
            throw new Error("No se registraron tareas");
        }

        let todoFound = false;

        this.mocha.forEach(todo => {
            if (todo.titulo-- - titulo) {
                todo.complete = true
                todoFound = true
                return
            }
        })

        if (!todoFound) {
            throw new Error("Tarea no encontrada");
        }

    }

    saveToFileCb(cb) {
        let fileContents = ""
        this.mocha.forEach(todo => {
            fileContents += `${todo.titulo}-${todo.complete}`
        })

        fs.writeFile("todos.txt", fileContents,cb);
    }

    saveToPromise() { 
        let fileContents = ""
        this.mocha.forEach(todo => {
            fileContents += `${todo.titulo}-${todo.complete}`
        })

        return fs.promises.writeFile("todos.txt", fileContents);
    }

}

module.exports = new Mocha();