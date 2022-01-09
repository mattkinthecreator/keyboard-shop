import React, { useContext, useEffect, useState } from 'react';
import { keyboardsContext } from '../../contexts/KeyboardsContext';
import { LoadingOutlined } from '@ant-design/icons';
import ReactPaginate from 'react-paginate';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import './Home.css';
import 'react-accessible-accordion/dist/fancy-example.css';
import { brandsContext } from '../../contexts/BrandsContext';
import KeyboardCard from './KeyboardCard';
import { authContext } from '../../contexts/AuthContext';

const Home = () => {
  const { getFavorites } = useContext(authContext);
  const { keyboards, getKeyboards, filterKeyboardsForm, filterKeyboardsBrand } =
    useContext(keyboardsContext);
  const { brands, getBrands } = useContext(brandsContext);

  const [page, setPage] = useState(0);

  useEffect(() => {
    getKeyboards();
    getBrands();
    getFavorites();
  }, []);

  const keyboardsPerPage = 9;

  const pageCount = Math.ceil(keyboards.length / keyboardsPerPage);

  const pageVisited = keyboardsPerPage * page;

  const displayProducts = keyboards
    .slice(pageVisited, pageVisited + keyboardsPerPage)
    .map((keyboard) => <KeyboardCard key={keyboard.id} keyboard={keyboard} />);

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  return (
    <div className="keyboard__container">
      <div className="filter">
        <Accordion allowZeroExpanded>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>Фильтр</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="filter__brands">
                <h3>Бренд</h3>
                {brands &&
                  brands.map((brand, index) => (
                    <label key={index}>
                      {brand.brand}
                      <input
                        type="radio"
                        value={brand.brand}
                        onChange={(e) => filterKeyboardsBrand(e.target.value)}
                        name="filter"
                      />
                    </label>
                  ))}
              </div>
              <div className="filter__form">
                <h3>Размер</h3>
                <label>
                  100%
                  <input
                    name="filter"
                    type="radio"
                    value="100%"
                    onChange={(e) => filterKeyboardsForm(e.target.value)}
                  />
                </label>
                <label>
                  80%
                  <input
                    name="filter"
                    type="radio"
                    value="80%"
                    onChange={(e) => filterKeyboardsForm(e.target.value)}
                  />
                </label>
                <label>
                  60%
                  <input
                    name="filter"
                    type="radio"
                    value="60%"
                    onChange={(e) => filterKeyboardsForm(e.target.value)}
                  />
                </label>
                <label>
                  40%
                  <input
                    name="filter"
                    type="radio"
                    value="40%"
                    onChange={(e) => filterKeyboardsForm(e.target.value)}
                  />
                </label>
                <label>
                  Все
                  <input
                    name="filter"
                    type="radio"
                    onChange={getKeyboards}
                    value=""
                  />
                </label>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="products">
        {displayProducts?.length ? displayProducts : <LoadingOutlined />}
      </div>
      <div className="paginate">
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={'paginationBttns'}
          previousLabelClassName={'previousBttn'}
          nextLabelClassName={'nextBttn'}
          disabledClassName={'paginationDisabled'}
          activeClassName={'paginationActive'}
        />
      </div>
    </div>
  );
};

export default Home;
