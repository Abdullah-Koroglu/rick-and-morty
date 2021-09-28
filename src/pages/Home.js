import React, { useEffect, useState } from "react";

export default (props) => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(0)
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
        <div>


            {/* naber home */}
            {data.map(i => {
                return <div onClick={() => { window.location = "/user/" + i.id }}>
                    <img src={i.image} alt={i.name} width="500" height="600" />
                    {i.name}
                </div>
            })}
        </div>
    );
};
