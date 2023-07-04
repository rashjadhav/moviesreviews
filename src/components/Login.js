import React, { useContext, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom';
import { query, where, getDocs } from 'firebase/firestore';
import { usersRef } from '../Firebase/firebase';
import bcrypt from 'bcryptjs';
import { Appstate } from '../App';
import swal from 'sweetalert';

const Login = () => {
    const navigate = useNavigate();
    const useAppstate = useContext(Appstate);
    const [form, setForm] = useState({
        mobile: "",
        password: ""

    });

    const [loading, setLoading] = useState(false);

    const login = async () => {
        setLoading(true);
        try {
            const quer = query(usersRef, where('mobile', '==', form.mobile))
            const Snapshot = await getDocs(quer);

            Snapshot.forEach((doc) => {
                const _data = doc.data();
                const isUser = bcrypt.compareSync(form.password, _data.password);
                if (isUser) {
                    useAppstate.setLogin(true);
                    useAppstate.setuserName(_data.name);

                    swal({
                        title: "Loged In",
                        icon: "success",
                        buttons: false,
                        timer: 3000
                    })
                    navigate('/')
                }
                else {
                    swal({
                        title: "Invalid Credentials",
                        icon: "error",
                        buttons: false,
                        timer: 3000
                    })
                }
            });

        } catch (error) {
            swal({
                title: error.message,
                icon: "error",
                buttons: false,
                timer: 3000
            })
        }
        setLoading(false);
    }

    return (
        <div className='w-full flex mt-8 flex-col items-center'>
            <h1 className='text-xl font-bold'>Login</h1>

            <div className="p-2 md:w-1/3 w-full items-center">
                <div className="relative">
                    <label for="email" className="leading-7 text-sm text-gray-300">Mobile No</label>
                    <input type="number" id="email" name="email" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
            </div>

            <div className="p-2  md:w-1/3 w-full item-center">
                <div className="relative">
                    <label for="email" className="leading-7 text-sm text-gray-300">Password</label>
                    <input type="password" id="email" name="email" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
            </div>

            <div className="p-2 w-full">
                <button onClick={login} className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">{loading ? <TailSpin height={25} color='white' /> : 'Login'}</button>
            </div>

            <div>
                <p>
                    Do not have account ? <Link to={'/signup'}><span className='text-blue-500'>Sign Up</span ></Link>
                </p>
            </div>
        </div >
    )
}

export default Login
