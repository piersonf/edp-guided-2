import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const Character = (props) => {
    const { id } = useParams();
    const [character, setCharacter] = useState([]);
    const baseUrl = `http://localhost:3000/api`
    
    useEffect(() => {
      const fetchData = async () => {
        const api_url = `${baseUrl}/characters/${id}`;
        try{
            const response = await fetch(api_url);
            if (!response.ok) {
              throw new Error('Data could not be fetched!');
            }
            const json_response = await response.json();
            json_response.homeworld = await fetchHomeworld(json_response);
            json_response.films = await fetchFilms(json_response);
            console.log(json_response);
            setCharacter(json_response); // assign JSON response to the data variable.
          } catch (error) {
            console.error('Error fetching character:', error);
          }
        };
        fetchData();
      }, []);
      
    async function fetchHomeworld(character) {
        const url = `${baseUrl}/planets/${character?.homeworld}`;
        const planet = await fetch(url)
        .then(res => res.json())
        console.log()
        return planet;
    }

    async function fetchFilms(character) {
      const url = `${baseUrl}/characters/${character?.id}/films`;
      const films = await fetch(url)
        .then(res => res.json())
      return films;
    }

    return(
        <div>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
            <link href="https://fonts.googleapis.com/css2?family=Stalinist+One&display=swap" rel="stylesheet"/>
            <div id='stars'></div>
            <h1 id="name">{character?.name}</h1>
            <section id="generalInfo">
                <p>Height: {character?.height} cm</p>
                <p>Mass: {character?.mass} kg</p>
                <p>Born: {character?.birth_year}</p>
            </section>
            <section id="planets">
                <h2>Homeworld</h2>
                <p><a href={`/planet/${character?.homeworld?.id}`}>{character?.homeworld?.name}</a></p>
            </section>
            <section id="films">
                <h2>Films appeared in</h2>
                <ul>
                    {
                        character?.films?.map(film =>
                            <li><a href={`/film/${film.id}`}>{film.title}</a></li>
                        )
                    }
                </ul>
            </section>
        </div>
    );
};

export default Character;