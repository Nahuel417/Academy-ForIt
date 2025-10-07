import { domainUseCases } from "demo-domain";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
}

export default function ProductCard({ id, name, price }: ProductCardProps) {
  const navigate = useNavigate();
  return (
    <div className="productCard">
      <h2 className="titleCard">{name}</h2>
      <p className="priceCard">Precio: ${price.toFixed(2)}</p>
      <div className="containerProduct">
        <small>ID: {id}</small>
        {domainUseCases.getProduct.enable && (
          <button type="button" onClick={() => navigate("/product/" + id)}>
            ver producto
          </button>
        )}
      </div>
    </div>
  );
}
