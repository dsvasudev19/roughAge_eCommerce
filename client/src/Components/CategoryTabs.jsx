import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import products from "../products";
import Product from "./Product";
import { useState } from 'react';

function CategoryTabs() {
    return (
        <Tabs
            defaultActiveKey="profile"
            id="justify-tab-example"
            className="mb-3"
            justify
            >
            <Tab eventKey="fruits" title="Fruits">
                {/* Tab content for Fruits */}
            </Tab>
            <Tab eventKey="vegetables" title="Vegetables">
                {/* Tab content for Vegetables */}
            </Tab>
            <Tab eventKey="cereals" title="Cereals">
                {/* Tab content for Cereals */}
            </Tab>
            
        </Tabs>
    
    );
}

export default CategoryTabs;