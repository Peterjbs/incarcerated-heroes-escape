# Bio-Signature Mimicry Challenge Prototypes

This directory contains standalone prototypes for testing different versions of the Bio-Signature Mimicry Challenge system.

## Available Prototypes

### Version 1: Streamlined (`biosig_v1_streamlined.html`)

**Target Use Case:** Quick bio-lock bypass, single-subject challenges  
**Completion Time:** ~1 minute per attempt  
**Complexity:** Low  
**Best For:** Mobile devices, casual players, frequent use

**Features:**
- Quick Scan phase (laser-guided precision)
- Vitals Configuration with proximity feedback
- Rhythm Matching with visual metronome
- Instant validation and scoring

**How to Test:**
1. Open `biosig_v1_streamlined.html` directly in your browser
2. Or serve via HTTP: `python -m http.server 8000` and visit `http://localhost:8000/prototypes/biosig_v1_streamlined.html`

**Test Scenarios:**
- ✅ Complete with perfect score (match all vitals exactly)
- ✅ Intentionally get low score (miss vitals and rhythm)
- ✅ Test on mobile device (responsive design)
- ✅ Test rhythm matching accuracy

---

### Version 2: Standard (Coming Soon)

**Target Use Case:** Main game tracker extraction  
**Completion Time:** ~2 minutes per attempt  
**Complexity:** Medium  
**Best For:** Desktop/tablet, balanced gameplay

**Planned Features:**
- Subject selection screen
- Varied extraction mini-games
- Comprehensive vitals analysis
- Advanced rhythm patterns
- Validation with refinement cycle

---

### Version 3: Advanced (Concept Stage)

**Target Use Case:** Boss encounters, climactic moments  
**Completion Time:** ~3.5 minutes per attempt  
**Complexity:** High  
**Best For:** Desktop, hardcore players

**Planned Features:**
- Intel gathering phase
- Equipment selection
- Complex multi-stage extraction
- Live validation maintenance
- Detailed performance breakdown

---

## Testing Guidelines

### What to Evaluate

1. **Engagement**
   - Does it feel fun or tedious?
   - Are mechanics clear without instructions?
   - Does difficulty feel fair?

2. **Pacing**
   - Is it too fast or too slow?
   - Does any phase drag?
   - Would you replay this?

3. **Mobile vs Desktop**
   - Touch targets adequate?
   - Sliders easy to use?
   - Rhythm tapping responsive?

4. **Scoring**
   - Does the score reflect your performance?
   - Are thresholds too strict or too lenient?
   - Clear what caused success/failure?

### Feedback Template

```
Version Tested: V1 Streamlined
Device: [Mobile/Desktop/Tablet]
Completion Time: [X minutes]
Score: [X/100]

Engagement: [1-5 stars]
Pacing: [Too Fast / Perfect / Too Slow]
Difficulty: [Too Easy / Perfect / Too Hard]

What worked well:
-

What needs improvement:
-

Would you play this again? [Yes/No]
```

---

## Development Roadmap

- [x] V1 Streamlined prototype
- [ ] V1 Mobile testing and refinement
- [ ] V2 Standard prototype
- [ ] V2 Subject archetype system
- [ ] V2 Extraction variety implementation
- [ ] V3 Advanced features design
- [ ] Integration with main game
- [ ] Bio-lock variant
- [ ] Multiplayer modes (if applicable)

---

## Technical Notes

### File Structure
```
prototypes/
├── biosig_v1_streamlined.html    # Self-contained V1 prototype
├── biosig_v2_standard.html       # V2 prototype (coming)
├── assets/                        # Shared assets (future)
│   ├── sounds/
│   └── sprites/
└── README.md                      # This file
```

### Dependencies
- None! All prototypes are standalone HTML files
- No build process required
- Works in modern browsers (Chrome, Firefox, Safari, Edge)

### Browser Support
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## Integration Notes

When ready to integrate into main game:

1. Extract core logic from prototypes
2. Create modular `biosig-engine.js`
3. Implement archetype system
4. Add game state persistence
5. Connect to reward/progression systems

---

For full design documentation, see `../BIOSIG_CHALLENGE_DESIGN.md`
