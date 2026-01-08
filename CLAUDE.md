# Peptide Calculator

A web-based peptide dilution and dosing calculator.

## Commands

python3 -m http.server 8000   # Start local server at localhost:8000

## Tech Stack

- Alpine.js for reactivity
- Tailwind CSS via CDN
- Single-file app - no build step required

## Project Structure

index.html     # Entire app (HTML + CSS + JS)
favicon.svg    # Site icon
PLAN.md        # Detailed spec and design decisions

## Conventions

- Keep everything in index.html (single-file architecture)
- Use Alpine.js x-data for state, x-show/x-if for conditionals
- Tailwind utility classes for all styling

## Reference Docs

- `PLAN.md` - Original design spec with peptide data, reconstitution logic, and UI decisions
- GitHub: https://github.com/tysszl/peptide-calc
