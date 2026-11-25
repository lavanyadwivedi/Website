import { animate, hover, inView, press, scroll, stagger } from "motion"

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
if (!reduce) document.documentElement.classList.add("anim")

const $ = (s, root = document) => root.querySelector(s)
const $$ = (s, root = document) => [...root.querySelectorAll(s)]

const spring = { type: "spring", bounce: 0.2, visualDuration: 0.6 }
const snappy = { type: "spring", bounce: 0.25, visualDuration: 0.35 }
const instant = { duration: 0 }

// ---------- Content ----------
const T = [
    { f: "work", now: 1, t: "Freelance social media strategist", o: "Hear It Clinic", w: "Jun 2025 – present", b: ["Built the clinic's full content calendar and run it end to end, from strategy to posting.", "Fixed low online visibility with targeted campaigns that brought in more patient enquiries.", "Built strong client relationships and secured 30+ testimonials that boosted the clinic's reputation."] },
    { f: "work", now: 1, t: "Freelance content & engagement", o: "Elevate Career Labs", w: "May 2025 – present", b: ["Ran interactive reels, polls and trend-led content that generated 1,540 leads in just 2 weeks.", "Made the brand's messaging consistent, lifting engagement by 35% and strengthening its online presence."] },
    { f: "work", t: "International Business Executive (intern)", o: "Livepixel Technologies", w: "Jun – Jul 2025", b: ["Researched markets and ran outreach to support global expansion in Meta, XR and immersive tech.", "Worked with the projects team to build relationships and keep communication smooth with international clients."] },
    { f: "work", t: "Social Media Strategist (intern)", o: "Go Minimalism", w: "May 2024 – Jul 2025", b: ["Researched the audience in depth to shape content that won 115 clients through organic content alone.", "Produced reels from concept to edit, reaching 5.9M+ people and growing brand visibility across platforms."] },
    { f: "lead", t: "Founder", o: "Timeless Thrifty", w: "own business", b: ["Launched an online store selling affordable pre-owned branded clothing across India.", "Made quality fashion accessible while promoting sustainable shopping, generating ₹40k in revenue."] },
    { f: "lead", t: "Social media member", o: "Google Developer Student Club, Amity", w: "student club", b: ["Designed posters and digital assets for tech events and workshops, boosting visibility and turnout.", "Helped coordinate workshops and outreach, and contributed to content."] },
    { f: "lead", t: "Photographer (volunteer)", o: "Nilkhanth Youth Empowerment NGO", w: "volunteer", b: ["Photographed on-site activities to tell the NGO's story in its social media campaigns."] },
    { f: "edu", now: 1, t: "Bachelor of Business Administration", o: "Amity University Mumbai", w: "2023 – 2026", b: ["CGPA 8.02.", "Courses: brand management, international marketing and marketing management."] },
    { f: "edu", t: "Higher Secondary Certificate, Commerce", o: "Ryan International School, Mumbai", w: "2021 – 2023", b: ["Scored 79.2%."] },
    { f: "edu", t: "Secondary School Certificate", o: "Ryan International School, Mumbai", w: "2010 – 2021", b: ["Scored 88.01%."] },
]
const tagName = { work: "work", lead: "leadership", edu: "education" }

