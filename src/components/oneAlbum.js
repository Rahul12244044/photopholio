import React, { useState, useEffect } from "react";
import oneAlbumCssModule from "../cssModules/oneAlbum.module.css";
import AddImage from "./addImage.js";
import UpdateImage from "./updateImage.js";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../fireStore.js";

const OneAlbum = ({
  backToAllAlbums,
  changeImageIndexNext,
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
}) => {
  const [search, setSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchImage, setSearchImage] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    const unSub = onSnapshot(collection(db, albumName.name), (snapShot) => {
      const images = snapShot.docs.map((elm) => ({
        id: elm.id,
        ...elm.data(),
      }));
      setAllImages(images);
    });

    return () => unSub();
  }, [albumName.name, setAllImages]);

  const toggleSearchInput = () => setSearch((prev) => !prev);

  const searchImagess = (event) => {
    const title = event.target.value.toLowerCase().trim();
    setSearchValue(title);

    if (title === "") {
      setSearchImage(allImages);
      setIsSearch(false);
    } else {
      const images = allImages
        .map((elm, index) => ({ ...elm, index }))
        .filter((elm) => elm.title.toLowerCase() === title);

      setSearchImage(images);
      setSearchImages(images);
      setIsSearch(true);
    }
  };

  const imageList = isSearch ? searchImages : allImages;

  return (
    <>
      {showUpdate && (
        <UpdateImage
          titleOfImage={titleOfImage}
          allImages={allImages}
          updateImageIndex={updateImageIndex}
          updateAllImage={updateAllImage}
          searchImage={searchImage}
          isSearch={isSearch}
          allImageIndex={allImageIndex}
        />
      )}

      {showAddImage && !showUpdate && (
        <AddImage
          albumName={albumName}
          allImages={allImages}
          setAllImages={setAllImages}
          allImagesSet={allImagesSet}
        />
      )}

      <div>
        {showFullImage && !showUpdate && !deleteOn && (
          <div className={oneAlbumCssModule.showFullImage}>
            <button
              onClick={renderHideFullImage}
              className={oneAlbumCssModule.cancelButton}
            >
              X
            </button>
            <button
              onClick={() => changeImageIndexBack(imageIndex, isSearch)}
              className={oneAlbumCssModule.leftButton}
            >
              &lt;
            </button>
            <div className={oneAlbumCssModule.fullImage}>
              <img
                className={oneAlbumCssModule.fullImages}
                src={
                  isSearch
                    ? searchImage[imageIndex]?.imageSrc
                    : allImages[imageIndex]?.imageSrc
                }
                alt="image"
              />
            </div>
            <button
              onClick={() =>
                changeImageIndexNext(imageIndex, isSearch, imageList.length)
              }
              className={oneAlbumCssModule.rightButton}
            >
              &gt;
            </button>
          </div>
        )}

        <div className={oneAlbumCssModule.imageListTop}>
          <div className={oneAlbumCssModule.ContainBackAndName}>
            <span className={oneAlbumCssModule.containBackImage}>
              <img
                onClick={renderBack}
                className={oneAlbumCssModule.backImage}
                src="https://mellow-seahorse-fc9268.netlify.app/assets/back.png"
                alt="Back"
              />
            </span>
          </div>

          {allImages.length > 0 ? (
            <h1 className={oneAlbumCssModule.albumNames}>
              Images in {albumName.name}
            </h1>
          ) : (
            <h1 className={oneAlbumCssModule.noImages}>
              No images found in the album.
            </h1>
          )}

          {allImages.length > 0 && (
            <div className={oneAlbumCssModule.imageListSearch}>
              {search && (
                <input
                  onChange={searchImagess}
                  className={oneAlbumCssModule.searchAlbum}
                  placeholder="Search..."
                />
              )}
              <img
                onClick={toggleSearchInput}
                className={oneAlbumCssModule.cancelImage}
                src={
                  search
                    ? "https://mellow-seahorse-fc9268.netlify.app/assets/clear.png"
                    : "https://mellow-seahorse-fc9268.netlify.app/assets/search.png"
                }
                alt="Search toggle"
              />
            </div>
          )}

          {(showAddImage || showUpdate) ? (
            <button
              onClick={() => {
                if (showAddImage) hideAddImage();
                if (showUpdate) hideUpdateImage();
              }}
              className={oneAlbumCssModule.cancelImages}
            >
              Cancel
            </button>
          ) : (
            <button
              onClick={renderAddImage}
              className={oneAlbumCssModule.addImage}
            >
              Add Image
            </button>
          )}
        </div>

        <div className={oneAlbumCssModule.allImages}>
          {imageList.map((elm, index) => (
            <div key={elm.id} className={oneAlbumCssModule.oneImage}>
              <div
                onClick={() =>
                  renderShowUpdate(
                    elm.title,
                    index,
                    elm.index ?? -1,
                    isSearch,
                    elm.id,
                    albumName
                  )
                }
                className={oneAlbumCssModule.updateImage}
              >
                <img
                  className={oneAlbumCssModule.updateImages}
                  src="https://mellow-seahorse-fc9268.netlify.app/assets/edit.png"
                  alt="Update"
                />
              </div>

              <div
                onClick={() =>
                  deleteImage(index, elm.index, isSearch, elm.id, albumName)
                }
                className={oneAlbumCssModule.deleteImage}
              >
                <img
                  className={oneAlbumCssModule.deleteImages}
                  src="https://mellow-seahorse-fc9268.netlify.app/assets/trash-bin.png"
                  alt="Delete"
                />
              </div>

              <div
                onClick={() => renderFullImage(elm.imageSrc, index)}
                className={oneAlbumCssModule.addImageAndName}
              >
                <img
                  className={oneAlbumCssModule.addImages}
                  src={elm.imageSrc}
                  alt={elm.title}
                />
                <span className={oneAlbumCssModule.imageName}>{elm.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OneAlbum;
