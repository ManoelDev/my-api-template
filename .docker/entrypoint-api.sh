#!/bin/sh

npm install
npx prisma generate dev
npm run dev