import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context_API } from "../App";

function New_Collections() {

    const { light_mode, product_data } = useContext(Context_API);

    function new_collection(category) {
        return (
            product_data.filter((product) => {
                return product.category === category;
            }).slice(0, 3)
        );
    };

    let categories = ["men", "women", "kids"];

    return (

        <div className={`new-collections-box p-5 ${light_mode ? "bg-red-100" : "bg-red-300"}`}>

            <h1 className="text-center text-3xl mb-5">New Collections</h1>

            {

                product_data.length > 0

                    ?

                    (

                        <div className="products-list flex flex-wrap items-center justify-between gap-2">

                            {

                                categories.flatMap((category) => {

                                    let products = new_collection(category);

                                    return (

                                        products.map((product) => (

                                            <Link to={`/product-details/${product.id}`} key={product.id}>

                                                <div className="product-box rounded-lg h-auto w-[20rem] bg-blue-700 text-white p-5 flex flex-col items-center justify-center gap-5">

                                                    <img className="rounded-lg h-[20rem]" src={product.product_image} alt="Image Not Available" />

                                                    <h2>{product.product_name}</h2>

                                                    <div className="product-prices flex items-center justify-start gap-2">

                                                        <span className="old-price line-through">${product.old_price}</span>

                                                        <span className="new-price font-bold text-lg">${product.new_price}</span>

                                                    </div>

                                                </div>

                                            </Link>

                                        ))

                                    );

                                })

                            }

                        </div>

                    )

                    :

                    (

                        <p className="text-center text-3xl m-auto p-10">Loading Products...</p>

                    )

            }

        </div>

    );

};

export default New_Collections;