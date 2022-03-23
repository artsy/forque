FROM node:16.4-alpine

WORKDIR /app

# Install system dependencies
# Add deploy user
RUN apk --no-cache --quiet add \
  dumb-init && \
  adduser -D -g '' deploy

# Copy files required for installation of application dependencies
COPY package.json yarn.lock ./

# Install application dependencies
RUN yarn install --frozen-lockfile && yarn cache clean

# Copy application code
COPY --chown=deploy:deploy . /app

# Switch to less-privileged user
USER deploy

RUN yarn build

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["yarn", "start"]