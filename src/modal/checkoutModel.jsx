import { useModal } from '../hooks/useModal';
import { FcGoogle } from 'react-icons/fc';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { BiLogoFacebook } from 'react-icons/bi';
import Logo from '../images/imgLogo.png';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { PaymentElement, LinkAuthenticationElement, useStripe, useElements } from '@stripe/react-stripe-js';
import InputField from '../components/inputs/InputField';
import { useAuth } from '../../src/hooks/useAuth';

import axios from '../config/axios';

import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export default function CheckoutModel() {
  const { onCloseModal, isOpenModal, modalType, onOpenModal } = useModal();
  const stripe = useStripe();
  const elements = useElements();

  const { authUser } = useAuth();
  // console.log(authUser);

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [tosChecked, setTosChecked] = useState(false);
  const [error, setError] = useState(null);

  //### Geting the single Item
  let { id } = useParams();
  const [item, setItem] = useState({ user: '' });
  const getSingleItem = () => {
    axios.get(`/item/get-single-item/${id}`).then((response) => {
      console.log('ourdata response', response.data);
      setItem(response.data);
    });
  };

  useEffect(() => {
    if (id) {
      getSingleItem();

      return () => {
        setItem(null);
      };
    }
  }, [id]);
  // axios.get(`/item/get-single-item/${id}`).then((response) => {
  //   console.log('ourdata response', response.data);
  //   setItem(response.data);
  // });

  const validateSubmit = () => {
    if (!tosChecked) {
      setError('Please accept the renting term');
      return false;
    }
    if (total < 1) {
      setError('Please select the dates');
      return false;
    }
    return true;
  };

  // #### Handling submit
  const handleRenteeSubmit = async (e) => {
    e.preventDefault();
    if (!validateSubmit()) return;
    const line_items = [
      {
        quantity: 1,
        price_data: {
          currency: 'thb',
          unit_amount: `${total * 100}`,
          product_data: {
            name: `${item.title}`,
            description: `${item.description}`,
            images: [`${item?.images[0]?.imageUrl}`]
          }
        }
      }
    ];

    const rental = {
      ownerId: item.ownerId,
      renteeId: authUser.id,
      itemId: item.id,
      startRentDate: selection.startDate,
      endRentDate: selection.endDate,
      status: 'awaiting_payment',
      amount: subtotal,
      deposit: deposit
    };

    const response = await axios.post('/create-checkout-session', {
      line_items,
      customer_email: authUser.email,
      rental: rental
    });

    const { sessionId } = response.data;

    console.log('response', response);
    console.log('sessionId', sessionId);
    const { error } = await stripe.redirectToCheckout({
      sessionId
    });
    if (error) {
      console.log(error);
    }
  };

  // ##### Calendar Zone #####
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });
  const [selectedDays, setSelectedDays] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [total, setTotal] = useState(0);

  const handleSelect = (ranges) => {
    setSelection(ranges.selection);
    const start = ranges.selection.startDate;
    const end = ranges.selection.endDate;
    const daysDifference = Math.floor((end - start) / (24 * 60 * 60 * 1000)) + 1;
    setSelectedDays(daysDifference);
    setSubtotal(daysDifference * item.price);
    setDeposit(daysDifference * item.price * 0.3);
    setTotal(daysDifference * item.price * 0.3 + daysDifference * item.price);
  };
  const hideOnEscape = (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };
  const refOne = useRef(null);
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };
  useEffect(() => {
    // event listeners
    document.addEventListener('keydown', hideOnEscape, true);
    document.addEventListener('click', hideOnClickOutside, true);
    return () => {
      document.removeEventListener('keydown', hideOnEscape, true);
      document.removeEventListener('click', hideOnClickOutside, true);
    };
  }, []);

  return (
    <>
      {isOpenModal && modalType === 'checkoutModal' && (
        <div className="fixed bottom-0 left-0 flex justify-center items-center h-full w-full backdrop-blur z-50">
          <div className="relative flex items-center justify-center h-[450px] w-[1200px] drop-shadow-2xl rounded-lg bg-white">
            <button
              onClick={onCloseModal}
              className=" text-white absolute top-2 right-2 bg-gray-300 border-2 hover:text-gray-500 hover:bg-white hover:border-gray-500 w-8 h-8 flex justify-center items-center rounded-full "
            >
              X
            </button>
            <div className="h-full w-[50%] p-10">
              <div className="text-[30px] font-semibold mb-1">{item.title}</div>
              <div className="flex gap-2 w-full h-full">
                <div className="flex-1 w-[50%] h-[80%] bg-red-500 rounded-lg overflow-hidden ">
                  <img src={item.images?.[0]?.imageUrl} />
                </div>
                <div className="flex flex-col w-[50%] justify-between h-[80%] ">
                  <div className="">
                    <div className="text-[20px] h-[15px]">Price</div>
                    <div className="flex items-end">
                      <div className="text-[50px] h-[60px]">฿{item.price}</div>
                      <div className="">/day</div>
                    </div>
                  </div>
                  <div className="flex flex-col ">
                    <div className="flex justify-between">
                      <div className="">Item number</div>
                      <div className="">{item.id}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="">Owner</div>
                      <div className="">{item.user}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col h-full w-[50%] justify-center items-center py-10 px-10">
              <form className="" onSubmit={handleRenteeSubmit}>
                <div className="flex w-full gap-7 mb-5">
                  <div className="w-full">
                    <div className="pb-1 font-semibold">Start date</div>
                    <div onClick={() => setOpen(true)} className="p-2 w-full rounded-lg border-2">
                      {selection.startDate.toDateString()}
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="pb-1 font-semibold">Return date</div>
                    <div onClick={() => setOpen(true)} className="p-2 w-full rounded-lg border-2">
                      {selection.endDate.toDateString()}
                    </div>
                  </div>
                </div>
                <div ref={refOne} className=" relative">
                  {open && (
                    <div className="z-50 absolute top-[-10px] rounded-lg overflow-hidden">
                      <DateRange
                        ranges={[selection]}
                        onChange={handleSelect}
                        minDate={new Date()} // Set the minimum date to today
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 mb-5 w-full">
                  <div className="flex w-full justify-between ">
                    <div className="">Total renting days</div>

                    <div className="">{selectedDays}</div>
                  </div>
                  <div className="flex w-full justify-between ">
                    <div className="">Sub total</div>
                    <div className="">฿{subtotal}</div>
                  </div>
                  <div className="flex w-full justify-between ">
                    <div className="">Deposit</div>
                    <div className="">฿{deposit}</div>
                  </div>
                  <div className="flex w-full justify-between ">
                    <div className="">Total</div>
                    <div className="">฿{total}</div>
                  </div>
                </div>
                <div className="flex">
                  <input
                    type="checkbox"
                    className=""
                    checked={tosChecked}
                    onChange={(e) => setTosChecked(e.target.checked)}
                  />
                  <div className="text-[13px] pl-1">Agree to Terms and Conditions of FIND read more</div>
                  <div className="text-[13px] pl-1 font-semibold text-blue-500">Here</div>
                </div>
                <button className="px-4 py-2 my-2 w-full bg-blue-500 border-2 border-blue-500 hover:border-blue-500 hover:bg-gray-100 hover:text-blue-500 text-white rounded-lg">
                  Confirm payment
                </button>
              </form>
              <div className="">{error && <div className="text-red-500">{error}</div>}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