const C = [
    { k: "reels & organic growth", n: "5.9M+", g: "linear-gradient(150deg,#c9a467,#6f5426)", t: "Go Minimalism", d: "Growing a lifestyle brand without paid ads.", c: "The brand needed more reach and clients without a paid budget.", a: "Researched the audience, then planned and produced reels from concept to edit.", r: "5.9M+ reach and 115 clients won through organic content." },
    { k: "lead generation", n: "1,540", g: "linear-gradient(150deg,#7c8650,#2f3820)", t: "Elevate Career Labs", d: "Turning engagement into sign-ups for a career platform.", c: "Inconsistent messaging and engagement that wasn't turning into leads.", a: "Interactive reels, polls and trend-led content, plus brand-aligned messaging.", r: "1,540 leads in 2 weeks and +35% engagement." },
    { k: "healthcare social", n: "30+", g: "linear-gradient(150deg,#a3a37a,#4b5733)", t: "Hear It Clinic", d: "Helping a hearing clinic get found online.", c: "Low online visibility and few patient enquiries.", a: "A full content calendar and targeted campaigns, run end to end.", r: "More patient enquiries and 30+ client testimonials." },
    { k: "founder · e-commerce", n: "₹40k", g: "linear-gradient(150deg,#b9895a,#5a3e22)", t: "Timeless Thrifty", d: "My own sustainable fashion store.", c: "Branded fashion is too expensive for many young shoppers.", a: "Launched an online store for affordable pre-owned branded clothing across India.", r: "₹40k in revenue and a brand built from zero." },
    { k: "global expansion", n: "XR", g: "linear-gradient(150deg,#5c6a3a,#1f2615)", t: "Livepixel Technologies", d: "Market research for immersive tech abroad.", c: "Finding international opportunities in Meta, XR and immersive tech.", a: "Market research, outreach and strategy support, working with the projects team.", r: "Stronger relationships and smoother communication with international clients." },
]

const S = [
    { h: "strategy", m: ["Social media strategy", "Content calendars & planning", "Audience & market research", "Brand management"] },
    { h: "creation", m: ["Reels, concept to edit", "Trend-led & interactive content", "Posters & digital assets", "Photography & storytelling"] },
    { h: "growth", m: ["Organic growth", "Lead generation", "Engagement tactics", "Google Analytics"] },
    { h: "people", m: ["Client relationships", "International outreach", "Event & workshop coordination", "Running my own business"] },
]
const K = [
    ["Digital Marketing", "Accenture"],
    ["Google Analytics", "Google"],
    ["Forward Program", "McKinsey & Company"],
    ["Small Business Marketing", "LinkedIn Learning"],
]
const seal =
    '<svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true"><circle cx="17" cy="15" r="11" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 15l3.5 3.5L22 12" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M11 24l-2 8 8-3 8 3-2-8" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>'

const F = [
    { t: "trend remix", c: "A trending audio with a brand twist.", goal: "reach", g: "linear-gradient(165deg,#c9a467,#6f5426)" },
    { t: "poll & quiz", c: "Interactive stories that turn views into leads.", goal: "leads", g: "linear-gradient(165deg,#7c8650,#2f3820)" },
    { t: "myth vs fact", c: "Carousels that build trust and get saved.", goal: "trust", g: "linear-gradient(165deg,#a3a37a,#4b5733)" },
    { t: "behind the scenes", c: "Real people and process, unpolished on purpose.", goal: "trust", g: "linear-gradient(165deg,#5c6a3a,#1f2615)" },
    { t: "haul & try-on", c: "The product in real life, ready to buy.", goal: "sales", g: "linear-gradient(165deg,#b9895a,#5a3e22)" },
    { t: "tips in 15s", c: "Quick value that earns the follow.", goal: "reach", g: "linear-gradient(165deg,#8d9660,#4b5733)" },
]

// ---------- Render ----------
$("#phones").innerHTML = F.map(
    (x) =>
        `<article class="phone" style="background:${x.g}"><div class="ph-top"><span class="av">ld</span>lavanya</div><div class="side" aria-hidden="true"><span>♥</span><span>✎</span><span>➤</span></div><div class="txt"><span class="goal">goal: ${x.goal}</span><div class="big">${x.t}</div><div class="cap">${x.c}</div></div></article>`
).join("")
const tl = $("#tl")
tl.innerHTML = T.map(
    (x, i) =>
        `<article class="item${x.now ? " now" : ""}${i === 0 ? " open" : ""}" data-f="${x.f}"><button aria-expanded="${i === 0}" aria-controls="m${i}"><h3>${x.t}</h3><span class="plus" aria-hidden="true">+</span><span class="org">${x.o} · <span class="when">${x.w}</span></span><span class="tg">${tagName[x.f]}</span></button><div class="more" id="m${i}"><ul>${x.b.map((l) => `<li>${l}</li>`).join("")}</ul></div></article>`
).join("")

