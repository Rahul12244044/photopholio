import React from "react";
import oneAlbumCssModule from "../cssModules/oneAlbum.module.css";
import {useState,useEffect} from "react";
import AddImage from "./addImage.js";
import UpdateImage from "./updateImage.js";
import allImages from "../images/images.js";
import {collection,getDocs,onSnapshot} from "firebase/firestore";
import db from "../fireStore.js";
const OneAlbum=({backToAllAlbums,changeImageIndexNext,renderBack,albumName,renderAddImage,showAddImage,hideAddImage,showFullImage,renderFullImage,renderHideFullImage,imageSrc,allImages,setAllImages,allImagesSet,imageIndex,setImageIndex,changeImageIndexBack,showUpdate,renderShowUpdate,hideUpdateImage,titleOfImage,updateImageIndex,updateAllImage,deleteImage,deleteOn,manage,allImageIndex,searchImages,setSearchImages})=>{
    const [search,setSearch]=useState(false);
    const [searchValue,setSearchValue]=useState("");
    const [searchImage,setSearchImage]=useState([]);
    const [isSearch,setIsSearch]=useState(false);
    useEffect(()=>{
        // const fetchImages=async ()=>{
        // const collectionRef=collection(db,albumName.name);
        // const snapShots=await getDocs(collectionRef);
        // const images=snapShots.docs.map((elm)=>elm.data());
        // setAllImages(images);
        // }
        // fetchImages();
        // Realtime update onSnapShot
        const unSub=onSnapshot(collection(db,albumName.name),(snapShot)=>{
            const images=snapShot.docs.map((elm)=>{
                return {id:elm.id,...elm.data()};
            });
            setAllImages(images);
        })
    },[])
    const showSearchAndCancelButton=()=>{
        {search?setSearch(false):setSearch(true)};
    }
    const searchImagess=(event)=>{
    const title = event.target.value.toLowerCase().trim(); // Case-insensitive and trim spaces
    setSearchValue(title);
    if(title === "") {
        setSearchImage(allImages);
        setIsSearch(false);
    } else{
        const images = allImages.map((elm,index) =>({...elm,index})).filter((elm,index) => {
            if(elm.title.toLowerCase()===title){
                return {elm,index};
            }});
        
        setSearchImage(images);
        setSearchImages(images);
        console.log(images);
        console.log("searchImage");
        console.log(searchImage);
        console.log("search search search search search");
        setIsSearch(true);

    }
    }
   
    // console.log("allImages");
    // console.log(allImages);
    console.log("showFullImage");
    console.log(showFullImage)
    console.log("showUpdate");
    console.log(showUpdate);
    console.log("deleteOn");
    console.log(deleteOn);
    console.log("manage");
    console.log(manage);
    console.log("allImages");
    console.log(allImages);
    console.log("imageIndex",imageIndex);
    return (
        
    <>
    {showUpdate?<UpdateImage titleOfImage={titleOfImage} allImages={allImages} updateImageIndex={updateImageIndex} updateAllImage={updateAllImage} searchImage={searchImage} isSearch={isSearch} allImageIndex={allImageIndex}/>:null}

    {showAddImage && !showUpdate?<AddImage albumName={albumName} allImages={allImages} setAllImages={setAllImages} allImagesSet={allImagesSet}/>:null}
    <div>
    {showFullImage && !showUpdate && !deleteOn?<div className={oneAlbumCssModule.showFullImage}>
        <button onClick={()=>renderHideFullImage()} className={oneAlbumCssModule.cancelButton}>X</button>
        <button onClick={()=>changeImageIndexBack(imageIndex,isSearch)} className={oneAlbumCssModule.leftButton}>&lt;</button>
        <div className={oneAlbumCssModule.fullImage}>
            <img className={oneAlbumCssModule.fullImages} src={
                isSearch?(searchImage[imageIndex].imageSrc):allImages[imageIndex].imageSrc
                } alt="images"/>
        </div>
        <button onClick={()=>changeImageIndexNext(imageIndex,isSearch,searchImage.length)} className={oneAlbumCssModule.rightButton}>&gt;</button>
    </div>:null}
    <div className={oneAlbumCssModule.imageListTop}>
        <div className={oneAlbumCssModule.ContainBackAndName}>
            <span className={oneAlbumCssModule.containBackImage}><img onClick={()=>renderBack()} className={oneAlbumCssModule.backImage} src="https://mellow-seahorse-fc9268.netlify.app/assets/back.png"/></span>
        </div>
        {allImages.length>0?<h1 className={oneAlbumCssModule.albumNames}>Images in {albumName.name}</h1>:<h1 className={oneAlbumCssModule.noImages}>No images found in the album.</h1>}
        {allImages.length>0?<div className={oneAlbumCssModule.imageListSearch}>
            {search?<input onChange={searchImagess} className={oneAlbumCssModule.searchAlbum} placeholder="Search..."/>:null}
            <img onClick={showSearchAndCancelButton} className={oneAlbumCssModule.cancelImage} src={search?"https://mellow-seahorse-fc9268.netlify.app/assets/clear.png":"https://mellow-seahorse-fc9268.netlify.app/assets/search.png"} alt="image"/>
        </div>:null}
        {showAddImage || showUpdate?<button onClick={()=>{
            if(showAddImage){
             hideAddImage();
            }
            if(showUpdate){
                hideUpdateImage();
            }

        }} className={oneAlbumCssModule.cancelImages}>cancel</button>:<button onClick={()=>renderAddImage()} className={oneAlbumCssModule.addImage}>Add Image</button>}
    </div>
    <div className={oneAlbumCssModule.allImages}>
        {searchImages.length>=0 && isSearch?(searchImages.map((elm,index)=>{
            console.log("isSearch");
            console.log("ssssssssssssssssssssssssssssssssssssss");
            return (
            <>
            <div className={oneAlbumCssModule.oneImage}>
            <div onClick={()=>renderShowUpdate(elm.title,index,elm.index,isSearch,elm.id,albumName)} className={oneAlbumCssModule.updateImage}>
                <img  className={oneAlbumCssModule.updateImages} src="https://mellow-seahorse-fc9268.netlify.app/assets/edit.png" alt="update"/>
            </div>
            <div onClick={()=>deleteImage(index,elm.index,isSearch,elm.id,albumName)} className={oneAlbumCssModule.deleteImage}>
                <img  className={oneAlbumCssModule.deleteImages} src="https://mellow-seahorse-fc9268.netlify.app/assets/trash-bin.png" alt="delete"/>
            </div>
            <div onClick={()=>renderFullImage(elm.imageSrc,index)} className={oneAlbumCssModule.addImageAndName}>
                <img className={oneAlbumCssModule.addImages} src={elm.imageSrc} alt="images"/>
                <span className={oneAlbumCssModule.imageName}>{elm.title}</span>
            </div>
        </div>
            </>)
        })):allImages.map((elm,index)=>{
            console.log("allImages");
            console.log("allImages isSearch");
            console.log(isSearch);
            console.log("4444444444444444444444444444444");
            return (
            <>
            <div className={oneAlbumCssModule.oneImage}>
            <div onClick={()=>renderShowUpdate(elm.title,index,-1,isSearch,elm.id,albumName)} className={oneAlbumCssModule.updateImage}>
                <img  className={oneAlbumCssModule.updateImages} src="https://mellow-seahorse-fc9268.netlify.app/assets/edit.png" alt="update"/>
            </div>
            <div onClick={()=>deleteImage(index,elm.index,isSearch,elm.id,albumName)} className={oneAlbumCssModule.deleteImage}>
                <img  className={oneAlbumCssModule.deleteImages} src="https://mellow-seahorse-fc9268.netlify.app/assets/trash-bin.png" alt="delete"/>
            </div>
            <div onClick={()=>renderFullImage(elm.imageSrc,index)} className={oneAlbumCssModule.addImageAndName}>
                <img className={oneAlbumCssModule.addImages} src={elm.imageSrc} alt="images"/>
                <span className={oneAlbumCssModule.imageName}>{elm.title}</span>
            </div>
        </div>
            </>)
        })}
    </div>
    </div>
    </>)
}
export default OneAlbum;