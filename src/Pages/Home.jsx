import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Home() {
    // setting user list to empty initially
    const [users, setUsers] = useState([])

    // fetching user
    async function fetchUsers() {
        const res = await fetch("https://jsonplaceholder.typicode.com/users")
        const data = await res.json()
        setUsers(data)
    }

    // deleting any user from api
    async function deleteUser(id) {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                method: "DELETE"
            })

            setUsers(users.filter((u) => u.id !== id))
            alert("User deleted (simulated)")
        } catch (err) {
            console.log("Delete error:", err)
        }
    }

    // it will reload list every time app reloads
    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div className="p-4">
            <h2 className="text-2xl">Users</h2>

            {users.map((u) => (
                <div key={u.id} className="p-2 border-b flex justify-between">
                    <span>{u.name} — {u.email}</span>

                    <div>
                        <Link
                            to={`/edit/${u.id}`}
                            className="text-green-600 mr-4"
                        >
                            Edit
                        </Link>

                        <button
                            className="text-red-600"
                            onClick={() => deleteUser(u.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Home
