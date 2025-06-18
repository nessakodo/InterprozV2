{
  "project": "interproz-2.0",
  "structure": {
    "root": [
      "README.md",
      ".env.example",
      "package.json",
      "tailwind.config.js",
      "postcss.config.js",
      "next.config.js",
      "tsconfig.json",
      "public/",
      "assets/",
      "lib/",
      "hooks/",
      "utils/",
      "styles/",
      "pages/",
      "components/",
      "layouts/",
      "data/",
      "middleware.ts"
    ],
    "public": [
      "favicon.ico",
      "logo.png",
      "interproz-splash.jpg"
    ],
    "assets": [
      "interpreter-icons/",
      "flags/",
      "videos/hero-loop.mp4"
    ],
    "lib": [
      "supabase.ts",
      "stripe.ts",
      "deepl.ts",
      "whisper.ts"
    ],
    "hooks": [
      "useAuth.ts",
      "useBookings.ts",
      "useTranslation.ts"
    ],
    "utils": [
      "formatTime.ts",
      "languageOptions.ts",
      "calendarUtils.ts"
    ],
    "styles": [
      "globals.css",
      "tailwind.css"
    ],
    "layouts": [
      "MainLayout.tsx",
      "DashboardLayout.tsx"
    ],
    "components": [
      "Navbar.tsx",
      "Footer.tsx",
      "MobileMenu.tsx",
      "LanguageToggle.tsx",
      "JobCard.tsx",
      "BookingForm.tsx",
      "InterpreterCard.tsx",
      "UploadBox.tsx",
      "RatingStars.tsx",
      "AnalyticsWidget.tsx"
    ],
    "pages": {
      "api": [
        "auth/[...nextauth].ts",
        "jobs/index.ts",
        "jobs/[id].ts",
        "documents/index.ts",
        "match.ts",
        "stripe/session.ts"
      ],
      "public": [
        "index.tsx",
        "about.tsx",
        "services.tsx",
        "specialties.tsx",
        "clients.tsx",
        "contact.tsx",
        "login.tsx",
        "signup.tsx"
      ],
      "dashboard": [
        "index.tsx",
        "interpreter.tsx",
        "client.tsx",
        "admin.tsx",
        "[role]/jobs.tsx",
        "[role]/documents.tsx",
        "[role]/messages.tsx"
      ]
    },
    "data": [
      "specialties.json",
      "languages.json",
      "testimonials.json"
    ]
  }
}
