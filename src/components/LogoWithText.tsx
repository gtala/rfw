import Image from "next/image";

interface LogoProps {
  color?: string;
  size?: number;
  style?: React.CSSProperties;
}

export function Logo({ color = "#fdd786", size = 80, style = {} }: LogoProps) {
  return (
    <Image
      src="/logo.svg"
      alt="Logo"
      width={size}
      height={size}
      style={{
        filter: color === "#fff" ? "brightness(0) invert(1)" : "none",
        background: "transparent",
        mixBlendMode: "normal",
        objectFit: "contain",
        display: "block",
        ...style
      }}
      priority
    />
  );
}

interface LogoWithTextProps {
  color?: string;
  textColor?: string;
  size?: number;
}

export default function LogoWithText({ color = "#fdd786", textColor = "#fdd786", size = 80 }: LogoWithTextProps) {
  const logoSize = size * 0.7; // Achicar el logo un 30%
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 6,
      background: "transparent"
    }}>
      <Logo color={color} size={logoSize} />
      <span style={{
        fontFamily: "'Oswald', Arial, sans-serif",
        fontWeight: 900,
        fontSize: size * 0.19,
        color: textColor,
        letterSpacing: "0.04em",
        lineHeight: 1.1,
        textTransform: "uppercase",
        background: "transparent"
      }}>
        REAL<br />FUN<br />WAVE
      </span>
    </div>
  );
} 