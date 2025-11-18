import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Home() {
    // 1. State for data and UX feedback
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true) // Added loading state
    const [error, setError] = useState(null)     // Added error state

    // 2. Fetching User Data with Error Handling
    async function fetchUsers() {
        setLoading(true); // Start loading before fetch
        setError(null);   // Clear previous errors

        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/users");

            if (!res.ok) {
                // Handle non-200 responses (e.g., 404, 500)
                throw new Error(`Server responded with status: ${res.status}`);
            }

            const data = await res.json();
            setUsers(data);
        } catch (err) {
            // Handle network/CORS issues (TypeError: Failed to fetch)
            console.error("Fetch operation failed:", err);
            setError(`Failed to load users: ${err.message}.`);
        } finally {
            setLoading(false); // Stop loading regardless of success/fail
        }
    }

    // 3. Deleting a user (Optimistic UI Update)
    async function deleteUser(id) {
        try {
            // ⚠️ Note: JSONPlaceholder simulates DELETE, it won't actually remove data.
            await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                method: "DELETE"
            })

            // Safely update state using the functional form of setState (prevUsers)
            setUsers(prevUsers => prevUsers.filter((u) => u.id !== id))
            alert(`User ${id} deleted (simulated)`);
        } catch (err) {
            console.error("Delete error:", err);
            alert("Delete failed."); // User feedback for failed delete
        }
    }

    // 4. useEffect to call fetchUsers on mount
    useEffect(() => {
        fetchUsers();
    }, [])

    // 5. Conditional Rendering for UX
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

                    {/* CORRECT LINK: Navigates to /user/[id] for detailed view */}
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