import EditTopicForm from "@/components/EditTopicForm";
const getTopicById = async (id) => {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/api/topics/${id}`, { cache: "no-store" });

        console.log("The response is ", res)
        if (!res.ok) {
            throw new Error("Failed to fetch topic");
        }

        return res.json(); // Return the parsed response
    } catch (error) {
        console.error("The error is:", error);
        return null; // Return null on failure
    }
};

export default async function EditTopic({ params }) {
    const { id } = await params; // Ensure params is awaited

    const topic = await getTopicById(id);

    if (!topic) {
        return <p>Error fetching topic data. Please try again later.</p>;
    }
    // console.log("The toic is", topic)
    const title = topic.topic.title;
    const description = topic.topic.description
    return (
        <>
            <EditTopicForm id={id} title={title} description={description} />
        </>
    );
}
