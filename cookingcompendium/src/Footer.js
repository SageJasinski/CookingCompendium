import React from "react";
import "./Styles/Footer.scss";


class Footer extends React.Component{

    render(){
        return(
            <>
                <div className="flow">
                <div className="contact">
                    <h5> &copy; Sage Jasinski </h5>
                    <a href="/">SageJasinski@gmail.com</a>
                </div>
                </div>
            </>
        )
    }
}

export default Footer;