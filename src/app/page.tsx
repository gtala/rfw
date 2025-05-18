'use client';
import { useRef, useState, useEffect } from "react";
import styles from "./realfunwave.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "../components/LogoWithText";
import LogoWithText from "../components/LogoWithText";


const videoCards = [
   {
    title: 'Clases de surf',
    description: 'Aprende y disfruta del surf con instructores expertos en un entorno seguro y divertido.',
    video: 'https://ixdacrdgrfojyzkoxssj.supabase.co/storage/v1/object/sign/realfunwave/surf.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzdiODE5ZTkwLThhN2EtNGYwMi05MGIyLWJlYzhkZTAwNzc4NCJ9.eyJ1cmwiOiJyZWFsZnVud2F2ZS9zdXJmLm1wNCIsImlhdCI6MTc0NzI0NjQ4MCwiZXhwIjoxNzc4NzgyNDgwfQ.vJzq-hj6JQWKdrU5ljDOh0hJJVPQ6uSdMnIl2RHHcRM',
    thumbnail: 'https://ixdacrdgrfojyzkoxssj.supabase.co/storage/v1/object/sign/realfunwave/thumbnails/surf-thumb.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzdiODE5ZTkwLThhN2EtNGYwMi05MGIyLWJlYzhkZTAwNzc4NCJ9.eyJ1cmwiOiJyZWFsZnVud2F2ZS90aHVtYm5haWxzL3N1cmYtdGh1bWIucG5nIiwiaWF0IjoxNzQ3MzIyMDg0LCJleHAiOjE3Nzg4NTgwODR9.MAT93bQLD2u4ZyVXoVBkzHJ1WCH_pYpQVm138V2BdNo'
  },
   {
    title: 'Casa Club', 
    description: 'Un espacio de encuentro y relax para los participantes.',
    video: 'https://ixdacrdgrfojyzkoxssj.supabase.co/storage/v1/object/sign/realfunwave/casa.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzdiODE5ZTkwLThhN2EtNGYwMi05MGIyLWJlYzhkZTAwNzc4NCJ9.eyJ1cmwiOiJyZWFsZnVud2F2ZS9jYXNhLm1wNCIsImlhdCI6MTc0NzI0NDIwMCwiZXhwIjoxNzc4NzgwMjAwfQ.95hAkfbepD5q-ulCjvvZF7E_HxkPy6gq2PzBb3nQGMA',
    thumbnail: 'https://ixdacrdgrfojyzkoxssj.supabase.co/storage/v1/object/sign/realfunwave/thumbnails/casa-thumb.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzdiODE5ZTkwLThhN2EtNGYwMi05MGIyLWJlYzhkZTAwNzc4NCJ9.eyJ1cmwiOiJyZWFsZnVud2F2ZS90aHVtYm5haWxzL2Nhc2EtdGh1bWIucG5nIiwiaWF0IjoxNzQ3MzIyMDYyLCJleHAiOjE3Nzg4NTgwNjJ9.B4UM57Mpu8Ta-yelGbIGK8rpEtzIIfkHH98V06C4DbE'
  },
  {
    title: 'Clase de Yoga',
    description: 'Sesiones de yoga para conectar cuerpo y mente frente al mar.',
    video: 'https://ixdacrdgrfojyzkoxssj.supabase.co/storage/v1/object/sign/realfunwave/yoga.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzdiODE5ZTkwLThhN2EtNGYwMi05MGIyLWJlYzhkZTAwNzc4NCJ9.eyJ1cmwiOiJyZWFsZnVud2F2ZS95b2dhLm1wNCIsImlhdCI6MTc0NzI0NDQxNywiZXhwIjoxNzc4NzgwNDE3fQ.MCv61vYfG46vWDNGdzdmlDBxBy17IHg5G3qrTKV5qF4',
    thumbnail: 'https://ixdacrdgrfojyzkoxssj.supabase.co/storage/v1/object/sign/realfunwave/thumbnails/yoga-thumb.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzdiODE5ZTkwLThhN2EtNGYwMi05MGIyLWJlYzhkZTAwNzc4NCJ9.eyJ1cmwiOiJyZWFsZnVud2F2ZS90aHVtYm5haWxzL3lvZ2EtdGh1bWIucG5nIiwiaWF0IjoxNzQ3MzIyMDkxLCJleHAiOjE3Nzg4NTgwOTF9.DcIoAx3ToPL5gclgRZV56AY39szI3QdKrrFLT7rfxgo'
  },
  {
    title: 'Comida Gourmet',
    description: 'Disfruta de una experiencia culinaria saludable y deliciosa.',
    video: 'https://ixdacrdgrfojyzkoxssj.supabase.co/storage/v1/object/sign/realfunwave/comida.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzdiODE5ZTkwLThhN2EtNGYwMi05MGIyLWJlYzhkZTAwNzc4NCJ9.eyJ1cmwiOiJyZWFsZnVud2F2ZS9jb21pZGEubXA0IiwiaWF0IjoxNzQ3MjQzODE3LCJleHAiOjE3Nzg3Nzk4MTd9.NVO2GM_IiWRv-uG3Aiy5nyFYBkLIla_FbQb4Cf5sfLg',
    thumbnail: 'https://ixdacrdgrfojyzkoxssj.supabase.co/storage/v1/object/sign/realfunwave/thumbnails/comida-thumb.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzdiODE5ZTkwLThhN2EtNGYwMi05MGIyLWJlYzhkZTAwNzc4NCJ9.eyJ1cmwiOiJyZWFsZnVud2F2ZS90aHVtYm5haWxzL2NvbWlkYS10aHVtYi5wbmciLCJpYXQiOjE3NDczMjIwNzcsImV4cCI6MTc3ODg1ODA3N30.-gmEQAWBIyF9EgNjE-vhE1GNrT_5fW3qgwJvT7L4OAw'
  }
];

