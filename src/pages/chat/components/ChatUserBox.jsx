import React, { useEffect, useState } from 'react';
import { socket } from '../confic/socket';
import axios from 'axios';

export default function ChatUserBox({ input, setCurrentUser, onlineUsers }) {

    //######################## All Online User ##############################
    const [alluser, setAlluser] = useState([])


    useEffect(() => {
        socket.on(`onlineUser`, (data) => {
            delete data[input?.sender]
            const userArray = Object.keys(data)
            console.log(data, "+++++++++++++++++")
            setAlluser(userArray)
        });
        socket.on("updateChatRoom", () => {
            // getHistoryRoom()
        })
        return () => {
            socket.off("onlineUser")
        }
    }, [input])
    // console.log("alluser", alluser)

    //#################### Get History Chat Room ###########################
    // const [chatRooms, setChatRooms] = useState([]);
    // const getHistoryRoom = () => {
    //     axios.get(`/chat?user=${input.sender}`)
    //         .then((response) => {
    //             setChatRooms((pre) => response.data);
    //             console.log(response.data);
    //             console.log('room', response.data);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching chat rooms:', error);
    //         });
    // }
    // useEffect(() => {
    //     getHistoryRoom()
    // }, []);

    //############################ Return ##################################
    return (
        <div >
            {alluser.map((user) => <div key={user} role="button" onClick={() => {
                socket.emit('join_room', {
                    sender: input?.sender,
                    receiver: user
                })
                setCurrentUser(user)
                // getHistoryRoom()

            }} className={`h-[80px] w-full flex items-center gap-2 hover:bg-gray-200 px-5 `}>
                <div className="flex flex-col justify-center gap-0.5 h-full w-full">
                    <div className="font-bold text-[18px]">{user}</div>
                </div>
                {onlineUsers?.includes(user) ? (
                    <div className="text-green-500">Online</div>
                ) : (
                    <div className="text-gray-500">Offline</div>
                )}
            </div>)}

            <hr className='border-2' />

            {/* {chatRooms?.map((user, idx) => <div key={idx} role="button"
                onClick={() => {
                    socket.emit('join_room', {
                        sender: input?.sender,
                        receiver: user.userA.user === input?.sender ? user.userB.user : user.userA.user
                    })
                    setCurrentUser(user.userA.user === input?.sender ? user.userB.user : user.userA.user)
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
        </div>
    )
}