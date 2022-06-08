import { React, useState } from 'react';
import IngridientSearch from './search/ingridient/IngridientSearch';
import KeywordSearch from './search/keyword/KeywordSearch';
import NutritionsSearch from './search/nutritions/NutritionsSearch';
import { Header, Button } from '../../components';
import '../../sharedStyles.scss';
import './discover.scss';

function Discover() {
  const [selectedSearch, setSelectedSearch] = useState('keyword');

  const openSelectedSearch = (event) => {
    setSelectedSearch(event.target.id);
  };
  return (
    <div>
      <Header />
      <div className="wrapper">
        <div className="nav-container">
          <Button testId="keyword-navigation" className={selectedSearch === 'keyword' ? 'nav-button-red' : 'nav-button'} onClick={openSelectedSearch} id="keyword" label="Search by keyword" />
          <Button testId="ingridients-navigation" className={selectedSearch === 'ingridients' ? 'nav-button-red' : 'nav-button'} onClick={openSelectedSearch} id="ingridients" label="Search by ingridients" />
          <Button testId="nutritions-navigation" className={selectedSearch === 'nutritions' ? 'nav-button-red' : 'nav-button'} onClick={openSelectedSearch} id="nutritions" label="Search by nutritions" />
        </div>
        {selectedSearch === 'keyword' ? <KeywordSearch /> : null}
        {selectedSearch === 'ingridients' ? <IngridientSearch /> : null}
        {selectedSearch === 'nutritions' ? <NutritionsSearch /> : null}
      </div>
    </div>
  );
}

export default Discover;
