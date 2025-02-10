import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-10 px-6 text-white bg-gray-900 min-h-screen">
      <Container className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-2xl shadow-lg">
        {/* Featured Image */}
        <div className="w-full flex justify-center mb-6 relative">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-2xl shadow-md w-full object-cover max-h-[400px]"
          />

          {/* Edit/Delete Buttons (Only for Author) */}
          {isAuthor && (
            <div className="absolute right-4 top-4 flex gap-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500 hover:bg-green-600 px-4 py-2 text-sm">
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-500 hover:bg-red-600 px-4 py-2 text-sm"
                onClick={deletePost}
              >
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* Post Content */}
        <div className="text-center mb-4">
          <h1 className="text-3xl font-extrabold text-gray-200">
            {post.title}
          </h1>
        </div>

        <div className="text-gray-300 leading-relaxed text-lg browser-css">
          {parse(post.content)}
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link to="/">
            <Button bgColor="bg-blue-500 hover:bg-blue-600 px-6 py-2">
              Back to Home
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  ) : null;
}
