import axios from "axios";
import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"


const Planets = () => {
    const [planets, setPlanets] = useState([])
    const {id} = useParams()


    useEffect(() => {
        axios.get(`https://swapi.dev/api/planets/${id}`)
            .then(res => {
                console.log(res.data)
                setPlanets([res.data])
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        

        <div>
            {
                planets.map((planet)=>{
                return<>
                <h1>{planet.name} </h1>
                <p><strong>Climate:</strong> {planet.climate}</p>
                <p><strong>Terrain:</strong> {planet.terrain}</p>
                <p><strong>Surface Water:</strong> {planet.surface_water}</p>
                <p><strong>Population</strong> {planet.population}</p>
                </>
                
                })
            }
            
        </div>
        

        )









    










}

export default Planets