import Link from "next/link";
import RemoveBtn from "./Removebtn";
import { HiPencilAlt } from 'react-icons/hi';

const getTopics = async () => {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
        const res = await fetch(`${apiUrl}/api/topics`, { cache: 'no-store' });
        if (!res.ok) throw new Error("Failed to fetch the data");
        return res.json();
    } catch (error) {
        console.error("Error loading the topics:", error);
        return { topics: [] };
    }
};

export default async function TopicsList() {
    const { topics } = await getTopics();
    return (
        <>
            {topics.map(t => (
                <div key={t._id} className="topic-card p-6 border rounded-lg my-4 flex justify-between gap-6 items-start bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white shadow-lg hover:scale-105 transform transition-all duration-300">
                    <div className="flex-1">
                        <h2 className="text-3xl font-semibold transition-all duration-300 hover:underline">
                            {t.title}
                        </h2>
                        <p className="mt-2 text-lg opacity-80">{t.description}</p>
                    </div>
                    <div className="flex gap-3 items-center">
                        <RemoveBtn id={t._id} />
                        <Link href={`/editTopic/${t._id}`}>
                            <HiPencilAlt size={26} className="hover:text-gray-200 transition-colors duration-300" />
                        </Link>
                    </div>
                </div>
            ))}
        </>
    );
}
