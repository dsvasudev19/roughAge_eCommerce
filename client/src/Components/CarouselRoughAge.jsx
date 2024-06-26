import Carousel from 'react-bootstrap/Carousel';
import React from 'react';
function CarouselRoughAge() {
    return (
        <Carousel className='carouselMain'>
            <Carousel.Item interval={ 2000 } className='carousItem'>
                <img
                    className="d-block w-100 carImage"
                    src="/Gallery/a1.png"
                    alt="First slide"
                />
                <Carousel.Caption>
{/*                     <h3 className='carouselCaptionHeading'>Rooted in Nature, Bursting with Flavor: Explore Our Organic Wonderland 🌻🍊</h3> */}
                    {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={ 1000 } className='carousItem'>
                <img
                    className="d-block w-100 carImage"
                    src="/Gallery/a2.png"
                    alt="First slide"
                />
                <Carousel.Caption>
{/*                     <h3 className='carouselCaptionHeading'>Where Freshness Meets Flavor: Embrace the Organic Lifestyle!</h3> */}
                    {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                </Carousel.Caption>
            </Carousel.Item> 
            <Carousel.Item interval={ 1000 } className='carousItem'>
                <img
                    className="d-block w-100 carImage"
                    src="/Gallery/a3.png"
                    alt="First slide"
                />
                <Carousel.Caption>
{/*                     <h3 className='carouselCaptionHeading'>Nature's Finest Harvest: Handpicked and Delivered with Love 🌱🍓</h3> */}
                    {/*<p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p> */}
                </Carousel.Caption>
            </Carousel.Item> 
        </Carousel>
    );
}

export default CarouselRoughAge;
