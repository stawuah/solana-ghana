# Solana Ghana Website — Build & Extend Skill
**For:** Developers extending the Solana Ghana community website

---

## Adding a New Page

1. Create a new function component: `function NewPage({ setPage }) { ... }`
2. Add it to the pages object in App: `{ ..., newpage: NewPage }`
3. Add it to the PAGES nav array: `{ id:'newpage', label:'New Page' }`
4. Follow the section pattern: `<div style={{ paddingTop:88 }}>` → `<section>` → `<Ghost word="KEYWORD" />` → `<W>` → content

**Always use the W wrapper** for page content (maxWidth 1080, padding 36px).

---

## Design Tokens (copy this object)

```js
const C = {
  bg: '#07070C', surface: '#0D0D16', card: '#11111C',
  gold: '#FCD116', goldFaint: 'rgba(252,209,22,0.05)',
  green: '#006B3F', red: '#CE1126',
  solG: '#14F195', solP: '#9945FF',
  white: '#FFFFFF', muted: '#5A5A7A', mutedLight: '#8888A8',
  border: 'rgba(255,255,255,0.055)', borderGold: 'rgba(252,209,22,0.14)',
};
const FD = "'Space Grotesk', sans-serif";
const FB = "'Inter', sans-serif";
```

---

## Shared Components

### Eyebrow label
```jsx
<Eyebrow label="Section Label" color={C.gold} />
```
Use at the start of every section. Color defaults to C.gold.

### Tag / badge
```jsx
<Tag label="Live · Devnet" color={C.solG} />
```
Always uppercase inside the component. Use for status, categories.

### Ghost watermark
```jsx
<Ghost word="KEYWORD" size={175} />
```
Place inside a `position:'relative', overflow:'hidden'` section. Word should match section theme.

### Stadium card (40px radius)
```jsx
<div style={{ background:C.card, borderRadius:40, border:`1px solid ${C.border}`, overflow:'hidden' }}>
```

### Section card (smaller radius)
```jsx
<div style={{ background:C.card, borderRadius:26, padding:24, border:`1px solid ${C.border}` }}>
```

### Orbital arc SVG
```jsx
<svg aria-hidden style={{ position:'absolute', top:'38%', left:'8%', width:'84%', height:36, overflow:'visible', pointerEvents:'none', zIndex:0 }}>
  <path d="M 0 18 Q 160 -18 320 18 Q 480 54 640 18" stroke={C.gold} strokeWidth="0.75" fill="none" opacity="0.2"/>
</svg>
```
Place inside a `position:'relative'` container with team/portrait circles.

### Team portrait circle
```jsx
<div style={{ width:84, height:84, borderRadius:'50%', border:`2px solid ${C.gold}55`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:FD, fontSize:20, fontWeight:700, color:C.gold, background:C.card }}>
  KA
</div>
```

---

## Typography Scale

| Role | Size | Weight | Family | Tracking |
|---|---|---|---|---|
| Hero H1 | clamp(64px,12vw,108px) | 900 | FD | -0.045em |
| Section H2 | clamp(34px,5vw,54px) | 800 | FD | -0.04em |
| Card H3 | 24px | 700 | FD | -0.03em |
| Eyebrow | 10px | 700 | FD | +0.12em (uppercase) |
| Body | 14–15px | 400 | FB | normal |
| Tags | 9.5px | 600 | FD | +0.05em (uppercase) |

---

## Grid Patterns

| Layout | CSS |
|---|---|
| Two-column equal | `gridTemplateColumns:'1fr 1fr'` |
| Two-column asymmetric | `gridTemplateColumns:'1.15fr 1fr'` |
| Three-column | `gridTemplateColumns:'repeat(3, 1fr)'` |
| Four-column curriculum | `gridTemplateColumns:'repeat(4, 1fr)'` |
| Four-column footer | `gridTemplateColumns:'2fr 1fr 1fr 1fr'` |

Standard gap: 12–14px (cards), 36–40px (major sections), 60px (two-column content).

---

## Adding a Project Card

```jsx
<div style={{ background:C.card, borderRadius:40, border:`1px solid ${C.border}`, overflow:'hidden', display:'grid', gridTemplateColumns:'1.15fr 1fr' }}>
  <div style={{ padding:40 }}>
    <div style={{ display:'flex', gap:7, marginBottom:16 }}>
      <Tag label="Status" color={C.solG} />
    </div>
    {/* Project logo + name */}
    <div style={{ display:'flex', alignItems:'center', gap:11, marginBottom:16 }}>
      <div style={{ width:44, height:44, borderRadius:13, background:`linear-gradient(135deg, ${C.solP}, ${C.solG})` }} />
      <div>
        <div style={{ fontFamily:FD, fontWeight:800, color:C.white, fontSize:20 }}>Project Name</div>
        <div style={{ color:C.muted, fontSize:10.5, fontFamily:FB }}>project-url.com</div>
      </div>
    </div>
    {/* Description, tags, CTA */}
  </div>
  <div style={{ background:`linear-gradient(135deg, ${C.solP}11, ${C.solG}08)`, borderLeft:`1px solid ${C.border}`, padding:34 }}>
    {/* Stats/details column */}
  </div>
</div>
```

---

## Adding an Event Card

```jsx
<div style={{ background:C.card, borderRadius:26, padding:30, border:`1px solid ${C.border}`, display:'grid', gridTemplateColumns:'1fr auto', gap:24 }}>
  <div>
    <div style={{ display:'flex', gap:7, marginBottom:12 }}>
      <Tag label="Tag" color={C.gold} />
      <Tag label="Date" color={C.muted} />
    </div>
    <div style={{ fontFamily:FD, fontWeight:700, color:C.white, fontSize:17 }}>Event Name</div>
    <p style={{ color:C.mutedLight, fontSize:12.5, fontFamily:FB, lineHeight:1.7 }}>Description</p>
  </div>
  <div style={{ minWidth:180 }}>
    <div style={{ color:C.muted, fontSize:10, fontFamily:FD, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:9 }}>Outcomes</div>
    {outcomes.map(o => <div key={o}>...</div>)}
  </div>
</div>
```

---

## Content Rules

1. **No placeholder stats.** Every number must come from the founding document or real measurement.
2. **"Akwaaba" = Welcome** in Twi. Use culturally specific language where appropriate.
3. **Honest framing always.** If something isn't done yet, say so (opacity:0.52, dashed border).
4. **ChainPay link is real:** `https://chainpay-frontend.onrender.com` — keep it live.
5. **Security section disclaimer:** "Zero projects promoted without completing the security checklist" — this is a commitment, not marketing.
6. **Ghost text words:** HOME/AKWAABA, LEARN, BUILD, SECURE, EVENTS, COMMUNITY — one per page section.