import React, { useEffect, useState } from 'react';
import { TablePagination } from '@material-ui/core';
import { LoopCircleLoading } from 'react-loadingg';
import 'bootstrap/dist/css/bootstrap.css';
import moment from 'moment';
import app from '../../services/firebase';
import 'firebase/database';

const CoronaNews = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowPerPage] = useState(10);

  useEffect(() => {
    setIsLoading(true);
    const db = app.database().ref('news');
    db.on('value', (snapshot) => {
      const firebaseNews = snapshot.val();
      setNews(firebaseNews.data);
      setIsLoading(false);
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleChangePage = (event, newPage) => {
    scrollUp();
    setPage(newPage);
  };

  const handleChangeRowPerPage = (event) => {
    setRowPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const RenderData = () => {
    const data = news
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((tgl) => {
        const newsdata = tgl.activity.map((list) => {
          return (
            <li>
              <a href={list.url}>{list.title}</a>
              <p>{list.desc}</p>
            </li>
          );
        });
        return (
          <div className="card">
            <div className="card-body">
              <p>{moment(tgl.date).format('dddd, Do MMM YYYY')}</p>
              <ul>{newsdata}</ul>
            </div>
          </div>
        );
      });
    return <div>{data}</div>;
  };
  return (
    <div className="container">
      <h5>Corona News</h5>
      <hr />
      {isLoading ? (
        <LoopCircleLoading />
      ) : (
        <div>
          <RenderData />
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={news.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowPerPage}
          />
        </div>
      )}
    </div>
  );
};

export default CoronaNews;