const track = $("#track")
track.innerHTML = C.map(
    (x) =>
        `<article class="case"><div class="cover" style="background:${x.g}"><i>${x.k}</i><b>${x.n}</b></div><div class="body"><h3>${x.t}</h3><p>${x.d}</p><dl><dt>challenge</dt><dd>${x.c}</dd><dt>what i did</dt><dd>${x.a}</dd><dt>result</dt><dd>${x.r}</dd></dl></div></article>`
).join("")

$("#skillgrid").innerHTML = S.map(
    (s) => `<div class="sk"><h3>${s.h}</h3><div class="chips">${s.m.map((m) => `<span class="chip">${m}</span>`).join("")}</div></div>`
).join("")

$("#certs").innerHTML = K.map(
    (k) => `<div class="cert">${seal}<div><b>${k[0]}</b><div style="font-size:14px;color:var(--soft)">${k[1]}</div></div></div>`
).join("")

// Split headings into letters
for (const el of $$(".split")) {
    const text = el.textContent
    el.setAttribute("aria-label", text)
    el.innerHTML = [...text].map((c) => `<span class="ch" aria-hidden="true">${c}</span>`).join("")
}

// ---------- Counters ----------
function format(el, v) {
    const d = Number(el.dataset.dec || 0)
    const s = el.dataset.sep ? Math.round(v).toLocaleString("en-IN") : v.toFixed(d)
    el.textContent = (el.dataset.pre || "") + s + (el.dataset.suf || "")
}
function count(el, delay = 0) {
    const end = Number(el.dataset.count)
    if (reduce) return format(el, end)
    animate(0, end, { duration: 1.6, delay, ease: "circOut", onUpdate: (v) => format(el, v) })
}

// ---------- Scroll progress ----------
scroll(animate(".progress", { scaleX: [0, 1] }, { ease: "linear" }))

// ---------- Hero ----------
const reels = $$(".reel")
const reelRotate = [-6, 0, 6]

if (!reduce) {
    animate(".hero .split .ch", { opacity: [0, 1], y: ["0.5em", "0em"], rotate: [8, 0] }, { delay: stagger(0.05, { startDelay: 0.15 }), ...spring })
    animate(".hero .up", { opacity: [0, 1], y: [18, 0] }, { delay: stagger(0.09, { startDelay: 0.05 }), duration: 0.7, ease: "easeOut" })
    reels.forEach((r, i) => {
        animate(
            r,
            { opacity: [0, 1], y: [120, 0], rotate: [reelRotate[i] * 3, reelRotate[i]] },
            { ...spring, bounce: 0.3, delay: 0.35 + [0.12, 0, 0.24][i] }
        )
    })

    // Fan the reels out on hover
    hover(".reels", () => {
        animate(reels[0], { x: -24, rotate: -11 }, snappy)
        animate(reels[1], { y: -12, scale: 1.04 }, snappy)
        animate(reels[2], { x: 24, rotate: 11 }, snappy)
        return () => {
            animate(reels[0], { x: 0, rotate: -6 }, snappy)
            animate(reels[1], { y: 0, scale: 1 }, snappy)
            animate(reels[2], { x: 0, rotate: 6 }, snappy)
        }
    })

    // Gentle parallax as the hero scrolls away
    const heroTarget = { target: $(".hero-band"), offset: ["start start", "end start"] }
    scroll(animate(".reels", { y: [0, 90] }, { ease: "linear" }), heroTarget)
    scroll(animate(".intro", { y: [0, 40], opacity: [1, 0.3] }, { ease: "linear" }), heroTarget)
}
reels.forEach((r, i) => $(".n", r) && count($(".n", r), reduce ? 0 : 0.6 + i * 0.12))

// ---------- Generic reveals ----------
inView(
    ".reveal",
    (el) => {
        animate(el, { opacity: [0, 1], y: [28, 0] }, spring)
    },
    { amount: 0.2 }
)

inView(
    ".stats",
    (grid) => {
        const cells = $$(".stat", grid)
        if (!reduce) animate(cells, { opacity: [0, 1], y: [20, 0] }, { delay: stagger(0.06), ...spring })
        cells.forEach((c, i) => count($("b", c), reduce ? 0 : i * 0.06))
    },
    { amount: 0.3 }
)

