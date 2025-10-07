import type { Product } from "demo-domain";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../controller/api-controller.js";

export default function ProductDetail() {
  const [product, setProduct] = useState<Product>();
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const result = await api("getProduct", { id });
      if (result) setProduct(result);
    }
    fetchData();
  }, []);

  if (!product) return <div>Product Not Found</div>;

  return (
    <div>
      <button type="button" onClick={() => navigate(-1)}>
        back
      </button>
      <div className="productCard">
        <h2 className="titleCard">{product.name}</h2>
        <p className="priceCard">Precio: ${product.price.toFixed(2)}</p>
        <div>
          <small>ID: {id}</small>
        </div>
      </div>
    </div>
  );
}
