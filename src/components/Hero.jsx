import { motion } from 'framer-motion';
import { styles } from '../styles';

const Hero = () => { {/** CHANGE BACKGROUND IMG --> REPLACE HEROBG.PNG */ }
  return (
    <section className="relative w-full h-screen mx-auto">
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto-flex flex-row items-start gap-5`}>
        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>Hi, I'm <span className="text-[#7ec6cc]">Peyton</span></h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I'm a game developer specializing in <br className="sm:block hidden" />gameplay programming and technical art.
          </p>
        </div>
      </div>

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center"> { /** LIL ICON THING */}
        <a href="#projects">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.dev
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'loop',
              }}
              whileInView="show"
              viewport={{ once: true, amount: 0.25}}
              className="w-3 h-3 rounded-full bg-secondary mb-1"/>
          </div>
        </a>
      </div>
    </section>
  )
}

export default Hero