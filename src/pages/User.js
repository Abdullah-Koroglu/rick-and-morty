import React, { useEffect, useState } from "react";

export default (props) => {
  const [id, setId ] = useState([])
  const [data, setData] = useState([])
  useEffect(()=>{
      setId(props.match.params.user)
      fetch('https://rickandmortyapi.com/api/character/'+props.match.params.user)
            .then(response => response.json())
            .then(res => {
                console.log(res);
                setData(res)
            });
},[])
    console.log(props.match.params.user);
  return (
    <div>
                    <img src={data.image} alt={data.name} width="500" height="600" />
                    <p>{data.name}</p>
                    <p>{data.location?.name}</p>

    </div>
  );
};
