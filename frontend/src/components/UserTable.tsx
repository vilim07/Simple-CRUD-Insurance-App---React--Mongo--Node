import { User } from "../types/User.type"
import UserRow from "./UserRow"
import Modal from "./Modal"
import UserForm from "./UserForm"
import Button from "./Button"
import { useState } from "react"

const UserList = ({ users }: { users: Array<User> }) => {

    const [open, setOpen] = useState<boolean>(false);
    

    return (
        <>
            <div className="w-full">
                <div className="flex font-bold mb-4 pb-3 border-b">
                    <div className="w-[22%] flex items-center pl-2">Name and Lastname</div>
                    <div className="w-[22%] flex items-center pl-2">Email</div>
                    <div className="w-[22%] flex items-center pl-2">City</div>
                    <div className="w-[18%] flex items-center pl-2">Birthdate</div>
                    <div className="w-[16%] flex justify-end items-center">
                        <Button click={()=>{setOpen(prev => (!prev))}}>+ Add New User</Button>
                    </div>
                </div>
                <ul>
                    {users ? users.map((user: User, i) => (
                        <UserRow key={i} user={user} />
                    )) : null}
                </ul>
            </div>
            {open &&
                <Modal handler={setOpen}>
                    <UserForm handler={setOpen}/>
                </Modal>
            }
        </>
    )
}

export default UserList