import dynamic from "next/dynamic";
import { memo, useState } from "react";
import { AddProductToWishlistProps } from "./AddProductToWishlist";

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(
  () => {
    return import("./AddProductToWishlist").then(
      (mod) => mod.AddProductToWishlist
    );
  },
  {
    loading: () => <span>Carregando...</span>,
  }
);

type ProductItemProps = {
  product: {
    id: number;
    price: number;
    title: string;
    priceFormatted: string;
  };
  onAddToWishlist: (id: number) => void;
};

export function ProductItemComponent({
  product,
  onAddToWishlist,
}: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWithlist] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWithlist(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingToWishlist && (
        <AddProductToWishlist
          onAddToWishlist={() => onAddToWishlist(product.id)}
          onRequestClose={() => setIsAddingToWithlist(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product);
  }
);
