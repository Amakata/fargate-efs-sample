FROM amazonlinux:2
RUN amazon-linux-extras install nginx1 -y
ADD ./index.html /usr/share/nginx/html/index.html
EXPOSE 80
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]