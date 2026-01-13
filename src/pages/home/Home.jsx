import Introduction from "./sub-components/Introduction";
import Offer from "./sub-components/Offer";
import Popular from "./sub-components/Popular";

function Home() {

    return (

        <>

            <Introduction />

            <Popular category={"men"} />

            <Popular category={"women"} />

            <Popular category={"kids"} />

            <Offer />

        </>

    );

};

export default Home;