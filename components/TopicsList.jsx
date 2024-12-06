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
        return { topics: [] }; // Return fallback data
    }
};

export default async function TopicsList() {
    const { topics } = await getTopics();
    // const gotTopics = topics.topics;
    console.log("The topics are ", topics)
    return (
        <>
            {topics.map(t => (
                <div key={t._id} className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
                    <div>
                        <h2 className="font-bold text-2xl">
                            {t.title}
                        </h2>
                        <div>
                            {t.description}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <RemoveBtn id={t._id} />
                        <Link href={`/editTopic/${t._id}`} >
                            <HiPencilAlt size={24} />
                        </Link >
                    </div>
                </div>
            ))}
        </>
    )
}