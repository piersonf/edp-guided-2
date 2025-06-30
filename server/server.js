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

app.get('/api/characters', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('characters');
        const characters = await collection.find({}).toArray();
        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("In space, no one can hear your API request... No characters found!");
    }
});

app.get('/api/films', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('films');
        const films = await collection.find({}).toArray();
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("In space, no one can hear your API request... No films found!");
    }
});

app.get('/api/planets', async (req, res) => {
    try {
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

app.get('/api/characters/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('characters');
        const characters = await collection.findOne({ 'id': parseInt(id) });
        // return JSON obj, NOT array
        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("In space, no one can hear your API request... No character found!");
    }
});

app.get('/api/films/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('films');
        const films = await collection.findOne({ 'id': parseInt(id) });
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("In space, no one can hear your API request... No film found!");
    }
});

app.get('/api/planets/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('planets');
        const planets = await collection.findOne({ 'id': parseInt(id) });
        res.json(planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("In space, no one can hear your API request... No planet found!");
    }
});

app.get('/api/films/:id/characters', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const fc_collection = db.collection('films_characters');
        const chr_collection = db.collection('characters');
        // list of char ids in given film
        const film_characters = await fc_collection.find({ 'film_id': parseInt(id) }).toArray();
        const characters = []
        let chr_obj = {}
        // for now we just have a list of char IDs for the given film.
        // we need to get each character info individually
        for (let char of film_characters){
            console.log(char);
            // extract character ID from each entry
            let chr_id = parseInt(char["character_id"]);
            // get info for that character from db
            chr_obj = await chr_collection.findOne({ 'id':chr_id });
            // append char info to list we are returning
            characters.push(chr_obj);
        }
        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("In space, no one can hear your API request... No characters found!");
    }
});

app.get('/api/films/:id/planets', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const fp_collection = db.collection('films_planets');
        const planet_collection = db.collection('planets');
        // list of planet IDs in given film
        const film_planets = await fp_collection.find({ 'film_id': parseInt(id) }).toArray();
        const planets = []
        let planet_obj = {}
        for (let planet of film_planets){
            let planet_id = parseInt(planet["planet_id"]);
            planet_obj = await planet_collection.findOne({ 'id':planet_id });
            planets.push(planet_obj);
        }
        res.json(planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("In space, no one can hear your API request... No planets found!");
    }
});

app.get('/api/characters/:id/films', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const fc_collection = db.collection('films_characters');
        const film_collection = db.collection('films');
        // list of film IDs for given character
        const film_characters = await fc_collection.find({ 'character_id': parseInt(id) }).toArray();
        const films = []
        let film_obj = {}
        for (let film of film_characters){
            let film_id = parseInt(film["film_id"]);
            film_obj = await film_collection.findOne({ 'id':film_id });
            films.push(film_obj);
        }
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("In space, no one can hear your API request... No films found!");
    }
});

app.get('/api/planets/:id/films', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const fp_collection = db.collection('films_planets');
        const film_collection = db.collection('films');
        // list of film IDs for given planet
        const film_planets = await fp_collection.find({ 'planet_id': parseInt(id) }).toArray();
        const films = []
        let film_obj = {}
        for (let film of film_planets){
            let film_id = parseInt(film["film_id"]);
            film_obj = await film_collection.findOne({ 'id':film_id });
            films.push(film_obj);
        }
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("In space, no one can hear your API request... No films found!");
    }
});

app.get('/api/planets/:id/characters', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('characters');
        const characters = await collection.find({ 'homeworld': parseInt(id) }).toArray();
        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("In space, no one can hear your API request... No characters found!");
    }

});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});