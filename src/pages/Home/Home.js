import React from 'react';
import Banner from './Banner/Banner';
import Contact from './Contact/Contact';
import Summary from './Summary/Summary';

const Home = () => {
    return (
        <div>
            <Banner />
            <Summary />
            <Contact />
        </div>
    );
};

export default Home;