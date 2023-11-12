import React, { useState } from 'react';
import axios from '../../config/axios';
import Button from '../../components/buttons/Button';
import InputField from '../../components/inputs/InputField'; // Assuming this is a textarea-like component

export default function OpenDisputePage() {
  const [message, setMessage] = useState('');

  const handleOpenDispute = async () => {
    try {
      // Logic to open a dispute
      const response = await axios.post('/path-to-open-dispute', { message });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center bg-primaryBackground w-full font-bold text-3xl h-[180px]">
        <h1>Open Dispute</h1>
      </div>
      <div className="px-[12rem] py-4">
        <InputField
          type="textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Please explain why you are opening this dispute"
          className="w-full h-40" // Adjust height as needed
        />
        <div className="flex justify-end space-x-4 mt-4">
          <Button
            event={() => {
              /* logic for cancel action */
            }}
            className="bg-primaryButton hover:bg-hoverPrimaryButton w-64"
            text="Cancel"
          />
          <Button
            event={handleOpenDispute}
            className="bg-primaryButton hover:bg-hoverPrimaryButton w-64"
            text="Open Dispute"
          />
        </div>
      </div>
    </>
  );
}

/*
              text={'Confirm Item Delivery'}
              className={'bg-primaryButton hover:bg-hoverPrimaryButton w-64'}
              event={handleDelivery}*/
