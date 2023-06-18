import React, { useState, useEffect } from 'react';
import "./styles.css";
import ball from "../../assets/ball.svg";
import SeachIcon from "../../assets/search-icon.svg";
import SearchGrid from '../../searchGrid';
import convertDataFull from '../../functions/convertDataFull';
import convertData from '../../functions/convertData';
import axios from 'axios';
import GridComponent from '../../components/grid';
import Loader from '../../components/loader';

function SearchPage() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [searchAttributes, setSearchAttributes] = useState([
    "Pokedex",
    "Moves",
    "Abilities",
    "Items",
    "Locations",
    "Type Charts"
  ]);
  const [colors, setColors] = useState([ "grass", "fire", "water", "electric", "poison", "ground" ]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setData(null);
    }
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search}`);
      const newDataItem = await convertData(response.data);
      setData(newDataItem);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError("404");
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <img src={ball} alt="" width={"200px"} className='top-right' />
      <div className="searchPage">
        <div className="title">
          What Pokemon are you looking for?
        </div>
        <div className="searchBar">
          <input type="text" value={search} id="searchInput" onInput={handleSearchInput} placeholder='Search pokemon, moves, ability etc' />
          <img src={SeachIcon} className='searchIcon' alt="" width={"25px"} />
        </div>
        <button className='search-btn' onClick={handleSearch}>Search</button>
        {console.log(data)}
        {!isLoading && (data && data.name !== undefined) ? (
          <div>
            <GridComponent obj={data} />
          </div>
        ) : (
          <div className="search-grid">
            {searchAttributes.map((item, index) => (
              <SearchGrid key={item} name={item} color={colors[index]} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default SearchPage;
