import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context_API } from "../../App";
import Product_Images from "./sub-components/Product_Images";
import Product_Data from "./sub-components/Product_Data";

function Product_Details() {

    const { light_mode, product_data } = useContext(Context_API);
    const { product_id } = useParams();

    let current_product = product_data.find((product) => {
        return product.id == product_id;
    });

    if (!current_product) {
        return (
            <h1 className="text-center text-3xl p-10">Loading Product...</h1>
        );
    };

    return (

        <div className={`h-auto w-full m-auto ${light_mode ? "bg-red-100" : "bg-red-300"} flex items-center justify-start gap-5 p-10`}>

            <Product_Images current_product={current_product} />

            <Product_Data current_product={current_product} />

        </div>

    );

};

export default Product_Details;