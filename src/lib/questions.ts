import type { Question, Domain, Note } from '@/types';

// ========== SAFETY QUESTIONS (Violet) ==========

const safetyQuestions: Question[] = [
  // General Safety Questions
  {
    id: 'S1',
    note: 'safety',
    text: 'When I think about making a big change in my life, my body...',
    options: [
      { id: 'S1-a', text: 'Softens with curiosity and openness', resonance: 'high' },
      { id: 'S1-b', text: 'Braces, tightens, or holds its breath', resonance: 'low', tension: 'tight' },
      { id: 'S1-c', text: 'Goes numb or foggy', resonance: 'low', tension: 'loose' },
      { id: 'S1-d', text: 'Floods with nervous energy I can\'t settle', resonance: 'mid-low', tension: 'tight' },
      { id: 'S1-e', text: 'Feels cautious but willing', resonance: 'mid-high' },
    ],
  },
  {
    id: 'S2',
    note: 'safety',
    text: 'When things are going well, I...',
    options: [
      { id: 'S2-a', text: 'Enjoy it fully, trusting it can last', resonance: 'high' },
      { id: 'S2-b', text: 'Wait for the other shoe to drop', resonance: 'mid-low', tension: 'tight' },
      { id: 'S2-c', text: 'Barely notice because I\'m focused on the next thing', resonance: 'mid-low', tension: 'tight' },
      { id: 'S2-d', text: 'Feel uncomfortable, like I don\'t deserve it', resonance: 'low' },
      { id: 'S2-e', text: 'Appreciate it while it lasts', resonance: 'mid-high' },
    ],
  },
  {
    id: 'S3',
    note: 'safety',
    text: 'My relationship with rest is...',
    options: [
      { id: 'S3-a', text: 'I rest when I need to without guilt', resonance: 'high' },
      { id: 'S3-b', text: 'Rest feels lazy or unproductive', resonance: 'mid-low', tension: 'tight' },
      { id: 'S3-c', text: 'I collapse into rest only when depleted', resonance: 'low', tension: 'loose' },
      { id: 'S3-d', text: 'I don\'t know how to rest — my mind won\'t stop', resonance: 'low', tension: 'tight' },
      { id: 'S3-e', text: 'I\'m learning to give myself permission', resonance: 'mid' },
    ],
  },
  // Domain-Specific Safety Questions
  {
    id: 'S-Spirit',
    note: 'safety',
    domain: 'spirit',
    text: 'My sense of being held or supported by something larger than myself...',
    options: [
      { id: 'S-Spirit-a', text: 'Feels constant and reliable', resonance: 'high' },
      { id: 'S-Spirit-b', text: 'Comes and goes — I lose the connection easily', resonance: 'mid' },
      { id: 'S-Spirit-c', text: 'Feels like something I have to earn', resonance: 'mid-low', tension: 'tight' },
      { id: 'S-Spirit-d', text: 'I\'m not sure I believe in it', resonance: 'mid-low', tension: 'loose' },
      { id: 'S-Spirit-e', text: 'Is something I\'m learning to trust', resonance: 'mid-high' },
    ],
  },
  {
    id: 'S-Body',
    note: 'safety',
    domain: 'body',
    text: 'In my body, I feel...',
    options: [
      { id: 'S-Body-a', text: 'At home and safe', resonance: 'high' },
      { id: 'S-Body-b', text: 'Like I need to control or manage it', resonance: 'mid-low', tension: 'tight' },
      { id: 'S-Body-c', text: 'Disconnected, like I live in my head', resonance: 'low', tension: 'loose' },
      { id: 'S-Body-d', text: 'Hyperaware, always monitoring for problems', resonance: 'low', tension: 'tight' },
      { id: 'S-Body-e', text: 'More comfortable than I used to', resonance: 'mid-high' },
    ],
  },
  {
    id: 'S-Wealth',
    note: 'safety',
    domain: 'wealth',
    text: 'When I think about my financial situation, I feel...',
    options: [
      { id: 'S-Wealth-a', text: 'Secure and trusting', resonance: 'high' },
      { id: 'S-Wealth-b', text: 'Anxious, even if things are okay', resonance: 'mid-low', tension: 'tight' },
      { id: 'S-Wealth-c', text: 'Avoidant — I don\'t want to look too closely', resonance: 'low', tension: 'loose' },
      { id: 'S-Wealth-d', text: 'Like I need to work harder to feel safe', resonance: 'low', tension: 'tight' },
      { id: 'S-Wealth-e', text: 'Cautiously optimistic', resonance: 'mid' },
    ],
  },
  {
    id: 'S-Relationships',
    note: 'safety',
    domain: 'relationships',
    text: 'In close relationships, I feel...',
    options: [
      { id: 'S-Rel-a', text: 'Safe to be fully myself', resonance: 'high' },
      { id: 'S-Rel-b', text: 'Like I need to perform or manage impressions', resonance: 'mid-low', tension: 'tight' },
      { id: 'S-Rel-c', text: 'Guarded — I don\'t let people fully in', resonance: 'low', tension: 'tight' },
      { id: 'S-Rel-d', text: 'Like I lose myself to keep the peace', resonance: 'low', tension: 'loose' },
      { id: 'S-Rel-e', text: 'Mostly safe with some edges of fear', resonance: 'mid-high' },
    ],
  },
];

