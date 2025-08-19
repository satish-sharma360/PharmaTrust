import React from 'react'
import FeedbackTable from './FeedbackTable';
import SideBar from '../../components/SideBar';

const FeedbackManagement = () => {
  return (
    <div className='flex'>
        <SideBar />
        <div className='flex-1'>
            <div className='bg-paleblue justify-between flex px-10 py-10'>
            <h1 className='text-4xl font-bold text-blue'>Feedback Management Dashboard</h1>
            <div className='flex gap-6'>
                <div className='flex gap-2 cursor-pointer'>
                <img className='w-12 h-12 border-2 border-white rounded-full' src="https://avatars.githubusercontent.com/u/135573281?s=400&u=b5f0d9838a0b5191e9b7f8e32eaaa69b5974847b&v=4" alt="profile" />
                <div className="flex w-full flex-col gap-0.5">
                <div className="flex items-center justify-between font-bold">
                    <h1>Rahul Dadwal</h1>
                </div>
                <p className='text-xs '>Promotion Manager</p>
                </div>
                </div>
            </div>
            </div>
            <FeedbackTable />
        </div>
    </div>
  )
}


export default FeedbackManagement
