'use client';
import { useRef, useState, useEffect } from "react";
import styles from "./realfunwave.module.css";

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

export default function RealFunWave() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);
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
      <header className={styles.header}>
        <div className={styles.logoArea}>
          {/* Placeholder SVG logo */}
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" stroke="#fff" strokeWidth="2"/><circle cx="20" cy="20" r="12" stroke="#ff9800" strokeWidth="2"/></svg>
          <span className={styles.brand}>REAL FUN WAVE</span>
        </div>
        {/* Hamburguesa en mobile */}
        <button className={styles.hamburgerBtn} onClick={() => setMenuOpen(true)} aria-label="Abrir menú" type="button">
          <span style={{fontSize:28, color:'#fff'}}>☰</span>
        </button>
        <nav className={styles.navLinks}>
          <a href="#quienes">QUIÉNES SOMOS</a>
          <a href="#experiencia">EXPERIENCIA</a>
          <a href="#viajes">PRÓXIMOS VIAJES</a>
          <a href="#testimonios">TESTIMONIOS</a>
          <a href="#contacto">CONTACTO</a>
        </nav>
        {/* Menú lateral hamburguesa */}
        {menuOpen && (
          <div className={styles.menuOverlay} onClick={() => setMenuOpen(false)}>
            <div className={styles.menuDrawer} onClick={e => e.stopPropagation()}>
              <button className={styles.closeMenuBtn} onClick={() => setMenuOpen(false)} aria-label="Cerrar menú">✕</button>
              <nav className={styles.menuNavLinks}>
                <a href="#quienes" onClick={() => setMenuOpen(false)}>QUIÉNES SOMOS</a>
                <a href="#experiencia" onClick={() => setMenuOpen(false)}>EXPERIENCIA</a>
                <a href="#viajes" onClick={() => setMenuOpen(false)}>PRÓXIMOS VIAJES</a>
                <a href="#testimonios" onClick={() => setMenuOpen(false)}>TESTIMONIOS</a>
                <a href="#contacto" onClick={() => setMenuOpen(false)}>CONTACTO</a>
              </nav>
            </div>
          </div>
        )}
      </header>
      <div className={styles.rfwPage}>
        {/* Hero Section with background video */}
        <section className={styles.hero}>
          <div className={styles.heroFadeTop}></div>
          <video
            ref={videoRef}
            className={styles.heroVideo}
            src="https://ixdacrdgrfojyzkoxssj.supabase.co/storage/v1/object/sign/realfunwave/hero.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzdiODE5ZTkwLThhN2EtNGYwMi05MGIyLWJlYzhkZTAwNzc4NCJ9.eyJ1cmwiOiJyZWFsZnVud2F2ZS9oZXJvLm1wNCIsImlhdCI6MTc0NzI0MzA5NywiZXhwIjoxNzc4Nzc5MDk3fQ.5_W2EEomSJdIinN5o8zXJzwzId60Rl003mcxJnMSFMI"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className={styles.heroFadeBottom}></div>
          <button
            className={styles.audioBtn}
            onClick={toggleAudio}
            aria-label={muted ? "Activar audio" : "Desactivar audio"}
            type="button"
          >
            {muted ? "🔇" : "🔊"}
          </button>
          <div className={styles.heroOverlay}>
            <h1>Real Fun Wave</h1>
            <h3 style={{fontWeight:400, marginTop:8, color:'#ff9800', fontSize:'1.25em', letterSpacing:'0.01em'}}>Más que un surftrip: experiencias, comunidad y diversión real</h3>
          </div>
          <style jsx>{`
            @media (max-width: 600px) {
              .heroOverlay h1 {
                font-size: 2rem;
              }
              .heroOverlay h3 {
                font-size: 1rem;
              }
            }
          `}</style>
        </section>
        {/* Sección QUIÉNES SOMOS */}
        <section id="quienes" className={styles.aboutSection}>
          <h2>¿Quiénes somos?</h2>
          <p>Somos un equipo apasionado por el surf y la aventura, dedicados a crear experiencias únicas en la playa y el mar.</p>
        </section>
        {/* Cards visuales */}
        <section className={styles.cardGrid}>
          {cards.map((card, i) => (
            <div className={styles.card} key={i}>
              <img src={card.img} alt={card.title} className={styles.cardImg} />
              <div className={styles.cardContent}>
                <h2>{card.title}</h2>
                <p>{card.text}</p>
              </div>
            </div>
          ))}
        </section>
        {/* Cards de video */}
        <section className={styles.cardGrid}>
          {videoCards.map((card, i) => (
            <div className={styles.card} key={i} onClick={() => openVideoModal(card.video)} style={{cursor:'pointer'}}>
              <img
                src={card.thumbnail}
                alt={card.title}
                className={styles.cardImg}
              />
              <div className={styles.cardContent}>
                <h2>{card.title}</h2>
                <p style={{marginBottom: 4, color: '#bbb', fontSize: '0.95em'}}>{card.description}</p>
              </div>
            </div>
          ))}
        </section>
        {/* Sección de testimonios con slider */}
        <section className={styles.testimonialsSection} style={{margin: '48px auto', maxWidth: 700, textAlign: 'center', position:'relative'}}>
          <h2 style={{color: '#ff9800', marginBottom: 24}}>Testimonios</h2>
          <div style={{background:'#181818', borderRadius:18, boxShadow:'0 4px 32px rgba(0,0,0,0.18)', padding:'32px 24px', minHeight:180, position:'relative', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center'}}>
            {/* Flecha izquierda */}
            <button onClick={goToPrev} aria-label="Anterior" style={{position:'absolute',left:-32,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',color:'#ff9800',fontSize:22,opacity:0.5,cursor:'pointer',zIndex:2,transition:'opacity 0.2s',padding:0,lineHeight:1}}>&#8592;</button>
            {/* Flecha derecha */}
            <button onClick={goToNext} aria-label="Siguiente" style={{position:'absolute',right:-32,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',color:'#ff9800',fontSize:22,opacity:0.5,cursor:'pointer',zIndex:2,transition:'opacity 0.2s',padding:0,lineHeight:1}}>&#8594;</button>
            <blockquote style={{
              fontSize:'1.15rem',
              color:'#f3e9e0',
              fontStyle:'italic',
              margin:0,
              lineHeight:1.5,
              opacity: fade ? 1 : 0,
              transition: 'opacity 0.6s',
              minHeight: 90,
              width: '100%'
            }}>
              “{testimonials[testimonialIndex].text}”
            </blockquote>
            <div style={{marginTop:24, color:'#ff9800', fontWeight:700, fontSize:'1.1rem', textAlign:'center'}}>
              {testimonials[testimonialIndex].name}
            </div>
            <div style={{position:'absolute', bottom:16, left:0, right:0, display:'flex', justifyContent:'center', gap:8}}>
              {testimonials.map((_, idx) => (
                <span key={idx} style={{width:10, height:10, borderRadius:'50%', background: testimonialIndex===idx ? '#ff9800' : '#444', display:'inline-block', transition:'background 0.2s'}}></span>
              ))}
            </div>
          </div>
          {/* Responsive: flechas más cerca y pequeñas en mobile */}
          <style>{`
            @media (max-width: 700px) {
              .testimonialsSection button[aria-label="Anterior"] { left: 2px !important; font-size: 16px !important; }
              .testimonialsSection button[aria-label="Siguiente"] { right: 2px !important; font-size: 16px !important; }
            }
          `}</style>
        </section>
        {/* Modal de video */}
        {modalOpen && (
          <div className={styles.videoModal} onClick={closeModal}>
            <div className={styles.videoModalContent} onClick={e => e.stopPropagation()}>
              <video src={modalVideo || undefined} controls autoPlay style={{width:'100%',borderRadius:'16px',background:'#000'}}/>
              <button className={styles.closeModalBtn} onClick={closeModal} aria-label="Cerrar">✕</button>
            </div>
          </div>
        )}
        {/* Sección de contacto */}
        <section id="contacto" className={styles.cardGrid} style={{marginTop:48, marginBottom:32}}>
          <div className={styles.card} style={{maxWidth:'100%', width:'100%', margin:'0 auto'}}>
            <h2 style={{textAlign:'center', color:'#ff9800'}}>Contacto</h2>
            <form className={styles.contactForm} onSubmit={e => e.preventDefault()} style={{marginTop:16}}>
              <input type="text" name="nombre" placeholder="Nombre" required />
              <input type="email" name="email" placeholder="Email" required />
              <textarea name="consulta" placeholder="Tu consulta" rows={4} required />
              <button type="submit">Enviar</button>
            </form>
          </div>
        </section>
        {/* Footer con redes sociales */}
        <footer className={styles.footer}>
          <div className={styles.socialLinks}>
            <a href="https://www.instagram.com/realfunwave/" target="_blank" rel="noopener" aria-label="Instagram">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="6" stroke="#fff" strokeWidth="2"/><circle cx="12" cy="12" r="5" stroke="#fff" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="#fff"/></svg>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener" aria-label="TikTok">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M16 2v2.5A3.5 3.5 0 0 0 19.5 8H22v3a7 7 0 1 1-7-7h1Z" stroke="#fff" strokeWidth="2"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener" aria-label="YouTube">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="4" stroke="#fff" strokeWidth="2"/><path d="M10 9.5v5l5-2.5-5-2.5Z" fill="#fff"/></svg>
            </a>
          </div>
        </footer>
        {/* Botón flotante de WhatsApp */}
        <a href="https://wa.me/5491112345678" className={styles.whatsappBtn} target="_blank" rel="noopener" aria-label="WhatsApp">
          <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#25D366"/><path d="M22.5 18.5c-.3-.2-1.8-.9-2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a7.6 7.6 0 0 1-2.2-2.2c-.2-.3 0-.5.1-.7.1-.1.2-.3.3-.5.1-.2 0-.4 0-.6s-.7-1.7-1-2.3c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5 0-.7.2-.2.2-.8.8-.8 2 0 1.2.8 2.4 1 2.7.2.3 1.6 2.6 4 3.5.6.2 1 .3 1.3.2.4-.1 1.2-.5 1.4-1 .2-.5.2-.9.1-1z" fill="#fff"/></svg>
        </a>
      </div>
    </>
  );
}



