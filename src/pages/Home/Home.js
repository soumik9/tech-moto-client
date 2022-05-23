import React from 'react';
import About from './About/About';
import Banner from './Banner/Banner';
import Contact from './Contact/Contact';
import Summary from './Summary/Summary';

const Home = () => {
    return (
        <div>
            <Banner />
            <Summary />
            <About />
            <Contact />
        </div>
    );
};

export default Home;