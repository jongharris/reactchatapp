import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import './Join.css'
const Join = () => {
    //hook to set the name, default is ''
    const [name, setName] = useState('');
    //set the room
    const [room, setRoom] = useState(1);
    return (
        <div className= "joinOuterContainer">
            <div className = "joinInnerContainer">
                <h1 className ="heading"> Welcome </h1>
                <div>
                    <input placeholder="Name" className= "joinInput" type ="text" onChange={(event)=> setName(event.target.value)}/>
                </div>
                <div>
                    {/* <input placeholder="1" className= "joinInput mt-20" type ="text" readonly onChange={(event)=>setRoom(event.target.value)}/> */}
                    <input value = "1" className = "joinInput mt-20" type = "text" readonly></input>
                </div>
                <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className={'button mt-20'} type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    );
}

export default Join;