// ========== PLEASURE QUESTIONS (Pink) ==========

const pleasureQuestions: Question[] = [
  // General Pleasure Questions
  {
    id: 'P1',
    note: 'pleasure',
    text: 'When I experience something pleasurable, I...',
    options: [
      { id: 'P1-a', text: 'Let myself fully enjoy it', resonance: 'high' },
      { id: 'P1-b', text: 'Feel guilty or like I should be doing something productive', resonance: 'mid-low', tension: 'tight' },
      { id: 'P1-c', text: 'Cut it short — there\'s too much to do', resonance: 'low', tension: 'tight' },
      { id: 'P1-d', text: 'Rarely notice pleasure in my daily life', resonance: 'low', tension: 'loose' },
      { id: 'P1-e', text: 'Enjoy it while telling myself I\'ve earned it', resonance: 'mid' },
    ],
  },
  {
    id: 'P2',
    note: 'pleasure',
    text: 'My body\'s signals — hunger, tiredness, desire...',
    options: [
      { id: 'P2-a', text: 'I listen and respond to them', resonance: 'high' },
      { id: 'P2-b', text: 'I override them to get things done', resonance: 'mid-low', tension: 'tight' },
      { id: 'P2-c', text: 'I\'ve learned to ignore them', resonance: 'low', tension: 'loose' },
      { id: 'P2-d', text: 'They feel inconvenient or distracting', resonance: 'low', tension: 'tight' },
      { id: 'P2-e', text: 'I\'m getting better at honoring them', resonance: 'mid-high' },
    ],
  },
  {
    id: 'P3',
    note: 'pleasure',
    text: 'Joy in my life is...',
    options: [
      { id: 'P3-a', text: 'A regular presence I cultivate', resonance: 'high' },
      { id: 'P3-b', text: 'Something I experience when I achieve goals', resonance: 'mid', tension: 'tight' },
      { id: 'P3-c', text: 'Rare — I\'m usually focused on problems to solve', resonance: 'low', tension: 'tight' },
      { id: 'P3-d', text: 'Something I feel guilty about when others are struggling', resonance: 'mid-low' },
      { id: 'P3-e', text: 'Something I want more of', resonance: 'mid' },
    ],
  },
  // Domain-Specific Pleasure Questions
  {
    id: 'P-Body',
    note: 'pleasure',
    domain: 'body',
    text: 'Physical pleasure — touch, movement, taste, sensation...',
    options: [
      { id: 'P-Body-a', text: 'Is something I savor regularly', resonance: 'high' },
      { id: 'P-Body-b', text: 'Feels indulgent or guilty', resonance: 'mid-low', tension: 'tight' },
      { id: 'P-Body-c', text: 'Is mostly functional, not enjoyable', resonance: 'low', tension: 'loose' },
      { id: 'P-Body-d', text: 'I\'m too in my head to feel it fully', resonance: 'mid-low' },
      { id: 'P-Body-e', text: 'Is something I\'m reconnecting with', resonance: 'mid-high' },
    ],
  },
  {
    id: 'P-Purpose',
    note: 'pleasure',
    domain: 'purpose',
    text: 'My work and purpose feel...',
    options: [
      { id: 'P-Purpose-a', text: 'Deeply enjoyable and fulfilling', resonance: 'high' },
      { id: 'P-Purpose-b', text: 'Meaningful but exhausting', resonance: 'mid', tension: 'tight' },
      { id: 'P-Purpose-c', text: 'Like something I endure to reach my goals', resonance: 'low', tension: 'tight' },
      { id: 'P-Purpose-d', text: 'Disconnected from what actually lights me up', resonance: 'low', tension: 'loose' },
      { id: 'P-Purpose-e', text: 'Becoming more aligned with my joy', resonance: 'mid-high' },
    ],
  },
  {
    id: 'P-Play',
    note: 'pleasure',
    domain: 'play',
    text: 'When it comes to pure fun and play, I...',
    options: [
      { id: 'P-Play-a', text: 'Prioritize it without guilt', resonance: 'high' },
      { id: 'P-Play-b', text: 'Feel like I don\'t have time', resonance: 'low', tension: 'tight' },
      { id: 'P-Play-c', text: 'Have forgotten what I even enjoy', resonance: 'low', tension: 'loose' },
      { id: 'P-Play-d', text: 'Schedule it like another task', resonance: 'mid', tension: 'tight' },
      { id: 'P-Play-e', text: 'Am making more room for it', resonance: 'mid-high' },
    ],
  },
];

