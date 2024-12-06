"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTopic() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isRecordingTitle, setIsRecordingTitle] = useState(false); // Track recording status for title
    const [isRecordingDescription, setIsRecordingDescription] = useState(false); // Track recording status for description
    const router = useRouter();

    // Initialize speech recognition API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // Handle form submission
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
            console.log("Error Add", error);
        }

        console.log("Form submitted");
    };

    // Start or stop the speech recognition for the title field
    const toggleSpeechRecognitionTitle = () => {
        if (isRecordingTitle) {
            recognition.stop(); // Stop recording
            setIsRecordingTitle(false); // Update button to reflect stopped state
        } else {
            recognition.start(); // Start recording
            setIsRecordingTitle(true); // Update button to reflect recording state
        }

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setTitle(transcript); // Update title with the transcript
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            return;
        };
    };

    // Start or stop the speech recognition for the description field
    const toggleSpeechRecognitionDescription = () => {
        if (isRecordingDescription) {
            recognition.stop(); // Stop recording
            setIsRecordingDescription(false); // Update button to reflect stopped state
        } else {
            recognition.start(); // Start recording
            setIsRecordingDescription(true); // Update button to reflect recording state
        }

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setDescription(transcript); // Update description with the transcript
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
        };
    };

    return (
        <div className="flex flex-col gap-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {/* Title input with separate start/stop recording button */}
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
                        onClick={toggleSpeechRecognitionTitle}
                        className={`absolute top-0 right-0 p-2 ${isRecordingTitle ? 'bg-red-500' : 'bg-gray-200'} rounded-full`}
                    >
                        {isRecordingTitle ? 'Stop' : 'Start'} 🎤
                    </button>
                </div>

                {/* Description input with separate start/stop recording button */}
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
                        onClick={toggleSpeechRecognitionDescription}
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
