import { useState } from "react"

function CreateUser() {
    // setting form inital inputs to empty
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: ""
    })

    // whem user press any key, the value of form will update
    function onChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    async function submit(e) {
        e.preventDefault()

        // senging data to Json Placeholder
        const res = await fetch("https://jsonplaceholder.typicode.com/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        alert("User created (simulated)")
    }

    return (
        <div className="p-4 flex justify-center">
            <form onSubmit={submit} className="w-1/2">

                <h2 className="text-xl mb-3">Create User</h2>

                <p>Name</p>
                <input className="border p-2 w-full" name="name" onChange={onChange} value={form.name} />

                <p className="mt-3">Email</p>
                <input className="border p-2 w-full" name="email" onChange={onChange} value={form.email} />

                <p className="mt-3">Phone</p>
                <input className="border p-2 w-full" name="phone" onChange={onChange} value={form.phone} />

                <button className="bg-blue-600 text-white px-4 py-2 mt-4" type="submit">
                    Create
                </button>
            </form>
        </div>
    )
}

export default CreateUser
