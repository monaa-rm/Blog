import React, { useEffect, useState } from "react";
import SingleBlog from "../components/SingleBlog";
import axios from "axios";
import { toast } from "react-toastify";
import Search from "../components/Search";
import Category from "../components/Category";
import { Paginator } from "react-paginator-responsive";

const options = ["Sports", "Fashion", "Fitness", "Travel", "Tech", "Food"];
const paginateStyles = {
  hideBackNextButtonText: true,
  backAndNextTextButtonColor: "white",
  paginatorButtonColor: "orange",
  paginatorButtonSelectedColor: "blue",
  paginatorButtonHoverColor: "rgb(243, 244 ,260)",
  lateralMargin: "0 2rem",
  centerPaginator: true,
  hidePaginatorInfo: true,
  paginatorButtonSelectedBackgroundColor:  "rgb(243, 244 ,280)",
};

const Home = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [totalItems, setToatalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [gPage, setGPage] = useState(0);
  const [pageLimit] = useState(5);
  useEffect(() => {
    loadingBlogsData(0, 8);
  }, []);

  const loadingBlogsData = async (start, end) => {
    const dataLength = await axios.get(
      `http://localhost:5000/Blogs`
    );

   if (dataLength.status === 200) {
      setToatalItems(Math.floor(dataLength.data.length / 8 ) + 9);
      setGPage(Math.ceil(dataLength.data.length/ 8 ));
    } else {
      toast.error("Something went wrong");
    }
    const response = await axios.get(
      `http://localhost:5000/Blogs?_start=${start}&_end=${end}`
    );
    if (response.status === 200) {
      setData(response.data);
      setToatalItems(response.data.length);
    } else {
      toast.error("Something went wrong");
    }
  };

  const exerpt = (str, num) => {
    if (str.length > num) {
      str = str.substring(0, num) + " ... ";
    }
    return str;
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure that you want to delete this blog?")) {
      const response = await axios.delete(`http://localhost:5000/Blogs/${id}`);
      if (response.status === 200) {
        loadingBlogsData(0, 8);

      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const inputChange = async (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
    if (!e.target.value) {
      loadingBlogsData((currentPage - 1) * 8, (currentPage - 1) * 8 + 9);

    } else {
      const response = await axios.get(
        `http://localhost:5000/Blogs?q=${searchValue}`
      );
      if (response.status === 200) {
        if (response.data.length > 0) {
          setData(response.data);
        }
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleCategory = async (category) => {
    if (category == "All") {
      loadingBlogsData((currentPage - 1) * 8, (currentPage - 1) * 8 + 8)
    } else {
      const response = await axios.get(
        `http://localhost:5000/Blogs?category=${category}`
      );
      if (response.status === 200) {
        setData(response.data);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const paginateHandler = (e) => {
    setCurrentPage(e);
    e == 1
      ? loadingBlogsData(0, 8)
      : loadingBlogsData((e - 1) * 8, (e - 1) * 8 + 8);
  };

  if (data.length === 0) {
    return <div> Not Blog Found </div>;
  }

  return (
    <div className="container relative mx-auto my-5 px-8 sm:px-0">
      <Search inputChange={inputChange} searchValue={searchValue} />
      <Category options={options} handleCategory={handleCategory} />

      <div className=" grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
        {data &&
          data.map((item, index) => (
            <SingleBlog
              key={index}
              exerpt={exerpt}
              handleDelete={handleDelete}
              {...item}
            />
          ))}
      </div>
      <div className="pt-4 text-blue-900">
        <Paginator
          page={currentPage}
          pageSize={8}
          pageGroupSize={gPage}
          totalItems={gPage * 8}
          callback={paginateHandler}
          styles={paginateStyles}
        />
      </div>
    </div>
  );
};

export default Home;