// ========== POWER QUESTIONS (Magenta) ==========

const powerQuestions: Question[] = [
  // General Power Questions
  {
    id: 'PW1',
    note: 'power',
    text: 'When I want something, I...',
    options: [
      { id: 'PW1-a', text: 'Trust it\'s coming and take aligned action', resonance: 'high' },
      { id: 'PW1-b', text: 'Work hard and push until I get it', resonance: 'mid-low', tension: 'tight' },
      { id: 'PW1-c', text: 'Talk myself out of wanting it', resonance: 'low', tension: 'loose' },
      { id: 'PW1-d', text: 'Want it but don\'t believe I can have it', resonance: 'low' },
      { id: 'PW1-e', text: 'Hold it lightly while moving toward it', resonance: 'mid-high' },
    ],
  },
  {
    id: 'PW2',
    note: 'power',
    text: 'My voice — speaking my truth, asking for what I need...',
    options: [
      { id: 'PW2-a', text: 'Comes naturally and clearly', resonance: 'high' },
      { id: 'PW2-b', text: 'Gets stuck in my throat or comes out harsh', resonance: 'mid-low' },
      { id: 'PW2-c', text: 'I don\'t want to be a burden or cause conflict', resonance: 'low', tension: 'loose' },
      { id: 'PW2-d', text: 'Depends entirely on who I\'m with', resonance: 'mid' },
      { id: 'PW2-e', text: 'Is something I\'m strengthening', resonance: 'mid-high' },
    ],
  },
  {
    id: 'PW3',
    note: 'power',
    text: 'Boundaries in my life...',
    options: [
      { id: 'PW3-a', text: 'Are clear and I maintain them with ease', resonance: 'high' },
      { id: 'PW3-b', text: 'Exist but I often let them slide', resonance: 'mid-low', tension: 'loose' },
      { id: 'PW3-c', text: 'Feel mean or selfish to enforce', resonance: 'low' },
      { id: 'PW3-d', text: 'Are rigid — I wall people out', resonance: 'mid-low', tension: 'tight' },
      { id: 'PW3-e', text: 'Are something I\'m learning to hold', resonance: 'mid' },
    ],
  },
  // Domain-Specific Power Questions
  {
    id: 'PW-Self',
    note: 'power',
    domain: 'self',
    text: 'My relationship with my own authority — trusting myself, leading myself...',
    options: [
      { id: 'PW-Self-a', text: 'Feels natural and grounded', resonance: 'high' },
      { id: 'PW-Self-b', text: 'I second-guess myself constantly', resonance: 'mid-low', tension: 'tight' },
      { id: 'PW-Self-c', text: 'I defer to others\' opinions', resonance: 'low', tension: 'loose' },
      { id: 'PW-Self-d', text: 'I\'m hard on myself when I make mistakes', resonance: 'mid-low', tension: 'tight' },
      { id: 'PW-Self-e', text: 'Is strengthening over time', resonance: 'mid-high' },
    ],
  },
  {
    id: 'PW-Wealth',
    note: 'power',
    domain: 'wealth',
    text: 'My relationship with money and abundance...',
    options: [
      { id: 'PW-Wealth-a', text: 'I feel like a capable creator of wealth', resonance: 'high' },
      { id: 'PW-Wealth-b', text: 'I work hard but never feel I have enough', resonance: 'mid-low', tension: 'tight' },
      { id: 'PW-Wealth-c', text: 'I avoid dealing with money things', resonance: 'low', tension: 'loose' },
      { id: 'PW-Wealth-d', text: 'I feel at the mercy of external circumstances', resonance: 'low' },
      { id: 'PW-Wealth-e', text: 'Is shifting toward empowerment', resonance: 'mid-high' },
    ],
  },
  {
    id: 'PW-Relationships',
    note: 'power',
    domain: 'relationships',
    text: 'In relationships, my power...',
    options: [
      { id: 'PW-Rel-a', text: 'Is balanced — I give and receive freely', resonance: 'high' },
      { id: 'PW-Rel-b', text: 'I tend to over-give and then resent it', resonance: 'mid-low', tension: 'loose' },
      { id: 'PW-Rel-c', text: 'I try to control outcomes', resonance: 'mid-low', tension: 'tight' },
      { id: 'PW-Rel-d', text: 'I give my power away to keep connection', resonance: 'low', tension: 'loose' },
      { id: 'PW-Rel-e', text: 'Is something I\'m reclaiming', resonance: 'mid-high' },
    ],
  },
];

