import React from "react";
import {useState} from "react";
import addAlbumCssModule from "..//cssModules/addAlbum.module.css";

const AddAlbum=({addAlbum,allAlbums})=>{
    const [albumName,setAlbumName]=useState("");
    // let [totalName,setTotalName]=useState(0);
    const albumsName=(event)=>{
        console.log(event.target.value);
        setAlbumName(event.target.value);
    }
    const formHandler=(event)=>{
        event.preventDefault();
        console.log("formSubmit");
        console.log(allAlbums);
        // const isAlbumFound=allAlbums.find((elm,index)=>);
        // let totalName=0;
        
        // console.log("totalName");
        // console.log(totalName);
        // console.log("isAlbumsFound");
        // console.log(isAlbumFound);
        
        setAlbumName("");

    }
    
    return (
    <>
    {/* <ToastContainer/> */}
    <div className={addAlbumCssModule.addAlbum}>
        <h1 className={addAlbumCssModule.createAlbumName}>Create an album</h1>
        <form onSubmit={formHandler} className={addAlbumCssModule.formToAddAlbum}>
            <input onChange={albumsName} value={albumName} className={addAlbumCssModule.inputAlbum} placeholder="Album Name" required></input>
            <button className={addAlbumCssModule.clearButton}>clear</button>
            <button onClick={()=>addAlbum(albumName)} className={addAlbumCssModule.createButton}>create</button>
        </form>
    </div>
    </>)
}
export default AddAlbum;