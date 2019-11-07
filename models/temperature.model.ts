import * as mongoose from 'mongoose'

interface temperatureInterface extends mongoose.Document {
    value: string,
    latency:string,
    date: string,
    hour: string
}

const temperatureSchema = new mongoose.Schema({
    value: {
        type: String
    },
    latency:{
        type: String
    },
    date:{
        type : String,
    },
    hour:{
        type : String,
    }
})

export const temperatureCollection = mongoose.model<temperatureInterface>('Node' , temperatureSchema)