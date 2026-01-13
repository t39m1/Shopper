import Icon from "/Icon.jpg";
import Instagram from "/Instagram.jpg";
import Facebook from "/Facebook.jpg";
import Twitter from "/Twitter.jpg";

function Footer() {

    return (

        <div className="footer-box h-[15rem] w-full bg-gray-900 text-white flex flex-col items-center justify-evenly p-5">

            <div className="e-commerce flex items-center justify-center gap-3">

                <img className="icon h-8" src={Icon} alt="Image Not Available" />

                <span>SHOPPER</span>

            </div>

            <div className="socials flex items-center justify-center gap-3">

                <img className="social-icon rounded-full h-5 cursor-pointer" src={Instagram} alt="Image Not Available" />

                <img className="social-icon rounded-full h-5 cursor-pointer" src={Facebook} alt="Image Not Available" />

                <img className="social-icon rounded-full h-5 cursor-pointer" src={Twitter} alt="Image Not Available" />

            </div>

            <span className="creator cursor-pointer hover:underline" onClick={() => window.open("https://hitarthpathak.github.io/", "_blank")}>© Hitarth Pathak</span>

        </div>

    );

};

export default Footer;