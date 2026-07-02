# Contributing to Smart Parking System

Thank you for considering contributing! Please follow these guidelines.

## Getting Started

1. Fork the repository and clone it locally.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Follow the [setup instructions](README.md#-getting-started) to run the project.

## Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add QR code check-in
fix: resolve slot availability race condition
docs: update API endpoint table
refactor: simplify ParkingService fee calculation
test: add unit tests for JwtUtil
chore: update dependencies
```

## Pull Request Guidelines

- One PR per feature or bug fix
- Include a clear description of what changed and why
- Ensure the project still builds (`mvn package` and `npm run build`)
- Reference any related issues: `Closes #42`

## Code Style

- **Backend**: Standard Java formatting, constructor injection (no `@Autowired` on fields)
- **Frontend**: Functional components with hooks, MUI `sx` prop for styling

## Reporting Issues

Open a GitHub Issue with:
- Clear title
- Steps to reproduce
- Expected vs actual behaviour
- Environment info (OS, Java version, Node version)
