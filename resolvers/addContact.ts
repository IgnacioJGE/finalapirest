import express,{Request,Response} from "npm:express@4.18.2";
import { Modelocontacto } from "../db/contactos.ts";
import {validatephone,getcapital,getlatlon,gethora} from "../apigetters.ts"
import { Contacto } from "../types.ts";

export default async function addContact(req:Request,res:Response){
    try {
        
        const {nombre,phone}= req.body
        const pais= await validatephone(phone)
        const capital= await getcapital(pais)
        const latlon= await getlatlon(capital)
        const hora= await gethora(latlon.lat,latlon.lon)
    const nuevocontacto= new Modelocontacto({
        nombre:nombre,
        phone:phone,
        pais:pais,
        capital:capital,
        lat:latlon.lat,
        lon:latlon.lon
    })
    const contact:Contacto={
        id:nuevocontacto._id,
        nombre:nombre,
        phone:phone,
        pais:pais,
        hora:hora
    }
    await nuevocontacto.save()
    return res.status(200).send(contact)
    } catch (error) {
        if(error.message.startsWith("Contactos validation")) return res.status(400).send("Numero ya existente en la base de datos")
        return res.status(400).send(error.message)
    }
}