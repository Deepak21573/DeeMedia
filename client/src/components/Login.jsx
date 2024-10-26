// import React, { useEffect, useState } from 'react'
// import { Input } from './ui/input'
// import { Button } from './ui/button'
// import axios from 'axios';
// import { toast } from 'sonner';
// import { Link, useNavigate } from 'react-router-dom';
// import { Loader2 } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setAuthUser } from '@/redux/authSlice';

// const Login = () => {
//     const [input, setInput] = useState({
//         email: "",
//         password: ""
//     });
//     const [loading, setLoading] = useState(false);
//     const {user} = useSelector(store=>store.auth);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const changeEventHandler = (e) => {
//         setInput({ ...input, [e.target.name]: e.target.value });
//     }

//     const signupHandler = async (e) => {
//         e.preventDefault();
//         try {
//             setLoading(true);
//             const res = await axios.post('http://localhost:3000/login', input, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 withCredentials: true
//             });
//             if (res.data.success) {
//                 dispatch(setAuthUser(res.data.user));
//                 navigate("/");
//                 toast.success(res.data.message);
//                 setInput({
//                     email: "",
//                     password: ""
//                 });
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.message);
//         } finally {
//             setLoading(false);
//         }
//     }

//     useEffect(()=>{
//         if(user){
//             navigate("/");
//         }
//     },[])
//     return (
//         <div className='flex items-center w-screen h-screen justify-center'>
//             <form onSubmit={signupHandler} className='shadow-lg flex flex-col gap-5 p-8'>
//                 <div className='my-4'>
//                     <h1 className='text-center font-bold text-xl'>LOGO</h1>
//                     <p className='text-sm text-center'>Login to see photos & videos from your friends</p>
//                 </div>
//                 <div>
//                     <span className='font-medium'>Email</span>
//                     <Input
//                         type="email"
//                         name="email"
//                         value={input.email}
//                         onChange={changeEventHandler}
//                         className="focus-visible:ring-transparent my-2"
//                     />
//                 </div>
//                 <div>
//                     <span className='font-medium'>Password</span>
//                     <Input
//                         type="password"
//                         name="password"
//                         value={input.password}
//                         onChange={changeEventHandler}
//                         className="focus-visible:ring-transparent my-2"
//                     />
//                 </div>
//                 {
//                     loading ? (
//                         <Button>
//                             <Loader2 className='mr-2 h-4 w-4 animate-spin' />
//                             Please wait
//                         </Button>
//                     ) : (
//                         <Button type='submit'>Login</Button>
//                     )
//                 }

//                 <span className='text-center'>Dosent have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
//             </form>
//         </div>
//     )
// }

// export default Login

import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:3000/api/v1/user/login', input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
                setInput({ email: "", password: "" });
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred during login.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className='flex items-center w-screen h-screen justify-center bg-gradient-to-br from-blue-500 to-purple-600'>
            <form 
                onSubmit={signupHandler} 
                className='shadow-2xl rounded-lg flex flex-col gap-6 p-10 bg-white bg-opacity-90 w-full max-w-md'>
                <div className='mb-6'>
                    <h1 className='text-center font-extrabold text-2xl text-purple-800 tracking-wide'>DeeMedia</h1>
                    <p className='text-sm text-center text-gray-600'>Login to see photos & videos from your friends</p>
                </div>
                <div className='flex flex-col'>
                    <label className='font-semibold text-purple-800'>Email</label>
                    <Input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        className="focus:ring-2 focus:ring-purple-400 focus:border-transparent my-2 rounded-md px-4 py-2 border-2 border-purple-200 transition duration-300"
                        placeholder="you@example.com"
                        required
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='font-semibold text-purple-800'>Password</label>
                    <Input
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={changeEventHandler}
                        className="focus:ring-2 focus:ring-purple-400 focus:border-transparent my-2 rounded-md px-4 py-2 border-2 border-purple-200 transition duration-300"
                        placeholder="••••••••"
                        required
                    />
                </div>
                {loading ? (
                    <Button disabled className='bg-purple-400 text-white rounded-md px-4 py-2 flex justify-center items-center gap-2'>
                        <Loader2 className='h-5 w-5 animate-spin' />
                        Please wait
                    </Button>
                ) : (
                    <Button type='submit' className='bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-md px-4 py-2 transition duration-300 hover:shadow-lg hover:scale-105'>
                        Login
                    </Button>
                )}
                <span className='text-center text-gray-700 mt-4'>
                    Don't have an account? <Link to="/signup" className='text-purple-600 font-semibold hover:underline'>Signup</Link>
                </span>
            </form>
        </div>
    );
};

export default Login;
