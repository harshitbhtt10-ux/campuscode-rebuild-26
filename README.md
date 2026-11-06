# CampusCode ReBuild ’26

A responsive, frontend-only CampusCode preview based on the supplied four-screen reference. The page links stay within the four requested views: Home, Login, Register, and Student Dashboard.

## Project layout

```text
CampusCodeRound1/
├── index.html       # Shared shell and SVG icon set
├── app.js           # Four views, navigation, and demo interactions
├── styles.css       # Responsive layout and CSS depth effects
├── .gitignore
└── README.md
```

## Run locally

The project has no build step or package dependencies. From this folder, start a static server:

```powershell
py -m http.server 4173
```

Then open <http://localhost:4173>.

## The four views

- **Home** — CampusCode introduction, dimensional mark, and event call to action.
- **Login** — Accessible sign-in form with a local demo flow.
- **Register** — Account form with password confirmation and a visual demo verification code (`7GK4P`).
- **Student Dashboard** — Sample ReBuild ’26 event, event lists, registration toggles, and activity counts.

Form data and event selections stay in the current browser tab's session storage. There is no backend, real authentication, or persistent account storage.

## Round 1 authorship note

This implementation was written with AI assistance. The Round 1 starter notes in this workspace mention a 40% cap on AI-authored code; this project has not been measured against that rule and should not be submitted as compliant. Review the event's current rules, write or replace enough of the implementation yourself, and disclose assistance as required.

## Deploy

This is a static site. Vercel can serve the project root directly; no build command or environment variables are needed.
