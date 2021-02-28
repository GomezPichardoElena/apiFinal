"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const esquemas_1 = require("../model/esquemas");
const database_1 = require("../database/database");
class Routes {
    constructor() {
        this.getEquipos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield esquemas_1.Equipos.aggregate([
                    {
                        $lookup: {
                            from: 'jugadores',
                            localField: 'nombre',
                            foreignField: 'nEquipo',
                            as: "jugadores"
                        }
                    }
                ]);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.getEquipo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idEquipo } = req.params;
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield esquemas_1.Equipos.aggregate([
                    {
                        $lookup: {
                            from: 'jugadores',
                            localField: 'nombre',
                            foreignField: 'nEquipo',
                            as: "jugadores"
                        }
                    }, {
                        $match: {
                            idEquipo: idEquipo
                        }
                    }
                ]);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.postEquipo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre, partidosJugados, victorias, derrotas } = req.body;
            const schema = {
                nombre: nombre,
                partidosJugados: partidosJugados,
                victorias: victorias,
                derrotas: derrotas
            };
            const nSchema = new esquemas_1.Equipos(schema);
            yield database_1.db.conectarBD();
            yield nSchema.save()
                .then((doc) => {
                res.json(doc);
            })
                .catch((err) => {
                res.json(err);
            });
            yield database_1.db.desconectarBD();
        });
        this.postJugador = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idJugador, nombre, fNacimiento, nEquipo, nPartidos, triples, asistencias, rebotes, puntos, pases, expulsiones } = req.body;
            const schema = {
                idJugador: idJugador,
                nombre: nombre,
                fNacimiento: fNacimiento,
                nEquipo: nEquipo,
                nPartidos: nPartidos,
                triples: triples,
                asistencias: asistencias,
                rebotes: rebotes,
                puntos: puntos,
                pases: pases,
                expulsiones: expulsiones
            };
            const nSchema = new esquemas_1.Jugadores(schema);
            yield database_1.db.conectarBD();
            yield nSchema.save()
                .then((doc) => {
                res.json(doc);
            })
                .catch((err) => {
                res.json(err);
            });
            yield database_1.db.desconectarBD();
        });
        this.getJugador = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idJugador, nEquipo } = req.params;
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield esquemas_1.Jugadores.findOne({ idJugador: idJugador, nEquipo: nEquipo });
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.updateJugador = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idJugador, nEquipo } = req.params;
            const { nombre, fNacimiento, nPartidos, triples, asistencias, rebotes, puntos, pases, expulsiones } = req.body;
            yield database_1.db.conectarBD();
            yield esquemas_1.Jugadores.findOneAndUpdate({ idJugador: idJugador, nEquipo: nEquipo }, {
                idJugador: idJugador,
                nombre: nombre,
                fNacimiento: fNacimiento,
                nEquipo: nEquipo,
                nPartidos: nPartidos,
                triples: triples,
                asistencias: asistencias,
                rebotes: rebotes,
                puntos: puntos,
                pases: pases,
                expulsiones: expulsiones
            }, {
                new: true,
                runValidators: true
            })
                .then((docu) => { })
                .catch((err) => {
                res.json(err);
            });
            yield database_1.db.desconectarBD();
        });
        this.updateEquipo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idEquipo } = req.params;
            const { nombre, partidosJugados, victorias, derrotas } = req.body;
            yield database_1.db.conectarBD();
            yield esquemas_1.Equipos.findOneAndUpdate({
                idEquipo: idEquipo
            }, {
                idEquipo: idEquipo,
                nombre: nombre,
                partidosJugados: partidosJugados,
                victorias: victorias,
                derrotas: derrotas
            }, {
                new: true,
                runValidators: true
            })
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.deleteJugador = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idJugador, nEquipo } = req.params;
            yield database_1.db.conectarBD();
            yield esquemas_1.Jugadores.findOneAndDelete({ idJugador: idJugador, nEquipo: nEquipo });
            yield database_1.db.desconectarBD();
        });
        this._router = express_1.Router();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.get('/equipos', this.getEquipos),
            this._router.get('/equipo/:idEquipo', this.getEquipo),
            this._router.post('/equipo', this.postEquipo),
            this._router.post('/jugador', this.postJugador),
            this._router.get('/jugador/:idJugador&:nEquipo', this.getJugador),
            this._router.post('/jugador/:idJugador&:nEquipo', this.updateJugador),
            this._router.post('/equipo/:idEquipo', this.updateEquipo),
            this._router.get('/borrarJugador/:idJugador&:nEquipo', this.deleteJugador);
    }
}
const obj = new Routes();
obj.misRutas();
exports.routes = obj.router;
