#!/usr/bin/python3
# encoding: utf-8
import pymysql
import csv
import sys


# 打开数据库连接
db = pymysql.connect("172.17.0.2", "root", "123456", "antd")

# 使用cursor()方法获取操作游标
cursor = db.cursor()

# SQL 查询语句
sql = "SELECT * FROM " + sys.argv[1]+";"
sqlTitle = "select column_name from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='" +sys.argv[1]+"';"
try:
    # 创建csv文件
    with open('./static/output/'+sys.argv[1]+'.csv', 'w', newline='') as csvfile:
        fieldnames = []
        # 获取列名
        cursor.execute(sqlTitle)
        titleResults = cursor.fetchall()
        for title in titleResults:
            fieldnames.append(title[0])
        # fieldnames = ['song_id', 'song_name', 'author_name', 'song_img','album_name','song_time', 'song_url', 'album_data', 'create_time', 'update_time']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()

        # 执行SQL语句
        cursor.execute(sql)
        # 获取所有记录列表
        results = cursor.fetchall()
        if sys.argv[1] == 'videoList':
            for row in results:
                video_id = row[0]
                video_name = row[1]
                author_name = row[2]
                album_name = row[3]
                video_img = row[4]
                video_time = row[5]
                video_url = row[6]
                album_data = row[7]
                createTime = row[8]
                updateTime = row[9]
                # 将结果写入csv文件中
                writer.writerow({'video_id': video_id, 'video_name': video_name, 'author_name': author_name, 'album_name': album_name, 'video_img': video_img,
                                'video_time': video_time, 'video_url': video_url, 'album_data': album_data, 'create_time': createTime, 'update_time': updateTime})
        elif sys.argv[1] == 'userList':
            for row in results:
                Id = row[0]
                userName = row[1]
                userPass = row[2]
                userRealName = row[3]
                userBirth = row[4]
                userId = row[5]
                createTime = row[6]
                updateTime = row[7]
                # 将结果写入csv文件中
                writer.writerow({'id': Id, 'user_name': userName, 'user_password': userPass,
                                'user_realname': userRealName, 'user_birthday': userBirth, 'user_id': userId, 'create_time': createTime, 'update_time': updateTime})
                # 打印结果
                print(row)
        elif sys.argv[1] == 'imgList':
            for row in results:
                img_id = row[0]
                img_name = row[1]
                img_type = row[2]
                img_top = row[3]
                img_img = row[4]
                createTime = row[5]
                updateTime = row[6]
                # 将结果写入csv文件中
                writer.writerow({'img_id': img_id, 'img_name': img_name, 'img_type': img_type,
                                'img_top': img_top, 'img_img': img_img, 'create_time': createTime, 'update_time': updateTime})
        elif sys.argv[1] == 'songList':
            for row in results:
                songId = str(row[0])
                songName = str(row[1])
                authorName = str(row[2])
                albumName = str(row[3])
                songImg = str(row[4])
                songTime = str(row[5])
                songUrl = str(row[6])
                albumData = str(row[7])
                createTime = str(row[8])
                updateTime = str(row[9])
                # 将结果写入csv文件中
                writer.writerow({'song_id': songId, 'song_name': songName, 'author_name': authorName, 'album_name': albumName,
                                'song_img': songImg, 'song_time': songTime, 'song_url': songUrl, 'album_data': albumData, 'create_time': createTime, 'update_time': updateTime})

except:
    print("Error: unable to fetch data")

# 关闭数据库连接
db.close()
