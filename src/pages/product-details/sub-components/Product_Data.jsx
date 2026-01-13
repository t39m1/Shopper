import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context_API } from "../../../App";
import Star_Icon from "/Star-Icon.png";
import Upper_Arrow from "/Upper-Arrow.jpg";
import Lower_Arrow from "/Lower-Arrow.jpg";

function Product_Data({ current_product }) {

    const { light_mode, is_logged_in, logged_in_user, set_logged_in_user, cart, set_cart, shopper_users, set_shopper_users } = useContext(Context_API);
    const navigate = useNavigate();

    const [quantity, set_quantity] = useState(Number(current_product.quantity));

    useEffect(() => {
        let product_in_cart = cart.find((item) => item.id == current_product.id);
        if (product_in_cart) {
            set_quantity(product_in_cart.quantity);
        }
    }, [cart]);

    let display_category = current_product.category.charAt(0).toUpperCase() + current_product.category.slice(1);

    let already_in_cart = cart.some((product) => {
        return (
            product.id === current_product.id
        );
    });

    function increase_quantity() {
        set_quantity((prev_quantity) => prev_quantity + 1);
        if (already_in_cart) {
            let updated_cart = cart.map((item) => {
                if (item.id === current_product.id) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            set_cart(updated_cart);
            let updated_user = { ...logged_in_user, cart: updated_cart };
            set_logged_in_user(updated_user);
            let updated_users = shopper_users.map((user) =>
                user.e_mail === updated_user.e_mail ? updated_user : user
            );
            set_shopper_users(updated_users);
            localStorage.setItem("shopper-logged-in-user", JSON.stringify(updated_user));
            localStorage.setItem("shopper-users", JSON.stringify(updated_users));
        }
    };

    function decrease_quantity() {
        if (quantity == 1) {
            return;
        };
        set_quantity((prev_quantity) => prev_quantity - 1);
        if (already_in_cart) {
            let updated_cart = cart.map((item) => {
                if (item.id === current_product.id) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });
            set_cart(updated_cart);
            let updated_user = { ...logged_in_user, cart: updated_cart };
            set_logged_in_user(updated_user);
            let updated_users = shopper_users.map((user) =>
                user.e_mail === updated_user.e_mail ? updated_user : user
            );
            set_shopper_users(updated_users);
            localStorage.setItem("shopper-logged-in-user", JSON.stringify(updated_user));
            localStorage.setItem("shopper-users", JSON.stringify(updated_users));
        }
    };

    function add_to_cart() {
        if (is_logged_in == false) {
            alert("Please Login First!");
            navigate("/login");
            return;
        };
        if (already_in_cart) {
            alert("Product Is Already in Cart!");
            return;
        };
        let new_cart = [...(logged_in_user.cart || []), { ...current_product, quantity }];
        set_cart(new_cart);
        let updated_user = { ...logged_in_user, cart: new_cart };
        set_logged_in_user(updated_user);
        let updated_users = shopper_users.map((user) =>
            user.e_mail === updated_user.e_mail ? updated_user : user
        );
        set_shopper_users(updated_users);
        localStorage.setItem("shopper-logged-in-user", JSON.stringify(updated_user));
        localStorage.setItem("shopper-users", JSON.stringify(updated_users));
    };

    return (

        <div className="product-data-box h-[auto] w-[70%] flex flex-col items-start justify-start gap-3">

            <div className="h-auto w-full flex items-center justify-start gap-3">

                <div className="rounded-3xl h-auto w-[20%] bg-blue-500 p-3 text-center">Product Name</div>

                <div className="rounded-3xl h-auto w-[80%] bg-blue-500 p-3 text-center">{current_product.product_name}</div>

            </div>

            <div className="h-auto w-full flex items-center justify-start gap-3">

                <div className="rounded-3xl h-auto w-[20%] bg-blue-500 p-3 text-center">Product Description</div>

                <div className="rounded-3xl h-auto w-[80%] bg-blue-500 p-3 text-center">{current_product.product_description}</div>

            </div>

            <div className="h-auto w-full flex items-center justify-start gap-3">

                <div className="rounded-3xl h-auto w-[20%] bg-blue-500 p-3 text-center">Category</div>

                <div className="rounded-3xl h-auto w-[80%] bg-blue-500 p-3 text-center">{display_category}</div>

            </div>

            <div className="h-auto w-full flex items-center justify-start gap-3">

                <div className="rounded-3xl h-auto w-[20%] bg-blue-500 p-3 text-center">Price</div>

                <div className="rounded-3xl h-auto w-[80%] bg-blue-500 p-3 text-center">

                    <span className="old-price font-bold line-through mr-3">{current_product.old_price}</span>

                    <span>{current_product.new_price}</span>

                </div>

            </div>

            <div className="h-auto w-full flex items-center justify-start gap-3">

                <div className="rounded-3xl h-auto w-[20%] bg-blue-500 p-3 text-center">Seller Name</div>

                <div className="rounded-3xl h-auto w-[80%] bg-blue-500 p-3 text-center">{current_product.seller_name}</div>

            </div>

            <div className="h-auto w-full flex items-center justify-start gap-3">

                <div className="rounded-3xl h-auto w-[20%] bg-blue-500 p-3 text-center">Ratings</div>

                <div className="rounded-3xl h-auto w-[80%] bg-blue-500 p-3 flex align-center justify-center gap-2">

                    <img className="star-icon h-4" src={Star_Icon} alt="Image Not Available" />

                    <img className="star-icon h-4" src={Star_Icon} alt="Image Not Available" />

                    <img className="star-icon h-4" src={Star_Icon} alt="Image Not Available" />

                </div>

            </div>

            <div className="h-auto w-full flex items-center justify-start gap-3">

                <div className="rounded-3xl h-auto w-[20%] bg-blue-500 p-3 text-center">Quantity</div>

                <div className="rounded-3xl h-auto w-[80%] bg-blue-500 p-3 text-center">

                    <div className="quantity-box flex items-center justify-center gap-1">

                        <div className="p-1 cursor-pointer" onClick={increase_quantity}>

                            <img className="h-5" src={Upper_Arrow} alt="Image Not Available" />

                        </div>

                        <input className={`[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none quantity outline-none h-5 w-7 text-center ${light_mode ? "text-black" : "text-black"}`} type="number" value={quantity} readOnly={true} />

                        <div className="p-1 cursor-pointer" onClick={decrease_quantity}>

                            <img className="h-5" src={Lower_Arrow} alt="Image Not Available" />

                        </div>

                    </div>

                </div>

            </div>

            <button className="add-to-cart-button rounded-lg m-auto mt-5 p-2 bg-red-500 hover:bg-red-600" onClick={add_to_cart}>{already_in_cart ? "Added To Cart" : "Add To Cart"}</button>

        </div>

    );

};

export default Product_Data;