import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";
import { fetchProducts } from "../redux/slices/productsSlice";
import { ButLove } from "../components/LoveMenu";
import { ProductProps } from "../interface";

import "./product-page.css";

export default function ProductPage() {
  return (
    <search className="product-page">
      <div className="container">
        <Bar />
        <Products />
      </div>
    </search>
  );
}

function Bar() {
  const dispatch = useDispatch();

  // const products = useSelector(
  //   (state: RootState) => state.products.products
  // );
  // console.log(products);

  const handelCategory = (e:any) => {
    let buttons = e.target.parentElement.parentElement.querySelectorAll("button.active")
    buttons.forEach((but:any) => {
      but.classList.remove("active");
    });
    e.target.classList.add("active")
    dispatch(fetchProducts({category: e.target.dataset.category}));
  }

  return (
    <div className="category">
      <ul>
        <li>
          <button className="active" onClick={(e) => handelCategory(e)} data-category="all">all</button>
        </li>
        <li>
          <button onClick={(e) => handelCategory(e)} data-category="electronics">electronics</button>
        </li>
      </ul>
    </div>
  );
}

function Products() {
  const products = useSelector(
    (state: RootState) => state.products.products
  );
  const dispatch = useDispatch();
+
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="products">
      <div className="row">
        {products?.map((product: any) => {
          return (
            <ProductItem product={product} key={"product-page" + product._id} />
          );
        })}
      </div>
    </div>
  );
}

function ProductItem({ product }: ProductProps) {
  const loveProducts: any[] = useSelector(
    (state: RootState) => state.loveProductsSlice.products[0]
  );

  let active: boolean = false;
  loveProducts?.forEach((e) => {
    if (e._id === product._id) {
      active = true;
    }
  });

  return (
    <div className="col-4 col-md-3 col-xl-2 product-parent">
      <div className="product-item">
        <Link to={"/product/" + product._id}>
          <div className="image">
            <img src="../public/product.jpg" alt="" />
          </div>
          <div className="info">
            <div className="info-top">
              <Price price={product.price} />

              {active ? (
                <ButLove productId={product._id} active="active" />
              ) : (
                <ButLove productId={product._id} active="" />
              )}
            </div>
            <h3 className="title">
              {product.title.slice(0, 50) +
                (product.title.slice(0, 50).length >= 50 ? "..." : "")}
            </h3>
          </div>
        </Link>
      </div>
    </div>
  );
}

interface PriceProps {
  price: number;
}
export function Price({ price }: PriceProps) {
  return (
    <div className="price">
      <span className="price-currency">$</span>
      <span className="price-value">{price}</span>
    </div>
  );
}
