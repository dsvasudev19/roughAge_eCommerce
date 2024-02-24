// const date = new Date().toISOString().split("T")[0];
// const today = new Date(Date.now());
// const newDate = new Date(date);
// console.log(newDate > today);

// console.log(Date.now(), Date.now() + 86400);

// console.log(typeof Date.now());



require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./src/routes");
const adminRoutes = require("./src/routes/adminRoutes");
const {sequelize} = require('./src/models')
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// const routes=require("./routes")
// const adminRoutes = require("./src/routes/adminRoutes");
const process = require("process");
const cwd = process.cwd();
const _ = require("lodash");
const session = require('express-session');

const cookieParser = require('cookie-parser');



const environment = process.env.NODE_ENV || "development"; 

const app = express();
const PORT = process.env.PORT || 3001;

var corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,

};


app.use(cors(corsOptions));
app.use(cookieParser())

app.use(
    session({
        secret: `roughage-ecommerce-secret`,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
        },
    })
);
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/", (req, res) => {

    res.send("Backend is running");
    
})

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Your API",
            version: "1.0.0",
            description: "Documentation of roughAge-eCommerce API",
            contact: {
                name: "roughage-eCommerce Developers",
                email: "developer@roughage.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3001/v1/",
                description: "Local development server",
            },
            {
                url: "https://api.example.com/v1", 
                description: "Production server",
            },
            {
                url: "http://localhost:3001/v1/", 
                description: "Local development server for v1",
            },
          
        ],
    },
    
    apis: [
        "server.js",
        "src/controllers/*.js",
        "src/routes/*.js",
        "src/routes/admin/*.js",
        'src/controllers/Admin/*.js',
    ]
};

const specs = swaggerJsdoc(options);

app.use("/apidocs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/v1", routes);

app.use("/v1/admin", adminRoutes);

app.use(express.static("./uploads"));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        success: false,
        error: {code: statusCode, message: "Something went wrong!", err},
    });
});



app.post("/become-an-host", async (req, res, next) => {
    try {
        const newHost = await VendorEnquiry.create({...req.body, status: 0});
        if (newHost) {

            res.status(200).json({success: true, message: "Success", data: req.body}).send();
        } else {
            return res.status(400).json({success: false, message: "Unable to create an Enquiry"}).send();
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
})

// Sync the database and start the server
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${ PORT }`);
    });
});
