import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
export const GET=async(req,{params})=>{
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate("creator");
        if(!prompt) return new Response("Prompt Not Found",{status:404});
        return new Response(JSON.stringify(prompt),{status:200});
    } catch (error) {
        return new Response("Internel Server Error",{status:500});
    }
}

export const PATCH = async(req,{params})=>{
    const {prompt,tag} = await req.json();
    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt){
            return new Response("Prompt not found",{status:404});
        }
        existingPrompt.prompt=prompt;
        existingPrompt.tag=tag;

        await existingPrompt.save();
        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Prompt",{status:500});
    }
}


export const DELETE = async (req,{params})=>{
    try {
        await connectToDB();

        await Prompt.findByIdAndDelete(params.id);
        return new Response("Prompt deleted successfully",{status : 200});
    } catch (error) {
        return new Response("Error deleting prompt",{status : 500});
    }
}


