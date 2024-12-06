"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddTopic() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isRecordingTitle, setIsRecordingTitle] = useState(false);
    const [isRecordingDescription, setIsRecordingDescription] = useState(false);
    const [recognition, setRecognition] = useState(null); // Initialize recognition state
    const router = useRouter();

    useEffect(() => {
        // Initialize SpeechRecognition only in the browser
        if (typeof window !== "undefined") {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.lang = "en-US";
            recognitionInstance.interimResults = false;
            recognitionInstance.maxAlternatives = 1;
            setRecognition(recognitionInstance);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description) {
            alert('Title and Description are required');
            return;
        }

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const res = await fetch(`${apiUrl}/api/topics`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ title, description })
            });

            if (res.ok) {
                router.push('/');
            } else {
                throw new Error("Error adding topic");
            }
        } catch (error) {
            console.error("Error Add", error);
        }

        console.log("Form submitted");
    };

    const toggleSpeechRecognition = (field) => {
        if (!recognition) {
            console.error("SpeechRecognition is not supported in this environment");
            return;
        }

        const isRecording = field === "title" ? isRecordingTitle : isRecordingDescription;

        if (isRecording) {
            recognition.stop();
            if (field === "title") setIsRecordingTitle(false);
            if (field === "description") setIsRecordingDescription(false);
        } else {
            recognition.start();
            if (field === "title") setIsRecordingTitle(true);
            if (field === "description") setIsRecordingDescription(true);
        }

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            if (field === "title") setTitle(transcript);
            if (field === "description") setDescription(transcript);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
        };
    };

    return (
        <div className="flex flex-col gap-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="relative">
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        className="border border-slate-500 px-8 py-2"
                        type="text"
                        placeholder="Topic Title"
                    />
                    <button
                        type="button"
                        onClick={() => toggleSpeechRecognition("title")}
                        className={`absolute top-0 right-0 p-2 ${isRecordingTitle ? 'bg-red-500' : 'bg-gray-200'} rounded-full`}
                    >
                        {isRecordingTitle ? 'Stop' : 'Start'} 🎤
                    </button>
                </div>

                <div className="relative">
                    <input
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        className="border border-slate-500 px-8 py-2"
                        type="text"
                        placeholder="Topic Description"
                    />
                    <button
                        type="button"
                        onClick={() => toggleSpeechRecognition("description")}
                        className={`absolute top-0 right-0 p-2 ${isRecordingDescription ? 'bg-red-500' : 'bg-gray-200'} rounded-full`}
                    >
                        {isRecordingDescription ? 'Stop' : 'Start'} 🎤
                    </button>
                </div>

                <button
                    type="submit"
                    className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
                >
                    Add Topic
                </button>
            </form>
        </div>
    );
}
