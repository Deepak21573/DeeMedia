// import React, { useEffect, useState } from 'react'
// import { Input } from './ui/input'
// import { Button } from './ui/button'
// import axios from 'axios';
// import { toast } from 'sonner';
// import { Link, useNavigate } from 'react-router-dom';
// import { Loader2 } from 'lucide-react';
// import { useSelector } from 'react-redux';

// const Signup = () => {
//     const [input, setInput] = useState({
//         username: "",
//         email: "",
//         password: ""
//     });
//     const [loading, setLoading] = useState(false);
//     const {user} = useSelector(store=>store.auth);
//     const navigate = useNavigate();

//     const changeEventHandler = (e) => {
//         setInput({ ...input, [e.target.name]: e.target.value });
//     }

//     const signupHandler = async (e) => {
//         e.preventDefault();
//         try {
//             setLoading(true);
//             const res = await axios.post('https://instaclone-g9h5.onrender.com/api/v1/user/register', input, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 withCredentials: true
//             });
//             if (res.data.success) {
//                 navigate("/login");
//                 toast.success(res.data.message);
//                 setInput({
//                     username: "",
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
//                     <p className='text-sm text-center'>Signup to see photos & videos from your friends</p>
//                 </div>
//                 <div>
//                     <span className='font-medium'>Username</span>
//                     <Input
//                         type="text"
//                         name="username"
//                         value={input.username}
//                         onChange={changeEventHandler}
//                         className="focus-visible:ring-transparent my-2"
//                     />
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
//                         <Button type='submit'>Signup</Button>
//                     )
//                 }
//                 <span className='text-center'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
//             </form>
//         </div>
//     )
// }

// export default Signup


import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';

const Signup = () => {
    const [input, setInput] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const signupHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:3000/api/v1/user/register', input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                setInput({ username: "", email: "", password: "" });
                navigate("/login");
            } else {
                toast.error("Signup failed, please try again.");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) navigate("/");
    }, [user, navigate]);

    return (
        <div className='flex items-center w-screen h-screen justify-center bg-gradient-to-br from-blue-500 to-purple-600'>
            <form 
                onSubmit={signupHandler} 
                className='shadow-2xl rounded-lg flex flex-col gap-5 p-10 bg-white bg-opacity-90 w-full max-w-md'>
                <div className='my-4'>
                    <h1 className='text-center font-extrabold text-2xl text-purple-800 tracking-wide'>DeeMedia</h1>
                    <p className='text-sm text-center text-gray-600'>Signup to see photos & videos from your friends</p>
                </div>
                <div className='flex flex-col'>
                    <label className='font-semibold text-purple-800'>Username</label>
                    <Input
                        type="text"
                        name="username"
                        value={input.username}
                        onChange={changeEventHandler}
                        className="focus:ring-2 focus:ring-purple-400 focus:border-transparent my-2 rounded-md px-4 py-2 border-2 border-purple-200 transition duration-300"
                        required
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='font-semibold text-purple-800'>Email</label>
                    <Input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        className="focus:ring-2 focus:ring-purple-400 focus:border-transparent my-2 rounded-md px-4 py-2 border-2 border-purple-200 transition duration-300"
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
                        required
                    />
                </div>
                {loading ? (
                    <Button disabled className='bg-purple-400 text-white rounded-md px-4 py-2 flex justify-center items-center gap-2'>
                        <Loader2 className='h-5 w-5 animate-spin' />
                        Please wait...
                    </Button>
                ) : (
                    <Button type='submit' className='bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-md px-4 py-2 transition duration-300 hover:shadow-lg hover:scale-105'>
                        Signup
                    </Button>
                )}
                <span className='text-center text-gray-700 mt-4'>
                    Already have an account? <Link to="/login" className='text-purple-600 font-semibold hover:underline'>Login</Link>
                </span>
            </form>
        </div>
    );
};

export default Signup;

