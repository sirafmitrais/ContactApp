FROM node:14.17.1 as base

# Add package file
COPY package*.json ./

# Install deps
RUN npm i

# Copy source
COPY src ./src
COPY tsconfig.json ./tsconfig.json

# Build dist into build
RUN npm run build

# Copy node modules and build directory
COPY --from=base ./node_modules ./node_modules
COPY --from=base /build /build

# Expose port 3000
EXPOSE 8000
CMD ["build/src/server.js"]