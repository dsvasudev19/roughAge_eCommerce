import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Facebook, Instagram, MessageCircle, Send } from "lucide-react";

function Footer() {
    return (
        <>
            <div className="row footer">
                <div className="col col-lg-4 col-md-12 contact">
                    <i class="fa fa-flip-horizontal fa-solid fa-phone fa-lg"></i>
                    <h6>+91 8328203617</h6>
                    <h5></h5>
                </div>
                <div className="col col-lg-4 col-md-12 socialHandle">
                    <h3>Around the Web</h3>
                    <Instagram />
                    <Facebook />
                    <Send />
                    {/* <a href="https://wa.me/+918328203617"><FontAwesomeIcon icon="fa-brands fa-whatsapp" /></a> */}
                    
                </div>
                <div className="col col-lg-4 col-md-12 About">
                    <p>
                        Local, fresh, and organic fare,Where nutrition and education are shared.
                    </p>
                </div>
                <h5><FontAwesomeIcon icon="fa-regular fa-copyright" />2023 All copyrights reserved</h5>
                <h6>Designed and Developed by <a href="https://github.com/dsvasudev19">ds.vasudev </a><a href="https://wa.me/+918328203617"><FontAwesomeIcon icon="fa-brands fa-whatsapp" /></a></h6>
            </div>
        </>
    );
}

export default Footer;