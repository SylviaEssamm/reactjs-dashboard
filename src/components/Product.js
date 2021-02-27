import React from "react";
import { Card } from "antd";
import Moment from "react-moment";

const { Meta } = Card;

const Price = ({ price, discountPrice }) => {
  const isDiscount = discountPrice !== null;
  return (
    <div className={`price  ${isDiscount ? "has_discount" : null}`}>
      <span className="price_standard">${price}</span>
      {isDiscount && <span className="price_discount">${discountPrice}</span>}
    </div>
  );
};

const Status = ({ isExpire, expiryDate }) => {
  if (isExpire) {
    return <span className="badge expired">Expired</span>;
  }
  return (
    <span className="badge">
      <span>Expire </span>
      <Moment fromNow interval={1000}>
        {expiryDate}
      </Moment>
    </span>
  );
};

const Description = ({ price, discountPrice, isExpire, expiryDate }) => {
  return (
    <>
      <Price price={price} discountPrice={discountPrice} />
      <Status isExpire={isExpire} expiryDate={expiryDate} />
    </>
  );
};

const Product = ({
  name,
  isExpire,
  expiryDate,
  price,
  discountPrice,
  coverImage,
}) => {
  return (
    <Card
      className="product"
      hoverable
      style={{ width: 240 }}
      cover={<img alt="product_cover" src={coverImage} />}
    >
      <Meta
        title={name}
        description={
          <Description
            price={price}
            discountPrice={discountPrice}
            isExpire={isExpire}
            expiryDate={expiryDate}
          />
        }
      />
    </Card>
  );
};

export default Product;
