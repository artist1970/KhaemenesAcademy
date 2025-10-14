/* ===========================================================
🌸 Aurora Language Refinement Core v8.2 — Sovereign Pipeline
Grammar • Flow • Thesaurus • Metaphor • Rhythm • Mood • Cohesion
Varied-but-bounded • Paragraph-scoped • Deterministic option
=========================================================== */

;(function (root) {
  'use strict';
  const g = (typeof root !== 'undefined') ? root : (typeof globalThis !== 'undefined' ? globalThis : window);

  // ------------------------------------------------------------
  // Utilities
  // ------------------------------------------------------------
  const ASCII_WORD = /\b([A-Za-z]+)\b/g; // kept ASCII for simplicity; swap to Unicode props if needed

  // Deterministic RNG when seed provided; falls back to Math.random
  function makeRng(seed) {
    if (seed === undefined || seed === null || seed === false) return Math.random;
    let s = Number(seed) >>> 0 || 1;
    return function () {
      // xorshift32
      s ^= s << 13; s ^= s >>> 17; s ^= s << 5; s >>>= 0;
      return (s & 0xFFFFFFFF) / 0x100000000;
    };
  }

  function titleCaseLike(source, replacement) {
    if (!source) return replacement;
    if (source.toUpperCase() === source) return replacement.toUpperCase();
    if (source[0] === source[0].toUpperCase())
      return replacement.charAt(0).toUpperCase() + replacement.slice(1);
    return replacement;
  }

  function splitSentences(paragraph) {
    // Keep delimiters; simple heuristic
    const parts = paragraph.split(/([.!?]+\s+)/);
    const out = [];
    for (let i = 0; i < parts.length; i += 2) {
      const s = (parts[i] || '').trim();
      const p = parts[i + 1] || '';
      if (s) out.push(s + p);
    }
    return out.length ? out : (paragraph ? [paragraph] : []);
  }

  function joinParagraphs(blocks) {
    return blocks.join('\n\n');
  }

  // ------------------------------------------------------------
  // Module 1: Emotion Normalization (case-preserving)
  // ------------------------------------------------------------
  const emotionMap = {
    happy: 'happiness', sad: 'sadness', angry: 'anger', lonely: 'solitude',
    brave: 'courage', calm: 'serenity', peaceful: 'peace', hopeful: 'hope',
    joyful: 'joy', melancholy: 'melancholy', loving: 'love'
  };

  function normalizeEmotion(text) {
    return text.replace(/\b([A-Za-z]+)\b/g, (m, w) => {
      const key = w.toLowerCase();
      if (emotionMap[key]) return titleCaseLike(w, emotionMap[key]);
      return m;
    });
  }

  // ------------------------------------------------------------
  // Module 2: Grammar & Article Correction (phonetic-ish a/an)
  // ------------------------------------------------------------
  function correctGrammar(text) {
    // Handle common a/an exceptions
    // an + words starting with vowel sounds, but exclude uni/euro/one/once
    text = text.replace(/\b[Aa]n?\s+([A-Za-z]+)/g, (m, word) => {
      const w = word.toLowerCase();
      const vowel = /^[aeiou]/.test(w);
      const consonantSound = /^(uni([^a-z]|$)|euro|one|once)/.test(w);
      const silentH = /^(hour|honest|heir|herb\b(?!-icide))/.
        test(w);
      const useAn = (vowel && !consonantSound) || silentH;
      const first = m[0]; // 'a' or 'A'
      const article = useAn ? (first === 'A' ? 'An' : 'an') : (first === 'A' ? 'A' : 'a');
      return article + ' ' + word;
    });

    // Squash extra spaces, capitalize first char of each block, ensure end punctuation
    const blocks = text.split(/\n\n/).map(b => b.replace(/\s{2,}/g, ' ').trim());
    for (let i = 0; i < blocks.length; i++) {
      if (!blocks[i]) continue;
      blocks[i] = blocks[i].charAt(0).toUpperCase() + blocks[i].slice(1);
      if (!/[.!?]$/.test(blocks[i])) blocks[i] += '.';
    }
    return blocks.join('\n\n');
  }

  // ------------------------------------------------------------
  // Module 3: Thesaurus (tiered, case-preserving)
  // ------------------------------------------------------------
  const thesaurus = {
    happy: ['joyful', 'elated', 'ecstatic', 'ebullient'],
    sad: ['melancholy', 'mournful', 'heartbroken', 'desolate'],
    big: ['vast', 'immense', 'colossal', 'expansive'],
    small: ['delicate', 'petite', 'modest', 'compact'],
    fast: ['swift', 'fleet', 'rapid', 'brisk'],
    slow: ['gentle', 'unhurried', 'measured', 'leisurely'],
    bright: ['radiant', 'luminous', 'vivid', 'shimmering'],
    dark: ['shadowed', 'gloomy', 'dim', 'murky'],
    calm: ['serene', 'tranquil', 'peaceful', 'placid']
  };

  function replaceWithThesaurus(text, tier = 0) {
    return text.replace(ASCII_WORD, (m, w) => {
      const key = w.toLowerCase();
      const syns = thesaurus[key];
      if (!syns) return m;
      const replacement = syns[tier] || syns[0];
      return titleCaseLike(w, replacement);
    });
  }

  // ------------------------------------------------------------
  // Module 4: Metaphors & Imagery (bounded, guarded ordering)
  // ------------------------------------------------------------
  const extendedMetaphorBank = {
    sun: [
      'a molten gold coin spilling across the sky',
      'a fiery orb painting the horizon',
      'a blazing lantern lighting the world'
    ],
    moon: [
      'a silver sentinel watching over the night',
      'a pale pearl floating in darkness',
      'a quiet lantern in the sky'
    ],
    water: [
      'liquid crystal flowing like silk',
      'a mirrored veil reflecting the heavens',
      'a winding silver ribbon'
    ],
    girl: [
      'a blossom swaying in the wind',
      'a star dancing in sunlight',
      'a delicate spirit among the shadows'
    ],
    happy: [
      'radiating joy like sunlight through leaves',
      'bubbling with delight like a spring brook',
      'glowing with an inner warmth'
    ],
    calm: [
      'serene as a still lake at dawn',
      'peaceful as a quiet forest glade',
      'tranquil like mist over rolling hills'
    ],
    saw: [
      'gazed upon with wonder',
      'beheld as if enchanted',
      'watched with rapt attention'
    ],
    ran: [
      'darted like a lightning bolt',
      'flowed swiftly like a river',
      'bounded with unrestrained energy'
    ],
    felt: [
      'was enveloped in',
      'experienced the warmth of',
      'was touched by'
    ],
    smiled: [
      'bloomed like a flower in sunlight',
      'shone with an inner radiance',
      'spread joy as sunlight through leaves'
    ],
    'bright sun': [
      'the sun blazing like a golden forge',
      'a radiant orb spilling molten light',
      'a beacon of gold illuminating the horizon'
    ],
    'dark forest': [
      'a shadowed cathedral of ancient trees',
      'a mysterious realm cloaked in gloom',
      'a velvet expanse of whispering shadows'
    ],
    'calm lake': [
      'a mirror of tranquility reflecting the sky',
      'a still pool holding the world’s secrets',
      'a glassy expanse untouched by wind'
    ]
  };

  function applyMetaphorsBounded(text, rng, cap = { perSentence: 1, perParagraph: 1 }) {
    const phraseKeys = Object.keys(extendedMetaphorBank).filter(k => k.includes(' '));
    const wordKeys = Object.keys(extendedMetaphorBank).filter(k => !k.includes(' '));

    const paragraphs = text.split(/\n\n/);
    const outParas = [];

    for (const para of paragraphs) {
      let usedInParagraph = 0;
      const sentences = splitSentences(para);
      const outSent = [];

      for (let s of sentences) {
        let usedThisSentence = 0;
        // PHRASES FIRST (guards against earlier single-word replacements)
        for (const pk of phraseKeys) {
          if (usedThisSentence >= cap.perSentence || usedInParagraph >= cap.perParagraph) break;
          const re = new RegExp('\\b' + pk.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') + '\\b', 'gi');
          if (re.test(s)) {
            const options = extendedMetaphorBank[pk];
            const rep = options[Math.floor(rng() * options.length)];
            s = s.replace(re, rep);
            usedThisSentence++; usedInParagraph++;
          }
        }
        // SINGLE WORDS (only if cap not reached)
        if (usedThisSentence < cap.perSentence && usedInParagraph < cap.perParagraph) {
          for (const wk of wordKeys) {
            if (usedThisSentence >= cap.perSentence || usedInParagraph >= cap.perParagraph) break;
            const re = new RegExp('\\b' + wk + '\\b', 'gi');
            if (re.test(s)) {
              const options = extendedMetaphorBank[wk];
              const rep = options[Math.floor(rng() * options.length)];
              s = s.replace(re, rep);
              usedThisSentence++; usedInParagraph++;
            }
          }
        }
        outSent.push(s);
      }
      outParas.push(outSent.join(' '));
    }
    return joinParagraphs(outParas);
  }

  // ------------------------------------------------------------
  // Module 5: Rhythm & Alliteration (bounded; syllables-aware)
  // ------------------------------------------------------------
  function countSyllables(word) {
    word = (word || '').toLowerCase();
    if (word.length <= 3) return 1;
    const vowels = word.match(/[aeiouy]+/g);
    return vowels ? vowels.length : 1;
  }

  function adjustSentenceRhythm(text) {
    // Insert soft breaks if a clause exceeds syllable threshold before conjunctions
    const THRESH = 28; // syllables per clause (tunable)
    return text.replace(/([^.!?]{40,}?)(,\s+|;\s+|\s+and\s+|\s+but\s+)/gi, (m, before, conj) => {
      const words = before.trim().split(/\s+/);
      const totalSyl = words.reduce((n, w) => n + countSyllables(w), 0);
      if (totalSyl > THRESH) return before.trim() + '. ';
      return m;
    });
  }

  function enhanceAlliteration(sentence, rng, cap = 2) {
    const words = sentence.split(/\s+/);
    if (words.length < 3) return sentence;
    const firstLetter = (words[0][0] || '').toLowerCase();
    const bank = {
      a: ['amazing', 'aurora', 'angelic', 'azure'],
      b: ['blissful', 'bright', 'bountiful', 'brilliant'],
      c: ['calm', 'crystal', 'celestial', 'charming'],
      d: ['delicate', 'dreamy', 'dazzling', 'deep'],
      e: ['elegant', 'ethereal', 'enchanting', 'endless'],
      f: ['flowing', 'faint', 'fiery', 'fleeting'],
      g: ['gentle', 'glowing', 'graceful', 'golden'],
      h: ['heavenly', 'harmonious', 'hushed', 'hallowed'],
      i: ['illuminated', 'infinite', 'iridescent', 'inspiring'],
      s: ['soft', 'silver', 'silken', 'still'],
      r: ['radiant', 'rippling', 'restful', 'rosy']
    };
    if (!bank[firstLetter]) return sentence;

    let replaced = 0;
    for (let i = 1; i < words.length; i++) {
      const w = words[i];
      if (!w) continue;
      // Only replace if the target word starts with same letter
      if (w[0] && w[0].toLowerCase() === firstLetter) {
        if (replaced >= cap) break;
        if (rng() < 0.5) { // some variety
          const choice = bank[firstLetter][Math.floor(rng() * bank[firstLetter].length)];
          words[i] = choice;
          replaced++;
        }
      }
    }
    return words.join(' ');
  }

  function applyRhythmAndAlliteration(text, rng, caps = { allitPerSentence: 2 }) {
    text = adjustSentenceRhythm(text);
    const paragraphs = text.split(/\n\n/);
    const out = [];
    for (const p of paragraphs) {
      const sentences = splitSentences(p);
      for (let i = 0; i < sentences.length; i++) {
        sentences[i] = enhanceAlliteration(sentences[i], rng, caps.allitPerSentence);
      }
      out.push(sentences.join(' '));
    }
    return joinParagraphs(out);
  }

  // ------------------------------------------------------------
  // Module 6: Mood & Stylistic Cohesion (safe swaps, punctuation kept)
  // ------------------------------------------------------------
  const moodLexicon = {
    happiness: 1, joy: 1, elated: 1, blissful: 1, radiant: 1,
    serene: 0.9, calm: 0.8, hope: 0.8, love: 1, peaceful: 0.9,
    melancholy: -0.8, sad: -0.9, lonely: -0.7, desolate: -1,
    gloomy: -0.8, shadowed: -0.6, anger: -1
  };

  function analyzeParagraphMood(paragraph) {
    const words = (paragraph.toLowerCase().match(/\b\w+\b/g)) || [];
    if (!words.length) return 0;
    let total = 0;
    for (const w of words) total += moodLexicon[w] || 0;
    return total / words.length;
  }

  function enforceParagraphMood(paragraph, rng) {
    const moodScore = analyzeParagraphMood(paragraph);
    const positives = ['joyful', 'elated', 'radiant', 'blissful', 'serene', 'peaceful'];
    const negatives = ['melancholy', 'gloomy', 'shadowed', 'desolate', 'sad'];

    return paragraph.replace(/(\b[\w']+\b)([.,!?…:;)]?)/g, (m, core, punc) => {
      const lower = core.toLowerCase();
      let out = core;
      if (moodScore > 0 && negatives.includes(lower)) {
        const rep = positives[Math.floor(rng() * positives.length)];
        out = titleCaseLike(core, rep);
      } else if (moodScore < 0 && positives.includes(lower)) {
        const rep = negatives[Math.floor(rng() * negatives.length)];
        out = titleCaseLike(core, rep);
      }
      return out + (punc || '');
    });
  }

  function harmonizeStylisticCohesion(paragraph) {
    const moodScore = analyzeParagraphMood(paragraph);
    let out = paragraph;
    if (moodScore > 0.5) out = adjustSentenceRhythm(out);
    if (moodScore < -0.5) {
      // Remove short similes only, bounded and non-greedy
      out = out.replace(/\b(?:like|as)\b[^.,;!?]{0,80}(?=[.,;!?]|\s|$)/gi, '');
    }
    return out;
  }

  function applyMoodConsistency(text, rng) {
    const paras = text.split(/\n\n/);
    const out = [];
    for (let p of paras) {
      p = enforceParagraphMood(p, rng);
      p = harmonizeStylisticCohesion(p);
      out.push(p);
    }
    return joinParagraphs(out);
  }

  // ------------------------------------------------------------
  // Presets & Main Entry
  // ------------------------------------------------------------
  const DEFAULTS = {
    seed: false, // number | false
    tier: 0,
    mode: 'rich', // 'light' | 'rich'
    caps: { allitPerSentence: 2 },
    metaphorCap: { perSentence: 1, perParagraph: 1 }
  };

  function auroraRefineV8Complete(input, options) {
    const opts = Object.assign({}, DEFAULTS, options || {});
    const rng = makeRng(opts.seed);

    // Paragraph-scope processing
    let text = String(input || '');

    // 1) Emotion + Grammar first
    text = normalizeEmotion(text);
    text = correctGrammar(text);

    const lightOnly = (opts.mode === 'light');

    // 2) PHRASE metaphors first (guard ordering), then thesaurus, then SINGLE metaphors
    if (!lightOnly) {
      text = applyMetaphorsBounded(text, rng, opts.metaphorCap); // phrases are attempted first inside
    }

    // Minor synonyms even in light mode
    text = replaceWithThesaurus(text, opts.tier);

    if (!lightOnly) {
      // Rhythm + Alliteration (bounded)
      text = applyRhythmAndAlliteration(text, rng, opts.caps);
      // Mood consistency per paragraph
      text = applyMoodConsistency(text, rng);
    }

    return text;
  }

  // ------------------------------------------------------------
  // Public API
  // ------------------------------------------------------------
  const AURORA = {
    // modules
    normalizeEmotion,
    correctGrammar,
    replaceWithThesaurus,
    applyMetaphorsBounded,
    countSyllables,
    applyRhythmAndAlliteration,
    analyzeParagraphMood,
    applyMoodConsistency,
    // entry
    auroraRefineV8Complete,
    // presets for convenience
    presets: {
      light: (text, o) => auroraRefineV8Complete(text, Object.assign({}, o, { mode: 'light' })),
      rich: (text, o) => auroraRefineV8Complete(text, Object.assign({}, o, { mode: 'rich' }))
    }
  };

  g.AURORA = AURORA;

  // ------------------------------------------------------------
  // Runtime smoke tests (non-throwing): print to console
  // ------------------------------------------------------------
  function test(label, fn) {
    try { console.log('✔', label, '→', fn()); } catch (e) { console.warn('✖', label, e); }
  }

  if (typeof console !== 'undefined') {
    console.log('Aurora v8.2 — Sovereign Pipeline Loaded');
    const seed = 1234;

    test('Emotion normalize', () => AURORA.normalizeEmotion('I feel calm and HAPPY'));
    test('Grammar a/an (apple → An, uniform → A, hour → An)', () => AURORA.correctGrammar('a apple\n\n a uniform and an hour'));
    test('Thesaurus tier 0', () => AURORA.replaceWithThesaurus('big bright calm'));

    const sample = 'The bright sun warmed the calm lake and the happy girl ran, and ran, and ran for a very long time until the water was near. She felt gloomy, like a stone.';
    test('Rich seeded, paragraph scoped', () => AURORA.auroraRefineV8Complete(sample + '\n\n' + sample, { seed, mode: 'rich', tier: 0 }));
    test('Light mode', () => AURORA.presets.light('a uniform under a bright sun'));
  }

})(typeof globalThis !== 'undefined' ? globalThis : window);

/* ===========================================================
  Aurora v8.2 — Ready for Creative Spark Integration
=========================================================== */
