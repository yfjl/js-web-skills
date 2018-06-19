构建images
docker build -t c-main .

启动容器
docker run -d --name c-main c-main

进入容器
docker exec -it c-main env TERM=xterm /bin/bash -l


// baselnmp image:
// Ubuntu 16.04 64位
// mysql 5.7 user root , password root
// php 7.2.6
// nginx 1.14.0
// redis 3.0.6
// nodejs 8.11.3
// mocha 3

phpredis扩展 
https://blog.csdn.net/will5451/article/details/71086420