"""Generates assets/img/hero-axon.svg — the animated axonometric model on the
home page hero. Edit LEVELS / HW / HH / CHW / CHH below to change the geometry,
then run:  python3 tools/gen-hero-axon.py
The SVG it writes is self-contained (all motion is CSS inside the file) and can
also be hand-edited directly; this script just keeps the coordinates exact.
"""
import math
import os

CX, HW, HH = 450.0, 290.0, 168.0
LEVELS = [560.0, 475.0, 390.0, 305.0, 220.0]   # bottom -> top
FRACS  = [0.25, 0.5, 0.75]
EDGE   = math.hypot(HW, HH)                    # length of one plate side
CHW, CHH = 72.0, 42.0                          # core rhombus half sizes

def n(v):
    s = f"{v:.1f}"
    return s[:-2] if s.endswith(".0") else s

def plate(c, hw=HW, hh=HH):
    return (f"M{n(CX)} {n(c+hh)} L{n(CX+hw)} {n(c)} "
            f"L{n(CX)} {n(c-hh)} L{n(CX-hw)} {n(c)} Z")

def joists(c):
    """Grid lines on a plate: parallel to both edge directions."""
    out = []
    for t in FRACS:                            # parallel to u = (HW,-HH)
        sx, sy = CX-HW + t*HW, c + t*HH
        out.append((sx, sy, sx+HW, sy-HH))
    for s in FRACS:                            # parallel to v = (HW, HH)
        sx, sy = CX-HW + s*HW, c - s*HH
        out.append((sx, sy, sx+HW, sy+HH))
    return out

css, body = [], []

# ------------------------------------------------------------------ defs ----
defs = f'''  <defs>
    <linearGradient id="gPlate" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F2F1ED" stop-opacity=".62"/>
      <stop offset="55%" stop-color="#9FC4FF" stop-opacity=".34"/>
      <stop offset="100%" stop-color="#F2F1ED" stop-opacity=".10"/>
    </linearGradient>
    <linearGradient id="gEdge" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#7FB2FF" stop-opacity=".95"/>
      <stop offset="100%" stop-color="#1669E5" stop-opacity=".22"/>
    </linearGradient>
    <linearGradient id="gFill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4E92FF" stop-opacity=".16"/>
      <stop offset="100%" stop-color="#1669E5" stop-opacity=".02"/>
    </linearGradient>
    <linearGradient id="gCol" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4E92FF" stop-opacity=".08"/>
      <stop offset="45%" stop-color="#8FBCFF" stop-opacity=".55"/>
      <stop offset="100%" stop-color="#4E92FF" stop-opacity=".08"/>
    </linearGradient>
    <radialGradient id="gPool" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#4E92FF" stop-opacity=".40"/>
      <stop offset="100%" stop-color="#4E92FF" stop-opacity="0"/>
    </radialGradient>
    <filter id="fGlow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="5" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="fSoft" x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="9"/>
    </filter>
  </defs>'''

# --------------------------------------------------------------- base pool --
body.append(f'  <ellipse class="pool" cx="{n(CX)}" cy="{n(LEVELS[0]+34)}" rx="322" ry="74" fill="url(#gPool)"/>')

# ----------------------------------------------------------- ground radar ---
body.append('  <g class="radar" stroke="#4E92FF" fill="none" stroke-width="1.2">')
for i in range(3):
    body.append(f'    <path class="ring r{i}" d="{plate(LEVELS[0], HW*1.06, HH*1.06)}"/>')
body.append('  </g>')
css.append("""
.pool{ animation: poolBreathe 7s ease-in-out infinite; }
@keyframes poolBreathe{ 0%,100%{ opacity:.55 } 50%{ opacity:1 } }
.radar .ring{ transform-box:fill-box; transform-origin:center; opacity:0;
  animation: ringOut 6s cubic-bezier(.25,.6,.3,1) infinite; }
.radar .r1{ animation-delay:2s } .radar .r2{ animation-delay:4s }
@keyframes ringOut{
  0%{ transform:scale(.18); opacity:0 }
  12%{ opacity:.5 }
  100%{ transform:scale(1.1); opacity:0 }
}""")

# -------------------------------------------------------------- the stack ---
body.append('  <g class="stack">')

# vertical structure: outer vertices, two interior columns, front/back edges
cols = []
ytop, ybot = LEVELS[-1], LEVELS[0]
for x in (CX-HW, CX-145, CX+145, CX+HW):
    cols.append((x, ybot, x, ytop))
