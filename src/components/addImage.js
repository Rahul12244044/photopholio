import React from "react";
import {useState} from "react";
import addImageCssModule from "../cssModules/addImage.module.css";
import {collection,addDoc} from "firebase/firestore";
import db from "../fireStore.js";
const AddImage=({albumName,allImages,setAllImages,allImagesSet})=>{
    const [formData,setFormData]=useState({title:"",imageSrc:""});
    const [title,setTitle]=useState("");
    const [imageSrc,setImageSrc]=useState("");
    const getTitle=(event)=>{
        console.log(event.target.value);
        setTitle(event.target.value);
    }
    const getImageSrc=(event)=>{
        console.log("getImageSrc");
        console.log(event.target.value);
        setImageSrc(event.target.value);
    }
    const formSubmit=async (event)=>{
        event.preventDefault();
        const collectionRef=collection(db,albumName.name);
        await addDoc(collectionRef,{title,imageSrc,createOn:new Date()});
        setTitle("");
        setImageSrc("");
    }
    return (
    <>
    <div className={addImageCssModule.addImage}>
        <h1 className={addImageCssModule.addImageTop}>Add image to {albumName.name} </h1>
        <form onSubmit={formSubmit} className={addImageCssModule.formData}>
            <input onChange={getTitle} className={addImageCssModule.title} value={title} placeholder="Title" required/>
            <input onChange={getImageSrc} className={addImageCssModule.title} value={imageSrc} placeholder="Image URL" required/>
            <div className={addImageCssModule.clearAndAddButton}>
                <button className={addImageCssModule.clearButton}>clear</button>
                <button onClick={()=>{allImagesSet({title,imageSrc})}} className={addImageCssModule.addButton}>Add</button>
            </div>
        </form>

    </div>
    </>)
}
export default AddImage;