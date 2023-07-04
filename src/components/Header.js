import React, { useContext } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Appstate } from '../App';


const Header = () => {

    const useAppstate = useContext(Appstate);

    return (
        <div>
            <div className='sticky z-10 header top-0 text-3xl text-red-500 flex justify-between items-center font-bold p-3 border-b-2 border-gray'>
                <span>Movies<span className='text-white'>Reviews</span></span>

                {useAppstate.login ?
                    <Link to={'/addmovie'}><h1 className='text-lg cursor-pointer flex items-center'>
                        <Button><AddIcon className='mr-1' color='secondary' /> <span className='text-white'>Add New</span></Button></h1>
                    </Link>
                    :
                    <Link to={'/login'}><h1 className='text-lg bg-green-500 cursor-pointer flex items-center'>
                        <Button><span className='text-white'>Login</span></Button></h1>
                    </Link>
                }
            </div>
        </div >
    )
}

export default Header
