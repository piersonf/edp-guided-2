import express, { json } from 'express';
import { promises as fs } from 'fs';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import pg from 'pg';

const app = express();
const PORT = 3000;
// in general these should be in a .env file,
// but they're fine here for now since they're just localhost
const url = 'mongodb://localhost:27017';
const dbName = 'swapi'
app.use(cors());
app.use(express.json());

app.get('/api/planets', async (req, res) => {
    try {
        // Console log the entire request object
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('planets');
        const planets = await collection.find({}).toArray();
        res.json(planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("In space, no one can hear your API request... No planets found!");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});