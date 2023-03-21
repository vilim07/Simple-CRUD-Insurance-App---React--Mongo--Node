import { Link } from "react-router-dom"
const Navbar = () => {
    return (
        <header className="px-16 mb-10 py-4 bg-purple-600 shadow-lg">
            <Link to='/'>
                <h3 className="text-2xl font-bold text-white">Računalko</h3>
            </Link>
        </header>
    )
}

export default Navbar