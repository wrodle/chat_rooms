import {useEffect, useReducer} from "react";

import {reducer} from "./reducer";
import socket from './socket';
import JoinBlock from "./components/JoinBlock";
import Chat from "./components/Chat";
import {$host} from "./core/axios";

function App() {
    const [state, dispatch] = useReducer(reducer, {
        joined: false,
        roomId: null,
        userName: null,
        users: [],
        messages: []
    })

    const onLogin = async (obj) => {
        dispatch({
            type: 'JOINED',
            payload: obj
        });
        socket.emit('ROOM:JOIN', obj);
        const { data } = await $host.get(`/rooms/${obj.roomId}`);
        dispatch({
            type: 'SET_DATA',
            payload: data
        })
    };

    const setUsers = (users) => {
        dispatch({
            type: 'SET_USERS',
            payload: users
        });
    }

    const addMessage = ({ text, userName }) => {
        dispatch({
            type: 'NEW_MESSAGE',
            payload: {
                text,
                userName
            }
        });
    }

    useEffect(() => {
        socket.on('ROOM:SET_USERS', setUsers)
        socket.on('ROOM:NEW_MESSAGE', addMessage)
    }, [])


  return (
    <div className="App">
        {!state.joined ? <JoinBlock onLogin={onLogin}/> : <Chat {...state} onAddMessage={addMessage}/>}
    </div>
  );
}

export default App;
