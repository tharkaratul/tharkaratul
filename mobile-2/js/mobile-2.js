/* =====================================================================
   mobile-2.js  —  Full Kali-style terminal + skills scanner + reveals
   Ported from portfolio-from-svg/index.html. Touch-first, no Enter key.
   ===================================================================== */

"use strict";

const DATA = window.PORTFOLIO || {};
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* ─── DOM refs ─────────────────────────────────────────────────────── */
const terminalCard    = $("#touch-terminal");
const terminalOutput  = $("#terminal-output");
const commandSlot     = $("#terminal-command-slot");
const terminalHint    = $("#terminal-hint");
const kaliDisplay     = $("#terminal-kali-display");
const kaliTypingEl    = $("#terminal-kali-typing");
const termMatrix      = $("#terminal-matrix");
const scannerResults  = $("#scanner-results");

/* ─── Helpers ──────────────────────────────────────────────────────── */
const labSleep = (ms) => new Promise((r) => setTimeout(r, ms));

const escHtml = (v = "") =>
  String(v)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const scrollTerm = () => {
  if (!terminalOutput) return;
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
};

const appendLine = (text, cls = "") => {
  const d = document.createElement("div");
  d.className = `terminal-line${cls ? " " + cls : ""}`;
  d.textContent = text;
  terminalOutput?.appendChild(d);
  scrollTerm();
  return d;
};

const appendBlock = (text, cls = "") => {
  const pre = document.createElement("pre");
  pre.className = `terminal-block${cls ? " " + cls : ""}`;
  pre.textContent = text;
  terminalOutput?.appendChild(pre);
  scrollTerm();
  return pre;
};

