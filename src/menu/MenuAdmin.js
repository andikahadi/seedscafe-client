import React, { useState, useEffect } from "react";
import FilterButtons from "./FilterButtons";
import AdminMenuCard from "./AdminMenuCard";

const MenuAdmin = (props) => {
  props.setIsMenuPage(true);

  const [dishes, setDishes] = useState([]);
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [tags, setTags] = useState();
  const [description, setDescription] = useState();
  const [imgUrl, setImgUrl] = useState();
  const serverUri = "https://seedscafe.store";

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleImgUrlChange = (event) => {
    setImgUrl(event.target.value);
  };

  const handleUpdateEntry = (index, updatedItem) => {
    setDishes((prevEntries) => {
      const arr = [...prevEntries];
      arr[index] = updatedItem;
      return arr;
    });
  };

  const handleDeleteEntry = (index) => {
    setDishes((prevEntry) => {
      const arr = [...prevEntry];
      const filtered = arr.filter((d, i) => i !== index);
      return filtered;
    });
  };

  const handleNewEntry = (enteredData) => {
    setDishes((prevEntry) => [...prevEntry, enteredData]);
  };

  const handleCreate = async () => {
    const res = await fetch(serverUri + "/menu/newmenuitem", {
      method: "PUT",
      body: JSON.stringify({
        name,
        price: parseInt(price),
        category,
        tags,
        description,
        img: imgUrl,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const createdData = await res.json();
    console.log(createdData);

    handleNewEntry(createdData);
    setName("");
    setPrice("");
    setCategory("");
    setTags("");
    setDescription("");
    setImgUrl("");
  };

  const handleCatSelectedChange = (input) => {
    props.setCatSelected(input);
  };

  const fetchCategoryItems = async () => {
    const res = await fetch(
      serverUri + "/menu/findbycategory/" + props.catSelected
    );
    const data = await res.json();
    setDishes(data);
  };

  useEffect(() => {
    fetchCategoryItems();
  }, [props.catSelected]);

  //===============creates a new array with the different Menu Categories============

  const menuItems = [...new Set(props.FullMenu.map((dish) => dish.category))];
  //==========filtering dishes based on Category Clicked, to show on cards===========

  const filterDish = (curentCategory) => {
    const newDish = props.FullMenu.filter((newDish) => {
      return newDish.category === curentCategory;
    });
  };

  //==================================================================================
  return (
    <div className="menu--main--container">
      <div className="admin--form--container">
        <div className="admin--row--container">
          <label>Menu Name</label>
          <input type="text" onChange={handleNameChange} value={name}></input>
        </div>
        <div className="admin--row--container">
          <label>Price</label>
          <input
            type="number"
            onChange={handlePriceChange}
            value={price}
          ></input>
        </div>
        <div className="admin--row--container">
          <label>Category</label>
          <input
            type="text"
            onChange={handleCategoryChange}
            value={category}
          ></input>
        </div>
        <div className="admin--row--container">
          <label>Tags</label>
          <input type="text" onChange={handleTagsChange} value={tags}></input>
        </div>
        <div className="admin--row--container">
          <label>Description</label>
          <textarea
            type="text"
            onChange={handleDescriptionChange}
            value={description}
          ></textarea>
        </div>
        <div className="admin--row--container">
          <label>Image URL</label>
          <input
            type="text"
            onChange={handleImgUrlChange}
            value={imgUrl}
          ></input>
        </div>
        <div className="admin--row--container">
          <button onClick={handleCreate}>Submit</button>
        </div>
      </div>

      <div className="filter--container">
        <FilterButtons
          filterDish={filterDish}
          setDishes={setDishes}
          menuItems={menuItems}
          handleCatSelectedChange={handleCatSelectedChange}
          catSelected={props.catSelected}
        />
      </div>
      <div className="menu--items--container">
        {dishes.map((data, index) => {
          return (
            <AdminMenuCard
              data={data}
              index={index}
              handleUpdateEntry={handleUpdateEntry}
              handleDeleteEntry={handleDeleteEntry}
              FullMenu={props.FullMenu}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MenuAdmin;
