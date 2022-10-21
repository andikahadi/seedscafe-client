import React from "react";

const OrderCard = (props) => {
  return (
    <div className="single--orderCard--container">
      <div className="orderCard--image">
        <img src={props.data.img} alt="" />
      </div>
      <div className="orderCard--text">
        <div className="orderCard--title">
          <label className="orderCard--name">{props.data.name}</label>
          <label>${props.data.price * props.data.quantity}</label>
        </div>
        <div className="orderCard--qty">
          <p>Qty: {props.data.quantity}</p>
        </div>
        <div className="orderCard--request">
          <p>Special Request: {props.data.specialRequest}</p>
        </div>
      </div>

      <div className="orderCard--price"></div>
    </div>
  );
};

export default OrderCard;
