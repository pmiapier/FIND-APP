import React, { useState, useRef, useEffect } from 'react';
import { BsEmojiLaughing } from 'react-icons/bs';
import { FaPaperclip } from 'react-icons/fa';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { socket } from '../confic/socket';
import AvatarInMessage from './AvatarInMessage';

export default function ChatMessageBox({ input, currentUser, showInputChat, setShowInputChat }) {
    const [currentMessage, setCurrentMessage] = useState(``)
    const [messageList, setMessageList] = useState([])
    const [chatroom, setChatroom] = useState(``)
    const [type, setType] = useState(``)
    const [inputText, setInputText] = useState(``)
    const [inputShowImg, setInputShowImg] = useState(``)

    // 👇 Scroll To Bottom 👇
    const messageInputRef = useRef();
    useEffect(() => {
        messageInputRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messageList]);

    // 👇 Send Message 👇
    const sendMessage = async () => {
        if (currentMessage !== ``) {
            const messageData = {
                chatroom,
                to: currentUser.userId,
                sender: input?.sender,
                message: currentMessage,
                type,
                send_date: new Date()
            }
            socket.emit(`send_message`, messageData)
            setCurrentMessage(``)
            setInputText(``)
            setInputShowImg(``)
            setMessageList((list) => [...list, messageData]);
        }
    }

    // 👇 Pass Enter To Send Message 👇
    const handleNewMessage = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        } else {
            setCurrentMessage(e.target.value)
            setInputText(e.target.value)
        }
    };

    // 👇 Handle Input Type / Receive Message 👇
    const handleInput = async (e) => {
        setType(`message`)
        setCurrentMessage(e.target.value)
        setInputText(e.target.value)
    }
    const inputImg = useRef(null)
    const handleImg = (e) => {
        const reader = new FileReader()
        setType(`image`)
        const file = e.target.files[0]
        reader.readAsDataURL(file)
        reader.onload = () => {
            let image = reader.result
            setCurrentMessage(image)
            setInputShowImg(reader.result)
        }
    }
    const handleReceiveMessage = (data) => {
        data.send_date = new Date(data.send_date);
        console.log(data.chatroom, +chatroom)
        if (data.chatroom === +chatroom) {
            setMessageList((list) => [...list, data]);
        }
    };

    // 👇 Emoji 👇
    const [showEmoji, setShowEmoji] = useState(false)
    const addEmoji = (e) => {
        setType(`message`)
        const sym = e.unified.split("_");
        const codeArray = [];
        sym.forEach((el) => codeArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codeArray);
        setCurrentMessage(currentMessage + emoji);
        setInputText(inputText + emoji);
    };

    // 👇 useRef pass ESC and Outside to close Emoji 👇
    const refEmoji = useRef(null)
    const hideOnEscape = (e) => {
        if (e.key === "Escape") {
            setShowEmoji(false)
        }
    }
    const hideOnClickOutside = (e) => {
        if (refEmoji.current && !refEmoji.current.contains(e.target)) {
            setShowEmoji(false)
        }
    }
    useEffect(() => {
        document.addEventListener('keydown', hideOnEscape, true);
        document.addEventListener('click', hideOnClickOutside, true);
        return () => {
            document.removeEventListener('keydown', hideOnEscape, true);
            document.removeEventListener('click', hideOnClickOutside, true);
        };
    }, []);

    // 👇 Socket.io Get => room id / all chat / receive message 👇
    useEffect(() => {
        socket.on(`room_id`, (data) => {
            setChatroom(data.id)
        });
        socket.on('disconnect', () => {
            console.log('Socket disconnected')
        });
        socket.on(`all_chat`, ({ allChat }) => {
            const x = allChat.map((item) => {
                return (
                    {
                        chatroom: item.chatroom_id,
                        sender: item.sender.id,
                        message: item.message,
                        type: item.type,
                        send_date: item.send_date
                    }
                )
            })
            setMessageList(() => [...x]);
        })
        socket.on(`receive_message`, handleReceiveMessage)
        return () => {
            socket.off(`receive_message`)
            socket.off(`all_chat`)
            socket.off(`room_id`)
            socket.off(`disconnect`)

        };
    }, [socket, handleReceiveMessage]);

    // 👇 Render Messages Box / Classify receiver and sender 👇
    const renderMessages = () => {
        return messageList.map((message, index) => {
            // console.log(message.sender, '111111111111111111111111')
            // console.log(input?.sender, '222222222222222222222222')
            const isMe = message.sender === input?.sender;
            const messageClass = isMe ? 'bg-blue-500 text-white' : 'bg-gray-300 ';
            const messageImgClass = message.type !== `message` ? 'bg-white ' : messageClass;
            const messageDirection = isMe ? 'justify-end' : 'justify-start';
            const timePosition = isMe ? '-order-1' : ''
            const sendDate = new Date(message.send_date);
            const hours = sendDate.getHours().toString().padStart(2, '0');
            const minutes = sendDate.getMinutes().toString().padStart(2, '0');
            const formattedTime = `${hours}:${minutes}`;
            return (
                <div key={index} className={`flex gap-1 px-2 pb-2   ${messageDirection}`} ref={messageInputRef} >
                    <div className={`${messageImgClass} px-3 py-2 rounded-lg flex justify-center items-center whitespace-pre-wrap break-all  max-w-[50%]`}>
                        {message.type === `message` ? <div>{message.message}</div> : <img className='rounded-xl' src={message.message} />}
                    </div>
                    <div className={`flex items-end text-[12px] ${timePosition}`}>{formattedTime}</div>
                    {message.sender !== input.sender && (<div className=' -order-1 mr-2'> <AvatarInMessage /></div>)}
                </div>
            );
        });
    };

    // 👇 Return 👇
    return (
        <div className="h-[740px] p-2 flex flex-col justify-end ">
            <div className="overflow-auto">
                {renderMessages()}
            </div>
            {inputShowImg == "" ? '' : <div className="w-[100%] h-[150px] bg-blue-100 px-2 flex items-center rounded-lg"><img className='h-[90%] rounded-lg' src={inputShowImg} /></div>}
            <div className="mt-3 flex gap-2 ">
                <div className='flex relative' >
                    {showEmoji && <div ref={refEmoji} className="absolute bottom-[45px] left-0"><Picker data={data} onEmojiSelect={addEmoji} /></div>}
                </div>
                {showInputChat && (<>
                    <div className="flex w-full relative">
                        <button className="absolute bottom-[8px] flex left-2" onClick={() => setShowEmoji(!showEmoji)}><BsEmojiLaughing className='text-[25px] text-gray-400' /></button>
                        <input type="file" onChange={handleImg} className='hidden' ref={inputImg}></input>
                        <button className="absolute bottom-[8px] flex left-[40px]" onClick={() => inputImg.current.click()} ><FaPaperclip className='text-[24px] text-gray-400' /></button>
                        <input type="text" onKeyPress={handleNewMessage} placeholder="Type a message..." value={inputText} onChange={handleInput} className="w-full p-2 pl-[70px] border rounded" />
                    </div>
                    <button
                        onClick={sendMessage}
                        className="bg-blue-500 text-white px-3 rounded-lg">
                        Send
                    </button>
                </>)}
            </div>
        </div >
    )

}