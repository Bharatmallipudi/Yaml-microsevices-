import * as mongoDB from "mongodb"

export const collections: { user1?: mongoDB.Collection } = {}

export async function connectToDatabase() {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(
        "mongodb+srv://bharat:bharat@cluster0.oldsrhe.mongodb.net/?retryWrites=true&w=majority")

    await client.connect()

    const db: mongoDB.Db = client.db("db2")

    const user1: mongoDB.Collection = db.collection("user1")

    collections.user1 = user1
}
