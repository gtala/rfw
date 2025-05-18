'use client';
import { useRef, useState, useEffect } from 'react';
import styles from './realfunwave.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../components/LogoWithText';
import LogoWithText from '../components/LogoWithText';
import { videoCards } from '../data/videoCards';
import { testimonials } from '../data/testimonials';
import { slides } from '../data/slides';
import { useRouter } from 'next/navigation';

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
        let variants = {};
        if (slideIdx === 1) {
          variants = {
            hidden: { opacity: 0, x: -80 },
            visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 400, damping: 24 } }
          };
        } else if (slideIdx === 2) {
          variants = {
            hidden: { opacity: 0, x: 80 },
            visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 400, damping: 24 } }
          };
        } else if (slideIdx === 3) {
          variants = {
            hidden: { opacity: 0, scale: 0.7 },
            visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 400, damping: 24 } }
          };
        } else if (slideIdx === 4) {
          variants = {
            hidden: { opacity: 0, rotate: -90 }, // Fixed: Changed 'Hebrew' to 'opacity'
            visible: { opacity: 1, rotate: 0, transition: { type: "spring", stiffness: 400, damping: 24 } }
          };
        } else {
          variants = {
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { type: "spring", stiffness: 400, damping: 24 } }
          };
        }
        return (
          <motion.span
            key={i}
            style={{ display: "block", overflow: "hidden" }}
            variants={variants}
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [splashVisible, setSplashVisible] = useState(true);
  const [showTitle, setShowTitle] = useState(false);
  const [videoUnmuted, setVideoUnmuted] = useState(false);
  const router = useRouter();

  const toggleAudio = () => {
    setMuted((m) => !m);
    setVideoUnmuted((prev) => !prev);
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      if (!videoRef.current.muted) {
        videoRef.current.play().catch((error) => console.error('Error playing video:', error));
      }
    }
  };

  const openVideoModal = (videoUrl: string) => {
    setModalVideo(videoUrl);
    setModalOpen(true);
    setVideoUnmuted(false);
  };

  const closeModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setModalOpen(false);
    setModalVideo(null);
    setVideoUnmuted(false);
  };

  useEffect(() => {
    setThumbnails(videoCards.map((card) => card.thumbnail));
  }, [videoCards.length]);

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

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    slideRefs.current = slideRefs.current.slice(0, slides.length);
    slides.forEach((_, idx) => {
      if (!slideRefs.current[idx]) return;
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.7) {
            setActiveSlide(idx);
            const video = videoRefs.current[idx];
            if (video) {
              video.play().catch((error) => console.error('Error playing slide video:', error));
            }
          } else {
            const video = videoRefs.current[idx];
            if (video) {
              video.pause();
            }
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
    const splashTimer = setTimeout(() => {
      setSplashVisible(false);
      const headerTimer = setTimeout(() => {
        setShowTitle(true);
      }, 1500);
      return () => clearTimeout(headerTimer);
    }, 1000);
    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    // No programmatic play for iOS compatibility
  }, [modalOpen, modalVideo, videoUnmuted]);

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
                  ease: [0.3, 0, 1, 1],
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
            {!slide.imageOnly && slide.video && (
              <>
                <video
                  ref={el => { videoRefs.current[idx] = el; }}
                  className={styles.heroVideo}
                  src={slide.video}
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster={videoCards[idx - 1]?.thumbnail}
                  style={{
                    objectFit: 'cover',
                    width: '100vw',
                    height: '100vh',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    filter: 'brightness(0.8) contrast(1.1)'
                  }}
                  onError={(e) => console.error('Video error:', e)}
                />
              </>
            )}
            <div className={styles.heroFadeTop}></div>
            <div className={styles.heroFadeBottom}></div>
            <motion.div
              className={styles.heroOverlay}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.7 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ zIndex: 2 }}
            >
              {idx === slides.length - 1 ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  gap: 20
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 12,
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
                      marginLeft: 0,
                      textTransform: 'uppercase'
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
                      margin: 0,
                      textTransform: 'uppercase',
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
            {/* Botón para abrir el video, ahora al final y con z-index alto */}
            {!slide.imageOnly && slide.video && (
              <button
                onClick={() => router.push(`/video?src=${encodeURIComponent(slide.video)}`)}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  zIndex: 50,
                  background: 'rgba(0,0,0,0)',
                  border: 'none',
                  cursor: 'pointer',
                }}
                aria-label="Ver video en pantalla completa"
              />
            )}
          </section>
        ))}
      </div>

      {/* Video Modal Fullscreen */}
      {modalOpen && modalVideo && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.95)',
            zIndex: 5000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <button
            onClick={closeModal}
            style={{
              position: 'absolute',
              top: 24,
              right: 32,
              zIndex: 5100,
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: 36,
              cursor: 'pointer',
              fontWeight: 700,
              lineHeight: 1,
              padding: 0,
            }}
            aria-label="Cerrar video"
          >
            ×
          </button>
          <video
            ref={videoRef}
            src={modalVideo}
            controls
            playsInline
            muted
            style={{
              maxWidth: '100vw',
              maxHeight: '100vh',
              width: '100vw',
              height: '100vh',
              minWidth: 200,
              minHeight: 120,
              objectFit: 'contain',
              background: '#000',
              zIndex: 5001,
            }}
            onError={(e) => console.error('Modal video error:', e)}
            onClick={e => e.stopPropagation()}
          />
          <div style={{
            color: '#fff',
            fontSize: 18,
            marginTop: 16,
            textAlign: 'center'
          }}>
            Toca el botón de play para reproducir el video<br />
            (esto es obligatorio en iPhone/iPad)
          </div>
        </div>
      )}
    </>
  );
}