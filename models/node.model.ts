import * as mongoose from 'mongoose'

interface nodeInterface extends mongoose.Document {
    value: string,
    latency:string,
    date: string,
    hour: string
}

const nodeSchema = new mongoose.Schema({
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

export const Node = mongoose.model<nodeInterface>('Node' , nodeSchema)