// ========== LIGHT QUESTIONS (Turquoise) ==========

const lightQuestions: Question[] = [
  // General Light Questions
  {
    id: 'L1',
    note: 'light',
    text: 'When I face a decision, I...',
    options: [
      { id: 'L1-a', text: 'Get quiet and let clarity emerge', resonance: 'high' },
      { id: 'L1-b', text: 'Analyze endlessly, looking for the "right" answer', resonance: 'mid-low', tension: 'tight' },
      { id: 'L1-c', text: 'Avoid deciding as long as possible', resonance: 'low', tension: 'loose' },
      { id: 'L1-d', text: 'Decide quickly to get it over with', resonance: 'mid', tension: 'tight' },
      { id: 'L1-e', text: 'Trust the answer will come', resonance: 'mid-high' },
    ],
  },
  {
    id: 'L2',
    note: 'light',
    text: 'My vision for my life is...',
    options: [
      { id: 'L2-a', text: 'Clear and I\'m moving toward it', resonance: 'high' },
      { id: 'L2-b', text: 'Constantly shifting — I can\'t pin it down', resonance: 'mid-low' },
      { id: 'L2-c', text: 'Obscured by fog or doubt', resonance: 'low' },
      { id: 'L2-d', text: 'Something I don\'t let myself think about', resonance: 'low', tension: 'loose' },
      { id: 'L2-e', text: 'Becoming clearer', resonance: 'mid-high' },
    ],
  },
  {
    id: 'L3',
    note: 'light',
    text: 'I see myself...',
    options: [
      { id: 'L3-a', text: 'Clearly — strengths, shadows, and all', resonance: 'high' },
      { id: 'L3-b', text: 'Through the lens of what I should be', resonance: 'mid-low', tension: 'tight' },
      { id: 'L3-c', text: 'Through others\' eyes more than my own', resonance: 'mid-low', tension: 'loose' },
      { id: 'L3-d', text: 'I avoid looking too closely', resonance: 'low', tension: 'loose' },
      { id: 'L3-e', text: 'With increasing honesty', resonance: 'mid-high' },
    ],
  },
  // Domain-Specific Light Questions
  {
    id: 'L-Spirit',
    note: 'light',
    domain: 'spirit',
    text: 'My understanding of my spiritual path and purpose...',
    options: [
      { id: 'L-Spirit-a', text: 'Is clear and guides my choices', resonance: 'high' },
      { id: 'L-Spirit-b', text: 'Feels intellectually clear but not embodied', resonance: 'mid', tension: 'tight' },
      { id: 'L-Spirit-c', text: 'Shifts constantly — I\'m always seeking', resonance: 'mid-low' },
      { id: 'L-Spirit-d', text: 'Feels foggy or uncertain', resonance: 'low' },
      { id: 'L-Spirit-e', text: 'Is clarifying over time', resonance: 'mid-high' },
    ],
  },
  {
    id: 'L-Self',
    note: 'light',
    domain: 'self',
    text: 'My self-awareness — understanding why I do what I do...',
    options: [
      { id: 'L-Self-a', text: 'Is strong and continues to deepen', resonance: 'high' },
      { id: 'L-Self-b', text: 'Lives mostly in my head, not my body', resonance: 'mid', tension: 'tight' },
      { id: 'L-Self-c', text: 'I often surprise myself with my reactions', resonance: 'mid-low' },
      { id: 'L-Self-d', text: 'I avoid introspection', resonance: 'low', tension: 'loose' },
      { id: 'L-Self-e', text: 'Is growing', resonance: 'mid-high' },
    ],
  },
];

