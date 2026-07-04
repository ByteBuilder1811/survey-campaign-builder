# Survey Campaign Builder

A simplified survey campaign builder built with React + Vite. Configure a
survey's **Content** and **Styling** from two tabs on the left, and see the
result instantly in a **live mobile preview** on the right — no save button,
no refresh.

## Tech Stack

- **React 19** (functional components + hooks)
- **Vite** — dev server & build tooling
- **Tailwind CSS** — utility-first styling for the builder UI
- **lucide-react** — icons
- Plain inline style objects for the mobile preview, since the preview needs
  to reflect fully dynamic, user-controlled styles rather than a fixed set
  of Tailwind classes.

No backend — all state lives in memory on the client via `useReducer` +
Context, which is enough for this assignment's scope (no persistence
requirement in the spec).

## Setup Instructions

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
# App runs at http://localhost:5173

# 3. Build for production
npm run build

# 4. Preview the production build locally
npm run preview
```

## Folder Structure

```
survey-builder/
├── src/
│   ├── App.jsx                    # Root layout: tabs + preview panel
│   ├── main.jsx                   # React entry point
│   ├── index.css                  # Tailwind entry + small global styles
│   │
│   ├── context/
│   │   └── SurveyContext.jsx      # Central state (content + styling) via useReducer
│   │
│   ├── utils/
│   │   ├── defaultState.js        # Initial state + shape factories (text/box style, etc.)
│   │   ├── objectPath.js          # get/set helpers for updating deep state by dot-path
│   │   └── id.js                  # id generator for questions/options/conditions
│   │
│   ├── components/
│   │   ├── Tabs.jsx                     # Content / Styling tab switcher
│   │   │
│   │   ├── controls/                    # Reusable, generic form primitives
│   │   │   ├── Field.jsx                # TextField, ColorField, ToggleField, etc.
│   │   │   └── StyleGroups.jsx          # TextStyleGroup / BoxStyleGroup / ButtonStyleGroup
│   │   │                                 # (compose Field.jsx primitives, driven by a state path)
│   │   │
│   │   ├── content/
│   │   │   ├── ContentPanel.jsx         # Composes Intro + Questions + Thank You
│   │   │   ├── CollapsibleCard.jsx      # Reusable accordion section wrapper
│   │   │   ├── IntroductionSection.jsx  # "Number of survey pages" control
│   │   │   ├── QuestionSection.jsx      # One question: title, subtitle, options, logic
│   │   │   ├── LogicSection.jsx         # Mock conditional logic (add condition/redirect)
│   │   │   └── ThankYouSection.jsx      # Thank-you toggle, media upload, CTA, redirect
│   │   │
│   │   ├── styling/
│   │   │   ├── StylingPanel.jsx         # Composes all styling sections
│   │   │   ├── AppearanceSection.jsx    # Background, corner radius, backdrop, delay
│   │   │   ├── OptionListSection.jsx    # Option layout + selected/unselected styling
│   │   │   ├── CrossButtonSection.jsx   # Close button styling
│   │   │   └── ThankYouStyleSection.jsx # Thank-you title/subtitle/image/button styling
│   │   │
│   │   └── preview/
│   │       ├── MobilePreview.jsx        # Phone frame, backdrop, cross button, page nav
│   │       ├── PreviewQuestion.jsx      # Renders one question page in the phone
│   │       ├── PreviewOption.jsx        # Single option (radio/checkbox/filled/alt layouts)
│   │       ├── PreviewThankYou.jsx      # Renders the thank-you page in the phone
│   │       └── previewStyleHelpers.js   # Converts style state -> inline CSS objects
```

## Architecture Notes

- **Single source of truth**: all survey config (content + styling) lives in
  one state object managed by `useReducer` in `SurveyContext`. Every input in
  the builder reads from and writes to this same object, and `MobilePreview`
  reads from it too — so any change re-renders the preview immediately with
  no extra plumbing.
- **Generic style controls over one-off forms**: the spec has roughly a
  hundred individual style fields (title, subtitle, options, buttons,
  thank-you page, etc.), but most of them repeat the same shape — a color, a
  font, a size, an alignment, a margin. Instead of writing bespoke JSX for
  every field, `TextStyleGroup`, `BoxStyleGroup`, and `ButtonStyleGroup` in
  `StyleGroups.jsx` each take a **state path** (e.g. `"styling.ctaButton"`)
  and render the right set of controls against it, using `getPath`/`setPath`
  for immutable nested updates. This keeps the styling panel maintainable
  and makes it trivial to add a new styleable element later.
- **Dynamic questions**: changing "Number of Survey Pages" dispatches a
  single action that grows or shrinks the `questions` array while preserving
  existing question data, rather than resetting everything.
- **Live preview navigation**: the phone preview tracks its own current
  page (question index or the thank-you page) so you can click through the
  actual survey flow — including the "Next" button behavior and the optional
  thank-you screen — while still reflecting builder edits in real time.

## Known Simplifications (called out explicitly, as the spec allows)

- **Logic section** is a mock: it lets you add "if option X is selected →
  redirect/skip to Y" rows and stores them in state, but doesn't execute
  real branching logic in the preview (per the spec: "Mock implementation is
  acceptable").
- **Redirect on Thank You page / CTA** stores a URL but doesn't perform a
  real navigation in the preview sandbox.
- **Media upload** (Thank You page image, custom cross icon) uses
  `URL.createObjectURL` for an in-session local preview; nothing is uploaded
  to a server, since none is specified in the assignment.

## Deployment Link

_Add your live deployment URL here after deploying (Vercel/Netlify/etc.)._
