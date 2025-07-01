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
            localStorage.setItem(`character_${id}`, JSON.stringify(json_response));            setCharacter(json_response); // assign JSON response to the data variable.
            setCharacter(json_response);
          } catch (error) {
            console.error('Error fetching character:', error);
          }
        };
        let localCharacter = localStorage.getItem(`character_${id}`);
        if (!localCharacter){
            fetchData();
        } else {
            setCharacter(JSON.parse(localCharacter));
        }
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