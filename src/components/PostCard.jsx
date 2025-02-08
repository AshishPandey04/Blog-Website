// import React from 'react'
// import appwriteService from '../appwrite/config'
// import { Link } from 'react-router-dom'

// function Postcard({ $id, title, featuredImage }) {
//     return (
//         <Link to={`/post/${$id}`}>
//             <div className='w-full bg-gray-100 rounded-xl p-4'>
//                 <div className='justify-center w-full mb-4'>
//                     <img src={appwriteService.getFilePreview(featuredImage)
//                     } alt={title}
//                         className='rounded-xl' />


//                 </div>
//                 <h2 className='font-bold text-xl'>{title}</h2>
//             </div>

//         </Link>
//     )
// }

// export default Postcard

import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function Postcard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="group">
      <div className="w-[300px] h-[400px] bg-gray-800 rounded-xl p-4 shadow-lg transition-transform duration-300 hover:scale-105">
        {/* Image */}
        <div className="w-full h-[250px] overflow-hidden rounded-lg mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover rounded-lg group-hover:opacity-90"
          />
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>
    </Link>
  )
}

export default Postcard

