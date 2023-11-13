import { useEffect, useState } from "react"
import { socket } from "./confic/socket";
import ChatUserBox from "./components/ChatUserBox";
import ChatMessageBox from "./components/ChatMessageBox";
import { useAuth } from "../../hooks/useAuth";
import axios from 'axios';
export default function ChatPage() {
    const { authUser } = useAuth();
    console.log(authUser, "------------------------------")

    const [input, setInput] = useState({
        sender: null,
        receiver: null
    })

    const [currentUser, setCurrentUser] = useState('')
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        if (authUser) { setInput(prevInput => ({ ...prevInput, sender: authUser?.id })) }
    }, [authUser])

    useEffect(() => {
        socket.auth = { userId: authUser?.id }
        socket.connect()
        socket.on("onlineUser", (data) => {
            delete data[input.sender];
            const userArray = Object.keys(data);
            setOnlineUsers(userArray);
        });
        return () => {
            socket.disconnect()
        }
    }, [input])


    return (
        <div className="w-full flex items-center justify-center py-10">
            <div className="flex w-[1440px] h-[800px] justify-center shadow-2xl">
                <div className="flex w-[1440px] ">
                    <div className="w-[40%] border-r-2 ">
                        <div className="h-[60px] w-full flex justify-center items-center font-bold text-[20px] border-b-2 ">
                            {authUser?.firstName}
                        </div>
                        <div className="w-full h-[740px] overflow-auto">
                            <ChatUserBox input={input} setCurrentUser={setCurrentUser} onlineUsers={onlineUsers} />
                        </div>
                    </div>
                    <div className="w-full h-full  ">
                        <div className="h-[60px] w-full flex justify-center items-center font-bold text-[20px] border-b-2">
                            {currentUser}
                        </div>
                        <div className="h-full w-full">
                            <div className="h-[60px] w-full ">
                                <ChatMessageBox input={input} currentUser={currentUser} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}