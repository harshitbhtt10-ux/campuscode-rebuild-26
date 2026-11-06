const app = document.querySelector("#app");
const header = document.querySelector("#site-header");
const toast = document.querySelector("#toast");

const events = [
  { id: "rebuild", name: "ReBuild ’26", category: "Frontend only", date: "Nov 6 – Nov 7, 2026", format: "Individual", accent: "lime" },
  { id: "mini-hack", name: "CampusCode Mini Hack", category: "Open track", date: "Nov 20 – Nov 21, 2026", format: "Teams of 2–4", accent: "violet" },
  { id: "design-sprint", name: "Design to Launch", category: "Product design", date: "Dec 4 – Dec 5, 2026", format: "Teams of 2", accent: "blue" },
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
    return `
      <a href="#home">Home</a>
      <a href="#dashboard?view=events">Events</a>
      <a href="#dashboard?view=my-events">My events</a>`;
  }
  if (route === "login" || route === "register") {
    return `<a href="#home">Home</a><a href="#dashboard?view=events">Events</a><a href="#about">About</a>`;
  }
  return `<a class="is-current" href="#home">Home</a><a href="#dashboard?view=events">Events</a><a href="#dashboard?view=my-events">HackMate</a><a href="#about">About</a>`;
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
          : `<a class="header-login ${route === "login" ? "is-current" : ""}" href="#login">Login</a><a class="button button-small" href="#register">Register</a>`}
      </div>
    </div>`;
}

function homePage() {
  return `
    <section class="landing page-enter">
      <div class="hero-copy-block">
        <p class="eyebrow"><span class="eyebrow-line"></span>The digital home for student innovation</p>
        <h1>BUILD.<br /><span class="headline-outline">COMPETE.</span><br />SHIP<span class="lime-dot">.</span></h1>
        <p class="hero-copy">An AI-powered hackathon platform for students to discover, participate, collaborate and ship ideas.</p>
        <div class="hero-actions">
          <a class="button" href="#dashboard?view=events">Explore events ${icon("arrow")}</a>
          <a class="button button-light" href="#about">How it works</a>
        </div>
        <div class="hero-proof"><span class="proof-avatars"><i>R</i><i>A</i><i>K</i></span><span>Made for the next generation of builders</span></div>
      </div>

      <div class="hero-art" aria-label="Three dimensional CampusCode mark on a glowing display plinth" role="img">
        <div class="hero-halo halo-back"></div><div class="hero-halo halo-front"></div>
        <div class="floating-shape glass-sphere"></div>
        <div class="floating-shape cube cube-one"><i></i></div>
        <div class="floating-shape cube cube-two"><i></i></div>
        <div class="platform-shadow"></div>
        <div class="display-platform platform-upper"></div>
        <div class="display-platform platform-lower"></div>
        <div class="large-brand-mark" aria-hidden="true"><i></i><i></i><i></i></div>
        <span class="art-caption"><span class="caption-dot"></span> A place to make it real</span>
      </div>

      <div class="values-strip" aria-label="CampusCode values"><span>IDEAS</span><b>•</b><span>PEOPLE</span><b>•</b><span>PRODUCTS</span><b>•</b><span>INNOVATION</span><b>•</b><span>COMMUNITY</span></div>
      <section class="how-section" id="about">
        <div><p class="eyebrow">A little less scrolling. A lot more making.</p><h2>Find your next<br /><span>big idea.</span></h2></div>
        <p>Meet builders, find an event that fits, and give your ideas room to grow. CampusCode keeps your next challenge in one place.</p>
        <a class="text-link" href="#dashboard?view=events">See what’s coming ${icon("arrow")}</a>
      </section>
      <footer class="landing-footer"><a class="brand brand-footer" href="#home"><span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span><span class="brand-name">CAMPUSCODE</span></a><span>Build something worth sharing.</span><a href="#login">Student sign in</a></footer>
    </section>`;
}

function authBackdrop(kind) {
  return `
    <div class="auth-scene ${kind}-scene" aria-hidden="true">
      <div class="scene-loop loop-a"></div><div class="scene-loop loop-b"></div>
      <div class="scene-cube scene-cube-a"><i></i></div><div class="scene-cube scene-cube-b"><i></i></div>
      <div class="scene-orb scene-orb-a"></div><div class="scene-orb scene-orb-b"></div>
      <div class="scene-curve curve-a"></div><div class="scene-curve curve-b"></div>
      <span class="scene-note">${kind === "login" ? "GOOD TO HAVE YOU BACK" : "YOUR NEXT CHAPTER STARTS HERE"}</span>
    </div>`;
}

function loginPage() {
  return `
    <section class="auth-layout page-enter">
      ${authBackdrop("login")}
      <div class="auth-card">
        <div class="auth-heading"><span class="auth-kicker">STUDENT PORTAL</span><h1>Welcome back.</h1><p>Sign in to pick up where you left off.</p></div>
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
        <div class="auth-heading"><span class="auth-kicker">JOIN THE COMMUNITY</span><h1>Make it official.</h1><p>Create your CampusCode account.</p></div>
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
    <article class="event-card event-${event.accent}">
      <div class="event-logo"><span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span></div>
      <div class="event-info"><div class="event-title-row"><h3>${event.name}</h3><button class="icon-button more-button" type="button" aria-label="More about ${event.name}" data-message="You’re viewing the ${event.name} preview.">${icon("more")}</button></div><p class="event-date">${icon("calendar")} ${event.date}</p><span class="event-tag">${event.format}<b>•</b>${event.category}</span></div>
      <button class="event-action ${registered ? "is-registered" : ""}" type="button" data-event-id="${event.id}">${registered ? `${icon("check")} Registered` : "Register"}</button>
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
          <div class="feature-art" aria-hidden="true"><div class="feature-ring"></div><div class="feature-plinth"></div><div class="feature-mark"><i></i><i></i><i></i></div><div class="feature-spark"></div></div>
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

window.addEventListener("hashchange", render);
render();
