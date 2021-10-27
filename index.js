const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());
// Connect with mongodb
const { MongoClient, Db } = require('mongodb');
// 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.id6py.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
        await client.connect();
        const database = await client.db('Voulanteer');
        const databaseCollection = database.collection('Home');
        app.get('/home', async (req, res) => {
            const find = databaseCollection.find({});
            console.log("Aitai Find :", find);
            const all = await find.toArray();
            res.send(all);
        })
    }
    finally {
        // client.close();
    }
}
run().catch(console.dir);
app.use(express.json());
app.get('/', async (req, res) => {
    const result = await "hiiiffff";
    res.send(result);
})
app.post('/user', (req, res) => {
    res.send('THis is post');
})
app.listen(port, () => {
    console.log('Listenning from port', port);
})