const appendDivider = () => appendLine("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "terminal-divider");

const promptHtml = (cmd) =>
  `<div class="terminal-line"><span class="prompt-top">` +
  `┌──(<span class="prompt-user">atul㉿atul</span>)-[~]</span>\n` +
  `└─$ <span class="terminal-command">${escHtml(cmd)}</span></div>`;

/* type text char-by-char into a new line element */
const typeLine = async (text, cls = "", speed = 12) => {
  const el = document.createElement("div");
  el.className = `terminal-line${cls ? " " + cls : ""}`;
  terminalOutput?.appendChild(el);
  for (const ch of text) {
    el.textContent += ch;
    scrollTerm();
    await labSleep(speed);
  }
  scrollTerm();
  return el;
};

/* type text char-by-char into the Kali prompt typing span */
const typeKaliCommand = async (text, element, speed = 30) => {
  if (!element) return;
  element.textContent = "";
  for (let i = 0; i < text.length; i++) {
    element.textContent += text[i];
    await labSleep(speed);
  }
};

/* ─── Randomisation helpers ────────────────────────────────────────── */
const rndFrom  = (arr) => arr[Math.floor(Math.random() * arr.length)];
const rndInt   = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const buildIp  = () => [rndInt(23,223),rndInt(11,252),rndInt(7,249),rndInt(3,244)].join(".");
const buildDate= (offset = 0) => {
  const d = new Date(Date.UTC(2026, rndInt(0,11), rndInt(1,28), rndInt(0,23), rndInt(0,59), rndInt(0,59)));
  d.setUTCDate(d.getUTCDate() + offset);
  return d.toUTCString();
};

const geoProfiles = [
  { country:"Germany",       code:"DE", region:"Bavaria",       city:"Munich",    lat:"48.1351", lon:"11.5820" },
  { country:"Singapore",     code:"SG", region:"Central Region",city:"Singapore", lat:"1.3521",  lon:"103.8198"},
  { country:"United States", code:"US", region:"Virginia",      city:"Ashburn",   lat:"39.0438", lon:"-77.4874"},
  { country:"Netherlands",   code:"NL", region:"North Holland", city:"Amsterdam", lat:"52.3676", lon:"4.9041" },
  { country:"India",         code:"IN", region:"Maharashtra",   city:"Mumbai",    lat:"19.0760", lon:"72.8777" },
];
const hostingCos   = ["Cloudflare Inc.","Amazon Data Services","DigitalOcean LLC","Akamai International","Hetzner Online GmbH"];
const sslIssuers   = ["Let's Encrypt","DigiCert TLS RSA SHA256","Sectigo RSA Domain Validation","GlobalSign Secure Server CA","Google Trust Services"];
const scanPayloads = ["?","\\x27UNION SELECT","../","//*","' OR '1'='1","../../../etc/passwd","<script>alert(1)<\\/script>","${7*7}"];
const crawlerPaths = [
  "/blog/red-team-notes","/products/api/v1/status","/assets/js/dashboard.js",
  "/login?redirect=%2Fadmin","/careers/security-analyst","/docs/exposure-checklist",
  "/api/internal/heartbeat","/admin/backup-2026.zip","/reports/q2-findings",
  "/support/ticket/incident-response",
];

const LAB_COMMANDS = [
  "help", "whoami", "skills", "projects", "social",
  "clear", "lookup", "scanner", "crawler", "matrix",
  "location","age","college","sudo",
];

/* ─── Simulations (exact copies from portfolio-from-svg) ───────────── */
const showLabBanner = async () => {
  appendDivider();
  await typeLine("Interactive Cyber Lab Loaded", "terminal-success", 12);
  await typeLine("Tap a command below to run it", "terminal-accent", 12);
  appendDivider();
  appendLine("Available Commands:", "terminal-muted");
};

const runLabLookupSimulation = async (target) => {
  const ip   = buildIp();
  const geo  = rndFrom(geoProfiles);
  const issuer = rndFrom(sslIssuers);
  const host   = rndFrom(hostingCos);
  const vFrom  = buildDate(0);
  const vUntil = buildDate(rndInt(60,120));

  await labSleep(220);
  await typeLine("You Only Got 500 Chances To Search ...!!!!!", "terminal-warning", 12);
  await typeLine(`Resolving target: ${target}`,               "terminal-accent",  12);
  await typeLine("IP Geolocation Result",                     "terminal-success", 12);
  await typeLine("-----------------------------------------------------", "terminal-divider", 2);

  for (const line of [
    `IP Address : ${ip}`,
    `Country    : ${geo.country}`,
    `Country Code: ${geo.code}`,
    `State/Region: ${geo.region}`,
    `City       : ${geo.city}`,
    "-----------------------------------------------------",
    `Latitude :- ${geo.lat}`,
    `Longitude :- ${geo.lon}`,
    `Hosting Company :- ${host}`,
    `Issuer Name: ${issuer}`,
    "-----------------------------------------------------",
    `Valid from: ${vFrom}`,
    `Valid until: ${vUntil}`,
  ]) {
    await typeLine(line, line.includes("----") ? "terminal-divider" : "terminal-muted", 8);
    await labSleep(60);
  }
};

const runLabScannerSimulation = async (filePath) => {
  if (filePath) await typeLine(`Loaded payload file: ${filePath}`, "terminal-accent", 12);
  let notFound = 0;
  for (let r = 0; r < rndInt(4,6); r++) {
    const payload = rndFrom(scanPayloads);
    const code    = rndFrom([200,200,200,302,403,500,404]);
    if (code === 404) notFound++;
    await typeLine("Loading....", "terminal-muted", 10);
    await labSleep(180);
    await typeLine(`status_code - ${code} | Payload - ${payload}`, code >= 400 ? "terminal-warning" : "terminal-success", 8);
    await typeLine(`Response from page | - <Response [${code}]>`,  code >= 400 ? "terminal-error"   : "terminal-muted",   8);
    await labSleep(140);
  }
  await typeLine(`Total 404 Status Code are ${notFound}`, "terminal-accent", 12);
};

const runLabCrawlerSimulation = async () => {
  await typeLine("Creating project Task", "terminal-accent", 12);
  await typeLine("| Status_code | URL |",          "terminal-divider", 8);
  await typeLine("| 200 | https://target.com |",   "terminal-success",  8);
  for (const n of [2,3,4]) {
    await typeLine(`Active Crawlers ${n}`, "terminal-warning", 10);
    await labSleep(120);
  }
  await typeLine(`${rndInt(57,93)} links in the queue`, "terminal-accent", 10);
  for (let i = 0; i < 12; i++) {
    const path  = rndFrom(crawlerPaths);
    const proto = Math.random() > 0.22 ? "https" : "http";
    const code  = rndFrom([200,200,200,301,302,403]);
    await typeLine(`[${code}] ${proto}://target.com${path}`, code >= 400 ? "terminal-warning" : "terminal-muted", 8);
    await labSleep(110);
  }
};

const activateMatrixEffect = () => {
  if (!termMatrix) return;
  termMatrix.innerHTML = "";
  for (let i = 0; i < 8; i++) {
    const col = document.createElement("pre");
    col.className = "terminal-matrix-column";
    col.style.animationDelay = `${i * 0.12}s`;
    col.textContent = Array.from({length:26}, () => rndFrom(["0","1","7","A","F","#","$","%"])).join("\n");
    termMatrix.appendChild(col);
  }
  termMatrix.classList.add("is-active");
  setTimeout(() => termMatrix.classList.remove("is-active"), 2200);
};

/* ─── Command map ──────────────────────────────────────────────────── */
const commandHandlers = {
  help:    async () => showLabBanner(),
  ls:      async () => typeLine("about.txt  certs/  projects/  recon/  social.json  tools/", "terminal-muted", 8),
  whoami:  async () => {
    await typeLine("Cyber Security Enthusiast | Problem Solver", "terminal-success", 12);
    await typeLine("Focused on building cybersecurity projects, exploring new security techniques, and continuously learning emerging technologies in cybersecurity and network security.", "terminal-muted", 8);
  },
  skills:  async () => appendBlock(
    "Recon      : Nmap, Burp Suite, Wireshark, OWASP ZAP\nDetection  : Splunk, MITRE ATT&CK, Kill Chain\nScripting  : Python, Bash, Linux shell scripting\nSystems    : Kali Linux, Windows",
    "terminal-muted"
  ),
  projects: async () => {
    appendDivider();
    await typeLine("[1] IP Geolocation Lookup Tool",     "terminal-success", 10);
    await typeLine("Command: lookup",                     "terminal-accent",  10);
    await typeLine("",                                    "terminal-muted",    2);
    await typeLine("[2] Vulnerability Scanner",           "terminal-success", 10);
    await typeLine("Command: scanner",                    "terminal-accent",  10);
    await typeLine("",                                    "terminal-muted",    2);
    await typeLine("[3] Web Crawler",                     "terminal-success", 10);
    await typeLine("Command: crawler",                    "terminal-accent",  10);
    await typeLine("",                                    "terminal-muted",    2);
    await typeLine("[4] Splunk Dashboard",                     "terminal-success", 10);
    appendDivider();
  },
  social: async () => appendBlock(
    "GitHub   : https://github.com/tharkaratul\nLinkedIn : https://www.linkedin.com/in/atul-tharkar-20501b254/",
    "terminal-muted"
  ),
  clear: async () => {
    if (terminalOutput) terminalOutput.innerHTML = "";
    // busy=false is set by executeCommand after this returns, so palette
    // will be re-rendered with enabled buttons automatically
  },
  neofetch: async () => appendBlock(
    "       .-,      visitor@portfolio\n      /  ))     -----------------\n     /  //      OS: Kali Linux Portfolio Edition\n    /  //       Host: Cyber Lab Workstation\n   /  //        Kernel: 6.11.0-redteam\n  /  //         Shell: zsh 5.9\n /  //          WM: Hacker Console\n/.-'           Uptime: 1337 minutes",
    "terminal-muted"
  ),
  lookup: async () => {
    await typeLine("python index.py", "terminal-command", 12);
    await typeLine("Enter Website Name Or IP Address :", "terminal-warning", 10);
    terminalOutput?.insertAdjacentHTML("beforeend", promptHtml("example.com"));
    await runLabLookupSimulation("example.com");
  },
  scanner: async () => {
    await typeLine("python scanner.py -t https://target.com -s", "terminal-command", 12);
    await typeLine("If no file is selected, then the default payloads will be executed", "terminal-warning", 10);
    await typeLine("Enter the file path -", "terminal-warning", 10);
    terminalOutput?.insertAdjacentHTML("beforeend", promptHtml("[default]"));
    await runLabScannerSimulation("");
  },
  crawler: async () => {
    await typeLine("python scanner.py -t https://target.com -c", "terminal-command", 12);
    await runLabCrawlerSimulation();
  },
  matrix: async () => {
    activateMatrixEffect();
    await typeLine("Matrix overlay engaged. Signal stream stabilized.", "terminal-accent", 10);
  },
  sudo: async () => {
    await typeLine("[sudo] password for visitor:", "terminal-warning", 12);
    await labSleep(360);
    await typeLine("ACCESS DENIED", "terminal-error", 12);
  },
  location: async () => {
    await typeLine("Kothrud, Pune, Maharashtra", "terminal-success", 12);
  },
  age: async () => {
    await typeLine("22 Years", "terminal-success", 12);
  },
  college: async () => {
    await typeLine("MIT ADT Loni Kalbhor, Pune", "terminal-success", 12);
  },
};

/* ─── Terminal state machine ───────────────────────────────────────── */
const termState = {
  phase: "intro",    // "intro" | "banner" | "command"
  busy:  false,
  introStep: 0,
};

function bindCommandButton(btn, cmd) {
  const run = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (termState.busy || btn.disabled) return;
    executeCommand(cmd);
  };
  btn.addEventListener("click", run);
}