inView(".contact .split", (h) => {
    if (reduce) return
    animate($$(".ch", h), { opacity: [0, 1], y: ["0.4em", "0em"] }, { delay: stagger(0.04), ...spring })
})

// ---------- Timeline ----------
const items = $$(".item", tl)
let firstTimelineReveal = true
inView(
    tl,
    () => {
        if (reduce || !firstTimelineReveal) return
        firstTimelineReveal = false
        animate(
            items.filter((it) => !it.classList.contains("hide")),
            { opacity: [0, 1], x: [-16, 0] },
            { delay: stagger(0.05), ...spring }
        )
    },
    { amount: 0.1 }
)
if (!reduce) {
    scroll((p) => tl.style.setProperty("--tl", p), { target: tl, offset: ["start 85%", "end 70%"] })
}

tl.addEventListener("click", (e) => {
    const btn = e.target.closest(".item button")
    if (!btn) return
    const item = btn.parentElement
    const more = $(".more", item)
    const plus = $(".plus", item)
    const open = !item.classList.contains("open")
    btn.setAttribute("aria-expanded", String(open))

    if (reduce) return void item.classList.toggle("open", open)

    if (open) {
        item.classList.add("open")
        const h = more.scrollHeight
        animate(plus, { rotate: 45 }, snappy)
        animate(more, { height: [0, h] }, { type: "spring", bounce: 0, visualDuration: 0.3 }).then(() => {
            if (item.classList.contains("open")) more.style.height = ""
        })
        animate($$("li", more), { opacity: [0, 1], y: [8, 0] }, { delay: stagger(0.04, { startDelay: 0.05 }), duration: 0.25 })
    } else {
        const h = more.offsetHeight
        animate(plus, { rotate: 0 }, snappy)
        item.classList.remove("open")
        animate(more, { height: [h, 0] }, { type: "spring", bounce: 0, visualDuration: 0.25 }).then(() => {
            if (!item.classList.contains("open")) more.style.height = ""
        })
    }
})
$$(".item.open .plus").forEach((p) => animate(p, { rotate: 45 }, instant))

// Filters with sliding pill
const filterButtons = $$(".filters button")
const fpill = $(".fpill")
function placeFilterPill(btn, opts = snappy) {
    animate(fpill, { x: btn.offsetLeft, y: btn.offsetTop, width: btn.offsetWidth }, reduce ? instant : opts)
}
filterButtons.forEach((btn) =>
    btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)))
        placeFilterPill(btn)
        const f = btn.dataset.f
        const show = []
        for (const it of items) {
            const visible = f === "all" || it.dataset.f === f
            if (visible && it.classList.contains("hide")) show.push(it)
            it.classList.toggle("hide", !visible)
        }
        const visibleItems = items.filter((it) => !it.classList.contains("hide"))
        if (!reduce) {
            animate(visibleItems, { opacity: [0, 1], y: [14, 0] }, { delay: stagger(0.04), ...snappy })
        } else {
            visibleItems.forEach((it) => (it.style.opacity = 1))
        }
    })
)

// ---------- Work ----------
const cases = $$(".case", track)
inView(
    track,
    () => {
        if (reduce) return
        animate(cases, { opacity: [0, 1], x: [60, 0] }, { delay: stagger(0.08), ...spring })
    },
    { amount: 0.2 }
)
const step = (d) => track.scrollBy({ left: d * (cases[0].offsetWidth + 18), behavior: reduce ? "auto" : "smooth" })
$("#prev").onclick = () => step(-1)
$("#next").onclick = () => step(1)
track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") (e.preventDefault(), step(1))
    if (e.key === "ArrowLeft") (e.preventDefault(), step(-1))
})

// ---------- Skills & certs ----------
inView(
    "#skillgrid",
    (grid) => {
        if (reduce) return
        const cards = $$(".sk", grid)
        animate(cards, { opacity: [0, 1], y: [30, 0] }, { delay: stagger(0.08), ...spring })
        cards.forEach((card, i) =>
            animate($$(".chip", card), { opacity: [0, 1], scale: [0.85, 1] }, { delay: stagger(0.05, { startDelay: 0.25 + i * 0.08 }), ...snappy })
        )
    },
    { amount: 0.2 }
)
inView(
    "#certs",
    (grid) => {
        if (reduce) return
        animate($$(".cert", grid), { opacity: [0, 1], y: [16, 0] }, { delay: stagger(0.07), ...spring })
    },
    { amount: 0.3 }
)

