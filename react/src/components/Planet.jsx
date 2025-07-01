import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const Planet = (props) => {
    const { id } = useParams();
    const [planet, setPlanet] = useState([]);
    const baseUrl = `http://localhost:3000/api`;
    
    useEffect(() => {
      const fetchData = async () => {
        const api_url = `${baseUrl}/planets/${id}`;
        try{
            const response = await fetch(api_url);
            if (!response.ok) {
              throw new Error('Data could not be fetched!');
            }
            const json_response = await response.json();
            json_response.characters = await fetchCharacters(json_response);
            json_response.films = await fetchFilms(json_response);
            localStorage.setItem(`planet_${id}`, JSON.stringify(json_response));
            setPlanet(json_response); // assign JSON response to the data variable.
          } catch (error) {
            console.error('Error fetching planet:', error);
          }
        };
        let localPlanet = localStorage.getItem(`planet_${id}`);
        if (!localPlanet){
            fetchData();
        } else {
            setPlanet(JSON.parse(localPlanet));
        }
      }, []);

      async function fetchCharacters(planet) {
          const url = `${baseUrl}/planets/${planet?.id}/characters`;
          const characters = await fetch(url)
              .then(res => res.json())
          return characters;
      }
      async function fetchFilms(planet) {
          const url = `${baseUrl}/planets/${planet?.id}/films`;
          const films = await fetch(url)
              .then(res => res.json())
          return films;
      }

    return(
        <div>
            <h1 id="name">{planet?.name}</h1>
            <section id="generalInfo">
                <p>Climate: {planet?.climate} </p>
                <p>Surface Water: {planet?.surface_water} </p>
                <p>Diameter: {planet?.diameter} </p>
                <p>Rotation Period: {planet?.rotation_period} </p>
                <p>Terrian: {planet?.terrain} </p>
                <p>Gravity: {planet?.gravity} </p>
                <p>Orbital Period: {planet?.orbital_period}</p>
                <p>Population: {planet?.population} </p>
            </section>
            <section id="characters">
                <h2>Characters</h2>
                <ul>
                    {
                        planet?.characters?.map(character =>
                            <li><a href={`/character/${character.id}`}>{character.name}</a></li>
                        )
                    }
                </ul>
            </section>
            <section id="films">
                <h2>Films</h2>
                <ul>
                    {
                        planet?.films?.map(film =>
                            <li><a href={`/film/${film.id}`}>{film.title}</a></li>
                        )
                    }
                </ul>
            </section>
        </div>
    );
};

export default Planet;