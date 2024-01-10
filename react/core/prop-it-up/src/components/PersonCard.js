import React from'react';

const PersonCard = (props) => {
    return(
        <div>
            <h1>{props.lastname}, {props.firstname}</h1>
            <p> Age: {props.age} </p>
            <p> Hair Color: {props.hair_color} </p>

        </div>
    )
}
export default PersonCard;