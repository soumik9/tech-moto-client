import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import Loading from '../../Shared/Loading/Loading';
import 'swiper/css';
import "swiper/css/pagination";
import { Pagination } from "swiper";
import './review.css'
import Rating from './Rating';

const Reviews = () => {

    const { data: reviews, isLoading } = useQuery('reviews', () => 
        fetch(`https://tech-moto-9.herokuapp.com/reviews`)
        .then(res => res.json())
    )

    if(isLoading){return <Loading />}


    return (
        <section className='reviews my-100'>
        <Container>

            <div className="review__header">
                <Row className='justify-content-center'>
                    <Col md={6}>
                        <div className='text-center'>
                            <h2 className='text-uppercase'>Reviews from our customers</h2>
                            <p className='tech-title'>Feedback & Reviews</p>
                        </div>
                    </Col>
                </Row>
            </div>

            <div className="review__body mt-5">
                <Row>
                <Col md={12}>
                            <Swiper
                                slidesPerView={3}
                                spaceBetween={30}
                                pagination={{
                                    clickable: true,
                                }}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 1,
                                        spaceBetween: 0,
                                    },
                                    640: {
                                        slidesPerView: 1,
                                        spaceBetween: 0,
                                    },
                                    768: {
                                        slidesPerView: 2,
                                        spaceBetween: 20,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                        spaceBetween: 30,
                                    },
                                }}
                                modules={[Pagination]}
                                className="mySwiper" >

                                <Row>
                                    {
                                        reviews.map(review => (
                                            <Col lg={4} md={6} key={review._id}>
                                                <SwiperSlide>
                                                    <Card>
                                                        <Card.Body>
                                                            <div className="card__header d-flex align-items-center mb-4">
                                                                <div className='img__container'><img src={review.img} alt="" /></div>
                                                                <div>
                                                                    <h3>{review.name}</h3>
                                                                    <small className='tech-title'>{review.rank}</small>
                                                                    <small><Rating 
                                                                        rating={review.rating}
                                                                    ></Rating></small>
                                                                </div>
                                                            </div>
                                                            <div className="card__details">
                                                                <p>{review.description}</p>
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                </SwiperSlide>
                                            </Col>
                                        ))
                                    }
                                </Row>


                            </Swiper>
                        </Col>
                </Row>
            </div>

        </Container>
    </section>
    );
};

export default Reviews;