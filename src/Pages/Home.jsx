import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Home() {
    // setting user to null initially
    const [users, setUsers] = useState([])
    // loading if data is not showing
    const [loading, setLoading] = useState(true)
    // will set error , initally no error
    const [error, setError] = useState(null)

    async function fetchUsers() {
        setLoading(true);
        setError(null);
        // try to detch users from API
        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/users");

            if (!res.ok) {
                throw new Error(`Server responded with status: ${res.status}`);
            }

            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error("Fetch operation failed:", err);
            setError(`Failed to load users: ${err.message}.`);
        } finally {
            setLoading(false);
        }
    }

    // deleting a user
    async function deleteUser(id) {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                method: "DELETE"
            })

            setUsers(prevUsers => prevUsers.filter((u) => u.id !== id))
            alert(`User ${id} deleted (simulated)`);
        } catch (err) {
            console.error("Delete error:", err);
            alert("Delete failed.");
        }
    }

    // fetch user on reload
    useEffect(() => {
        fetchUsers();
    }, [])

    if (loading) {
        return <div className="p-4 text-center text-lg">Loading users... ⏳</div>;
    }

    if (error) {
        return <div className="p-4 text-center text-red-700 font-bold">Error: {error}</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">User List</h2>

            {users.map((u) => (
                <div key={u.id} className="p-3 border-b flex justify-between items-center transition duration-150 hover:bg-gray-50">
                    <Link
                        to={`/user/${u.id}`}
                        className="text-blue-600 hover:underline cursor-pointer font-medium text-lg"
                    >
                        {u.name}
                    </Link>

                    <div>
                        <Link
                            to={`/edit/${u.id}`}
                            className="text-green-600 mr-4 hover:text-green-800 transition"
                        >
                            Edit
                        </Link>

                        <button
                            className="text-red-600 hover:text-red-800 transition"
                            onClick={() => deleteUser(u.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))
            }

            {users.length === 0 && (
                <div className="text-center text-gray-500 mt-8">No users found.</div>
            )}
        </div >
    )
}

export default Home