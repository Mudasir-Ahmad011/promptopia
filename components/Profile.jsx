import PromptCard from "./PromptCard"

const Profile = (props) => {
  const {name,desc,data,handleEdit,handleDelete} = props;
  return (
    <>
    <section className="head_text text-left">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
    </section>

      <div className="mt-10 prompt_layout">
        {data.map((post)=>(
          <PromptCard
          key={post._id}
          post={post}
          handleEdit={()=>handleEdit && handleEdit(post)}
          handleDelete={()=>handleDelete && handleDelete(post)}
          /> 
        ))}
      </div>
    </>
  )
}

export default Profile
