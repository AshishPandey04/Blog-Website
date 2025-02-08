// import React, { useEffect, useState } from 'react'
// import appwriteService from "../appwrite/config"
// import { Container, PostCard } from '../components'

// function Home() {
//     const [posts,setPosts] = useState([])

//     useEffect(()=>{
//         appwriteService.getPosts().then((posts)=>{
//             if(posts){
//                 setPosts(posts.documents)
//             }
//         })
//     },[])
//     if (posts.length === 0) {
//         return (
//             <div className="w-full py-8 mt-4 text-center">
//                 <Container>
//                     <div className="flex flex-wrap">
//                         <div className="p-2 w-full">
//                             <h1 className="text-2xl font-bold hover:text-gray-500">
//                                 Login to read posts
//                             </h1>
//                         </div>
//                     </div>
//                 </Container>
//             </div>
//         )
//     }
//     return (
//         <div className='w-full py-8'>
//             <Container>
//                 <div className='flex flex-wrap'>
//                     {posts.map((post) => (
//                         <div key={post.$id} className='p-2 w-1/4'>
//                             <PostCard {...post} />
//                         </div>
//                     ))}
//                 </div>
//             </Container>
//         </div>
//     )
// }

// export default Home



import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import { Container, PostCard } from '../components'

function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])

  if (posts.length === 0) {
    return (
      <div className="w-full py-16 flex items-center justify-center text-white">
        <Container>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-300">🚀 Login to Read Posts</h1>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="w-full py-12 bg-gray-900 text-white">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-100">📢 Latest Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home

