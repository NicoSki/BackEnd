const request = require("supertest");
let app = require("../index");

describe("Ruta GET", () => {
    it("Retorna los usuarios almacenados en la base de datos", (done) => {
        request(app)
            .get("/usuarios")
            .expect(200,done)
    });
});

describe("Rutas POST", () => {
    it("Retorna la accion de agregar un usuario", (done) => {
        const usuario = {
            nombre: "Desde Mocha",
            apellido: "Martinez",
            edad:26
          };
            request(app)
            .post("/agregar")
            .send(usuario)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
              });
    });
});

