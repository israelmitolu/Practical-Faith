# Development Guide

This guide provides detailed instructions for setting up and working with the Practical Faith project.

## Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- Git
- A code editor (VS Code recommended)

## Initial Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/israelmitolu/Practical-Faith.git
   cd Practical-Faith
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:

   ```env
   VITE_API_URL=your_api_url
   VITE_APP_NAME=Practical Faith
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## Development Workflow

### 1. Branch Management

- Create feature branches from `main`
- Use descriptive branch names (e.g., `feature/user-authentication`)
- Keep branches up to date with `main`

### 2. Code Style

- Follow the ESLint configuration
- Use Prettier for code formatting
- Follow TypeScript best practices
- Write meaningful commit messages

### 3. Component Development

1. Create a new component in `src/components`
2. Add TypeScript interfaces
3. Implement the component
4. Add tests
5. Document the component

Example component structure:

```typescript
// src/components/Button/Button.tsx
import React from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  onClick,
}) => {
  return (
    <button className={`button button--${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};
```

### 4. Testing

1. **Unit Tests**

   ```bash
   npm run test
   ```

2. **Coverage Report**

   ```bash
   npm run test:coverage
   ```

3. **E2E Tests**
   ```bash
   npm run test:e2e
   ```

### 5. Building for Production

```bash
npm run build
```

## Common Tasks

### Adding a New Dependency

1. Install the package:

   ```bash
   npm install package-name
   ```

2. Update the documentation if needed
3. Add any necessary configuration

### Creating a New Page

1. Create a new file in `src/pages`
2. Add the route in `src/App.tsx`
3. Implement the page component
4. Add tests
5. Update documentation

### Working with API

1. Create a new service in `src/services`
2. Add TypeScript interfaces
3. Implement API calls
4. Add error handling
5. Add tests

## Debugging

### VS Code Configuration

Add the following to your `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Debug Practical Faith",
      "url": "http://localhost:8080",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

### Common Issues

1. **Dependency Conflicts**

   - Delete `node_modules` and `package-lock.json`
   - Run `npm install`

2. **TypeScript Errors**

   - Check type definitions
   - Update TypeScript version if needed

3. **Build Issues**
   - Clear build cache
   - Check environment variables

## Performance Optimization

1. **Bundle Analysis**

   ```bash
   npm run build:analyze
   ```

2. **Lighthouse Audit**
   - Run Chrome DevTools Lighthouse
   - Address performance issues

## Deployment

1. **Production Build**

   ```bash
   npm run build
   ```

2. **Preview**

   ```bash
   npm run preview
   ```

3. **Deploy**
   - Follow your deployment platform's instructions
   - Update environment variables
   - Monitor deployment logs

## Additional Resources

- [React Documentation](https://reactjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide)
