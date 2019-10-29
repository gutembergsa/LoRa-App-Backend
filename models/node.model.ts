import * as mongoose from 'mongoose'

interface nodeInterface extends mongoose.Document {
    value: number,
    latency:number,
    date: string,
    hour: string
}

const nodeSchema = new mongoose.Schema({
    value: {
        type: Number
    },
    latency:{
        type: Number
    },
    date:{
        type : String,
    },
    hour:{
        type : String,
    }
})

export const Node = mongoose.model<nodeInterface>('Node' , nodeSchema)