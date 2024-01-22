import React from 'react'

const Display = (props) => {
    return (
        <div>

            {
                props.boxes.map((b, i) => {
                    return <div key={i} style={{ height:"80px", width:"80px", margin:"10px", display:'inline-block',backgroundColor: b.color}}>

                    </div>



                })
            }
        </div>
    )
}

export default Display