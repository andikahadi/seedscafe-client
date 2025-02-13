import React, { useState, useEffect } from "react";
import Home from "./home/Home";
import Footer from "./Footer";
import Art from "./art/Art";
import { Route, Routes } from "react-router-dom";
import ArtGallery from "./art/ArtGallery";
import SpecificArtworkPage from "./art/SpecificArtworkPage";
import AdminArtwork from "./art/AdminArtwork";
import CashierAdmin from "./menu/CashierAdmin";
import OrderSubmission from "./menu/OrderSubmission";
import MenuCategory from "./menu/MenuCategory";
import Menu from "./menu/Menu";
import NavBar from "./NavBar";
import CartPage from "./cart/CartPage";
import DineInModal from "./menu/DineInModal";
import SpecificItem from "./menu/SpecificItem";
import Modal from "./components/Modal";
import OrderList from "./menu/OrderList";
import OrderStateContainer from "./menu/OrderStateContainer";

import MenuAdmin from "./menu/MenuAdmin";
import MenuStateContainer from "./menu/menuStateContainer";
import { CastleTwoTone } from "@mui/icons-material";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [artGalleryHeader, setArtGalleryHeader] = useState("");
  const [artGalleryPopulate, setArtGalleryPopulate] = useState([]);
  const [specificArtworkDetails, setSpecificArtworkDetails] = useState([]);
  const [cartArtDetails, setCartArtDetails] = useState([]);
  const [shoppingCartNumber, setShoppingCartNumber] = useState("none");
  const [totalAmount, setTotalAmount] = useState("");
  const [checkOut, setCheckOut] = useState(false);
  const [makePayment, setMakePayment] = useState(false);
  const [confirmationPage, setConfirmationPage] = useState(false);
  const [isMenuPage, setIsMenuPage] = useState(false);
  const [catSelected, setCatSelected] = useState("All Day Breakfast");
  const [dishSelected, setDishSelected] = useState("");
  const [menuPage, setMenuPage] = useState("DineInModal");
  const [foodOrder, setFoodOrder] = useState([]);
  const [ArtData, setArtData] = useState([]);
  const [tableNumber, setTableNumber] = useState();
  const [FullMenu, setFullMenu] = useState([]);

  const serverUri = "https://seedscafe.store";
  //========================menu - fetch data from DB==========================
  const fetchMenuItems = async () => {
    const res = await fetch(serverUri + "/menu/allmenuitems");
    const data = await res.json();
    setFullMenu(data);
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  //========================fetch data from DB==========================
  const fetchArtData = async () => {
    const res = await fetch(serverUri + "/artwork/allartwork");
    const data = await res.json();
    return data;
  };

  const fetchArtistData = async () => {
    const res = await fetch(serverUri + "/artist/allartist");
    const data = await res.json();
    return data;
  };

  const getArtData = async () => {
    try {
      const artRes = await fetchArtData();

      const artistRes = await fetchArtistData();

      const fullArtData = await artRes.map((artRes) => {
        let img;
        if (artRes.img) {
          try {
            img = artRes.img;
          } catch (e) {
            img = "https://via.placeholder.com/500";
          }
        } else {
          img = "https://via.placeholder.com/500";
        }
        let category = artRes.category;
        let artistName = artRes.artistName;
        let artName = artRes.artName;
        let description = artRes.description;
        let price = artRes.price;
        let physicalSize = artRes.physicalSize;
        let physicalMaterial = artRes.physicalMaterial;
        let artistDescription;
        if (artRes.artistName) {
          for (let j = 0; j < artistRes.length; j++) {
            if (artRes.artistName === artistRes[j].artistName) {
              artistDescription = artistRes[j].artistDescription;
            }
          }
        } else {
          artistDescription = "Not Found";
        }

        let gender;
        if (artRes.artistName) {
          for (let j = 0; j < artistRes.length; j++) {
            if (artRes.artistName === artistRes[j].artistName) {
              gender = artistRes[j].gender;
            }
          }
        } else {
          gender = "Not Found";
        }
        let id = artRes._id;
        return {
          img,
          category,
          artistName,
          artName,
          description,
          price,
          physicalSize,
          physicalMaterial,
          artistDescription,
          gender,
          id,
        };
      });
      setArtData(fullArtData);
    } catch (e) {
      console.log("Error in fetching.");
    }
  };

  //===================Use Effect to run fetch function upon mount======================
  useEffect(() => {
    getArtData();
  }, [cartArtDetails]);

  const handleTableNumber = (value) => {
    setTableNumber(value);
  };

  return (
    <div>
      <div className="main--app--container">
        {openModal ? (
          <Modal
            setOpenModal={setOpenModal}
            setCheckOut={setCheckOut}
            setMakePayment={setMakePayment}
            setConfirmationPage={setConfirmationPage}
          />
        ) : (
          <></>
        )}
        <div className="main--app--inner-container">
          {/* hide the navbar when menu is opened*/}
          <NavBar
            setOpenModal={setOpenModal}
            shoppingCartNumber={shoppingCartNumber}
            cartArtDetails={cartArtDetails}
            setTotalAmount={setTotalAmount}
            setCheckOut={setCheckOut}
            isMenuPage={isMenuPage}
            setMakePayment={setMakePayment}
            setConfirmationPage={setConfirmationPage}
          />
          <Routes>
            <Route path="/" element={<Home setOpenModal={setOpenModal} />} />
            <Route
              path="/art"
              element={
                <Art
                  ArtData={ArtData}
                  setArtGalleryHeader={setArtGalleryHeader}
                  setArtGalleryPopulate={setArtGalleryPopulate}
                />
              }
            />{" "}
            <Route
              path="/artgallery"
              element={
                <ArtGallery
                  artGalleryHeader={artGalleryHeader}
                  artGalleryPopulate={artGalleryPopulate}
                  setSpecificArtworkDetails={setSpecificArtworkDetails}
                />
              }
            />
            <Route
              path="/artdetails"
              element={
                <SpecificArtworkPage
                  artGalleryHeader={artGalleryHeader}
                  setArtGalleryHeader={setArtGalleryHeader}
                  specificArtworkDetails={specificArtworkDetails}
                  ArtData={ArtData}
                  setSpecificArtworkDetails={setSpecificArtworkDetails}
                  setCartArtDetails={setCartArtDetails}
                  cartArtDetails={cartArtDetails}
                  setShoppingCartNumber={setShoppingCartNumber}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <CartPage
                  cartArtDetails={cartArtDetails}
                  setCartArtDetails={setCartArtDetails}
                  setShoppingCartNumber={setShoppingCartNumber}
                  totalAmount={totalAmount}
                  setTotalAmount={setTotalAmount}
                  setCheckOut={setCheckOut}
                  checkOut={checkOut}
                  setMakePayment={setMakePayment}
                  makePayment={makePayment}
                  confirmationPage={confirmationPage}
                  setConfirmationPage={setConfirmationPage}
                />
              }
            />
            {/* <Route
              path="/adminartwork"
              element={<AdminArtwork ArtData={ArtData} />}
            /> */}
            <Route
              path="/foodmenu"
              element={
                <MenuStateContainer
                  isMenuPage={isMenuPage}
                  setIsMenuPage={setIsMenuPage}
                  menuPage={menuPage}
                  setMenuPage={setMenuPage}
                  catSelected={catSelected}
                  setCatSelected={setCatSelected}
                  dishSelected={dishSelected}
                  setDishSelected={setDishSelected}
                  setFoodOrder={setFoodOrder}
                  handleTableNumber={handleTableNumber}
                  tableNumber={tableNumber}
                  FullMenu={FullMenu}
                  setFullMenu={setFullMenu}
                />
              }
            />
            <Route
              path="/foodorder"
              element={
                <OrderStateContainer
                  setIsMenuPage={setIsMenuPage}
                  setMenuPage={setMenuPage}
                  foodOrder={foodOrder}
                  setFoodOrder={setFoodOrder}
                  tableNumber={tableNumber}
                />
              }
            />
            <Route
              path="/menuadmin"
              element={
                <MenuAdmin
                  setIsMenuPage={setIsMenuPage}
                  FullMenu={FullMenu}
                  setFullMenu={setFullMenu}
                  catSelected={catSelected}
                  setCatSelected={setCatSelected}
                />
              }
            />
            <Route path="/cashieradmin" element={<CashierAdmin />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
