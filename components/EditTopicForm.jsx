"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditTopicForm({ id, title, description }) {
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const res = await fetch(`${apiUrl}/api/topics/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ newTitle, newDescription }),
            });
            if (res.ok) {
                await router.push("/"); // Navigate only on success
            } else {
                console.error("Failed to update topic:", await res.text());
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6 bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg shadow-xl text-white">
            <input
                onChange={(e) => setNewTitle(e.target.value)}
                value={newTitle}
                className="border border-white bg-transparent px-8 py-3 rounded-lg text-lg placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                type="text"
                placeholder="Topic Title"
            />
            <textarea
                onChange={(e) => setNewDescription(e.target.value)}
                value={newDescription}
                className="border border-white bg-transparent px-8 py-3 rounded-lg text-lg placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                placeholder="Topic Description"
            />
            <button
                type="submit"
                className="bg-green-600 font-bold text-white py-3 px-8 rounded-full mt-4 hover:bg-green-700 transition-all duration-300"
            >
                Update Topic
            </button>
        </form>
    );
}
