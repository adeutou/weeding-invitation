interface FloralDividerProps {
  className?: string
  opacity?: number
}

const HYDRANGEA_OFFSETS: [number, number][] = [
  [-6, -5], [0, -8], [7, -5], [9, 1], [5, 7], [-2, 8], [-8, 3],
]

const STAMEN_DOTS: [number, number][] = [
  [0, -5], [4.33, -2.5], [4.33, 2.5], [0, 5], [-4.33, 2.5], [-4.33, -2.5],
]

function HydrangeaCluster({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx}, ${cy})`}>
      {HYDRANGEA_OFFSETS.map(([tx, ty], i) => (
        <g key={i} transform={`translate(${tx}, ${ty})`}>
          <ellipse cx="0" cy="-3.5" rx="1.8" ry="3.5" fill={i % 2 === 0 ? '#5577BB' : '#7B9BB5'} opacity="0.38" />
          <ellipse cx="0" cy="-3.5" rx="1.8" ry="3.5" fill={i % 2 === 0 ? '#7B9BB5' : '#5577BB'} opacity="0.32" transform="rotate(90)" />
          <ellipse cx="0" cy="-3.5" rx="1.8" ry="3.5" fill={i % 2 === 0 ? '#5577BB' : '#7B9BB5'} opacity="0.38" transform="rotate(180)" />
          <ellipse cx="0" cy="-3.5" rx="1.8" ry="3.5" fill={i % 2 === 0 ? '#7B9BB5' : '#5577BB'} opacity="0.32" transform="rotate(270)" />
          <circle cx="0" cy="0" r="1.2" fill="#2D4A8A" opacity="0.45" />
        </g>
      ))}
    </g>
  )
}

function SmallBloom({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx}, ${cy})`}>
      <ellipse cx="0" cy="-8" rx="4" ry="8" fill="#7B9BB5" opacity="0.32" />
      <ellipse cx="0" cy="-8" rx="4" ry="8" fill="#5577BB" opacity="0.28" transform="rotate(90)" />
      <ellipse cx="0" cy="-8" rx="4" ry="8" fill="#7B9BB5" opacity="0.32" transform="rotate(180)" />
      <ellipse cx="0" cy="-8" rx="4" ry="8" fill="#5577BB" opacity="0.28" transform="rotate(270)" />
      <circle cx="0" cy="0" r="3" fill="#2D4A8A" opacity="0.55" />
      <circle cx="0" cy="0" r="1.5" fill="#E6EFF8" opacity="0.6" />
    </g>
  )
}

function MediumBloom({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx}, ${cy})`}>
      <ellipse cx="0" cy="-12" rx="6" ry="12" fill="#5577BB" opacity="0.36" />
      <ellipse cx="0" cy="-12" rx="6" ry="12" fill="#7B9BB5" opacity="0.32" transform="rotate(72)" />
      <ellipse cx="0" cy="-12" rx="6" ry="12" fill="#5577BB" opacity="0.36" transform="rotate(144)" />
      <ellipse cx="0" cy="-12" rx="6" ry="12" fill="#7B9BB5" opacity="0.32" transform="rotate(216)" />
      <ellipse cx="0" cy="-12" rx="6" ry="12" fill="#5577BB" opacity="0.36" transform="rotate(288)" />
      <circle cx="0" cy="0" r="5" fill="#2D4A8A" opacity="0.62" />
      <circle cx="0" cy="0" r="2.5" fill="#E6EFF8" opacity="0.72" />
    </g>
  )
}

function LargeBloom({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx}, ${cy})`}>
      <ellipse cx="0" cy="-17" rx="8.5" ry="17" fill="#5577BB" opacity="0.34" />
      <ellipse cx="0" cy="-17" rx="8.5" ry="17" fill="#7B9BB5" opacity="0.30" transform="rotate(45)" />
      <ellipse cx="0" cy="-17" rx="8.5" ry="17" fill="#5577BB" opacity="0.34" transform="rotate(90)" />
      <ellipse cx="0" cy="-17" rx="8.5" ry="17" fill="#7B9BB5" opacity="0.30" transform="rotate(135)" />
      <ellipse cx="0" cy="-17" rx="8.5" ry="17" fill="#5577BB" opacity="0.34" transform="rotate(180)" />
      <ellipse cx="0" cy="-17" rx="8.5" ry="17" fill="#7B9BB5" opacity="0.30" transform="rotate(225)" />
      <ellipse cx="0" cy="-17" rx="8.5" ry="17" fill="#5577BB" opacity="0.34" transform="rotate(270)" />
      <ellipse cx="0" cy="-17" rx="8.5" ry="17" fill="#7B9BB5" opacity="0.30" transform="rotate(315)" />
      <ellipse cx="0" cy="-9" rx="5" ry="9" fill="#E6EFF8" opacity="0.42" transform="rotate(22.5)" />
      <ellipse cx="0" cy="-9" rx="5" ry="9" fill="#E6EFF8" opacity="0.42" transform="rotate(82.5)" />
      <ellipse cx="0" cy="-9" rx="5" ry="9" fill="#E6EFF8" opacity="0.42" transform="rotate(142.5)" />
      <ellipse cx="0" cy="-9" rx="5" ry="9" fill="#E6EFF8" opacity="0.42" transform="rotate(202.5)" />
      <ellipse cx="0" cy="-9" rx="5" ry="9" fill="#E6EFF8" opacity="0.42" transform="rotate(262.5)" />
      <ellipse cx="0" cy="-9" rx="5" ry="9" fill="#E6EFF8" opacity="0.42" transform="rotate(322.5)" />
      <circle cx="0" cy="0" r="7.5" fill="#2D4A8A" opacity="0.66" />
      <circle cx="0" cy="0" r="4.5" fill="#5577BB" opacity="0.5" />
      <circle cx="0" cy="0" r="2" fill="#E6EFF8" opacity="0.82" />
      {STAMEN_DOTS.map(([dx, dy], i) => (
        <circle key={i} cx={dx} cy={dy} r="0.8" fill="#E6EFF8" opacity="0.65" />
      ))}
    </g>
  )
}

