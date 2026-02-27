# Python Learning Website

A minimal, interactive educational website for teaching Python basics.

## Features
- **Local JSON Database:** Stores Python concepts directly in a local `DATABASE.json` file. No complex database setup required.
- **Interactive UI:** Clean, dark-mode professional interface for browsing concepts, reading descriptions, and viewing code snippets and their outputs.
- **REST API:** Simple Express backend providing data to the React frontend.

## Getting Started

### Prerequisites
- Node.js (v20 or higher)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/python-learning-website.git
   cd python-learning-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5000`.

### Building for Production
```bash
npm run build
npm start
```

## Deployment
Check out the `HOW-TO-RUN.md` file in the repository for detailed instructions on deploying via VPS, Docker, and setting up a domain with HTTPS.

## License
MIT
