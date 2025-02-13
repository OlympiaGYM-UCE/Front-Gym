# React + Vite

# Front-Gym

A React-based frontend application for gym management built with Vite, featuring HMR (Hot Module Replacement) and ESLint configuration.

## Technologies

- React
- Vite
- ESLint
- React SWC plugin
- Babel plugin

## Features

- Fast Refresh with SWC/Babel
- Modern development environment
- ESLint rules for code quality
- Responsive gym management interface
- Membership management system

## Prerequisites

Before running this application, ensure you have:

- Node.js (version 14 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/OlympiaGYM-UCE/Front-Gym.git
```

2. Navigate to the project directory:
```bash
cd Front-Gym
```

3. Install dependencies:
```bash
npm install
# or
yarn
```

## Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Build

To build for production:

```bash
npm run build
# or
yarn build
```

## Project Structure

```
Front-Gym/
├── src/
├── public/
├── .github/workflows/
├── .env
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

## Available Scripts

- `dev`: Starts development server
- `build`: Builds for production
- `preview`: Preview production build locally
- `lint`: Run ESLint checks

## Vite Plugins

Currently using two official plugins:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) using Babel for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) using SWC for Fast Refresh

## Configuration

The project includes several configuration files:

- `vite.config.js` - Vite configuration
- `eslint.config.js` - ESLint rules
- `.env` - Environment variables

## Deployment

The project is configured with GitHub Actions for AWS deployment. Check the `.github/workflows` directory for deployment configuration.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Project Link: https://github.com/OlympiaGYM-UCE/Front-Gym
