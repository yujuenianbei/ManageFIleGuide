# ManageFIleGuide
视频，音乐管理系统

## 使用docker启动

安装mysql  

    docker run -it -p 3306:3306 --name MFG_mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7

手动建一下数据库


    mysql -u root -p 123456

    create DATABASE antd

安装yujuenianbeicentos镜像  

    docker run -it -p3000:3000 -p3001:3001 --link MFG_mysql:db -v /home/ubuntu/demo/ManageFIleGuide:/home/node --name MFG_centos yujuenianbei/yujuenianbeicentos /bin/bash

    -v hostFile:centainerFile

    -p hostIp:containerIp

    --link mysqlName

运行start.sh安装依赖，启动项目

    chmod u+x start.sh

    ./start.sh(sh start.sh)

本人shell真不行　所以前端服务要手动启动　 

    cd front
    sh front.sh

主机访问localhost:3001就可以了


本地虚拟机中（centos）
ngnix
docker run -p 8082:80 -p 8083:443 --name mynginx -v $PWD/:/usr/share/nginx/html -v $PWD/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v $PWD/nginx/conf.d/default.conf:/etc/nginx/conf.d/default.conf -v $PWD/nginx/conf.d:/etc/nginx/conf.d -v $PWD/logs:/var/log/nginx -d nginx

centos
docker run -it -p3000:3000 -p3001:3001 -p3002:3002 -p3003:3003 -p3004:3004 --link MFG_mysql:db -v /home/rooter/web/ManageFIleGuide:/home/node --name mycentos yujuenianbei/yujuenianbeicentos /bin/bash

公司
centos
docker run -it -p3000:3000 -p3001:3001 -p3002:3002 -p3003:3003 -p3004:3004 --link mymysql:db -v /home/ubuntu/demo/ManageFIleGuide:/home/node --name mycentos yujuenianbei/yujuenianbeicentos /bin/bash

nginx
docker run -p 8082:80 -p 8083:443 --name mynginx -v $PWD/:/usr/share/nginx/html -v $PWD/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v $PWD/nginx/conf.d/default.conf:/etc/nginx/conf.d/default.conf -v $PWD/nginx/conf.d:/etc/nginx/conf.d -v $PWD/logs:/var/log/nginx -d nginx


后台地址
192.168.31.31：3002

前台地址
192.168.31.31：3003

接口
192.168.31.31：3000 http
192.168.31.31：3001 https

域名
http://wad.hp.php9.cc:8081
https://wad.hp.php9.cc:8082