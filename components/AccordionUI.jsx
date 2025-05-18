'use client'
import { useState } from 'react'
import AllUsers from './AllUsers'
import SpecificUser from './SpecificUser'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'
import DeleteUser from './DeleteUser'

const AccordionUI = () => {
    const [open, setOpen] = useState('1')

    const handleOpen = (value) => setOpen(open === value ? '0' : value);

    return (
        <section className='w-[40rem]'>
            <div className="flex flex-col gap-4" >
                <div className="flex justify-center border p-4'">
                    <button onClick={() => handleOpen('1')}>All Users</button>
                </div>
                <div hidden={open !== '1'}>
                    <AllUsers />

                </div>
            </div>
            <div className="flex flex-col gap-4  mt-6" >
                <div className="flex justify-center border p-4'">
                    <button onClick={() => handleOpen('2')}>Specific User</button>
                </div>
                <div hidden={open !== '2'}>
                    <SpecificUser />
                </div>
            </div>
            <div className="flex flex-col gap-4  mt-6" >
                <div className="flex justify-center border p-4'">
                    <button onClick={() => handleOpen('3')}>Create User</button>
                </div>
                <div hidden={open !== '3'}>
                    <CreateUser />
                </div>
            </div>
            <div className="flex flex-col gap-4  mt-6" >
                <div className="flex justify-center border p-4'">
                    <button onClick={() => handleOpen('4')}>Update User</button>
                </div>
                <div hidden={open !== '4'}>
                    <UpdateUser />
                </div>
            </div>
            <div className="flex flex-col gap-4  mt-6" >
                <div className="flex justify-center border p-4'">
                    <button onClick={() => handleOpen('5')}>Delete User</button>
                </div>
                <div hidden={open !== '5'}>
                    <DeleteUser />
                </div>
            </div>
        </section>
    )
}

export default AccordionUI