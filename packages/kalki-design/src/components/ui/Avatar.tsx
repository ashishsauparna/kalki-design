"use client";

import { useState } from "react";

/* ─── Color palette for initials fallback ─── */

const palette = [
  { bg: "#dbeafe", text: "#1e40af" }, // blue
  { bg: "#e0f6ef", text: "#065f46" }, // green
  { bg: "#ede9fe", text: "#5b21b6" }, // purple
  { bg: "#fef3c7", text: "#92400e" }, // amber
  { bg: "#fce7f3", text: "#9d174d" }, // pink
  { bg: "#e0ecff", text: "#1d4a86" }, // navy
];

function hashName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/* ─── Avatar Component ─── */

interface AvatarProps {
  name: string;
  src?: string;
  size?: number;
  className?: string;
}

export function Avatar({ name, src, size = 24, className = "" }: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const colors = palette[hashName(name) % palette.length];
  const initials = getInitials(name);
  const fontSize = Math.round(size * 0.42);

  if (src && !imgError) {
    return (
      <img
        src={src}
        alt={name}
        onError={() => setImgError(true)}
        className={`rounded-full object-cover shrink-0 ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full shrink-0 select-none ${className}`}
      style={{
        width: size,
        height: size,
        background: colors.bg,
        color: colors.text,
        fontSize,
        fontWeight: 600,
        lineHeight: 1,
        letterSpacing: "-0.01em",
      }}
      title={name}
    >
      {initials}
    </div>
  );
}
