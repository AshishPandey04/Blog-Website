// import React, { useState, useEffect } from 'react'
// import appwriteService from '../appwrite/config'
// import { Container, PostCard } from '../components'

// export default function AllPosts() {
//     const [posts, setPosts] = useState([])
//     useEffect(() => {
//         appwriteService.getPosts().then((posts) => {
//             if (posts) {
//                 setPosts(posts.documents)
//             }
//         })
//     }, [])
//     return (
//         <div className='py-8 w-full'>
//             <Container>
//               <div className='flex flex-wrap'>
//               {posts.map((post)=>{
//                     <div key={post.$id} className='p-2 w-1/4'>
//                         <PostCard {...post}/>
                        
//                     </div>

//                 })}
//               </div>
//             </Container>

//         </div>
      
//     )
// }

import React, { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'

export default function AllPosts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])

  return (
    <div className="py-12 w-full bg-gray-900 text-white">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-100">📚 All Posts</h2>

        {/* Show empty state if no posts */}
        {posts.length === 0 ? (
          <div className="text-center text-gray-400 text-lg animate-pulse">
            No posts available. Start by adding a new post! 🚀
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

