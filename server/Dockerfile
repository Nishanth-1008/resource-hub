FROM php:8.1-cli

# Install required extensions if needed (e.g., mysqli for MySQL)
RUN docker-php-ext-install mysqli

# Set working directory
WORKDIR /var/www/html

# Copy your PHP files to container
COPY . .

# Expose port
EXPOSE 8080

# Run PHP server
CMD ["php", "-S", "0.0.0.0:8080"]
