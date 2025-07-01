import React, { useState } from "react";
import '../site.css';
import CharacterList from "./CharacterList";

const Home = (props) => {

    const filterCharacters = () => {
      const searchString = document.querySelector("#searchString").value;
      const re = new RegExp(searchString, "i");
      let matchingCharacters = characters.filter(character => re.test(character.name))
      setCharacters(matchingCharacters);
    }
    
    return (
      <div>
        <h1>Star Wars Universe Lookup</h1>
        <label htmlFor="searchString">Who you looking for? <span className="small">(Regular expressions are cool
          here)</span></label>
        <input id="searchString" onInput={filterCharacters} autoComplete="off" />
        <section id="charactersList">
            <CharacterList characters={props.characters}></CharacterList>
        </section>
    </div>
    );
};

export default Home;