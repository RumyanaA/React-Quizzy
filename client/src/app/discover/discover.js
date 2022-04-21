import { useState } from "react";
import '../layout/main-content/shared-style.scss';
import "./discover-style.scss";
import Header from "../layout/header/header";
import IngridientSearch from "./ingridient-search/ingridient-search";
import Button from "../../shared/button/button-component";
import KeywordSearch from "./keyword-search/keyword-search";
import NutritionsSearch from "./nutritions-search/nutritions.search";

const Discover = () => {
  const [selectedSearch, setSelectedSearch] = useState('keyword')
  const openSelectedSearch = (event)=>{
    setSelectedSearch(event.target.id);
  }
  return (
    <div>
      <Header />
      <div className="wrapper">
        <div className="nav-container">
          <Button className={selectedSearch ==='keyword' ? 'nav-button-red': 'nav-button'} onClick={openSelectedSearch} id='keyword' label='Search by keyword'/>
          <Button className={selectedSearch ==='ingridients' ? 'nav-button-red': 'nav-button'} onClick={openSelectedSearch} id='ingridients' label='Search by ingridients'/>
          <Button className={selectedSearch ==='nutritions' ? 'nav-button-red': 'nav-button'} onClick={openSelectedSearch} id='nutritions' label='Search by nutritions'/>
        </div>
        {selectedSearch === 'keyword'? <KeywordSearch />:null}
        {selectedSearch === 'ingridients'? <IngridientSearch />:null}
        {selectedSearch === 'nutritions'? <NutritionsSearch />:null}
      </div>
    </div>
  );
};

export default Discover;
