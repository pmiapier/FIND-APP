import React, { useEffect, useState } from 'react';
import { socket } from '../confic/socket';
import axios from 'axios';
import Avatar from './Avatar';

export default function ChatUserBox({ input, setCurrentUser, onlineUsers, setShowInputChat }) {
    const [alluser, setAlluser] = useState([])
    const [chatRooms, setChatRooms] = useState([]);
    const toggleInputChat = () => {
        setShowInputChat(true);
    };
    const getHistoryRoom = () => {
        axios.get(`/chat?user=${+input?.sender}`)
            .then((response) => {
                setChatRooms((pre) => response.data);
                console.log('room', response.data);
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
            // getHistoryRoom()
        })
        return () => {
            socket.off("onlineUser")
        }
    }, [input])
    console.log(onlineUsers)

    return (
        <div >
            {/* {alluser.map((user) => <div key={user.socketId} role="button" onClick={() => {
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
            </div>)} */}
            {chatRooms?.map((user, idx) => <div key={idx} role="button"
                onClick={() => {
                    socket.emit('join_room', {
                        sender: input?.sender,
                        receiver: user.userA.id === input?.sender ? user.userB.id : user.userA.id
                    })
                    setCurrentUser(user.userA.id === input?.sender ?
                        { userId: user.userB.id, firstName: user.userB.firstName, lastName: user.userB.lastName, fullName: user.userB.firstName + " " + user.userB.lastName }
                        : { userId: user.userA.id, firstName: user.userA.firstName, lastName: user.userA.lastName, fullName: user.userA.firstName + " " + user.userA.lastName })
                    getHistoryRoom()
                    toggleInputChat()
                }}
                className=" h-[80px] w-full flex items-center gap-2 hover:bg-gray-200 px-5">
                <Avatar setStatus={onlineUsers?.includes((user.userA.id === input?.sender ? user.userB.id : user.userA.id).toString())} />
                <div className="flex flex-col justify-center gap-0.5 h-full w-full">
                    <div className="font-bold text-[18px]">{user.userA.id === input?.sender ? user.userB.firstName + " " + user.userB.lastName : user.userA.firstName + " " + user.userA.lastName}</div>
                </div>
            </div>)}
        </div>
    )
}

