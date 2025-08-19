import { BrowserRouter as Router } from 'react-router-dom';
import SideBar from '../components/SideBar';

const AdminDashboard = () => {
    return (
        <div className='flex'>
            <SideBar />
            <div className='flex flex-col justify-center items-center w-full'>
                <h1 className='text-5xl font-bold text-dark-blue'>Welcome to Admin Dashboard</h1>
            </div>
        </div>
    )
}
export default AdminDashboard