cols.append((CX, ybot+HH, CX, ytop+HH))       # front silhouette edge
cols.append((CX, ybot-HH, CX, ytop-HH))       # back silhouette edge
body.append('  <g class="cols" stroke="url(#gCol)" stroke-width="1.3" fill="none">')
for i, (x1, y1, x2, y2) in enumerate(cols):
    L = abs(y1-y2)
    body.append(f'    <line class="col c{i}" x1="{n(x1)}" y1="{n(y1)}" x2="{n(x2)}" y2="{n(y2)}"/>')
    css.append(f'.col.c{i}{{ stroke-dasharray:{n(L)}; animation: draw{i}col 1.1s var(--e) {0.25+i*0.08:.2f}s both }}'
               f'@keyframes draw{i}col{{ from{{ stroke-dashoffset:{n(L)} }} to{{ stroke-dashoffset:0 }} }}')
body.append('  </g>')

# core shaft edges
body.append('  <g class="core" stroke="#4E92FF" stroke-width="1.1" fill="none" opacity=".5">')
for x in (CX-CHW, CX+CHW):
    body.append(f'    <line x1="{n(x)}" y1="{n(ybot)}" x2="{n(x)}" y2="{n(ytop)}"/>')
body.append('  </g>')

# floor plates, top of file order = bottom first so upper levels overlay
for i, c in enumerate(LEVELS):
    is_base, is_top = i == 0, i == len(LEVELS)-1
    body.append(f'    <g class="lvl l{i}">')
    body.append(f'      <path d="{plate(c)}" fill="url(#gFill)" opacity="{".55" if (is_base or is_top) else ".3"}"/>')
    body.append(f'      <path class="edge" d="{plate(c)}" fill="none" stroke="url(#gPlate)" '
                f'stroke-width="{1.6 if (is_base or is_top) else 1.1}" stroke-linejoin="round"/>')
    # joists: full grid on base + top, half grid elsewhere
    js = joists(c) if (is_base or is_top) else joists(c)[1::3]
    body.append(f'      <g class="joists" stroke="url(#gEdge)" stroke-width="{1.2 if is_base else .9}" '
                f'opacity="{".9" if is_base else ".5"}">')
    for x1, y1, x2, y2 in js:
        body.append(f'        <line x1="{n(x1)}" y1="{n(y1)}" x2="{n(x2)}" y2="{n(y2)}"/>')
    body.append('      </g>')
    # core footprint
    body.append(f'      <path d="{plate(c, CHW, CHH)}" fill="#4E92FF" fill-opacity=".10" '
                f'stroke="#7FB2FF" stroke-opacity=".45" stroke-width="1"/>')
    # corner nodes
    body.append('      <g class="nodes">')
    for (nx, ny) in ((CX, c+HH), (CX+HW, c), (CX, c-HH), (CX-HW, c)):
        body.append(f'        <circle class="halo" cx="{n(nx)}" cy="{n(ny)}" r="7" fill="#4E92FF" fill-opacity=".18"/>')
        body.append(f'        <circle cx="{n(nx)}" cy="{n(ny)}" r="3.2" fill="#8FBCFF"/>')
    body.append('      </g>')
    body.append('    </g>')
    css.append(f'.lvl.l{i}{{ animation: rise 1.15s var(--e) {i*0.14:.2f}s both }}')
    css.append(f'.l{i} .edge{{ stroke-dasharray:{n(EDGE*4)}; animation: drawEdge 1.5s var(--e) {0.1+i*0.14:.2f}s both }}')
    css.append(f'.l{i} .joists line{{ stroke-dasharray:{n(EDGE)}; animation: drawJoist 1.3s var(--e) {0.5+i*0.14:.2f}s both }}')

css.append("""
.stack{ animation: bob 9s ease-in-out infinite; }
@keyframes bob{ 0%,100%{ transform:translateY(-5px) } 50%{ transform:translateY(7px) } }
@keyframes rise{ from{ opacity:0; transform:translateY(54px) } to{ opacity:1; transform:translateY(0) } }
@keyframes drawEdge{ from{ stroke-dashoffset:var(--o, 1341) } to{ stroke-dashoffset:0 } }
@keyframes drawJoist{ from{ stroke-dashoffset:336; opacity:0 } 40%{ opacity:1 } to{ stroke-dashoffset:0; opacity:1 } }
.halo{ transform-box:fill-box; transform-origin:center; animation: halo 3.4s ease-in-out infinite; }
.nodes .halo:nth-of-type(3){ animation-delay:.9s } .nodes .halo:nth-of-type(5){ animation-delay:1.8s }
.nodes .halo:nth-of-type(7){ animation-delay:2.6s }
@keyframes halo{ 0%,100%{ transform:scale(.7); opacity:.25 } 50%{ transform:scale(1.5); opacity:.9 } }""")
for i, c in enumerate(LEVELS):
    css.append(f'.l{i} .edge{{ --o:{n(EDGE*4)} }}')

# ------------------------------------------------------------ scan planes ---
for k, delay in enumerate((0.0, 2.6)):
    body.append(f'    <g class="scan s{k}" style="animation-delay:{1.4+delay:.2f}s">')
    body.append(f'      <path d="{plate(LEVELS[0])}" fill="#4E92FF" fill-opacity=".07" '
                f'stroke="#BBD7FF" stroke-width="1.6" filter="url(#fGlow)"/>')
    body.append('    </g>')
