import React from "react";
import photofolioCssModule from "../cssModules/photofolio.module.css";
import AddAlbum from "./addAlbums.js";
import OneAlbum from "./oneAlbum.js";
import AllAlbums from "./allAlbums.js";
const PhotoFolio=({renderShowAddAlbum,showAddAlbum,renderHideAddAlbum,setAllAlbums,allAlbums,addAlbum,renderOneAlbum,showOneAlbum,showAllAlbums,backToAllAlbums,renderBack,albumName,renderAddImage,showAddImage,hideAddImage,showFullImage,renderFullImage,renderHideFullImage,imageSrc,allImages,setAllImages,allImagesSet,imageIndex,setImageIndex,changeImageIndexBack,changeImageIndexNext,showUpdate,renderShowUpdate,hideUpdateImage,titleOfImage,updateImageIndex,updateAllImage,deleteImage,deleteOn,manage,allImageIndex,searchImages,setSearchImages,renderAllAlbum})=>{
    console.log("photoFolio");
    console.log(changeImageIndexNext);
    return (
    <>
    <div onClick={()=>renderAllAlbum()} className={photofolioCssModule.photofolio}>
        <img className={photofolioCssModule.photoFolioImage} src="https://mellow-seahorse-fc9268.netlify.app/assets/logo.png" alt="loading..."/>
        <span className={photofolioCssModule.photofolioName}>PhotoFolio</span>
        {/* <span className={photofolioCssModule.Date}>{new Date().toDateString()}</span> */}
    </div>
    {/* {showAddAlbum?<AddAlbum allAlbums={allAlbums} setAllAlbums={setAllAlbums} addAlbum={addAlbum}/>:null} */}
    {/* {showOneAlbum?<OneAlbum/>:null} */}

    <div className={photofolioCssModule.albumList}>
        {showOneAlbum?<OneAlbum backToAllAlbums={backToAllAlbums} renderBack={renderBack} albumName={albumName} renderAddImage={renderAddImage} showAddImage={showAddImage} hideAddImage={hideAddImage} showFullImage={showFullImage} renderFullImage={renderFullImage} renderHideFullImage={renderHideFullImage} imageSrc={imageSrc} allImages={allImages} setAllImages={setAllImages} allImagesSet={allImagesSet} imageIndex={imageIndex} setImageIndex={setImageIndex} changeImageIndexBack={changeImageIndexBack} changeImageIndexNext={changeImageIndexNext} showUpdate={showUpdate} renderShowUpdate={renderShowUpdate} hideUpdateImage={hideUpdateImage} titleOfImage={titleOfImage} updateImageIndex={updateImageIndex} updateAllImage={updateAllImage} deleteImage={deleteImage} deleteOn={deleteOn} manage={manage} allImageIndex={allImageIndex} searchImages={searchImages} setSearchImages={setSearchImages}/>:null}
        {showAllAlbums?<AllAlbums allAlbums={allAlbums} renderHideAddAlbum={renderHideAddAlbum} renderOneAlbum={renderOneAlbum} renderShowAddAlbum={renderShowAddAlbum} addAlbum={addAlbum} setAllAlbums={setAllAlbums} showAddAlbum={showAddAlbum}/>:null}
        

    </div>
    </>)
}
export default PhotoFolio;