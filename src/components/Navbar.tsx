import { NavLink } from "react-router-dom"

function Navbar() {
    const link = "hover:text-gray-300 transition"

    return (
        <nav className="w-full bg-gray-900 text-white px-6 py-4 flex justify-center gap-6">
            <NavLink to="/" className={link}>Home</NavLink>
            <NavLink to="/tasks" className={link}>TaskMaster</NavLink>
            <NavLink to="/contacts" className={link}>ConnectHub</NavLink>
            <NavLink to="/finance" className={link}>MoneyFlow</NavLink>
        </nav>
    )
}

export default Navbar