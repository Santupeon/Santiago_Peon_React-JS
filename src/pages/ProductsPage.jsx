import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ProductList from '../components/ProductList';
import ReactPaginate from 'react-paginate';
import { useProducts } from '../context/ProductContext';

const ProductsPage = () => {
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const offset = currentPage * itemsPerPage;
  const currentProducts = filteredProducts.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <Helmet>
        <title>Nuestros Productos - Tienda VR</title>
      </Helmet>
      <div className="container my-4">
        <div className="d-flex flex-column align-items-center mb-4">
          <h2>Nuestros Productos</h2>
          <input
            type="text"
            placeholder="Buscar productos..."
            className="form-control"
            style={{ width: '300px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ProductList products={currentProducts} />
        <ReactPaginate
          previousLabel={'Anterior'}
          nextLabel={'Siguiente'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination justify-content-center'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          activeClassName={'active'}
        />
      </div>
    </>
  );
};

export default ProductsPage;