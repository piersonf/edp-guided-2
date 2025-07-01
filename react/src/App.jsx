import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import './site.css';
import Home from "./components/Home";
import Character from './components/Character';
import Film from './components/Film';
import Planet from './components/Planet';

function App() {
  const [characters, setCharacters] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const api_url = 'http://localhost:3000/api/characters';
      try{
        const response = await fetch(api_url);
        if (!response.ok) {
          throw new Error('Data could not be fetched!');
        }
        const json_response = await response.json();
        setCharacters(json_response); // assign JSON response to the data variable.
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
    <link href="https://fonts.googleapis.com/css2?family=Stalinist+One&display=swap" rel="stylesheet"/>
    <div id='stars'></div>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home characters={characters} />} /> 
        <Route path="/character/:id" element={<Character />} />
        <Route path="/film/:id" element={<Film />} />
        <Route path="/planet/:id" element={<Planet />} />
      </Routes>
    </Router>
    </>
  );
};

export default App
