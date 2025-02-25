import React, { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Button, Input, RTE, Select } from './index'
import appwriteService from '../appwrite/config'

export default function PostForm({ post }) {
  const navigate = useNavigate()
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || 'active',

    }
  })
  const userData = useSelector((state) => state.auth.userData)

  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value.trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    else {
      return ''
    }
  }, [])
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title, { shouldValidate: true }))
      }

    })
    return () => {
      subscription.unsubscribe()
    }

  }, [watch, slugTransform, setValue])


  return (
    <form onSubmit={handleSubmit(submit)}
      className='flex flex-wrap text-white '
    >
      <div
        className='w-2/3 px-2'>

        <Input
          label="title: "
          placeholder="Title"
          className="mb-4"
          {...register("title", {
            required: true
          })} />

        <Input
          label="Slug"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", {
            required: true
          })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true
            })
          }} />


        <RTE label="Content :"
          name="content"
          control={control} defaultValue={getValues("content")} />



      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
          {post ? "Update" : "Submit"}
        </Button>

      </div>
    </form>
  )
}



// import React, { useCallback, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { useForm } from 'react-hook-form'
// import { Button, Input, RTE, Select } from './index'
// import appwriteService from '../appwrite/config'

// export default function PostForm({ post }) {
//   const navigate = useNavigate()
//   const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
//     defaultValues: {
//       title: post?.title || "",
//       slug: post?.slug || "",
//       content: post?.content || "",
//       status: post?.status || 'active',
//     }
//   })
//   const userData = useSelector((state) => state.auth.userData)

//   const submit = async (data) => {
//     if (post) {
//       const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
//       if (file) appwriteService.deleteFile(post.featuredImage)

//       const dbPost = await appwriteService.updatePost(post.$id, {
//         ...data,
//         featuredImage: file ? file.$id : undefined,
//       })

//       if (dbPost) navigate(`/post/${dbPost.$id}`)
//     } else {
//       const file = await appwriteService.uploadFile(data.image[0])
//       if (file) {
//         const fileId = file.$id
//         data.featuredImage = fileId
//         const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id })
//         if (dbPost) navigate(`/post/${dbPost.$id}`)
//       }
//     }
//   }

//   const slugTransform = useCallback((value) => {
//     if (value && typeof value === 'string') {
//       return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-")
//     }
//     return ''
//   }, [])

//   useEffect(() => {
//     const subscription = watch((value, { name }) => {
//       if (name === 'title') {
//         setValue('slug', slugTransform(value.title, { shouldValidate: true }))
//       }
//     })
//     return () => subscription.unsubscribe()
//   }, [watch, slugTransform, setValue])

//   return (
//     <form onSubmit={handleSubmit(submit)} className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Left Section */}
//         <div>
//           <Input
//             label="Title"
//             placeholder="Enter Post Title"
//             className="mb-4"
//             {...register("title", { required: true })}
//           />

//           <Input
//             label="Slug"
//             placeholder="Post Slug"
//             className="mb-4"
//             {...register("slug", { required: true })}
//             onInput={(e) => setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })}
//           />

//           <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
//         </div>

//         {/* Right Section */}
//         <div>
//           <Input
//             label="Featured Image"
//             type="file"
//             className="mb-4"
//             accept="image/png, image/jpg, image/jpeg, image/gif"
//             {...register("image", { required: !post })}
//           />

//           {post && (
//             <div className="w-full mb-4">
//               <img
//                 src={appwriteService.getFilePreview(post.featuredImage)}
//                 alt={post.title}
//                 className="w-full h-[200px] object-cover rounded-lg border border-gray-700"
//               />
//             </div>
//           )}

//           <Select
//             options={["active", "inactive"]}
//             label="Status"
//             className="mb-4"
//             {...register("status", { required: true })}
//           />

//           <Button
//             type="submit"
//             className={`w-full py-2 font-semibold text-white rounded-md transition duration-300 ${
//               post ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
//             }`}
//           >
//             {post ? "Update" : "Submit"}
//           </Button>
//         </div>
//       </div>
//     </form>
//   )
// }
