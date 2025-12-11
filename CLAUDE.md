# Peptide Calculator

A web-based peptide dilution and dosing calculator.

## Hosting

- **GitHub Repository**: https://github.com/tysszl/peptide-calc
- **Local Development**: `python3 -m http.server 8000` then open http://localhost:8000

## Project Structure

- `index.html` - Single-file application containing all HTML, CSS (Tailwind), and JavaScript (Alpine.js)
- `js/` - Modular JS files (legacy, not currently used - all code is in index.html)
- `css/` - Stylesheet (legacy)

## Key Features

- **Guided Mode**: Step-by-step wizard for new users
- **Advanced Mode**: Quick calculator for experienced users
- Supports Tirzepatide, Retatrutide, and custom peptides
- Visual syringe representation with fill indicator
- Smart BAC water recommendations based on dose range
- Local storage for persisting settings

## Tech Stack

- Alpine.js for reactivity
- Tailwind CSS for styling
- No build step required - runs directly in browser