travel = LEVELS[0] - LEVELS[-1] + 40
css.append(f"""
.scan{{ animation: scanUp 5.2s linear infinite; }}
@keyframes scanUp{{
  0%{{ transform:translateY(24px); opacity:0 }}
  10%{{ opacity:.95 }}
  85%{{ opacity:.35 }}
  100%{{ transform:translateY(-{n(travel)}px); opacity:0 }}
}}""")

# ------------------------------------------------------------ core pulses ---
body.append('    <g class="pulses" filter="url(#fGlow)">')
for k in range(2):
    body.append(f'      <circle class="pulse p{k}" cx="{n(CX)}" cy="{n(LEVELS[0])}" r="4.4" fill="#DCEBFF"/>')
body.append('    </g>')
css.append(f"""
.pulse{{ animation: coreUp 3.2s cubic-bezier(.4,0,.5,1) infinite; }}
.pulse.p1{{ animation-delay:1.6s }}
@keyframes coreUp{{
  0%{{ transform:translateY(0); opacity:0 }}
  12%{{ opacity:1 }}
  88%{{ opacity:1 }}
  100%{{ transform:translateY(-{n(LEVELS[0]-LEVELS[-1])}px); opacity:0 }}
}}""")

# ---------------------------------------------------------- data packets ----
packets = []
# (level, index into the full joist list) — mid levels only draw indices 1 and 4
for lvl, idx in ((0, 0), (0, 4), (0, 5), (4, 2), (4, 3), (2, 1), (1, 4), (3, 1)):
    x1, y1, x2, y2 = joists(LEVELS[lvl])[idx]
    packets.append((x1, y1, x2-x1, y2-y1))
body.append('    <g class="packets" filter="url(#fGlow)">')
for i, (x, y, dx, dy) in enumerate(packets):
    body.append(f'      <circle class="pk k{i}" cx="{n(x)}" cy="{n(y)}" r="3" fill="#EAF2FF"/>')
    css.append(f'.pk.k{i}{{ animation: pk{i} {3.6+i*0.55:.2f}s linear {0.9+i*0.7:.2f}s infinite }}'
               f'@keyframes pk{i}{{ 0%{{ transform:translate(0,0); opacity:0 }} 12%{{ opacity:1 }} '
               f'80%{{ opacity:1 }} 100%{{ transform:translate({n(dx)}px,{n(dy)}px); opacity:0 }} }}')
body.append('    </g>')

body.append('  </g>')  # /stack

# ------------------------------------------------------------- datum lines --
body.append(f'''  <g class="datum" stroke="#4E92FF" fill="none" stroke-width="1">
    <path class="march" d="M40 {n(LEVELS[0]+HH+18)} L860 {n(LEVELS[0]+HH+18)}" stroke-dasharray="5 7" opacity=".5"/>
    <path class="march m2" d="M124 {n(LEVELS[-1]-HH+6)} L124 {n(LEVELS[0]+HH+18)}" stroke-dasharray="5 7" opacity=".3"/>
  </g>
  <g class="ticks" stroke="#8FBCFF" stroke-width="1.2" opacity=".55">''')
for i, c in enumerate(LEVELS):
    body.append(f'    <line class="tk t{i}" x1="112" y1="{n(c)}" x2="136" y2="{n(c)}"/>')
body.append('  </g>')
css.append("""
.march{ animation: march 2.4s linear infinite; }
.march.m2{ animation-duration:3.4s }
@keyframes march{ to{ stroke-dashoffset:-24 } }
.tk{ animation: tick 1s var(--e) both; }""")
for i in range(len(LEVELS)):
    css.append(f'.tk.t{i}{{ animation-delay:{0.7+i*0.14:.2f}s }}')
css.append('@keyframes tick{ from{ opacity:0; transform:translateX(-14px) } to{ opacity:1; transform:none } }')

style = ("  <style>\n    :root{ --e:cubic-bezier(.22,.61,.36,1); }\n"
         "    *{ transform-box:view-box; }\n    "
         + "\n    ".join("\n".join(css).strip().splitlines())
         + "\n    @media (prefers-reduced-motion:reduce){\n"
         "      *{ animation:none !important }\n"
         "      .scan,.packets,.pulses,.radar{ display:none }\n"
         "    }\n  </style>")

svg = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 760" fill="none" '
       'aria-hidden="true" preserveAspectRatio="xMidYMid meet">\n'
       + defs + "\n" + style + "\n" + "\n".join(body) + "\n</svg>\n")

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                   "assets", "img", "hero-axon.svg")
open(OUT, "w").write(svg)
print("wrote", OUT)
print("bytes:", len(svg))