// ========== NOW QUESTIONS (Blue) ==========

const nowQuestions: Question[] = [
  // General Now Questions
  {
    id: 'N1',
    note: 'now',
    text: 'Right now, in this moment, I am...',
    options: [
      { id: 'N1-a', text: 'Here, aware of my body and breath', resonance: 'high' },
      { id: 'N1-b', text: 'Partially here, partially somewhere else', resonance: 'mid' },
      { id: 'N1-c', text: 'Already thinking about what\'s next', resonance: 'mid-low', tension: 'tight' },
      { id: 'N1-d', text: 'Stuck in something that already happened', resonance: 'mid-low', tension: 'loose' },
      { id: 'N1-e', text: 'More present than usual', resonance: 'mid-high' },
    ],
  },
  {
    id: 'N2',
    note: 'now',
    text: 'My attention throughout the day is...',
    options: [
      { id: 'N2-a', text: 'Mostly where I choose to place it', resonance: 'high' },
      { id: 'N2-b', text: 'Pulled in many directions', resonance: 'mid-low' },
      { id: 'N2-c', text: 'Constantly on the future — planning, anticipating', resonance: 'mid-low', tension: 'tight' },
      { id: 'N2-d', text: 'Often replaying the past', resonance: 'mid-low', tension: 'loose' },
      { id: 'N2-e', text: 'Something I\'m training', resonance: 'mid' },
    ],
  },
  {
    id: 'N3',
    note: 'now',
    text: 'Stillness feels...',
    options: [
      { id: 'N3-a', text: 'Nourishing and natural', resonance: 'high' },
      { id: 'N3-b', text: 'Uncomfortable — I need to be doing something', resonance: 'mid-low', tension: 'tight' },
      { id: 'N3-c', text: 'Scary — too much comes up', resonance: 'low', tension: 'tight' },
      { id: 'N3-d', text: 'Impossible — my mind won\'t stop', resonance: 'low', tension: 'tight' },
      { id: 'N3-e', text: 'More accessible than it used to be', resonance: 'mid-high' },
    ],
  },
  // Domain-Specific Now Questions
  {
    id: 'N-Body',
    note: 'now',
    domain: 'body',
    text: 'My presence in my physical body...',
    options: [
      { id: 'N-Body-a', text: 'Is constant — I feel at home here', resonance: 'high' },
      { id: 'N-Body-b', text: 'Comes and goes — I often disconnect', resonance: 'mid' },
      { id: 'N-Body-c', text: 'Is rare — I live mostly in my mind', resonance: 'low', tension: 'loose' },
      { id: 'N-Body-d', text: 'Is uncomfortable — I don\'t like being in my body', resonance: 'low' },
      { id: 'N-Body-e', text: 'Is something I\'m cultivating', resonance: 'mid-high' },
    ],
  },
  {
    id: 'N-Relationships',
    note: 'now',
    domain: 'relationships',
    text: 'In conversation and connection, I...',
    options: [
      { id: 'N-Rel-a', text: 'Listen fully without planning my response', resonance: 'high' },
      { id: 'N-Rel-b', text: 'Multi-task mentally while appearing present', resonance: 'mid-low' },
      { id: 'N-Rel-c', text: 'Wait for my turn to speak', resonance: 'mid-low', tension: 'tight' },
      { id: 'N-Rel-d', text: 'Zone out or lose track', resonance: 'low', tension: 'loose' },
      { id: 'N-Rel-e', text: 'Am practicing deeper listening', resonance: 'mid-high' },
    ],
  },
];

