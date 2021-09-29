import React, { useEffect, useState } from "react";

export default (props) => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [end, setEnd] = useState(false)

    useEffect(() => {
        window.onscroll = function (ev) {
            if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
                setPage(page + 1)
            }

        };
        if(end === false){
            getData()
        }
    }, [page])

    const getData = async () => {
        fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
            .then(response => response.json())
            .then(res => {
                setData(prev => [...prev, ...res?.results]);
                if (res.info?.next !== null) {  setEnd(false) } else { setEnd(true) }
            });
    }
    return (
        <div class="main-container">
            {data.map(i => {
                return <div class="" onClick={() => { window.location = "/user/" + i.id }}>
                    <img class="image-container" src={i.image} alt={i.name}/>
                    <h3 class="image-name-container">{i.name} </h3>
                </div>
            })}
        </div>
    );
};
