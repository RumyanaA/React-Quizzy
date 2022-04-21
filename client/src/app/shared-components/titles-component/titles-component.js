import './titles-component-style.scss';

const TitleComponents =({title})=>{
    return(
        <>
        <div className="all-ingridients-title">
        <div className="all-ingridients-left-line"></div>{title}{" "}
        <div className="all-ingridients-right-line"></div>
      </div>
        </>
    )
}
export default TitleComponents;