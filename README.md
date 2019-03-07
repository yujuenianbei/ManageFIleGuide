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
