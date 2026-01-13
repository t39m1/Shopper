import { useState } from "react";

function Product_Images({ current_product }) {

    const [main_image, set_main_image] = useState("");

    let sub_images = current_product.product_sub_image ? current_product.product_sub_image : [current_product.product_image];

    return (

        <div className="product-image-box h-[30rem] w-[30%] flex items-center justify-evenly gap-3">

            <div className="sub-images h-full w-[5rem] flex flex-col items-center justify-start gap-3">

                {

                    sub_images.map((img, idx) => (

                        <img key={idx} className="rounded-2xl sub-image h-[5rem] w-auto cursor-pointer" src={img} alt="Image Not Available" onClick={() => set_main_image(img)} />

                    ))

                }

            </div>

            <div className="main-image h-full w-auto">

                <img className="rounded-2xl h-full w-auto" src={main_image ? main_image : current_product.product_image} alt="Image Not Available" />

            </div>

        </div>

    );

};

export default Product_Images;