# TrustHub

A full-stack web application for the **OpenGov Hackathon 2025**, themed "Good Vibes, Great Governance — Building Trust through Data, AI, and Citizen Voices."

## Project Overview

TrustHub is a fact-checking and disinformation mitigation platform that allows users to submit suspicious claims or URLs for verification. The application uses AI (Hugging Face models) and open government data to verify or challenge claims, providing a centralized hub for trustworthy information.

## Features

- Submit suspicious claims or URLs for verification
- AI-powered claim classification (likely true, likely false, or needs review)
- Integration with open government data sources
- Real-time, responsive dashboard of claims and verdicts
- Mobile-friendly and low-bandwidth-ready design
- Progressive Web App (PWA) support for offline access

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Firebase Firestore
- **AI**: Hugging Face models (distilbert-base-uncased-finetuned-sst-2-english)
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase account
- Hugging Face account (for API access)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/trusthub.git
   cd trusthub
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file based on `.env.local.example` and add your Firebase and Hugging Face credentials.

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

6. Seed the database with sample data (optional):
   ```
   curl http://localhost:3000/api/seed
   ```

## Project Structure

- `/src/app/page.tsx` - Home page with claim submission form
- `/src/app/feed/page.tsx` - Feed page displaying all reports
- `/src/app/api/checkClaim/route.ts` - API endpoint for claim verification
- `/src/app/api/submitReport/route.ts` - API endpoint for saving reports
- `/src/app/api/getReports/route.ts` - API endpoint for retrieving reports
- `/src/app/api/opendata/route.ts` - API endpoint for open data sources
- `/src/app/api/stats/route.ts` - API endpoint for report statistics
- `/src/components/` - Reusable UI components
- `/src/lib/` - Utility functions and configurations

## Open Government Data Sources

TrustHub integrates with the following open government data sources:

- Philippine Open Data Portal (https://data.gov.ph)
- FOI Philippines Portal (https://www.foi.gov.ph)
- PSA (Philippine Statistics Authority) (https://psa.gov.ph)
- DBM Transparency Portal (https://dbm.gov.ph/transparency)
- FactsFirstPH Archive (https://www.rappler.com/facts-first)
- CICC Scam Alerts (https://www.cicc.gov.ph)
- OpenSTAT (by PSA) (https://openstat.psa.gov.ph)

## Hackathon Theme

This project addresses the "Fact-Checking & Disinformation Mitigation" theme by creating a centralized platform that combines AI, open government data, and citizen participation to combat misinformation and build public trust.

## License

This project is licensed under the MIT License - see the LICENSE file for details.