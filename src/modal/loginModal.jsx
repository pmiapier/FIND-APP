import { useModal } from "../hooks/useModal";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import Logo from "../images/imgLogo.png";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Joi from "joi";


const loginSchema = Joi.object({
    email: Joi.string().trim().required().messages({
        "string.empty": "Email is required",
        "string.email": "Incorrect email.",
    }),
    password: Joi.string()
        .trim()
        .required()
        .pattern(/^[a-zA-Z0-9]{6,20}$/)
        .min(6).max(20)
        .messages({
            "string.empty": "Password is required",
            "string.pattern.base":"Incorrect password."
        }),
});

const validateLogin = (input) => {
    const { error } = loginSchema.validate(input, { abortEarly: false });
    if (error) {
        const result = error.details.reduce((acc, el) => {
            const { message, path } = el;
            acc[path[0]] = message;
            return acc;
        }, {});
        return result;
    }
};

export default function LoginModal() {
    const { onCloseModal, isOpenModal, modalType, onOpenModal } = useModal();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const [error, setError] = useState({});
    const [input, setInput] = useState({
        email: "",
        password: "",
    });
    const handleInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const { login } = useAuth();
    const submitLogin = (e) => {
        e.preventDefault();

        const validationError = validateLogin(input);
        if (validationError) {
            return setError(validationError);
        }

        login(input)
            .then((x) => {
                if (x === `user not found`) {
                    setError({email:`user not found`})
                } else if (x === `wrong password`) {
                    setError({password:`wrong password`})
                } else if (x === `success`) onCloseModal();
            })
            .catch((err) => {
                console.warn(err);
            });
    };

    return (
        <>
            {isOpenModal && modalType === "loginModal" && (
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
                                    <div className="text-[40px]  font-bold">Login</div>
                                    <div className="flex gap-1 ">
                                        <div className="">Become a member? </div>
                                        <div className="text-blue-500 font-bold hover:cursor-pointer" onClick={() => onOpenModal("registerModal")}>
                                            Register
                                        </div>
                                    </div>
                                </div>
                    
                                <div className="mt-[80px] w-[50%] relative flex place-items-center bg-gray-300">
                                
                                </div>
                                <form className="w-[90%]" onSubmit={submitLogin}>
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input
                                            type="email"
                                            onChange={handleInput}
                                            name="email"
                                            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=" "
                                        />
                                        <label className="peer-focus:font-medium absolute -z-10 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3  origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                            Email address
                                        </label>
                                        <div>{error.email && <p className="text-red-500">{error.email}</p>}</div>
                                    </div>
                                    <div className="relative w-full flex items-center mb-1 group">
                                        <input
                                            type={passwordVisible ? "text" : "password"}
                                            onChange={handleInput}
                                            name="password"
                                            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=" "
                                        />
                                        <label className=" peer-focus:font-medium absolute -z-20 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3  origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                            Password
                                        </label>
                                        <div className="static">
                                            <div onClick={togglePasswordVisibility} className="absolute bottom-2  right-2 text-gray-600 hover:text-gray-800">
                                                {passwordVisible ? (
                                                    <div className="hover:cursor-pointer">
                                                        <BsEyeFill />
                                                    </div>
                                                ) : (
                                                    <div className="hover:cursor-pointer">
                                                        <BsEyeSlashFill />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                        <div>{error.password && <p className="text-red-500">{error.password}</p>}</div>
                                    <div className="flex justify-end text-gray-500 hover:cursor-pointer">Foget Password?</div>
                                    <button className="px-4 py-2 my-2 w-[30%] bg-blue-500 border-2 border-blue-500 hover:border-blue-500 hover:bg-gray-100 hover:text-blue-500 text-white rounded-lg text-[20px]">
                                        Login
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
