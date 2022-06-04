import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './team.css'

const OurTeam = () => {

    const data = [
        { name: "Mr. Tusar", img: "https://i.ibb.co/nPsdh63/ben-parker-Noh-B3-FJSY90-unsplash-1.jpg", position: "Web Developer", description: "Hi! I am Tusar, a web developer focused on crafting great web experiences. Designing and Coding have been my passion since the days I started working with computers but I found myself into web design/development since 2007. I enjoy creating beautifully designed, intuitive and functional websites." },
        { name: "Taj Sreya", img: "https://i.ibb.co/0n1Qr7P/courtney-cook-TSZo17r3m0s-unsplash-1.jpg", position: "Content writter", description: "My name is Taj Sreya. I'm a content writter based in Bangladesh ☀️. I describe myself as a passionate writter who loves writting, open source, and the news platform ❤️." },
        { name: "Peoms Ove", img: "https://i.ibb.co/yWzXMnZ/joseph-gonzalez-i-Fg-Rcq-Hznqg-unsplash-1.jpg", position: "Wordpress Developer", description: "Design and implement websites for companies using the WordPress creation tool. They are responsible for both front-end and back-end development, including the implementation of themes and plugins. Their goal is to create attractive and user-friendly websites according to client specifications." }
    ]

    return (
        <section className='my-100'>
            <Container>
                <div className="review__header">
                    <Row className='justify-content-center'>
                        <Col md={6}>
                            <div className='text-center'>
                                <h2 className='text-uppercase'>Meet the People behind TECH MOTO</h2>
                                <p className='tech-title'>We are a team of Insurance and technology specialists who is passionate about user experience in Insurance.We started after over a decade experience in the Insurance Industry working with multiple Insurance Carriers, Intermediaries and Technology providers.Our understanding and expertise of this business is what makes us unique and focused towards delivering great value to our customers.</p>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Row className='mt-5'>
                    {
                        data.map((info, index) => (
                            <Col md={4}>
                                <div className="image-flip" >
                                    <div className="mainflip flip-0">
                                        <div className="frontside">
                                            <div className="card">
                                                <div className="card-body text-center">
                                                    <p>
                                                        <img className="img-fluid" src={info.img} alt="" />
                                                    </p>
                                                    <h4 className="card-title">{info.name}</h4>
                                                    <p className="card-text">{info.position}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="backside">
                                            <div className="card">
                                                <div className="card-body text-center mt-4">
                                                    <h4 className="card-title tech-title">{info.name}</h4>
                                                    <p className="card-text">{info.description}.</p>
                                                    <ul className="list-inline">
                                                        <li className="list-inline-item">
                                                            <a className="social-icon text-xs-center" href="https://www.fiverr.com/share/qb8D02">
                                                                <i className="fa fa-facebook"></i>
                                                            </a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a className="social-icon text-xs-center" href="https://www.fiverr.com/share/qb8D02">
                                                                <i className="fa fa-twitter"></i>
                                                            </a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a className="social-icon text-xs-center" href="https://www.fiverr.com/share/qb8D02">
                                                                <i className="fa fa-skype"></i>
                                                            </a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a className="social-icon text-xs-center" href="https://www.fiverr.com/share/qb8D02">
                                                                <i className="fa fa-google"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))
                    }

                </Row>
            </Container>
        </section>
    );
};

export default OurTeam;