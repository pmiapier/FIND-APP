import rentedItem from '../../assets/robert-bye.jpg';
import Button from '../buttons/Button';
import ItemStatus from '../status/ItemStatus';
import { useState, useEffect } from 'react';
import axios from '../../config/axios';
import { formatDate } from '../../utils/dates';
import { Link } from 'react-router-dom';
import { useModal } from '../../hooks/useModal';

export default function MyRentedItemCard({ data }) {
  let startRentDate = formatDate(data.startRentDate);
  const { onOpenModal } = useModal();
  const dateNow = formatDate(new Date());
  if (startRentDate < dateNow) {
    startRentDate = dateNow;
  }
  const [pic, setPic] = useState(``);
  useEffect(() => {
    setPic(data.item.images[0]?.imageUrl);
  }, []);
  const endRentDate = formatDate(data.endRentDate);


  const diffDate = Math.ceil((new Date(endRentDate) - new Date(startRentDate)) / 86400000);
  const daysUntilStart = Math.ceil((new Date(startRentDate) - new Date(dateNow)) / 86400000);
  const [ownerStatus, setOwnerStatus] = useState(data.owner_status);
  const [renteeStatus, setRenteeStatus] = useState(data.rentee_status);

  const getMainStatus = () => {
    if (ownerStatus === 'pending_delivery' && renteeStatus === 'pending_received') {
      return 'Awaiting delivery';
    } else if (ownerStatus === 'renting' && renteeStatus === 'pending_received') {
      return 'Awaiting received';
    } else if (ownerStatus === 'renting' && renteeStatus === 'received_item') {
      return 'Renting';
    } else if (ownerStatus === 'renting' && renteeStatus === 'completed') {
      return 'Awaiting owner action';
    } else if (ownerStatus === 'completed' && renteeStatus === 'completed') {
      return 'Completed';
    } else if (renteeStatus === 'awaiting_payment') {
      return 'Awaiting payment';
    }
  };

  const [status, setStatus] = useState('');

  useEffect(() => {
    setStatus(getMainStatus());
  }, [ownerStatus, renteeStatus]);


  const handleDelivery = () => {
    const res = axios.post(`/rent/changeRenteeStatus`, { rentId: data.id, status: 'received_item' }).then(() => {
      setStatus('renting');
      setRenteeStatus('received_item');
    });

    if (!res) {
      console.log('error from handleDelivery');
    }
  };

  const handleReturned = async () => {
    try {

      const res = await axios.post(`/rent/changeRenteeStatus`, { rentId: data.id, status: 'completed' }).then(() => {
        setStatus('renting');
        setRenteeStatus('completed');
      }
      );
      if (!res) {
        console.log('error from handleReturned');
      }
      await axios.post(`/transaction/createTransaction`, { rentId: data.id })
    } catch (error) {
      console.log(error)
    }

  };

  // return (
  //   <div className="bg-white flex justify-center items-center gap-10 py-5">
  //     <div className="w-60 h-40 overflow-hidden rounded-lg">
  //       {pic ? <img className="rounded-sm" src={pic} alt="item" /> : null}
  //     </div>

  //     <div className="py-5">
  //       <div>
  //         <b>Order Number:</b> #{data.id}
  //       </div>
  //       <div>
  //         <b>Product:</b> {data.item.title}
  //       </div>

  //       <div className="flex gap-2">
  //         <div>
  //           <b>Item ID:</b>
  //         </div>
  //         <div>{data.item.id}</div>
  //       </div>
  //       <div>
  //         <b>Item Status:</b>
  //       </div>

  //       <ItemStatus text={status} />
  //       <div className="flex gap-2">
  //         <div>
  //           <b>Item Owner:</b>
  //         </div>
  //         <div>{data.owner.firstName}</div>
  //       </div>
  //     </div>

  //     <div className="border-2 border-gray-100 flex flex-col gap-1 px-10 py-5 rounded-lg text-center ">
  //       <div>RENTAL START</div>
  //       <div className="text-gray-400">{startRentDate}</div>
  //       <div>RENTAL ENDS</div>
  //       <div className="text-gray-400">{endRentDate}</div>
  //     </div>
  //     {startRentDate <= dateNow ? (
  //       <div className="bg-orange text-white px-10 py-5 rounded-lg flex flex-col justify-center items-center ">
  //         <div>Must Return</div>
  //         <div>the item</div>
  //         <div>in</div>
  //         <div className="text-[30px]">{diffDate} days</div>
  //       </div>
  //     ) : (
  //       <div className="bg-readyToRent text-white px-10 py-5 rounded-lg flex flex-col justify-center items-center ">
  //         <div>Rental</div>
  //         <div>starts</div>
  //         <div>in</div>
  //         <div className="text-[30px]">{daysUntilStart} days</div>
  //       </div>
  //     )}

  //     <div className="border-2 border-gray-100 flex flex-col gap-1 px-10 py-5 rounded-lg ">
  //       <Link to="item-dispute">
  //         <Button text={'Item Dispute'} className={'bg-messageButton hover:bg-hoverMessageButton w-48'} />
  //       </Link>

  //       {ownerStatus === 'renting' && renteeStatus === 'received_item' ? (
  //         <div>
  //           <Button text={'Proof of Returning'} className={'bg-readyToRent hover:bg-green-700 w-full mb-1'} />
  //           <Button
  //             text={'Comfirm Return Item'}
  //             className={'bg-primaryButton hover:bg-hoverPrimaryButton w-full'}
  //             event={() => handleReturned()}
  //           />
  //         </div>
  //       ) : ownerStatus === 'renting' && renteeStatus === 'pending_received' ? (
  //         <Button
  //           text={'Comfirm Received'}
  //           className={'bg-primaryButton hover:bg-hoverPrimaryButton w-full'}
  //           event={() => handleDelivery()}
  //         />
  //       ) : ownerStatus === 'renting' && renteeStatus === 'completed' ? (
  //         <Button
  //           text={'Awaiting owner action'}
  //           className={'bg-primaryButton hover:bg-hoverPrimaryButton w-full'}
  //           disabled="disabled"
  //         />
  //       ) : ownerStatus === 'completed' && renteeStatus === 'completed' ? (
  //         <Button
  //           text={'Completed'}
  //           className={'bg-successButton hover:bg-hoverPrimaryButton w-full'}
  //           disabled="disabled"
  //         />
  //       ) : ownerStatus === 'pending_delivery' && renteeStatus === 'pending_received' ? (
  //         <Button
  //           text={'Awaiting delivery'}
  //           className={'bg-primaryButton hover:bg-hoverPrimaryButton w-full'}
  //           disabled="disabled"
  //         />
  //       ) : renteeStatus === 'awaiting_payment' ? (
  //         <Button text={'Make payment'} className={'bg-primaryButton hover:bg-hoverPrimaryButton w-full'} />
  //       ) : null}


  //     </div>
  //   </div>
  // );

  return (
    <div className="w-[700px] h-[300px]">
      <div className="w-full h-[20px]" >
        {startRentDate <= dateNow ? (
          <div className="bg-orange rounded-t-xl w-full h-full text-white px-10 py-5 flex justify-center items-center ">
            <div className='flex' >Must Return the item in <div className="mx-1 font-bold"> {diffDate} </div> days</div>
          </div>
        ) : (
          <div className="bg-readyToRent rounded-t-xl w-full h-full text-white px-10 py-5 flex flex-col justify-center items-center ">
            <div className='flex'>Rental starts in <div className="mx-1 font-bold">{daysUntilStart} </div> days</div>
          </div>
        )}
      </div>
      <div className=" shadow-2xl w-full h-[280px] flex flex-col justify-center rounded-b-xl px-7 my-2">
        <div className="flex flex-col ">
          <div className="w-full  ">
            <div className="flex gap-5">
              <div className="w-[240px] h-[170px] overflow-hidden rounded-lg">
                {pic ? <img className="rounded-sm" src={pic} alt="item" /> : null}
              </div>
              <div className="flex flex-col">
                <div className=' text-[20px] font-bold'>{data.item.title}</div>
                <div>#orderNo :</div>
                <div className="flex gap-2">
                  <div>Item ID :</div>
                  <div>{data.item.id}</div>
                </div>
                <div>Rental Status :</div>
                <ItemStatus text={status} />
                <div className="flex gap-2">
                  <div>Item Owner :</div>
                  <div>{data.owner.firstName + " " + data.owner.lastName}</div>
                </div>
              </div>
              <div className="border-2 border-gray-200 w-[200px] flex flex-col gap-1 px-10 py-5 rounded-lg text-center ">
                <div>RENTAL START</div>
                <div className="text-gray-400">{startRentDate}</div>
                <div>RENTAL ENDS</div>
                <div className="text-gray-400">{endRentDate}</div>
              </div>

            </div>
          </div>
          <div className="  flex w-full justify-center items-center mt-5">
            <div className="flex gap-3">

              {ownerStatus === 'renting' && renteeStatus === 'received_item' ? (
                <div>
                  <Button text={'Proof of Returning'} className={'bg-readyToRent hover:bg-green-700 w-full mb-1'} />
                  <Button
                    text={'Comfirm Return Item'}
                    className={'bg-primaryButton hover:bg-hoverPrimaryButton w-full'}
                    event={() => handleReturned()}
                  />
                </div>
              ) : ownerStatus === 'renting' && renteeStatus === 'pending_received' ? (
                <Button
                  text={'Comfirm Received'}
                  className={'bg-primaryButton hover:bg-hoverPrimaryButton w-full'}
                  event={() => handleDelivery()}
                />
              ) : ownerStatus === 'renting' && renteeStatus === 'completed' ? (
                <Button
                  text={'Awaiting owner action'}
                  className={'bg-primaryButton hover:bg-hoverPrimaryButton w-full'}
                  disabled="disabled"
                />
              ) : ownerStatus === 'completed' && renteeStatus === 'completed' ? (
                <Button
                  text={'Completed'}
                  className={'bg-successButton hover:bg-hoverPrimaryButton w-full'}
                  disabled="disabled"
                />
              ) : ownerStatus === 'pending_delivery' && renteeStatus === 'pending_received' ? (
                <Button
                  text={'Awaiting delivery'}
                  className={'bg-primaryButton hover:bg-hoverPrimaryButton w-full'}
                  disabled="disabled"
                />
              ) : renteeStatus === 'awaiting_payment' ? (
                <Button text={'Make payment'} className={'bg-primaryButton hover:bg-hoverPrimaryButton w-full'} />
              ) : null}
              <Button text={'Send Message '} className={'bg-messageButton hover:bg-hoverMessageButton w-52'} />
              <div onClick={() => onOpenModal('itemDisputeModal')}>
                <Button icon1={true} text={'Item Dispute'} className={'bg-red-500 hover:bg-red-700 w-52'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


}
