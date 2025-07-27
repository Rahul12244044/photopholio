
import {useState} from "react";
import PhotoFolio from "./components/photofolio.js";
import AddAlbum from "./components/addAlbums.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import db from "./fireStore.js";
import {collection,addDoc,deleteDoc,doc,updateDoc} from "firebase/firestore"; 
function App() {
  const [showAddAlbum,setShowAddAlbum]=useState(false);
  const [allAlbums,setAllAlbums]=useState([]);
  const [showOneAlbum,setShowOneAlbum]=useState(false);
  const [showAllAlbums,setShowAllAlbums]=useState(true);
  const [backToAllAlbums,setBackToAllAlbums]=useState(false);
  const [showAddImage,setShowAddImage]=useState(false);
  const [albumName,setAlbumName]=useState("");
  const [showFullImage,setShowFullImage]=useState(false);
  const [imageSrc,setImageSrc]=useState("");
  const [allImages,setAllImages]=useState([]);
  const [imageIndex,setImageIndex]=useState(-1);
  const [showUpdate,setShowUpdate]=useState(false);
  const [titleOfImage,setTitleOfImage]=useState("");
  const [updateImageIndex,setUpdateImageIndex]=useState(-1);
  const [deleteOn,setDeleteOn]=useState(false);
  const [manage,setManage]=useState(false);
  const [searchIndex,setSearchIndex]=useState(-1);
  const [allImageIndex,setAllImageIndex]=useState(-1);
  const [searchImages,setSearchImages]=useState([]);
  const [updateId,setUpdateId]=useState("");
  const [albumNameUpdate,setAlbumNameUpdate]=useState("");
  const [totalName,setTotalName]=useState(0);
  console.log("allAlbums");
  console.log(allAlbums);
  const renderShowAddAlbum=()=>{
    setShowAddAlbum(true);
  }
  const renderHideAddAlbum=()=>{
    setShowAddAlbum(false);
  }
  const renderOneAlbum=(nameAlbum)=>{
    console.log("nameAlbum");
    console.log(nameAlbum);
    setAlbumName(nameAlbum);
    setShowOneAlbum(true);
    setShowAllAlbums(false);
    
  }
  const addAlbum=async (name)=>{
    console.log("addAlbum");
   
    
    console.log("allAlbums");
    console.log(name);
    console.log(allAlbums);
    const albumExists = allAlbums.some(elm => elm.name.toLowerCase() === name.toLowerCase());
    if (albumExists) {
    toast.error("Album already exists.");
  } else {
    if (name) {
      const collectionRef = collection(db, "albums");
      await addDoc(collectionRef, { name });
      toast.success("Album is added successfully.");
    }
  }
}
const renderBack=()=>{
  setBackToAllAlbums(true);
  setShowOneAlbum(false);
  setShowAllAlbums(true);
}
const renderAddImage=()=>{
  console.log("renderAddImage");
  setShowAddImage(true);
  setShowUpdate(false);
}
const hideAddImage=()=>{
  setShowAddImage(false);
}
const renderFullImage=(imageSrc,index)=>{
  console.log("index");
  console.log(index);
  setImageIndex(index);
  setShowFullImage(true);
  setImageSrc(imageSrc);
  setManage(true);
  setDeleteOn(false);
}
const renderHideFullImage=()=>{
  setShowFullImage(false);
}
const allImagesSet=(obj)=>{
  console.log("allImagesSet");
  console.log(allImagesSet);
  if(obj.title || obj.imageSrc){
  setAllImages([obj,...allImages]);
  console.log(allImages);
  setShowOneAlbum(true);
  setShowAllAlbums(false);
  }
}
const changeImageIndexBack=(currentIndex,isSearch)=>{
  console.log("currentIndex");
  console.log(currentIndex);
  const nowIndex=currentIndex-1;
  if(nowIndex>=0){
  setImageIndex(nowIndex);
  }
}
const changeImageIndexNext=(currentIndex,isSearch,searchImageLength)=>{
  console.log("aheadCurrentIndex");
  const nowIndex=currentIndex+1;
  if(nowIndex<searchImageLength && isSearch){
    setImageIndex(nowIndex);
  }
  if(nowIndex<allImages.length){
    if(!isSearch){
    setImageIndex(nowIndex)
    }
  }
}
const renderShowUpdate=(titleName,searchIndex,allImageIndex,isSearch,imageId,albumName)=>{
  console.log("renderShowUpdate");
  console.log("isSearch update");
  console.log(isSearch);
  console.log(titleName);
  setShowAddAlbum(false);
  setShowFullImage(false);
  setShowUpdate(true);
  setShowAddImage(false);
  setTitleOfImage(titleName);
  setUpdateImageIndex(searchIndex);
  if(isSearch){
    setAllImageIndex(allImageIndex);
  }
  setManage(false);
  setUpdateId(imageId);
  setAlbumNameUpdate(albumName);
}
const hideUpdateImage=()=>{
  setShowUpdate(false);
  setShowFullImage(false);
}
const updateAllImage=async (updateImage,index,allImageIndex,isSearch,searchImage)=>{
  console.log("updateAllImages");
  console.log(updateImage);
  console.log(index);
  if(isSearch){
  const dupAllImages=searchImage.map((elm)=>elm);
  dupAllImages[index]=updateImage;
  setSearchImages(dupAllImages);
  allImages[allImageIndex]=updateImage;
  setAllImages(allImages);
  }
  await updateDoc(doc(db,albumNameUpdate.name,updateId),{...updateImage,updateOn:new Date()});
  
  setShowUpdate(false);
  setShowFullImage(false);
  toast.success("Image updated successfully.")
}
const deleteImage=async (searchIndex,allImageIndex,isSearch,imageId,albumName)=>{
  console.log("deleteImage");
  console.log(searchIndex,allImageIndex,isSearch);
  console.log("imageId");
  console.log(imageId);
  console.log("albumName");
  console.log(albumName);
  if(isSearch){
    const allSearchImages=searchImages.filter((elm,index)=>index!==searchIndex);
    setSearchImages(allSearchImages);
    const allNewImages=allImages.filter((elm,index)=>index!=allImageIndex);
    setAllImages(allNewImages);
  }
  await deleteDoc(doc(db,albumName.name,imageId));

  setShowUpdate(false);
  setShowFullImage(false);
  console.log("setFullImage",showFullImage);
  setDeleteOn(true);
  setManage(false);

  
    toast.success("Image deleted successfully.");
  
}
const renderAllAlbum=()=>{
  setShowAllAlbums(true);
  setShowOneAlbum(false);
}
  return (
  <>
    <ToastContainer/>
    <PhotoFolio renderShowAddAlbum={renderShowAddAlbum} showAddAlbum={showAddAlbum} renderHideAddAlbum={renderHideAddAlbum} allAlbums={allAlbums} setAllAlbums={setAllAlbums} addAlbum={addAlbum} renderOneAlbum={renderOneAlbum} showOneAlbum={showOneAlbum} showAllAlbums={showAllAlbums} backToAllAlbums={backToAllAlbums} renderBack={renderBack} albumName={albumName} renderAddImage={renderAddImage} showAddImage={showAddImage} hideAddImage={hideAddImage} showFullImage={showFullImage} renderFullImage={renderFullImage} renderHideFullImage={renderHideFullImage} imageSrc={imageSrc} allImages={allImages} setAllImages={setAllImages} allImagesSet={allImagesSet} imageIndex={imageIndex} setImageIndex={setImageIndex} changeImageIndexBack={changeImageIndexBack} changeImageIndexNext={changeImageIndexNext} showUpdate={showUpdate} renderShowUpdate={renderShowUpdate} hideUpdateImage={hideUpdateImage} titleOfImage={titleOfImage} updateImageIndex={updateImageIndex} updateAllImage={updateAllImage} deleteImage={deleteImage} deleteOn={deleteOn} manage={manage} allImageIndex={allImageIndex} searchImages={searchImages} setSearchImages={setSearchImages} renderAllAlbum={renderAllAlbum}/>
  </>)
  
  
}

export default App;
