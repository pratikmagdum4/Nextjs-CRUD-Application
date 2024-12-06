import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center bg-slate-800 px-8 py-3 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <Link href="/" className="text-white font-bold text-xl transition-transform transform hover:scale-110">
                Home
            </Link>
            <Link href="/addTopic" className="bg-white text-black px-4 py-2 rounded-full font-semibold shadow-md hover:bg-blue-500 hover:text-white transition-all duration-300">
                Add Topic
            </Link>
        </nav>
    );
}