// ---------- Services, process, formats ----------
inView(
    ".svcs",
    (grid) => {
        if (reduce) return
        animate($$(".svc", grid), { opacity: [0, 1], y: [40, 0] }, { delay: stagger(0.08), ...spring })
        animate($$(".svc .num", grid), { x: [-14, 0] }, { delay: stagger(0.08, { startDelay: 0.2 }), ...snappy })
    },
    { amount: 0.15 }
)

inView(
    ".process",
    (el) => {
        if (reduce) return
        animate($$(".step", el), { opacity: [0, 1], y: [24, 0] }, { delay: stagger(0.15), ...spring })
        animate($$(".dotn", el), { scale: [0.4, 1] }, { delay: stagger(0.15), type: "spring", bounce: 0.5, visualDuration: 0.5 })
        animate($(".pline i", el), { scaleX: [0, 1] }, { duration: 1.1, ease: "easeInOut", delay: 0.1 })
    },
    { amount: 0.4 }
)

inView(
    "#phones",
    (grid) => {
        if (reduce) return
        $$(".phone", grid).forEach((ph, i) =>
            animate(ph, { opacity: [0, 1], y: [60, 0], rotate: [i % 2 ? 4 : -4, 0] }, { ...spring, delay: i * 0.07 })
        )
    },
    { amount: 0.15 }
)

// ---------- Hover & press feedback ----------
if (!reduce) {
    hover(".case, .sk, .item", (el) => {
        animate(el, { y: -4 }, snappy)
        const big = $(".cover b", el)
        if (big) animate(big, { scale: 1.08 }, snappy)
        return () => {
            animate(el, { y: 0 }, snappy)
            if (big) animate(big, { scale: 1 }, snappy)
        }
    })
    hover(".svc", (el) => {
        animate(el, { y: -6 }, snappy)
        return () => animate(el, { y: 0 }, snappy)
    })
    hover(".phone", (el) => {
        animate(el, { y: -10, rotate: -1.5, scale: 1.03 }, snappy)
        return () => animate(el, { y: 0, rotate: 0, scale: 1 }, snappy)
    })
    hover(".chip", (el) => {
        animate(el, { y: -2 }, snappy)
        return () => animate(el, { y: 0 }, snappy)
    })
    press(".btn, .arrows button, .filters button", (el) => {
        animate(el, { scale: 0.94 }, { type: "spring", bounce: 0, visualDuration: 0.12 })
        return () => animate(el, { scale: 1 }, { type: "spring", bounce: 0.45, visualDuration: 0.3 })
    })
}

// ---------- Nav: active section pill ----------
const links = $$("nav .links a")
const navPill = $("nav .pill")
let activeLink = null
function moveNavPill(link) {
    if (link === activeLink) return
    const first = activeLink === null
    activeLink = link
    if (!link) return void animate(navPill, { opacity: 0 }, { duration: 0.2 })
    animate(
        navPill,
        { x: link.offsetLeft, y: link.offsetTop, width: link.offsetWidth, height: link.offsetHeight, opacity: 1 },
        reduce || first ? instant : snappy
    )
}
for (const link of links) {
    const section = $(link.getAttribute("href"))
    inView(
        section,
        () => {
            moveNavPill(link)
            return () => activeLink === link && moveNavPill(null)
        },
        { margin: "-45% 0px -45% 0px" }
    )
}

window.addEventListener("resize", () => {
    placeFilterPill($('.filters button[aria-pressed="true"]'), instant)
    if (activeLink) {
        const l = activeLink
        activeLink = null
        moveNavPill(l)
    }
})
placeFilterPill(filterButtons[0], instant)

// ---------- Copy email ----------
const cp = $("#copy")
cp.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText("lavanyadwivedi0612@gmail.com")
        cp.textContent = "copied ✓"
    } catch {
        cp.textContent = "select the email below"
    }
    setTimeout(() => (cp.textContent = "copy email"), 2200)
})
