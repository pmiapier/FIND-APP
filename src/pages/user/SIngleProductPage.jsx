import { useModal } from '../../hooks/useModal';
import { useParams } from 'react-router-dom';
import axios from '../../config/axios';
import { useEffect, useState } from 'react';
import { formatDate } from '../../utils/dates';
import { MdPinDrop } from 'react-icons/md';
import { RxAvatar } from 'react-icons/rx';
import { socket } from '../chat/confic/socket';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function SingleProductPage() {
  const { onOpenModal } = useModal();
  let { id } = useParams();
  const [item, setItem] = useState({ user: '' });
  const { authUser, setCurrentUser, setShowInputChat } = useAuth();
  const navigate = useNavigate();
  const getSingleItem = () => {
    axios.get(`/item/get-single-item/${id}`).then((response) => {
      setItem(response.data);
    });
  };
  function handleClickNavigateToChat() {
    navigate('/chat');
  }
  const toggleInputChat = () => {
    setShowInputChat(true);
  };
  const handleJoinRoom = () => {
    if (authUser) {
      socket.emit('join_room', {
        sender: authUser.id,
        receiver: item.ownerId
      });
    }
  };
  console.log(item);
  useEffect(() => {
    getSingleItem();
  }, []);
  return (
    <div className="bg-[#F9F9FB] px-12 py-12 space-y-4">
      <div className="w-full bg-white p-6 grid grid-cols-2 rounded-md space-x-6 shadow">
        <div className="flex space-y-4 flex-col ">
          <h1 className="text-5xl font-bold">{item.title}</h1>
          <div className="bg-[#fafafa] h-[80px] p-2">
            <p>Renting For</p>
            <p className="text-5xl font-bold pl-4">
              ฿{item.price}
              <span className="text-2xl">/Day</span>
            </p>
          </div>
          <p className="font-bold text-2xl">Detail Product</p>
          <div className="p-2">
            <div dangerouslySetInnerHTML={{ __html: item.description }} />
          </div>
          <div className="flex gap-4 mb-2">
            <button
              onClick={() => onOpenModal('checkoutModal', id)}
              className="bg-blue-500 text-white w-6/12 p-4 rounded-md"
            >
              Rent Now
            </button>
            <button
              onClick={() => {
                onOpenModal('chatModal');
                handleJoinRoom();
                setCurrentUser({ fullName: item.user });
                toggleInputChat();
              }}
              className="bg-gray-400 text-white w-3/12 p-4 rounded-md"
            >
              Send Message
            </button>
          </div>
          <hr />
          <div className="grid grid-cols-2">
            <div className="space-y-2">
              <p className="font-bold text-lg">Product Information</p>
              <div className="flex gap-4 items-center">
                <div className="text-3xl">
                  <MdPinDrop />
                </div>
                <p className="text-blue-500 text-lg">1110, Phra Khanong</p>
              </div>
              <div className="flex gap-4">
                <p className="w-30">Code Product</p>
                <p className="text-gray-500">{item.id}</p>
              </div>
              <div className="flex gap-4">
                <p className="w-20">Update At</p>
                <p className="text-gray-500">{formatDate(item.updatedAt)}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-bold text-lg">Owner Product</p>
              <div className="flex gap-4 items-center">
                <div className="text-3xl">
                  <RxAvatar />
                </div>

                <p className="text-blue-500 text-lg">{item.user}</p>
              </div>
              <div className="flex gap-2">
                <p className="w-30 text-xs">Become a member</p>
                <span className="text-xs text-gray-500"> 2y 4m</span>
              </div>
            </div>
          </div>
          <hr />
          <div className="flex space-x-2 ">
            <p>There's Something Wrong?</p>
            <p className="text-blue-500 font-bold" role="button">
              Report this issue to FIND
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="w-full h-[548px] bg-red-500 rounded-md shadow">
            <img
              src={
                item.images?.[0]?.imageUrl ||
                'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=3176&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }
              alt="product"
              className="object-cover h-full w-full rounded-md"
            />
          </div>
          <div className="flex gap-3 place-items-center">
            {item.images?.[1] && (
              <div className="w-[160px] h-[160px]">
                <img src={item.images?.[1]?.imageUrl} alt="product" className="object-cover h-full w-full rounded-md" />
              </div>
            )}
            {item.images?.[2] && (
              <div className="w-[160px] h-[160px]">
                <img src={item.images?.[2]?.imageUrl} alt="product" className="object-cover h-full w-full rounded-md" />
              </div>
            )}
            {item.images?.[3] && (
              <div className="w-[160px] h-[160px]">
                <img src={item.images?.[3]?.imageUrl} alt="product" className="object-cover h-full w-full rounded-md" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
