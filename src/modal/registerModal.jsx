import { useState } from 'react';
import Joi from 'joi';
import { useModal } from '../hooks/useModal';
import InputFromUser from '../components/inputs/inputFromUser';
import { useAuth } from '../hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';
import { BiLogoFacebook } from 'react-icons/bi';
import Logo from '../images/imgRegister.png';
import axios from 'axios';
import { getAccessToken, removeAccessToken, addAccessToken } from '../utils/local-storage';

const registerSchema = Joi.object({
  firstName: Joi.string().trim().required().messages({
    'string.empty': 'Firstname is required'
  }),
  lastName: Joi.string().trim().required().messages({
    'string.empty': 'LastName is required'
  }),
  email: Joi.string().trim().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'The email address you entered is not in a valid format. Please enter a valid email address.'
  }),
  phoneNumber: Joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      'string.empty': 'Phone Number is required',
      'string.pattern.base': 'Please enter a valid phone number and must contain 10 digits.'
    }),
  password: Joi.string()
    .trim()
    .required()
    .pattern(/^[a-zA-Z0-9]{6,20}$/)
    .min(6)
    .max(20)
    .messages({
      'string.empty': 'Password is required',
      'string.max': 'Password only contains maximum of 20 charactors.',
      'string.min': 'Password must be at least 6 charactors.',
      'string.pattern.base': 'Password must at least contains 1 alphabet a-z and 0-9.'
    }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).trim().required().messages({
    'string.empty': 'Password is required',
    'any.only': 'Confirm password must match the password'
  })
});

const validateRegister = (input) => {
  const { error } = registerSchema.validate(input, { abortEarly: false });
  console.dir(error);
  if (error) {
    const result = error.details.reduce((acc, el) => {
      const { message, path } = el;
      acc[path[0]] = message;
      return acc;
    }, {});
    return result;
  }
};

export default function RegisterModal() {
  const { onCloseModal, isOpenModal, modalType, onOpenModal } = useModal();
  const { register } = useAuth();

  const [error, setError] = useState({});
  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  // console.log(error);

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    setError({});
    const validationError = validateRegister(input);
    // console.log(validationError)
    if (validationError) {
      return setError(validationError);
    }
    register(input)
      .then((x) => {
        if (x === `duplicateEmail`) {
          setError({ email: `duplicate email.` });
        } else if (x === `duplicatePhone`) {
          setError({ phoneNumber: `This phone numebr has already chicken.` });
        } else if (x === `success`) onCloseModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {isOpenModal && modalType === 'registerModal' && (
        <div className="fixed bottom-0 left-0 flex justify-center items-center h-full w-full backdrop-blur z-50">
          <div className="relative flex flex-col items-center justify-center h-[800px] w-[1400px] drop-shadow-2xl  bg-white">
            <button
              onClick={onCloseModal}
              className=" text-white absolute top-4 right-4 bg-gray-300 border-2 hover:text-gray-500 hover:bg-white hover:border-gray-500 w-8 h-8 flex justify-center items-center rounded-full "
            >
              X
            </button>
            <div className="flex w-full h-full">
              <img src={Logo} className="w-[50%]" />
              <div className="flex flex-col items-center w-[50%] h-full p-10 pt-[80px]">
                <div className="flex flex-col justify-start w-full">
                  <div className="text-[40px]  font-bold">สมัครสมาชิก</div>
                  <div className="flex gap-1 ">
                    <div className="">เป็นสมาชิกอยู่แล้ว?</div>
                    <div className="text-blue-600 font-bold hover:cursor-pointer">เข้าสู่ระบบ</div>
                  </div>
                </div>
                <div className="mt-[100px] mb-[20px] w-[50%] relative flex   h-px place-items-center bg-gray-300">
                  <div className="absolute left-1/2 h-5 -translate-x-1/2 bg-white px-4 text-center text-sm text-gray-500">
                    หรือ
                  </div>
                </div>

                <form className="w-[90%]" onSubmit={handleSubmitForm}>
                  <div className="flex gap-7">
                    <div className="relative z-0 w-full mb-6 flex-1 group">
                      <InputFromUser
                        className={
                          'block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        }
                        placeholder="Firstname"
                        type="text"
                        onChange={handleChangeInput}
                        name="firstName"
                        value={input.firstName}
                        hasError={error.firstName}
                      />
                    </div>
                    <div className="relative z-0 w-full mb-6 flex-1 group">
                      <InputFromUser
                        className={
                          'block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        }
                        placeholder="Lastname"
                        type="text"
                        onChange={handleChangeInput}
                        name="lastName"
                        value={input.lastName}
                        hasError={error.lastName}
                      />
                    </div>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <InputFromUser
                      className={
                        'block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                      }
                      placeholder="Email"
                      type="emial"
                      onChange={handleChangeInput}
                      name="email"
                      value={input.email}
                      hasError={error.email}
                    />
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <InputFromUser
                      className={
                        'block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                      }
                      placeholder="Phone number"
                      type="number"
                      onChange={handleChangeInput}
                      name="phoneNumber"
                      value={input.phoneNumber}
                      hasError={error.phoneNumber}
                    />
                  </div>
                  <div className="relative w-full flex mb-6 items-center group">
                    <InputFromUser
                      className={
                        'block py-2.5 px-0 w-[560px] text-sm text-black bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                      }
                      placeholder="Password"
                      type="password"
                      onChange={handleChangeInput}
                      name="password"
                      value={input.password}
                      hasError={error.password}
                    />
                  </div>
                  <div className="relative w-full flex mb-6 items-center group">
                    <InputFromUser
                      className={
                        'block py-2.5 px-0 w-[560px] text-sm text-black bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                      }
                      placeholder="Confirm Password"
                      type="password"
                      onChange={handleChangeInput}
                      name="confirmPassword"
                      value={input.confirmPassword}
                      hasError={error.confirmPassword}
                    />
                  </div>
                  <input
                    type="submit"
                    value={`Register`}
                    className="px-4 py-2 my-2 w-[30%] cursor-pointer bg-blue-500 border-2 border-blue-500 hover:border-blue-500 hover:bg-gray-100 hover:text-blue-500 text-white rounded-lg text-[20px]"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
