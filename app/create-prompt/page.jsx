"use client";
import { useState } from "react"
import Form from "@components/Form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


const CreatePrompt = () => {
  const router = useRouter();
  const {data:session} = useSession();

  const [submitting,setSubmitting] = useState(false);
  const [post,setPost]=useState({prompt : "",tag:""});
  const createPrompt = async(e)=>{
    e.preventDefault();
   setSubmitting(true);
   try {
    const response = await fetch('/api/prompt/new',{
      method:"POST",
      body:JSON.stringify({prompt:post.prompt,userId:session?.user.id,tag:post.tag})
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
      <Form type="Create" submitting={submitting} post={post} setPost={setPost} handleSubmit={createPrompt}/>
    </div>
  )
}

export default CreatePrompt
