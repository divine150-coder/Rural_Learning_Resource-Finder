video link "https://youtu.be/PlSKiLXFcpE"
# Rural Learning Resource Finder

## Description
A web app to help rural students discover educational books online using the **Google Books API**. Search by topic, subject, or grade.

## Features
- Search for books
- Filter by author
- Responsive design
- Error handling for network/API issues
- Interactive cards for each book

## Local Setup
1. Clone the repo:
   ```bash
   git clone https://github.com/divine150-coder/rural-learning-ap

## Error Handling

- Handles network errors or API downtime with user-friendly messages.
- Prevents application crashes on invalid API responses.

Steps I used to deployed my app on both web servers 

scp -i "$env:USERPROFILE\.ssh\id_rsa" -r "C:\Users\think Big\Desktop\Project\APIs\rural-learning-app2" ubuntu@<SERVER_IP>:/home/ubuntu/myapp/
ssh -i "$env:USERPROFILE\.ssh\id_rsa" ubuntu@<SERVER_IP>
sudo mkdir -p /var/www/html
sudo cp -r /home/ubuntu/myapp/* /var/www/html/
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html
sudo rm /var/www/html/index.nginx-debian.html
sudo systemctl reload nginx

How I opened the server IP in my browser
Web 01 http://54.162.86.183/
Web 02 
