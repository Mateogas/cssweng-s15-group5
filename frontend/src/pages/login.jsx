import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const original = document.body.style.backgroundColor;
        document.body.style.backgroundColor = "var(--color-primary)";
        return () => {
            document.body.style.backgroundColor = original;
        };
    }, []);


    const handleLogin = () => {
        const users = [
            { email: "admin@email.com", password: "123" },
            { email: "sdw@email.com", password: "123" },
            { email: "super@email.com", password: "123" },
        ];

        const foundUser = users.find(
            (user) => user.email === email && user.password === password
        );

        if (foundUser) {
            setErrorMessage('');
            console.log('Login successful:', foundUser);
            navigate('/home-sdw');
        } else {
            setErrorMessage('Email and password do not match.');
        }
    };

    return (
        <>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white
                      max-w-[75rem] w-full max-h-[45rem] h-full rounded-lg drop-shadow-card flex
                      flex-col justify-around items-center pb-10 gap-5">

                <div className="main-logo main-logo-text-nav flex items-center">
                    <div className="main-logo-setup folder-logo !w-[8rem] !h-[12rem]"></div>
                    <h1 className="text-[6.5rem]">
                        SCSR
                    </h1>
                </div>

                <div className="flex flex-col justify-between items-center gap-12 max-w-[40rem] w-full">
                    <input
                        type="text"
                        className="text-input font-label w-full"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        className="text-input font-label w-full"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="flex justify-between w-full">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-5 h-5"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                            />

                            <label htmlFor="remember" className="font-label">Remember me</label>
                        </div>

                        <p className="font-label !text-blue-500 cursor-pointer">
                            Forgot Password?
                        </p>
                    </div>
                </div>

                {errorMessage && (
                    <p className="font-label !text-red-500">
                        {errorMessage}
                    </p>
                )}


                <button
                    onClick={handleLogin}
                    className="btn-primary font-bold-label drop-shadow-base !text-[2.5rem] !py-5 !px-30 m-4"
                >
                    Login
                </button>

            </div>
        </>
    );
}
