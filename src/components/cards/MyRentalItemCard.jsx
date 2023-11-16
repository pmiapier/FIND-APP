import Button from '../buttons/Button';
import ItemStatus from '../status/ItemStatus';
import axios from '../../config/axios';
import { useState, useEffect } from 'react';
import { formatDate } from '../../utils/dates';
import { Link } from 'react-router-dom';
import { useModal } from '../../hooks/useModal';

export default function MyRentalItemCard({ data }) {
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

  const handleDelivery = async () => {
    try {
      const res = await axios.post(`/rent/changeOwnerStatus`, { rentId: data.id, status: 'renting' }).then(() => {
        setStatus('renting');
        setOwnerStatus('renting');
      });

      if (!res) {
        console.log('error from handleDelivery');
      }

      // await axios.post(`/transaction/createTransaction`, { rentId: data.id })
    } catch (error) {
      console.log(error);
    }
  };

  const handleReturned = async () => {
    try {
      const res = await axios.post(`/rent/changeOwnerStatus`, { rentId: data.id, status: 'completed' }).then(() => {
        setStatus('renting');
        setOwnerStatus('completed');
      });

      if (!res) {
        console.log('error from handleDelivery');
      }
      await axios.post(`/transaction/createTransaction`, { rentId: data.id });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[700px] h-[300px]">
      <div className="w-full h-[20px]">
        {startRentDate <= dateNow ? (
          <div className="bg-green-600 rounded-t-xl w-full h-full text-white px-10 py-5 flex justify-center items-center ">
            <div className="flex">
              Must Return the item in <div className="mx-1 font-bold"> {diffDate} </div> days
            </div>
          </div>
        ) : (
          <div className="bg-readyToRent rounded-t-xl w-full h-full text-white px-10 py-5 flex flex-col justify-center items-center ">
            <div className="flex">
              Rental starts in <div className="mx-1 font-bold">{daysUntilStart} </div> days
            </div>
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
                <div className=" text-[20px] font-bold">{data.item.title}</div>
                <div>#orderNo :</div>
                <div className="flex gap-2">
                  <div>Item ID :</div>
                  <div>{data.item.id}</div>
                </div>
                <div>Rental Status :</div>
                <ItemStatus text={status} />
                <div className="flex gap-2">
                  <div>Item Owner :</div>
                  <div>{data.owner.firstName + ' ' + data.owner.lastName}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="  flex w-full justify-center items-center mt-5">
            <div className="flex gap-3">
              {ownerStatus === 'pending_delivery' && renteeStatus !== 'awaiting_payment' ? (
                <Button
                  text={'Confirm Item Delivery'}
                  className={'bg-primaryButton hover:bg-hoverPrimaryButton w-52'}
                  event={handleDelivery}
                />
              ) : ownerStatus === 'renting' && renteeStatus === 'completed' ? (
                <Button
                  text={'Confirm Item Returned'}
                  className={'bg-primaryButton hover:bg-hoverPrimaryButton w-52'}
                  event={handleReturned}
                />
              ) : ownerStatus === 'completed' && renteeStatus === 'completed' ? (
                <Button
                  text={'Rental Completed'}
                  disabled="disabled"
                  className={'bg-successButton hover:bg-hoverPrimaryButton w-52'}
                />
              ) : ownerStatus === 'completed' && renteeStatus === 'received_item' ? (
                <Button
                  text={'Awaiting rentee action'}
                  disabled="disabled"
                  className={'bg-primaryButton hover:bg-hoverPrimaryButton w-52'}
                />
              ) : renteeStatus === 'pending_received' && ownerStatus === 'renting' ? (
                <Button
                  text={'Awaiting rentee action'}
                  disabled="disabled"
                  className={'bg-primaryButton rounded-lg px-3 py-2 text-base  hover:bg-hoverPrimaryButton w-52'}
                />
              ) : renteeStatus === 'awaiting_payment' ? (
                <Button
                  text={'Awaiting user payment'}
                  disabled="disabled"
                  className={'bg-primaryButton hover:bg-hoverPrimaryButton w-52'}
                />
              ) : renteeStatus === 'received_item' && ownerStatus === 'renting' ? (
                // TODO: This probably should have a check to see if we're in between the rental dates.
                // Otherwise we can have a dispute button
                <Button
                  text={'Item rented'}
                  disabled="disabled"
                  className={'bg-primaryButton hover:bg-hoverPrimaryButton w-52'}
                />
              ) : renteeStatus === 'awaiting_payment ' ? (
                <Button
                  text={'Awaiting user payment'}
                  disabled="disabled"
                  className={'bg-primaryButton hover:bg-hoverPrimaryButton w-52'}
                />
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
{
  /* <div className="bg-white flex justify-center items-center gap-5 py-5 "> */
}
{
  /* <div className="w-60 h-40 o rounded-lg">
        {pic ? <img className="rounded-sm" src={pic} alt="item" /> : null} */
}
{
  /* </div> */
}
{
  /* </div> */
}