function renderCommandPalette() {
  const host = commandSlot || terminalCard || terminalOutput;
  if (!host) return;

  host.innerHTML = "";

  const menu = document.createElement("div");
  menu.className = "terminal-menu";
  menu.id = "terminal-command-menu";
  menu.setAttribute("role", "toolbar");
  menu.setAttribute("aria-label", "Run a terminal command");

  LAB_COMMANDS.forEach((cmd) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "terminal-menu__btn";
    btn.textContent = cmd;
    btn.dataset.command = cmd;
    btn.setAttribute("aria-label", `Run ${cmd}`);
    btn.disabled = termState.busy;
    bindCommandButton(btn, cmd);
    menu.appendChild(btn);
  });

  // Block the terminal card tap handler from swallowing command taps
  const stopCardTap = (e) => e.stopPropagation();
  menu.addEventListener("pointerdown", stopCardTap);
  menu.addEventListener("click", stopCardTap);
  menu.addEventListener("touchend", stopCardTap, { passive: true });

  host.appendChild(menu);
  requestAnimationFrame(() => menu.scrollIntoView({ block: "nearest", behavior: "smooth" }));
  scrollTerm();
}

function updateCommandPaletteState() {
  const menu = $("#terminal-command-menu");
  if (!menu) return;
  menu.querySelectorAll("button").forEach((btn) => { btn.disabled = termState.busy; });
}

function setHint(text) {
  if (!terminalHint) return;
  terminalHint.textContent = text;
  terminalHint.hidden = !text;
}

/* intro steps — three stages before the banner */
const introSteps = [
  { cmd: "whoami",       output: DATA.person.headline,             cls: "terminal-success" },
  { cmd: "cat summary.txt", output: DATA.person.bio,              cls: "terminal-muted"   },
  { cmd: "python interact.py", output: null /* triggers banner */ },
];

async function runIntroStep() {
  if (termState.busy) return;
  const step = introSteps[termState.introStep];
  if (!step) return;

  termState.busy = true;
  setHint("Loading…");

  /* show kali prompt with the command */
  terminalOutput?.insertAdjacentHTML("beforeend", promptHtml(step.cmd));

  if (step.output) {
    await typeLine(step.output, step.cls, 10);
    termState.introStep++;
    termState.busy = false;

    if (termState.introStep < introSteps.length) {
      setHint("Tap to continue");
    } else {
      setHint("Tap to continue");
    }
  } else {
    /* last intro step — show kali typing display then auto-advance to banner */
    if (kaliDisplay) {
      kaliDisplay.hidden = false;
      terminalOutput?.appendChild(kaliDisplay);
      scrollTerm();
    }
    await typeKaliCommand("python interact.py", kaliTypingEl);
    await labSleep(400);

    /* type the hint text onto the prompt */
    const hint = " -- tap terminal to continue";
    for (const ch of hint) {
      if (kaliTypingEl) kaliTypingEl.textContent += ch;
      await labSleep(18);
    }
    if (kaliTypingEl) kaliTypingEl.classList.add("typing-hint");

    termState.introStep++;
    termState.phase = "banner";
    termState.busy  = false;
    setHint("Tap to launch cyber lab ↑");
  }
}

