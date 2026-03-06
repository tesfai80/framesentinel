# Publishing @framesentinel/sdk to npm

## Prerequisites

1. npm account (create at https://www.npmjs.com/signup)
2. Organization scope `@framesentinel` (or use your own scope)
3. npm CLI installed

## Steps to Publish

### 1. Login to npm
```bash
npm login
```

### 2. Build the package
```bash
cd frontend/sdk
npm install
npm run build
```

### 3. Test locally (optional)
```bash
npm pack
# This creates a .tgz file you can test in another project
```

### 4. Publish to npm
```bash
npm publish --access public
```

## Update Version

Before publishing updates:
```bash
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
```

## Verify Publication

After publishing, verify at:
- https://www.npmjs.com/package/@framesentinel/sdk
- Install test: `npm install @framesentinel/sdk`

## Files Included in Package

- `dist/` - Compiled JavaScript and TypeScript definitions
- `README.md` - Documentation
- `LICENSE` - MIT license
- `package.json` - Package metadata

## Files Excluded

- `src/` - Source TypeScript files
- `tsconfig.json` - TypeScript config
- `example.ts` - Example code
- `node_modules/` - Dependencies
