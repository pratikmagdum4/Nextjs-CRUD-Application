import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";


export async function PUT(request, context) {
    const { id } = context.params; // Correct way to access params
    const { newTitle: title, newDescription: description } = await request.json();
    await connectMongoDB();
    await Topic.findByIdAndUpdate(id, { title, description });
    return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}


export async function GET(request, context) {
    const { id } = context.params; // Correct way to access params
    await connectMongoDB();
    const topic = await Topic.findById(id);
    return NextResponse.json({ topic }, { status: 200 });
}