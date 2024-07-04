import axios from "npm:axios"
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load()
const api_key = env.api_key || Deno.env.get("api_key")



export async function validatephone(phone: string) {

  

        const response = await axios.get(`https://api.api-ninjas.com/v1/validatephone?number=${phone}`, {
            headers: { 'X-Api-Key': api_key }
        })
        if (response.data.error) throw new Error("Formato incorrecto")
        if (response.data.is_valid == false) throw new Error("Numero incorrecto")
        return response.data.country

} 

export async function getcapital(pais: string) {

    
        const response = await axios.get(`https://api.api-ninjas.com/v1/country?name=${pais}`, {
            headers: { 'X-Api-Key': api_key }
        })

        if (response.data.length==0) throw new Error("Pais incorrecto")
        return response.data[0].capital
    
} 
export async function getlatlon(capital: string) {

   

        const response = await axios.get(`https://api.api-ninjas.com/v1/city?name=${capital}`, {
            headers: { 'X-Api-Key': api_key }
        })

        if (response.data.length==0) throw new Error("Pais incorrecto")
        return({
    lat:response.data[0].latitude,
    lon:response.data[0].longitude
    })

} 
export async function gethora(lat: string,lon:string) {

    try {

        const response = await axios.get(`https://api.api-ninjas.com/v1/worldtime?lat=${lat}&lon=${lon}`, {
            headers: { 'X-Api-Key': api_key }
        })

        if (response.data.error) throw new Error("Formato incorrecto")

        return (`${response.data.hour}:${response.data.minute}:${response.data.second}`)
    } catch (error) {
        throw new Error(error.message)
    }
} 

