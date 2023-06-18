import React, { useEffect, useState } from 'react';
import "./styles.css";
import convertDataFull from '../../functions/convertDataFull';
import convertData from '../../functions/convertData';
import axios from 'axios';
import GridComponent from '../../components/grid';
import Loader from '../../components/loader';

function WatchList() {
  const [watchlist, setWatchlist] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading,setIsLoading]=useState(true);

  useEffect(() => {
    const savedWatchlist = localStorage.getItem('watchlist');
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    } else {
      setWatchlist([]);
    }
  }, []); // Run once on component mount to retrieve the watchlist

  useEffect(() => {
    const fetchData = async () => {
      watchlist.sort((i, j) => i - j);
      const newData = [];
      for (const item of watchlist) {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${item}`);
        const newDataItem = await convertData(response.data);
        newData.push(newDataItem);
      }
      setData(prevData => [...prevData, ...newData]);
      setIsLoading(false)
    };

    if (watchlist.length > 0) {
      fetchData();
    }
  }, [watchlist]); // Run when the watchlist changes

  return (
    <div>
          {isLoading && <Loader />}
        <h1 style={{textAlign:"center"}}>Watchlist</h1>
      {watchlist && data && (
        <div className='watchlist-grid'>
          {data.map((item)=>(
            <GridComponent obj={item}/>
          ))}
        </div>
      )}
    </div>
  );
}

export default WatchList;
