import { useMemo } from 'react';
import { ProductItem } from "./ProductItem";

type SearchResultsProps = {
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>;
  onAddToWishlist: (id: number) => void;
};

export function SearchResults({ results, onAddToWishlist }: SearchResultsProps) {
  const totalPrice = useMemo(() => {
    return results.reduce((total, product) => {
      return total + product.price;
    }, 0);
  }, [results]);

  return (
    <div>
      <h2>{totalPrice}</h2>

      {results.map((product) => (
        <ProductItem 
          key={product.id} 
          product={product} 
          onAddToWishlist={onAddToWishlist} 
        />
      ))}
    </div>
  );
}

/**
 * 1. Criar uma nova versão do componente
 * 2. Comparar com a versão anterior
 * 3. Se houverem alterações, vai atualizar o que alterou
 */

/**
 * memo: quando usar.
 * 
 * 1. Pure Functional Components
 * 2. Renders too often
 * 3. Re-renders with same props
 * 4. Medium to big size component
 */

/**
 * useMemo (valor): quando usar.
 * 
 * 1. Cálculos pesados
 * 2. Igualdade referencial (quando a gente repassa aquela informação para um componente filho)
 */

/**
 * useCallback (função): quando usar.
 * 
 * 1. 
 */
