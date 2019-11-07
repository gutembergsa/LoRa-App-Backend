import * as mongoose from 'mongoose'

interface statusInterface extends mongoose.Document {
    sent: string,
    receive: string
}

const statusSchema = new mongoose.Schema({
    sent: {
        type: String
    },
    receive:{
        type: String
    }
})

export const statusCollection = mongoose.model<statusInterface>('Node' , statusSchema)