async function runBannerAndOpenCmd() {
  if (termState.busy) return;
  termState.busy = true;
  if (kaliTypingEl) kaliTypingEl.classList.add("typing-complete");
  setHint("Loading…");
  await labSleep(5);
  termState.phase = "command";
  await showLabBanner();
  // busy=false BEFORE renderCommandPalette — buttons must be enabled when created
  termState.busy = false;
  renderCommandPalette();
  setHint("Tap a command to run it");
  if (terminalCard) terminalCard.style.cursor = "default";
}

async function executeCommand(raw) {
  const cmd = raw.trim().toLowerCase();
  if (!cmd || termState.busy || termState.phase !== "command") return;

  terminalOutput?.insertAdjacentHTML("beforeend", promptHtml(cmd));
  termState.busy = true;
  updateCommandPaletteState();
  setHint("Executing…");
  await labSleep(80);

  try {
    const handler = commandHandlers[cmd];
    if (handler) {
      await handler();
    } else {
      await typeLine(`command not found: ${cmd}`, "terminal-error", 10);
    }
  } finally {
    termState.busy = false;
    renderCommandPalette();
    setHint("Tap a command to run it");
    scrollTerm();
  }
}

/* ─── Touch/tap handler ────────────────────────────────────────────── */
function onTerminalTap(e) {
  // Ignore clicks that originated on a command button — handled by delegated listener
  if (e.target.closest("button[data-command]")) return;
  if (e.target.closest(".terminal-menu")) return;

  switch (termState.phase) {
    case "intro":
      runIntroStep();
      break;
    case "banner":
      runBannerAndOpenCmd();
      break;
  }
}

/* ─── Skills scanner with count-up animation ───────────────────────── */
function renderSkills(view = "technical") {
  const el = scannerResults || $("#scanner-results");
  if (!el) return;

  const skillsData = DATA.skills || {};
  // Support both "nonTechnical" and "non-technical" key spellings from tabs
  const normalised = view === "non-technical" ? "nonTechnical" : view;
  const groups = skillsData[normalised] || skillsData.technical || [];

  if (!groups.length) {
    el.innerHTML = '<p style="color:#666;padding:12px">No skills data available.</p>';
    return;
  }

  el.innerHTML = groups.map((group) => `
    <div class="skill-group">
      <h3>${escHtml(group.title)} Detected !!!</h3>
      ${(group.items || []).map((item) => `
        <div class="skill-row">
          <span>&gt; ${escHtml(item.label)}</span>
          <div class="bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
            <span class="bar-fill" style="width:0%" data-target="${item.value}"></span>
          </div>
          <b class="skill-pct" data-target="${item.value}">0%</b>
        </div>`).join("")}
    </div>`).join("");

  /* animate bars + counters */
  requestAnimationFrame(() => animateScannerBars(el));

  /* iOS Safari fallback: if CSS animation didn't fire, force groups visible */
  setTimeout(() => {
    $$(".skill-group", el).forEach((g) => {
      g.style.opacity = "1";
      g.style.transform = "translateY(0)";
    });
  }, 900);
}

function animateScannerBars(container) {
  const root  = container || scannerResults || document;
  const fills = $$(".bar-fill", root);
  const pcts  = $$(".skill-pct", root);

  fills.forEach((fill, i) => {
    const target  = Number(fill.dataset.target) || 0;
    const pctEl   = pcts[i];
    let current   = 0;
    const tick = () => {
      current = Math.min(current + 2, target);
      fill.style.width = `${current}%`;
      if (pctEl) pctEl.textContent = `${current}%`;
      if (current < target) setTimeout(tick, 22);
    };
    setTimeout(tick, 60 + i * 30);
  });
}

function initSkillTabs() {
  $$("[data-skill-view]").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$("[data-skill-view]").forEach((t) => t.classList.remove("is-active"));
      btn.classList.add("is-active");
      /* scanner sweep animation */
      if (scannerResults) {
        scannerResults.classList.add("scanner-sweep");
        setTimeout(() => {
          scannerResults.classList.remove("scanner-sweep");
          renderSkills(btn.dataset.skillView);
        }, 320);
      } else {
        renderSkills(btn.dataset.skillView);
      }
    });
  });
}

/* ─── Scroll reveal via IntersectionObserver ───────────────────────── */
function initReveal() {
  const nodes = $$("[data-reveal]");
  if (!nodes.length) return;

  const revealChildren = (parent) => {
    $$("[data-reveal-child]", parent).forEach((child, i) => {
      child.style.setProperty("--reveal-delay", `${i * 70}ms`);
      child.classList.add("is-visible");
    });
  };

  const markVisible = (el) => {
    if (el.classList.contains("is-visible")) return;
    el.classList.add("is-visible");
    revealChildren(el);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      markVisible(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.01, rootMargin: "0px 0px 0px 0px" });

  nodes.forEach((n) => observer.observe(n));

  const rescan = () => {
    nodes.forEach((n) => {
      const rect = n.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 8) markVisible(n);
    });
  };
  requestAnimationFrame(rescan);
  window.addEventListener("scroll", rescan, { passive: true });
  window.addEventListener("resize", rescan, { passive: true });
  setTimeout(rescan, 400);
}

