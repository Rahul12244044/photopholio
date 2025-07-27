import React from "react";
import photofolioCssModule from "../cssModules/photofolio.module.css";
import OneAlbum from "./oneAlbum";
import AllAlbums from "./allAlbums";

const PhotoFolio = ({
  renderShowAddAlbum,
  showAddAlbum,
  renderHideAddAlbum,
  setAllAlbums,
  allAlbums,
  addAlbum,
  renderOneAlbum,
  showOneAlbum,
  showAllAlbums,
  backToAllAlbums,
  renderBack,
  albumName,
  renderAddImage,
  showAddImage,
  hideAddImage,
  showFullImage,
  renderFullImage,
  renderHideFullImage,
  imageSrc,
  allImages,
  setAllImages,
  allImagesSet,
  imageIndex,
  setImageIndex,
  changeImageIndexBack,
  changeImageIndexNext,
  showUpdate,
  renderShowUpdate,
  hideUpdateImage,
  titleOfImage,
  updateImageIndex,
  updateAllImage,
  deleteImage,
  deleteOn,
  manage,
  allImageIndex,
  searchImages,
  setSearchImages,
  renderAllAlbum
}) => {
  return (
    <>
      <div
        onClick={renderAllAlbum}
        className={photofolioCssModule.photofolio}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === "Enter") renderAllAlbum();
        }}
      >
        <img
          className={photofolioCssModule.photoFolioImage}
          src="https://mellow-seahorse-fc9268.netlify.app/assets/logo.png"
          alt="PhotoFolio Logo"
        />
        <span className={photofolioCssModule.photofolioName}>PhotoFolio</span>
      </div>

      <div className={photofolioCssModule.albumList}>
        {showOneAlbum && (
          <OneAlbum
            backToAllAlbums={backToAllAlbums}
            renderBack={renderBack}
            albumName={albumName}
            renderAddImage={renderAddImage}
            showAddImage={showAddImage}
            hideAddImage={hideAddImage}
            showFullImage={showFullImage}
            renderFullImage={renderFullImage}
            renderHideFullImage={renderHideFullImage}
            imageSrc={imageSrc}
            allImages={allImages}
            setAllImages={setAllImages}
            allImagesSet={allImagesSet}
            imageIndex={imageIndex}
            setImageIndex={setImageIndex}
            changeImageIndexBack={changeImageIndexBack}
            changeImageIndexNext={changeImageIndexNext}
            showUpdate={showUpdate}
            renderShowUpdate={renderShowUpdate}
            hideUpdateImage={hideUpdateImage}
            titleOfImage={titleOfImage}
            updateImageIndex={updateImageIndex}
            updateAllImage={updateAllImage}
            deleteImage={deleteImage}
            deleteOn={deleteOn}
            manage={manage}
            allImageIndex={allImageIndex}
            searchImages={searchImages}
            setSearchImages={setSearchImages}
          />
        )}

        {showAllAlbums && (
          <AllAlbums
            allAlbums={allAlbums}
            renderHideAddAlbum={renderHideAddAlbum}
            renderOneAlbum={renderOneAlbum}
            renderShowAddAlbum={renderShowAddAlbum}
            addAlbum={addAlbum}
            setAllAlbums={setAllAlbums}
            showAddAlbum={showAddAlbum}
          />
        )}
      </div>
    </>
  );
};

export default PhotoFolio;
