# Stage 1: Base image
FROM nginx:alpine

# Copy the build output from the Angular app to the nginx directory
COPY ./dist/app/browser /usr/share/nginx/html

# Copy nginx config
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]