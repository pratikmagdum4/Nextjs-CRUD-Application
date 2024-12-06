"use client"
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveBtn({ id }) {
    const router = useRouter();
    const removeTopic = async () => {
        const confirmed = confirm("Are you sure?");
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (confirmed) {
            const res = await fetch(`${apiUrl}/api/topics?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                router.refresh();
            }
        }
    };

    return (
        <button
            onClick={removeTopic}
            className="text-red-400 transition-transform transform hover:scale-110"
        >
            <HiOutlineTrash size={26} />
        </button>
    );
}
