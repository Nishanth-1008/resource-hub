# Use the official PHP image with Apache for better compatibility
FROM php:8.1-apache

# Enable the Apache rewrite module (if you need clean URLs for routing)
RUN a2enmod rewrite

# Install required PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Set the working directory to the Apache public HTML folder
WORKDIR /var/www/html

# Copy PHP files from the 'server' folder into the container
COPY /var/www/html/

# Set appropriate permissions (if needed)
RUN chown -R www-data:www-data /var/www/html/

# Expose port 80 for Apache
EXPOSE 80

# Start Apache in the foreground
CMD ["apache2-foreground"]
