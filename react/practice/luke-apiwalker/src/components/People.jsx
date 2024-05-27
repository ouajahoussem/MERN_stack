import axios from "axios";
import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

const People = () => {
    const [people, setPeople] = useState([])
    const {id} = useParams()


    useEffect(()=>{
        axios.get(`https://swapi.dev/api/people/${id}`)
        .then(res =>{
            console.log(res.data)
            setPeople([res.data])
        })
        .catch(err=>{
            console.log(err)
        })
    },[])




    return (
        <div>
            {
                people.map((person)=>{
                return<>
                <h1>{person.name} </h1>
                <p><strong>Height:</strong> {person.height}</p>
                <p><strong>Hair Color:</strong> {person.hair_color}</p>
                <p><strong>Eye Color:</strong> {person.eye_color}</p>
                <p><strong>Skin Color:</strong> {person.skin_color}</p>
                </>
                
                })
            }

        </div>
    )
}

export default People