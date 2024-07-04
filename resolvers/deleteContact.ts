import express,{Request,Response} from "npm:express@4.18.2";
import { Modelocontacto } from "../db/contactos.ts";
import {validatephone,getcapital,getlatlon,gethora} from "../apigetters.ts"
import { Contacto } from "../types.ts";




export default async function deleteContact(req:Request,res:Response){
    const id= req.params.id

    const existe= await Modelocontacto.findByIdAndDelete(id)
    if(!existe)    return res.status(200).send(false)


    return res.status(200).send(true)
}