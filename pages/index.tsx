import type { NextPage } from "next";
import { FormEvent, useCallback, useState } from "react";
import { SearchResults } from "../components/SearchResults";

type ResultsData = {
  totalPrice: number;
  data: any[];
};

const Home: NextPage = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<ResultsData>({
    totalPrice: 0,
    data: [],
  });

  const addToWishlist = useCallback(async (id: number) => {
    console.log(id);
  }, []);

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const products = data.map((product) => ({
      ...product,
      priceFormatted: formatter.format(product.price),
    }));

    const totalPrice = data.reduce((total, product) => {
      return total + product.price;
    }, 0);

    setResults({ totalPrice, data: products });
  }

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <SearchResults
        onAddToWishlist={addToWishlist}
        results={results.data}
        totalPrice={results.totalPrice}
      />
    </div>
  );
};

export default Home;
