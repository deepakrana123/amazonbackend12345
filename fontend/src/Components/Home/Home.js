import React,{Fragment,useEffect} from 'react';
import "./Home.css"
import Prdocut from "./Prdocut";
import {useAlert} from "react-alert";
import {getProduct,clearErrors} from "../../actions/productAction";
import {useSelector,useDispatch} from "react-redux";
import MetaData from "./MetaData";
import Loading from "./Loading";


function Home() {
    const alert=useAlert();
    const dispatch=useDispatch();
    const {loading,error,products} = useSelector(( state ) => state.products)
    useEffect(()=>{
        dispatch(getProduct());
        if(error){
             alert.error(error);
             console.log(error);
             dispatch(clearErrors())
        }

    },[dispatch,error,alert])
    return (
        <Fragment>
        <MetaData title="Ecommerce"/>
        {loading ? (<Loading/>)
            :(<Fragment>
            
            <div className="banner">
                <p>Welcome to ECOMMERCE</p>
                <h1>Find Amazing product here </h1>
                <a href="#container">
                <button>Scroll</button>
                </a>
             </div>   
                <h2 className="headingImg">Home Product</h2>
                <div className="container" id="container">
                
                        {products && products.map((product) =>(
                                 <Prdocut product={product}/>
                                  ))}
                
                </div>
            
            </Fragment>
            )}
        
        </Fragment>
        
    )
}

export default Home;
