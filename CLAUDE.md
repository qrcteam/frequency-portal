# CLAUDE.md — Frequency Activator

## Project Context

You are building the **Frequency Activator** for Quantum Reality Creators, a coaching business run by Oz and Mazix. This is a self-recognition and activation tool that helps users understand their current energetic state and see what's possible when they align with their desires.

**This is NOT a quiz or assessment.** It's an activation experience — a journey of recognition. No grades, no scores, just reflection and illumination.

---

## The Frequency Activator Framework

### The Merkaba Model (8 Points)

The framework is based on a double tetrahedron (merkaba) with 8 points:

**6 Frequencies** — The electromagnetic currency, the signal you broadcast
- **Feminine Triad:** Safety, Pleasure, Power
- **Masculine Triad:** Light, Now, Heat

**2 Keys** — The navigation system
- **Intention** = WHY (what's in you, the internal motivation)
- **Attention** = WHERE (what you're looking at, external focus)
- Both words contain "tension" — the creative force between where you are and where you want to be
- Too much tension = stress | Too little = stagnation

### The Journey

| Layer | What It Is | Role in the App |
|-------|-----------|-----------------|
| **Where I Am** | Current frequency state | Self-recognition snapshot via questions |
| **The Map** | 7 Domains | The territory where frequencies play out |
| **Where I Want to Go** | 7 Destinations | The activated life clients desire |

### The 7 Domains (The Map/Territory)

These are the life areas where frequencies manifest:
1. **Spirit** — Connection to source, meaning, transcendence
2. **Body** — Physical vitality, health, embodiment
3. **Self** — Identity, self-worth, inner relationship
4. **Relationships** — Connection with others, community
5. **Wealth** — Abundance, resources, material flow
6. **Purpose** — Meaningful contribution, vocation
7. **Play** — Joy, creativity, lightness (the spirit woven through everything)

### The 7 Destinations (Where You Want to Go)

These are the activated desires — what clients actually want more of:
1. **Freedom & Liberation** — Autonomy, sovereignty, breaking free
2. **Intuition & Guidance** — Inner knowing, spiritual direction
3. **Love & Intimacy** — Deep emotional connection, vulnerability
4. **Purpose & Creation** — Bringing visions to life, meaningful work
5. **Relationships & Connection** — Community, belonging, social fabric
6. **Leadership & Impact** — Influence, making a difference
7. **Wealth & Legacy** — Prosperity, what you leave behind

**Note:** Play/Joy isn't a destination — it's the *spirit* in which all destinations are pursued.

---

## How the App Works

### User Flow

1. **Choose Your Destination(s)** — What do you want to activate?
   - User selects one or more of the 7 Destinations
   - This sets the context and intention

2. **Explore the Territory** — Questions reveal current state
   - Questions probe the 6 frequencies across relevant domains
   - Self-recognition through gentle inquiry
   - "Where I Am" becomes visible

3. **See the Map** — Results visualization
   - Current frequency landscape (6 notes)
   - How frequencies manifest in the 7 domains
   - Focus on: which Destinations are calling, what's activated vs. ready

4. **Illuminate the Path** — Guidance and keys
   - The gap between current state and desired destination
   - Intention & Attention prompts to navigate forward

---

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS with custom color system
- **Animations**: Framer Motion for fluid transitions
- **State**: Zustand for session state
- **Storage**:
  - Free tier: localStorage only
  - Paid tier: Supabase for auth + session history
- **Deployment**: Vercel

---

## Key Design Principles

### Visual Language

**Colors by Note:**
- Safety: Violet (#8B5CF6 → variations)
- Pleasure: Pink (#EC4899 → variations)
- Power: Deep Purple/Magenta (#A855F7 → variations)
- Light: Turquoise (#14B8A6 → variations)
- Now: Blue (#3B82F6 → variations)
- Heat: Green (#22C55E → variations)

**Vibrancy System:**
- High resonance = bright, saturated, luminous, glowing → "Activated"
- Mid resonance = present but not full → "Awakening", "Flowing"
- Low resonance = muted, ready to bloom → "Emerging", "Ready"
- The visual IS the feedback — numbers optional, beauty essential

### Interaction Design

- Gentle, spacious, unhurried
- Questions appear one at a time
- Soft transitions between states
- No "submit" buttons that feel final — more like "continue" or "next"
- After each answer, a soft invitation: "Notice what emerges. Trust what you feel."

### Tone of Copy

- Warm, non-judgmental
- Invitational not prescriptive
- Short, spacious sentences
- No corporate speak
- Affirms transformation and what's possible
- No "you should" — instead "you might" or "notice if"

---

## Architecture

```
/app
  /page.tsx                    # Landing/entry
  /activate (or /tune)
    /page.tsx                  # Destination selection + activation flow
  /results
    /page.tsx                  # Visual output + guidance
  /api
    /sessions                  # Supabase session storage (paid)

/components
  /ui                          # Base components
  /activation
    /DestinationCard.tsx       # Destination selection
    /QuestionCard.tsx          # Individual question display
    /AnswerOption.tsx          # Multiple choice option
    /ProgressIndicator.tsx     # Subtle progress
    /TransitionWrapper.tsx     # Animation between questions
  /visualizations
    /FrequencyChord.tsx        # Main chord visualization (hexagon)
    /MerkabaView.tsx           # 8-point merkaba visualization
    /DestinationMap.tsx        # Journey from current to destination
    /VibrancyOrb.tsx           # Glowing orb option
    /WaveformDisplay.tsx       # Frequency waves option

/lib
  /questions.ts                # All question content
  /destinations.ts             # Destination definitions and mappings
  /scoring.ts                  # Resonance calculation logic
  /guidance.ts                 # Personalized recommendations
  /colors.ts                   # Color system utilities

/types
  /index.ts                    # TypeScript definitions
```

---

## Data Structures

```typescript
type Note = 'safety' | 'pleasure' | 'power' | 'light' | 'now' | 'heat';
type Triad = 'feminine' | 'masculine';
type Domain = 'spirit' | 'body' | 'self' | 'relationships' | 'wealth' | 'purpose' | 'play';
type Destination =
  | 'freedom-liberation'
  | 'intuition-guidance'
  | 'love-intimacy'
  | 'purpose-creation'
  | 'relationships-connection'
  | 'leadership-impact'
  | 'wealth-legacy';

interface Question {
  id: string;
  note: Note;
  domain?: Domain;
  destinations?: Destination[];  // Which destinations this question relates to
  text: string;
  subtext?: string;
  options: AnswerOption[];
}

interface AnswerOption {
  id: string;
  text: string;
  resonance: 'high' | 'mid-high' | 'mid' | 'mid-low' | 'low';
  tension?: 'tight' | 'loose';
}

interface ActivationSession {
  id: string;
  userId?: string;
  createdAt: Date;
  destinations: Destination[];  // What user wants to activate
  domains: Domain[];            // Relevant domains for those destinations
  answers: Answer[];
  results: ActivationResults;
}

interface Answer {
  questionId: string;
  selectedOptionId: string;
  timestamp: Date;
}

interface ActivationResults {
  notes: Record<Note, ResonanceLevel>;
  domains: Record<Domain, DomainResonance>;
  destinations: Record<Destination, DestinationReadiness>;
  overallVibrancy: number;
  keys: {
    intention?: string;   // Reflection on WHY
    attention?: string;   // Reflection on WHERE
  };
  guidance: GuidanceItem[];
}

interface ResonanceLevel {
  value: number;        // 0-1
  label: 'activated' | 'flowing' | 'awakening' | 'emerging' | 'ready';
  tension?: 'tight' | 'balanced' | 'loose';
}

interface DomainResonance {
  notes: Record<Note, ResonanceLevel>;
  overallVibrancy: number;
}

interface DestinationReadiness {
  overallReadiness: number;  // 0-1
  supportingFrequencies: Note[];
  growthEdges: Note[];
  invitation: string;
}

interface GuidanceItem {
  destination: Destination;
  note?: Note;
  domain?: Domain;
  invitation: string;
  practice: string;
}
```

---

## Question Design Rules

1. **No right answers** — only honest ones
2. **Normalize all responses** — every option is valid
3. **Present tense** — "When I..." not "When you..."
4. **Body-first** — include physical/somatic options
5. **Both extremes** — capture too-tight AND too-loose patterns
6. **Gentle language** — avoid clinical or judgmental terms
7. **Destination-aware** — questions illuminate readiness for specific destinations

---

## Visualization Options

### 1. Merkaba View (Primary)
Eight points of the double tetrahedron:
- 6 frequency notes as colored points
- 2 keys (Intention/Attention) as apex points
- Lines connecting related elements
- Rotation/animation showing energy flow

### 2. Hexagonal Chord
Six points in a hexagon, one per note:
- Point size/glow shows resonance
- Line thickness shows relationships
- Color saturation reflects vibrancy

### 3. Destination Journey Map
Visual path from "Where I Am" to "Where I Want to Go":
- Current state as origin point
- Selected destinations as beacon points
- Frequencies as the terrain between

### 4. Gradient Orb
Central sphere reflecting overall state:
- Color blend of all six notes
- Luminosity from overall vibrancy
- Gentle pulsing animation

---

## Build Order

1. **Phase 1: Core Experience** ✓
   - Question display component
   - Answer selection with transitions
   - Basic state management (Zustand)
   - Landing page

2. **Phase 2: Destination Integration** ← Current
   - Add 7 Destinations to types and store
   - Destination selection UI (replaces/augments domain selection)
   - Map destinations to relevant domains and questions
   - Update results to show destination readiness

3. **Phase 3: Keys Integration**
   - Add Intention & Attention reflection prompts
   - Integrate keys into results/guidance
   - Merkaba visualization showing all 8 points

4. **Phase 4: Polish**
   - Additional visualizations
   - Refined animations
   - Mobile responsiveness
   - localStorage persistence

5. **Phase 5: Paid Features**
   - Supabase integration
   - Auth flow
   - Session history
   - Progress comparison over time

---

## Important Notes

- **Never use grades or scores in UI** — only visual feedback and affirming labels
- **Pace is everything** — unhurried, spacious transitions
- **The tool teaches the practice** — pausing, noticing, witnessing
- **Beauty matters** — this should feel like an elevated experience
- **Affirm what's possible** — focus on activation, not deficiency
- **Play is the spirit** — keep it light, "why so serious"
- **Test on mobile** — many users will access on phone

---

## Reference Files

- `merkaba-model-guide.md` — **PRIMARY** conceptual framework, harmonic signatures, AI guidance principles
- `PROJECT_OVERVIEW.md` — Full vision and philosophy
- `CONTENT_SPEC.md` — All questions, guidance text, and copy
- `VISUAL_DESIGN.md` — Color systems, animation specs, visual options
- `TECHNICAL_SPEC.md` — Detailed architecture and implementation notes
- `/Applications/MAMP/htdocs/quantum/merkaba.html` — Interactive merkaba visualization reference

---

## Harmonic Signatures Quick Reference

Each destination has a specific 3-frequency formula:

| Destination | Harmonic Signature | Primary Distortion |
|-------------|-------------------|-------------------|
| Freedom & Liberation | NOW + POWER + SAFETY | Then&There + Powerless + Danger |
| Intuition & Guidance | LIGHT + NOW + SAFETY | Dark + Then&There + Danger |
| Love & Intimacy | PLEASURE + SAFETY + HEAT | Pain + Danger + Cold |
| Purpose & Creation | LIGHT + HEAT + POWER | Dark + Cold + Powerless |
| Relationships & Connection | NOW + PLEASURE + HEAT | Then&There + Pain + Cold |
| Leadership & Impact | POWER + LIGHT + NOW | Powerless + Dark + Then&There |
| Wealth & Legacy | POWER + HEAT + SAFETY | Powerless + Cold + Danger |

**Guidance Principle:** Energy before effort. Don't prescribe action when frequency is missing — restore the frequency first.
