video link "https://youtu.be/PlSKiLXFcpE"

# Rural Learning Resource Finder:

Is A web application that helps rural students discover educational books online using the Google Books API. Users can search for books by topic, subject, or grade level, making it easier to access learning resources even in areas with limited access to physical libraries.

## Features

Users can enter any learning topic (e.g., Mathematics, Biology, English, and etc)
The app fetches real-time book information from the Google Books API and displays:

- Search for books
- Filter by author
- Error handling for network/API issues


## Responsive Design

The Rural Learning Resource Finder is fully responsive and works smoothly on both desktop and mobile devices, ensuring that students in rural areas can access learning resources using any available device, including smartphones.

The layout adapts automatically to (Mobile screens, Tablets, and Laptops) This makes the application accessible and user-friendly regardless of screen size or device type.

  How to activate

This is a static web application built with: HTML, CSS, Vanilla JavaScript, 

- Simply open the project folder and double-click: index.html The app will launch in your default web browser.
- If you have Python installed, run: python -m http.server 8000 Then open http://localhost:8000 in your browser.

  API Used:

This project uses the Google Books API to retrieve educational book information such as:

 - Title
 - Author
 - Grade
 - Subject
 - Access link
The API allows the application to provide real-time access to learning resources, supporting students with limited access to textbooks and libraries.
  
  File Structure

- index.html The main webpage of the application. It includes: the search input for topics/subjects/grades, the author filter dropdown, the results display area.
- app.js Contains the core logic of the application, including: fetching book data from the Google Books API, displaying search results dynamically, generating author filter options, filtering books by selected author.
- style.css Provides the visual styling of the application: layout and spacing, card design, responsiveness for mobile and desktop.

Deployment steps
1. ssh into my web server-01 nad web server-02
   using: ssh -i ~/.ssh/id_rsa ubuntu@"Ip address"
3.   Inside both servers run:
   sudo apt update
  sudo apt install git nginx -y
   cd /var/www/
4. I cloned my github repo
5. configure Nginx on Both Web Servers
      Open the default Nginx config:
      sudo nano/etc/nginx/sites-available/default
      Save and exit.
      Restart Nginx:
      Sudo service nginx restart
6. Test Web-01:
      
      http://54.162.86.183/

6.Test Web-01:

http://34.207.167.185/
      
 Both should show Rural Learning Resource Finder     

## Configure the Load Balancer (LB-01)
SSH to LB-o1:
ssh -i ~/.ssh/id_rsa ubuntu@35.174.153.21
Install Nginx:

sudo apt update sudo apt install nginx -y

Edit LB config to change upstream and my root to point to my app

sudo nano /etc/nginx/sites-available/default

Restart LB Nginx:

sudo service nginx restart

## Test the Load Balancer
Open LB-01 IP in a browser:

http://35.174.153.21

upstream Rural-resource-finder_app { server 54.162.86.183, 
server 34.207.167.185
}

Configure HAProxy on Load Balancer

First disable nginx to avoid conflict between nginx and laodbalancer because they cannot both listen on port 80/443

Install HAProxy:
sudo apt-get update sudo apt-get install haproxy

Edit HAProxy configuration:
sudo nano /etc/haproxy/haproxy.cfg

Test the HAProxy configuration and start the service:

http://35.174.153.21

sudo haproxy -f /etc/haproxy/haproxy.cfg -c

sudo systemctl restart haproxy

The final step was to enable HTTPs, but since I don't have a domain name to obtain a valid certificate, I was unable to implement it.
