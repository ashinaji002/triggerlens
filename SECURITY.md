# TriggerLens Security Overview

This document outlines the security boundaries, configurations, and best practices implemented in TriggerLens.

## 1. Security Architecture & Trust Boundaries
TriggerLens uses a client-server architecture to isolate sensitive operations. The React frontend strictly serves as a presentation and interaction layer. Any operation involving external sensitive APIs (such as Google Gemini) is proxied through a secure Vercel Serverless Function (`/api/analyze`). The browser never receives or handles the `GEMINI_API_KEY`.

## 2. Secret Management
- **Environment Variables**: API keys like `GEMINI_API_KEY` are strictly maintained in server-side environments. The `.env.example` file contains no actual credentials.
- **Supabase**: Only the publishable Anon Key (`VITE_SUPABASE_ANON_KEY`) is exposed to the client, which is standard behavior and protected by Row Level Security (RLS). No `service_role` keys are used or exposed.

## 3. Image Upload Validation
All image uploads are treated as untrusted input and validated at two levels (Frontend and Backend) against:
- **MIME Type Allowlist**: Only `image/jpeg`, `image/png`, and `image/webp` are permitted.
- **Size Limitations**: Uploads are restricted to 5MB to prevent oversized payload abuse and resource exhaustion.

## 4. AI Response Validation
Responses from Google Gemini are treated as untrusted external data. The `/api/analyze` endpoint strictly validates the AI's response using **Zod**. If the response violates the schema, hallucinates data, or misses critical evidence constraints, the system safely degrades to an "Unverified" state. The prompt is also hardened against hallucinating medical claims.

## 5. Security Headers & CSP
The application utilizes a Content-Security-Policy (CSP) configured in `vercel.json` to prevent XSS and Clickjacking:
- `frame-ancestors 'none'` prevents the application from being framed.
- Strict origins for scripts, styles, and image processing.

## 6. Error & Logging Policy
Production error states fail gracefully. Generic messages (e.g., "Analysis couldn't be completed") are presented to users. Stack traces, underlying network errors, and raw AI responses are never leaked to the browser console.

## 7. Dependency Security
Dependencies are regularly audited. The application explicitly pins safe versions of libraries (e.g., `react-router-dom`) to mitigate known Common Vulnerabilities and Exposures (CVEs) like CSRF bypasses.

## 8. Known Limitations & Recommendations
- **Rate Limiting**: Currently relies on Vercel's default network limits. For large-scale production, IP-based rate limiting (e.g., Upstash Redis) should be implemented on the `/api/analyze` route.
- **Data Retention**: Uploaded images are kept entirely in memory and are strictly discarded after analysis. They are not persisted to any database.
