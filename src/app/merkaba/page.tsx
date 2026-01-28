'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

// Types
type TriadMode = 'unified' | 'masculine' | 'feminine' | 'split'
type ThemeMode = 'presence' | 'absence'

interface PointContent {
  title: string
  text: string
}

// Content data
const presenceContent: Record<string, PointContent> = {
  now: {
    title: 'NOW',
    text: 'The eternal present moment. Presence is the gateway to all transformation. When you are fully here, the past releases its grip and the future opens to possibility.',
  },
  heat: {
    title: 'HEAT',
    text: 'The warmth of activation and transformation. Heat is the energy that catalyzes change, the fire that transmutes old patterns into new possibilities.',
  },
  light: {
    title: 'LIGHT',
    text: 'The illumination of knowledge, imagination, and insight. Light reveals what was hidden, expands what was contracted, and guides the path forward.',
  },
  safety: {
    title: 'SAFETY',
    text: 'The grounded foundation from which all growth emerges. True safety is not the absence of risk, but the deep knowing that you can navigate whatever arises.',
  },
  pleasure: {
    title: 'PLEASURE',
    text: 'The experience of play, joy, and embodied delight. Pleasure is not indulgence—it is the signal that you are aligned with your natural state of flourishing.',
  },
  power: {
    title: 'POWER',
    text: 'Your innate capacity to affect change. Not force over others, but the sovereign ability to direct your energy, make choices, and create impact in your reality.',
  },
  center: {
    title: 'AWAKE',
    text: 'The state of conscious presence. When you are awake, you see clearly, choose deliberately, and create intentionally. You are the author of your experience.',
  },
}

const absenceContent: Record<string, PointContent> = {
  now: {
    title: 'THEN & THERE',
    text: 'The absence of presence. Lost in memories of the past or anxieties about the future. When you are not here, life becomes a series of reactions rather than conscious choices.',
  },
  heat: {
    title: 'COLD',
    text: 'The frozen state of stuckness. When energy stops flowing, patterns calcify and possibilities close. Cold is the absence of the transformative fire.',
  },
  light: {
    title: 'DARK',
    text: 'Confusion, emptiness, and being lost. The absence of illumination where nothing can be seen clearly. In darkness, we stumble and lose our way.',
  },
  safety: {
    title: 'DANGER',
    text: 'The perception of threat that triggers contraction and survival responses. When danger dominates, growth becomes impossible and the nervous system locks into protection.',
  },
  pleasure: {
    title: 'PAIN',
    text: 'The ache and sorrow that signals misalignment. Pain is not punishment—it is information. But when we become identified with pain, it becomes our prison.',
  },
  power: {
    title: 'POWERLESS',
    text: 'The sedentary state of believing you cannot affect change. Victim consciousness that surrenders agency to external circumstances, other people, or fate.',
  },
  center: {
    title: 'ASLEEP',
    text: 'The unconscious state of automatic living. Hypnotized by inherited narratives, you sleepwalk through experiences, reacting instead of choosing.',
  },
}

// Geometry constants
const RADIUS_PERCENT = 42
const MASCULINE_BASE_ANGLES = [-90, 30, 150] // Up triangle
const FEMININE_BASE_ANGLES = [90, -150, -30] // Down triangle

