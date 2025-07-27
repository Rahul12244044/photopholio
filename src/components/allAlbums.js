import React from "react";
import allAlbumsCssModule from "../cssModules/allAlbums.module.css";
import AddAlbum from "./addAlbums.js";
import {useEffect} from "react";
import {getDocs,collection,onSnapshot} from "firebase/firestore";
import db from "../fireStore.js";
const AllAlbums=({allAlbums,renderHideAddAlbum,renderOneAlbum,renderShowAddAlbum,showAddAlbum,setAllAlbums,addAlbum})=>{
    useEffect(()=>{

        const uSub=onSnapshot(collection(db,"albums"),(snapShot)=>{
            const albums=snapShot.docs.map((elm)=>{
                return {id:elm.id,...elm.data()}
            });
            console.log("relaTimeUpdate");
            console.log(albums);
            setAllAlbums(albums);
        })
    },[])
    return (
    <>
    {showAddAlbum?<AddAlbum allAlbums={allAlbums} setAllAlbums={setAllAlbums} addAlbum={addAlbum}/>:null}
    <div className={allAlbumsCssModule.albumListTop}>
                <h3 className={allAlbumsCssModule.albums}>Your albums</h3>
                {showAddAlbum?<button onClick={()=>renderHideAddAlbum()} className={allAlbumsCssModule.cancelButton}>Cancel</button>:<button onClick={()=>renderShowAddAlbum()} className={allAlbumsCssModule.addAlbumsButton}>Add album</button>}
                
            </div>
            <div className={allAlbumsCssModule.allAlbums}>
                {allAlbums.map((elm)=>{
                    console.log(elm);
                    return (
                    <>
                    <div key={elm.id} onClick={()=>renderOneAlbum(elm)} className={allAlbumsCssModule.oneAlbum}>
                    <img className={allAlbumsCssModule.albumImage} src="https://mellow-seahorse-fc9268.netlify.app/assets/photos.png" alt="images"/>
                    <span className={allAlbumsCssModule.myFolderName}>{elm.name}</span>
                    </div>
                    </>)
                })}     
            </div>
    </>) 
}
export default AllAlbums;