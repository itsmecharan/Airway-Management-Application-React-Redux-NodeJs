import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Carousal() {
    return (
        <div className="div-carousel">
            <div className="carousel-wrapper" >
                <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true}>
                    <div>
                        <img src={'https://skift.com/wp-content/uploads/2017/06/American-Airlines-737-Max.jpg'}
                            className="carousel-img" alt="" />
                    </div>
                    <div>
                        <img src={'https://airhex.com/images/photos/airline-logos.png'}
                            className="carousel-img" alt="" />
                    </div>
                    <div>
                        <img src={'http://1.bp.blogspot.com/-T4ELaVOf90k/TjU5RLhlSzI/AAAAAAAAALU/Zd7-nA6IAv8/s1600/air_india_logo_vector.jpg'}
                            className="carousel-img" alt="" />
                    </div>
                </Carousel>
            </div>
        </div>
    )
}
