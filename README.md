# Chatbot UI (Embeddable Widget)

An embeddable floating chatbot widget built with React + Vite. It can be dropped into any website using a single script tag, or run locally during development.

### Quick embed (copy-paste)

Add this to your HTML page (anywhere in `<body>`):

```html
<script
  src="https://chatbot-ui-chi-beryl.vercel.app/chatbot-widget.iife.js"
  api_url="https://demo1.sanketsonkusare.me/"
></script>
```

This will inject the widget and load its styles automatically. The `api_url` should point to your backend that handles chat messages.

---

## Project structure

Key files and what they do:

- `index.html`: App entry when running locally with Vite (development shell).
- `src/main.jsx`: Vite/React bootstrap for the SPA (dev only).
- `src/embed.jsx`: The script entry used by the embeddable widget. It dynamically:
  - injects the stylesheet `chatbot-widget.css`, and
  - mounts the React widget into a new `div#chatbot-widget-root` in the page.
- `src/components/FloatingChatbot.jsx`: The floating chat UI and client logic:
  - Reads API base URL from `window.CHATBOT_API_URL` or the script tag attribute `api_url`.
  - Sends `POST {api_url}/chatbot` with `{ user_message }` and renders bot responses.
- `dist/chatbot-widget.iife.js`: Production, framework-agnostic IIFE bundle for embedding.
- `dist/chatbot-widget.css`: Production stylesheet for the widget.
- `test.html`: Minimal static page demonstrating how to embed the widget via script tag.
- `vite.config.js`: Build configuration that outputs the IIFE bundle and CSS.

---

## How the embed works

When the script loads, `src/embed.jsx` runs and:

1. Appends a `<link rel="stylesheet" href="https://chatbot-ui-chi-beryl.vercel.app/chatbot-widget.css">` to the document `<head>` so the widget is styled.
2. Creates a new `<div id="chatbot-widget-root"></div>` and appends it to `<body>`.
3. Mounts the `FloatingChatbot` React component into that div.

No additional HTML container is required in your page; the script handles mounting.

---

## Configuring the API endpoint

The widget looks for the chat API base URL in this order:

1. `window.CHATBOT_API_URL` (a global you can set before loading the script)
2. `api_url` attribute on the `<script>` tag
3. Falls back to `http://localhost:8000`

Example options:

```html
<!-- A) Configure via script attribute (simplest) -->
<script
  src="https://chatbot-ui-chi-beryl.vercel.app/chatbot-widget.iife.js"
  api_url="https://your.api.example.com"
></script>

<!-- B) Configure via global (set before the script) -->
<script>
  window.CHATBOT_API_URL = "https://your.api.example.com";
  // you can still add the script tag right after this
</script>
<script src="https://chatbot-ui-chi-beryl.vercel.app/chatbot-widget.iife.js"></script>
```

### Expected backend contract

The widget sends:

```
POST {api_url}/chatbot
Content-Type: application/json

{ "user_message": "..." }
```

And expects a JSON response:

```
{ "response": "..." }
```

Ensure your backend has proper CORS configured to allow the origin where the widget is embedded.

---

## Using the script tag in your main HTML

Add the tag anywhere in the `<body>` of your page (no container needed):

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your Site</title>
  </head>
  <body>
    <!-- Your site content -->

    <!-- Chatbot widget -->
    <script
      src="https://chatbot-ui-chi-beryl.vercel.app/chatbot-widget.iife.js"
      api_url="https://demo1.sanketsonkusare.me/"
    ></script>
  </body>
</html>
```

That’s it. The floating button appears at the bottom-right; clicking it opens the chat window.

---

## Local development

Prerequisites: Node.js 18+ recommended.

```bash
npm install
npm run dev
```

This runs the React app for development (served from `index.html` via Vite). You can modify the widget UI/logic in `src/components/FloatingChatbot.jsx` and the embed behavior in `src/embed.jsx`.

### Build

```bash
npm run build
```

Outputs production artifacts into `dist/`:

- `dist/chatbot-widget.iife.js` — the embeddable script
- `dist/chatbot-widget.css` — the widget styles

### Testing the embed locally

Open `test.html` in a browser or serve it via a static server. It demonstrates the exact script tag usage.

---

## Self-hosting the assets (optional)

If you prefer to host the files yourself:

```html
<link rel="stylesheet" href="/path/to/chatbot-widget.css" />
<script
  src="/path/to/chatbot-widget.iife.js"
  api_url="https://your.api.example.com"
></script>
```

Note: When using the hosted script from this repo, styles are auto-injected by the script. If you self-host the bundle and do not mirror the same behavior, ensure you also include the stylesheet.

---

## Browser support

Modern evergreen browsers. For older environments, a Promise/fetch polyfill may be required by your host page.

---

## License

MIT (unless otherwise noted).
