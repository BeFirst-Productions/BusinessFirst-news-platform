#!/bin/bash

echo "Ì∫Ä Setting up BusinessFirst News Platform..."
echo ""

# Install dependencies
echo "Ì≥¶ Installing dependencies..."
pnpm install

# Generate Prisma client
echo "Ì¥ß Generating Prisma client..."
cd apps/api
npx prisma generate
cd ../..

echo ""
echo "‚úÖ Setup complete!"
echo ""
echo "Ì≥ã Available commands:"
echo "  pnpm dev          - Start all apps in development mode"
echo "  pnpm build        - Build all apps"
echo "  pnpm docker:dev   - Start Docker services (PostgreSQL + Redis)"
echo ""
echo "Ì¥ó URLs:"
echo "  Website:  http://localhost:3000"
echo "  Admin:    http://localhost:3001"
echo "  API:      http://localhost:5000"
echo ""
echo "‚ö†Ô∏è  Don't forget to:"
echo "  1. Copy apps/api/.env.example to apps/api/.env and update values"
echo "  2. Start Docker services: pnpm docker:dev"
echo "  3. Run database migrations: pnpm db:migrate"
echo "  4. Seed database: pnpm db:seed"
