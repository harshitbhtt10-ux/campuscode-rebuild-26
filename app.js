const app = document.querySelector("#app");
const header = document.querySelector("#site-header");
const toast = document.querySelector("#toast");

const events = [
  { id: "rebuild", name: "ReBuild ’26", category: "Frontend only", date: "Nov 6 – Nov 7, 2026", format: "Individual", accent: "lime", description: "Recreate it faithfully on Friday and rebuild it beautifully on Saturday. The challenge is to deliver four pages: Landing, Login, Register, and Student Dashboard." },
  { id: "mini-hack", name: "CampusCode Mini Hack", category: "Open track", date: "Nov 20 – Nov 21, 2026", format: "Teams of 2–4", accent: "violet", description: "A sample open-track event for small teams to explore a campus problem and turn an idea into a working prototype." },
  { id: "design-sprint", name: "Design to Launch", category: "Product design", date: "Dec 4 – Dec 5, 2026", format: "Teams of 2", accent: "blue", description: "A sample product design sprint focused on shaping an idea into a clear, useful experience." },
];

const icon = (name, className = "") => `<svg class="icon ${className}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
const escapeHTML = (value = "") => String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);

function currentRoute() {
  const name = location.hash.slice(1).split(/[/?]/)[0];
  return ["login", "register", "dashboard"].includes(name) ? name : "home";
}

function dashboardView() {
  const query = location.hash.split("?")[1] || "";
  const view = new URLSearchParams(query).get("view");
  return ["my-events", "events"].includes(view) ? view : "overview";
}

function navigation(route) {
  if (route === "dashboard") {
    return "<a href='#dashboard'>Dashboard</a>" +
      "<a href='#dashboard?view=my-events'>My events</a>" +
      "<a href='#dashboard?view=events'>Events</a>";
  }

  if (route === "login" || route === "register") {
    return "<a href='#home'>← Back to home</a>";
  }

  return "<a href='#about'>About</a>" +
    "<a href='#how'>How it works</a>" +
    "<a href='#hackathons'>Hackathons</a>" +
    "<a href='#community'>Community</a>";
}

function headerMarkup(route) {
  return `
    <div class="header-inner">
      <a class="brand" href="#home" aria-label="CampusCode home">
        <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>
        <span class="brand-name">CAMPUSCODE</span>
      </a>
      <nav class="main-nav" aria-label="Main navigation">${navigation(route)}</nav>
      <div class="header-actions">
        ${route === "dashboard"
          ? `<button class="icon-button notification-button" type="button" aria-label="Notifications">${icon("bell")}</button><div class="user-chip"><span class="avatar">HB</span><span>${escapeHTML(sessionStorage.getItem("campuscode-name") || "Harshit Bhatt")}</span><span class="chevron">⌄</span></div>`
          : `<a class="header-login ${route === "login" ? "is-current" : ""}" href="#login">Login</a><a class="button button-small" href="#register">Join CampusCode ↗</a>`}
      </div>
    </div>`;
}

function homePage() {
  const steps = [
    { number: "01", title: "Discover", copy: "Find a challenge that makes you want to build." },
    { number: "02", title: "Team up", copy: "Meet people who bring a different point of view." },
    { number: "03", title: "Build", copy: "Turn a good idea into something people can use." },
    { number: "04", title: "Ship", copy: "Share your work with the people who can help it grow." }
  ];

  const stepCards = steps.map(step =>
    "<article class='process-card'>" +
      "<span class='process-number'>" + step.number + "</span>" +
      "<h3>" + step.title + "</h3>" +
      "<p>" + step.copy + "</p>" +
      "<span class='process-arrow' aria-hidden='true'>↗</span>" +
    "</article>"
  ).join("");

  const eventCards = events.map((event, index) =>
    "<article class='home-event-card event-" + escapeHTML(event.accent) + "'>" +
      "<p class='eyebrow'>0" + (index + 1) + " / " + escapeHTML(event.category) + "</p>" +
      "<h3>" + escapeHTML(event.name) + "</h3>" +
      "<p>" + escapeHTML(event.date) + "</p>" +
      "<a href='#dashboard?view=events' aria-label='View " + escapeHTML(event.name) + "'>↗</a>" +
    "</article>"
  ).join("");

  return [
    "<section class='landing page-enter'>",
      "<section class='home-hero' id='home'>",
        "<div class='hero-meta'>",
          "<p class='eyebrow'><span class='status-dot'></span>The digital home for student innovation</p>",
          "<span class='hero-place'>Chennai · India</span>",
        "</div>",
        "<p class='hero-index'>CampusCode / 001</p>",
        "<div class='hero-copy-block'>",
          "<h1>BUILD<br><span class='headline-outline'>COMPETE</span><br>SHIP<span class='lime-dot'>.</span></h1>",
          "<p class='hero-copy'>A digital arena for students who don't just have ideas. They build them.</p>",
          "<div class='hero-actions'>",
            "<a class='button' href='#dashboard?view=events'>Explore hackathons <span aria-hidden='true'>↗</span></a>",
            "<a class='text-link' href='#how'>See how it works <span aria-hidden='true'>↘</span></a>",
          "</div>",
        "</div>",
        "<div class='feature-art home-stage' aria-hidden='true'><div class='feature-ring'></div><div class='feature-plinth'></div><div class='feature-mark'><i></i><i></i><i></i></div><div class='feature-spark'></div></div>",
        "<p class='scroll-cue'><span>Scroll to explore</span><span>01 / 05</span></p>",
      "</section>",
      "<div class='values-strip' aria-label='CampusCode values'>",
        "<span>IDEAS</span><b>✦</b><span>PEOPLE</span><b>✦</b><span>PRODUCTS</span><b>✦</b><span>INNOVATION</span><b>✦</b><span>COMMUNITY</span>",
      "</div>",
      "<section class='home-section about-section' id='about'>",
        "<div class='section-label'><span>01</span><span>What is CampusCode?</span></div>",
        "<div class='about-copy'><h2>WHERE<br>STUDENTS<br><span>BUILD.</span></h2>",
          "<p>CampusCode brings students, teams, organizers and hackathons into one connected ecosystem.</p></div>",
        "<div class='about-mark' aria-hidden='true'><span class='brand-mark'><i></i><i></i><i></i></span><span>Ideas need builders.</span></div>",
      "</section>",
      "<section class='home-section process-section' id='how'>",
        "<div class='section-label'><span>03</span><span>How it works</span></div>",
        "<div class='section-heading'><h2>FROM IDEA<br>TO <span>IMPACT.</span></h2><p>One place to find your next challenge and get the work out into the world.</p></div>",
        "<div class='process-grid'>" + stepCards + "</div>",
      "</section>",
      "<section class='home-section hackathon-section' id='hackathons'>",
        "<div class='section-label'><span>04</span><span>Enter the arena</span></div>",
        "<div class='section-heading'><h2>MAKE SOMETHING<br><span>MATTER.</span></h2>",
          "<a class='text-link' href='#dashboard?view=events'>View all events <span aria-hidden='true'>↗</span></a></div>",
        "<div class='home-event-grid'>" + eventCards + "</div>",
      "</section>",
      "<section class='home-section community-section' id='community'>",
        "<div class='community-label'><span>The network</span><span>05 — The mission</span></div>",
        "<h2>GREAT IDEAS<br>NEED <span>BUILDERS.</span></h2>",
        "<div class='community-copy'><p>Your university is full of people with ideas. CampusCode gives those ideas somewhere to go.</p>",
          "<a class='button' href='#register'>Join CampusCode <span aria-hidden='true'>↗</span></a></div>",
      "</section>",
      "<footer class='landing-footer'>",
        "<a class='brand brand-footer' href='#home'><span class='brand-mark' aria-hidden='true'><i></i><i></i><i></i></span><span class='brand-name'>CAMPUSCODE</span></a>",
        "<span>The student hackathon arena.</span><a href='#login'>Student sign in</a>",
      "</footer>",
    "</section>"
  ].join("");
}

function authBackdrop(kind) {
  const isLogin = kind === "login";
  const sectionName = isLogin ? "Authentication" : "Registration";
  const firstWord = isLogin ? "ENTER" : "JOIN";
  const description = isLogin
    ? "Sign in to continue building, collaborating and competing with the CampusCode community."
    : "Create your student profile and find your place in the CampusCode community.";
  const arenaWord = isLogin
    ? "<span class='arena-trigger' tabindex='0' aria-describedby='arena-hackathon-popover'>ARENA.<span class='arena-popover' id='arena-hackathon-popover' role='tooltip'><span class='popover-kicker'>NEXT HACKATHON</span><strong>ReBuild ’26</strong><span>Frontend only · Individual</span><span>November 6–7, 2026</span></span></span>"
    : "ARENA.";
  const cards = (isLogin ? ["BUILD", "COMPETE", "SHIP"] : ["IDENTITY", "TEAM", "ARENA"])
    .map((label, index) =>
      "<article class='auth-step'>" +
        "<span>0" + (index + 1) + "</span>" +
        "<strong>" + label + "</strong>" +
      "</article>"
    ).join("");

  return "<aside class='auth-story'>" +
    "<p class='eyebrow'><span class='status-dot'></span>CampusCode / " + sectionName + "</p>" +
    "<div class='auth-story-index'><span>" + (isLogin ? "Access" : "Create") + "</span><span>0" + (isLogin ? "1" : "2") + " / 02</span></div>" +
    "<h1>" + firstWord + "<br>THE<br><span>" + arenaWord + "</span></h1>" +
    "<p class='auth-story-copy'>" + description + "</p>" +
    "<div class='auth-steps'>" + cards + "</div>" +
    "<p class='auth-story-footer'><span class='status-dot'></span>" + (isLogin ? "Secure access" : "Student innovation network") + "<span>2026</span></p>" +
  "</aside>";
}

function loginPage() {
  return `
    <section class="auth-layout page-enter">
      ${authBackdrop("login")}
      <div class="auth-card">
        <div class="auth-heading"><span class="auth-kicker">STUDENT PORTAL</span><h1>LOGIN</h1><p>Access your CampusCode account.</p></div>
        <form id="login-form" class="auth-form">
          <label class="field-label" for="login-email">Email address</label>
          <div class="input-wrap">${icon("mail")}<input id="login-email" name="email" type="email" autocomplete="email" placeholder="you@college.edu" required /></div>
          <div class="label-row"><label class="field-label" for="login-password">Password</label><a class="quiet-link" href="#login" data-message="Password reset is not connected in this preview.">Forgot password?</a></div>
          <div class="input-wrap">${icon("lock")}<input id="login-password" name="password" type="password" autocomplete="current-password" placeholder="Enter your password" required /><button class="input-action" type="button" data-toggle-password="login-password" aria-label="Show password">${icon("eye")}</button></div>
          <label class="remember-row"><input type="checkbox" name="remember" /><span>Remember me</span></label>
          <button class="button button-submit" type="submit">Sign in <span>${icon("arrow")}</span></button>
          <div class="auth-divider"><span></span>or<span></span></div>
          <p class="auth-switch">New to CampusCode? <a href="#register">Create an account</a></p>
        </form>
        <p class="demo-note">This visual preview uses a local demo sign-in.</p>
      </div>
    </section>`;
}

function registerPage() {
  return `
    <section class="auth-layout register-layout page-enter">
      ${authBackdrop("register")}
      <div class="auth-card register-card">
        <div class="auth-heading"><span class="auth-kicker">JOIN THE COMMUNITY</span><h1>REGISTER</h1><p>Create your CampusCode account.</p></div>
        <form id="register-form" class="auth-form">
          <label class="field-label" for="full-name">Full name</label>
          <div class="input-wrap">${icon("users")}<input id="full-name" name="name" type="text" autocomplete="name" placeholder="Your full name" required minlength="2" /></div>
          <label class="field-label" for="register-email">College email</label>
          <div class="input-wrap">${icon("mail")}<input id="register-email" name="email" type="email" autocomplete="email" placeholder="you@college.edu" required /></div>
          <div class="form-columns">
            <div><label class="field-label" for="account-type">I am a</label><div class="select-wrap"><select id="account-type" name="role"><option>Student</option><option>Recent graduate</option><option>Mentor</option></select></div></div>
            <div><label class="field-label" for="age-range">Age range</label><div class="select-wrap"><select id="age-range" name="age"><option>18 – 25</option><option>Under 18</option><option>26+</option></select></div></div>
          </div>
          <label class="field-label" for="register-password">Password</label>
          <div class="input-wrap">${icon("lock")}<input id="register-password" name="password" type="password" autocomplete="new-password" placeholder="At least 8 characters" required minlength="8" /><button class="input-action" type="button" data-toggle-password="register-password" aria-label="Show password">${icon("eye")}</button></div>
          <label class="field-label" for="confirm-password">Confirm password</label>
          <div class="input-wrap">${icon("lock")}<input id="confirm-password" name="confirmPassword" type="password" autocomplete="new-password" placeholder="Enter it once more" required minlength="8" /><button class="input-action" type="button" data-toggle-password="confirm-password" aria-label="Show password">${icon("eye")}</button></div>
          <div class="captcha-row"><span class="captcha-code" aria-label="Demo verification code">7G K4P</span><span class="captcha-help">Type the code to continue</span><input name="captcha" aria-label="Verification code" autocomplete="off" placeholder="Code" required /></div>
          <button class="button button-submit" type="submit">Create account <span>${icon("arrow")}</span></button>
          <p class="auth-switch">Already have an account? <a href="#login">Sign in</a></p>
        </form>
        <p class="demo-note">Your details stay in this browser preview.</p>
      </div>
    </section>`;
}

function registeredEvents() {
  try { return JSON.parse(sessionStorage.getItem("campuscode-events") || "[\"rebuild\"]"); }
  catch { return ["rebuild"]; }
}

function eventCard(event, registered) {
  return `
    <article class="event-card event-${event.accent}" tabindex="0" aria-describedby="details-${event.id}">
      <div class="event-logo"><span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span></div>
      <div class="event-info"><div class="event-title-row"><h3>${event.name}</h3><button class="icon-button more-button" type="button" aria-label="More about ${event.name}" data-message="You’re viewing the ${event.name} preview.">${icon("more")}</button></div><p class="event-date">${icon("calendar")} ${event.date}</p><span class="event-tag">${event.format}<b>•</b>${event.category}</span></div>
      <button class="event-action ${registered ? "is-registered" : ""}" type="button" data-event-id="${event.id}">${registered ? `${icon("check")} Registered` : "Register"}</button>
      <div class="event-detail-panel" id="details-${event.id}" role="tooltip"><span class="event-detail-kicker">EVENT BRIEF <b>${event.category}</b></span><strong>${event.name}</strong><p>${event.description}</p><div class="event-detail-meta"><span><small>DATE</small>${event.date}</span><span><small>FORMAT</small>${event.format}</span><span><small>STATUS</small>${registered ? "Registered" : "Registration open"}</span></div></div>
    </article>`;
}

function dashboardPage() {
  const signedInName = sessionStorage.getItem("campuscode-name") || "Harshit Bhatt";
  const firstName = escapeHTML(signedInName.trim().split(/\s+/)[0] || "Builder");
  const joined = registeredEvents();
  const selectedView = dashboardView();
  return `
    <section class="dashboard page-enter">
      <aside class="dashboard-sidebar" aria-label="Student dashboard navigation">
        <p class="sidebar-label">WORKSPACE</p>
        <a class="side-link ${selectedView === "overview" ? "selected" : ""}" href="#dashboard">${icon("home")}<span>Dashboard</span></a>
        <a class="side-link ${selectedView === "my-events" ? "selected" : ""}" href="#dashboard?view=my-events">${icon("calendar")}<span>My events</span><i class="side-count">${joined.length}</i></a>
        <a class="side-link ${selectedView === "events" ? "selected" : ""}" href="#dashboard?view=events">${icon("grid")}<span>Explore events</span></a>
        <div class="sidebar-rule"></div>
        <p class="sidebar-label">ACCOUNT</p>
        <a class="side-link" href="#login" data-sign-out>${icon("logout")}<span>Sign out</span></a>
        <div class="sidebar-foot"><span class="foot-mark"><i></i><i></i><i></i></span><span>Good ideas<br />start somewhere.</span></div>
      </aside>

      <div class="dashboard-content">
        <div class="welcome-row"><div><p class="eyebrow">YOUR BUILDER SPACE</p><h1>Welcome back, <span>${firstName}.</span> <i class="wave">✦</i></h1><p class="welcome-subtitle">A new idea could be just one event away.</p></div><button class="button button-small explore-button" type="button" data-route="events">Explore events ${icon("arrow")}</button></div>
        <section class="feature-card">
          <div class="feature-content"><span class="feature-kicker"><span></span>UP NEXT · INDIVIDUAL</span><h2>ReBuild <em>’26</em></h2><p>Make something useful, show us how it works, and ship it this weekend.</p><div class="feature-meta">${icon("calendar")} Nov 6 – Nov 7, 2026 <span class="meta-divider"></span><span class="meta-pill">Frontend only</span></div><button class="button feature-button" type="button" data-message="ReBuild ’26 is open for registration below.">View event ${icon("arrow")}</button></div>
          <div class="feature-art dashboard-stage" aria-hidden="true"><div class="feature-ring"></div><div class="feature-plinth"></div><div class="feature-mark"><i></i><i></i><i></i></div><div class="feature-spark"></div></div>
        </section>

        <div class="section-heading"><div><span class="section-index">01</span><h2>In your orbit</h2></div><div class="view-switch"><a class="${selectedView === "my-events" ? "active" : ""}" href="#dashboard?view=my-events">My events <span>${joined.length}</span></a><a class="${selectedView === "events" ? "active" : ""}" href="#dashboard?view=events">Explore all ${icon("arrow")}</a></div></div>
        <div class="event-columns ${selectedView === "my-events" ? "focus-mine" : ""} ${selectedView === "events" ? "focus-all" : ""}">
          <section class="event-section mine-section"><div class="event-section-heading"><h2>My events <span>${joined.length}</span></h2><a href="#dashboard?view=my-events">View all ${icon("arrow")}</a></div><div class="event-list">${events.filter(event => joined.includes(event.id)).map(event => eventCard(event, true)).join("") || `<div class="empty-state"><span class="empty-orbit">${icon("calendar")}</span><h3>Your next adventure?</h3><p>You haven’t joined an event yet. Find one that sounds like you.</p><a class="text-link" href="#dashboard?view=events">Browse events ${icon("arrow")}</a></div>`}</div></section>
          <section class="event-section all-section"><div class="event-section-heading"><h2>Coming up <span>${events.length}</span></h2><a href="#dashboard?view=events">View all ${icon("arrow")}</a></div><div class="event-list">${events.filter(event => !joined.includes(event.id)).map(event => eventCard(event, false)).join("") || `<div class="empty-state compact-empty"><p>You’re all caught up. New events will show here.</p></div>`}</div></section>
        </div>
        <section class="stats-strip" aria-label="Your activity"><div>${icon("calendar")}<strong>${joined.length}</strong><span>My events</span></div><div>${icon("upload")}<strong>0</strong><span>Submissions</span></div><div>${icon("trophy")}<strong>0</strong><span>Certificates</span></div></section>
        <footer class="dashboard-footer"><span>Keep building, one good idea at a time.</span><a href="#home">CampusCode <span>↗</span></a></footer>
      </div>
    </section>`;
}

function render() {
  const route = currentRoute();
  document.body.dataset.route = route;
  header.innerHTML = headerMarkup(route);
  app.innerHTML = route === "login" ? loginPage() : route === "register" ? registerPage() : route === "dashboard" ? dashboardPage() : homePage();
  app.focus({ preventScroll: true });
}

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2800);
}

function updateDashboardView(nextView) {
  location.hash = nextView === "overview" ? "dashboard" : `dashboard?view=${nextView}`;
}

header.addEventListener("click", event => {
  const button = event.target.closest(".notification-button");
  if (button) showToast("You’re all caught up.");
});

app.addEventListener("click", event => {
  const toggle = event.target.closest("[data-toggle-password]");
  if (toggle) {
    const field = document.getElementById(toggle.dataset.togglePassword);
    const showing = field.type === "password";
    field.type = showing ? "text" : "password";
    toggle.setAttribute("aria-label", showing ? "Hide password" : "Show password");
    return;
  }

  const signOut = event.target.closest("[data-sign-out]");
  if (signOut) sessionStorage.removeItem("campuscode-name");

  const routeButton = event.target.closest("[data-route]");
  if (routeButton) {
    updateDashboardView(routeButton.dataset.route === "events" ? "events" : "overview");
    return;
  }

  const eventButton = event.target.closest("[data-event-id]");
  if (eventButton) {
    const id = eventButton.dataset.eventId;
    const joined = registeredEvents();
    const alreadyJoined = joined.includes(id);
    sessionStorage.setItem("campuscode-events", JSON.stringify(alreadyJoined ? joined.filter(item => item !== id) : [...joined, id]));
    showToast(alreadyJoined ? "You’ve left this event." : "You’re on the list. See you there!");
    render();
    return;
  }

  const messageLink = event.target.closest("[data-message]");
  if (messageLink) {
    event.preventDefault();
    showToast(messageLink.dataset.message);
  }
});

app.addEventListener("submit", event => {
  const form = event.target;
  if (form.id === "login-form") {
    event.preventDefault();
    const email = new FormData(form).get("email");
    const displayName = String(email).split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, letter => letter.toUpperCase());
    sessionStorage.setItem("campuscode-name", displayName || "Builder");
    location.hash = "dashboard";
  }

  if (form.id === "register-form") {
    event.preventDefault();
    const data = new FormData(form);
    const password = form.elements.password;
    const confirmation = form.elements.confirmPassword;
    confirmation.setCustomValidity(password.value === confirmation.value ? "" : "The passwords need to match.");
    const code = String(data.get("captcha")).replace(/\s/g, "").toUpperCase();
    if (code !== "7GK4P") {
      form.elements.captcha.setCustomValidity("Enter the code shown above.");
      form.elements.captcha.reportValidity();
      return;
    }
    if (!form.reportValidity()) return;
    sessionStorage.setItem("campuscode-name", String(data.get("name")).trim());
    showToast("Your demo account is ready.");
    location.hash = "dashboard";
  }
});

app.addEventListener("input", event => {
  if (event.target.name === "captcha") event.target.setCustomValidity("");
  if (event.target.name === "password" || event.target.name === "confirmPassword") {
    const confirmation = app.querySelector("#confirm-password");
    if (confirmation) confirmation.setCustomValidity("");
  }
});

window.addEventListener("hashchange", () => {
  const sectionName = location.hash.slice(1).split(/[/?]/)[0];
  const isHomeSection = ["about", "how", "hackathons", "community"].includes(sectionName);

  if (isHomeSection && currentRoute() === "home" && document.getElementById(sectionName)) {
    document.getElementById(sectionName).scrollIntoView({ behavior: "smooth" });
    return;
  }

  render();
  if (isHomeSection && currentRoute() === "home") {
    requestAnimationFrame(() => document.getElementById(sectionName)?.scrollIntoView({ behavior: "smooth" }));
  }
});
render();
