"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Equipos = exports.Jugadores = void 0;
const mongoose_1 = require("mongoose");
const jugadoresSchema = new mongoose_1.Schema({
    idJugador: String,
    nombre: String,
    fNacimiento: Date,
    nEquipo: String,
    nPartidos: Number,
    triples: Number,
    asistencias: Number,
    rebotes: Number,
    puntos: Number,
    pases: Number,
    expulsiones: Number
}, {
    collection: 'jugadores'
});
const equiposSchema = new mongoose_1.Schema({
    idEquipo: String,
    nombre: String,
    partidosJugados: Number,
    victorias: Number,
    derrotas: Number
}, {
    collection: 'equipos'
});
exports.Jugadores = mongoose_1.model('jugadores', jugadoresSchema);
exports.Equipos = mongoose_1.model('equiupos', equiposSchema);
