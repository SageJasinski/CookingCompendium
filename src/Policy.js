import React from "react";
import './Styles/Policy.scss'
import { Link } from "react-router-dom";

class Policy extends React.Component{
    render(){
        return(
            <>
            <Link className="nav_home_btn" to="/">Home</Link>
                <div className="terms">
                    <h4>Acceptance of Terms: By accessing or using CookingCompendium, you agree to these terms and conditions.
                    </h4>
                    <ul>
                        <li>
                            User Content: You are solely responsible for any content you post on CookingCompendium, and you grant us a worldwide, royalty-free, non-exclusive license to use, copy, modify, publish, and distribute your content.
                        </li>
                        <li>
                            Prohibited Content: You agree not to post any content on CookingCompendium that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, sexually explicit, or otherwise objectionable.
                        </li>
                        {/* <li>
                            Privacy Policy: Our privacy policy explains how we collect, use, and protect your personal information. By using CookingCompendium, you agree to the terms of our privacy policy.
                        </li> */}
                        <li>
                         Termination: We may terminate your access to CookingCompendium at any time for any reason, without notice.
                        </li>
                    </ul>

                </div>
            </>
        )
    }
}
export default Policy;