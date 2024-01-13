import React, {useState} from "react";


const PersonCard = (props) => {
    const {person} = props;
    const [Age, setAge]= useState(person.age);
    return(
        <div>
            <h2>{person.lastname}, {person.firstname}</h2>
            <p>Age : {Age}</p>
            <p> Hair Color : {person.haircolor}</p>
            <button onClick={()=>setAge(Age+1)}>birthday button for {person.firstname} {person.lastname}</button>
            
        </div>
    )
    
}



export default PersonCard;