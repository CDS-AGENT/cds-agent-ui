# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# MedCare - Clinician Dashboard

A modern, responsive web application for clinicians featuring AI-powered diagnosis assistance, dark/light mode support, and interactive analytics.

## Features

### 🔐 Authentication

- Secure login with username/password
- Session management with local storage
- Mock authentication (use `admin` / `password`)

### 🎛️ Dashboard

- Interactive statistics and charts
- Time-range filtering (7, 30, 90 days)
- Real-time data visualization using Recharts
- Recent activity tracking

### 📊 Analytics & Charts

- **Diagnoses Overview**: Line chart showing total diagnoses vs flagged cases
- **Token Usage**: Bar chart displaying AI tokens consumed vs saved
- **Review Cases**: Pie chart breaking down case statuses (Solved/Pending/In Review)

### 🧭 Navigation

- Collapsible sidebar with smooth animations
- Five main sections:
  - Dashboard (main analytics view)
  - Patients (patient management)
  - Previous Diagnosis (historical data)
  - Flagged for Review (cases needing attention)
  - Configurations (system settings)

### 🎨 Theme Support

- Light/Dark mode toggle
- System theme detection
- Persistent user preference storage
- Smooth theme transitions

### 📱 Responsive Design

- Mobile-friendly layout
- Tablet and desktop optimized
- Accessible keyboard navigation
- ARIA labels for screen readers

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom CSS variables
- **UI Components**: Radix UI primitives + custom shadcn/ui components
- **Charts**: Recharts for interactive data visualization
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Theme Management**: Custom theme provider with local storage

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd cds-agent-ui
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Login Credentials

For demo purposes, use:

- **Username**: `admin`
- **Password**: `password`

## Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components (Button, Card, etc.)
│   ├── dashboard.tsx       # Main dashboard with charts
│   ├── login-page.tsx      # Authentication page
│   ├── sidebar.tsx         # Navigation sidebar
│   ├── layout.tsx          # Main app layout
│   ├── pages.tsx           # Other page components
│   └── theme-provider.tsx  # Theme management
├── contexts/
│   └── auth-context.tsx    # Authentication state management
├── lib/
│   └── utils.ts           # Utility functions
├── App.tsx                # Main app component
├── main.tsx              # App entry point
└── index.css             # Global styles and CSS variables
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Key Components

### Dashboard

- Interactive charts showing diagnoses, token usage, and review cases
- Time-range filtering
- Recent activity tables
- Responsive grid layout

### Sidebar

- Collapsible navigation
- Theme toggle
- User profile dropdown
- Notification badges

### Authentication

- Form validation
- Loading states
- Error handling
- Session persistence

## Customization

### Theme Colors

Edit CSS variables in `src/index.css` to customize the color scheme:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96%;
  /* ... other variables */
}
```

### Adding New Pages

1. Create a new component in `src/components/`
2. Add it to the sidebar menu in `src/components/sidebar.tsx`
3. Include it in the page router in `src/components/layout.tsx`

## Future Enhancements

- Real API integration
- Patient management CRUD operations
- Advanced filtering and search
- Export functionality for reports
- Role-based access control
- Real-time notifications
- Medical imaging integration

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

````js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
````
