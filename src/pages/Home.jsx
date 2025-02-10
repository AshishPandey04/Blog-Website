import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Added loading state
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (userData) {
      setLoading(true);
      appwriteService.getPosts().then((response) => {
        setPosts(response ? response.documents : []);
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [userData]); 


  if (!userData) {
    return (
      <div className="bg-gradient-to-r from-gray-900 to-gray-950 w-full py-16 flex items-center justify-center text-white">
        <Container>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-300 ">
              🚀 Login to Read Posts
            </h1>
          </div>
        </Container>
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="w-full py-20 flex items-center justify-center text-white">
        <h1 className="text-xl font-semibold text-gray-400 animate-pulse">
          Loading posts...
        </h1>
      </div>
    );
  }


  if ( posts.length === 0) {
    return (
      <div className="bg-gradient-to-r from-gray-900 to-gray-950 w-full py-20 flex items-center justify-center text-white">
        <Container>
          <div className="text-center animate-fadeIn">
            <h1 className="text-3xl font-extrabold text-gray-200 mb-4">
              🚀 No Active Blogs Available
            </h1>
            <p className="text-lg text-gray-400 mb-6">
              It looks like there are no active blogs right now. Stay tuned for
              updates!
            </p>

            {/* Optional: Show a button to create a post if applicable */}
            <Link to="/add-post">
              <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-lg hover:bg-blue-600 transition">
                Create a Blog
              </button>
            </Link>
          </div>
        </Container>
      </div>
    );z
  }

 

  return (
    <div className="w-full py-12 bg-gradient-to-r from-gray-900 to-gray-950 text-white">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-100">
          📢 Latest Posts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
