"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

/* ─────────────────────────────────────────────
 *  Tooltip
 *  Portal-based tooltip matching shadcn/ui style
 *
 *  Styling (matches shadcn exactly):
 *  - bg: #0f172a (primary), text: white, 12px
 *  - rounded-md (6px), px-3 py-1.5 (12px / 6px)
 *  - No arrow (shadcn default), no shadow
 *  - Fade + zoom + directional slide animation
 *  - 4px offset from trigger (sideOffset)
 *  - 150ms cubic-bezier(0.4, 0, 0.2, 1)
 *
 *  Features:
 *  - Renders via portal (never clipped by overflow)
 *  - Configurable side: top | bottom | left | right
 *  - Hover delay (default 200ms)
 *  - Auto-repositions on scroll/resize
 *  - Viewport clamping
 * ───────────────────────────────────────────── */

type Side = "top" | "bottom" | "left" | "right";

const ARROW = 5;

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  side?: Side;
  delayMs?: number;
  maxWidth?: number;
  sideOffset?: number;
  arrow?: boolean;
}

export function Tooltip({
  children,
  content,
  side = "top",
  delayMs = 200,
  maxWidth = 220,
  sideOffset = 4,
  arrow = false,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;
    if (!trigger || !tooltip) return;

    const tr = trigger.getBoundingClientRect();
    const tt = tooltip.getBoundingClientRect();

    let x = 0;
    let y = 0;

    switch (side) {
      case "top":
        x = tr.left + tr.width / 2 - tt.width / 2 - 4;
        y = tr.top - tt.height - sideOffset - 4;
        break;
      case "bottom":
        x = tr.left + tr.width / 2 - tt.width / 2;
        y = tr.bottom + sideOffset;
        break;
      case "left":
        x = tr.left - tt.width - sideOffset;
        y = tr.top + tr.height / 2 - tt.height / 2;
        break;
      case "right":
        x = tr.right + sideOffset;
        y = tr.top + tr.height / 2 - tt.height / 2;
        break;
    }

    x = Math.max(8, Math.min(x, window.innerWidth - tt.width - 8));
    y = Math.max(8, Math.min(y, window.innerHeight - tt.height - 8));

    setCoords({ x, y });
  }, [side, sideOffset]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [visible, updatePosition]);

  const show = () => {
    timerRef.current = setTimeout(() => setVisible(true), delayMs);
  };

  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  };

  const arrowStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = { position: "absolute", width: 0, height: 0, borderStyle: "solid" };
    switch (side) {
      case "top":
        return { ...base, bottom: -ARROW, left: "50%", transform: "translateX(-50%)",
          borderWidth: `${ARROW}px ${ARROW}px 0`, borderColor: "#0f172a transparent transparent" };
      case "bottom":
        return { ...base, top: -ARROW, left: "50%", transform: "translateX(-50%)",
          borderWidth: `0 ${ARROW}px ${ARROW}px`, borderColor: "transparent transparent #0f172a" };
      case "left":
        return { ...base, right: -ARROW, top: "50%", transform: "translateY(-50%)",
          borderWidth: `${ARROW}px 0 ${ARROW}px ${ARROW}px`, borderColor: "transparent transparent transparent #0f172a" };
      case "right":
        return { ...base, left: -ARROW, top: "50%", transform: "translateY(-50%)",
          borderWidth: `${ARROW}px ${ARROW}px ${ARROW}px 0`, borderColor: "transparent #0f172a transparent transparent" };
    }
  };

  const slideOrigin = () => {
    switch (side) {
      case "top":
        return { "--enter-ty": "8px" } as React.CSSProperties;
      case "bottom":
        return { "--enter-ty": "-8px" } as React.CSSProperties;
      case "left":
        return { "--enter-tx": "8px" } as React.CSSProperties;
      case "right":
        return { "--enter-tx": "-8px" } as React.CSSProperties;
    }
  };

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        className="inline-flex"
      >
        {children}
      </span>

      {mounted &&
        visible &&
        createPortal(
          <div
            role="tooltip"
            className="pointer-events-none"
            style={{
              position: "fixed",
              left: coords.x,
              top: coords.y,
              zIndex: 50,
              maxWidth,
              animationName: "tooltip-enter",
              animationDuration: "150ms",
              animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              animationFillMode: "forwards",
              ...slideOrigin(),
            }}
          >
            <div
              className="relative rounded-md text-xs text-white"
              style={{
                background: "#0f172a",
                padding: "6px 12px",
                lineHeight: "16px",
              }}
            >
              {content}
              {arrow && <span style={arrowStyles()} />}
            </div>
            <style>{`
              @keyframes tooltip-enter {
                from {
                  opacity: 0;
                  transform: translate3d(var(--enter-tx, 0), var(--enter-ty, 0), 0) scale3d(0.95, 0.95, 0.95);
                }
                to {
                  opacity: 1;
                  transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
                }
              }
            `}</style>
          </div>,
          document.body,
        )}
    </>
  );
}
