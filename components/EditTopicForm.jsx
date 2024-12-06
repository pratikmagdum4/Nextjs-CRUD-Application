"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditTopicForm({ id, title, description }) {
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);
    const router = useRouter();
    console.log("THe id is", id);
    console.log("THe title is", title);
    console.log("THe description is", description);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/topics/${id}`, {
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
            console.error("The error is:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
                onChange={(e) => setNewTitle(e.target.value)}
                value={newTitle} // Use newTitle for two-way binding
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Topic Title"
            />
            <input
                onChange={(e) => setNewDescription(e.target.value)}
                value={newDescription} // Use newDescription for two-way binding
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Topic Description"
            />
            <button
                type="submit"
                className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
            >
                Update Topic
            </button>
        </form>
    );
}
