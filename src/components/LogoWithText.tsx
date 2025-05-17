import Image from "next/image";

export default function LogoWithText({ color = "#fdd786", textColor = "#fdd786", size = 80 }) {
  const logoSize = size * 0.7; // Achicar el logo un 30%
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 6
    }}>
      <Image
        src="/logo.svg"
        alt="Logo"
        width={logoSize}
        height={logoSize}
        style={{
          filter: color === "#fff" ? "brightness(0) invert(1)" : "none"
        }}
        priority
      />
      <span style={{
        fontFamily: "'Oswald', Arial, sans-serif",
        fontWeight: 900,
        fontSize: size * 0.19,
        color: textColor,
        letterSpacing: "0.04em",
        lineHeight: 1.1,
        textTransform: "uppercase"
      }}>
        REAL<br />FUN<br />WAVE
      </span>
    </div>
  );
} 