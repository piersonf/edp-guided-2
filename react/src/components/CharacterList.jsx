import React, { useState } from "react";
import '../site.css'

const CharacterList = (props) => {
    return(
        <>
            {props.characters.map((character) => (
                <div>
                    <a href={`/character/${character.id}`}>{character.name}</a>
                </div>
            ))}
        </>
    );
};

export default CharacterList;