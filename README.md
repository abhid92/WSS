# World Spirituality Summit 2026

A static, responsive event website for the World Spirituality Summit 2026, Shanti Manthan. It uses HTML, CSS, and vanilla JavaScript, with no build step.

## Local preview

Run `python3 -m http.server 8765 --bind 127.0.0.1` from this directory and open `http://127.0.0.1:8765/`.

## Active pages

- Home: `index.html`
- About: `about.html`
- Experience: `experience.html`
- Venue: `venue.html`
- Partners: `partners.html`
- Register: `register.html`

Schedule, Speakers, Tickets, and Media are not active pages. Their small redirect files preserve old links: Tickets opens registration, while the others return to the home page. `contact.html` remains a compatibility redirect to registration.

## Forms and event information

Attendee registration and partner enquiries use separate forms with different fields. These are preview forms: they validate in the browser but do not send or store submissions. Connect an approved form service before collecting real leads. Ticket information will be announced later; the attendee form is not a booking or ticket.

The venue page includes an embedded Google Map and route links. Google Maps and Google Fonts require an internet connection. A calendar file is available at `assets/wss-2026.ics`.

## Themes

Three shortlisted palettes can be previewed using the theme control. The selected theme persists between pages. Review `assets/js/theme.js` for the palette and default configuration.

## Publication

The site is a GitHub Pages-compatible static site. Relative paths support project subdirectories. Repository: https://github.com/abhid92/WSS

Visuals are illustrative. Event logistics and participation details should be confirmed by the event team before publication.
