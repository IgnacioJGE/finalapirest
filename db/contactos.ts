import mongoose from "npm:mongoose@7.6.3"
import { Contacto } from "../types.ts"

const Schema= mongoose.Schema

const schemacontacto= new Schema({
    nombre:{type:String,required:true},
    phone:{type:String,required:true},
    pais:{type:String,required:true},
    capital:{type:String,required:true},
    lat:{type:String,required:true},
    lon:{type:String,required:true},
})

export type tipocontacto= mongoose.Document & Omit<Contacto,"hora"&"id">

schemacontacto.path("phone").validate(async function(phone:string) {
    try {
        const exite= await mongoose.models.Contactos.findOne({phone:phone})
        if(!exite)return true;
        return false;
    } catch (error) {
        return false
    }
})

export const Modelocontacto=mongoose.model<tipocontacto>("Contactos",schemacontacto)