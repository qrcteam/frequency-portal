# Visual Design Specification

## Design Philosophy

This tool should feel like an elevated, mystical yet grounded experience. Not clinical. Not corporate. Not "techy." 

Think: a wise guide in a beautiful space. Warmth. Spaciousness. Reverence for the user's inner world.

**Avoid at all costs:**
- Purple gradients on white (AI slop)
- Inter, Roboto, Arial fonts
- Generic card layouts
- Sterile, app-like interfaces
- Gamification elements (points, badges, streaks)
- Progress bars that feel like productivity tools

## Color System

### Primary Palette — The Six Notes

Each note has a base color with variations for resonance levels:

```css
:root {
  /* FEMININE TRIAD */
  
  /* Safety - Violet */
  --safety-high: #A78BFA;      /* Bright, luminous violet */
  --safety-mid: #7C3AED;       /* Rich violet */
  --safety-low: #4C1D95;       /* Deep, muted violet */
  --safety-dim: #2E1065;       /* Nearly absent */
  
  /* Pleasure - Pink */
  --pleasure-high: #F472B6;    /* Vibrant pink */
  --pleasure-mid: #EC4899;     /* Rich pink */
  --pleasure-low: #9D174D;     /* Muted rose */
  --pleasure-dim: #500724;     /* Nearly absent */
  
  /* Power - Magenta/Deep Purple */
  --power-high: #E879F9;       /* Bright magenta */
  --power-mid: #C026D3;        /* Rich magenta */
  --power-low: #701A75;        /* Deep magenta */
  --power-dim: #4A044E;        /* Nearly absent */
  
  /* MASCULINE TRIAD */
  
  /* Light - Turquoise */
  --light-high: #5EEAD4;       /* Bright turquoise */
  --light-mid: #14B8A6;        /* Rich teal */
  --light-low: #0F766E;        /* Muted teal */
  --light-dim: #134E4A;        /* Nearly absent */
  
  /* Now - Blue */
  --now-high: #60A5FA;         /* Bright blue */
  --now-mid: #3B82F6;          /* Rich blue */
  --now-low: #1E40AF;          /* Deep blue */
  --now-dim: #1E3A5F;          /* Nearly absent */
  
  /* Heat - Green */
  --heat-high: #4ADE80;        /* Vibrant green */
  --heat-mid: #22C55E;         /* Rich green */
  --heat-low: #166534;         /* Deep green */
  --heat-dim: #14532D;         /* Nearly absent */
}
```

### Background & Surface Colors

```css
:root {
  /* Deep, warm backgrounds */
  --bg-primary: #0F0D15;       /* Near black with purple undertone */
  --bg-secondary: #1A1625;     /* Slightly lighter */
  --bg-surface: #251F33;       /* Card/surface color */
  --bg-elevated: #2D2640;      /* Elevated elements */
  
  /* Subtle textures */
  --noise-opacity: 0.03;       /* Grain overlay */
  --gradient-opacity: 0.15;    /* Subtle gradient meshes */
  
  /* Text */
  --text-primary: #F5F3FF;     /* Warm white */
  --text-secondary: #C4B5FD;   /* Soft violet-white */
  --text-muted: #7C7291;       /* Muted for hints */
}
```

### Resonance Glow System

```css
/* Glow intensities based on resonance */
.resonance-high {
  box-shadow: 
    0 0 20px var(--note-color),
    0 0 40px color-mix(in srgb, var(--note-color) 50%, transparent),
    0 0 60px color-mix(in srgb, var(--note-color) 25%, transparent);
  filter: brightness(1.2) saturate(1.3);
}

.resonance-mid {
  box-shadow: 0 0 15px color-mix(in srgb, var(--note-color) 40%, transparent);
  filter: brightness(1) saturate(1);
}

.resonance-low {
  box-shadow: none;
  filter: brightness(0.7) saturate(0.5) grayscale(0.3);
}

.resonance-dim {
  filter: brightness(0.4) saturate(0.2) grayscale(0.6);
  opacity: 0.6;
}
```

## Typography

### Font Stack

```css
:root {
  /* Display - for headlines and key moments */
  --font-display: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
  
  /* Body - warm, readable */
  --font-body: 'Source Serif Pro', 'Crimson Text', Georgia, serif;
  
  /* UI elements - clean but not cold */
  --font-ui: 'DM Sans', 'Outfit', sans-serif;
}
```

