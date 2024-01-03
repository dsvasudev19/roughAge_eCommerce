// authMiddleware.js

const validateToken = async () => {
    try {
        var token = localStorage.getItem( "token" );
        console.log( token );
        const response = await fetch(
            "https://roughage-api.vercel.app//api/auth/validateAdminAuthenctication",
            {
                method: "post",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${ token }`
                },
                body: JSON.stringify( token ),
            }
        );

        if ( response.status === 205 ) {
            localStorage.setItem( "Authenticated", true );
            return true;
        } else if ( response.status === 401 ) {
            console.log( response );
            console.log( await response.json() );
            console.log( "failure" );
            localStorage.setItem( "Authenticated", false );
            return false;
        } else {
            // Handle other response statuses if needed
            console.error( "Unexpected response status:", response.status );
            return false;
        }
    } catch ( error ) {
        console.error( "Error while validating token:", error );
        return false;
    }
};

export default validateToken;
