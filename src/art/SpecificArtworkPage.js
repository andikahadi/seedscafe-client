import React from "react";
import deliveryIcon from "../assets/art/specificartwork/deliveryicon.svg";
import femalePfp from "../assets/art/specificartwork/femalepfp.svg";
import malePfp from "../assets/art/specificartwork/malepfp.png";
import pfpCircle from "../assets/art/specificartwork/pfpcircle.svg";

const SpecificArtworkPage = ({
  artGalleryHeader,
  setArtGalleryHeader,
  specificArtworkDetails,
  ArtData,
  setSpecificArtworkDetails,
  setCartArtDetails,
  cartArtDetails,
  setShoppingCartNumber,
}) => {
  //======================================functions========================================
  //after clicking the "otherArtWork" box, we will set the SpecificArtworkDetails to that "otherArtWork"
  const handleOtherArtworkClick = (otherArtWork) => {
    setSpecificArtworkDetails(otherArtWork);
    setArtGalleryHeader(otherArtWork);
    // console.log(otherArtWork.category);
  };

  // x = removing current artwork from the array. leaving the remaining in the array
  const x = ArtData.filter(
    (d, i) => d.artName !== specificArtworkDetails.artName
  );

  // z = using x's array to filter out current artwork's artists' "other" works
  const z = x.filter(
    (d, i) => d.artistName === specificArtworkDetails.artistName
  );

  const y = z.slice(0, 2);

  const handleAddToCart = (artdata) => {
    const itemsInCart = [...cartArtDetails, artdata];
    setCartArtDetails(itemsInCart);
    setShoppingCartNumber(itemsInCart.length);
  };
  //========================================================================================

  return (
    <div className="art--main--container">
      <div className="art--top--container">
        <div className="art--title">{artGalleryHeader.category}</div>
        <div className="art--back--arrow">
          {/* <Link to="/artgallery">
            <img src={backArrow} alt="images"></img>
          </Link> */}
        </div>
        <div className="art--shoppingcart">
          {/* <img src={shoppingCart} alt="images"></img> */}
        </div>
      </div>
      <div className="specific--art--gallery--middle--container">
        <div className="specific--art--gallery--image--container">
          <img
            src={specificArtworkDetails.img}
            className="specific--art--gallery--image"
            alt="images"
          />
        </div>
        <div className="art--gallery--description--container">
          <p className="art--gallery--description--artistname">
            {specificArtworkDetails.artistName}
          </p>
          <p className="art--gallery--description--artname">
            {specificArtworkDetails.artName}
          </p>
          <div className="art-gallery--description--bulletlists">
            <ul>
              <li className="art-gallery--description--bulletlists--text">
                {specificArtworkDetails.physicalSize}
              </li>
              <li className="art-gallery--description--bulletlists--text">
                {specificArtworkDetails.physicalMaterial}
              </li>
            </ul>
          </div>
          <div className="art-gallery--description--artistdescription">
            <p>{specificArtworkDetails.description}</p>
          </div>
        </div>
        <div className="art--gallery--addtocart--container">
          <div className="art--gallery--addtocart--container--topsection">
            <img src={deliveryIcon} className="delivery--icon" alt="images" />
            <p className="delivery--details">Free local delivery or pick up</p>
          </div>
          <div className="art--gallery--addtocart--container--bottomsection">
            <button
              className="art--add--to--cart--button"
              onClick={() => {
                handleAddToCart(specificArtworkDetails);
              }}
            >
              <p className="art--add--to--cart--text">Add to Cart</p>
            </button>
            <hr className="art--gallery--horizontal--line"></hr>
          </div>
        </div>
      </div>
      <div className="specific--art--gallery--bottom--container">
        <div className="specific--art--gallery--artist--description--container">
          <div className="specific--art--gallery--artist--description--container--top">
            <div className="artistpfp--name--box">
              <img src={pfpCircle} className="artistpfp--circle" alt="images" />
              {specificArtworkDetails.gender === "F" ? (
                <img src={femalePfp} className="artistpfp" alt="images" />
              ) : (
                <img src={malePfp} className="artistpfpMale" alt="images"></img>
              )}
              <div className="artist--description--box">
                <div className="artist--description--box--title">Artist</div>
                <div className="artist--description--box--name">
                  {specificArtworkDetails.artistName}
                </div>
              </div>
            </div>
            <div className="artistpfp--biography--box">
              {specificArtworkDetails.artistDescription}
            </div>
          </div>
          <div className="specific--art--gallery--artist--description--container--bottom"></div>
        </div>
        <hr className="art--gallery--horizontal--line--2"></hr>
        <div className="other--artworks--container">
          <p className="other--artworks--container--title">
            Other Artworks by {specificArtworkDetails.artistName}
          </p>
          <div className="other--artworks--container--for--artworks">
            {y.map((otherArtWorks) => {
              return (
                <div
                  onClick={() => {
                    handleOtherArtworkClick(otherArtWorks);
                  }}
                  key={Math.random() * 10000}
                  className="other--artworks--individual--container"
                >
                  <div className="other--artworks--image--box">
                    <img
                      src={otherArtWorks.img}
                      className="other--artworks--image"
                      alt="images"
                    />
                  </div>
                  <div className="other--artworks--textbox">
                    <div className="other--artworks--textbox--title">
                      {otherArtWorks.artName}
                    </div>
                    <div className="other--artworks--textbox--artistName">
                      {otherArtWorks.artistName}
                    </div>
                    <div className="other--artworks--textbox--price">
                      ${Number(otherArtWorks.price).toFixed(2)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificArtworkPage;
