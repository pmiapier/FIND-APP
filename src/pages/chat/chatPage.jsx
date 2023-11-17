import { useEffect, useState } from "react"
import { socket } from "./confic/socket";
import ChatUserBox from "./components/ChatUserBox";
import ChatMessageBox from "./components/ChatMessageBox";
import { useAuth } from "../../hooks/useAuth";
import axios from 'axios';
import { useModal } from "../../hooks/useModal";
export default function ChatPage() {
    const { onCloseModal, isOpenModal, modalType, onOpenModal } = useModal();
    const { authUser, currentUser, setCurrentUser, showInputChat, setShowInputChat } = useAuth();

    const [input, setInput] = useState({
        sender: null,
        receiver: null
    })
    const [onlineUsers, setOnlineUsers] = useState([]);
    useEffect(() => {
        if (authUser) {
            setInput(prevInput => ({ ...prevInput, sender: authUser?.id }))
        }
    }, [authUser])
    useEffect(() => {
        socket.auth = { authUser }
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
        <>
            {isOpenModal && modalType === "chatModal" && (
                <div className="fixed bottom-0 left-0 flex justify-center items-center h-full w-full backdrop-blur z-50">
                    <div className="relative flex flex-col items-center justify-center h-[800px] drop-shadow-2xl  rounded-xl  bg-white">
                        <div className=" flex items-center justify-center py-10">
                            <button
                                onClick={() => {
                                    setCurrentUser("")
                                    onCloseModal()
                                    setShowInputChat(false)
                                }}
                                className=" text-white absolute top-3 right-3 bg-gray-300 border-2 hover:text-gray-500 hover:bg-white hover:border-gray-500 w-8 h-8 flex justify-center items-center rounded-full ">
                                X
                            </button>
                            <div className="flex w-[1440px] h-[800px] justify-center rounded-xl shadow-2xl">
                                <div className="flex w-[1440px] ">
                                    <div className="w-[40%] border-r-2 ">
                                        <div className="h-[60px] w-full flex justify-center items-center font-bold text-[20px] border-b-2 ">
                                            {/* {authUser?.firstName + " " + authUser?.lastName} */}Message
                                        </div>
                                        <div className="w-full h-[740px] overflow-auto">
                                            <ChatUserBox input={input} setShowInputChat={setShowInputChat} showInputChat={showInputChat} setCurrentUser={setCurrentUser} currentUser={currentUser} onlineUsers={onlineUsers} />
                                        </div>
                                    </div>
                                    <div className="w-full h-full">
                                        <div className="h-[60px] w-full flex justify-center items-center font-bold text-[20px] border-b-2">
                                            {currentUser.fullName}
                                        </div>
                                        <div className="h-full w-full">
                                            <div className="h-[60px] w-full ">
                                                <ChatMessageBox input={input} setShowInputChat={setShowInputChat} showInputChat={showInputChat} setCurrentUser={setCurrentUser} currentUser={currentUser} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}