// ========== HEAT QUESTIONS (Green) ==========

const heatQuestions: Question[] = [
  // General Heat Questions
  {
    id: 'H1',
    note: 'heat',
    text: 'My current relationship with stress is...',
    options: [
      { id: 'H1-a', text: 'I feel challenged but not overwhelmed', resonance: 'high', tension: 'balanced' },
      { id: 'H1-b', text: 'I\'m running hot — tight, tense, overloaded', resonance: 'low', tension: 'tight' },
      { id: 'H1-c', text: 'I\'m running cool — flat, unmotivated, stuck', resonance: 'low', tension: 'loose' },
      { id: 'H1-d', text: 'It swings between extremes', resonance: 'mid-low' },
      { id: 'H1-e', text: 'I\'m finding a sustainable rhythm', resonance: 'mid-high', tension: 'balanced' },
    ],
  },
  {
    id: 'H2',
    note: 'heat',
    text: 'When I think about my goals and desires, I feel...',
    options: [
      { id: 'H2-a', text: 'Warm anticipation and forward motion', resonance: 'high', tension: 'balanced' },
      { id: 'H2-b', text: 'Pressure, urgency, or anxiety', resonance: 'mid-low', tension: 'tight' },
      { id: 'H2-c', text: 'Disconnected or indifferent', resonance: 'low', tension: 'loose' },
      { id: 'H2-d', text: 'Confused — I\'m not sure what I want', resonance: 'mid-low', tension: 'loose' },
      { id: 'H2-e', text: 'Excited without overwhelm', resonance: 'mid-high', tension: 'balanced' },
    ],
  },
  {
    id: 'H3',
    note: 'heat',
    text: 'The fire in me — my passion, drive, desire...',
    options: [
      { id: 'H3-a', text: 'Burns bright and warm', resonance: 'high', tension: 'balanced' },
      { id: 'H3-b', text: 'Burns hot — sometimes too hot', resonance: 'mid-low', tension: 'tight' },
      { id: 'H3-c', text: 'Has dimmed — I\'m not sure where it went', resonance: 'low', tension: 'loose' },
      { id: 'H3-d', text: 'Flickers unpredictably', resonance: 'mid-low' },
      { id: 'H3-e', text: 'Is being rekindled', resonance: 'mid-high' },
    ],
  },
  // Domain-Specific Heat Questions
  {
    id: 'H-Purpose',
    note: 'heat',
    domain: 'purpose',
    text: 'My relationship with my work and mission...',
    options: [
      { id: 'H-Purpose-a', text: 'Energizes me sustainably', resonance: 'high', tension: 'balanced' },
      { id: 'H-Purpose-b', text: 'Drives me but at a cost', resonance: 'mid-low', tension: 'tight' },
      { id: 'H-Purpose-c', text: 'Feels like a grind', resonance: 'low', tension: 'tight' },
      { id: 'H-Purpose-d', text: 'I\'ve lost connection to why it matters', resonance: 'low', tension: 'loose' },
      { id: 'H-Purpose-e', text: 'Is becoming more balanced', resonance: 'mid-high' },
    ],
  },
  {
    id: 'H-Wealth',
    note: 'heat',
    domain: 'wealth',
    text: 'My energy around creating wealth and abundance...',
    options: [
      { id: 'H-Wealth-a', text: 'Feels activated and flowing', resonance: 'high', tension: 'balanced' },
      { id: 'H-Wealth-b', text: 'Feels urgent and pressured', resonance: 'mid-low', tension: 'tight' },
      { id: 'H-Wealth-c', text: 'Feels stuck or blocked', resonance: 'low', tension: 'loose' },
      { id: 'H-Wealth-d', text: 'Exhausts me — I\'m pushing too hard', resonance: 'low', tension: 'tight' },
      { id: 'H-Wealth-e', text: 'Is finding a healthier rhythm', resonance: 'mid-high' },
    ],
  },
];

