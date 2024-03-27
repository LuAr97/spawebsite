import Title from "../components/Title";
import { useEffect, useState } from "react";
import { Container, Carousel } from "react-bootstrap";

const Home = () => {
    
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex: number) => {
        setIndex(selectedIndex);
    }
    return (
        <div>
            <Title>Home</Title>
            <Container>
                <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <a href="/corporales">
                        <img src="/img/services/carousel/body1.jpg" width="800" height="400"/>
                        <Carousel.Caption>
                        <h3>Body</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </a>
                </Carousel.Item>
                <Carousel.Item>
                    <a href="/faciales">
                        <img src="/img/services/carousel/facial.jfif" width="800" height="400"/>
                        <Carousel.Caption>
                        <h3>Facials</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </a>
                </Carousel.Item>
                <Carousel.Item>
                    <img src="/img/services/carousel/body2.jpg" width="800" height="400"/>
                    <Carousel.Caption>
                    <h3>Location</h3>
                    <p>80 Roberts st, WestFootscray 3012</p>
                    </Carousel.Caption>
                </Carousel.Item>
                </Carousel>
            </Container>
        </div>
    );
}
export default Home;