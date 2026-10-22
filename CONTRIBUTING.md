# 🤝 Contributing to Guthali Naturals

Thank you for your interest in contributing! This guide will help you get started.

## 📋 Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

---

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what's best for the project
- Show empathy towards others

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm
- Git
- Basic knowledge of React, Next.js, and TypeScript

### Setup Development Environment
```bash
# Fork and clone the repository
git clone https://github.com/yourusername/Guthalinaturals.git
cd Guthalinaturals

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local

# Initialize database
npm run db:migrate
npm run db:seed

# Start development server
npm run dev
```

---

## Development Workflow

### Branch Naming
- `feature/` - New features (e.g., `feature/add-wishlist`)
- `fix/` - Bug fixes (e.g., `fix/login-error`)
- `docs/` - Documentation (e.g., `docs/update-readme`)
- `refactor/` - Code refactoring (e.g., `refactor/api-structure`)
- `test/` - Adding tests (e.g., `test/product-api`)

### Workflow Steps
1. Create a new branch from `main`
2. Make your changes
3. Test thoroughly
4. Commit with clear messages
5. Push and create Pull Request
6. Address review feedback

```bash
# Create feature branch
git checkout -b feature/my-new-feature

# Make changes and commit
git add .
git commit -m "feat: add user wishlist functionality"

# Push to your fork
git push origin feature/my-new-feature
```

---

## Coding Standards

### TypeScript
- Use TypeScript for all new files
- Define proper types/interfaces
- Avoid `any` type when possible
- Use meaningful variable names

```typescript
// ✅ GOOD
interface Product {
  id: string;
  name: string;
  price: number;
}

const fetchProduct = async (id: string): Promise<Product> => {
  // implementation
};

// ❌ BAD
const fetchProduct = async (id: any): Promise<any> => {
  // implementation
};
```

### React Components
- Use functional components
- Keep components small and focused
- Extract reusable logic to custom hooks
- Use proper prop typing

```typescript
// ✅ GOOD
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return <button onClick={onClick} className={`btn-${variant}`}>{label}</button>;
}

// ❌ BAD
export function Button(props: any) {
  return <button onClick={props.onClick}>{props.label}</button>;
}
```

### File Organization
```
src/
├── app/              # Next.js pages and routes
├── components/       # Reusable components
│   ├── admin/       # Admin-specific
│   ├── layout/      # Layout components
│   └── ui/          # UI components
├── lib/             # Utilities and helpers
└── styles/          # Global styles
```

### Styling
- Use Tailwind CSS utility classes
- Follow existing design tokens
- Keep custom CSS minimal
- Maintain responsive design

```typescript
// ✅ GOOD - Tailwind utilities
<div className="container mx-auto px-4 py-8">

// ❌ BAD - Inline styles
<div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
```

---

## Commit Guidelines

### Commit Message Format
```
type(scope): subject

body (optional)

footer (optional)
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples
```bash
# Feature
git commit -m "feat(products): add product filtering by category"

# Bug fix
git commit -m "fix(auth): resolve session timeout issue"

# Documentation
git commit -m "docs(readme): update installation instructions"

# With body
git commit -m "feat(cart): add shopping cart functionality

- Add cart context provider
- Create cart UI components
- Implement local storage persistence
- Add unit tests"
```

---

## Pull Request Process

### Before Submitting
- [ ] Code follows project style guidelines
- [ ] All tests pass: `npm run lint`
- [ ] Type checking passes: `npm run type-check`
- [ ] Build succeeds: `npm run build`
- [ ] Changes are tested locally
- [ ] Documentation updated (if needed)
- [ ] No console errors or warnings

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How was this tested?

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests pass
- [ ] Documentation updated
```

### Review Process
1. Maintainer will review your PR
2. Address feedback with new commits
3. Once approved, PR will be merged
4. Your branch will be deleted

---

## Code Review Guidelines

### As a Reviewer
- Be constructive and respectful
- Explain *why* something should change
- Approve if changes are minor
- Request changes if significant issues exist

### As an Author
- Don't take feedback personally
- Ask questions if unclear
- Make requested changes promptly
- Thank reviewers for their time

---

## Testing

### Manual Testing Checklist
- [ ] Feature works as expected
- [ ] No console errors
- [ ] Responsive on mobile/tablet/desktop
- [ ] Works in Chrome, Safari, Firefox
- [ ] Accessible (keyboard navigation)

### Writing Tests (Future)
```typescript
// Example test structure
describe('ProductCard', () => {
  it('renders product name and price', () => {
    // test implementation
  });

  it('calls onClick when clicked', () => {
    // test implementation
  });
});
```

---

## Documentation

### What to Document
- New features
- API changes
- Configuration options
- Breaking changes
- Migration guides

### Where to Add Docs
- `README.md` - Main documentation
- `DEPLOYMENT.md` - Deployment guide
- Code comments - Complex logic
- JSDoc - Functions and components

---

## Getting Help

- **Questions**: Open a discussion in GitHub Discussions
- **Bugs**: Open an issue with reproduction steps
- **Feature Requests**: Open an issue with use case

---

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Given credit in commit history

---

Thank you for contributing to Guthali Naturals! 🌿
