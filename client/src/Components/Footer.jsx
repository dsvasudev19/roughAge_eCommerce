import React from "react";

import { Facebook, Instagram, MessageCircle, PhoneCall, Send } from "lucide-react";

function Footer() {
    return (
        <>
            <div className="row footer">
                <div className="col col-lg-4 col-md-12 contact">
                    {/* <i class="fa fa-flip-horizontal fa-solid fa-phone fa-lg"></i> */}
                    <PhoneCall />
                    <h6>+91 9999999990</h6>
                    <h5></h5>
                </div>
                <div className="col col-lg-4 col-md-12 socialHandle">
                    <h3>Follow us on </h3>
                    <Instagram />{'  '}
                    <Facebook />{ '  ' }
                    <Send />
                    {/* <a href="https://wa.me/+918328203617"><FontAwesomeIcon icon="fa-brands fa-whatsapp" /></a> */}
                    
                </div>
                <div className="col col-lg-4 col-md-12 About">
                    {/* <p>
                        Every bite a story, every meal a discovery
                    </p> */}
                    
                </div>
                <h5>2023 All copyrights reserved</h5>
                <h6>Designed and Developed by <a href="https://github.com/dsvasudev19">ds.vasudev </a><a href="https://wa.me/+918328203617"></a></h6>
            </div>
        </>
    );
}

export default Footer;