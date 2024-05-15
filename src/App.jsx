import { BrowserRouter } from 'react-router-dom';
import { About, Contact, Experience, Hero, Navbar, Projects, StarsCanvas, Card } from './components';
import useMeasure from 'react-use-measure';
import { useMotionValue } from 'framer-motion';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { animate } from 'framer-motion';

const App = () => {
  const images = [ // public/images
    "/herobg.png",
    "/bgimage.jpg",
  ]

  let [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);
  useEffect(() => {
    let controls;
    let finalPosition = -width / 2 - 8;

    controls = animate(xTranslation, [0, finalPosition], {
      ease: "linear",
      duration: 50,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });

    return controls.stop;
  }, [xTranslation, width]);

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <motion.div className="absolute left-0 flex gap-4" ref={ref} style={{ x: xTranslation }}>
            {[...images, ...images].map((item, index) => (
              <Card image={item} key={index} />
            ))}
          </motion.div>
          <Navbar />
          <Hero />
        </div>
        <Projects />
        <Experience />

        <div className="relative z-0">
          <About />
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
