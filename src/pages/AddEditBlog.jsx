import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { firebaseConfig } from "../firebase";
import spinner from "../../public/images/Spinner-1s-200px.svg";

const initialState = {
  title: "",
  description: "",
  category: "",
  imgUrl: "",
};

const dataValidation = {
  titleV: true,
  descriptionV: true,
  categoryV: true,
  imgUrlV: true,
};

const options = ["Sports", "Fashion", "Fitness", "Travel", "Tech", "Food"];

const AddEditBlog = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [showUploading, setShowUploading] = useState();
  const [valid, setValid] = useState(dataValidation);
  const [editMode, setEditMode] = useState(false);
  const { title, description, category, imgUrl } = formValue;
  const { titleV, descriptionV, categoryV, imgUrlV } = valid;

const {id} = useParams();
const inputRef = useRef();
useEffect(()=> {

  if(id){
    setEditMode(true)
    getSingleBlog()
    inputRef.current.value = imgUrl 
  }else {
    setEditMode(false);
    setFormValue({...initialState})
  }
},[id])

const getSingleBlog = async () => {
  const singleBlog = await axios.get(`http://localhost:5000/Blogs/${id}`);
  if( singleBlog.status === 200){
    setFormValue({...singleBlog.data});
  }else {
    toast.error("Something went wrong");
  }

}

  const navigate = useNavigate();
  const onCategoryChange = (e) => {
    if (`${e.target.name}V`) {
      setValid((current) => ({ ...current, [`${e.target.name}V`]: true }));
    }
    setFormValue((current) => ({
      ...current,
      category: e.target.value,
    }));
  };
  const onInputChange = (e) => {
    if (`${e.target.name}V`) {
      setValid((current) => ({ ...current, [`${e.target.name}V`]: true }));
    }
    const myvalue = e.target.value.trimStart();
    setFormValue((current) => ({
      ...current,
      [e.target.name]: myvalue,
    }));
  };
  const onUploadImage = (e) => {
    // if(e.target.files[0] ){

      let file = e.target.files[0];
    // }
    if (`${e.target.name}V`) {
      setValid((current) => ({ ...current, [`${e.target.name}V`]: true }));
    }
    setShowUploading( (current) => true);
    const uploadUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o?name=${file.name}`;
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    axios
      .post(uploadUrl, formData, {
        headers: {
          "Content-Type": "image/jpeg", // replace with the correct file type
        },
      })
      .then((response) => {
        const url = `https://firebasestorage.googleapis.com/v0/b/weblog-proj.appspot.com/o/${file.name}?alt=media`;
        setFormValue((current) => ({ ...current, imgUrl: url }));
      })
      .catch((error) => {
        inputRef.current.value = ""
        console.error("Error occurred while uploading:", error);
        toast.error("Image can not Uploaded");
      }).finally(() => {
        setShowUploading((current) =>false);

      })
  };
  const getDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy 
    return today;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      setValid((current) => ({ ...current, titleV: false }));
    }

    if (!description) {
      setValid((current) => ({ ...current, descriptionV: false }));
    }
    if (!imgUrl || imgUrl == "") {
      setValid((current) => ({ ...current, imgUrlV: false }));
    }

    if (!category) {
      setValid((current) => ({ ...current, categoryV: false }));
    }
    if( title && description && category && imgUrl ){
      const currentDate = getDate();
      if(!editMode){
         const updatedFormValue = {...formValue , date : currentDate};
      const response = await axios.post("http://localhost:5000/Blogs" , updatedFormValue);
      if(response.status === 201 ) {
        toast.success("Blog created successfully");
        setValid(dataValidation);
        navigate("/");
      }else{
        toast.error('Something went wrong');
      }
      }else {
        const updatedFormValue = {...formValue , date : currentDate};
        const response = await axios.put(`http://localhost:5000/Blogs/${id}` , updatedFormValue);
        if(response.status === 200 ) {
          toast.success("Blog updated successfully");
          setValid(dataValidation);
          navigate("/");
        }else{
          toast.error('Something went wrong');
        }
      }
     
      setFormValue(initialState);
     inputRef.current.value = "";

    }
  };

  return (
    <div className="mx-auto text-center p-5 sm:p-10 max-w-2xl">
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <p className="font-bold text-xl sm:text-4xl mb-3 uppercase">{ editMode ? "update blog" : "Add Blog"}</p>

        <input
          className={`shadow ${
            !titleV && "border-red-600"
          } appearance-none  border rounded w-full my-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-gray-300`}
          name="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={onInputChange}
        />

        <br />
        <textarea
          className={`shadow ${
            !descriptionV && "border-red-600 "
          } appearance-none border rounded w-full min-h-[120px] my-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  focus:border-gray-300`}
          name="description"
          type="text"
          placeholder="Description"
          value={description}
          onChange={onInputChange}
        />
        <br />
        <div className="relative flex items-center">
          <input
            className={`shadow  ${
              !imgUrlV && "border-red-600"
            } appearance-none border rounded w-full my-2 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline  focus:border-gray-300`}
            name="imgUrl"
            type="file"
            placeholder="Description"
            ref={inputRef}
            onChange={(e) => onUploadImage(e)}
          />
          {showUploading && (
            <img className="  absolute w-11 right-2" src={spinner} />
          )}
        </div>
        <br />


        <select
          onClick={(e) => onCategoryChange(e)}
          name="category"
          id="countries_disabled"
          className={`shadow ${
            !categoryV && "border-red-600"
          } border rounded w-full my-2 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline  focus:border-gray-300`}
        >
          <option value={""}>Please select category</option>
          {options.map((option, index) => (
            <option key={index} value={option || ""} selected={option === category}>
              {option}
              
            </option>
          ))}
        </select>

        {/* ///////////////////////////////////////////////// */}
        <div className="flex justify-center space-x-1 py-4">
          <button
          disabled={showUploading}
            type="submit"
            className="bg-blue-700 uppercase text-white transition duration-200 ease-in-out hover:bg-blue-800 py-2 px-5 rounded"
          >
            {editMode ? "update" : "Add"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-500 uppercase text-white transition duration-200 ease-in-out hover:bg-gray-600 py-2 px-5 rounded"
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditBlog;