export function FloralDivider({ className = '', opacity = 1 }: FloralDividerProps) {
  return (
    <div
      className={`w-full flex items-center justify-center py-2 overflow-visible select-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 900 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-5xl h-16 md:h-20"
      >
        <path
          d="M 0,50 C 80,46 180,50 285,42 C 370,36 400,46 450,46 C 500,46 530,56 615,42 C 670,32 760,48 900,50"
          stroke="#7B9BB5"
          strokeWidth="1.15"
          opacity="0.42"
        />

        <path d="M 106,47 L 108,44" stroke="#7B9BB5" strokeWidth="0.8" opacity="0.38" />
        <path d="M 269,43 Q 277,41 285,40" stroke="#7B9BB5" strokeWidth="0.8" opacity="0.38" />
        <path d="M 601,43 Q 608,41 615,40" stroke="#7B9BB5" strokeWidth="0.8" opacity="0.38" />
        <path d="M 792,48 L 790,44" stroke="#7B9BB5" strokeWidth="0.8" opacity="0.38" />

        <ellipse cx="29" cy="53" rx="2.5" ry="7" fill="#7B9BB5" opacity="0.2" transform="rotate(-30 29 53)" />
        <ellipse cx="45" cy="57" rx="2.5" ry="7" fill="#5577BB" opacity="0.17" transform="rotate(-18 45 57)" />
        <ellipse cx="871" cy="52" rx="2.5" ry="7" fill="#7B9BB5" opacity="0.2" transform="rotate(30 871 52)" />
        <ellipse cx="855" cy="56" rx="2.5" ry="7" fill="#5577BB" opacity="0.17" transform="rotate(18 855 56)" />

        <ellipse cx="238" cy="44" rx="3" ry="8.5" fill="#7B9BB5" opacity="0.27" transform="rotate(-28 238 44)" />
        <ellipse cx="253" cy="51" rx="3" ry="8.5" fill="#5577BB" opacity="0.22" transform="rotate(15 253 51)" />
        <ellipse cx="325" cy="43" rx="3" ry="8" fill="#7B9BB5" opacity="0.25" transform="rotate(22 325 43)" />
        <ellipse cx="342" cy="51" rx="3" ry="8" fill="#5577BB" opacity="0.2" transform="rotate(-12 342 51)" />

        <ellipse cx="558" cy="49" rx="3" ry="8.5" fill="#7B9BB5" opacity="0.27" transform="rotate(-22 558 49)" />
        <ellipse cx="573" cy="55" rx="3" ry="8.5" fill="#5577BB" opacity="0.22" transform="rotate(12 573 55)" />
        <ellipse cx="656" cy="44" rx="3" ry="8" fill="#7B9BB5" opacity="0.25" transform="rotate(26 656 44)" />
        <ellipse cx="671" cy="51" rx="3" ry="8" fill="#5577BB" opacity="0.2" transform="rotate(-10 671 51)" />

        <path d="M 57,50 L 55,43" stroke="#7B9BB5" strokeWidth="0.7" opacity="0.32" />
        <ellipse cx="55" cy="40" rx="2.5" ry="4.5" fill="#7B9BB5" opacity="0.26" />
        <path d="M 388,43 L 390,36" stroke="#7B9BB5" strokeWidth="0.7" opacity="0.32" />
        <ellipse cx="390" cy="33" rx="2.5" ry="4.5" fill="#5577BB" opacity="0.26" />
        <path d="M 511,48 L 509,41" stroke="#7B9BB5" strokeWidth="0.7" opacity="0.32" />
        <ellipse cx="509" cy="38" rx="2.5" ry="4.5" fill="#7B9BB5" opacity="0.26" />
        <path d="M 843,49 L 845,42" stroke="#7B9BB5" strokeWidth="0.7" opacity="0.32" />
        <ellipse cx="845" cy="39" rx="2.5" ry="4.5" fill="#5577BB" opacity="0.26" />

        <circle cx="160" cy="57" r="1.5" fill="#5577BB" opacity="0.28" />
        <circle cx="168" cy="61" r="1.2" fill="#7B9BB5" opacity="0.23" />
        <circle cx="152" cy="61" r="1" fill="#2D4A8A" opacity="0.22" />
        <circle cx="366" cy="45" r="1.5" fill="#5577BB" opacity="0.26" />
        <circle cx="374" cy="49" r="1.2" fill="#7B9BB5" opacity="0.2" />
        <circle cx="528" cy="53" r="1.5" fill="#5577BB" opacity="0.26" />
        <circle cx="536" cy="57" r="1.2" fill="#7B9BB5" opacity="0.2" />
        <circle cx="741" cy="57" r="1.5" fill="#5577BB" opacity="0.28" />
        <circle cx="749" cy="61" r="1.2" fill="#7B9BB5" opacity="0.23" />
        <circle cx="733" cy="61" r="1" fill="#2D4A8A" opacity="0.22" />

        <SmallBloom cx={110} cy={43} />
        <HydrangeaCluster cx={192} cy={50} />
        <MediumBloom cx={285} cy={40} />
        <LargeBloom cx={450} cy={46} />
        <MediumBloom cx={615} cy={40} />
        <HydrangeaCluster cx={712} cy={50} />
        <SmallBloom cx={790} cy={44} />
      </svg>
    </div>
  )
}