const getProjectScreenshots = (project) => {
  if (Array.isArray(project.screenshots) && project.screenshots.length) return project.screenshots;
  if (project.screenshot) return [project.screenshot];
  return [];
};

const buildProjectGallery = (shots, title) => {
  if (!shots.length) {
    return `<div class="project-card__shot project-card__shot--placeholder" aria-hidden="true">
      <span>screenshot</span>
    </div>`;
  }

  const single = shots.length === 1;
  const slides = shots.map((src, i) => `
    <button type="button" class="project-card__gallery-slide"
            data-shot-src="${escHtml(src)}"
            data-shot-title="${escHtml(title)}"
            aria-label="Open screenshot ${i + 1} of ${shots.length}">
      <img src="${escHtml(src)}" alt="${escHtml(title)} screenshot ${i + 1}" loading="lazy" />
      <span class="project-card__scanline" aria-hidden="true"></span>
    </button>`).join("");

  return `
    <div class="project-card__gallery${single ? " is-single" : ""}" data-gallery data-index="0">
      <div class="project-card__gallery-track">${slides}</div>
      <button type="button" class="project-card__gallery-nav project-card__gallery-nav--prev" aria-label="Previous screenshot">&#8249;</button>
      <button type="button" class="project-card__gallery-nav project-card__gallery-nav--next" aria-label="Next screenshot">&#8250;</button>
      <span class="project-card__gallery-count">1 / ${shots.length}</span>
    </div>`;
};

/* ─── Matrix background for terminal card ─────────────────────────── */
function initMatrixBg() {
  if (!termMatrix) return;
  for (let i = 0; i < 8; i++) {
    const col = document.createElement("pre");
    col.className = "terminal-matrix-column";
    col.style.animationDelay = `${i * 0.18}s`;
    col.textContent = Array.from({length:30}, () => rndFrom(["0","1","A","F","#","$"])).join("\n");
    termMatrix.appendChild(col);
  }
}

/* ─── Data renderers (unchanged from original) ─────────────────────── */
function renderProjects() {
  const grid = $("#project-grid");
  if (!grid) return;
  const visible = DATA.projects;
  grid.innerHTML = visible.map((p, i) => {
    const title = p.title.replace("IP Location Look-Up", "IP Look-Up");
    const gallery = buildProjectGallery(getProjectScreenshots(p), title);
    const link = p.url
      ? `<a class="project-card__link" href="${escHtml(p.url)}" target="_blank" rel="noreferrer">View on GitHub →</a>`
      : "";
    return `
    <article class="project-card" data-reveal-child style="--reveal-delay:${i * 90}ms">
      <h3>${escHtml(title)}</h3>
      ${gallery}
      <div class="project-card__body">
        <p>${escHtml(p.description)}</p>
        ${link}
      </div>
    </article>`;
  }).join("");

  initProjectGalleries();
}

function renderCertificates() {
  const list = $("#cert-list");
  if (!list) return;

  // Show all 8 certs in the exact order from the main portfolio
  const order = [
    "Cisco Certified Support Technician",
    "Ethical Hacking - LearnkartS",
    "Ethical Hacking with Kali Linux",
    "Networking Basics",
    "Cyber Threat Management",
    "Foundations of Cybersecurity",
    "Introduction to SIEM",
    "Hands-on Introduction",
  ];

  const allCerts = (DATA.certificates || []);
  const sorted = order
    .map((n) => allCerts.find((c) => c.title.includes(n)))
    .filter(Boolean);

  // Add any certs not matched by the order list at the end
  allCerts.forEach((c) => {
    if (!sorted.includes(c)) sorted.push(c);
  });

  list.innerHTML = sorted.map((c, i) => `
    <li class="cert-item" data-reveal-child style="--reveal-delay:${i * 55}ms">
      <a href="${escHtml(c.pdf)}"
         data-cert-pdf="${escHtml(c.pdf)}"
         data-cert-title="${escHtml(c.title)}"
         rel="noreferrer">
        · ${escHtml(c.title)}
      </a>
    </li>`).join("");
}

/* ─── Certificate preview overlay ─────────────────────────────────── */
function initCertPreview() {
  const overlay   = $("#cert-preview-overlay");
  const iframe    = $("#cert-preview-iframe");
  const backBtn   = $("#cert-preview-back");
  const titleEl   = $("#cert-preview-title");
  const certList  = $("#cert-list");
  if (!overlay || !iframe || !backBtn) return;

  const openPreview = (pdfSrc, title) => {
    // #view=FitH fits the page to viewport width — fixes half-visible PDF on narrow mobile screens
    // Strip any existing fragment first, then append our params
    const base = pdfSrc.includes("#") ? pdfSrc.split("#")[0] : pdfSrc;
    const src  = base + "#toolbar=0&navpanes=0&view=FitH";
    iframe.src = src;
    if (titleEl) titleEl.textContent = title || "";
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    // Prevent background scroll while overlay is open
    document.body.style.overflow = "hidden";
    // Focus back button for accessibility
    requestAnimationFrame(() => backBtn.focus({ preventScroll: true }));
  };

  const closePreview = () => {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    // Clear src after transition so no background load
    setTimeout(() => { iframe.src = ""; }, 400);
  };

  // Intercept taps on cert links
  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-cert-pdf]");
    if (!link) return;
    e.preventDefault();
    openPreview(link.dataset.certPdf, link.dataset.certTitle);
  });

  // Back button
  backBtn.addEventListener("click", closePreview);
  backBtn.addEventListener("touchend", (e) => { e.preventDefault(); closePreview(); }, { passive: false });

  // Swipe down to close (touch gesture)
  let touchStartY = 0;
  overlay.addEventListener("touchstart", (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  overlay.addEventListener("touchend", (e) => {
    const delta = e.changedTouches[0].clientY - touchStartY;
    // Only close if swipe starts at very top (topbar area) and goes down 60px+
    if (touchStartY < 80 && delta > 60) closePreview();
  }, { passive: true });

  // Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) closePreview();
  });
}