// ========== ALL QUESTIONS ==========

export const ALL_QUESTIONS: Question[] = [
  ...safetyQuestions,
  ...pleasureQuestions,
  ...powerQuestions,
  ...lightQuestions,
  ...nowQuestions,
  ...heatQuestions,
];

// ========== QUESTION HELPERS ==========

/**
 * Get questions filtered by selected domains
 * Returns general questions + domain-specific questions for selected domains
 */
export function getQuestionsForDomains(domains: Domain[]): Question[] {
  return ALL_QUESTIONS.filter((q) => {
    // Include all general questions (no domain specified)
    if (!q.domain) return true;
    // Include domain-specific questions only if domain is selected
    return domains.includes(q.domain);
  });
}

/**
 * Get questions for a specific note
 */
export function getQuestionsForNote(note: Note): Question[] {
  return ALL_QUESTIONS.filter((q) => q.note === note);
}

/**
 * Get opening invitation text for a note
 */
export function getNoteInvitation(note: Note): string {
  const invitations: Record<Note, string> = {
    safety: 'Safety isn\'t playing small. It\'s the ground from which you can fully expand.',
    pleasure: 'Pleasure is your guidance system. It tells you where life is flowing.',
    power: 'True power isn\'t force. It\'s the capacity to create and to choose.',
    light: 'Clarity isn\'t figuring everything out. It\'s seeing what\'s actually here.',
    now: 'The present moment is the only place creation happens.',
    heat: 'Heat is life force. Too much burns. Too little and nothing grows.',
  };
  return invitations[note];
}

/**
 * Shuffle questions while maintaining note grouping for better flow
 */
export function shuffleQuestionsWithinNotes(questions: Question[]): Question[] {
  const byNote: Record<Note, Question[]> = {
    safety: [],
    pleasure: [],
    power: [],
    light: [],
    now: [],
    heat: [],
  };

  // Group by note
  questions.forEach((q) => {
    byNote[q.note].push(q);
  });

  // Shuffle within each note
  Object.keys(byNote).forEach((note) => {
    byNote[note as Note] = shuffleArray(byNote[note as Note]);
  });

  // Interleave notes for variety (Safety, Light, Pleasure, Now, Power, Heat pattern)
  const noteOrder: Note[] = ['safety', 'light', 'pleasure', 'now', 'power', 'heat'];
  const result: Question[] = [];

  let hasMore = true;
  let index = 0;

  while (hasMore) {
    hasMore = false;
    for (const note of noteOrder) {
      if (byNote[note][index]) {
        result.push(byNote[note][index]);
        hasMore = true;
      }
    }
    index++;
  }

  return result;
}

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
