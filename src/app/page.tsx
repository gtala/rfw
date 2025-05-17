'use client';
import { useRef, useState, useEffect } from "react";
import styles from "./realfunwave.module.css";
import { motion } from "framer-motion";

const cards: any[] = []
/*[
  {
    title: "Incluye",
    text: "Diseño visual + desarrollo en plataforma web (Wix, Wordpress o HTML/CSS)",
    img: "https://ixdacrdgrfojyzkoxssj.supabase.co/storage/v1/object/sign/realfunwave/467602731_18312274591166143_3341892348689306037_n.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzdiODE5ZTkwLThhN2EtNGYwMi05MGIyLWJlYzhkZTAwNzc4NCJ9.eyJ1cmwiOiJyZWFsZnVud2F2ZS80Njc2MDI3MzFfMTgzMTIyNzQ1OTExNjYxNDNfMzM0MTg5MjM0ODY4OTMwNjAzN19uLmpwZyIsImlhdCI6MTc0NzIzNTg3MywiZXhwIjoxNzc4NzcxODczfQ.ZOCxLYwJf-Crli9ghHXcwPfG0umHaIfXIZ0eapR8KOE"
  },
  {
    title: "Contenido estimado",
    text: "Secciones: Hero / Quiénes somos / Experiencias y próximos viajes / Testimonios / CTA de contacto o inscripción",
    img: "https://ixdacrdgrfojyzkoxssj.supabase.co/storage/v1/object/sign/realfunwave/470178703_18314745352166143_1434773567276129959_n.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzdiODE5ZTkwLThhN2EtNGYwMi05MGIyLWJlYzhkZTAwNzc4NCJ9.eyJ1cmwiOiJyZWFsZnVud2F2ZS80NzAxNzg3MDNfMTgzMTQ3NDUzNTIxNjYxNDNfMTQzNDc3MzU2NzI3NjEyOTk1OV9uLmpwZyIsImlhdCI6MTc0NzIzNTg5NCwiZXhwIjoxNzc4NzcxODk0fQ.7HReG4amqCr0DxaqAivurc8brE9gjQRuO4Y4sPcyE68"
  },
  {
    title: "Estilo visual",
    text: "Cinemático, inspirado en el mundo del surf y la aventura. Uso de fotografías, videos, animaciones sutiles y scroll fluido.",
    img: "https://ixdacrdgrfojyzkoxssj.supabase.co/storage/v1/object/sign/realfunwave/470178703_18314745352166143_1434773567276129959_n.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzdiODE5ZTkwLThhN2EtNGYwMi05MGIyLWJlYzhkZTAwNzc4NCJ9.eyJ1cmwiOiJyZWFsZnVud2F2ZS80NzAxNzg3MDNfMTgzMTQ3NDUzNTIxNjYxNDNfMTQzNDc3MzU2NzI3NjEyOTk1OV9uLmpwZyIsImlhdCI6MTc0NzIzNTg5NCwiZXhwIjoxNzc4NzcxODk0fQ.7HReG4amqCr0DxaqAivurc8brE9gjQRuO4Y4sPcyE68"
  }
];*/

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

// Resúmenes de testimonios
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
    title: 'Real Fun Wave',
    video: 'https://ixdacrdgrfojyzkoxssj.supabase.co/storage/v1/object/sign/realfunwave/hero.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzdiODE5ZTkwLThhN2EtNGYwMi05MGIyLWJlYzhkZTAwNzc4NCJ9.eyJ1cmwiOiJyZWFsZnVud2F2ZS9oZXJvLm1wNCIsImlhdCI6MTc0NzI0MzA5NywiZXhwIjoxNzc4Nzc5MDk3fQ.5_W2EEomSJdIinN5o8zXJzwzId60Rl003mcxJnMSFMI'
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
  }
];

// Helper para animar letras
function AnimatedTitle({ text }: { text: string }) {
  const letters = text.split("");
  return (
    <motion.span
      style={{ display: "inline-block", width: "100%" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.7 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.045
          }
        }
      }}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          style={{ display: char === " " ? "inline-block" : "inline-block" }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 24 } }
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
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

  return (
    <>
      {/* Menú hamburguesa animado */}
      <motion.button
        initial={{ opacity: 0, scale: 0.7, x: 40 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1, type: 'spring', bounce: 0.4, delay: 0.3 }}
        style={{
          position: 'fixed',
          top: 32,
          right: 32,
          zIndex: 1001,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          width: 48,
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-label="Abrir menú"
      >
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
          <rect y="8" width="38" height="4" rx="2" fill="#111" />
          <rect y="17" width="38" height="4" rx="2" fill="#111" />
          <rect y="26" width="38" height="4" rx="2" fill="#111" />
        </svg>
      </motion.button>
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
            style={{
              position: 'relative',
              width: '100vw',
              height: '100vh',
              minHeight: '100vh',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              scrollSnapAlign: 'start',
            }}
          >
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
              <h1 style={{
                fontSize: 'clamp(2.5rem, 8vw, 7rem)',
                textAlign: 'center',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                fontWeight: 900
              }}>
                <AnimatedTitle text={slide.title} />
              </h1>
            </motion.div>
          </section>
        ))}
      </div>
    </>
  );
}



