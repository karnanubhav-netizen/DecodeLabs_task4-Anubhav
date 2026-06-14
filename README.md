# Project 4 — Student Internship Registration Portal

A fully validated, multi-step internship registration form built as part of the **Frontend Development Internship at DecodeLabs (Batch 2026)**. Focuses on real-time form validation, accessibility, and a polished submission flow.

## ✨ Highlights

- Real-time, accessible form validation with ARIA live error messages
- Fields: first/last name, email, phone, college, internship domain, password & confirm password
- Password strength meter (weak → very strong) with visual segments
- Show/hide password toggle for both password fields
- Dynamic application summary card generated from submitted data
- Success modal confirming submission
- "Submit Another Application" reset flow
- Dark mode toggle
- Fully responsive, mobile-first layout

## 📂 Form Flow

1. User fills out the registration form (`#registrationForm`)
2. Inline validation runs on each field (required, email format, phone digits, password match & strength, terms checkbox)
3. On valid submission:
   - Form card hides
   - Summary card displays entered details
   - Success modal appears
4. User can submit another application, resetting the form

## 🛠️ Tech Stack

- HTML5 (with full ARIA support for accessibility)
- CSS3 (CSS variables, glassmorphism, dark/light themes, responsive Grid/Flexbox)
- JavaScript (Vanilla) — form validation, DOM manipulation, dynamic content generation

## 🚀 Getting Started

1. Clone this repository
2. Open `index.html` in your browser

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
open index.html
```

## ♿ Accessibility

- `aria-live` regions for real-time error announcements
- `aria-invalid` and `aria-describedby` on all form fields
- Accessible modal dialog with `role="dialog"` and `aria-modal`

---
© 2026 DecodeLabs · Frontend Development Internship — Project 4
