import { animate, hover, inView, press, scroll, stagger } from "motion"

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
const spring = { type: "spring", bounce: 0.2, visualDuration: 0.5 }

document.documentElement.classList.add("js")

// Hero entrance
if (!reduced) {
    animate(
        ".hero-title .word",
        { opacity: [0, 1], y: [40, 0], filter: ["blur(8px)", "blur(0px)"] },
        { delay: stagger(0.08, { startDelay: 0.1 }), ...spring }
    )
    animate(
        ".hero .reveal",
        { opacity: [0, 1], y: [20, 0] },
        { delay: stagger(0.1, { startDelay: 0.45 }), duration: 0.6, ease: "easeOut" }
    )
} else {
    document.querySelectorAll(".hero-title .word, .hero .reveal").forEach((el) => {
        el.style.opacity = 1
    })
}

// Scroll progress bar
scroll(animate(".progress", { scaleX: [0, 1] }, { ease: "linear" }))

// Hero parallax
if (!reduced) {
    const hero = document.querySelector(".hero")
    const target = { target: hero, offset: ["start start", "end start"] }
    scroll(animate(".orb-a", { y: [0, 160] }, { ease: "linear" }), target)
    scroll(animate(".orb-b", { y: [0, -120] }, { ease: "linear" }), target)
    scroll(animate(".hero-card", { rotateX: [0, 12], scale: [1, 0.94] }, { ease: "linear" }), target)
}

// Generic in-view reveal
inView(
    ".in-view",
    (el) => {
        if (reduced) return void (el.style.opacity = 1)
        animate(el, { opacity: [0, 1], y: [30, 0] }, spring)
    },
    { amount: 0.3 }
)

// Feature cards stagger
inView(
    ".features",
    (grid) => {
        const cards = grid.querySelectorAll(".card")
        if (reduced) return void cards.forEach((c) => (c.style.opacity = 1))
        animate(cards, { opacity: [0, 1], y: [40, 0], scale: [0.96, 1] }, { delay: stagger(0.07), ...spring })
    },
    { amount: 0.2 }
)

inView(
    ".pricing",
    (grid) => {
        const cards = grid.querySelectorAll(".card")
        if (reduced) return void cards.forEach((c) => (c.style.opacity = 1))
        animate(cards, { opacity: [0, 1], y: [40, 0] }, { delay: stagger(0.1), ...spring })
    },
    { amount: 0.2 }
)

// Count-up stats
const format = (n, decimals) =>
    n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

inView(".stat strong", (el) => {
    const to = Number(el.dataset.count)
    const decimals = Number(el.dataset.decimals || 0)
    const suffix = el.dataset.suffix || ""
    if (reduced) return void (el.textContent = format(to, decimals) + suffix)
    animate(0, to, {
        duration: 1.6,
        ease: "circOut",
        onUpdate: (v) => (el.textContent = format(v, decimals) + suffix),
    })
})

// Buttons & cards: hover and press feedback
hover(".btn, .card", (el) => {
    animate(el, { y: -3 }, { type: "spring", bounce: 0.3, visualDuration: 0.25 })
    return () => animate(el, { y: 0 }, { type: "spring", bounce: 0.3, visualDuration: 0.25 })
})

press(".btn, .toggle button", (el) => {
    animate(el, { scale: 0.95 }, { type: "spring", bounce: 0, visualDuration: 0.15 })
    return () => animate(el, { scale: 1 }, { type: "spring", bounce: 0.4, visualDuration: 0.3 })
})

// Pricing toggle
const toggle = document.querySelector(".toggle")
const pill = toggle.querySelector(".toggle-pill")
const buttons = toggle.querySelectorAll("button")

function placePill(btn, instant) {
    const opts = instant || reduced ? { duration: 0 } : { type: "spring", bounce: 0.25, visualDuration: 0.35 }
    animate(pill, { x: btn.offsetLeft - 4, width: btn.offsetWidth }, opts)
}

function setPeriod(btn) {
    const period = btn.dataset.period
    buttons.forEach((b) => b.setAttribute("aria-checked", String(b === btn)))
    placePill(btn)
    document.querySelectorAll(".price span").forEach((el) => {
        const from = Number(el.textContent.replace(/\D/g, ""))
        const to = Number(el.dataset[period])
        if (reduced) return void (el.textContent = `$${to}`)
        animate(from, to, {
            duration: 0.4,
            ease: "easeOut",
            onUpdate: (v) => (el.textContent = `$${Math.round(v)}`),
        })
    })
}

buttons.forEach((b) => b.addEventListener("click", () => setPeriod(b)))
placePill(buttons[0], true)
window.addEventListener("resize", () => placePill(toggle.querySelector('[aria-checked="true"]'), true))

// Nav background on scroll
const nav = document.querySelector(".nav")
scroll((p) => nav.classList.toggle("scrolled", p > 0.01))
