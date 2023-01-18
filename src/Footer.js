import React from "react";
import "./Styles/Footer.scss";


class Footer extends React.Component{

    render(){
        return(
            <>

                <div className="contact">
                    <h5> &copy; Cooking Compendium </h5>
                    <a href="/">SageJasinski@gmail.com</a>
                </div>
            </>
        )
    }
}

export default Footer;