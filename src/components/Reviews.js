import React, { useContext, useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { reviewsRef, db } from '../Firebase/firebase';
import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { TailSpin } from 'react-loader-spinner';
import swal from 'sweetalert';
import { Appstate } from '../App';
import { useNavigate } from 'react-router-dom';




const Reviews = ({ id, prevRating, userRated }) => {
    const useAppstate = useContext(Appstate);
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [reviewsloading, setReviewsLoading] = useState(false);
    const [form, setForm] = useState("");
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [newAdded, setnewAdded] = useState(0);



    const sendReview = async () => {
        setLoading(true);
        try {
            if (useAppstate.login) {
                await addDoc(reviewsRef, {
                    movieid: id,
                    name: useAppstate.userName,
                    rating: rating,
                    thought: form,
                    timestamp: new Date().getTime()
                })

                const ref = doc(db, "movies", id);
                await updateDoc(ref, {
                    rating: prevRating + rating,
                    rated: userRated + 1

                })

                setRating(0); //after submission of form the placeholders will become blanck
                setForm(""); //after submission of form the placeholders will become blanck
                setnewAdded(newAdded + 1); // when we add review it will be added automatically in downside no need to refresh bez of this. code.
                swal({
                    title: "Review Sent",
                    icon: "success",
                    buttons: false,
                    timer: 3000
                })
            }
            else {
                navigate('/login');
            }
        }
        catch (error) {
            swal({
                title: error.message,
                icon: "error",
                buttons: false,
                timer: 3000
            })
        }
        setLoading(false);
    }

    useEffect(() => {
        async function getData() {
            setReviewsLoading(true);
            setData([]);//here we are giving blanck bez when we added new review it loads previous and new review so we are getting repeated reviews thats why blank is given to avoid repeatation
            let quer = query(reviewsRef, where('movieid', '==', id))
            const querysnapshot = await getDocs(quer);

            querysnapshot.forEach((doc) => {
                setData((prev) => [...prev, doc.data()])
            })
            setReviewsLoading(false);
        }
        getData();
    }, [newAdded])

    return (
        <div className='mt-4 border-t-2 border-gray-700 w-full'>
            <ReactStars
                size={30}
                half={true}
                value={rating}
                onChange={(rate) => setRating(rate)}
            />

            <input value={form} onChange={(e) => setForm(e.target.value)} placeholder='Share Your Thoughts...' className='w-full p-2 outline-none header' />
            <button onClick={sendReview} className='bg-green-600 flex justify-center w-full p-2' >{loading ? <TailSpin height={20} color='white' /> : 'Share'}</button>

            {reviewsloading ? <div className='mt-6 flex justify-center'><TailSpin height={10} color='white' /></div> :
                <div className='mt-4'>
                    {
                        data.map((e, i) => {
                            return (
                                <div className='p-2 w-full bg-gray-600 bg-opacity-50 border-b border-gray-600 mt-2' key={i}>
                                    <div className='flex items-center'>
                                        <p className='text-blue-500'>{e.name}</p>
                                        <p className='ml-3 text-xs'>({new Date(e.timestamp).toLocaleString()})</p>
                                    </div>
                                    <ReactStars
                                        size={15}
                                        half={true}
                                        value={e.rating}
                                        edit={false}
                                    />
                                    <p>{e.thought}</p>
                                </div>
                            )
                        })
                    }
                </div>}
        </div>
    )
}

export default Reviews
