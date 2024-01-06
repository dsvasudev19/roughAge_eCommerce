
import React from 'react';
import Navigationbar from '../Components/Navigationbar';

const NotFound = () => {
    return (
        <div>
            <Navigationbar />

            <>
                <img src="/errorpage.png" usemap="#image-map" style={
                    {
                        height: '91vh',
                        width: '100vw',
                    }
                } />

                <map name="image-map">
                    <area target="" alt="" title="" href="/" coords="664,1134,939,1026" shape="rect" />
                </map>

            </>
        </div>
    );
};

export default NotFound;