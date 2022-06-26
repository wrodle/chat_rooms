import React, {useState} from 'react';
import {$host} from '../core/axios';

const JoinBlock = ({ onLogin }) => {
    const [roomId, setRoomId] = useState('')
    const [userName, setUserName] = useState('')
    const [isLoading, setLoading] = useState(false)

    const onEnter = async () => {
        if (!roomId || !userName) {
            return alert('Неверные данные')
        }
        setLoading(true);
        await $host.post('/rooms', {
            roomId
        })
        const obj = {
            roomId,
            userName
        }
        onLogin(obj)
        setLoading(false);
    }

    return (
        <div className="join-block">
            <input
                type="text"
                placeholder="Room ID"
                value={roomId}
                onChange={e => setRoomId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Ваше имя"
                value={userName}
                onChange={e => setUserName(e.target.value)}
            />
            <button
                className="btn btn-success"
                onClick={onEnter}
                disabled={isLoading}
            >
                {isLoading ? 'Вход...' : 'ВОЙТИ'}
            </button>
        </div>
    );
};

export default JoinBlock;