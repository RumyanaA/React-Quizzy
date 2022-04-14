import Header from "../header/header";
import Card from "../../shared-components/card";
import "./content-wrapper-style.scss";

const Wrapper = ({menuCards}) =>{

    return(<div>
        <Header />
        <div className="wrapper">
           {menuCards.map((card,index)=>{
               return <Card key={index} title={card.title} routerLink={card.routerLink}/>
           })}
        </div>
    </div>)
}
export default Wrapper