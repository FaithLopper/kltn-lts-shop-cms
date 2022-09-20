import ProductContainer from "../containers/product/ProductContainer"
import PageNotAllowed from "../containers/PageNotAllowed"
import PageNotFound from "../containers/PageNotFound"
import GetInTouchContainer from "../containers/GetInTouchContainer"
export const desktopRoutes ={
    root:{
        path:"/demo",
        component:ProductContainer,
        exact:false,
        title:'title.productPage'
    },
    pageNotAllowed:{
        path:'/not-allowed',
        component:PageNotAllowed,
        title:'title.notAllowedPage'
    },
    notFound:{
        component:PageNotFound,
        title:'title.notFoundPage'
    }
}
export const mobileRoutes ={
    root:{
        path:"/demo",
        component:ProductContainer,
        exact:false,
        title:'title.productPage',
        key:'root'
    },
    getInTouch:{
        path:':collaboratorId/get-in-touch/*',
        component:GetInTouchContainer,
        title:'title.getInTouchPage',
        key:'get-in-touch'
    }
    ,
    pageNotAllowed:{
        path:'/not-allowed',
        component:PageNotAllowed,
        title:'title.notAllowedPage',
    },
    notFound:{
        component:PageNotFound,
        title:'title.notFoundPage'
    }
}