const testimonials = [
  {
    name: 'Guido RFW',
    text: 'Un viaje divino, lleno de lindas personas. El último día hicimos canoa, surf, tragos y baile, y cerramos con un eclipse lunar en la playa. Ese día tan completo está entre mis mejores días, sin duda. Muy agradecido por lo vivido y por haberlos conocido. ¡Gracias por la buena vibra y tanta vitamina!'
  },
  {
    name: 'Andrea 🏄‍♀️',
    text: 'Aprender a surfear fue un gran desafío personal, ya que no sé nadar y siempre tuve miedo a las olas. Gracias a Real Fun Wave, lo logré con alegría y compañerismo. Las playas de Ubatuba y los profes me motivaron y entendieron mis miedos. El mejor consejo: "No trates de no caerte, todos se caen, hasta los campeones".'
  },
  {
    name: 'Belu Puigbo',
    text: 'Me anoté sin saber bien de qué se trataba, pero escuché buenas referencias. Siempre fui muy respetuosa del mar y nunca pensé que aprendería a surfear. Sin darme cuenta, estaba lejos de la orilla, animada por la energía del grupo. Superé mis expectativas y miedos. El viaje fue increíble y la experiencia, de las mejores que viví.'
  }
];

// Definir slides minimalistas
const slides = [
  {
    title: 'MÁS QUE UN SURFTRIP\nES REAL FUN',
    imageOnly: true // Only show image background, no video
  },
  {
    title: 'Clases de surf',
    video: videoCards[0].video
  },
  {
    title: 'Casa Club',
    video: videoCards[1].video
  },
  {
    title: 'Clase de Yoga',
    video: videoCards[2].video
  },
  {
    title: 'Comida Gourmet',
    video: videoCards[3].video
  },
  // Nueva slide final
  {
    title: 'Real Fun Wave',
    description: 'Surfcamp en📍Ubatuba, Brasil\nAprende a surfear con nosotros\nPróximo viaje del 23 al 29 de Junio',
    imageOnly: true
  }
];

// Helper para animar palabras con diferentes efectos por slide
function AnimatedTitle({ text, slideIdx }: { text: string, slideIdx: number }) {
  if (slideIdx === 0) {
    const lines = text.split("\n");
    return (
      <motion.span
        style={{ display: "inline-block", width: "100%" }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.18
            }
          }
        }}
      >
        {lines.map((line, i) => (
          <span key={i} style={{ display: "block", overflow: "hidden" }}>
            <motion.span
              style={{ display: "block", originX: i === 0 ? 0 : 1 }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    );
  }
  const words = text.split(" ");
  return (
    <motion.span
      style={{ display: "inline-block", width: "100%" }}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.15
          }
        }
      }}
    >
      {words.map((word, i) => {
        // Animación por slide y por palabra
        let variants = {};
        if (slideIdx === 1) {
          // Slide 1: izquierda
          variants = {
            hidden: { opacity: 0, x: -80 },
            visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 400, damping: 24 } }
          };
        } else if (slideIdx === 2) {
          // Slide 2: derecha
          variants = {
            hidden: { opacity: 0, x: 80 },
            visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 400, damping: 24 } }
          };
        } else if (slideIdx === 3) {
          // Slide 3: fade + scale
          variants = {
            hidden: { opacity: 0, scale: 0.7 },
            visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 400, damping: 24 } }
          };
        } else if (slideIdx === 4) {
          // Slide 4: rotación
          variants = {
            hidden: { opacity: 0, rotate: -90 },
            visible: { opacity: 1, rotate: 0, transition: { type: "spring", stiffness: 400, damping: 24 } }
          };
        } else {
          // Default: fade in
          variants = {
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { type: "spring", stiffness: 400, damping: 24 } }
          };
        }
        return (
          <motion.span
            key={i}
            style={{ display: "block", overflow: "hidden" }}
          >
            <motion.span
              style={{ display: "block", originX: i === 0 ? 0 : 1 }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {word}
            </motion.span>
          </motion.span>
        );
      })}
    </motion.span>
  );
}

