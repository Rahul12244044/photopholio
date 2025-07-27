import React, { useEffect } from "react";
import allAlbumsCssModule from "../cssModules/allAlbums.module.css";
import AddAlbum from "./addAlbums.js";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../fireStore.js";

const AllAlbums = ({
  allAlbums,
  renderHideAddAlbum,
  renderOneAlbum,
  renderShowAddAlbum,
  showAddAlbum,
  setAllAlbums,
  addAlbum,
}) => {
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "albums"), (snapShot) => {
      const albums = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Real-time update:", albums);
      setAllAlbums(albums);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [setAllAlbums]);

  return (
    <>
      {showAddAlbum && (
        <AddAlbum
          allAlbums={allAlbums}
          setAllAlbums={setAllAlbums}
          addAlbum={addAlbum}
        />
      )}

      <div className={allAlbumsCssModule.albumListTop}>
        <h3 className={allAlbumsCssModule.albums}>Your albums</h3>
        {showAddAlbum ? (
          <button
            onClick={renderHideAddAlbum}
            className={allAlbumsCssModule.cancelButton}
          >
            Cancel
          </button>
        ) : (
          <button
            onClick={renderShowAddAlbum}
            className={allAlbumsCssModule.addAlbumsButton}
          >
            Add album
          </button>
        )}
      </div>

      <div className={allAlbumsCssModule.allAlbums}>
        {allAlbums.map((album) => (
          <div
            key={album.id}
            onClick={() => renderOneAlbum(album)}
            className={allAlbumsCssModule.oneAlbum}
          >
            <img
              className={allAlbumsCssModule.albumImage}
              src="https://mellow-seahorse-fc9268.netlify.app/assets/photos.png"
              alt="album"
            />
            <span className={allAlbumsCssModule.myFolderName}>{album.name}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllAlbums;