function initProjectGalleries() {
  $$("[data-gallery]").forEach((gallery) => {
    const track = $(".project-card__gallery-track", gallery);
    const slides = $$(".project-card__gallery-slide", gallery);
    const prev = $(".project-card__gallery-nav--prev", gallery);
    const next = $(".project-card__gallery-nav--next", gallery);
    const counter = $(".project-card__gallery-count", gallery);
    if (!track || slides.length < 1) return;

    let index = 0;
    let touchX = 0;

    const update = () => {
      track.style.transform = `translateX(-${index * 100}%)`;
      if (counter) counter.textContent = `${index + 1} / ${slides.length}`;
      gallery.dataset.index = String(index);
    };

    const go = (dir) => {
      index = (index + dir + slides.length) % slides.length;
      update();
    };

    prev?.addEventListener("click", (e) => { e.stopPropagation(); go(-1); });
    next?.addEventListener("click", (e) => { e.stopPropagation(); go(1); });

    gallery.addEventListener("touchstart", (e) => {
      touchX = e.touches[0].clientX;
    }, { passive: true });

    gallery.addEventListener("touchend", (e) => {
      if (slides.length < 2) return;
      const delta = e.changedTouches[0].clientX - touchX;
      if (Math.abs(delta) < 40) return;
      go(delta < 0 ? 1 : -1);
    }, { passive: true });

    update();
  });
}

function initShotPreview() {
  const overlay = $("#shot-preview-overlay");
  const img = $("#shot-preview-img");
  const titleEl = $("#shot-preview-title");
  const backBtn = $("#shot-preview-back");
  if (!overlay || !img || !backBtn) return;

  const open = (src, title) => {
    img.src = src;
    img.alt = title || "Project screenshot";
    if (titleEl) titleEl.textContent = title || "";
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    backBtn.focus({ preventScroll: true });
  };

  const close = () => {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    img.removeAttribute("src");
  };

  document.addEventListener("click", (e) => {
    const slide = e.target.closest(".project-card__gallery-slide");
    if (!slide) return;
    e.preventDefault();
    e.stopPropagation();
    open(slide.dataset.shotSrc, slide.dataset.shotTitle);
  });

  backBtn.addEventListener("click", close);
  backBtn.addEventListener("touchend", (e) => { e.preventDefault(); close(); }, { passive: false });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay || e.target.classList.contains("shot-preview-body")) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) close();
  });
}

function renderAchievements() {
  const list = $("#achievement-list");
  if (!list) return;
  list.innerHTML = DATA.achievements.map((a, i) => `<li data-reveal-child style="--reveal-delay:${i * 70}ms">· ${escHtml(a.lead)}<small>${escHtml(a.detail)}</small></li>`).join("");
}

function renderExperience() {
  const list = $("#experience-list");
  if (!list) return;

  const experiences = DATA.experience || [];
  if (!experiences.length) {
    list.innerHTML = `<li class="experience-card experience-card--empty">No experience entries loaded.</li>`;
    return;
  }

  list.innerHTML = experiences.map((exp) => `
    <li class="experience-card">
      <div class="experience-card__top">
        <h3 class="experience-card__role">${escHtml(exp.role)}</h3>
        <div class="experience-card__meta">
          <span class="experience-card__company">${escHtml(exp.company)}</span>
          <span class="experience-card__sep" aria-hidden="true">|</span>
          <span class="experience-card__location">${escHtml(exp.location)}</span>
        </div>
        <span class="experience-card__period">${escHtml(exp.period)}</span>
      </div>
      <ul class="experience-card__highlights">
        ${exp.highlights.map((item) => `<li>${escHtml(item)}</li>`).join("")}
      </ul>
    </li>`).join("");
}

function renderContact() {
  const ph = $("#phone-link");  if (ph) { ph.href = DATA.social.whatsapp.url; ph.textContent = DATA.social.whatsapp.display; }
  const em = $("#email-link");  if (em) { em.href = DATA.social.email.url; em.textContent = DATA.social.email.display; }
  const gh = $("#github-link"); if (gh) { gh.href = DATA.social.github.url; gh.textContent = DATA.social.github.url.replace("https://", ""); }
  const gf = $("#google-form-link"); if (gf) gf.href = DATA.social.googleForm?.url || gf.href;
  const ghAscii = $("#github-ascii-link");
  if (ghAscii) ghAscii.href = DATA.social.github.url;
}

