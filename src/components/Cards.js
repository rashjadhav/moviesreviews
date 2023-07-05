import { getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { moviesRef } from '../Firebase/firebase';
import { TailSpin, Audio } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

const Cards = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const _data = await getDocs(moviesRef);
            _data.forEach((doc) => {
                setData((prev) => [...prev, { ...(doc.data()), id: doc.id }]) // we will get data from firebase modies and applay foreach to get data from it
            })

            setLoading(false);
        }
        getData();
    }, [])

    return (
        <>
            <div className='flex flex-wrap  md:justify-start p-3 mt-2 md:w-full'>
                {loading ? <div className='w-full flex justify-center items-center h-96'>
                    <Audio height={40} color='white' /> </div> :
                    data.map((e, i) => {
                        return (
                            <Link to={`/detail/${e.id}`}><div key={i} className='card font-medium shadow-lg p-2 hover:-translate-y-4 cursor-pointer mt-6 transition-all duration-500'>
                                <img className='md:h-72 md:w-64 w-48 h-60' src={e.image} />
                                <h1>{e.title}</h1>
                                <h1 className='flex items-center'><span className='text-gray-500'>Rating:</span>
                                    <ReactStars
                                        size={20}
                                        half={true}
                                        value={e.rating / e.rated}
                                        edit={false} />
                                </h1>
                                <h1><span className='text-gray-500'>Year:</span>{e.year}</h1>
                            </div></Link>
                        );
                    })
                }


            </div>
        </>
    )
}

export default Cards
