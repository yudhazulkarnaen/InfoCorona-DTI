import React, { useState, useEffect } from 'react';
import { CommonLoading } from 'react-loadingg';
import { TablePagination } from '@material-ui/core';
import { authService } from '../../services';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

const Product = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataProduct, setDataProduct] = useState([]);
  const [keyword, setKeyword] = useState('');
  // const limit = 9;
  // const offset = 0;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowPerPage] = useState(9);
  useEffect(() => {
    const getProduct = () => {
      authService
        .getProduct(keyword, rowsPerPage, page)
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log(res);
          setDataProduct(res.data);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    getProduct();
  }, [keyword, page, rowsPerPage]);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleChangePage = (event, newPage) => {
    scrollUp();
    setPage(newPage);
    // getProduct();
  };

  const handleChangeRowPerPage = (event) => {
    setRowPerPage(parseInt(event.target.value, 10));
    setPage(0);
    // getProduct();
  };

  return (
    <div>
      {isLoading ? (
        <CommonLoading />
      ) : (
        <center>
          <h1>Data Product</h1>
        </center>
      )}
      <div className="container">
        <form
          className="example"
          onSubmit={(e) => {
            e.preventDefault();
            // eslint-disable-next-line no-undef
            // getProduct();
          }}
        >
          <input
            type="text"
            placeholder="Search.."
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
          <input
            className="btn-xs btn-primary"
            type="submit"
            value="Cari"
            disable
          />
        </form>
        <div className="row">
          {dataProduct.map((product) => {
            return (
              <div className="col-sm-4">
                <div className="card border-dark mb-3">
                  <div className="card-header">{product.name}</div>
                  <div className="card-body text-dark">
                    <h5 className="card-title">Harga</h5>
                    <p className="card-text">
                      {product.display_promo_price_percentage}
                      {'  '}
                      {product.display_normal_price}
                    </p>
                    <h3>{product.display_price}</h3>
                    <h6>{product.description}</h6>
                  </div>
                </div>
              </div>
            );
          })}
          <TablePagination
            rowsPerPageOptions={[3, 9, 25]}
            component="div"
            count={100}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
