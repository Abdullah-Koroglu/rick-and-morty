import React, { useEffect, useState } from "react";

export default (props) => {
  const [id, setId ] = useState([])
  const [data, setData] = useState([])
  const [episodes, setEpisodes] = useState([])
  useEffect(()=>{
      setId(props.match.params.user)
      fetch('https://rickandmortyapi.com/api/character/'+props.match.params.user)
            .then(response => response.json())
            .then(async(res) => {
                console.log(res);
                setData(res)
                let episodes = res.episode
                episodes.slice(-5).map(async(link)=>{
                    let response = await fetch(link)
                    let res = await response.json()
                    console.log(res);
                    setEpisodes(prev => [...prev , res])
                })
            });
},[])
    console.log(props.match.params.user);
  return (
    <div>
                    <img src={data.image} alt={data.name} width="500" height="600" />
                    <p>{data.name}</p>
                    <p>{data.location?.name}</p>
                    {episodes.map(i=>{
                        return <div>
                            {i.name}
                        </div>
                    })}

    </div>
  );
};
