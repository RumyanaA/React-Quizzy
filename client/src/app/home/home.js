import Wrapper from "../layout/main-content/content-wrapper"

const Home = ()=>{
    const menuCards=[
        {
            title:'Discover',
            routerLink:'/discover'
        },
        {
            title:'Plan my menu',
            routerLink:'/menu-planner'
        },
        {
            title:'Create custom recipe',
            routerLink:'/custom-recipe'
        },
        {
            title:'Favorite recipes',
            routerLink:'/favorite-recipes'
        },
    ]
    return(
        <div>
            <Wrapper menuCards={menuCards} />
        </div>
    )
}

export default Home;