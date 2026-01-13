import { useContext } from "react";
import { Context_API } from "../../App";
import Cart_List from "./sub-components/Cart_List";
import Cart_Amount from "./sub-components/Cart_Amount";

function Cart() {

    const { light_mode } = useContext(Context_API);

    return (

        <div className={`min-h-[30rem] w-full m-auto ${light_mode ? "bg-red-100" : "bg-red-300"} flex items-start justify-center gap-5 p-10`}>

            <Cart_List />

            <Cart_Amount />

        </div>

    );

};

export default Cart;