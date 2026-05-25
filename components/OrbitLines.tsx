"use client";

export default function OrbitLines() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {[340, 500, 660, 820].map((r, i) => (
        <div
          key={r}
          className="absolute rounded-full border border-[#D9A441]/18"
          style={{
            width: r,
            height: r,
            top: "50%",
            left: "50%",
            marginTop: -r / 2,
            marginLeft: -r / 2,
            animation: `orbitSpin ${20 + i * 8}s linear infinite`,
            animationDirection: i % 2 === 0 ? "normal" : "reverse",
          }}
        >
          <div
            className="absolute h-1.5 w-1.5 rounded-full bg-[#D9A441]/40"
            style={{ top: -3, left: "50%", transform: "translateX(-50%)" }}
          />
        </div>
      ))}
    </div>
  );
}
