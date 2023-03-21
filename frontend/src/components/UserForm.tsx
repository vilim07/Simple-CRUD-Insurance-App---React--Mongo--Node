
import { Key, useEffect, useState } from "react"
import { useUsersContext } from "../hooks/useUsersContext";
import { User } from "../types/User.type";
import Button from "./Button";

const UserForm = ({ user = null, handler }: { user?: User | null, handler:React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [dob, setDob] = useState<{ day: number, month: number, year: number }>({
        day: 0!,
        month: 0!,
        year: 0!,
    });

    const dateFormater = () => {
        const date = new Date(user!.dateOfBirth)
        return (
            {
                day: (date.getDate()),
                month: date.getMonth() + 1,
                year: date.getFullYear()
            }
        )
    }

    useEffect(() => {
        if (user) {
            setEmail(user.email)
            setName(user.name)
            setSurname(user.surname)
            setCity(user.city)
            setDob(dateFormater())
        }
    }, [])



    const fieldDiff = (date: string) => {
        let changes: {
            name?: string,
            surname?: string,
            email?: string,
            city?: string,
            dateOfBirth?: string
        } = {};
        
        if (name !== user!.name) {
            changes.name = name;
        }
        if (surname !== user!.surname) {
            changes.surname = surname;
        }
        if (email !== user!.email) {
            changes.email = email;
        }
        if (city !== user!.city) {
            changes.city = city;
        }

        if (JSON.stringify(dob) !== JSON.stringify(dateFormater())) {
            changes.dateOfBirth = date;
        }

        if (Object.keys(changes).length === 0){
            return null
        }
        
        return changes;
    }

    const { users, dispatch } = useUsersContext();

    //API create user
    const createUser = async (date: string) => {
        const nUser = { name, surname, email, city, dateOfBirth: date }

        const res = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(nUser),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await res.json();

        if (!res.ok) {
            alert(json.error)
        }
        if (res.ok) {
            dispatch({ type: 'ADD_USER', payload: json })
            handler(false)
        }
    }


    //API update user
    const updateUser = async (date: string) => {
        const nUser = fieldDiff(date);
        if (!nUser){
            console.log("no changes made")
            return null
        }
        const res = await fetch('/api/users/' + user!._id, {
            method: 'PATCH',
            body: JSON.stringify(nUser),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await res.json();
        if (!res.ok) {
            alert(json.error)
        }
        if (res.ok) {
            const match = users.findIndex((el: { _id: Key; }) => el._id === user!._id);
            const copy = users;
            copy[match] = {...user, ...nUser};
            dispatch({ type: 'PATCH_USER', payload: copy })
            handler(false)
        }
    }

    //Form submit handler
    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        const date = new Date(dob.month.toString() + "-" + dob.day.toString() + "-" + dob.year.toString());
        if (!isNaN(date.getTime()) === false) {
            return
        }
        if (!user) {
            createUser(date.toDateString())
        }
        else {
            updateUser(date.toDateString())
        }

    }

    //Date checker
    const dateHandler = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        if (+e.target.value < 0) {
            return
        }
        switch (type) {
            case "day":
                if (+e.target.value <= 31) {

                    setDob(prev => ({ ...prev, day: +e.target.value }))
                }
                return
            case "month":
                if (+e.target.value <= 12) {
                    setDob(prev => ({ ...prev, month: +e.target.value }))
                }
                return
            case "year":
                if (+e.target.value <= new Date().getFullYear()) {
                    setDob(prev => ({ ...prev, year: +e.target.value }))
                }
                return
            default:
                return
        }
    }


    return (
        <form onSubmit={submitHandler}>
            <h3 className="text-xl font-bold mb-4">Create a New User</h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                <div className="flex flex-col">
                    <label className="mb-1 font-semibold">Name</label>
                    <input data-testid="input" type="text" name="name" required className="border-b pb-1" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} value={name} />
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 font-semibold">Surname</label>
                    <input data-testid="input" type="text" name="surname" required className="border-b pb-1" placeholder="Enter your surname" onChange={(e) => setSurname(e.target.value)} value={surname} />
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 font-semibold">Email</label>
                    <input data-testid="input" type="email" name="email" required className="border-b pb-1" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 font-semibold">City</label>
                    <input data-testid="input" type="text" name="city" required className="border-b pb-1" placeholder="Enter your city" onChange={(e) => setCity(e.target.value)} value={city} />
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 font-semibold">Date Of Birth</label>
                    <div className="grid grid-cols-3 gap-x-3">
                        <input data-testid="input" type="number" name="day" required className="border-b pb-1" placeholder="Day" pattern="\d{1,2}" onChange={e => dateHandler(e, "day")!} value={dob.day ? dob.day : ""} />
                        <input data-testid="input" type="number" name="month" required className="border-b pb-1" placeholder="Month" pattern="\d{1,2}" onChange={e => dateHandler(e, "month")!} value={dob.month ? dob.month : ""} />
                        <input data-testid="input" type="number" name="year" required className="border-b pb-1" placeholder="Year" pattern="\d{4}" onChange={e => dateHandler(e, "year")!} value={dob.year ? dob.year : ""} />
                    </div>
                </div>

                <Button>{!user ? "Create" : "Update"}</Button>

            </div>

        </form>
    )
}

export default UserForm