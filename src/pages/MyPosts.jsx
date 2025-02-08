import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (userData) {
      appwriteService.getPosts().then((posts) => {
        if (posts) {
          // Filter posts to only show those created by the logged-in user
          const myPosts = posts.documents.filter(
            (post) => post.userId === userData.$id
          );
          setPosts(myPosts);
        }
      });
    }
  }, [userData]);

  return (
    <div className="py-12 w-full bg-gradient-to-r from-gray-900 to-gray-950 text-white">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-100">
          📚 My Posts
        </h2>

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
  );
}
