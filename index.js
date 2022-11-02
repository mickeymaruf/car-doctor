const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()

// middlewares
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWD}@cluster0.ld8a5ol.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const run = async () => {
    try {
        const database = client.db('genius-car');
        const serviceCollection = database.collection('services');
        const orderCollection = database.collection('orders');
        // services
        app.get('/services', async (req, res) => {
            const cursor = serviceCollection.find({});
            services = await cursor.toArray();
            res.send(services);
        })
        app.get('/services/:_id', async (req, res) => {
            const query = { _id: ObjectId(req.params._id) };
            const service = await serviceCollection.findOne(query);
            res.send(service);
        })
        // orders
        app.get('/orders', async (req, res) => {
            let query = {};
            if (req.query.email) {
                query = { "customer.email": req.query.email }
            }
            const cursor = orderCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders);
        })
        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.send(result);
        })
        app.delete('/orders/:_id', async (req, res) => {
            const query = { _id: ObjectId(req.params._id) };
            const result = await orderCollection.deleteOne(query);
            res.send(result);
        })
    } finally {
        // 
    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Genius car server is running...')
})

app.listen(port, () => {
    console.log('Genius car server is running on port ', port)
})