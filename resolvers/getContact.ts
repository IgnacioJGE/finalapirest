import express,{Request,Response} from "npm:express@4.18.2";
import { Modelocontacto } from "../db/contactos.ts";
import {validatephone,getcapital,getlatlon,gethora} from "../apigetters.ts"
import { Contacto } from "../types.ts";




export default async function getContact(req:Request,res:Response){
    const id= req.params.id

    const existe= await Modelocontacto.findById(id)
    if(!existe)throw new Error(`No existe contacto con id: ${id}`)
        const hora= await gethora(existe.lat,existe.lon)
    const constactomostrat:Contacto={
        id:existe._id,
        nombre:existe.nombre,
        phone:existe.phone,
        pais:existe.pais,
        hora:hora
    }
    return res.status(200).send(constactomostrat)
}