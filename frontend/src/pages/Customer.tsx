import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { User } from "../types/User.type"
import { useUsersContext } from "../hooks/useUsersContext"


//components
import Container from "../components/Container"
import Button from "../components/Button"
import Modal from "../components/Modal"
import UserForm from "../components/UserForm"


const Customer = () => {

    const params = useParams()

    const UID = params.id;


    const [user, setUser] = useState()
    const [rate, setRate] = useState()
    const [init, setInit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const { users, dispatch } = useUsersContext();


    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch('/api/users/' + UID)
            const json = await res.json()
            if (!res.ok) {
                console.log(json.error)
            }
            if (res.ok) {
                dispatch({ type: 'SET_USERS', payload: [json] })
                setInit(true)
            }
        }

        fetchUsers()
    }, [])

    const fetchInsurance = async () => {
        setLoading(true)
        const res = await fetch('/api/users/' + UID + '/insurance', {
            method: 'POST',
            body: JSON.stringify({ id: UID }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await res.json();

        if (!res.ok) {
            alert(json.error)
        }
        if (res.ok) {
            setRate(json)
        }
        setLoading(false)
    }
    const navigate = useNavigate();

    const deleteUser = async () => {
        const res = await fetch('/api/users/' + UID, {
            method: 'DELETE',
            body: JSON.stringify({ id: UID }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await res.json();

        if (!res.ok) {
            alert(json.error)
        }
        if (res.ok) {
            setRate(json)
            navigate('/')
        }
    }
    return (
        <>
            {init ?
                <div className="customer flex justify-center">
                    <Container>
                        {users[0] ?
                            <>
                                <h1 className="mb-8 text-4xl font-bold">{users[0].name} {users[0].surname}</h1>
                                <h3 className="text-lg mb-6 border-l border-l-purple-600 pl-2">Email: {users[0].email}</h3>
                                <h3 className="text-lg mb-6 border-l border-l-purple-600 pl-2">City: {users[0].city}</h3>
                                <h3 className="text-lg mb-6 border-l border-l-purple-600 pl-2">Birth date: {new Date(users[0].dateOfBirth).toLocaleDateString("en-GB")}</h3>
                                <div className="flex text-xl mb-8">
                                    <h2>Insurance price:&nbsp;</h2>
                                    {!rate ?
                                        <button className={"font-bold " + (loading && "cursor-wait")} onClick={fetchInsurance}>Calculate insurance price</button>
                                        : <h2>Your rate is <span className="font-bold">{rate}</span></h2>
                                    }
                                </div>
                                <div className="flex font-bold">
                                    <Button click={() => (setOpen(true))} css="mr-4">Edit</Button>
                                    <Button click={deleteUser}>Delete</Button>
                                </div>

                            </>
                            :
                            <h2>No existing user</h2>
                        }
                    </Container>
                </div>
                :
                null
            }
            {open &&
                <Modal handler={setOpen}>
                    <UserForm user={users[0]} handler={setOpen} />
                </Modal>
            }
        </>
    )
}


export default Customer