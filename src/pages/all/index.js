import React, { useEffect, useState } from 'react';
import "./styles.css";
import getGridData from '../../functions/getGridData';
import GridComponent from '../../components/grid';
import SearchIcon from "../../assets/search-icon.svg";
import Loader from '../../components/loader';

function AllList() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const fetchedData = await getGridData(offset);
    if (!initialDataFetched) {
      setData(fetchedData);
      setInitialDataFetched(true);
      setIsLoading(false);
    } else {
      setData(prevData => [...prevData, ...fetchedData]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [offset]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setOffset(prevOffset => prevOffset + 10);
    }
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.abilities.some(i =>
      i.ability.name.toLowerCase().includes(searchInput.toLowerCase())
    ) ||
    item.egg_groups.some(i =>
      i.name.toLowerCase().includes(searchInput.toLowerCase())
    ) ||
    item.habitat.name.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.types.some(i =>
      i.type.name.toLowerCase().includes(searchInput.toLowerCase())
    )
  );

  return (
    <div>
      <div className="header">
        <h1 style={{ fontSize: "3rem" }}>Pokedex</h1>
        <div className="searchBar1">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder='Search pokemon, moves, ability etc'
          />
          <img src={SearchIcon} className='searchIcon' alt="" width={"25px"} />
        </div>
      </div>
      
      <div className='grid-container'>
        {filteredData.map((item) => (
          <GridComponent key={item.id} obj={item} />
        ))}
        {isLoading && <Loader />}
      </div>
    </div>
  );
}

export default AllList;
