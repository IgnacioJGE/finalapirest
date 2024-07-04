import express,{Request,Response} from "npm:express@4.18.2";
import { Modelocontacto } from "../db/contactos.ts";
import {validatephone,getcapital,getlatlon,gethora} from "../apigetters.ts"
import { Contacto } from "../types.ts";

export default async function updateContac(req:Request,res:Response){
    try {
        const {id,nombre,phone}= req.body
        if(!nombre&&!phone) throw new Error("Nombre o phone obligatorios")
        if(!id) throw new Error("Id obligatoria")
        const existe= await Modelocontacto.findById(id)
    if(!existe) throw new Error(`No existe contacto con id: ${id}`)
        if(!nombre){
            const pais= await validatephone(phone)
            const capital= await getcapital(pais)
            const latlon= await getlatlon(capital)
            const hora= await gethora(latlon.lat,latlon.lon)
        const nuevocontacto= await  Modelocontacto.findByIdAndUpdate(id,{
            phone:phone,
            pais:pais,
            capital:capital,
            lat:latlon.lat,
            lon:latlon.lon
        })
        const contact:Contacto={
            id:nuevocontacto._id,
            nombre:existe.nombre,
            phone:phone,
            pais:pais,
            hora:hora
        }
        return res.status(200).send(contact)
        }
        if(!phone){
            const nuevocontacto= await  Modelocontacto.findByIdAndUpdate(id,{
                nombre:nombre,
            })
            const hora= await gethora(nuevocontacto.lat,nuevocontacto.lon)

            const contact:Contacto={
                id:nuevocontacto._id,
                nombre:nombre,
                phone:existe.phone,
                pais:existe.pais,
                hora:hora
            }
            return res.status(200).send(contact) 
        }
        const pais= await validatephone(phone)
        const capital= await getcapital(pais)
        const latlon= await getlatlon(capital)
        const hora= await gethora(latlon.lat,latlon.lon)
    const nuevocontacto= await Modelocontacto.findByIdAndUpdate(id,{
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
    return res.status(200).send(contact)
    } catch (error) {
        if(error.message.startsWith("Contactos validation")) return res.status(400).send("Numero ya existente en la base de datos")
        return res.status(400).send(error.message)
    }
}