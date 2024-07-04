import express,{Request,Response} from "npm:express@4.18.2";
import { Modelocontacto } from "../db/contactos.ts";
import {validatephone,getcapital,getlatlon,gethora} from "../apigetters.ts"
import { Contacto } from "../types.ts";




export default async function getContacts(req:Request,res:Response){

    const existe= await Modelocontacto.find()
    if(!existe)throw new Error(`No existen contactos`)
        const arraycontactos:Contacto[]=[]
        for (let index = 0; index < existe.length; index++) {
            const hora= await gethora(existe[index].lat,existe[index].lon)
            const constactomostrat:Contacto={
                id:existe[index]._id,
                nombre:existe[index].nombre,
                phone:existe[index].phone,
                pais:existe[index].pais,
                hora:hora
            }
            arraycontactos.push(constactomostrat)
        }
    return res.status(200).send(arraycontactos)
}