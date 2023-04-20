import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BsCalendarDate } from "react-icons/bs";
import SingleBlog from "../components/SingleBlog";
import {BsStars} from "react-icons/bs"


const Blog = () => {
  const [blog, setBlog] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]);
 
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleBlog();
      window.scrollTo(0, 0)
    }
  }, [id]);

  const getSingleBlog = async () => {
    const response = await axios.get(`http://localhost:5000/Blogs/${id}`);
    const relatedPostData = await axios.get(
      `http://localhost:5000/Blogs?category=${response.data.category}&_start=0&_end=3`
    );
    if (response.status === 200 && relatedPostData.status === 200) {
      setBlog(response.data);
      setRelatedPosts(relatedPostData.data);
    } else {
      toast.error("Something went wrong");
    }
  };


  const exerpt = (str,num) => {
    if(str.length > num) {
      str = str.substring(0 , num) + " ... "
    }
    return str
  }
  const handleDelete = async (id) => {
    if(window.confirm("Are you sure that you want to delete this blog?")){
      setDltSpinner(true);
      const response = await axios.delete(`http://localhost:5000/Blogs/${id}`);
      if(response.status === 200){
        toast.success("Blog deleted successfully")
      }else {
        toast.error("Something went wrong");
      }
      setDltSpinner(false);
    }
  }

  return (
    <div>
      <div className="container max-w-4xl border mx-auto bg-gray-50 px-4 pt-2 pb-10">
        <div className="w-full min-h-fit py-3 items-center ">
          <h1 className=" text-gray-500 text-lg font-bold px-8 flex">
            <BsStars className="text-yellow-500 mr-3" />
            {blog && blog.title}
          </h1>
        </div>
        <img
          src={blog && blog.imgUrl}
          className="w-full mx-auto min-h-min rounded my-5"
        />
        <div className="flex justify-between mb-3 bg-stone-100 rounded p-1">
          <span className="flex items-center gap-1 text-gray-600">
            <BsCalendarDate />
            {blog && blog.date}
          </span>
          <span className="rounded py-1 font-bold px-4 bg-blue-500 text-white ">
            {blog && blog.category}
          </span>
        </div>
        <p className="text-justify  text-slate-800">
          {blog && blog.description}
        </p>
        {relatedPosts && relatedPosts.length > 1 && (
          <div className="py-8">
            <h1 className=" text-center text-3xl font-bold border-b-2 border-yellow-500 text-yellow-500  w-full">
              Related Posts
            </h1>

            <div className=" grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8  py-10">
              {relatedPosts.filter((item) => item.id != id).map((item, index) => (
                <SingleBlog
                  key={index}
                  exerpt={exerpt}
                  handleDelete={handleDelete}
                  {...item}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
