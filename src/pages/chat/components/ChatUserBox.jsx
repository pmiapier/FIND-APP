import React, { useEffect, useState } from 'react';
import { socket } from '../confic/socket';
import axios from 'axios';
import { useAuth } from '../../../hooks/useAuth';

export default function ChatUserBox({ input, setCurrentUser, currentUser, onlineUsers }) {

    const [alluser, setAlluser] = useState([])
    const [chatRooms, setChatRooms] = useState([]);
    const getHistoryRoom = () => {
        axios.get(`/chat?user=${+input?.sender}`)
            .then((response) => {
                setChatRooms((pre) => response.data);
     
            })
            .catch((error) => {
                console.error('Error fetching chat rooms:', error);
            });
    }
    useEffect(() => {
        if (input.sender) getHistoryRoom()
    }, [input]);
    useEffect(() => {
        socket.on(`onlineUser`, (data) => {
            delete data[input?.sender]
            const userArray = Object.values(data)
            setAlluser(userArray)

        });
        socket.on("updateChatRoom", () => {
        })
        return () => {
            socket.off("onlineUser")
        }
    }, [input])

    return (
        <div >
            {alluser.map((user) => <div key={user.socketId} role="button" onClick={() => {
                socket.emit('join_room', {
                    sender: input?.sender,
                    receiver: user.userId
                })
                setCurrentUser(user)
                getHistoryRoom()
            }} className={`h-[80px] w-full flex items-center gap-2 hover:bg-gray-200 px-5 `}>
                <div className="flex flex-col justify-center gap-0.5 h-full w-full">
                    <div className="font-bold text-[18px]">{user.firstName}</div>
                </div>
                {onlineUsers?.includes(user) ? (
                    <div className="text-green-500">Online</div>
                ) : (
                    <div className="text-gray-500">Offline</div>
                )}
            </div>)}
            <div className="">************************************************************</div>
            {chatRooms?.map((user, idx) => <div key={idx} role="button"
                onClick={() => {
                    socket.emit('join_room', {
                        sender: input?.sender,
                        receiver: user.userA.id === input?.sender ? user.userB.id : user.userA.id
                    })
                    setCurrentUser(user.userA.id === input?.sender ? { userId: user.userB.id, firstName: user.userB.firstName } : { userId: user.userA.id, firstName: user.userA.firstName })
                    getHistoryRoom()
                }}
                className=" h-[80px] w-full flex items-center gap-2 hover:bg-gray-200 px-5">
                <div className="flex flex-col justify-center gap-0.5 h-full w-full">
                    <div className="font-bold text-[18px]">{user.userA.id === input?.sender ? user.userB.firstName : user.userA.firstName}</div>
                </div>
            </div>)}
        </div>
    )
}

