import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context_API } from "../../../App";
import Upper_Arrow from "/Upper-Arrow.jpg";
import Lower_Arrow from "/Lower-Arrow.jpg";

function Cart_List() {

    const { light_mode, cart, set_cart, logged_in_user, set_logged_in_user, shopper_users, set_shopper_users } = useContext(Context_API);

    function update_cart(new_cart) {
        set_cart(new_cart);
        if (logged_in_user) {
            let updated_user = { ...logged_in_user, cart: new_cart };
            set_logged_in_user(updated_user);
            let updated_users = shopper_users.map((user) =>
                user.e_mail == updated_user.e_mail ? updated_user : user
            );
            set_shopper_users(updated_users);
            localStorage.setItem("shopper-logged-in-user", JSON.stringify(updated_user));
            localStorage.setItem("shopper-users", JSON.stringify(updated_users));
        }
    };

    function increase_quantity(product_id) {
        let new_cart = cart.map((item) =>
            item.id == product_id ? { ...item, quantity: Number(item.quantity) + 1 } : item
        );
        update_cart(new_cart);
    };

    function decrease_quantity(product_id) {
        let new_cart = cart.map((item) =>
            item.id == product_id
                ? { ...item, quantity: Number(item.quantity) > 1 ? Number(item.quantity) - 1 : 1 }
                : item
        );
        update_cart(new_cart);
    };

    function remove_product(product_id) {
        let new_cart = cart.filter(item => item.id != product_id);
        update_cart(new_cart);
    };

    return (

        <div className="cart-list h-auto w-1/2 flex flex-col items-stretch justify-center gap-3">

            <h1 className="text-center text-3xl my-5">Cart Items</h1>

            {

                cart.length === 0

                    ?

                    (

                        <h1 className="empty-cart text-center rounded-lg bg-blue-700 text-white p-1">Cart Is Empty!</h1>

                    )

                    :

                    (

                        cart.map((product) => (

                            <div className="product-box rounded-lg bg-blue-700 text-white p-1 h-[15rem] w-full flex items-center justify-center" key={product.id}>

                                <div className="border border-white product-image-box rounded-lg bg-blue-700 text-white p-1 h-full w-[25%]">

                                    <Link to={`/product-details/${product.id}`}>

                                        <img src={product.product_image} alt={product.product_name} className="rounded-lg h-full w-auto m-auto" />

                                    </Link>

                                </div>

                                <div className="product-data-box rounded-lg bg-blue-700 text-white h-full w-[75%] p-3 flex flex-col items-start justify-start gap-3">

                                    <p>Product Name : {product.product_name}</p>

                                    <p>Product Category : {product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>

                                    <p>Product Price : <span className="old-price line-through">${product.old_price}</span> <span className="new-price font-bold">${product.new_price}</span></p>

                                    <div className="quantity-box flex items-center justify-center gap-1">

                                        <p>Product Quantity :</p>

                                        <div className="p-1 cursor-pointer" onClick={() => increase_quantity(product.id)}>

                                            <img className="h-5" src={Upper_Arrow} alt="Image Not Available" />

                                        </div>

                                        <input className={`[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none quantity outline-none h-5 w-7 text-center ${light_mode ? "text-black" : "text-black"}`} type="number" value={product.quantity} readOnly={true} />

                                        <div className="p-1 cursor-pointer" onClick={() => decrease_quantity(product.id)}>

                                            <img className="h-5" src={Lower_Arrow} alt="Image Not Available" />

                                        </div>

                                    </div>

                                    <button className="add-to-cart-button rounded-lg p-2 bg-red-500 hover:bg-red-600" onClick={() => remove_product(product.id)}>Remove Product</button>

                                </div>

                            </div>

                        ))

                    )

            }

        </div >

    );

};

export default Cart_List;