export default function RealFunWave() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVideo, setModalVideo] = useState<string | null>(null);
  const [thumbnails, setThumbnails] = useState<(string | null)[]>([]);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const sliderTimeout = useRef<NodeJS.Timeout | null>(null);
  // Estado para el menú hamburguesa
  const [menuOpen, setMenuOpen] = useState(false);
  // Estado para el slide activo
  const [activeSlide, setActiveSlide] = useState(0);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [splashVisible, setSplashVisible] = useState(true);
  const [showTitle, setShowTitle] = useState(false);

  const toggleAudio = () => {
    setMuted((m) => !m);
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      if (!videoRef.current.muted) {
        videoRef.current.play();
      }
    }
  };

  const openVideoModal = (videoUrl: string) => {
    setModalVideo(videoUrl);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalVideo(null);
  };

  useEffect(() => {
    setThumbnails(videoCards.map(card => card.thumbnail));
  }, [videoCards.length]);

  // Slider automático para testimonios con fade
  useEffect(() => {
    setFade(false);
    const fadeTimeout = setTimeout(() => setFade(true), 100);
    return () => clearTimeout(fadeTimeout);
  }, [testimonialIndex]);

  useEffect(() => {
    if (sliderTimeout.current) clearTimeout(sliderTimeout.current);
    sliderTimeout.current = setTimeout(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => {
      if (sliderTimeout.current) clearTimeout(sliderTimeout.current);
    };
  }, [testimonialIndex]);

  const goToPrev = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  const goToNext = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  // Detectar slide activo con IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    slideRefs.current = slideRefs.current.slice(0, slides.length);
    slides.forEach((_, idx) => {
      if (!slideRefs.current[idx]) return;
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.7) {
            setActiveSlide(idx);
          }
        },
        { threshold: [0.7] }
      );
      observer.observe(slideRefs.current[idx]!);
      observers.push(observer);
    });
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const isLastSlide = activeSlide === slides.length - 1;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // First show splash for 1 second (spin duration)
    const splashTimer = setTimeout(() => {
      setSplashVisible(false);
      // Show both header and title after splash exit animation is complete
      const headerTimer = setTimeout(() => {
        setShowTitle(true);
      }, 1500); // Wait for splash exit animation
      return () => clearTimeout(headerTimer);
    }, 1000);
    return () => clearTimeout(splashTimer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {splashVisible && (
          <motion.div
            initial={{
              opacity: 1,
              scale: 1,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              opacity: 1,
              scale: 1,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            transition={{
              opacity: { duration: 0.5 },
              scale: { duration: 1.5, ease: 'easeInOut' },
              top: { duration: 1.5, ease: 'easeInOut' },
              left: { duration: 1.5, ease: 'easeInOut' },
              transform: { duration: 1.5, ease: 'easeInOut' }
            }}
            exit={{
              opacity: 0,
              scale: (isMobile ? 84 : 120) / (isMobile ? 200 : 360),
              top: isMobile ? 12 : 36,
              left: '50%',
              transform: 'translate(-50%, 0%)',
              transition: { duration: 1.5, ease: 'easeInOut' }
            }}
            style={{
              position: 'fixed',
              zIndex: 4000,
              width: isMobile ? 200 : 360,
              height: isMobile ? 200 : 360,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 1440 }}
              transition={{
                rotate: {
                  duration: 4,
                  ease: [0.3, 0, 1, 1], // aceleración más rápida
                }
              }}
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Logo 
                size={isMobile ? 200 : 360} 
                color="#fdd786"
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo + texto fijo arriba en todos los slides, excepto el último */}
      {!isLastSlide && showTitle && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            position: 'fixed',
            top: isMobile ? 12 : 36,
            left: 0,
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3000,
            pointerEvents: 'none',
          }}
        >
          <LogoWithText 
            color={activeSlide === 0 ? "#fdd786" : "#fff"} 
            textColor={activeSlide === 0 ? "#FEC868" : "#fff"} 
            size={isMobile ? 84 : 120} 
          />
        </motion.div>
      )}
      <div style={{
        height: '100vh',
        width: '100vw',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        WebkitOverflowScrolling: 'touch',
      }}>
        {slides.map((slide, idx) => (
          <section
            key={idx}
            ref={el => { slideRefs.current[idx] = el; }}
            style={{
              position: 'relative',
              width: '100vw',
              minHeight: '100vh',
              height: 'auto',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              scrollSnapAlign: 'start',
            }}
          >
            {/* Only render video if not imageOnly */}
            {!slide.imageOnly && slide.video && (
              <video
                className={styles.heroVideo}
                src={slide.video}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                style={{objectFit:'cover', width:'100vw', height:'100vh', position:'absolute', top:0, left:0, zIndex:1, filter:'brightness(0.8) contrast(1.1)'}}
              />
            )}
            <div className={styles.heroFadeTop}></div>
            <div className={styles.heroFadeBottom}></div>
            <motion.div
              className={styles.heroOverlay}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.7 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{zIndex:2}}
            >
              {idx === slides.length - 1 ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  gap: 32
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 32,
                    width: '100%'
                  }}>
                    <Logo color="#fdd786" size={isMobile ? 98 : 140} />
                    <span style={{
                      fontFamily: "'Oswald', Arial, sans-serif",
                      fontWeight: 900,
                      fontSize: isMobile ? 'clamp(2.2rem, 7vw, 4.5rem)' : 'clamp(2.5rem, 8vw, 7rem)',
                      color: '#fff',
                      letterSpacing: '-0.03em',
                      lineHeight: 1.05,
                      textAlign: 'left',
                      marginLeft: 12
                    }}>
                      Real Fun Wave
                    </span>
                  </div>
                  <div style={{
                    marginTop: 32,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                    <p style={{
                      fontSize: 'clamp(1.1rem, 2.5vw, 2.2rem)',
                      color: '#fff',
                      textAlign: 'center',
                      whiteSpace: 'pre-line',
                      fontWeight: 500,
                      letterSpacing: '0.01em',
                      lineHeight: 1.3,
                      margin: 0
                    }}>
                      <span style={{ color: '#FEC868', fontWeight: 700 }}>#surfcamp</span> en📍Ubatuba, Brasil{"\n"}
                      Aprende a surfear con nosotros{"\n"}
                      Próximo viaje del 23 al 29 de Junio{"\n"}
                      Dirige @nardonefernando
                    </p>
                    <div style={{ display: 'flex', gap: 32, marginTop: 32 }}>
                      <a href="https://www.instagram.com/realfunwave/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" fill="none"/>
                          <circle cx="12" cy="12" r="5"/>
                          <circle cx="17" cy="7" r="1.2" fill="white"/>
                        </svg>
                      </a>
                      <a href="https://wa.me/message/GWSFFN6YAOGFF1" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                        <svg width="44" height="44" viewBox="0 0 24 24" fill="white">
                          <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.07-1.36A9.93 9.93 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 17.93c-1.73 0-3.41-.51-4.84-1.47l-.34-.22-3.01.8.8-2.93-.22-.34A8.06 8.06 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.13-5.29c-.2-.1-1.18-.58-1.36-.65-.18-.07-.31-.1-.44.1-.13.2-.5.65-.61.78-.11.13-.22.15-.41.05-.2-.1-.84-.31-1.6-.99-.59-.53-.99-1.18-1.11-1.38-.11-.2-.01-.3.09-.4.09-.09.2-.22.3-.33.1-.11.13-.2.2-.33.07-.13.03-.25-.01-.35-.05-.1-.44-1.07-.6-1.47-.16-.39-.32-.34-.44-.35-.11-.01-.25-.01-.39-.01-.13 0-.35.05-.53.25-.18.2-.7.68-.7 1.65s.72 1.92.82 2.05c.1.13 1.41 2.16 3.42 2.95.48.21.85.33 1.14.42.48.15.92.13 1.27.08.39-.06 1.18-.48 1.35-.94.17-.46.17-.85.12-.94-.05-.09-.13-.13-.38-.23z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <h1 style={{
                  fontSize: isMobile
                    ? 'clamp(2.5rem, 16vw, 5.2rem)'
                    : 'clamp(3.5rem, 13vw, 8.5rem)',
                  textAlign: 'center',
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  fontWeight: 900,
                  color: idx === 0 ? '#FEC868' : '#fff',
                  marginTop: 18,
                  textTransform: 'uppercase',
                  width: '100vw',
                  maxWidth: '100vw',
                  overflowWrap: 'break-word',
                  wordBreak: 'break-word',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  paddingLeft: isMobile ? 8 : 0,
                  paddingRight: isMobile ? 8 : 0,
                }}>
                  {idx === 0 ? (
                    showTitle ? (
                      <AnimatedTitle key={activeSlide === idx ? `active-${idx}` : `inactive-${idx}`} text={slide.title} slideIdx={idx} />
                    ) : null
                  ) : (
                    slide.title
                  )}
                </h1>
              )}
            </motion.div>
          </section>
        ))}
      </div>
    </>
  );
}



