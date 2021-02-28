import {Schema, model } from 'mongoose'



const jugadoresSchema = new Schema({
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
},
{
  collection:'jugadores'
})

const equiposSchema = new Schema({
  idEquipo: String,
  nombre: String,
  partidosJugados: Number,
  victorias: Number,
  derrotas: Number
},
{
  collection:'equipos'
})

export const Jugadores = model('jugadores', jugadoresSchema)
export const Equipos = model('equiupos', equiposSchema)