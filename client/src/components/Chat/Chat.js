import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css'
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

let socket;

const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState('');

    const server = 'localhost:5000';
    
    //useEffect is for the lifecycle hooks: mounting and demounting
    useEffect(() => {
        //retrieve data while joining
        //destructure the location.search this is given by react router
        const {room,name} = queryString.parse(location.search);
        
        //Server
        socket = io(server);
        setName(name);
        setRoom(room);

        //emit the event and catch on server, send the name and room
        socket.emit('join', {name, room}, () => {
          
        }); 
        //for disconnects (unmounting)
        return () => {
            //disconnect function in server side
            socket.emit('disconnect')
            //turn instance off
            socket.off();
        }
    }, [server, location.search]);

    //handle message
    useEffect(() => {
        //listen for messages
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })

        socket.on('roomData', ({ users }) => {
            setUsers(users);
          })
        //run only when messages changes
    }, [messages]);

    //function for sending the messages
    const sendMessage = (event) => {
        //prevent a key press from refreshing full page...
        event.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));  
     }
    }
    console.log(message, messages);
 
    return (
        <div className = "outerContainer">
            <div className = "container">
                <InfoBar room={room} name={name} />
                <Messages messages = {messages} name = {name} />
                <Input message = {message} setMessage ={setMessage} sendMessage = {sendMessage} />
            </div>
            <TextContainer users={users}/>
        </div>
    );
}

export default Chat;