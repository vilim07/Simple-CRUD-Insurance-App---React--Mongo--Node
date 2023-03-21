import { useEffect, useState } from "react"
import { useUsersContext } from "../hooks/useUsersContext"

//components
import UserTable from "../components/UserTable"
import Container from "../components/Container"


const Home = () => {

    const { users, dispatch } = useUsersContext();
    const [init, setInit] = useState(false);


    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch('/api/users')
            const json = await res.json()
            if (res.ok) {
                dispatch({ type: 'SET_USERS', payload: json })
                setInit(true)
            }
        }

        fetchUsers()
    }, [])


    return (
        <>
            {init ?
                <div className="home flex justify-center">
                    <Container>
                        <h1 className="mb-8 text-4xl font-bold">Korisnici</h1>
                        <UserTable users={users} />
                    </Container>
                </div>
                :
                null
        }
        </>
    )
}

export default Home