import React, { useState } from 'react'
import logo from '../../assets/logo.jpg'
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const handleClick = () => {
        setOpen(!open);
    }

    const handleManageProfile = () => {
        setOpen(!open);
        navigate('/my-profile');
    }

  return (
    <div className='flex justify-between py-[12px] px-10 border-b-2 bg-gray-100 w-full items-center'>
        <img src={logo} alt="" className=' h-[60px] '/>
        <div className='flex items-center gap-4  cursor-pointer' onClick={handleClick}>
            <p className='font-bold text-[16px]'>Admin</p>
            <CgProfile className='text-2xl'/>
        </div>
        {open && (
            <div className='absolute top-[70px] right-0 w-[180px] p-4 border-b-2 mr-4 bg-gray-200 rounded-lg'>
                <button className='font-bold text-[16px]' onClick={handleManageProfile}>Manage Profile</button>
            </div>
        )}
    </div>
  )
}

export default Header