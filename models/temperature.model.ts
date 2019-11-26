import * as mongoose from 'mongoose'

interface temperatureInterface extends mongoose.Document {
    value: string,
    latency:string,
    date: string,
    hour: string
}

const temperatureSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    },
    latency:{
        type: String,
        required: true
    },
    date:{
        type : String,
        required: true
    },
    hour:{
        type : String,
        required: true
    }
})

export const temperatureCollection = mongoose.model<temperatureInterface>('temperatureCollection' , temperatureSchema)