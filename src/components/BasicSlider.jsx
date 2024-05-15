import React from 'react';
import HeroSlider, { Slide } from 'hero-slider';

// Images
const img = './herobg.png';
const img2 = './creator.png';

const App = () => {
    return (
        <HeroSlider
            slidingAnimation="left_to_right"
            orientation="horizontal"
            initialSlide={1}
            onBeforeChange={(previousSlide, nextSlide) => console.log("onBeforeChange", previousSlide, nextSlide)}
            onChange={nextSlide => console.log("onChange", nextSlide)}
            onAfterChange={nextSlide => console.log("onAfterChange", nextSlide)}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.33)" }}
            settings={{
                slidingDuration: 250,
                slidingDelay: 100,
                shouldAutoplay: true,
                shouldDisplayButtons: true,
                autoplayDuration: 5000,
                height: "100vh"
            }}
        >
            <Slide background={{    // copy and paste per slide
                backgroundImage: img,
                backgroundAttachment: "fixed"
            }}
            />
            <Slide background={{    // copy and paste per slide
                backgroundImage: img,
                backgroundAttachment: "fixed"
            }}
            />
        </HeroSlider>
    )
}

export default App;