import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

function EditUser() {
    const { id } = useParams()
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: ""
    })

    // it will fetch user whenever any paramter will change (id)
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(res => res.json())
            .then(data => {
                setForm({
                    name: data.name,
                    email: data.email,
                    phone: data.phone
                })
            })
    }, [id])


    function onChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    async function submit(e) {
        e.preventDefault()
        // updating the user detail with the new detail filled in form
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })

        const data = await res.json()
        alert("User updated (simulated)")
    }

    return (
        <div className="p-4 flex justify-center">
            <form onSubmit={submit} className="w-1/2">
                <h2 className="text-xl mb-3">Edit User</h2>

                <p>Name</p>
                <input className="border p-2 w-full" name="name" value={form.name} onChange={onChange} />

                <p className="mt-3">Email</p>
                <input className="border p-2 w-full" name="email" value={form.email} onChange={onChange} />

                <p className="mt-3">Phone</p>
                <input className="border p-2 w-full" name="phone" value={form.phone} onChange={onChange} />

                <button className="bg-green-600 text-white px-4 py-2 mt-4">
                    Update
                </button>
            </form>
        </div>
    )
}

export default EditUser