export default function MerkabaPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [triadMode, setTriadMode] = useState<TriadMode>('unified')
  const [theme, setTheme] = useState<ThemeMode>('presence')
  const [masculineRotation, setMasculineRotation] = useState(0)
  const [feminineRotation, setFeminineRotation] = useState(0)
  const [modalContent, setModalContent] = useState<PointContent | null>(null)
  const [containerSize, setContainerSize] = useState(0)

  // Calculate positions based on mode
  const getMasculineOffset = () => {
    if (triadMode === 'split') return -25
    if (triadMode === 'feminine') return -100
    return 0
  }

  const getFeminineOffset = () => {
    if (triadMode === 'split') return 25
    if (triadMode === 'masculine') return 100
    return 0
  }

  const getMasculineOpacity = () => {
    if (triadMode === 'feminine') return 0
    return 1
  }

  const getFeminineOpacity = () => {
    if (triadMode === 'masculine') return 0
    return 1
  }

  // Calculate label positions
  const calculatePosition = useCallback(
    (baseAngle: number, rotation: number, offset: number = 0) => {
      const angle = ((baseAngle + rotation) * Math.PI) / 180
      const radius = (containerSize * RADIUS_PERCENT) / 100
      const centerX = containerSize / 2 + (offset * containerSize) / 100
      const centerY = containerSize / 2

      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      }
    },
    [containerSize]
  )

  // Update container size
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const size = Math.min(
          containerRef.current.offsetWidth,
          containerRef.current.offsetHeight
        )
        setContainerSize(size)
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  // Handle rotation
  const rotateMasculine = () => {
    setMasculineRotation((prev) => prev + 120)
  }

  const rotateFeminine = () => {
    setFeminineRotation((prev) => prev - 120)
  }

  // Get content based on theme
  const getContent = (point: string) => {
    return theme === 'presence' ? presenceContent[point] : absenceContent[point]
  }

  // Point labels data
  const masculinePoints = [
    { id: 'now', angle: MASCULINE_BASE_ANGLES[0], presence: 'NOW', absence: 'THEN & THERE', sub: theme === 'presence' ? 'Be · Here · Within' : 'Lack · Need · Without' },
    { id: 'heat', angle: MASCULINE_BASE_ANGLES[1], presence: 'HEAT', absence: 'COLD', sub: theme === 'presence' ? 'Warmth · Tension' : 'Frozen · Stuck' },
    { id: 'light', angle: MASCULINE_BASE_ANGLES[2], presence: 'LIGHT', absence: 'DARK', sub: theme === 'presence' ? 'Knowledge · Illumination' : 'Confusion · Lost' },
  ]

  const femininePoints = [
    { id: 'safety', angle: FEMININE_BASE_ANGLES[0], presence: 'SAFETY', absence: 'DANGER', sub: theme === 'presence' ? 'Grounding' : 'Death' },
    { id: 'pleasure', angle: FEMININE_BASE_ANGLES[1], presence: 'PLEASURE', absence: 'PAIN', sub: theme === 'presence' ? 'Experience' : 'Ache · Sorrow' },
    { id: 'power', angle: FEMININE_BASE_ANGLES[2], presence: 'POWER', absence: 'POWERLESS', sub: theme === 'presence' ? 'Energy' : 'Sedentary' },
  ]

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <main className="bg-mesh min-h-screen px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link
            href="/"
            className="inline-block font-ui text-sm text-text-muted hover:text-text-secondary transition-colors mb-8"
          >
            &larr; Home
          </Link>

          {/* Header */}
          <header className="text-center mb-8">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light tracking-wider mb-3">
              <span className="bg-gradient-to-r from-now-high to-pleasure-high bg-clip-text text-transparent">
                MERKABA
              </span>
            </h1>
            <p className="font-display text-lg sm:text-xl text-text-secondary mb-1">
              &ldquo;<b>Mer</b>&rdquo; (light), &ldquo;<b>Ka</b>&rdquo; (spirit), &ldquo;<b>Ba</b>&rdquo; (body)
            </p>
            <p className="font-body text-sm text-text-muted italic">
              a union of light, spirit, and body
            </p>
          </header>

          {/* Controls */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
            {/* Theme controls */}
            <button
              onClick={() => setTheme('presence')}
              className={`px-4 py-2 rounded-full border text-xs font-ui uppercase tracking-wider transition-all ${
                theme === 'presence'
                  ? 'bg-white/10 border-white/30 text-text-primary'
                  : 'bg-transparent border-white/10 text-text-muted hover:border-white/20'
              }`}
            >
              Presence
            </button>
            <button
              onClick={() => setTheme('absence')}
              className={`px-4 py-2 rounded-full border text-xs font-ui uppercase tracking-wider transition-all ${
                theme === 'absence'
                  ? 'bg-white/10 border-white/30 text-text-primary'
                  : 'bg-transparent border-white/10 text-text-muted hover:border-white/20'
              }`}
            >
              Absence
            </button>

            <span className="text-text-muted/30 hidden sm:inline">|</span>

            {/* View controls */}
            <button
              onClick={() => setTriadMode('unified')}
              className={`px-4 py-2 rounded-full border text-xs font-ui uppercase tracking-wider transition-all ${
                triadMode === 'unified'
                  ? 'bg-white/10 border-white/30 text-text-primary'
                  : 'bg-transparent border-white/10 text-text-muted hover:border-white/20'
              }`}
            >
              Unified
            </button>
            <button
              onClick={() => setTriadMode('split')}
              className={`px-4 py-2 rounded-full border text-xs font-ui uppercase tracking-wider transition-all ${
                triadMode === 'split'
                  ? 'bg-white/10 border-white/30 text-text-primary'
                  : 'bg-transparent border-white/10 text-text-muted hover:border-white/20'
              }`}
            >
              Split
            </button>
            <button
              onClick={() => setTriadMode('masculine')}
              className={`px-4 py-2 rounded-full border text-xs font-ui uppercase tracking-wider transition-all ${
                triadMode === 'masculine'
                  ? 'bg-now-mid/30 border-now-mid/50 text-now-high'
                  : 'bg-transparent border-white/10 text-text-muted hover:border-now-mid/30'
              }`}
            >
              Masculine
            </button>
            <button
              onClick={() => setTriadMode('feminine')}
              className={`px-4 py-2 rounded-full border text-xs font-ui uppercase tracking-wider transition-all ${
                triadMode === 'feminine'
                  ? 'bg-pleasure-mid/30 border-pleasure-mid/50 text-pleasure-high'
                  : 'bg-transparent border-white/10 text-text-muted hover:border-pleasure-mid/30'
              }`}
            >
              Feminine
            </button>
          </div>

          {/* Rotation controls */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={rotateMasculine}
              disabled={triadMode === 'feminine'}
              className="px-4 py-2 rounded-full border border-now-mid/30 text-now-high text-xs font-ui uppercase tracking-wider transition-all hover:bg-now-mid/20 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Rotate Masculine
            </button>
            <button
              onClick={rotateFeminine}
              disabled={triadMode === 'masculine'}
              className="px-4 py-2 rounded-full border border-pleasure-mid/30 text-pleasure-high text-xs font-ui uppercase tracking-wider transition-all hover:bg-pleasure-mid/20 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Rotate Feminine
            </button>
          </div>

          {/* Merkaba Container */}
          <div
            ref={containerRef}
            className="relative w-full aspect-square max-w-[600px] mx-auto"
          >
            {/* Background word */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span className="font-ui text-[8rem] sm:text-[12rem] font-semibold uppercase tracking-[0.3em] text-white/5">
                {theme === 'presence' ? 'love' : 'fear'}
              </span>
            </div>

            {/* Masculine Triangle (Up - Blue/Teal) */}
            <svg
              className="absolute top-1/2 left-1/2 w-[60%] h-[60%] overflow-visible transition-all duration-700 ease-out"
              style={{
                transform: `translate(calc(-50% + ${getMasculineOffset()}%), -50%) rotate(${masculineRotation}deg)`,
                opacity: getMasculineOpacity(),
              }}
              viewBox="-50 -50 100 100"
            >
              <polygon
                points="0,-50 43.3,25 -43.3,25"
                fill="rgba(59, 130, 246, 0.15)"
                stroke="rgb(59, 130, 246)"
                strokeWidth="2"
              />
            </svg>

            {/* Feminine Triangle (Down - Pink) */}
            <svg
              className="absolute top-1/2 left-1/2 w-[60%] h-[60%] overflow-visible transition-all duration-700 ease-out"
              style={{
                transform: `translate(calc(-50% + ${getFeminineOffset()}%), -50%) rotate(${feminineRotation}deg)`,
                opacity: getFeminineOpacity(),
              }}
              viewBox="-50 -50 100 100"
            >
              <polygon
                points="0,50 -43.3,-25 43.3,-25"
                fill="rgba(236, 72, 153, 0.15)"
                stroke="rgb(236, 72, 153)"
                strokeWidth="2"
              />
            </svg>

            {/* Masculine Point Labels */}
            {masculinePoints.map((point) => {
              const pos = calculatePosition(
                point.angle,
                masculineRotation,
                getMasculineOffset()
              )
              return (
                <button
                  key={point.id}
                  onClick={() => setModalContent(getContent(point.id))}
                  className="absolute text-center transition-all duration-700 ease-out hover:scale-105"
                  style={{
                    left: pos.x,
                    top: pos.y,
                    transform: 'translate(-50%, -50%)',
                    opacity: getMasculineOpacity(),
                  }}
                >
                  <div className="font-display text-lg sm:text-2xl text-now-high tracking-wider">
                    {theme === 'presence' ? point.presence : point.absence}
                  </div>
                  <div className="font-body text-xs text-text-muted italic">
                    {point.sub}
                  </div>
                </button>
              )
            })}

            {/* Feminine Point Labels */}
            {femininePoints.map((point) => {
              const pos = calculatePosition(
                point.angle,
                feminineRotation,
                getFeminineOffset()
              )
              return (
                <button
                  key={point.id}
                  onClick={() => setModalContent(getContent(point.id))}
                  className="absolute text-center transition-all duration-700 ease-out hover:scale-105"
                  style={{
                    left: pos.x,
                    top: pos.y,
                    transform: 'translate(-50%, -50%)',
                    opacity: getFeminineOpacity(),
                  }}
                >
                  <div className="font-display text-lg sm:text-2xl text-pleasure-high tracking-wider">
                    {theme === 'presence' ? point.presence : point.absence}
                  </div>
                  <div className="font-body text-xs text-text-muted italic">
                    {point.sub}
                  </div>
                </button>
              )
            })}

            {/* Center Content */}
            {triadMode === 'unified' && (
              <button
                onClick={() => setModalContent(getContent('center'))}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 hover:scale-105 transition-transform"
              >
                <div className="font-body text-xs text-text-muted italic mb-1">
                  {theme === 'presence' ? 'Intention · Perception' : 'Hallucinating'}
                </div>
                <div className="font-display text-2xl sm:text-3xl tracking-widest">
                  <span className="text-now-high">
                    {theme === 'presence' ? 'AWA' : 'ASL'}
                  </span>
                  <span className="text-pleasure-high">
                    {theme === 'presence' ? 'KE' : 'EEP'}
                  </span>
                </div>
                <div className="font-body text-xs text-text-muted italic mt-1">
                  {theme === 'presence' ? 'Identity · Attention' : 'Hypnosis'}
                </div>
              </button>
            )}
          </div>

          {/* Educational text */}
          <div className="mt-12 text-center max-w-2xl mx-auto">
            <p className="font-body text-text-secondary leading-relaxed">
              {triadMode === 'masculine' && (
                <>
                  The <span className="text-now-high">Masculine Triad</span> represents the active, directing forces:
                  NOW (presence), LIGHT (clarity), and HEAT (transformation).
                  These frequencies illuminate, activate, and propel forward.
                </>
              )}
              {triadMode === 'feminine' && (
                <>
                  The <span className="text-pleasure-high">Feminine Triad</span> represents the receptive, nurturing forces:
                  SAFETY (foundation), PLEASURE (flow), and POWER (capacity).
                  These frequencies ground, receive, and empower.
                </>
              )}
              {triadMode === 'unified' && (
                <>
                  When the <span className="text-now-high">Masculine</span> and{' '}
                  <span className="text-pleasure-high">Feminine</span> triads unite, they form the Merkaba—
                  the vehicle of light that carries consciousness. In balance, all six frequencies
                  harmonize to create wholeness.
                </>
              )}
              {triadMode === 'split' && (
                <>
                  Separated, we can see how the two triads complement each other.
                  The <span className="text-now-high">Masculine</span> reaches upward toward consciousness,
                  while the <span className="text-pleasure-high">Feminine</span> grounds downward into embodiment.
                </>
              )}
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link href="/tune" className="btn-primary">
              Activate Your Frequencies
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </main>

      {/* Modal */}
      {modalContent && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setModalContent(null)}
        >
          <div
            className="bg-bg-surface border border-white/10 rounded-2xl p-8 max-w-md w-full text-center animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalContent(null)}
              className="absolute top-4 right-4 text-text-muted hover:text-text-primary text-2xl"
            >
              &times;
            </button>
            <h3 className="font-display text-2xl text-text-primary mb-4 tracking-wider">
              {modalContent.title}
            </h3>
            <p className="font-body text-text-secondary leading-relaxed">
              {modalContent.text}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
