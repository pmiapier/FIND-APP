import React, { useEffect, useState } from 'react';
import { socket } from '../confic/socket';
import axios from 'axios';

export default function ChatUserBox({ input, setCurrentUser, onlineUsers }) {

    //######################## All Online User ##############################
    const [alluser, setAlluser] = useState([])


    useEffect(() => {
        socket.on(`onlineUser`, (data) => {
            console.log(data[input?.sender])
            delete data[input?.sender]
            // const userArray = Object.values(data).map(user => user.firstName)
            const userArray = Object.values(data)
            console.log(data, "*********************")
            // console.log(userArray, "+++++++++++++++++")
            setAlluser(userArray)

        });
        socket.on("updateChatRoom", () => {
            // getHistoryRoom()
        })
        return () => {
            socket.off("onlineUser")
        }
    }, [input])
    // console.log("alluser :", input)

    //#################### Get History Chat Room ###########################
    const [chatRooms, setChatRooms] = useState([]);
    const getHistoryRoom = () => {
        axios.get(`/chat?user=${3}`)
            .then((response) => {
                setChatRooms((pre) => response.data);
                console.log('room', response.data);
            })
            .catch((error) => {
                console.error('Error fetching chat rooms:', error);
            });
    }
    useEffect(() => {
        getHistoryRoom()
    }, []);
    console.log(chatRooms, "------------")
    //############################ Return ##################################
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
            <div className="">.........................</div>
            {/* {chatRooms?.map((user, idx) => <div key={idx} role="button"
                onClick={() => {
                    socket.emit('join_room', {
                        sender: input?.sender,
                        receiver: user.userA.id === input?.sender ? "" : user.userB.id
                    })
                    setCurrentUser(user.userA.id === input?.sender ? "" : user.userB.id)
                    getHistoryRoom()
                }}
                className=" h-[80px] w-full flex items-center gap-2 hover:bg-gray-200 px-5">
                <div className="flex flex-col justify-center gap-0.5 h-full w-full">
                    <div className="font-bold text-[18px]">{user.userA.user === input?.sender ? user.userB.user : user.userA.user}</div>
                </div>
                {onlineUsers?.includes(user.userA.user === input?.sender ? user.userB.user : user.userA.user) ? (
                    <div className="text-green-500">Online</div>
                ) : (
                    <div className="text-gray-500">Offline</div>
                )}
            </div>)} */}
            {chatRooms?.map((user, idx) => <div key={idx} role="button"
                onClick={() => {
                    socket.emit('join_room', {
                        sender: input?.sender,
                        receiver: user.userA.id === input?.sender ? "" : user.userB.id
                    })
                    setCurrentUser(user.userA.id === input?.sender ? "" : user.userB.id)
                    getHistoryRoom()
                }}
                className=" h-[80px] w-full flex items-center gap-2 hover:bg-gray-200 px-5">
                <div className="flex flex-col justify-center gap-0.5 h-full w-full">
                    <div className="font-bold text-[18px]">{user.userA.user === input?.sender ? user.userB.user : user.userA.user}</div>
                </div>
                {onlineUsers?.includes(user.userA.user === input?.sender ? user.userB.user : user.userA.user) ? (
                    <div className="text-green-500">Online</div>
                ) : (
                    <div className="text-gray-500">Offline</div>
                )}
            </div>)}
        </div>
    )
}

