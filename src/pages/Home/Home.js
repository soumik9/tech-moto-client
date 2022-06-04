import React from 'react';
import About from './About/About';
import Banner from './Banner/Banner';
import Contact from './Contact/Contact';
import GetNews from './GetNews/GetNews';
import Reviews from './Reviews/Reviews';
import Summary from './Summary/Summary';
import Tools from './Tools/Tools';

const Home = () => {
    return (
        <div>
            <Banner />
            <Tools />
            <Summary />
            <About />
            <GetNews />
            <Reviews />
            <Contact />
        </div>
    );
};

export default Home;