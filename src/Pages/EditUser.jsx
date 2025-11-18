import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom" // Import useNavigate

function EditUser() {
    const { id } = useParams()
    const navigate = useNavigate() // Hook for programmatic navigation

    // Add states for UX feedback
    const [form, setForm] = useState({ name: "", email: "", phone: "" })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false) // For button feedback

    // 1. Initial Data Fetch (using async/await for better error flow)
    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true)
            setError(null)
            try {
                const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)

                if (!res.ok) {
                    throw new Error(`User ID ${id} not found or server error (${res.status})`)
                }

                const data = await res.json()
                setForm({
                    name: data.name,
                    email: data.email,
                    // Note: JSONPlaceholder data might not always have 'phone' on the top level, 
                    // but we'll stick to your form structure.
                    phone: data.phone
                })
            } catch (err) {
                console.error("Fetch error:", err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [id])


    function onChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    // 2. Form Submission with Feedback
    async function submit(e) {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            })

            if (!res.ok) {
                throw new Error(`Update failed with status: ${res.status}`)
            }

            // const data = await res.json() // Not needed unless you check the mocked data
            alert("User updated successfully (simulated)!")

            // Optional: Redirect the user to the detail page or home page
            navigate(`/user/${id}`)

        } catch (err) {
            console.error("Submission error:", err)
            setError(`Update failed: ${err.message}`)
        } finally {
            setIsSubmitting(false)
        }
    }

    // 3. Conditional Render
    if (loading) {
        return <div className="p-4 text-center">Loading user data... ⏳</div>
    }

    if (error) {
        return <div className="p-4 text-center text-red-700 font-bold">Error: {error}</div>
    }

    return (
        <div className="p-4 flex justify-center">
            <form onSubmit={submit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold mb-5">Edit User ID: {id}</h2>

                <label className="block mb-4">
                    <p className="font-medium mb-1">Name</p>
                    <input
                        className="border p-2 w-full rounded focus:ring-blue-500 focus:border-blue-500"
                        name="name"
                        value={form.name}
                        onChange={onChange}
                        required
                    />
                </label>

                <label className="block mb-4">
                    <p className="font-medium mb-1">Email</p>
                    <input
                        className="border p-2 w-full rounded focus:ring-blue-500 focus:border-blue-500"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={onChange}
                        required
                    />
                </label>

                <label className="block mb-4">
                    <p className="font-medium mb-1">Phone</p>
                    <input
                        className="border p-2 w-full rounded focus:ring-blue-500 focus:border-blue-500"
                        name="phone"
                        value={form.phone}
                        onChange={onChange}
                    />
                </label>

                {error && <p className="text-red-500 mb-3">{error}</p>}

                <button
                    className={`text-white px-4 py-2 rounded transition-colors ${isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                        }`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Updating...' : 'Update'}
                </button>
            </form>
        </div>
    )
}

export default EditUser