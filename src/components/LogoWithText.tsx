import Image from "next/image";

export default function LogoWithText({ color = "#fdd786", textColor = "#fdd786", size = 80 }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 18
    }}>
      <Image
        src="/logo.svg"
        alt="Logo"
        width={size}
        height={size}
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