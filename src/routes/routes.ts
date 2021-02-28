import {Request, Response, Router } from 'express'
import {Jugadores, Equipos } from '../model/esquemas'
import { db } from '../database/database'

class Routes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }

    private getEquipos = async (req:Request, res: Response) => {
        await db.conectarBD()
        .then( async ()=> {
            const query = await Equipos.aggregate([
                {
                    $lookup: {
                        from: 'jugadores',
                        localField: 'nombre',
                        foreignField: 'nEquipo',
                        as: "jugadores"
                    }
                }
            ])
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }

    private getEquipo = async (req:Request, res: Response) => {
        const { idEquipo } = req.params
        await db.conectarBD()
        .then( async ()=> {
            const query = await Equipos.aggregate([
                {
                    $lookup: {
                        from: 'jugadores',
                        localField: 'nombre',
                        foreignField: 'nEquipo',
                        as: "jugadores"
                    }
                },{
                    $match: {
                        idEquipo:idEquipo
                    }
                }
            ])
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }

    private postEquipo = async (req: Request, res: Response) => {
        const { nombre, partidosJugados, victorias, derrotas} = req.body
        const schema = {
            nombre: nombre,
            partidosJugados: partidosJugados,
            victorias: victorias,
            derrotas: derrotas
        }
        const nSchema = new Equipos(schema)
        await db.conectarBD()
        await nSchema.save()
        .then((doc) => {
            res.json(doc)
        })
        .catch((err: any) => {
            res.json(err)
        })    
        await db.desconectarBD()
    }
    
    private postJugador = async (req: Request, res: Response) => {
        const {idJugador, nombre, fNacimiento, nEquipo, nPartidos, triples, asistencias, rebotes, puntos, pases, expulsiones} = req.body
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
        }
        const nSchema = new Jugadores(schema)
        await db.conectarBD()
        await nSchema.save()
        .then((doc) => {
            res.json(doc)
        })
        .catch((err: any) => {
            res.json(err)
        })    
        await db.desconectarBD()
    }

    private getJugador = async (req:Request, res: Response) => {
        const { idJugador, nEquipo } = req.params
        await db.conectarBD()
        .then( async ()=> {
            const query = await Jugadores.findOne(
                {idJugador:idJugador, nEquipo:nEquipo}
            )  
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }

    private updateJugador = async (req: Request, res: Response) => {
        const {idJugador, nEquipo} = req.params
        const {nombre, fNacimiento, nPartidos, triples, asistencias, rebotes, puntos, pases, expulsiones} = req.body
        await db.conectarBD()
        await Jugadores.findOneAndUpdate (
            {idJugador:idJugador, nEquipo:nEquipo},
            {
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
        },
        {
            new: true,
            runValidators: true 
        })
        .then( (docu: any) => {}
        )
        .catch((err: any) => {
            res.json(err)
        })    
        await db.desconectarBD()
    }

    private updateEquipo = async (req: Request, res: Response) => {
        const {idEquipo} =req.params
        const { nombre, partidosJugados, victorias, derrotas} = req.body
        await db.conectarBD()
        await Equipos.findOneAndUpdate({
            idEquipo: idEquipo
        },{
            idEquipo: idEquipo,
            nombre: nombre,
            partidosJugados: partidosJugados,
            victorias: victorias,
            derrotas: derrotas
        },{
            new:true,
            runValidators:true
        }
        )
            .catch( (err: any) => res.send('Error: '+ err)) 
        await db.desconectarBD()
    }


    private deleteJugador = async (req: Request, res: Response) => {
        const { idJugador, nEquipo } = req.params
        await db.conectarBD()
        await Jugadores.findOneAndDelete(
            {idJugador:idJugador, nEquipo:nEquipo},
            )
        await db.desconectarBD()
    }
   

    misRutas(){
        this._router.get('/equipos', this.getEquipos),
        this._router.get('/equipo/:idEquipo', this.getEquipo),
        this._router.post('/equipo', this.postEquipo),
        this._router.post('/jugador', this.postJugador),
        this._router.get('/jugador/:idJugador&:nEquipo', this.getJugador),
        this._router.post('/jugador/:idJugador&:nEquipo', this.updateJugador),
        this._router.post('/equipo/:idEquipo', this.updateEquipo),
        this._router.get('/borrarJugador/:idJugador&:nEquipo', this.deleteJugador)
    }
}

const obj = new Routes()
obj.misRutas()
export const routes = obj.router
