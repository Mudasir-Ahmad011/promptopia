"use client";
import { useState,useEffect } from "react"
import Form from "@components/Form";
import { useRouter,useSearchParams } from "next/navigation";



const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams=useSearchParams();
  const promptId=searchParams.get("id");

  const [submitting,setSubmitting] = useState(false);
  const [post,setPost]=useState({prompt : "",tag:""});
  
  const getPromptDetails = async()=>{
    const response = await fetch(`/api/prompt/${promptId}`);
    const data = await response.json();

    setPost({prompt:data.prompt,tag:data.tag});
  }
  useEffect(()=>{
    if(promptId) getPromptDetails();
  },[promptId])
  
  const updatePrompt = async(e)=>{
    e.preventDefault();
   setSubmitting(true);
   if(!promptId) return alert("Missing PromptId!");
   try {
    const response = await fetch(`/api/prompt/${promptId}`,{
      method:"PATCH",
      body:JSON.stringify({prompt:post.prompt,tag:post.tag})
    })
    if(response.ok){
      router.push("/");
    }
   } catch (error) {
    console.log(error);
   }finally{
    setSubmitting(false);
   }
  }
  return (
    <div>
      <Form type="Edit" submitting={submitting} post={post} setPost={setPost} handleSubmit={updatePrompt}/>
    </div>
  )
}

export default UpdatePrompt
