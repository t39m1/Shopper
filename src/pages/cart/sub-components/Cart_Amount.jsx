import { useState, useEffect, useContext } from "react";
import { Context_API } from "../../../App";

function Cart_Amount() {

    const { cart } = useContext(Context_API);

    const [total_amount, set_total_amount] = useState(0);
    const [discount_amount, set_discount_amount] = useState(0);
    const [net_amount, set_net_amount] = useState(0);

    useEffect(() => {
        let total = 0;
        let discount = 0;
        let net_amount = 0;
        cart.forEach((product) => {
            let quantity = Number(product.quantity);
            let new_price = parseInt(product.new_price.replace(/\D/g, "")) * quantity;

            total += new_price;
        });
        discount += total * 0.25;
        net_amount = total - discount;

        set_total_amount(total);
        set_discount_amount(discount);
        set_net_amount(net_amount);
    }, [cart]);

    return (

        <div className="cart-amount h-auto w-1/2 flex flex-col items-stretch justify-center gap-3">

            <h1 className="text-center text-3xl my-5">Cart Amount</h1>

            <div className="cart-amount-box h-auto text-center rounded-lg bg-blue-700 text-white p-7">

                <div className="mb-5 flex items-center justify-center gap-1">

                    <p>Total Amount :</p>

                    <p className="font-bold">{total_amount} USD</p>

                </div>

                <div className="mb-5 flex items-center justify-center gap-1">

                    <p>Total Discount :</p>

                    <p className="font-bold">{discount_amount} USD</p>

                </div>

                <div className="mb-5 flex items-center justify-center gap-1">

                    <p>Net Amount :</p>

                    <p className="font-bold">{net_amount} USD</p>

                </div>

                <button className="place-order-button rounded-lg h-auto w-1/2 m-auto p-2 bg-red-500 hover:bg-red-600">Place Order</button>

            </div>

        </div>

    );

};

export default Cart_Amount;