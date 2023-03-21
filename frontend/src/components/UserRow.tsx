import { User } from "../types/User.type"
import { Link } from "react-router-dom"
import Button from "./Button"
const UserRow = ({ user }: { user: User }) => {


    return (
        <li className="flex my-3 pb-2 border-b">
            <div className="w-[22%] flex items-center pl-2">{user.name} {user.surname}</div>
            <div className="w-[22%] flex items-center border-l pl-2">{user.email}</div>
            <div className="w-[22%] flex items-center border-l pl-2">{user.city}</div>
            <div className="w-[18%] flex items-center border-l pl-2">{new Date (user.dateOfBirth).toLocaleDateString("en-GB")}</div>
            <div className="w-[16%] flex justify-end items-center">
                <Link to={`/customer/${user._id}`}>
                    <Button>Details</Button>
                </Link>
            </div>
        </li>
    )
}

export default UserRow