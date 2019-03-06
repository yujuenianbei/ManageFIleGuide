# 各个系统状态码返回值及定义

    200 OK 
    请求正常处理完毕
    204 No Content 
    请求成功处理，没有实体的主体返回
    206 Partial Content 
    GET范围请求已成功处理
    301 Moved Permanently 
    永久重定向，资源已永久分配新URI
    302 Found 
    临时重定向，资源已临时分配新URI
    303 See Other 
    临时重定向，期望使用GET定向获取
    304 Not Modified 
    发送的附带条件请求未满足
    307 Temporary Redirect 
    临时重定向，POST不会变成GET
    400 Bad Request 
    请求报文语法错误或参数错误
    401 Unauthorized 
    需要通过HTTP认证，或认证失败
    403 Forbidden 
    请求资源被拒绝
    404 Not Found 
    无法找到请求资源（服务器无理由拒绝）
    500 Internal Server Error 
    服务器故障或Web应用故障
    503 Service Unavailable 
    服务器超负载或停机维护

## 娱乐系统 ENT

### 音乐

    上传信息(post)：

    1. 歌曲名称  songname  
    2. 歌手      songauthor
    3. 专辑名称   songalbum
    4. 发专时间（date） songalbumdate
    5. 专辑封面(jpg)  songalbumimg
    6. 歌曲文件(mp3)  songfile


    数据库存储信息:

    1.  歌曲uid     song_id(暂时不要)
    2.  歌曲名称    song_name
    3.  歌手姓名    author_name
    4.  专辑名称    album_name
    5.  专辑封面    song_img
    6.  歌曲地址    song_url
    7.  发专时间    album_data
    8.  创建时间    create_time
    9.  更新时间    updata_time

    给前端接口(get):

    1.  歌曲名称    song_name
    2.  歌手姓名    author_name
    3.  专辑名称    album_name
    4.  专辑封面    song_img
    5.  歌曲地址    song_url
    6.  发专时间    album_data
