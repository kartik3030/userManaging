import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailedPage = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUserDetail() {
            setLoading(true);
            try {
                const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
                if (!res.ok) {
                    throw new Error("User not found.");
                }
                const data = await res.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchUserDetail();
    }, [id]);

    if (loading) return <div className="p-4">Loading user details...</div>;
    if (error) return <div className="p-4 text-red-700">Error: {error}</div>;
    if (!user) return <div className="p-4">User data not available.</div>;

    return (
        <div className="p-4 border rounded shadow-lg bg-white max-w-lg mx-auto mt-8">
            <h2 className="text-3xl font-bold mb-4 border-b pb-2">Details for {user.name}</h2>
            <div className="space-y-2">
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Company:</strong> {user.company.name}</p>
            </div>
        </div>
    );
}

export default DetailedPage;