### Type Scale

```css
:root {
  --text-xs: 0.75rem;    /* 12px - hints, labels */
  --text-sm: 0.875rem;   /* 14px - secondary text */
  --text-base: 1rem;     /* 16px - body */
  --text-lg: 1.125rem;   /* 18px - emphasis */
  --text-xl: 1.25rem;    /* 20px - subheads */
  --text-2xl: 1.5rem;    /* 24px - section heads */
  --text-3xl: 2rem;      /* 32px - page titles */
  --text-4xl: 2.5rem;    /* 40px - hero text */
  --text-5xl: 3.5rem;    /* 56px - impact moments */
}
```

### Typography Usage

- **Headlines:** Cormorant Garamond, light weight, generous letter-spacing
- **Questions:** Source Serif Pro, regular weight, comfortable line-height (1.7)
- **Options/Buttons:** DM Sans, medium weight
- **Invitations/Microcopy:** Source Serif Pro, italic

## Spacing & Layout

### Spacing Scale

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */
}
```

### Layout Principles

- **Generous whitespace** — let everything breathe
- **Center-weighted** — content floats in space
- **Asymmetric accents** — occasional off-center elements
- **Vertical rhythm** — consistent spacing creates calm
- **Max content width:** 640px for questions, 800px for results

## Animation & Motion

### Timing Functions

```css
:root {
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-expo: cubic-bezier(0.87, 0, 0.13, 1);
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-gentle: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Duration Scale

```css
:root {
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 800ms;
  --duration-slowest: 1200ms;
}
```

### Key Animations

#### Question Transitions
```css
/* Fade up and in */
@keyframes questionEnter {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.question-enter {
  animation: questionEnter var(--duration-slow) var(--ease-out-expo);
}

/* Fade down and out */
@keyframes questionExit {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}
```

#### Option Selection
```css
/* Soft pulse on select */
@keyframes selectPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

.option-selected {
  animation: selectPulse var(--duration-normal) var(--ease-out-back);
}
```

#### Vibrancy Glow
```css
/* Breathing glow for high-resonance elements */
@keyframes breathe {
  0%, 100% { 
    opacity: 0.8;
    filter: blur(20px);
  }
  50% { 
    opacity: 1;
    filter: blur(25px);
  }
}

.glow-breathe {
  animation: breathe 4s ease-in-out infinite;
}
```

---

## Visualization Options

### Option 1: Hexagonal Chord (Recommended Primary)

A hexagon with six points, one for each note. Lines connect all points creating an inner web.

**Structure:**
```
        Light (top)
         /    \
    Safety    Now
       |  \  /  |
       |   \/   |
       |   /\   |
    Pleasure  Heat
         \    /
        Power (bottom)
```

**Visual Elements:**
- **Points:** Circles at each vertex, sized by resonance (8px dim → 16px high)
- **Lines:** Connecting all points, opacity by combined resonance
- **Fill:** Inner hexagon filled with gradient mesh of all colors
- **Glow:** Each point has glow halo based on its resonance

**Implementation Notes:**
```jsx
// Example structure
<svg viewBox="0 0 400 400">
  {/* Background glow layers */}
  <defs>
    <radialGradient id="safetyGlow">...</radialGradient>
    {/* ... other gradients */}
  </defs>
  
  {/* Inner fill - gradient mesh */}
  <polygon points="..." fill="url(#meshGradient)" opacity={overallVibrancy} />
  
  {/* Connection lines */}
  {connections.map(([from, to]) => (
    <line 
      x1={points[from].x} y1={points[from].y}
      x2={points[to].x} y2={points[to].y}
      stroke={blendColors(from, to)}
      strokeOpacity={getConnectionOpacity(from, to)}
    />
  ))}
  
  {/* Note points */}
  {notes.map(note => (
    <g>
      <circle 
        cx={points[note].x} 
        cy={points[note].y}
        r={getRadius(resonance[note])}
        fill={getColor(note, resonance[note])}
        filter="url(#glow)"
      />
    </g>
  ))}
</svg>
```

### Option 2: Frequency Waveform

Six layered sine waves, each representing a note's frequency.

**Visual Elements:**
- **Waves:** Stacked horizontally, each with its note color
- **Amplitude:** Height represents resonance level
- **Smoothness:** High resonance = smooth wave, low = noisy/jagged
- **Animation:** Gentle flowing motion, speed varies by note

**Implementation Notes:**
```jsx
// Generate wave path
function generateWave(resonance, noise, phase) {
  const points = [];
  for (let x = 0; x <= width; x += 2) {
    let y = baseY + 
      Math.sin((x * frequency) + phase) * amplitude * resonance +
      (Math.random() - 0.5) * noise * (1 - resonance);
    points.push(`${x},${y}`);
  }
  return `M ${points.join(' L ')}`;
}
```

### Option 3: Gradient Orb

A central sphere that represents overall tuning state.

**Visual Elements:**
- **Shape:** Perfect circle with 3D shading
- **Color:** Blend of all six note colors weighted by resonance
- **Luminosity:** Brighter = higher overall vibrancy
- **Texture:** Smooth when aligned, static/noise when resistant
- **Animation:** Gentle pulsing breath

**Implementation Notes:**
```jsx
<div className="orb-container">
  {/* Outer glow */}
  <div 
    className="orb-glow"
    style={{
      background: `radial-gradient(circle, ${blendedColor} 0%, transparent 70%)`,
      opacity: overallVibrancy,
    }}
  />
  
  {/* Main orb */}
  <div 
    className="orb"
    style={{
      background: `radial-gradient(circle at 30% 30%, 
        ${lightenColor(blendedColor)} 0%, 
        ${blendedColor} 50%, 
        ${darkenColor(blendedColor)} 100%)`,
      filter: `brightness(${0.7 + overallVibrancy * 0.5})`,
    }}
  />
  
  {/* Noise overlay for low resonance */}
  <div 
    className="orb-noise"
    style={{ opacity: 1 - overallVibrancy }}
  />
</div>
```

### Option 4: Flower/Mandala

Six petals radiating from center, each representing a note.

**Visual Elements:**
- **Petals:** Organic shapes, one per note in its color
- **Size:** Petal size reflects resonance
- **Bloom:** High resonance = open/expanded, low = contracted/closed
- **Animation:** Gentle breathing, subtle rotation

**Implementation Notes:**
```jsx
// Petal path with variable size
function petalPath(angle, size) {
  // Bezier curve creating organic petal shape
  return `M 0,0 
    Q ${size * 0.3},${-size * 0.5} ${size},0
    Q ${size * 0.3},${size * 0.5} 0,0`;
}
```

### Option 5: Particle Constellation

Particles grouped by note, showing coherence or scatter.

**Visual Elements:**
- **Particles:** Small dots/circles, colored by note
- **Clustering:** High resonance = tight cluster, low = scattered
- **Motion:** Particles drift gently, attracted to their cluster center
- **Trails:** Optional color trails showing movement

**Implementation Notes:**
```jsx
// Using canvas or WebGL for performance
particles.forEach(particle => {
  // Attraction to cluster center based on resonance
  const attraction = resonance[particle.note] * attractionStrength;
  const dx = clusterCenters[particle.note].x - particle.x;
  const dy = clusterCenters[particle.note].y - particle.y;
  
  particle.vx += dx * attraction;
  particle.vy += dy * attraction;
  
  // Random drift inversely proportional to resonance
  particle.vx += (Math.random() - 0.5) * (1 - resonance[particle.note]) * drift;
  particle.vy += (Math.random() - 0.5) * (1 - resonance[particle.note]) * drift;
});
```

---

## Component Specifications

### Question Card

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  [Note indicator - subtle color bar]            │
│                                                 │
│     "When I think about making a big            │
│      change in my life, my body..."             │
│                                                 │
│     ┌─────────────────────────────────────┐    │
│     │  ○  Softens with curiosity          │    │
│     └─────────────────────────────────────┘    │
│                                                 │
│     ┌─────────────────────────────────────┐    │
│     │  ○  Braces or tightens              │    │
│     └─────────────────────────────────────┘    │
│                                                 │
│     ┌─────────────────────────────────────┐    │
│     │  ○  Goes numb or foggy              │    │
│     └─────────────────────────────────────┘    │
│                                                 │
│     ┌─────────────────────────────────────┐    │
│     │  ○  Floods with nervous energy      │    │
│     └─────────────────────────────────────┘    │
│                                                 │
│                                                 │
│     "Notice that. No need to change it."        │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Styling:**
- Card: bg-surface, subtle border, rounded-2xl
- Question: font-display, text-2xl, text-primary
- Options: font-body, text-lg, hover state with glow
- Invitation: font-body italic, text-muted

### Answer Option

**States:**
- Default: bg-transparent, border-muted, text-secondary
- Hover: border-note-color (subtle), bg-elevated
- Selected: border-note-color (bright), bg-elevated, glow

```css
.option {
  padding: var(--space-4) var(--space-6);
  border: 1px solid var(--text-muted);
  border-radius: var(--space-3);
  transition: all var(--duration-normal) var(--ease-gentle);
}

.option:hover {
  border-color: color-mix(in srgb, var(--note-color) 50%, transparent);
  background: var(--bg-elevated);
}

.option.selected {
  border-color: var(--note-color);
  background: var(--bg-elevated);
  box-shadow: 0 0 20px color-mix(in srgb, var(--note-color) 30%, transparent);
}
```

### Results Card

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  [Visualization - centered, prominent]          │
│                                                 │
│           ╭──────────────────────╮              │
│          ╱                        ╲             │
│         ╱   [Hexagon/Orb/etc]      ╲            │
│        ╱                            ╲           │
│       ╱                              ╲          │
│       ╲                              ╱          │
│        ╲                            ╱           │
│         ╲                          ╱            │
│          ╲                        ╱             │
│           ╰──────────────────────╯              │
│                                                 │
│  ─────────────────────────────────────────────  │
│                                                 │
│  Safety                              ████████░░ │
│  Pleasure                            ██████░░░░ │
│  Power                               ████░░░░░░ │
│  Light                               ██████████ │
│  Now                                 ████████░░ │
│  Heat                                ██████░░░░ │
│                                                 │
│  (bars shown as color gradients, not numbers)   │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Guidance Card

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  [Note color indicator]                         │
│                                                 │
│  SAFETY                                         │
│                                                 │
│  "Your nervous system is working overtime.      │
│   The vigilance is exhausting."                 │
│                                                 │
│  ─────────────────────────────────────────────  │
│                                                 │
│  Your invitation:                               │
│                                                 │
│  • Find one place where you can let             │
│    your guard down completely                   │
│                                                 │
│  • Practice legs up the wall for 5 minutes      │
│    — let gravity hold you                       │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## Background & Atmosphere

### Grain Overlay

```css
.grain {
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}
```

### Gradient Mesh Background

```css
.bg-mesh {
  background: 
    radial-gradient(ellipse at 20% 30%, var(--safety-dim) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 70%, var(--light-dim) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, var(--bg-secondary) 0%, var(--bg-primary) 100%);
}
```

### Subtle Animation

```css
@keyframes meshDrift {
  0%, 100% {
    background-position: 0% 0%, 100% 100%, 50% 50%;
  }
  50% {
    background-position: 10% 10%, 90% 90%, 50% 50%;
  }
}

.bg-mesh-animated {
  animation: meshDrift 30s ease-in-out infinite;
}
```

---

## Responsive Considerations

### Breakpoints

```css
/* Mobile first */
--bp-sm: 640px;
--bp-md: 768px;
--bp-lg: 1024px;
--bp-xl: 1280px;
```

### Mobile Adaptations

- Visualization scales to fit viewport width
- Questions use full width with comfortable padding
- Options stack vertically (no side-by-side)
- Touch targets minimum 44px
- Reduced animation complexity for performance

### Tablet/Desktop

- Visualization can be larger, more detailed
- Questions centered in comfortable reading width
- More whitespace, more breathing room
- Full animation complexity

---

## Accessibility

### Color Contrast

- All text meets WCAG AA standards against backgrounds
- Don't rely solely on color — use size, glow, and opacity
- Provide text labels for visualization elements on hover/focus

### Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus States

```css
:focus-visible {
  outline: 2px solid var(--text-primary);
  outline-offset: 4px;
}
```

### Screen Readers

- Visualization has aria-label describing overall state
- Each note has screen reader text describing resonance level
- Progress communicated via aria-live regions