/* ─── Resume bubble (from main portfolio) ──────────────────────────── */
function initResumeBubble() {
  const resumeBubble = $("#resume-bubble");
  const resumeBubbleText = $(".rbl-label", resumeBubble || document);
  const resumeBubbleRipple = $("#rbl-ripple");
  const resumeTerminalPopup = $("#resume-terminal-popup");
  if (!resumeBubble || !resumeBubbleText) return;

  const circuitCanvas = $("#rbl-circuit-canvas");
  if (circuitCanvas) {
    const drawCircuit = () => {
      const S = resumeBubble.offsetWidth || 100;
      const DPR = 2;
      circuitCanvas.width = S * DPR;
      circuitCanvas.height = S * DPR;
      circuitCanvas.style.width = S + "px";
      circuitCanvas.style.height = S + "px";
      const ctx = circuitCanvas.getContext("2d");
      ctx.scale(DPR, DPR);
      const cx = S / 2;
      const cy = S / 2;
      const R = S / 2;

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R - 1, 0, Math.PI * 2);
      ctx.clip();

      const bg = ctx.createRadialGradient(cx, cy * 0.7, 0, cx, cy, R);
      bg.addColorStop(0, "rgba(0,12,28,0.92)");
      bg.addColorStop(0.5, "rgba(0,8,20,0.96)");
      bg.addColorStop(1, "rgba(0,3,10,1)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, S, S);

      let seed = 7;
      const rand = () => { seed = (seed * 1664525 + 1013904223) & 0xffffffff; return (seed >>> 0) / 0xffffffff; };

      ctx.strokeStyle = "rgba(56,189,248,0.18)";
      ctx.lineWidth = 0.7;
      const nodes = [];
      const grid = S * 0.12;
      for (let gx = grid; gx < S - grid; gx += grid) {
        for (let gy = grid; gy < S - grid; gy += grid) {
          const jx = gx + (rand() - 0.5) * grid * 0.6;
          const jy = gy + (rand() - 0.5) * grid * 0.6;
          if (Math.hypot(jx - cx, jy - cy) < R * 0.88) nodes.push([jx, jy]);
        }
      }

      nodes.forEach(([nx, ny], i) => {
        if (rand() > 0.55) return;
        const candidates = nodes.filter(([ox, oy], j) => {
          if (j === i) return false;
          const d = Math.hypot(ox - nx, oy - ny);
          return d > grid * 0.8 && d < grid * 2.2;
        });
        if (!candidates.length) return;
        const [tx, ty] = candidates[Math.floor(rand() * candidates.length)];
        ctx.beginPath();
        if (rand() > 0.5) {
          ctx.moveTo(nx, ny); ctx.lineTo(tx, ny); ctx.lineTo(tx, ty);
        } else {
          ctx.moveTo(nx, ny); ctx.lineTo(nx, ty); ctx.lineTo(tx, ty);
        }
        ctx.stroke();
      });

      nodes.forEach(([nx, ny]) => {
        if (rand() > 0.6) return;
        ctx.fillStyle = "rgba(56,189,248,0.35)";
        ctx.beginPath();
        ctx.arc(nx, ny, rand() * 1.4 + 0.6, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
    };

    if (resumeBubble.offsetWidth > 0) drawCircuit();
    else requestAnimationFrame(drawCircuit);
    window.addEventListener("resize", drawCircuit, { passive: true });
  }

  const tickGroup = $("#rbl-ticks");
  if (tickGroup && !tickGroup.childElementCount) {
    const cx = 100;
    const cy = 100;
    const r = 94;
    for (let i = 0; i < 60; i++) {
      const angle = (i / 60) * Math.PI * 2 - Math.PI / 2;
      const isMajor = i % 5 === 0;
      const len = isMajor ? 8 : 4;
      const x1 = cx + Math.cos(angle) * r;
      const y1 = cy + Math.sin(angle) * r;
      const x2 = cx + Math.cos(angle) * (r - len);
      const y2 = cy + Math.sin(angle) * (r - len);
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", x1);
      line.setAttribute("y1", y1);
      line.setAttribute("x2", x2);
      line.setAttribute("y2", y2);
      line.setAttribute("stroke", isMajor ? "rgba(56,189,248,0.7)" : "rgba(56,189,248,0.3)");
      line.setAttribute("stroke-width", isMajor ? "1.2" : "0.7");
      tickGroup.appendChild(line);
    }
  }

  const orbitContainer = $("#rbl-orbit-particles");
  const orbitParticles = [];
  if (orbitContainer && !orbitContainer.childElementCount) {
    for (let i = 0; i < 6; i++) {
      const p = document.createElement("span");
      p.className = "rbl-orbit-particle";
      orbitContainer.appendChild(p);
      orbitParticles.push({
        el: p,
        angle: (i / 6) * Math.PI * 2,
        speed: 0.004 + Math.random() * 0.003,
        radius: 0.58 + Math.random() * 0.1,
        size: 2 + Math.random() * 2,
      });
    }
  }

  const animateOrbits = () => {
    const half = (resumeBubble.offsetWidth || 100) / 2;
    orbitParticles.forEach((p) => {
      p.angle += p.speed;
      const px = Math.cos(p.angle) * half * p.radius;
      const py = Math.sin(p.angle) * half * p.radius;
      p.el.style.transform = `translate(${px}px,${py}px)`;
      p.el.style.width = p.size + "px";
      p.el.style.height = p.size + "px";
    });
    requestAnimationFrame(animateOrbits);
  };
  if (orbitParticles.length) requestAnimationFrame(animateOrbits);

  resumeBubble.addEventListener("click", () => {
    if (resumeBubbleRipple) {
      resumeBubbleRipple.classList.remove("is-active");
      void resumeBubbleRipple.offsetWidth;
      resumeBubbleRipple.classList.add("is-active");
    }
    if (resumeTerminalPopup) {
      resumeTerminalPopup.classList.add("is-visible");
      resumeTerminalPopup.setAttribute("aria-hidden", "false");
      setTimeout(() => {
        resumeTerminalPopup.classList.remove("is-visible");
        resumeTerminalPopup.setAttribute("aria-hidden", "true");
      }, 1800);
    }
    resumeBubbleText.textContent = resumeBubbleText.dataset.hover || "DOWNLOAD";
    setTimeout(() => {
      resumeBubbleText.textContent = resumeBubbleText.dataset.default || "RESUME";
    }, 1200);

    const resume = DATA.person?.resume || { href: "../src/Atul_Resume_.pdf", filename: "Atul_Resume_.pdf" };
    const a = document.createElement("a");
    a.href = resume.href;
    a.download = resume.filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  });

  /* ── Bouncing ball within contact-resume-slot ─────────────────── */
  (function bounceBubble() {
    const slot = resumeBubble.closest(".contact-resume-slot");
    if (!slot) return;

    const SIZE = resumeBubble.offsetWidth || 100;
    // random start position
    let x = Math.random() * Math.max(0, slot.offsetWidth  - SIZE);
    let y = Math.random() * Math.max(0, slot.offsetHeight - SIZE);
    // velocity: ~1.4px per frame at 60fps feels natural
    let vx = (Math.random() > 0.5 ? 1 : -1) * (1.2 + Math.random() * 0.6);
    let vy = (Math.random() > 0.5 ? 1 : -1) * (1.2 + Math.random() * 0.6);

    // Flash a corner-hit glow briefly
    const flashHit = () => {
      resumeBubble.style.filter = "drop-shadow(0 0 10px rgba(56,189,248,0.9))";
      setTimeout(() => { resumeBubble.style.filter = ""; }, 120);
    };

    let raf;
    const step = () => {
      const arenaW = slot.offsetWidth;
      const arenaH = slot.offsetHeight;
      const maxX   = arenaW - SIZE;
      const maxY   = arenaH - SIZE;

      x += vx;
      y += vy;

      // Bounce off left/right
      if (x <= 0) {
        x = 0; vx = Math.abs(vx);
        flashHit();
      } else if (x >= maxX) {
        x = maxX; vx = -Math.abs(vx);
        flashHit();
      }

      // Bounce off top/bottom
      if (y <= 0) {
        y = 0; vy = Math.abs(vy);
        flashHit();
      } else if (y >= maxY) {
        y = maxY; vy = -Math.abs(vy);
        flashHit();
      }

      resumeBubble.style.left = x + "px";
      resumeBubble.style.top  = y + "px";
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);

    // Pause when tab hidden, resume when visible
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(step);
      }
    });
  })();
}

