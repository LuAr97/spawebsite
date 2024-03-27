import Title from "../components/Title";
import {  useState } from "react";
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    Container
} from 'reactstrap';
const Home = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex : number) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const items = [
        {
          src: '/img/services/carousel/body2.jpg',
          altText: 'body',
          caption: 'Body',
          description : 'Unwind and rejuvenate with our luxurious body treatments and massages, tailored to soothe tired muscles, relieve tension, and leave you feeling refreshed, revitalized, and ready to take on the world',
          key: 1,
        },
        {
          src: '/img/services/carousel/facial.jfif',
          altText: 'facials',
          caption: 'Facials',
          description : 'Indulge in a revitalizing facial treatment to achieve radiant, youthful skin and experience ultimate relaxation and rejuvenation',
          key: 2,
        },
        {
          src: '/img/services/carousel/location.png',
          altText: 'https://maps.app.goo.gl/bigWch83KxPYNVPS7',
          caption: 'Location',
          description : '80 Roberts street, West Footscray 3012 VIC',
          key: 3,
        },
    ];
    
    const slides = items.map((item) => {
        return (
          <CarouselItem
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
            key={item.src}
          >
            <a href={
                item.caption !== 'Location' 
                ? `/${item.altText}`
                : `${item.altText}`}
                target="_blank" 
                rel="noopener noreferrer">
                <img src={item.src} alt={item.altText} width="900" height="410"/>
            </a>
            <CarouselCaption style={{ color:'#5E5C5D'}}
              captionText={item.description}
              captionHeader={item.caption}
            />
          </CarouselItem>
        );
    });
    
    return (
        <div>
            <Title>Home</Title>
            <Container>
                <Carousel
                    activeIndex={activeIndex}
                    next={next}
                    previous={previous}
                    
                    >
                    <CarouselIndicators
                        items={items}
                        activeIndex={activeIndex}
                        onClickHandler={goToIndex}
                    />
                    {slides}
                    <CarouselControl
                        direction="prev"
                        directionText="Previous"
                        onClickHandler={previous}
                    />
                    <CarouselControl
                        direction="next"
                        directionText="Next"
                        onClickHandler={next}
                    />
                </Carousel>
                
            </Container>
        </div>
    );
}
export default Home;