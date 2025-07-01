import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const Film = (props) => {
    const { id } = useParams();
    const [film, setFilm] = useState([]);
    const baseUrl = `http://localhost:3000/api`;
    
    useEffect(() => {
      const fetchData = async () => {
        const api_url = `${baseUrl}/films/${id}`;
        try{
            const response = await fetch(api_url);
            if (!response.ok) {
              throw new Error('Data could not be fetched!');
            }
            const json_response = await response.json();
            json_response.characters = await fetchCharacters(json_response);
            json_response.planets = await fetchPlanets(json_response);
            localStorage.setItem(`film_${id}`, JSON.stringify(json_response));
            setFilm(json_response); // assign JSON response to the data variable.
          } catch (error) {
            console.error('Error fetching film:', error);
          }
        };
        let localFilm = localStorage.getItem(`film_${id}`);
        if (!localFilm){
            fetchData();
        } else {
            setFilm(JSON.parse(localFilm));
        }
      }, []);
      
  
    async function fetchPlanets(film) {
        const url = `${baseUrl}/films/${id}/planets`;
        const planets = await fetch(url)
        .then(res => res.json())
        return planets;
    }
    
    async function fetchCharacters(film) {
        const url = `${baseUrl}/films/${id}/characters`;
        const characters = await fetch(url)
        .then(res => res.json())
        return characters;
    }  

    return(
        <div>
            <h1 id="title">{film?.title}</h1>
            <section id="generalInfo">
                <p><span id="episode">Episode {film?.episode_id} </span></p>
                <p>Released: {film?.release_date} </p>
                <p>Director: {film?.director} </p>
            </section>
            <section id="openingCrawl">
                <span id="crawl">{film?.opening_crawl}</span>
            </section>
            <section id="characters">
                <h2>Characters</h2>
                <ul>
                    {
                        film?.characters?.map(character =>
                            <li><a href={`/character/${character.id}`}>{character.name}</a></li>
                        )
                    }
                </ul>
            </section>
            <section id="planets">
                <h2>Planets</h2>
                <ul>
                    {
                        film?.planets?.map(planet =>
                            <li><a href={`/planet/${planet.id}`}>{planet.name}</a></li>
                        )
                    }
                </ul>
            </section>
        </div>
    );
};

export default Film;