/* ─── Nav Drawer ───────────────────────────────────────────────────── */
function initNavDrawer() {
  const btn      = $("#menu-button");
  const drawer   = $("#nav-drawer");
  const backdrop = $("#nav-drawer-backdrop");
  const closeBtn = $("#nav-drawer-close");
  if (!btn || !drawer) return;

  const open = () => {
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    btn.setAttribute("aria-expanded", "true");
    btn.classList.add("is-open");
    document.body.style.overflow = "hidden"; // prevent page scroll while open
  };

  const close = () => {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    btn.setAttribute("aria-expanded", "false");
    btn.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  btn.addEventListener("click", () => {
    drawer.classList.contains("is-open") ? close() : open();
  });

  if (closeBtn)  closeBtn.addEventListener("click", close);
  if (backdrop)  backdrop.addEventListener("click", close);

  // Close on nav link tap
  $$("[data-close-drawer]", drawer).forEach((el) => {
    el.addEventListener("click", close);
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) close();
  });
}

/* ─── Scroll progress bar ──────────────────────────────────────────── */
function initScrollProgress() {
  const bar = $("#scroll-progress-bar");
  if (!bar) return;

  const update = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress   = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    bar.style.width  = Math.min(100, Math.max(0, progress)) + "%";
  };

  update();
  window.addEventListener("scroll",  update, { passive: true });
  window.addEventListener("resize",  update, { passive: true });
}

/* ─── Floating particles (matches portfolio-from-svg) ─────────────── */
function initParticles() {
  const container = $("#floating-particles");
  if (!container) return;

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 22; i++) {
    const p = document.createElement("span");
    p.className = "floating-particle";
    p.style.left = `${Math.random() * 100}%`;
    p.style.setProperty("--particle-size",     `${2 + Math.random() * 5}px`);
    p.style.setProperty("--particle-duration", `${11 + Math.random() * 14}s`);
    p.style.setProperty("--particle-delay",    `${Math.random() * -18}s`);
    p.style.setProperty("--particle-drift",    `${-30 + Math.random() * 60}px`);
    fragment.appendChild(p);
  }
  container.appendChild(fragment);
}

/* ─── Boot ─────────────────────────────────────────────────────────── */
function init() {
  renderSkills();
  renderProjects();
  renderCertificates();
  renderExperience();
  renderAchievements();
  renderContact();
  initSkillTabs();
  initReveal();
  initMatrixBg();
  initResumeBubble();
  initScrollProgress();
  initParticles();
  initNavDrawer();
  initCertPreview();
  initShotPreview();

  if (terminalCard) {
    terminalCard.addEventListener("click", (e) => {
      if (e.target.closest(".terminal-menu, .terminal-command-slot, button[data-command]")) return;
      onTerminalTap(e);
    });
    setHint("Tap to begin");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    init();
  } catch (err) {
    console.error("[mobile-2] init error:", err);
    // Attempt to at least render skills even if something else failed
    try { renderSkills(); } catch (_) {}
  }
});
