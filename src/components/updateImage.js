import React from "react";
import {useState} from "react";
import updateImageCssModule from "../cssModules/updateImage.module.css";
const UpdateImage=({titleOfImage,allImages,updateImageIndex,updateAllImage,searchImage,isSearch,allImageIndex})=>{
    console.log("allImageIndex");
    console.log(allImageIndex);
    console.log("allImageIndex allImageIndex allImageIndex allImageIndex");
    const selectedImage=isSearch?searchImage:allImages;
    console.log("Updation is working");
    console.log(selectedImage);
    console.log("updatedIndex");
    console.log(updateImageIndex);
    const [title,setTitle]=useState(selectedImage[updateImageIndex].title);
    const [imageSrc,setImageSrc]=useState(selectedImage[updateImageIndex].imageSrc);
    const formSubmitHandler=(event)=>{
        event.preventDefault();
        setTitle("");
        setImageSrc("");
    }
    const updateTitle=(event)=>{
        console.log("updateTitle");
        console.log(event.target.value);
        setTitle(event.target.value);
    }
    const updateImageSrc=(event)=>{
        console.log("updateImageSrc");
        console.log(event.target.value);
        setImageSrc(event.target.value);
    }
    return (
    <>
    <div className={updateImageCssModule.addImage}>
        <h1 className={updateImageCssModule.addImageTop}>Update Image {titleOfImage} </h1>
        <form onSubmit={formSubmitHandler} className={updateImageCssModule.formData}>
            <input onChange={updateTitle} className={updateImageCssModule.title} value={title} placeholder="Title"/>
            <input onChange={updateImageSrc} className={updateImageCssModule.title} value={imageSrc} placeholder="Image URL"/>
            <div className={updateImageCssModule.clearAndAddButton}>
                <button className={updateImageCssModule.clearButton}>clear</button>
                <button onClick={()=>updateAllImage({title,imageSrc},updateImageIndex,allImageIndex,isSearch,searchImage)} className={updateImageCssModule.addButton}>update</button>
            </div>
        </form>
    </div>
    </>)
}
export default UpdateImage;