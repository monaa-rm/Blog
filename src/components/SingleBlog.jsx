import { AiTwotoneEdit } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
const SingleBlog = ({
  title,
  category,
  description,
  id,
  imgUrl,
  date,
  exerpt,
  handleDelete,
}) => {

  return (
    <>
      <div className=" shadow-sm hover:shadow-lg h-[300px] rounded-lg overflow-hidden border transition duration-500 ease-in-out">
        <div className="relative w-full h-40 overflow-hidden bg-gray-100">
          <div className="absolute z-10 py-1 px-2 bg-blue-700 text-sm rounded-lg top-1 left-1"><span className="text-white">{category}</span></div>
          <img
            src={imgUrl}
            className=" mx-auto scale-x-125 h-full"
            id="imgId"
          />
        </div>
        <div className="px-3 py-1 ">
          <h1 className="font-bold text-lg text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
            {title}
          </h1>
          <div className="h-16">
            <p className="text-gray-600  text-sm ">
              {exerpt(description, 70)}
              <Link to={`/blog/${id}`} className="text-sm text-blue-500 hover:text-blue-600 " > read more </Link>
            </p>
          </div>
          <div className="flex justify-between items-center pt-3 pb-2">
            <div className="flex gap-1">

              <span className="cursor-pointer" onClick={() => handleDelete(id)}>
                <RiDeleteBin5Line className="text-red-500 hover:text-red-600 transition duration-150 ease-in-out" />
              </span>
              <Link to={`/editBlog/${id}`}>
                <AiTwotoneEdit className="text-blue-500 hover:text-blue-600 transition duration-150 ease-in-out" />
              </Link>
            </div>
            <span className="text-sm text-gray-500 rounded-lg px-1 bg-gray-200">{date}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
