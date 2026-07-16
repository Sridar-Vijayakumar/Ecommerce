import { useEffect, useState } from "react";
import API from "../services/api";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import Pagination from "../components/Pagination";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await API.get(
        `/products?keyword=${keyword}&category=${category}&page=${page}`
      );
      console.log(data);
      setProducts(data.products);
      setPages(data.pages);
    };

    fetchProducts();
  }, [keyword, category, page]);

  return (
    <div>
      <SearchBar onSearch={setKeyword} />
      <CategoryFilter onCategory={setCategory} />

      {/* Display Products */}

      <Pagination
        pages={pages}
        page={page}
        onPageChange={setPage}
      />
    </div>
  );
};
  
export default Products;  


