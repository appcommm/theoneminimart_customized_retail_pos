# Project Title

Sein Kabar by App.com.mm

## Description

-This is Default Retail POS

## Table of Contents

- [Installation Requirements](#installation-requirements)
- [Installation Instructions](#installation-instructions)
- [Usage](#usage)
- [Configuration](#configuration)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Server Upload Commands and DevOps Procedures](#server-upload-commands-and-devops-procedures)

## Installation Requirements

- PHP ^8.1
- Composer
- MySQL

## Installation Instructions

1. Clone the repository:
   ```bash
    git clone https://github.com/appcommm/sein_kabar_default_retail_pos.git
   ```

2. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

3. Install dependencies:
   ```bash
   composer install
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Generate the application key:
   ```bash
   php artisan key:generate
   ```

6. Run database migrations:
   ```bash
   php artisan migrate --seed
   ```
7. Run dependencies in local
``` 
    npm run dev
```
## Usage

To start the local development server, run:
```bash
php artisan serve
```
Visit [http://localhost:8000] in your browser.

## Configuration

Update your `.env` file with the appropriate database and environment settings.

## Development

- Follow PSR-12 coding standards.
- Use feature branches for development.

## Testing

Run tests using:
```bash
php artisan test
```

## Deployment

1. Pull the latest changes from the repository.
2. Install dependencies:
   ```bash
   composer install --no-dev
   ```
3. Run database migrations:
   ```bash
   php artisan migrate --force
   ```
4. Clear cache:
   ```bash
   php artisan config:cache
   ```

## Server Upload Commands and DevOps Procedures

- Use the following command to upload files to the server:
   ```bash
   rsync -avz --exclude='node_modules' --exclude='.git' ./ username@yourserver:/path/to/your/project
   ```
- Ensure to restart the server or services as needed.

