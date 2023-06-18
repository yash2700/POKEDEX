import React, { useEffect, useState } from 'react';
import "./styles.css";
import { json, useParams } from 'react-router-dom';
import convertDataFull from '../../functions/convertDataFull';
import convertHeight from '../../functions/convertHeight';
import convertWeight from "../../functions/convertWeight"
import male from "../../assets/male.png"
import female from "../../assets/female.png"
import MoveGrid from '../../components/moveGrid';
import heart from "../../assets/heart (1).svg"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import Loader from '../../components/loader';

function Index() {
  const { name } = useParams();
  const [data, setData] = useState({});
  const [activeTab, setActiveTab] = useState("about");
  const [total, setTotal] = useState(0);
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      const convertedData = await convertDataFull(name);
      setData(convertedData);
    };

    const savedWatchlist = localStorage.getItem('watchlist');
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
      setIsLoading(false);
    } else {
      setWatchlist([]);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (data.stats) {
      const totalBaseStat = data.stats.reduce((acc, stat) => acc + stat.base_stat, 0);
      setTotal(totalBaseStat);
    }
  }, [data.stats]);

  function handleTabChange(e) {
    setActiveTab(e.target.value);
    setTimeout(()=>setIsLoading(true));
    setTimeout(()=>setIsLoading(false),2000)
  }

  function handleAddToWatchList() {
    if (watchlist.includes(data.id)) {
      const updatedWatchlist = watchlist.filter((id) => id !== data.id);
      setWatchlist(updatedWatchlist);
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    } else {
      const updatedWatchlist = [...watchlist, data.id];
      setWatchlist(updatedWatchlist);
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    }
  }

  return (
    <>
      {data && data.types && data.types[0] && (total !== 0) && (watchlist) && (
        <div>
          <div className={`top ${data.types[0].type.name}`}>
            <div className="top-left">
              <div className="full-title">
                {data.name}
              </div>
              <div className="full-types">
                {data.types.map((i) => (
                  <p className={`grid-type light${data.types[0].type.name}`}>
                    {i.type.name}
                  </p>
                ))}
              </div>
            </div>
            <div className="full-top-right">
              {"#" + data.id}
              {watchlist.includes(data.id) ? (
                <FaHeart className="watchlist-icon" onClick={handleAddToWatchList} />
              ) : (
                <FaRegHeart className="watchlist-icon" onClick={handleAddToWatchList} />
              )}
            </div>
            <img className='detail-image' src={data.img} alt="" />
          </div>
          <div className="bottom">
            <div className="tab-header">
              <button value="about" className={activeTab === "about" ? "tab-active" : ""} onClick={(e) => handleTabChange(e)}>About</button>
              <button value="stats" className={activeTab === "stats" ? "tab-active" : ""} onClick={(e) => handleTabChange(e)}>Base Stats</button>
              <button value="moves" className={activeTab === "moves" ? "tab-active" : ""} onClick={(e) => handleTabChange(e)}>Moves</button>
            </div>
            <div className="line"></div>
            <div className="tab-content">
              {activeTab === "about" && (
                <>
                  {isLoading && <Loader />}
                  {!isLoading && (
                    <div>
                      <p className="desc">{data.desc.flavor_text.replace(/[\n\f]/g, '')}</p>
                      <div className="height">
                        <div className="height-left">
                          <p>Height</p>
                          {convertHeight(data.height)}
                        </div>
                        <div className="height-right">
                          <p>Weight</p>
                          {convertWeight(data.weight / 10)}
                        </div>
                      </div>
                      <div className="breeding">
                        <p style={{ fontWeight: "600", fontSize: "1.2rem", color: "#111" }}>Breeding</p>
                        <p className="gender-flex">
                          <strong>Gender</strong>
                          {data.gender.gederless ? (
                            <p>Genderless</p>
                          ) : (
                            (data.gender.male !== 0 && data.gender.female !== 0) ? (
                              <p className='gender'>
                                <img src={male} alt="" className='gender-icons' />{data.gender.male + "%"}
                                <img src={female} alt="" className='gender-icons' />{data.gender.female + "%"}
                              </p>
                            ) : (
                              data.gender.male !== 0 ? (
                                <p className='gender'><img src={male} alt="" className='gender-icons' />{data.gender.male + "%"}</p>
                              ) : (
                                <p className='gender'><img className='gender-icons' src={female} alt="" />{data.gender.female + "%"}</p>
                              )
                            )
                          )}
                        </p>
                        <p className='breeding-width'>Egg Groups <span > {data.egg_group[0].name} </span></p>
                        <p className='breeding-width'>Egg Cycle <span>{data.types[0].type.name}</span></p>
                      </div>
                    </div>
                  )}
                </>
              )}
              {activeTab === "stats" && (
                <>
                  {isLoading && <Loader />}
                  {!isLoading && (
                    <div className='stat-compponent'>
                      {data.stats.map((stat, index) => (
                        <div className="stat-line" key={stat.stat.name}>
                          <span> {stat.stat.name}</span>
                          {stat.base_stat}
                          <progress className={index % 2 === 0 ? "stat-red" : "stat-green"} value={stat.base_stat} max={100}></progress>
                        </div>
                      ))}
                      <div className="stat-line stat-total">
                        <span style={{ fontWeight: "600", color: "#111" }}>Total</span>  {total}
                        <progress className="stat-red" value={total}></progress>
                      </div>
                    </div>
                  )}
                </>
              )}
              {activeTab === "moves" && (
                <>
                  {isLoading && <Loader />}
                  {!isLoading && (
                    <div className="move-component">
                      {data.moves.map((move, index) => (
                        <MoveGrid key={move.move.name} color={index % 2 === 0 ? data.types[0].type.name : `white`} move={move} />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Index;
