### js-web-skills
js web linux 相关总结，乱七八糟,难度不分先后，随意插入的
nodejs、vue有单独.md文件
***

[1秒破解 js packer 加密](http://www.cnblogs.com/52cik/p/js-unpacker.html)

[了解一下幂等](http://macrochen.iteye.com/blog/678683)

[用JS在浏览器中创建下载文件](http://www.jb51.net/article/47723.htm)


***
####  PHP中strlen和mb_strlen的区别
```
//测试时文件的编码方式要是UTF8  
$str='中文a字1符';  
echo strlen($str).'<br>';//14  4*3+2，中文字符3个字节
echo mb_strlen($str,'utf8').'<br>';//6  
echo mb_strlen($str,'gbk').'<br>';//8  
echo mb_strlen($str,'gb2312').'<br>';//10  
```

***
####  唯一索引 多列约束
```
UNIQUE KEY `unique_service_reason` (`serviceType`,`serviceId`,`direction`,`reason`),
只有这四个项都相同才冲突
```

***
####  websocket 可以解决跨域问题
```
websocket不受同源策略影响，只要服务器端支持，就能实现。

```

***
####  linux 脚本 发送smtp邮件
```
使用三方smtp发送测试

编辑配置文件

vi /etc/mail.rc

添加如下内容

set from=hgxwe@163.com smtp=192.168.1.122 smtp-auth-user=lztest smtp-auth-password=xxxxxxxxxxx smtp-auth=login

# set from=发件地址

# smtp=smtp地址 

# smtp-auth-user=账号 

# smtp-auth-password=密码

# smtp-auth=验证方式

使用如下命令发送

echo "mailtestinLZourgameaccount" | mail -s "test0325" xxx@ourgame.com

# echo为正文内容   -s 标题



```
***
####  多重循环下的break
```
php 一个break只跳出一层循环，跳多层循环可以用goto
js也类似
当执行多重循环的时候

break的情况
outer:
for(var i=0;i<10;i++){
 inter:
  for(var j=0;j<10;j++){
    if(i>5){
    console.log(i); ----6 
     break outer;
    }
  } 
 }

 continue的情况

var num=0;
outer:
for(var i=0;i<10;i++){
 inter:
  for(var j=0;j<10;j++){
    if(i>5){
    console.log(i); ----6,7,8,9 
     continue outer;
    }
    num++;  
  } 
 }
 console.log(num);     --- 60
```

***
####  npm初始化一个nodejs项目
```
npm init 
老是忘记，

nvm ls // 查看当前node版本和列表
nvm use 9 //切换至node9版本
nvm i 9 //安装node 9版本

npm i -g mocha@3  //全局方式安装mocha
```

***
####  sql 重复冲突容错写法
```
$sql = $this->db->get_compiled_insert(self::TBL_EMAIL_CODE).' ON DUPLICATE KEY UPDATE code = VALUES(code),time = VALUES(time)';

```

***
####  PHP的替代语法
```
https://www.cnblogs.com/passby/p/4670186.html

http://codeigniter.org.cn/user_guide/general/alternative_php.html
```

***
####  php 编译扩展 安装扩展
```
https://www.jianshu.com/p/f1a100ee9e3f
https://zhuanlan.zhihu.com/p/27210889

主要步骤：(最好下载合适的php版本自带的ext)
进入php7.1.17/ext/gmp 目录下面运行phpize
然后./configure  --with-php-config = /usr/local/php/bin/php-config
然后 sudo make && sudo make install
成功生成gmp.so后，修改php.ini添加 extension = gmp.so

已经写成脚本参见：自己编写的shell/gmp_install.sh
```

***
####  phpstorm 代码格式化快捷键
```
ctrl+alt+l        重新格式化代码 
mac：Ctrl+option+l

快速方法注释
Alt+Shift+j---phpdoc 或者鼠标右键---generate--phpdoc
```

***
####  MySQL server PID file could not be found!
```
DOCKER 内安装了ubuntu 里的mysql可能会没有权限，需要whereis my.cnf,chmod -R 777 xxxx

```

***
####  Linux 查找大文件
```
 find xxx目录 -type f -size +500M
```


***
####  Git .gitignore 设置为全局global gitignore_global
```
https://www.cnblogs.com/Cherry-B/p/4583505.html
最主要是这句
git config --global core.excludesfile ~/.gitignore_global

```

***
####  Docker 笔记
```
https://www.awaimai.com/665.html
apt-get install net-tools
查看ifconfig

1、linux 安装
  sudo wget -qO- https://get.docker.com/ | sh
  sudo usermod -aG docker imooc
  如果出现Delta RPMs disabled because /usr/bin/applydeltarpm not installed. 报错参考下面：
  https://www.tutugreen.com/wordpress/delta-rpms-disabled/
更简单的方法：
  $ sudo yum install docker
  安装之后启动 Docker 服务，并让它随系统启动自动加载。
  $ sudo service docker start
  $ sudo chkconfig docker on


参考：
https://www.imooc.com/video/15643

强制删除全部images
docker rmi --force  $(docker images -q)

运行镜像成容器
docker run -dit ubuntu-full-simply
docker run -idt -p 80:80 7e9984b10b5b
（可以同时映射多个-p的 ）
mysql 存储 映射到本机 -v db-m-main:/usr/local/mysql/var/

如果一run就Exited (1)的话可以 docker logs -f container_id查看日志

exec user process caused "exec format error"
基本就是shell脚本的格式问题，比如最开头不是#!/bin/bash

进去ubuntu内部
docker attach 2cc348500c17
在运行的容器中执行命令
docker exec -it mynginx /bin/sh /root/runoob.sh
保存镜像
docker commit -a "bajian" -p -m "mylnmp" b67ac2d45828  myubuntu:v1 
-a, --author=""     Author (e.g., "John Hannibal Smith <hannibal@a-team.com>")
  -m, --message=""    Commit message
  -p, --pause=true    Pause container during commit
docker commit -a "bajian" -p -m "baselnmp" 2f93d0765188  baselnmp:v1 
停止镜像
docker stop container_id

常见错误及解决

conflict: unable to delete 48b5124b2768 (must be forced) - image is referenced in multiple repositories
docker rmi -f 48b5124b2768

Unable to delete id_xxx, image has dependent child images
查看id_xxx的child images: 
docker inspect –format=’{{.Id}} {{.Parent}}’ $(docker images –filter since=id_xxx -q)

docker镜像文件导入与导出
sudo docker save -o quay.io-calico-node-1.tar quay.io/calico/node 
会在当前目录下生成导出文件xxx.tar，然后将此文件下载到本地

在开发环境导入上述打包的镜像
docker load -i quay.io-calico-node-1.tar
然后修改别名 docker tag xxxx id

拷贝文件
docker cp be0e2a0baf4f:/root/go/src/cashaddr-converter/ /Applications/XAMPP/xamppfiles/code/server/cashaddr-converter/
docker cp diraa/ xxxx:dirbbb/


流程
pull一个ubuntu镜像
attach进去，安装lnmp
sudo apt-get install -y Dialog
sudo apt-get install -y supervisor
sudo mkdir -p /var/log/supervisor
sudo touch /var/log/supervisor/info.log
你需要去基础镜像执行这几条命令 然后再commit一次

你commit 完以后    然后找个文件夹  新建两个文件   Dockerfile  和 supervisord.conf
Dockerfiel 写：
FROM ubuntu:build
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
ENTRYPOINT /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
FROM 后面是你刚才commit的那个镜像

然后supervisord.conf里面写：
[supervisord]
nodaemon=true

[program:mysql]
command=sh /etc/init.d/mysql restart
startretries=1
priority=1
stopasgroup=true
killasgroup=true

program 是你要启动的程序  像我这个是启动mysql  你也可以启动php

[program:nginx]
command=sh /etc/init.d/nginx restart
startretries=1
priority=1
stopasgroup=true
killasgroup=true

[program:php-fpm]
command=sh /etc/init.d/php-fpm restart
startretries=1
priority=1
stopasgroup=true
killasgroup=true


docker build -t xxx:xxxx .
然后build完后     你再  docker run -dit xxx:xx bash

后面可以通过 Jenkins 管理镜像（每次需要build  然后再push   它能点一下  然后帮你build 和push）
然后使用  kubernetes 部署镜像

一个php项目的dockerfile实例
FROM registry.cn-shenzhen.aliyuncs.com/xxx:3.1

RUN mkdir /home/wwwroot/login_server

WORKDIR /home/wwwroot/login_server
COPY ./ /home/wwwroot/login_server

RUN mkdir /home/wwwroot/login_server/runtime/logs \
    && mkdir /home/wwwroot/login_server/runtime/debug \
    && chmod -R 777 /home/wwwroot/login_server/runtime \
    && chmod -R 777 /home/wwwroot/login_server/assets


one in stein mysql5.7在随着docker镜像迁移后无法正常启动
修改own：
chown -R mysql:mysql  /data/mysql
chown -R mysql:mysql  /usr/local/mysql

export PATH=$PATH:/usr/local/mysql/bin


Dockerfile创建镜像 
通过Docker Build 创建镜像。 
命令读取指定路径下（包括子目录）所有的Dockefile，并且把目录下所有内容发送到服务端，由服务端创建镜像。另外可以通过创建.dockerignore文件（每一行添加一个匹配模式）让docker忽略指定目录或者文件

格式为Docker Build [选项] 路径 
需要制定标签信息，可以使用-t选项 
例如：Dockerfile路径为 /tmp/docker_build/，生成镜像的标签为build_repo/my_images 
$dudo docker build -t build_repo/my_images /tmp/docker_build/

```

***
####  php 比较字符串或文章的相似度
```
similar_text("吉林禽业公司火灾已致112人遇难","吉林宝源丰禽业公司火灾已致112人遇难",$percent);
var_dump($percent . '%') ;
var_dump(number_format(($percent), 2, '.', '') . '%');

similar_text(string1,string2,percent)
参数  描述
string1 必需。规定要比较的第一个字符串。
string2 必需。规定要比较的第二个字符串。
percent 可选。规定供存储百分比相似度的变量名。
```



***
####  阿里云 数据盘挂载和扩容
```
https://help.aliyun.com/document_detail/25452.html?spm=5176.doc25445.6.173.XKkyJu
```

***
####  mysql 关于排序规则
```
数据库中的排序规则用来定义字符在进行排序和比较的时候的一种规则。常见的如下： 
（1） utf8_general_ci 不区分大小写，utf8_general_cs 区分大小写 
（2） utf8_bin 规定每个字符串用二进制编码存储，区分大小写，可以直接存储二进制的内容
```

***
####  检查linux下占用cpu高的进程详细信息
```
1. top -c 查出对应的命令以及pid,

2. cd /prox/pid

3. ls -l，显示的cwd以及exe就可以看出具体是哪条命令启动了这个占用CPU巨大的任务！
```

***
####  响应式图片srcset全新释义sizes属性w描述符
```
http://www.zhangxinxu.com/wordpress/2014/10/responsive-images-srcset-size-w-descriptor/?utm_source=tuicool&utm_medium=referral
```

***
####  document.referrer 获取来路url和当前url地址
```
document.referrer
注：js中的referer是referrer不是referer，即：document.referrer，不要写错！  

```

***
####  composer 执行脚本 http://docs.phpcomposer.com/articles/scripts.html
```
composer run-script post-update-cmd

```

***
####  apache/Nginx下的PHP/Ruby执行sudo权限的系统命令
```
http://www.4wei.cn/archives/1001469

```

***
####  laravel 监听数据库查询，打印相关query，优化性能 & with 优化
```

laravel model非常强大易用，通过简单的一两行代码我们就可以创建强大的关系结构，但是随着应用复杂度增大，系统的性能可能快速下降，这时通过监察系统对数据库查询的频率就可以对优化有一些思路:

Event::listen('illuminate.query',function($sql){
  var_dump($sql); //通过监听illuminate.query事件，就能大概搞清楚系统的瓶颈，对于relation操作往往会有一个N+1 problem可以优化
});
我们通过with方法一次性地取出数据记录同时取出对应的relation数据，则可以大大优化数据库查询的次数:

$projects = Project::with('owner')->remember(10)->get(); //【remember laravel5.5好像不能使用了】
上面的代码只需要执行2次数据库查询，同时放到cache中10分钟，这将大大提高系统的性能.

但是能用下面的：
$a = Cache::remember(env('KEY_CACHE_BANNER'), env('KEY_CACHE_BANNER_TIME'), function() {
        return Article::where('istop','1')
            ->where('ispublished','1')->orderBy('id', 'desc')
            ->withCount('collections')->take(10)->get();
    });
```

***
####  如何获取http://xxx.com/yy?q=zz#/urlafterhashbound/mm整个url?
```
我们知道url中的#后面的内容是为浏览器客户端来使用的，【永远不会送往server端】，那么如果服务器端希望得到这个信息，又该如何处理呢？一个可行的方案是在url中将#后面的内容转换为querystring，这样后端就能够得到这个信息加上fullurl()函数就能拼凑出整个url
```

***
####  laravel 执行migration报错 SQLSTATE[42000]: Syntax error or access violation: 1071 Specified key was too long; max key length is 1000 bytes
```
1、
db 的config 'strict' => true, 改成false
2、
这也应该就是Laravel 5.4改用4字节长度的utf8mb4字符编码的原因之一。不过要注意的是，只有MySql 5.5.3版本以后才开始支持utf8mb4字符编码（查看版本：selection version();）。如果MySql版本过低，需要进行版本更新。
升级MySql版本到5.5.3以上。
手动配置迁移命令migrate生成的默认字符串长度，在AppServiceProvider中调用Schema::defaultStringLength方法来实现配置：
    use Illuminate\Support\Facades\Schema;

    /**
* Bootstrap any application services.
*
* @return void
*/
public function boot()
{
   Schema::defaultStringLength(191);
}

http://blog.csdn.net/qq_15766181/article/details/71126648
```

***
####  laravel 安装指定版本
```
composer create-project laravel/laravel MyProject "5.5.*"

phpstudy配置php指定版本 如7.1.11
http://www.cnblogs.com/yxhblogs/p/7861323.html
```

***
####  console 打印彩色字体。。
```
console.log("%c这是一段彩色的字体","background-image:-webkit-gradient( linear, left top,right top, color-stop(0, #4096EE), color-stop(0.15, #FF1A00), color-stop(0.3, #4096EE), color-stop(0.45, #FF1A00),color-stop(0.6, #4096EE), color-stop(0.75, #FF1A00),color-stop(0.9, #4096EE), color-stop(1, #FF1A00));color:transparent;-webkit-background-clip:text;font-size:10px;");

```

***
####  WINDOWS 环境下laravel 项目目录千万不可以用中文
```
否则在静态文件解析上会出问题。无法访问，要么500要么404
其他php代码是可以正常访问的，所以这个bug很不好找
```
***
####  理解CSS3中的background－size(对响应性图片等比例缩放)   图片 background 缩放自适应
```
固定宽度400px和高度200px－使用background－size:400px 200px缩放设置
固定宽度400px和高度200px－使用background-size:100% 100%的缩放设置

footer .company-code {
    background: url("../images/company_code.png");
    width: 130px;
    height: 130px;
    background-size: 130px 130px;
}
```

***
####  微信小程序用户拒绝授权后可以弹出setting让用户选择
```

function getUserInfo() {
  return new Promise(function (resolve, reject) {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          //wx.openSetting()
          wx.showModal({
            title: '未授权获取用户信息',
            showCancel: false,
            content: '请允许授权，否则无法登录账号。请谨慎选择，拒绝后短时间内无法再次发起授权，将影响您的正常使用',
            success: function (res) {
              if (wx.authorize)
                wx.authorize({
                  scope: 'scope.userInfo',
                  success(err) {
                    console.log('scope.userInfo', err)
                    wx.getUserInfo({
                      withCredentials: true,
                      success: function (res) {
                        resolve(res);
                      },
                      fail: function (err) {
                        reject(err);
                      }
                    })
                  },
                  fail(err){
                    wx.openSetting()
                    reject(err);
                  }
                })
                else
                wx.getUserInfo({
                  withCredentials: true,
                  success: function (res) {
                    resolve(res);
                  },
                  fail: function (err) {
                    reject(err);
                  }
                })
            }
          })
          
        }else{
          wx.getUserInfo({
            withCredentials: true,
            success: function (res) {
              resolve(res);
            },
            fail: function (err) {
              reject(err);
            }
          })
        }
      }
    })

    
  });
}

```

***
####  当使用strpos 或者strstr等查找字符串的时候，一定要两个都是字符串，不能有整形等
```
var_dump(strstr($pre,strval($obj->activities[0]->id)));//正确
var_dump(strstr($pre,$obj->activities[0]->id));//错误，诡异
以上第二种写法 在php7会出现诡异的错误
```

***
####  监听网页返回 和 微信内关闭页面
```
history.pushState({}, "", "");
      //关闭浏览器窗口
      $(window).on('popstate', function(){
      var r=confirm("要关闭页面吗？");
      if (r) {wx.closeWindow();}
      history.pushState({}, "", "");
      
      return;
      });

```

***
####  调研了下直播 播放器方案
```
看了下主流方案，手机端用的hls,PC端用的rtmp转flash妥协，然后播放器就是videojs
主要分 
1、推流（电脑端直接用OBS https://obsproject.com/）、
2、服务器 （srs https://github.com/ossrs/srs rtmp实测3秒延迟、nginx rtmp模块 https://github.com/arut/nginx-rtmp-module,测试 rtmp 5秒延迟，hls 30秒延迟）、
3、拉流 （电脑端直接VLS 简单粗暴 http://www.videolan.org/vlc/）
三部分做测试，然后可以替换各个实现部分
入门可以参考http://blog.csdn.net/lmj623565791/article/details/77937483
（注意OBS rtmp里 url 填写rtmp://192.168.1.28/bajian，流名称 mylive 才会组合成下面的地址）
（注意OBS hls里 url 填写http://192.168.1.28/hls，名称 mylive 才会组合成下面的地址）
rtmp://192.168.1.28/bajian/mylive
http://192.168.1.28/hls/mylive.m3u8
nginx-rtmp 安装 见下面 【安装成功的nginx如何添加未编译安装模块 【nginx-rtmp-module安装过程】】
h5直接播放m3u8格式：https://github.com/huangyaoxin/hLive
```

***
####  安装成功的nginx如何添加未编译安装模块 【nginx-rtmp-module安装过程】
```
原已经安装好的nginx，现在需要添加一个未被编译安装的模块
举例说明：安装第三方的ngx_cache_purge模块（用于清除指定URL的缓存）
nginx的模块是需要重新编译nginx，而不是像apache一样配置文件引用.so
/usr/local/nginx/sbin/nginx -V 查看原来的依赖

bajian@ubuntu:~/Desktop/lnmp$ /usr/local/nginx/sbin/nginx -V
nginx version: nginx/1.12.1
built by gcc 5.4.0 20160609 (Ubuntu 5.4.0-6ubuntu1~16.04.4) 
built with OpenSSL 1.0.2l  25 May 2017
TLS SNI support enabled
configure arguments: --prefix=/usr/local/nginx --user=www --group=www --with-http_stub_status_module --with-http_v2_module --with-http_ssl_module --with-http_gzip_static_module --with-http_realip_module --with-http_flv_module --with-http_mp4_module --with-openssl=../openssl-1.0.2l --with-pcre=../pcre-8.41 --with-pcre-jit --with-ld-opt=-ljemalloc

tar xzf nginx-1.12.1.tar.gz 
cd nginx-1.12.1/
git clone https://github.com/arut/nginx-rtmp-module

./configure --prefix=/usr/local/nginx --user=www --group=www --with-http_stub_status_module --with-http_v2_module --with-http_ssl_module --with-http_gzip_static_module --with-http_realip_module --with-http_flv_module --with-http_mp4_module --with-openssl=../openssl-1.0.2l --with-pcre=../pcre-8.41 --with-pcre-jit --with-ld-opt=-ljemalloc --add-module=/home/bajian/Desktop/lnmp/src/nginx-1.12.1/nginx-rtmp-module
sudo make，不要make install会覆盖

需要替换nginx二进制文件,先备份一下原来的启动脚本。
sudo cp /usr/local/nginx/sbin/nginx /usr/local/nginx/sbin/nginx.bak

关闭nginx 再复制再启动
sudo killall nginx
sudo cp ./objs/nginx /usr/local/nginx/sbin/
/usr/local/nginx/sbin/nginx -V 查看下是不是已经加入了。
sudo /usr/local/nginx/sbin/nginx

/usr/local/nginx/conf/nginx.conf 添加最外层

rtmp {  
    server {  
        listen 1935;  
  
        application comrtmp {  
            live on;  
        }  
        application hls {  
            live on;  
            hls on;  
            hls_path /tmp/hls;  
        }  
    }  
}

然后,针对hls,还需要在http里面增加一个location配置
# Incoming stream must be in H264/AAC.For iPhones use baseline H264
location /hls {  
            types {  
                application/vnd.apple.mpegurl m3u8;  
                video/mp2t ts;  
            }  
            root /tmp;  
            add_header Cache-Control no-cache;
            add_header 'Access-Control-Allow-Origin' '*';
}

iptables -I INPUT -p tcp -m tcp --dport 8585 -j ACCEPT
sudo mkdir /tmp/hls
sudo chmod -R 777 /tmp/hls
重启nginx
上面这两个流的地址分别是:
第一个就是推送的地址: rtmp://serverIp:1935/comrtmp/bajian
rtmp://192.168.1.28/comrtmp/mylive

第二个是HTTP地址: http://serverIp:8080/hls/test2.m3u8
http://192.168.1.28/hls/mylive.m3u8
参考：
http://redstarofsleep.iteye.com/blog/2123752

```

***
####  VM ubuntu 怎么进入命令行界面/图像界面
```

Ctrl + Alt + f1 //命令行
Ctrl + Alt + f7 //图像界面

```
***
####  js 手机号中间四位打*
```
 function hidePhoneNum(phone){
    return phone.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2");
 }

 var hidePhoneNum=(phone)=>{
    return phone.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2");
 };

function hidePhoneNum($phone){
    $pattern = '/(\d{3})\d{4}(\d+)/i';
    $replacement = '${1}****$2';
    return preg_replace($pattern, $replacement, $phone);
}
```

***
####  关于PUSH 推送 调研
```
融云PUSH 开发环境免费，上线 收费1200/月
JPUSH 免费，受限于 共享20w次/秒

```

***
####  linux 系统如何设置先等普通用户在转到root用户下
```

sudo vi /etc/sudoers
bajian    ALL=(ALL:ALL) ALL
:wq!

```
***
####  有时候和别人对接接口的时候，请求过来的数据经过了GZIP压缩，乱码
```
mb_detect_encoding 检测出来的现实CP936，（GBK的一种）只会误导你去转码，其实并没有卵用

有效的方式是GZIP解压缩
phpGZIP解压缩函数：
1. 使用自带的zlib库
如果服务器已经装了zlib库，用下面的代码可以轻易解决乱码问题。
复制代码 代码如下:

$data = file_get_contents("compress.zlib://".$url);

2. 使用CURL代替file_get_contents
复制代码 代码如下:

function curl_get($url, $gzip=false){
 $curl = curl_init($url);
 curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
 curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 10);
 if($gzip) curl_setopt($curl, CURLOPT_ENCODING, "gzip"); // 关键在这里
 $content = curl_exec($curl);
 curl_close($curl);
 return $content;
}

3. 使用gzip解压函数
$html=file_get_contents('http://www.jb51.net/');
$html=gzdecode($html);

function gzdecode($data) { 
  $len = strlen($data); 
  if ($len < 18 || strcmp(substr($data,0,2),"\x1f\x8b")) { 
    return null;  // Not GZIP format (See RFC 1952) 
  } 
  $method = ord(substr($data,2,1));  // Compression method 
  $flags  = ord(substr($data,3,1));  // Flags 
  if ($flags & 31 != $flags) { 
    // Reserved bits are set -- NOT ALLOWED by RFC 1952 
    return null; 
  } 
  // NOTE: $mtime may be negative (PHP integer limitations) 
  $mtime = unpack("V", substr($data,4,4)); 
  $mtime = $mtime[1]; 
  $xfl   = substr($data,8,1); 
  $os    = substr($data,8,1); 
  $headerlen = 10; 
  $extralen  = 0; 
  $extra     = ""; 
  if ($flags & 4) { 
    // 2-byte length prefixed EXTRA data in header 
    if ($len - $headerlen - 2 < 8) { 
      return false;    // Invalid format 
    } 
    $extralen = unpack("v",substr($data,8,2)); 
    $extralen = $extralen[1]; 
    if ($len - $headerlen - 2 - $extralen < 8) { 
      return false;    // Invalid format 
    } 
    $extra = substr($data,10,$extralen); 
    $headerlen += 2 + $extralen; 
  }
  $filenamelen = 0; 
  $filename = ""; 
  if ($flags & 8) { 
    // C-style string file NAME data in header 
    if ($len - $headerlen - 1 < 8) { 
      return false;    // Invalid format 
    } 
    $filenamelen = strpos(substr($data,8+$extralen),chr(0)); 
    if ($filenamelen === false || $len - $headerlen - $filenamelen - 1 < 8) { 
      return false;    // Invalid format 
    } 
    $filename = substr($data,$headerlen,$filenamelen); 
    $headerlen += $filenamelen + 1; 
  }
  $commentlen = 0; 
  $comment = ""; 
  if ($flags & 16) { 
    // C-style string COMMENT data in header 
    if ($len - $headerlen - 1 < 8) { 
      return false;    // Invalid format 
    } 
    $commentlen = strpos(substr($data,8+$extralen+$filenamelen),chr(0)); 
    if ($commentlen === false || $len - $headerlen - $commentlen - 1 < 8) { 
      return false;    // Invalid header format 
    } 
    $comment = substr($data,$headerlen,$commentlen); 
    $headerlen += $commentlen + 1; 
  }
  $headercrc = ""; 
  if ($flags & 1) { 
    // 2-bytes (lowest order) of CRC32 on header present 
    if ($len - $headerlen - 2 < 8) { 
      return false;    // Invalid format 
    } 
    $calccrc = crc32(substr($data,0,$headerlen)) & 0xffff; 
    $headercrc = unpack("v", substr($data,$headerlen,2)); 
    $headercrc = $headercrc[1]; 
    if ($headercrc != $calccrc) { 
      return false;    // Bad header CRC 
    } 
    $headerlen += 2; 
  }
  // GZIP FOOTER - These be negative due to PHP's limitations 
  $datacrc = unpack("V",substr($data,-8,4)); 
  $datacrc = $datacrc[1]; 
  $isize = unpack("V",substr($data,-4)); 
  $isize = $isize[1];
  // Perform the decompression: 
  $bodylen = $len-$headerlen-8; 
  if ($bodylen < 1) { 
    // This should never happen - IMPLEMENTATION BUG! 
    return null; 
  } 
  $body = substr($data,$headerlen,$bodylen); 
  $data = ""; 
  if ($bodylen > 0) { 
    switch ($method) { 
      case 8: 
        // Currently the only supported compression method: 
        $data = gzinflate($body); 
        break; 
      default: 
        // Unknown compression method 
        return false; 
    } 
  } else { 
    // I'm not sure if zero-byte body content is allowed. 
    // Allow it for now...  Do nothing... 
  }
  // Verifiy decompressed size and CRC32: 
  // NOTE: This may fail with large data sizes depending on how 
  //       PHP's integer limitations affect strlen() since $isize 
  //       may be negative for large sizes. 
  if ($isize != strlen($data) || crc32($data) != $datacrc) { 
    // Bad format!  Length or CRC doesn't match! 
    return false; 
  } 
  return $data; 
}

```

***
####  七牛客户端上传图片
```
1、获取ak sk
2、创建activity空间
3、composer require qiniu/php-sdk
4、
    public function qiniukey($version,Request $request){
        $bucket=$request->input('bucket','activity');
        $auth = new QiniuAuth(env('QINIU_AK'), env('QINIU_SK'));
        $upToken = $auth->uploadToken($bucket);
        return $this->toJson(0,'',$upToken);
    }
5、客户端获取TOKEN，并携带TOKEN上传图片到七牛 export const  api_uploadQiniuUrl="https://upload-z1.qiniup.com"
获取key：
getQiniuKey() {
      if (!this.qiniu_key) {
        myajax.cpost(api_uploadQiniuKey,{
          bucket:'activity'
              },(data)=>{
                  if (data && data.code!==0)
                      return Toast.error(data.msg||'请求失败')
                    this.qiniu_key=data.data
                    console.log('api_uploadQiniuKey ',data.data);
              })
      }
      },
上传文件：
            myajax.file(api_uploadQiniuUrl,{
                'file':f.files[0],
                'token':this.qiniu_key,
            },(data)=>{
                this.multi_posting=false
                if (data && !data.key)
                    return alert('请求失败')
                this.cover=window.config.QINIU_PREFIX+data.key
                Toast.info('图片提交成功')

            },(e)=>{
              console.error(e)
                this.multi_posting=false
                return alert('请求失败，请稍后重试')
            })
上传部分参考https://developer.qiniu.com/kodo/manual/1272/form-upload
存储区域 域名https://developer.qiniu.com/kodo/manual/1671/region-endpoint
```


***
####  linux 查看监听的端口
```
netstat -lnt
netstat -ano

-a (all)显示所有选项，默认不显示LISTEN相关
-t (tcp)仅显示tcp相关选项
-u (udp)仅显示udp相关选项
-n 拒绝显示别名，能显示数字的全部转化成数字。
-l 仅列出有在 Listen (监听) 的服務状态

-p 显示建立相关链接的程序名
-r 显示路由信息，路由表
-e 显示扩展信息，例如uid等
-s 按各个协议进行统计
-c 每隔一个固定时间，执行该netstat命令。

```

***
####  Linux中的pushd和popd
```
0、使用cd -进行目录切换 【cd -中，-就相当于变量$OLDPWD。cd -就相当于cd $OLDPWD】
$ pwd
/home/lfqy
$ cd /
$ cd -
/home/lfqy
1、
同时假设当前工作目录为 c:\windows
eg..输入命令： pushd d:\example

则说明 将当前工作目录c:\windows压入栈中，并将改变工作目录路径为d:\example
这时候, dir命令看到的是d:\example下的文件, 

```

***
####  Xshell 连接本地 VM ubuntu
```
http://www.linuxidc.com/Linux/2016-08/134086.htm
最重要两步是 安装【sudo apt-get install ssh】并开始ssh 【service sshd start】
【第五步 – 更改虚拟机网络连接方式 这个是关键点：网卡设置成桥接模式】

```
***
####  github 创建静态页面，项目展示页面
```
在上传的项目创建 gh-pages 分支 
http://blog.csdn.net/irouduoduo/article/details/72614468

如果是展示vue的demo page，build后，需要替换下index.html 下的资源路径：
如:
/static==>https://bajian.github.io/vue-slider/dist/static
访问路径为：【可能创建后几分钟才能访问】
https://bajian.github.io/vue-slider/dist/

```

***
#### 把github 当服务器使用
```
http://rawgit.com/
```

***
#### 图片裁剪中间展示 适配手机端
```
object-fit: cover;
参考homepage文件夹
http://www.zhangxinxu.com/wordpress/2015/03/css3-object-position-object-fit/
```

***
####  js获取最上层window对象的架构思路 （做浏览器插件很需要注意）
```
window.top.location.href

function isXUrl(x){
    // return window.location.href.indexOf("origin")!=-1 &&
    //  window.location.href.indexOf("\/store\/browse")==-1 && 
    //  window.location.href.indexOf("store\/")!=-1 
    console.log('test',parent.location.href,location.href,top.location.href);
    return  (location.host.indexOf(x)!==-1) ;
    // return  (location.href.indexOf("origin.com")!==-1 && (parent.location.href== location.href == window.top.location.href)) ;
}
```

***
####  php linux ffmpeg amr 转mp3
```
$re=exec("ffmpeg -i $amrDir.amr $mp3Dir.mp3");
更多命令查看
http://blog.csdn.net/king1425/article/details/70348374
```

***
####  JS 终止执行的实现方法
```
如果觉得if不优雅。。那么：
(一)在function里面
（1）return;
（2）return false;
(二)非function方法里面，抛异常
alert("before error.");
//throw SyntaxError();
throw "————————";
alert("after error.");

```

***
####  面试题JS
```
var aa="aa";
alert(aa instanceof String); //false
typeof aa; //'string'
在这里aa只是一个以string为数据类型的值 并不是String的实例对象  
var b=new String(aa);
alert(b instanceof String);  //ture
此时b就是String类的实例对象了



PHP中一共有八种数据类型，
包括4中标量数据类型，即boolean（布尔类型）integer（整型），float/double（浮点型）和string（字符串型）
两种复合数据类型，即array（数组）和object（对象）， 两种特殊的数据类型：即resource（资源）与 null （无，空白）；
简单记忆：
ibfs 
roan

es6 7种

unbosns

undefined null boolean object string number symbol
Null类型
null类型被看做空对象指针，前文说到null类型也是空的对象引用。只有一个值，即null值，所以，在你 用typeof 操作符去检测null类型的值时，结果是object类型。

var z=10
function foo(){
  console.log(z)
}
(function(funArg){
  var z=20
  funArg()
})(foo)//10
-------------------

var data=[]
for(var k=0;k<3;k++){
  data[k]=function(){
   console.log(k)
  }
}
data[0]()//3
data[1]()//3
data[2]()//3

--------------
[] == ![] //true

优先运算![]为false,由于是比较，涉及到强制类型转换左边的[]等效于'',因此有如下
''==![]//ture
''==[]//true

而if([]) alert(1)//ALERT(1)，则没有强制类型转换，[]是object类型，所以true
```

***
####  JS常见内存泄漏的原因

```
全局变量引起的内存泄漏

闭包引起的内存泄漏

dom清空或删除时，事件未清除导致的内存泄漏

子元素存在引用引起的内存泄漏


http://www.cnblogs.com/libin-1/p/6013490.html
```

***
####  javascript中new Date()的浏览器兼容性问题
```
IOS端，火狐有问题
endTime=endTime.replace(/-/g,'/')
endTime=endTime?(new Date(endTime)).getTime():new Date().getTime()
http://blog.csdn.net/blueheart20/article/details/44902747

```

***
####  animate.css 需要在block 或者display:inline-block; 才有效
```
错误：
    <span style="width:100px;height:100px;background:red;" class="animated flipInX">
      <i slot="icon" class="fa fa-heart text-primary"></i> 
    </span>
正确：
    <span style="width:100px;height:100px;background:red;display:inline-block" class="animated flipInX">
      <i slot="icon" class="fa fa-heart text-primary"></i> 
    </span>

https://github.com/daneden/animate.css
```

***
####  str_replace 指定匹配次数不可行
```
mixed str_replace ( mixed $search , mixed $replace , mixed $subject [, int &$count ] )  

$str = 'abcdefgh';  
echo str_replace('abc', '123', $str); // 123defgh  
  
$str = '123456';  
$search = array(1, 2, 3, 4, 5, 6);  
$replace = array('a', 'b', 'c', 'd', 'f', 'g');  
echo str_replace($search, $replace, $str); // abcdefg  
  
$arr = array('abc','bac','cba');  
$result = str_replace('b', 'B', $arr, $count);  
print_r($result); // Array ( [0] => aBc [1] => Bac [2] => cBa )  
echo $count;      // 3 共替换了3次  
str_replace 默认全部匹配的，无法指定次数。替换指定次数的方法，可以使用正则 preg_replace 方法来实现。
mixed preg_replace ( mixed $pattern , mixed $replacement , mixed $subject [, int $limit = -1 [, int &$count ]] )
$string = 'April 15, 2003';
$pattern = '/(\w+) (\d+), (\d+)/i';
$replacement = '${1}1,$3';
echo preg_replace($pattern, $replacement, $string);//April1,2003

string preg_quote ( string $str [, string $delimiter = NULL ] )// 转义正则表达式字符，正则表达式特殊字符有： . \ + * ? [ ^ ] $ ( ) { } = ! < > | : -注意 / 不是正则表达式特殊字符。

/** 
 * 对字符串执行指定次数替换 
 * @param  Mixed $search   查找目标值 
 * @param  Mixed $replace  替换值 
 * @param  Mixed $subject  执行替换的字符串／数组 
 * @param  Int   $limit    允许替换的次数，默认为-1，不限次数 
 * @return Mixed 
 */  
function str_replace_limit($search, $replace, $subject, $limit=-1){  
    if(is_array($search)){  
        foreach($search as $k=>$v){  
            $search[$k] = '`'. preg_quote($search[$k], '`'). '`';  
        }  
    }else{  
        $search = '`'. preg_quote($search, '`'). '`';  
    }  
    return preg_replace($search, $replace, $subject, $limit);  
}  

$str = 'user_order_list';  
echo str_replace_limit('_', '/', $str, 1); // user/order_list  
  
$arr = array('abbc','bbac','cbba');  
$result = str_replace_limit('b', 'B', $arr, 1);  
print_r($result); // Array ( [0] => aBbc [1] => Bbac [2] => cBba )  

```

***
####  php读取文件的4种方式
```
关于php读取文件的4种方式：
1，使用fopen,fread一次读取文件,也可通过指定大小多次读取。
$fp = fopen($file_path, "r");
$str = trim(fread($fp, filesize($file_path)));

2，使用fopen打开，通过fgets逐行读取,fgets不指定length参数，默认是读取1k。
$fp = fopen($file_path,"r");
$str ="";
while(!feof($fp)){
    $str .= fgets($fp);
}

3，使用file函数一次性将内容读入数组(按行分开)
$file = file($file_path);
echo implode('<br>', $file);//把数组元素组合为字符串.explode相反


4，读取文件内容的方式file_get_contents
$str=trim(file_get_contents($file_path));
```

***
####  js随机范围数
```
一、min ≤ r ≤ max
function RandomNumBoth(Min,Max){
      var Range = Max - Min;
      var Rand = Math.random();
      var num = Min + Math.round(Rand * Range); //四舍五入
      return num;
}

```

***
####  php/js 高精度浮点型问题
```
ini_set("precision", "64"); 如果是浮点型仍然会出现精度错误问题

http://www.laruence.com/2011/12/19/2399.html
http://www.php.cn/php-weizijiaocheng-390252.html
为了保险起见, 我们应该使用字符串来保存大整数, 并且采用比如bcmath这样的数学函数库来进行计算.
$a = 0.1;
$b = 0.7;
var_dump(($a + $b) == 0.8);//false

$a = 0.1;
$b = 0.7;
var_dump(bcadd($a,$b,2) == 0.8); // true

mysql内：直接用字符串做运算，如'-'.$locked,支持'--3'的加法运算的
php 字符串之间运算：
echo bcadd('199997143.615002400000000000','0.000000000000001',64);//返回仍然是字符串类型，所以不会丢失精度

js参考：https://www.cnblogs.com/xinggood/p/6639022.html

```

***
####  Linux批量杀死包含某个关键字的进程 全部进程
```
ps -ef|grep goods|grep -v grep|cut -c 9-15|xargs kill -9
或下面这个
kill `ps aux | grep "goods" | grep -v grep | awk '{print $2}'`

批量杀死包含关键字“goods”的进程。

"ps -ef" ——查看所有进程


"grep ./amplxe-gui" ——列出所有含有关键字"./amplxe-gui"的进程


"grep -v grep" ——在列出的进程中去除含有关键字"grep"的进程（因为我们在前一步生成的grep进程也包含关键字）


"cut -c 9-15" ——截取输入行的第9个字符到第15个字符，而这正好是进程号PID


"xargs kill -9" ——xargs 命令是用来把前面命令的输出结果（PID）作为"kill -9"命令的参数，并执行该命令。"kill -9"会强行杀掉指定进程。

计算进程数 
ps -ef | grep "php /" | grep -v grep | wc -l


```

***
####  table JQuery点击table获取点击行的数据
```
click事件中
$(this).parents().find("td").eq(1).html();  

```

***
####  php 判断变量类型
```
php 常用的判断变量的函数有下列几个gettype()、is_array()、is_bool()、is_float()、is_integer()、is_null()、is_numeric()、is_object()、is_resource()、is_scalar() 和 is_string()

gettype() 
gettype 会根据 参数类型返回下列值 
“boolean”（从 PHP 4 起） 
“integer” 
“double”（如果是 float 则返回“double”，而不是“float”） 
“string” 
“array” 
“object” 
“resource”（从 PHP 4 起） 
“NULL”（从 PHP 4 起） 
“unknown type” 
```

***
####  Linux下 crontab实现秒级定时任务的两种方案
```
1、执行的脚本内实现，如循环之类的
2、crontab -e 
* * * * * /bin/date
* * * * * sleep 20; /bin/date 
* * * * * sleep 40; /bin/date

说明：需要将/bin/date更换成你的命令即可

这种做法去处理隔几十秒的定时任务还好，要是每1秒运行一次就得添加60条记录。。。如果每秒运行还是用方案一吧。

```

***
####  TIMESTAMP vs DATETIME 到底我该如何选择
```
日期范围
TIMESTAMP 支持从’1970-01-01 00:00:01′ 到 ’2038-01-19 03:14:07′ UTC. 这个时间可能对目前正在工作的人来说没什么问题，可以坚持到我们退休，但对一些年轻的读者，就会有 Bug2K+38 的问题。
DATETIME 从 ’1000-01-01 00:00:00′ 直到’9999-12-31 23:59:59′.

存储方面的比较
TIMESTAMP 需要 4 字节的存储空间，而 DATETIME 则需要 8 字节

```

***
####  运维相关姿势
```
echo ok > test.txt ；把 ok 字符覆盖 test.txt 内容，>表示追加并
覆盖的意思。
>>两个大于符号，表示追加，echo ok >> test.txt,表示向 test.txt 文
件追加 OK 字符，不覆盖原文件里的内容。

more 查看文件内容，分页查看，cat 是全部查看，如果篇幅很多，只能看到最后的篇幅
tail -100 1.txt 查看最后一百条


```
***
####  linux shell 相关姿势
```
-f 判断文件是否存在 eg: if [ -f filename ] 中括号之间必须要空格
-d 判断目录是否存在 eg: if [ -d dir ]
-eq  等于 应用于：整型比较
-ne  不等于 应用于：整型比较
-lt 小于 应用于：整型比较
-gt  大于 应用于：整型比较
-le  小于或等于 应用于：整型比较
-ge  大于或等于 应用于：整型比较
-a 双方都成立（and） 逻辑表达式 –a 逻辑表达式
-o 单方成立（or） 逻辑表达式 –o 逻辑表达式
-z 空字符串

find /var/log -name "*.log"` 将制定目录.log文件压缩到一个文件
#!/bin/sh
for i in `find -name "*.log"`
do
tar -uf 2017log.tgz $i
done
# tar -cf all.tar *.jpg
这条命令是将所有.jpg的文件打成一个名为all.tar的包。-c是表示产生新的包，-f指定包的文件名。

# tar -rf all.tar *.gif
这条命令是将所有.gif的文件增加到all.tar的包里面去。-r是表示增加文件的意思。

# tar -uf all.tar logo.gif
这条命令是更新原来tar包all.tar中logo.gif文件，-u是表示更新文件的意思。+0
0

创建账号
useradd bajian
passwd bajian


配置相关示例：
# check phpMyAdmin
if [[ $PHP_version =~ ^[1-5]$ ]] || [ -e "$php_install_dir/bin/phpize" ];then
    while :; do echo
        read -p "Do you want to install phpMyAdmin? [y/n]: " phpMyAdmin_yn
        if [[ ! $phpMyAdmin_yn =~ ^[y,n]$ ]];then
            echo "${CWARNING}input error! Please only input 'y' or 'n'${CEND}"
        else
            [ "$phpMyAdmin_yn" == 'y' -a -d "$wwwroot_dir/default/phpMyAdmin" ] && { echo "${CWARNING}phpMyAdmin already installed! ${CEND}"; phpMyAdmin_yn=Other; }
            break
        fi
    done
fi
..

```


***
####  nginx的access日志按日按时切割的实现方法
```
# /bin/bash
now_logs_path="/opt/modules/nginx/logs/"
new_logs_path="/opt/modules/nginx/logs/livelogs/"
log_name="access.log"
log_pre="access"
directory=${new_logs_path}$(date +%Y%m)
if [ ! -d ${directory} ]; then
  mkdir -p ${directory}
fi
mv ${now_logs_path}${log_name} ${directory}/${log_pre}$(date +%d%H).log
kill -USR1 `cat /opt/modules/nginx/logs/nginx.pid`
echo ${directory}/${log_pre}$(date +%d%H).log     
上面会将access日志按时转移到livelogs文件里中，并且会按月归类存放。注意：代码中的kill -USR1并不是杀死nginx进程，是发送信号给nginx主进程，nginx可以重新生成access.log。然后再在定时脚本里加上个定时任务：
0 * * * * /opt/modules/nginx/nginxlogshell >> /opt/modules/nginx/nginxlogshell.log

```

***
####  nginx 修改完配置记得先测试再重启[nginx -t]
```
nginx -t
nginx: the configuration file /usr/local/nginx/conf/nginx.conf syntax is ok
nginx: configuration file /usr/local/nginx/conf/nginx.conf test is successful
 service nginx restart
```
***
####  linux之sed用法
```
sed是一个很好的文件处理工具，本身是一个管道命令，主要是以行为单位进行处理，可以将数据行进行替换、删除、新增、选取等特定工作，下面先了解一下sed的用法

删除某行
     [root@localhost ruby] # sed '1d' ab              #删除第一行 
     [root@localhost ruby] # sed '$d' ab              #删除最后一行
     [root@localhost ruby] # sed '1,2d' ab           #删除第一行到第二行
     [root@localhost ruby] # sed '2,$d' ab           #删除第二行到最后一行

　　显示某行
.    [root@localhost ruby] # sed -n '1p' ab           #显示第一行 
     [root@localhost ruby] # sed -n '$p' ab           #显示最后一行
     [root@localhost ruby] # sed -n '1,2p' ab        #显示第一行到第二行
     [root@localhost ruby] # sed -n '2,$p' ab        #显示第二行到最后一行
     [p本人理解為 print，d delete]
     http://www.cnblogs.com/dong008259/archive/2011/12/07/2279897.html
```

***
####  laravel的事件总结
```
    //总结： laravel的事件中EventServiceProvider可以分成$listen 和 $subscribe方式
    //$listen : 对应于事件-》监听者（handle(SomeEvent $event)中处理），一个事件可以对应多个监听者，监听者通过handle 返回false可以阻止事件向下传递
    //$subscribe : 对应于 观察者-》监听的事件（subscribe($events) 中映射事件和处理方法），一个观察者可以订阅多个事件


```

***
####  redis RDB和AOF持久化对比
```
http://www.cnblogs.com/rollenholt/p/3874443.html
```


***
####  百度公司php开发编码规范规则 中比较有用的规范
```
3.5. [强制] [PHP026] 类method命名采用驼峰命名, 普通function采用过程函数风格命名。
类method：
public function getName() { } 

普通function：
function show_me_the_money() { } 

3.6. [强制·]类成员变量和局部变量必须采用驼峰命名法，建议增加三字节的类型前缀：arr、str、int、bol、obj等
$strName, $intAge 

3.7. [建议]文件(除了类)命名使用小写字母，单词之间以’_’连接。¶
show_lemma.php 

3.8. [建议]配置文件的名称为配置文件名 + .conf.php, 不涉及类的都小写通过”_”连接。
good_version.conf.php 

5.24. [建议]进行==判断时，建议把常量放在前面, 避免误写成赋值操作。
示例
不推荐形式：
if ($a == 1){
}
推荐形式：
if (1 == $a){
}

5.26. [建议]错误码使用统一文件集中配置，并且使用常量，而不应裸写数字

6.1. [强制] [PHP034] 把重复调用放在循环体外。
示例
不推荐形式：
for($i = 0; $i < count($arr); $i++)
推荐形式：
$arrCount = count($arr);
for($i = 0; $i < $arrCount; $i++)

```

***
####  grep 命令
```
-a ：将 binary 文件以 text 文件的方式搜寻数据
-c ：计算找到 '搜寻字符串' 的次数
-i ：忽略大小写的不同，所以大小写视为相同
-n ：顺便输出行号
-v ：反向选择，亦即显示出没有 '搜寻字符串' 内容的那一行！
-v或许比较好用，如redis-cli -h host -p port client list | grep -v "omem=0"，来查询输出缓冲区不为0的客户端连接

-n #增加显示行号
-c #计算查找到的行数
-o #只输出文件中匹配到的部分。
-v #反转查找，即查找不包含指定字符串的数据
-R/-r #目录递归查找 和-d recurse 选项等价。
-E #使用能使用扩展正则表达式。
-i #不区分大小写差别
-A #当匹配本行后显示本行后面几行，-B 显示前两几行，-C 前后各几行。

#不常用选项
-h #在显示符合范本样式的那一列之前，不标示该列所属的文件名称。 
-H #在显示符合范本样式的那一列之前，标示该列的文件名称。 
-l #同时查找多个文件，显示哪些文件中找到了内容 
-L #与-l相反，显示没有查找到内容的文件
-e #要查找多个内容，就相当于 或
-q #静默输出,不显示任何信息,可捕获命令运行结果来作条件测试。

grep -e 1 -e 2 a.txt //包含1/2的内容

```
***
####  nohup 命令
```
Unix/Linux下一般想让某个程序在后台运行，很多都是使用 & 在程序结尾来让程序自动运行。比如我们要运行mysql在后台： 
 /usr/local/mysql/bin/mysqld_safe --user=mysql &
但是我们很多程序并不象mysqld一样可以做成守护进程，可能我们的程序只是普通程序而已，一般这种程序即使使用 & 结尾，如果终端关闭，那么程序也会被关闭。

nohup php /home/hgx/goupianyi/update_goods.php
nohup: ignoring input and appending output to ‘nohup.out’


```

***
####  awk 命令
```
http://www.cnblogs.com/ggjucheng/archive/2013/01/13/2858470.html

总结：awk工作流程是这样的：读入有'\n'换行符分割的一条记录，然后将记录按指定的域分隔符划分域，填充域，$0则表示所有域,$1表示第一个域,$n表示第n个域。默认域分隔符是"空白键" 或 "[tab]键",所以$1表示登录用户，$3表示登录用户ip,以此类推。

1、last -n 5 | awk  '{print $1}' 只显示最近登录的5个帐号
2、cat /etc/passwd |awk  -F ':'  '{print $1}'   只显示/etc/passwd的账户 【-F指定域分隔符为':'】
3、cat /etc/passwd |awk  -F ':'  '{print $1"\t"$7}'  只显示/etc/passwd的账户和账户对应的shell,而账户与shell之间以tab键分割
4、cat /etc/passwd |awk  -F ':'  'BEGIN {print "name,shell"}  {print $1","$7} END {print "blue,/bin/nosh"}'
只显示/etc/passwd的账户和账户对应的shell,而账户与shell之间以逗号分割,而且在所有行添加列名name,shell,在最后一行添加"blue,/bin/nosh"。
awk工作流程是这样的：先执行BEGING，然后读取文件，读入有/n换行符分割的一条记录，然后将记录按指定的域分隔符划分域，填充域，$0则表示所有域,$1表示第一个域,$n表示第n个域,随后开始执行模式所对应的动作action。接着开始读入第二条记录······直到所有的记录都读完，最后执行END操作。

5、awk -F: '/root/' /etc/passwd 搜索/etc/passwd有root关键字的所有行，这种是pattern的使用示例，匹配了pattern(这里是root)的行才会执行action(没有指定action，默认输出每行的内容)。
搜索支持正则，例如找root开头的: awk -F: '/^root/' /etc/passwd

6、awk -F: '/root/{print $7}' /etc/passwd     搜索/etc/passwd有root关键字的所有行，并显示对应的shell
7、awk  -F ':'  '{print "filename:" FILENAME ",linenumber:" NR ",columns:" NF ",linecontent:"$0}' /etc/passwd awk有许多内置变量用来设置环境信息，这些变量可以被改变
filename:/etc/passwd,linenumber:1,columns:7,linecontent:root:x:0:0:root:/root:/bin/bash
8、awk '{count++;print $0;} END{print "user count is ", count}' /etc/passwd   统计/etc/passwd的账户人数、除了awk的内置变量，awk还可以自定义变量。
count是自定义变量。之前的action{}里都是只有一个print,其实print只是一个语句，而action{}可以有多个语句，以;号隔开。
初始化变量 awk 'BEGIN {count=0;print "[start]user count is ", count} {count=count+1;print $0;} END{print "[end]user count is ", count}' /etc/passwd

8、ls -l |awk 'BEGIN {size=0;} {size=size+$5;} END{print "[end]size is ", size}' 统计某个文件夹下的文件占用的字节数：[end]size is  8657198
9、ls -l |awk 'BEGIN {size=0;} {size=size+$5;} END{print "[end]size is ", size/1024/1024,"M"}' 如果以M为单位显示:[end]size is  8.25889 M

实战匹配nginx 日志获取【linux下对nginx访问日志进行搜索筛选过滤去重统计分析】
awk '/- - [20/Sep/2016:/{print $0}' joke.log >b.log  匹配出当天日志 $0表示整行
awk '/\/api\/v1\/user\/login/ {print $1"\t"$7}' sslapi.goupianyi888.com_nginx.log >a.log
awk '!a[$0]++' a.log > d.log //a[$0]以每行内容为index的一个hash表，初值为空；由于执行了++，它的初值变成了0，而！0=1,1为真；如果行内容重复，它的值增加后进行！否运算变成假。
扩展到 !a[$1]++ 或者 !a[$2]++等等可以指定第几列去重复

awk '"xxxx" {print $1"\t"$7}' www.xx.club_nginx.log-20180529
awk '"xxxx" {print $0}' www.xxx.club_nginx.log-20180529

awk '"xxxx" {print $1}' www.xxx.club_nginx.log-20180529 > a.log
awk '!a[$0]++' a.log > d.log 
 wc -l d.log //计算行数wc https://www.cnblogs.com/newcaoguo/p/5896491.html

cat www.xxxx.club_nginx.log-20180529|awk -F: '{if($12=="xxxx"){print $0}}'

awk '$12==12{print}' www.xxx.club_nginx.log
```

***
####  nginx try_files
```
语法：try_files file ... uri 或 try_files file ... = code
默认值：无
作用域：server location

其作用是按顺序检查文件是否存在，返回`第一个找到`的文件或文件夹（结尾加斜线表示为文件夹），如果所有的文件或文件夹都找不到，会进行一个内部重定向到最后一个参数。

需要注意的是，只有最后一个参数可以引起一个内部重定向，之前的参数只设置内部URI的指向。最后一个参数是回退URI且必须存在，否则会出现内部500错误。命名的location也可以使用在最后一个参数中。与rewrite指令不同，如果回退URI不是命名的location那么$args不会自动保留，如果你想保留$args，则必须明确声明。

例如laravel配置
location / {
    try_files $uri $uri/ /index.php?$query_string;
}
如/test?a=111&b=22
意思是如果在root目录（public）下，找不到具体的文件(/test)，就寻找（/test/）文件夹，前两个指向都找不到的话，就重定向到/index.php?a=111&b=22


```
***
####  nginx location的匹配命令
```
~     #波浪线表示执行一个正则匹配，区分大小写
~*    #表示执行一个正则匹配，不区分大小写
^~    #^~表示普通字符匹配，如果该选项匹配，只匹配该选项，不匹配别的选项，一般用来匹配目录
=     #进行普通字符精确匹配
@     #"@" 定义一个命名的 location，使用在内部定向时，例如 error_page, try_files
!~    #大小写敏感不匹配 
!~*   #大小写不敏感不匹配

```

***
####  nginx全局变量
```
arg_PARAMETER    #这个变量包含GET请求中，如果有变量PARAMETER时的值。
args                    #这个变量等于请求行中(GET请求)的参数，如：foo=123&bar=blahblah;
binary_remote_addr #二进制的客户地址。
body_bytes_sent    #响应时送出的body字节数数量。即使连接中断，这个数据也是精确的。
content_length    #请求头中的Content-length字段。
content_type      #请求头中的Content-Type字段。
cookie_COOKIE    #cookie COOKIE变量的值
document_root    #当前请求在root指令中指定的值。
document_uri      #与uri相同。
host                #请求主机头字段，否则为服务器名称。
hostname          #Set to themachine’s hostname as returned by gethostname
http_HEADER
is_args              #如果有args参数，这个变量等于”?”，否则等于”"，空值。
http_user_agent    #客户端agent信息
http_cookie          #客户端cookie信息
limit_rate            #这个变量可以限制连接速率。
query_string          #与args相同。
request_body_file  #客户端请求主体信息的临时文件名。
request_method    #客户端请求的动作，通常为GET或POST。
remote_addr          #客户端的IP地址。
remote_port          #客户端的端口。
remote_user          #已经经过Auth Basic Module验证的用户名。
request_completion #如果请求结束，设置为OK. 当请求未结束或如果该请求不是请求链串的最后一个时，为空(Empty)。
request_method    #GET或POST
request_filename  #当前请求的文件路径，由root或alias指令与URI请求生成。
request_uri          #包含请求参数的原始URI，不包含主机名，如：”/foo/bar.php?arg=baz”。不能修改。
scheme                #HTTP方法（如http，https）。
server_protocol      #请求使用的协议，通常是HTTP/1.0或HTTP/1.1。
server_addr          #服务器地址，在完成一次系统调用后可以确定这个值。
server_name        #服务器名称。
server_port          #请求到达服务器的端口号。

proxy_set_header  Host $host;
    proxy_set_header  X-Real-IP $remote_addr;
    proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
    
```

***
####  Nginx的Rewrite规则编写实例
```
认真阅读 http://www.linuxidc.com/Linux/2014-01/95493.htm

1.当访问的文件和目录不存在时，重定向到某个php文件
if( !-e $request_filename )
{
rewrite ^/(.*)$ index.php last;
}


2.目录对换 /123456/xxxx  ====>  /xxxx?id=123456
rewrite ^/(\d+)/(.+)/  /$2?id=$1 last;


3.如果客户端使用的是IE浏览器，则重定向到/ie目录下
if( $http_user_agent  ~ MSIE)
{
rewrite ^(.*)$ /ie/$1 break;
}


4.禁止访问多个目录
location ~ ^/(cron|templates)/
{
deny all;
break;
}


5.禁止访问以/data开头的文件
location ~ ^/data
{
deny all;
}


6.禁止访问以.sh,.flv,.mp3为文件后缀名的文件
location ~ .*\.(sh|flv|mp3)$
{
return 403;
}


7.设置某些类型文件的浏览器缓存时间
location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
{
expires 30d;
}
location ~ .*\.(js|css)$
{
expires 1h;
}


8.给favicon.ico和robots.txt设置过期时间;
这里为favicon.ico为99天,robots.txt为7天并不记录404错误日志
location ~(favicon.ico) {
log_not_found off;
expires 99d;
break;
}
location ~(robots.txt) {
log_not_found off;
expires 7d;
break;
}


9.设定某个文件的过期时间;这里为600秒，并不记录访问日志
location ^~ /html/scripts/loadhead_1.js {
access_log  off;
root /opt/lampp/htdocs/web;
expires 600;
break;
}


10.文件反盗链并设置过期时间
这里的return412 为自定义的http状态码，默认为403，方便找出正确的盗链的请求
“rewrite ^/ http://img.linuxidc.net/leech.gif;”显示一张防盗链图片
“access_log off;”不记录访问日志，减轻压力
“expires 3d”所有文件3天的浏览器缓存


location ~*^.+\.(jpg|jpeg|gif|png|swf|rar|zip|css|js)$ {
valid_referers none blocked *.linuxidc.com*.linuxidc.net localhost 208.97.167.194;
if ($invalid_referer) {
rewrite ^/ http://img.linuxidc.net/leech.gif;
return 412;
break;
}
access_log  off;
root /opt/lampp/htdocs/web;
expires 3d;
break;
}


11.只允许固定ip访问网站，并加上密码


root /opt/htdocs/www;
allow  208.97.167.194;
allow  222.33.1.2; 
allow  231.152.49.4;
deny  all;
auth_basic “C1G_ADMIN”;
auth_basic_user_file htpasswd;


12将多级目录下的文件转成一个文件，增强seo效果
/job-123-456-789.html 指向/job/123/456/789.html


rewrite^/job-([0-9]+)-([0-9]+)-([0-9]+)\.html$ /job/$1/$2/jobshow_$3.html last;


13.文件和目录不存在的时候重定向：


if (!-e $request_filename) {
proxy_pass http://127.0.0.1;
}


14.将根目录下某个文件夹指向2级目录
如/shanghaijob/ 指向 /area/shanghai/
如果你将last改成permanent，那么浏览器地址栏显是/location/shanghai/
rewrite ^/([0-9a-z]+)job/(.*)$ /area/$1/$2last;
上面例子有个问题是访问/shanghai时将不会匹配
rewrite ^/([0-9a-z]+)job$ /area/$1/ last;
rewrite ^/([0-9a-z]+)job/(.*)$ /area/$1/$2last;
这样/shanghai 也可以访问了，但页面中的相对链接无法使用，
如./list_1.html真实地址是/area/shanghia/list_1.html会变成/list_1.html,导至无法访问。
那我加上自动跳转也是不行咯
(-d $request_filename)它有个条件是必需为真实目录，而我的rewrite不是的，所以没有效果
if (-d $request_filename){
rewrite ^/(.*)([^/])$ http://$host/$1$2/permanent;
}
知道原因后就好办了，让我手动跳转吧
rewrite ^/([0-9a-z]+)job$ /$1job/permanent;
rewrite ^/([0-9a-z]+)job/(.*)$ /area/$1/$2last;


15.域名跳转
server
{
listen      80;
server_name  jump.linuxidc.com;
index index.html index.htm index.php;
root  /opt/lampp/htdocs/www;
rewrite ^/ http://www.linuxidc.com/;
access_log  off;
}


16.多域名转向
server_name  www.linuxidc.com www.linuxidc.net;
index index.html index.htm index.php;
root  /opt/lampp/htdocs;
if ($host ~ "linuxidc\.net") {
rewrite ^(.*) http://www.linuxidc.com$1 permanent;
}

```


***
#### getBoundingClientRect
```
![demo](http://images.cnitblog.com/blog2015/678562/201504/262132219001037.jpg)
ClientRect {top: 788.578125, right: 1525.484375, bottom: 820.578125, left: 600.828125, width: 924.65625…}

```

***
#### git sourcetree 想回滚未提交的文件，可以选中文件，右键--移除--再右键--丢弃

***
#### git sourcetree 想回滚到某个版本，可以双击版本--点击确定

***
#### array_map() 函数将用户自定义函数作用到数组中的每个值上，并返回用户自定义函数作用后的带有新值的数组。
```

if (get_magic_quotes_gpc()) {
  function stripslashes_deep($value){ 
    $value = is_array($value) ? array_map('stripslashes_deep', $value) : stripslashes($value);
  return $value;
}
  $_POST = array_map('stripslashes_deep', $_POST);
  $_GET = array_map('stripslashes_deep', $_GET);
  $_COOKIE = array_map('stripslashes_deep', $_COOKIE);
}
```

***
#### PHP7专题
```

// 返回值类型
declare(strict_types = 1);
   function returnIntValue(int $value): int {
      return $value;
   }
   print(returnIntValue(5));

//参数类型
declare(strict_types=1);
   function sum(int ...$ints) {
      return array_sum($ints);
   }
   print(sum(2, '3', 4.1));

//在PHP7，一个新的功能，空合并运算符(??)已被引入。它被用来代替三元运算并与 isset()函数功能结合一起使用。如果它存在并且它不是空的，空合并运算符返回它的第一个操作数;否则返回第二个操作数。
//用来判断$_POST,$_GET最合适了
$A=0;
$username = $A ?? 'not passed';
echo $username;//0
$A='';
$username = $A ?? 'not passed';
echo $username;//''

$A=null;
$username = $A ?? 'not passed';
echo $username;//'not passed'

$A;
$username = $A ?? 'not passed';
echo $username;//'not passed'

在PHP7，一个新的功能，飞船操作符已经被引入。它是用于比较两个表达式。当第一个表达式比第二个表达式分别小于，等于或大于它返回-1，0或1。
//integer comparison
   print( 1 <=> 1);print("<br/>");//0
   print( 1 <=> 2);print("<br/>");//-1
   print( 2 <=> 1);print("<br/>");//1

   //string comparison
   print( "a" <=> "a");print("<br/>");//0
   print( "a" <=> "b");print("<br/>");//-1
   print( "b" <=> "a");print("<br/>");//1

echo "A" <=> "B";//-1
echo "ab" <=> "b";//-1

//数组常量现在可以使用 define() 函数定义。 在PHP5.6，它们只能使用 const 关键字定义。
//define a array using define function
   define('animals', [
      'dog',
      'cat',
      'bird'
   ]);
   print(animals[1]);//cat

//在php7中，匿名类现在可以使用 new class 来定义。匿名类可以使用来代替完整的类定义。
   interface Logger {
      public function log(string $msg);
   }

   class Application {
      private $logger;

      public function getLogger(): Logger {
         return $this->logger;
      }

      public function setLogger(Logger $logger) {
         $this->logger = $logger;
      }  
   }

   $app = new Application;
   $app->setLogger(new class implements Logger {
      public function log(string $msg) {
         print($msg);
      }
   });

   $app->getLogger()->log("My first Log Message");//My first Log Message

Closure::call() 方法被添加作为临时绑定的对象范围，以封闭并简便调用它的方法。它的性能相比PHP5.6 bindTo要快得多。
   class A {
      private $x = 1;
   }

   // PHP 7+ code, Define
   $value = function() {
      return $this->x;
   };

   print($value->call(new A));//1
//类似JS里的call,apply

PHP7引入了intdiv()的新函数，它执行操作数的整数除法并返回结果为 int 类型。
echo intdiv(7,12);//0
echo intdiv(7,2);//3

7.1新特性http://www.phpchina.com/portal.php?mod=view&aid=40237

```

***
#### 为querySelectorAll添加forEach方法
```
[].forEach(function(value,index,array){
　　　　//code something
　　});

var data=[1,3,4]

var Squares=data.map(function(val,index,arr){
  console.log(arr[index]==val);  // ==> true
  return val*val           
})
console.log(Squares);        // ==> [1, 9, 16]
map 用来修改数组中原有数据，而forEach用于遍历吧

Object.keys(value).forEach((key) => defineReactive(value, key, value[key] , cb))

let selector = 'th.vuetable-th-checkbox-' + idColumn + ' input[type=checkbox]'
      let els = document.querySelectorAll(selector)

      //fixed:document.querySelectorAll return the typeof nodeList not array
      if(els.forEach===undefined)
      els.forEach=function(cb){
        [].forEach.call(els, cb);
      }

      // count how many checkbox row in the current page has been checked
      let selected = this.tableData.filter(function(item) {
        return self.selectedTo.indexOf(item[idColumn]) >= 0
      })

      // count == 0, clear the checkbox
      if (selected.length <= 0) {
        els.forEach(function(el) {
          el.indeterminate = false
        })
        return false
      }
```

***
#### WinSCP下su切换到root的技巧
```
https://my.oschina.net/u/1038053/blog/611562?p={{totalPage}}

```

***
#### 图片转base64 字符串转base64
```
将图片数据进行Base64编码
function getCanvas(w, h) {
  var c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}
  
function getPixels(img) {
  var c = getCanvas(img.width, img.height);
  var ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, c.width, c.height);
}

字符串转base64
/**
 * 
 * btoa()：字符串或二进制值转为Base64编码 a=ascii,b=base64
 * atob()：Base64编码转为原来的编码
  */
  var string = 'Hello World!';
  console.log(btoa(string)) // "SGVsbG8gV29ybGQh" 将ascii字符串或二进制数据转换成一个base64编码过的字符串,该方法不能直接作用于Unicode字符串.可以先encodeURIComponent编码

  console.log(atob('SGVsbG8gV29ybGQh')) // "Hello World!"

  function b64Encode(str) {
      return btoa(encodeURIComponent(str));
  }

  function b64Decode(str) {
      return decodeURIComponent(atob(str));
  }
  console.log(b64Encode('Hello World! 你好！'))
  console.log(b64Decode('SGVsbG8lMjBXb3JsZCElMjAlRTQlQkQlQTAlRTUlQTUlQkQlRUYlQkMlODE='))

实现原理https://my.oschina.net/goal/blog/201032#OSC_h2_11
```


***
#### HTML语言中表格的书写中TD TR TH的英文全称是什么？
```
是定义表格中的一行
table row
是定义一个表格
table data cell
是定义单元格中的一个单元格
table head
和差不多，只不过单元格中的字体是居中加粗的
```

***
#### js计算耗时
```
console.time('myTime'); //Starts the timer with label - myTime
 
for(var i=0; i < 100000; i++){
  2+4+5;
}
 
console.timeEnd('myTime'); 

console.table(variableName) 把变量和它的所有属性展现城表格结构
var myArray=[{a:1,b:2,c:3},{a:1,b:2,c:3,d:4},{k:11,f:22},{a:1,b:2,c:3}]
console.table(myArray)
```


***
#### group by 按最新一条排序（考勤数据）
```
分析：由于group by 会取出排在最上面的一条做显示的一条，所以对考勤数据进行排序（时间降序）再group by 就行了：
SELECT * FROM (SELECT a.`student_id` AS studentID,a.`name` AS studentName,b.`type`,b.`time` AS DATETIME FROM manager_student a LEFT JOIN xsk_attendance b ON a.`device_id`=b.`device_id` AND DATE_FORMAT(b.time,'%Y-%m-%d') ='2017-02-14' WHERE a.`class_id`=208 AND a.`school_id`=61 ORDER BY (DATETIME) DESC)t GROUP BY studentName ORDER BY studentID ASC

原本的语句只会按最早一条数据排序：
SELECT a.`student_id` AS studentID,a.`name` AS studentName,b.`type`,b.`time` AS datetime FROM manager_student a LEFT JOIN xsk_attendance b ON a.`device_id`=b.`device_id` AND DATE_FORMAT(b.time,\'%Y-%m-%d\') =? WHERE a.`class_id`=? AND a.`school_id`=? GROUP BY a.`name` ORDER BY (studentID+0) ASC
参考
http://www.tuicool.com/articles/FnQFre
```

***
#### mysql 对null进行排序，降序时候让null在前面
```
 ISNULL(DATETIME) DESC ,DATETIME DESC，升序反之，怎么搞都行

SELECT * FROM (SELECT a.`student_id` AS studentID,a.`name` AS studentName,b.`type`,b.`time` AS DATETIME FROM manager_student a LEFT JOIN xsk_attendance b ON a.`device_id`=b.`device_id` AND DATE_FORMAT(b.time,'%Y-%m-%d') ='2017-02-14' WHERE a.`class_id`=208 AND a.`school_id`=61 ORDER BY (DATETIME) DESC)t GROUP BY studentName ORDER BY ISNULL(DATETIME) DESC ,DATETIME DESC
参考
http://www.cnblogs.com/jeffen/p/6044764.html
```


***
#### \ 等特殊符号在query中出现的处理办法
```
比如 where x_str = 'contains\\\\one back slash'

上面的字符串等价于contains\one back slash
```

***
#### 子域名间共享cookie（seesion id）
```
设置顶级域名就行了

未指定domain时，默认的domain为用哪个域名访问就是哪个，如果为顶级域名访问，那么可以被其他2级域名共享。


读取cookie
　　二级域名能读取设置了domain为顶级域名或者自身的cookie，不能读取其他二级域名domain的cookie。所以要想cookie在多个二级域名中共享，需要设置domain为顶级域名，这样就可以在所有二级域名里面或者到这个cookie的值了。

顶级域名只能获取到domain设置为顶级域名的cookie，其他domain设置为二级域名的无法获取。

删除cookie
　　1）顶级域名的cookie在顶级域名或者2级域名都可以删除，但是用非顶级域名访问的网站要删除顶级域名的cookie，需要设置获取到的cookie的domain为顶级域名,这样才能删除顶级域名的cookie，否则无法删除，默认的会删除访问的域名下对应的cookie，而不是顶级域名的。

```

***
#### mysql中模糊查询的四种用法： 
```
http://www.jb51.net/article/48315.htm
1，%：表示任意0个或多个字符。可匹配任意类型和长度的字符，有些情况下若是中文，请使用两个百分号（%%）表示。 
比如 SELECT * FROM [user] WHERE u_name LIKE '%三%' 
将会把u_name为“张三”，“张猫三”、“三脚猫”，“唐三藏”等等有“三”的记录全找出来。 
另外，如果需要找出u_name中既有“三”又有“猫”的记录，请使用and条件 
SELECT * FROM [user] WHERE u_name LIKE '%三%' AND u_name LIKE '%猫%' 
若使用 SELECT * FROM [user] WHERE u_name LIKE '%三%猫%' 

虽然能搜索出“三脚猫”，但不能搜索出符合条件的“张猫三”。 

2，_： 表示任意单个字符。匹配单个任意字符，它常用来限制表达式的字符长度语句： 
比如 SELECT * FROM [user] WHERE u_name LIKE '_三_' 
只找出“唐三藏”这样u_name为三个字且中间一个字是“三”的； 


3，[ ]：表示括号内所列字符中的一个（类似正则表达式）。指定一个字符、字符串或范围，要求所匹配对象为它们中的任一个。 
比如 SELECT * FROM [user] WHERE u_name LIKE '[张李王]三' 将找出“张三”、“李三”、“王三”（而不是“张李王三”）； 
如 [ ] 内有一系列字符（01234、abcde之类的）则可略写为“0-4”、“a-e” 
SELECT * FROM [user] WHERE u_name LIKE '老[1-9]' 将找出“老1”、“老2”、……、“老9”； 
测试不通过。。

4，[^ ] ：表示不在括号所列之内的单个字符。其取值和 [] 相同，但它要求所匹配对象为指定字符以外的任一个字符。 
比如 SELECT * FROM [user] WHERE u_name LIKE '[^张李王]三' 将找出不姓“张”、“李”、“王”的“赵三”、“孙三”等； 
SELECT * FROM [user] WHERE u_name LIKE '老[^1-4]'; 将排除“老1”到“老4”，寻找“老5”、“老6”、…… 
测试不通过。。

正则
SELECT * FROM bikelock WHERE device_id REGEXP  '^1[1-9]*'

```

***
#### relative absolute 居中方法
```
relative:
margin：0 auto;水平剧中
垂直居中：注意浏览器兼容性写法
.box2{
    display: flex;
    justify-content:center;
    align-items:center;
}

absolute：
1、（最实际但不灵活）
left:50%;
margin-left:-1.42857143rem;/* 40px */
2、我们经常用margin:0 auto来实现水平居中，而一直认为margin:auto不能实现垂直居中……实际上，实现垂直居中仅需要声明父级元素高度和下面的CSS:

.Absolute-Center {  
  margin: auto;  
  position: absolute;  
  top: 0; left: 0; bottom: 0; right: 0;  
}  
也可以配合flex设置
```

***
#### 判断object中是否存在xx键值
```
a={ a:123,tt:999}
Object {a: 123, tt: 999}
if('tt' in a) alert(1)//比 a['tt']更直观
```

***
#### nginx 配置域名重定向
```
server {
        server_name luokr.com;
        return 301 $scheme://www.luokr.com$request_uri;
}
```

***
#### 取消冒泡事件兼容性写法
```
       //取消冒泡事件
function stopBubble(e){
               e=e||window.event;  //firefox,chrome,etc.||IE,opera
if(e.stopPropagation){
                   e.stopPropagation();
                 }
                 else{
                  e.cancelBubble=true;
                 }
             }
```

***
#### transform-origin 旋转中心点
```
http://www.zhangxinxu.com/wordpress/2012/06/css3-transform-matrix-%E7%9F%A9%E9%98%B5/

CSS代码：
.anim_image {
    -webkit-transition: all 1s ease-in-out;
    -moz-transition: all 1s ease-in-out;
    -o-transition: all 1s ease-in-out;
    transition: all 1s ease-in-out;
    cursor:pointer;
}
.anim_image_top {
    position: absolute;
    -webkit-transform: scale(0, 0);
    opacity: 0;
    filter: Alpha(opacity=0);
}
.anim_box:hover .anim_image_top , .anim_box_hover .anim_image_top {
    opacity: 1;
    filter: Alpha(opacity=100);
    -webkit-transform: scale(1, 1);
    -webkit-transform-origin: top right;        
}
.anim_box:hover .anim_image_bottom, .anim_box_hover .anim_image_bottom {
    -webkit-transform: scale(0, 0);
    -webkit-transform-origin: bottom left;
}
HTML代码：
<div id="testBox" class="demo anim_box">
    <img class="anim_image anim_image_top" src="http://image.zhangxinxu.com/image/study/p/s200/ps6.jpg" />
    <img class="anim_image anim_image_bottom" src="http://image.zhangxinxu.com/image/study/p/s200/ps4.jpg" />
</div>

```

***
#### 取消手机端点击时候的样式
```
-webkit-tap-highlight-color:rgba(0,0,0,0);
还有个outline
```

***
#### linux 查看本机链接tcp/http情况
```
 netstat -nat|grep -i "6677"
http://blog.csdn.net/he_jian1/article/details/40787269
TIME_WAIT 8947 等待足够的时间以确保远程TCP接收到连接中断请求的确认
FIN_WAIT1 15 等待远程TCP连接中断请求，或先前的连接中断请求的确认
FIN_WAIT2 1 从远程TCP等待连接中断请求
ESTABLISHED 55 代表一个打开的连接
SYN_RECV 21 再收到和发送一个连接请求后等待对方对连接请求的确认
CLOSING 2 没有任何连接状态
LAST_ACK 4 等待原来的发向远程TCP的连接中断请求的确认
 
TCP连接状态详解
LISTEN： 侦听来自远方的TCP端口的连接请求
SYN-SENT： 再发送连接请求后等待匹配的连接请求
SYN-RECEIVED：再收到和发送一个连接请求后等待对方对连接请求的确认
ESTABLISHED： 代表一个打开的连接
FIN-WAIT-1： 等待远程TCP连接中断请求，或先前的连接中断请求的确认
FIN-WAIT-2： 从远程TCP等待连接中断请求
CLOSE-WAIT： 等待从本地用户发来的连接中断请求
CLOSING： 等待远程TCP对连接中断的确认
LAST-ACK： 等待原来的发向远程TCP的连接中断请求的确认
TIME-WAIT： 等待足够的时间以确保远程TCP接收到连接中断请求的确认
CLOSED： 没有任何连接状态
```


***
#### mysql添加查询日志
```
general_log=ON
general_log_file=/tmp/mysql.log
```


***
#### mysql区分大小写
```

在 字段前加 binary
如
SELECT * FROM daxiaoxie WHERE BINARY NAME='haha'
```


***
#### PHP 面试题
```
文件操作：
dirname(__FILE__);//获取当前路径 不含文件名 ，不能含有中文路径
echo "__FILE__: ========> ".__FILE__;//当前绝对路径 含文件名
echo "__DIR__: ========> ".__DIR__;//指向当前执行的PHP脚本所在的目录 == dirname(__FILE__);
在实现同样功能的情况下，dirname(__FILE__)多了一层函数调用。所以， __DIR__ 比 dirname(__FILE__) 在效率上有优势。

$path = "/testweb/home.php";
//显示带有文件扩展名的文件名
echo basename($path);//home.php
//显示不带有文件扩展名的文件名
echo basename($path,".php");//home

unlink() //删除文件

file_exists() 检查文件或目录是否存在。
file_get_contents() 将文件读入字符串
file_put_contents() 将字符串写入文件。

filesize()  返回文件大小。
filetype()  返回文件类型。fifo char dir block link file unknown
md5_file($filePath) 文件的md5

$ip = gethostbyname('www.csdn.net');//47.95.164.112
// echo $ip;
 $num_ip =  ip2long($ip);
echo $num_ip,'<br/>';
echo long2ip($num_ip),'<br/>';
echo  ((47 * 256 + 95) * 256 + 164) * 256 + 112;


以下脚本输出什么？
$array = array (0.1 => ‘a’, 0.2 => ‘b’);
echo count ($array);//1
脚本输出 1（答案是 A）。因为只有整型数字和字符串可以被用来做数组的键——浮点
数字会被转换成整型数字。所以 0.1 和 0.2 会被转换成 0，$array 中只有 0=>’b’这个元
素。

$array = array (true => ‘a’, 1 => ‘b’);//TRUE转成字符串1
var_dump ($array);
array(1) {
  [1]=>
  string(8) " ‘b’"
}

面向对象三大基本特性,五大基本原则
三大特性是：封装,继承,多态  
五大基本原则 
单一职责原则SRP(Single Responsibility Principle)
开放封闭原则OCP(Open－Close Principle) 
里式替换原则(the Liskov Substitution Principle LSP) 
依赖倒置原则(the Dependency Inversion Principle DIP) 
接口分离原则(the Interface Segregation Principle ISP) 
技法：单开依里接
https://www.cnblogs.com/hnrainll/archive/2012/09/18/2690846.html
<?php 
    class A{
        public static $num=0;
        public function __construct(){
            self::$num++; }
    }
    new A();
    new A();
    new A();
    echo A::$num;
?>

属性不能被定义为 final，只有类和方法才能被定义为 final。


PHP获得实例化对象所属类名字的函数（ get_class()）


1.网页/应用访问慢突然变慢，如何定位问题#

top、iostat查看cpu、内存及io占用情况
内核、程序参数设置不合理 查看有没有报内核错误，连接数用户打开文件数这些有没有达到上限等等
链路本身慢 是否跨运营商、用户上下行带宽不够、dns解析慢、服务器内网广播风暴什么的
程序设计不合理 是否程序本身算法设计太差，数据库语句太过复杂或者刚上线了什么功能引起的
其它关联的程序引起的 如果要访问数据库，检查一下是否数据库访问慢
是否被攻击了 查看服务器是否被DDos了等等
硬件故障 这个一般直接服务器就挂了，而不是访问慢


有一个复合索引/联合索引：INDEX(`a`, `b`, `c`)

使用方式  能否用上索引
select * from users where a = 1 and b = 2 能用上a、b
select * from users where b = 2 and a = 1 能用上a、b（前提是有MySQL查询优化器）
select * from users where a = 2 and c = 1 能用上a
select * from users where b = 2 and c = 1 不能
https://www.cnblogs.com/summer0space/p/7247778.html
https://www.cnblogs.com/softidea/p/5977860.html
http://blog.csdn.net/zht666/article/details/46695697
https://www.cnblogs.com/joyber/p/4349604.html 重点参考，记忆法 非等号的字段超过一个了，索引不来
$test = 'aaaaaa';
    $abc = & $test;
    unset($test);
    echo $abc;//'aaaaaaa'


    $a1 = null;
    $a2 = false;
    $a3 = 0;
    $a4 = '';
    $a5 = '0';
    $a6 = 'null';
    $a7 = array();
    $a8 = array(array());
    $a9 = array('');
    echo empty($a1) ? 'true' : 'false';
    echo empty($a2) ? 'true' : 'false';
    echo empty($a3) ? 'true' : 'false';
    echo empty($a4) ? 'true' : 'false';
    echo empty($a5) ? 'true' : 'false';
    echo empty($a6) ? 'true' : 'false';
    echo empty($a7) ? 'true' : 'false';
    echo empty($a8) ? 'true' : 'false';
    echo empty($a9) ? 'true' : 'false';

//true true true true true false true false false


    $count = 5;
    function get_count(){
        static $count = 0;
        return $count++;
    }
    echo $count;//5
    ++$count;
    echo get_count();//0
    echo get_count();//1
    echo get_count();
function foo(){ 
static $int = 0;// correct 
static $int = 1+2; // wrong (as it is an expression) 
static $int = sqrt(121); // wrong (as it is an expression too) 
$int++; 
echo $int; 
} 


strrev()//字符串翻转
strrchr() //函数查找字符串在另一个字符串中最后一次出现的位置，并返回从该位置到字符串结尾的所有字符。
strchr() //函数查找字符串在另一个字符串中第一次出现的位置，并返回从该位置到字符串结尾的所有字符。
strrpos()//字符串最后一次出现的位置


必看面试题 运算符优先级
https://cnodejs.org/topic/5867d50d5eac96bb04d3e302
```

冒泡排序（数组排序）
$a=array('3','8','1','8','4','11','7');
// print_r($a);
$len = count($a);

function quikSort($arr){
    for ($i=0; $i <$len ; $i++) {
    for ($j=0; $j <$len-$i-1 ; $j++) {
        if ($a[$j]>$a[$j+1]) {
            $temp=$a[$j+1];
            $a[$j+1]=$a[$j];
            $a[$j]=$temp;
        }
    }
}
}


/**
* 快速排序
* $a=array('3','8','1','4','11','7');
* 递归实现
* 获取数组第一个数,循环使后面的数与其比较,
* 比其小的放在一个数组中,比其大的放在一个数组中
* 将2个数组递归调用,直到最终数组元素小于等于1时,没有可以比较的元素
* 通过array_merge函数,将比较的数组按大小顺序合并然后一层一层的return出去,最终实现从小到大排序
* @param array $array 要操作的数组
* @return array $array 返回的数组
*/
function quickSort($array)
{
        if(count($array) <= 1 ) return $array;
        $key = $array[0];
        $left_arr = array();
        $right_arr = array();
        for ($i=1;$i<count($array);$i++){
                if($array[$i] <= $key){
                        $left_arr[] = $array[$i];
                }else{
                        $right_arr[] = $array[$i];
                }
        }

        $left_arr = quickSort($left_arr);
        $right_arr = quickSort($right_arr);
        return array_merge($left_arr,array($key),$right_arr);

}

js版

arr=[5,6,1,4,88];
console.log(quikSort(arr));
function quikSort(arr){
    console.log('in quikSort');
    if (arr.length<=1) return arr;
    var key=arr[0],
    l=[],
    r=[];
    for (var i = 1; i <arr.length; i++) {
        if (key>=arr[i]) {
            l.push(arr[i])
        }else{
            r.push(arr[i])
        }
    }
    l=quikSort(l)
    r=quikSort(r)
    return l.concat([key]).concat(r)
}
/**
* 选择排序
* 2层循环
* 第一层逐个获取数组的值 $array[$i]
* 第二次遍历整个数组与$array[$i]比较($j=$i+1已经比较的,不再比较,减少比较次数)
* 如果比$array[$i]小,就交换位置
* 这样一轮下来就可以得到数组中最小值
* 以此内推整个外层循环下来就数组从小到大排序了
* @param array $array 要比较的数组
* @return array $array 从小到大排序后的数组
*/
function selectSort($array){
        $cnt = count($array);
        for($i=0;$i<$cnt;$i++){
                for($j=($i+1);$j<$cnt;$j++){
                        if($array[$i]>$array[$j]){
                                $tmp = $array[$i];
                                $array[$i] = $array[$j];
                                $array[$j] = $tmp;
                        }
                }
        }
        return $array;
}


***
#### 四种this的类型
```
介绍一下四种this的类型：

默认绑定 （全局环境中，this默认绑定到window）
隐式绑定
显式绑定 all/apply
new绑定
其中，默认绑定就是什么都匹配不到的情况下，非严格模式this绑定到全局对象window或者global,严格模式绑定到undefined;隐式绑定就是函数作为对象的属性，通过对象属性的方式调用，这个时候this绑定到对象;显示绑定就是通过apply和call调用的方式;new绑定就是通过new操作符时将this绑定到当前新创建的对象中，它们的匹配有限是是从小到大的。

一般地，被直接对象所包含的函数调用时，也称为方法调用，this隐式绑定到该直接对象

复制代码
function foo(){
    console.log(this.a);
};
var obj1 = {
    a:1,
    foo:foo,
    obj2:{
        a:2,
        foo:foo
    }
}

//foo()函数的直接对象是obj1，this隐式绑定到obj1
obj1.foo();//1

//foo()函数的直接对象是obj2，this隐式绑定到obj2
obj1.obj2.foo();//2

隐式丢失 值得一看
http://www.cnblogs.com/xiaohuochai/p/5735901.html
```

***
#### 绝对定位 max-width也可以居中
```
max-width: 600px;
position: absolute;
    top: 0;
    left: 0;
    right:0;
    width: 100%;
    height: 100%;
    margin:0 auto;
```


***
#### mysql left join、right join、inner join的区别
```
A LEFT JOIN B:
left join是以A表的记录为基础的,A可以看成左表,B可以看成右表,left join是以左表为准的.
换句话说,左表(A)的记录将会全部表示出来,而右表(B)只会显示符合搜索条件的记录(例子中为: A.aID = B.bID).
B表记录不足的地方均为NULL.
right join 反之
inner join 取两者都有的，其他不显示
```


***
#### mysql设置外键 on update on delete CASCADE
```
CASCADE
删除：删除主表时自动删除从表。删除从表，主表不变
更新：更新主表时自动更新从表。更新从表，主表不变
参考
https://my.oschina.net/cart/blog/277624
```


***
#### LBS应用中"附近的人"在服务器端如何更高效快速地计算距离？

```
用经纬度做索引，
先粗算，比如把经纬度差一以上的全去掉，where latitude>y-1 and latitude<y+1 and longitude>x-1 and longitude <x+1 and ... ; x,y为当前用户的经纬度。
再小范围概算，使用类似这样的公式 order by abs(longitude -x)+abs(latitude -y) limit 100;
最后显示时再精确计算 使用类似这样的公式:(2 * 6378.137* ASIN(SQRT(POW(SIN(PI()*(y-lat)/360),2)+COS(PI()*x/180)* COS(lat * PI()/180)*POW(SIN(PI()*(x-lng)/360),2))))。
前两项在数据库端计算，后一项在应用服务器端计算即可。

链接：https://www.zhihu.com/question/19937663/answer/21170137

php 代码：（laravel）

    public function near($version,Request $request)
    {
        $lng=$request->input('lng');
        $lat=$request->input('lat');
        $range=$request->input('range',5);
        $limit=$request->input('limit',20);

        if ($lng=='' || $lat=='') 
            return $this->toJson(-1,'经纬度不能为空');
        $arr=$this->returnSquarePoint($lng, $lat,$range * 1000);
        //TODO 东西半球，南北半球的换算绝对值？
        $bikelocks=Bikelock::where('lat','<=',$arr['left-top']["lat"])
        ->where('lat','>=',$arr['right-bottom']["lat"])
        ->where('lng','>=',$arr['left-top']["lng"])
        ->where('lng','<=',$arr['right-bottom']["lng"])
        ->where('status_lock','0')->orderByRaw('( ABS(lat -'.$lat.')+ABS(lng -'.$lng.') )')->take($limit)->get(['device_id','status_book','status_lock','lat','lng','electricity']);

        return $this->toJson(0,'',$bikelocks);
    }


    /**
     * 
     * @author bajian
     * @param distance 单位米
     * @return array
     */
    private function returnSquarePoint($lng, $lat,$distance = 5000){
       $earthRadius = 6378138;
       $dlng =  2 * asin(sin($distance / (2 * $earthRadius)) / cos(deg2rad($lat)));
       $dlng = rad2deg($dlng);
       $dlat = $distance/$earthRadius;
       $dlat = rad2deg($dlat);
       return array(
         'left-top'=>array('lat'=>round($lat + $dlat,6),'lng'=>round($lng-$dlng,6)),
         'right-top'=>array('lat'=>round($lat + $dlat,6), 'lng'=>round($lng + $dlng,6)),
         'left-bottom'=>array('lat'=>round($lat - $dlat,6), 'lng'=>round($lng - $dlng,6)),
         'right-bottom'=>array('lat'=>round($lat - $dlat,6), 'lng'=>round($lng + $dlng,6))
         );
   }
```


***
####  查询数据库中的表名
```
SELECT * FROM information_schema.tables WHERE TABLE_NAME LIKE 'data_%'

SELECT * FROM information_schema.tables WHERE TABLE_SCHEMA='db_kirito' AND  TABLE_NAME LIKE 'bi_%'

```

***
####  百度地图经纬度偏移量
```

  var lng = parseFloat(obj.lng) + 0.011307845100006375;
  var lat = parseFloat(obj.lat) + 0.0035078896000015902;
```

***
#### compact 创建一个包含变量名和它们的值的数组：
```
<?php
$firstname = "Bill";
$lastname = "Gates";
$age = "60";

$result = compact("firstname", "lastname", "age");

print_r($result);//Array ( [firstname] => Bill [lastname] => Gates [age] => 60 )
?>

```


***
#### 微信端地址刷新（跳转）不能是和当前页面同一个连接，否则不刷新
```
window.location.reload()
window.location.href="/reload.html"
都不行，除非加随机数

```



***
#### String.replace() 语法 替换文本中的$字符有特殊含义：（用于模式匹配的String方法）
```
$1、$2、...、$99 与 regexp 中的第 1 到第 99 个子表达式相匹配的文本。
$&  与 regexp 相匹配的子串。
$`  位于匹配子串左侧的文本。
$'  位于匹配子串右侧的文本。
$$  普通字符$。

如：
'abc'.replace(/b/g, "{$$$`$&$'}")
// 结果为 "a{$abc}c"，即把b换成了{$abc}
'abccba'.replace(/b/g, "{$`}")
// 结果为 "a{a}cc{abcc}a"


定位点（锚字符、边界）
^ 匹配开始的位置。将 ^ 用作括号[]表达式中的第一个字符，则会对字符集求反。
$ 匹配结尾的位置。
\b 与一个字边界匹配，如er\b 与“never”中的“er”匹配，但与“verb”中的“er”不匹配。
\B 非边界字匹配。

? 当该字符紧跟在任何一个其他限制符（*,+,?，{n}，{n,}，{n,m}）后面时，匹配模式是非贪婪的。非贪婪模式尽可能少的匹配所搜索的字符串，而默认的贪婪模式则尽可能多的匹配所搜索的字符串。例如，对于字符串“oooo”，“o+?”将匹配每个“o”即4次匹配，而“o+”将只匹配1次即匹配“oooo”。
"AB01CD23CD45CEff".match('AB.*CD')
["AB01CD23CD"]

"AB01CD23CD45CEff".match('AB.*?CD')
["AB01CD"]
http://web.jobbole.com/89221/

```

***
#### gitignore 语法
```
语法规范

空行或是以 # 开头的行即注释行将被忽略。
可以在前面添加正斜杠 / 来避免递归,下面的例子中可以很明白的看出来与下一条的区别。
可以在后面添加正斜杠 / 来忽略文件夹，例如 build/ 即忽略build文件夹。
可以使用 ! 来否定忽略，即比如在前面用了 *.apk ，然后使用 !a.apk ，则这个a.apk不会被忽略。
* 用来匹配零个或多个字符，如 *.[oa] 忽略所有以".o"或".a"结尾， *~ 忽略所有以 ~ 结尾的文件（这种文件通常被许多编辑器标记为临时文件）； [] 用来匹配括号内的任一字符，如 [abc] ，也可以在括号内加连接符，如 [0-9] 匹配0至9的数； ? 用来匹配单个字符。 
看了这么多，还是应该来个栗子：

# 忽略 .a 文件
*.a
# 但否定忽略 lib.a, 尽管已经在前面忽略了 .a 文件
!lib.a
# 仅在当前目录下忽略 TODO 文件， 但不包括子目录下的 subdir/TODO
/TODO
# 忽略 build/ 文件夹下的所有文件
build/
# 忽略 doc/notes.txt, 不包括 doc/server/arch.txt
doc/*.txt
# 忽略所有的 .pdf 文件 在 doc/ directory 下的
doc/**/*.pdf
```


***
#### table 自动换行
```
word-break: break-all;text-align: left;padding-left: 5px;word-wrap:break-word;
```


***
#### cookie ls 跨域的办法
```
Cookie跨域单点登录  

为了快速、简单的实现这一功能，首先想到就是通过JS操作Cookie并让两个不同域的cookie能够相互访问，这样就可达到了上述的效果，具体实现过程大致可分以下两个步骤：  

１、在Ａ系统下成功登录后，利用JS动态创建一个隐藏的iframe，通过iframe的src属性将Ａ域下的cookie值作为 get参数重定向到Ｂ系统下b.aspx页面上；  

var _frm = document.createElement("iframe"); 
_frm.style.display="none";  
_frm.src="http://b.com/b.jsp?test_cookie=xxxxx";  
document.body.appendChild(_frm);  

2、在Ｂ系统的b.aspx页面中来获取Ａ系统中所传过来的cookie值，并将所获取到值写入cookie中，这样就简单的实现了cookie跨域的访问；　不过这其中有个问题需要注意，就是在IE浏览器下这样操作不能成功，需要在b.aspx页面中设置P3P HTTP Header就可以解决了（具体詳細信息可以参考:http://www.w3.org/P3P/)，P3P设置代码为： 

也可以在html加入标记 
<meta http-equiv="P3P" content='CP="IDC DSP COR CURa ADMa  OUR IND PHY ONL COM STA"'>


Response.AppendHeader("P3P", "CP='IDC DSP COR CURa ADMa  OUR IND PHY ONL COM STA'"); 
```


***
#### ajax 跨域原理
```
1、简单请求(simple request)
简单请求的判断包括两个条件：

请求方法必须是一下几种:
HEAD
GET
POST
HTTP 头只能包括以下信息：
Accept
Accept-Language
Content-Language
Last-Event-ID
Content-Type: 只限于[application/x-www-form-urlencoded, multipart/form-data, text/plain]
不能同时满足以上两个条件的，就都视作非简单请求

在 CROS 请求中，默认是不会携带 cookie之类的用户信息的，但是不携带用户信息的话，是没办法判断用户身份的，所以，可以在请求时将withCredentials设置为 true, 例如：

设置了这个值之后，在服务端会将 response 中的 Access-Control-Allow-Credentials 也设置为 true，这样浏览器才会相应 cookie
如果这个值被设为了`true`，那么`Access-Control-Allow-Origin`就不能被设置为    `*`，必须要显示指定为`origin`的值；并且返回的`cookie`因为是在被跨域访问的域名下，因为遵守同    源策略，所以在`origin`网页中是不能被读取到的。


2、非简单请求(not-so-simple request)
与简单请求最大的不同在于，非简单请求实际上是发送了两个请求。

在正式请求之前，会先发送一个预请求(preflight-request)（options类型），这个请求的作用是尽可能少的携带信息，供服务端判断是否响应该请求。

还会带上这几个字段：
Origin: 同简单请求的origin
Access-Control-Request-Method: 请求将要使用的方法
Access-Control-Request-Headers: 浏览器会额外发送哪些头信息

服务端
如果判断响应这个请求，返回的response中将会携带：

Access-Control-Allow-Origin: origin
Access-Control-Allow-Methods: like request
Access-Control-Allow-Headers: like request
如果否定这个请求，直接返回不带这三个字段的response就可以，浏览器将会把这种返回判断为失败的返回，触发onerror方法

php 设置方式
private function SetCors(){
    $origin = isset($_SERVER['HTTP_ORIGIN'])? $_SERVER['HTTP_ORIGIN'] : '*';
    header('content-type:application:json;charset=utf8');  
    header('Access-Control-Allow-Origin:'.$origin);  
    header('Access-Control-Allow-Methods:*');  
    header('Access-Control-Allow-Credentials:true');  
    header('Access-Control-Allow-Headers:x-requested-with,content-type');
    }

options类型 
if ($_SERVER['REQUEST_METHOD']=='OPTIONS') {
    $origin = isset($_SERVER['HTTP_ORIGIN'])? $_SERVER['HTTP_ORIGIN'] : '*';
    header('content-type:application:json;charset=utf8');  
    header('Access-Control-Allow-Origin:'.$origin);  
    header('Access-Control-Allow-Methods:*');  
    header('Access-Control-Allow-Credentials:true');  
    header('Access-Control-Allow-Headers:x-requested-with,content-type');
    return ;
}

js

        var unlock=function(){
            $.ajax({
            url:'http://vkapi.goupianyi888.com/api/v1/device/unlock',
            method:'post',
            data:{
                device_id:'1234567890123',
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success:function(data){
                console.log(data);
            }
        })

        }
IOS 微信端跨域cookie不可用，最好还是用token的方式
```

***
#### laravel 获得查询原始sql
```
DB::connection()->enableQueryLog();
 
        $bikelocks=Bikelock::where('lat','>=',$arr['left-top']["lat"])
            ->where('lat','<=',$arr['right-bottom']["lat"])
            ->where('lng','>=',$arr['left-top']["lng"])
            ->where('lng','<=',$arr['right-bottom']["lng"])->take($limit)->get();
            print_r(
    DB::getQueryLog()
```

***
#### laravel orWhere 和 where 组合 问题
```
How do I say WHERE (a=1 OR b=1) AND (c=1 OR d=1)
Model::where(function ($query) {
    $query->where('a', '=', 1)
          ->orWhere('b', '=', 1);
})->where(function ($query) {
    $query->where('c', '=', 1)
          ->orWhere('d', '=', 1);
});

//correct
    if ($keyword){
        $query = $query->where(function($q) use($keyword){
            $q->where('title', 'like', "%{$keyword}%")
                ->orWhere('content', 'like', "%{$keyword}%");
        });
    }
//  error      $query = $query->where('title','like',"%{$keyword}%")->orWhere('content','like',"%{$keyword}%");
//    string(123) "select count(*) as aggregate from `articles` where `begin_at` <= ? and `end_at` >= ? and `title` like ? or `content` like ?" 这里问题可以看的很明显


```

***
#### mysql 多字段搜索中文 报错 Illegal mix of collations for operation 'like'
```
原因datetime等日期型 不支持中文搜索
解决方法：判断是中文搜索就去掉日期
if (!empty($search)){
            $pattern = '/[^\x00-\x80]/';
            if(preg_match($pattern,$search))
                $searchArr=["user_id","content"];
            $sumSqlWhere =" and ".join(" LIKE '%".$search."%'|| ",$searchArr);
            $sumSqlWhere.=" LIKE '%".$search."%'";
        }

```

***
#### vim常见快捷键
```
$移动到行尾
^移动到行首
dd 删除当前行
u 撤销
p 粘贴
G 移动到文章尾部
gg 移动到文章头部
显示行号 :set nu
「#dd」：从光标所在行开始删除#行。#为数字

:g/targetWord 全局搜索
n 搜索下一个同样的内容
N 搜索上一个同样的内容

d^      删除光标之前的该行剩余部分
dw       删除光标之后的单词剩余部分。
d$       删除光标之后的该行剩余部分。
```


***
#### mysql中的get_lock锁机制解析
```
SELECT GET_LOCK('key_lock', 1000);
UPDATE t_lock SET VALUE = 'uuu' ,NAME='yy' WHERE id = 1;
SELECT RELEASE_LOCK('key_lock');

http://blog.csdn.net/tangtong1/article/details/51792617

php并发加锁示例
锁的操作一般只有两步，一 获取锁(getLock)；二是释放锁(releaseLock)。但现实锁的方式有很多种，可以是文件方式实现；sql实现；Memcache实现；根据这种场景我们考虑使用策略模式。
http://www.jb51.net/article/94878.htm



```

***
#### insert ignore into
```
INSERT IGNORE 与INSERT INTO的区别就是INSERT IGNORE会忽略数据库中已经存在 的数据，如果数据库没有数据，就插入新的数据，如果有数据的话就跳过这条数据。这样就可以保留数据库中已经存在数据，达到在间隙中插入数据的目的。
eg: insert ignore into table(name)  select  name from table2 

```


***
#### laravel 数据库锁
```
首先，laravel事务有两种写法
1、
$model=null;
DB::connection()->enableQueryLog();
DB::transaction(function() use(&$model){
            $model = Merchant::lockForUpdate()->find(5);
            //$model = Merchant::sharedLock()->find(5);
            $model->balance=$model->balance+1;
            $model->save();
            var_dump(DB::getQueryLog());
        });
2、
DB::beginTransaction();
$model = Merchant::lockForUpdate()->find(5);
$model->balance=$model->balance+1;
$model->save();
var_dump(DB::getQueryLog());
DB::commit();

其次
lockForUpdate()
sharedLock()//执行行锁（需要引擎innodb（且使用主键，没有主键的是会表锁的）,因为myisan会变成表锁，两种类型最主要的差别就是Innodb 支持事务处理与外键和行级锁）
如果使用针对InnoDB的表使用行锁，被锁定字段不是主键，也没有针对它建立索引的话。行锁锁定的也是整张表。锁整张表会造成程序的执行效率会很低。

http://blog.csdn.net/xifeijian/article/details/20316775

lock for update的加锁方式无非是比lock in share mode的方式多阻塞了select...lock in share mode的查询方式，并不会阻塞快照读。
http://blog.csdn.net/cug_jiang126com/article/details/50544728
在我看来，SELECT ... LOCK IN SHARE MODE的应用场景适合于两张表存在关系时的写操作，拿mysql官方文档的例子来说，一个表是child表，一个是parent表，假设child表的某一列child_id映射到parent表的c_child_id列，那么从业务角度讲，此时我直接insert一条child_id=100记录到child表是存在风险的，因为刚insert的时候可能在parent表里删除了这条c_child_id=100的记录，那么业务数据就存在不一致的风险。正确的方法是再插入时执行select * from parent where c_child_id=100 lock in share mode,锁定了parent表的这条记录，然后执行insert into child(child_id) values (100)就ok了。
总结：lock in share mode适用于两张表存在业务关系时的一致性要求，for  update适用于操作同一张表时的一致性要求。

面向程序员的“锁”：乐观锁，悲观锁
面向mysql的锁：共享锁lock in share mode(S锁)，排它锁 for update(X锁)

锁多个表
$queue = Users::with(array('email'=>function($query){
            $query->lockForUpdate();
    })->lockForUpdate()
    ->get()
```

***
#### laravel 分页
```
http://laravelacademy.org/post/6960.html

        $users=User::paginate(15,  ['*'], 'page',1);//per_page,column,page,current_page
        $users->setPath('custom/url');
        return $this->toJson($users);

$pagination = $query->with('address')->paginate($perPage);
    $pagination->appends([
        'sort' => request()->sort,
        'filter' => request()->filter,
        'per_page' => request()->per_page
    ]);

    可以尝试用id 做页数，那样翻页不会出现更新的时候数据往下页挤
```

***
#### Laravel 5 : MassAssignmentException in Model.php
```
原因，model中使用了create方法，该Model类中必须制定$fillable
protected $fillable = ['user_id','sign_code_id'];


    public static function createRecord(array $data = [])
    {
        return self::create($data);
    }
```

***
####  laravel 5.4 报错SQLSTATE[42000] Syntax error or access violation 1055 'xxx' isn't in GROUP BY
```
查询mysql 1055错误码发现问题为在mysql的配置中如果设置了sql_mode包含ONLY_FULL_GROUP_BY值得话，在进行查询时需要将select的字段都包含在group by 中。
即 select x,y from xxx group by x,y
否则就会报错
但是查看自己的配置my.cnf发现在sql_mode中并没有ONLY_FULL_GROUP_BY这个值
然后去查看Laravel的配置文件，config/database.php，查找mysql的配置，
'mysql' => [
            'driver' => 'mysql',
            'host' => env('DB_HOST', 'localhost'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE', 'forge'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => env('DB_PREFIX',''),
            'strict' => true,
            'engine' => null,
        ],
发现有个strict项，默认为true，上网也没有查找到相关解释，根据字面意思猜测可能为是否开启严格模式，将其修改为false，再次测试发现问题解决，可以输出正确结果
```

***
#### laravel 配置相关、缓存配置
```
php artisan config:cache
php artisan config:clear

php artisan route:cache
php artisan route:clear

获取配置
可以使用 config 辅助函数获取你的设置值，设置值可以通过「点」语法来获取，其中包含了文件与选项的名称。你也可以指定一个默认值，当该设置选项不存在时就会返回默认值：

$value = config('app.timezone');
若要在运行期间修改设置值，请传递一个数组至 config 辅助函数：

config(['app.timezone' => 'America/Chicago']);


获取ENV文件的值 （只在config目录使用，不然可能存在缓存问题）
env('APP_DEBUG', false)

优化composer拆解：
php artisan optimize
1.composer dump-autoload --optimize // composer 层面优化加载速度
2.php artisan clear-compiled // 删除 bootstrap/cache/services.php

总结
php artisan optimize
php artisan config:cache
php artisan route:cache

http://www.jianshu.com/p/1d5fa4696ca9
http://d.laravel-china.org/docs/5.4/configuration#configuration-caching

```

***
#### laravel passport jwt
```
根據http://laravelacademy.org/post/5993.html配置后，
不用oauth的話，只要php artisan passport:client --password生成一個自用的client就行了
然後得到 oauth_clients表多了一條client數據

客戶端登錄的時候帶上，請求URL:'/oauth/token'

$url='http://api.com/oauth/token';
$data=[
        'grant_type' => 'password',
        'client_id' => '16',
        'client_secret' => 'cASw4y3CxxxIu6rbo43b0gUhHhWl6zN0KDJvqsRo',
        'username' => '276665346@qq.com',
        'password' => '123456',
        'scope' => '*'
    ];
echo http_request($url, $data);
得到access_token,以後每次請求再header里帶上Authorization: Bearer +access_token

GET http://api.com/api/user HTTP/1.1
Host: api.com
Connection: keep-alive
Cache-Control: max-age=0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36
Referer: http://api.com/login
Accept-Encoding: gzip, deflate, sdch
Accept-Language: zh-CN,zh;q=0.8
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjVkNTYzZDM5NzM4MTRjNGRlYzJjYmE1YzI4YWRlM2M0NjI0NTZkY2ZlNGRhMDRkNzQ3NDA4YmU2YmNhOTg1NTE5MjlhNjI2N2ZiNjc1Yjk3In0.eyJhdWQiOiIxNiIsImp0aSI6IjVkNTYzZDM5NzM4MTRjNGRlYzJjYmE1YzI4YWRlM2M0NjI0NTZkY2ZlNGRhMDRkNzQ3NDA4YmU2YmNhOTg1NTE5MjlhNjI2N2ZiNjc1Yjk3IiwiaWF0IjoxNDkwODY3MTQwLCJuYmYiOjE0OTA4NjcxNDAsImV4cCI6MTUyMjQwMzE0MCwic3ViIjoiMyIsInNjb3BlcyI6WyIqIl19.GogqyJJGG43QCTWsFGDHRqJVDxpn73A9Ty2uExC8NmCphqhHwned4JPxbH-QdBAwAHZ35c-om2uVR-kU6IcSPGRkAzuv2wzHHb50C1852XSDu3vUQ1ZQdUu-bS1rJPDcN_lx_pe_gJF0qHGnt7z-CrJp6X8OsrbK3rEjwoe4gSFPTqgLqwzcFFusBVz9YF3bbuCjdXvlpd3Gq7W6h48sE25z--Yx97TV-j305PicKp8YynnXV5fmiTC73talKcbIZhRtbinQDCD7s20zFVXyBYAO9D5wkY-KyBIB9EeJNWp8lYwdnzV4bqKT6sb7k0uKzHsoV2wbC4_FFolLkdTmQtpSBN6Tc_KZk3MnE-Yy9HcMaMVaPa00LZ4vyMrLTLqWLqcJsFYCcMpSdpaLP95P0v0TjOlALjKLLY0AVAhN_o-MBzb75RIqEoCKqelO2kgjhjj0Ew3EkxKb8Tw4eD5IXFTcazZQG14xC1CnUv5U6sOLfj4hpQ1HHmtuwI39-HJjJ5r3QA49QCUFs_EmZI0eVFIZMHSG8HeEMQyRoTxJEMzeKGijNvWth1SvYGwP9Rd0dlEG18_Rvjgr5KM6rhiHE4ftF_MAUVfnj4UEN-Q7FZIV6_cud3-GM5hKuRXgbyCc4ccJSi_iMYelvvWi4PZlN5P1bnI5RCPO5DmMEIsrJmU


配置自带的passport 页面
1、php artisan make:auth //先生成自带登录页面，然后登录http://aligenie.com/home
2、assets/js/app.js中添加
Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue')
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue')
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue')
);

3、在home.blade 中引入<div id="app">
                            <passport-clients></passport-clients>
                            <passport-authorized-clients></passport-authorized-clients>
                            <passport-personal-access-tokens></passport-personal-access-tokens>
                        </div>

```


***
#### laravel 获取session id
```
nRRw2MfQNqe5gbohFqhgt5mJ5zqBhPeJSK87CvcB
var_dump(Session::getId());

```

***
####  Carbon和PHP date之间的各种转换
```
carbon本身是一个非常好用的PHP date package，但是有的时候我们还希望用到php原生的函数功能，比如format成微信开发需要的20180120112305的字符串格式

$n = new \Carbon\Carbon();
$ts =  $n->getTimestamp();
return date('YmdHis',$ts);  // 20180104161547
$u = User::orderBy('created_at','desc')->first();
$ts = $u->created_at; // 被laravel自动cast为carbon object
return date('YmdHis',$ts->getTimestamp());  // 20180104161547

```

***
####   Composer错误处理 Please create a github oauth token
```
1. 通过：https://github.com/settings/tokens创建一个token

2. composer config --global github-oauth.github.com 23bc35a888235f66032ef68c7a8023b7b28e0f6
```

***
#### 前端移动适配
```
<link rel="alternate" media="only screen and (max-width: 640px)" href="http://m.dilidili.com/">

```

***
#### 获取远程文件的大小
```
function remote_filesize($url, $user = "", $pw = "")
{
    ob_start();
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HEADER, 1);
    curl_setopt($ch, CURLOPT_NOBODY, 1);
    if(!empty($user) && !empty($pw))
    {
        $headers = array('Authorization: Basic ' .  base64_encode("$user:$pw"));
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    }
    $ok = curl_exec($ch);
    curl_close($ch);
    $head = ob_get_contents();
    ob_end_clean();
    $regex = '/Content-Length:\s([0-9].+?)\s/';
    $count = preg_match($regex, $head, $matches);
    return isset($matches[1]) ? $matches[1] : "unknown";
}
```


***
#### 文件下载 和文件限速下载
```
// local file that should be send to the client
$local_file = 'test-file.zip';
// filename that the user gets as default
$download_file = 'your-download-name.zip';
 
// set the download rate limit (=> 20,5 kb/s)
$download_rate = 20.5; 
if( is_file($local_file)) {//如果要检查的文件存在，那么is_file() 比 file_exists() 快很多倍，但如果文件不存在，则两者差不多。

    // send headers
    header('Cache-control: private');
    header('Content-Type: application/octet-stream'); 
    header('Content-Length: '.filesize($local_file));
    header('Content-Disposition: filename='.$download_file);
 
    // flush content
    flush();    
    // open file stream
    $file = fopen($local_file, "r");    
    while(!feof($file)) {
 
        // send the current file part to the browser
        echo fread($file, round($download_rate * 1024));    
 
        // flush the content to the browser
        flush();
 
        // sleep one second
        sleep(1);    
    }    
 
    // close file stream
    fclose($file);}
else {
    die('Error: The file '.$local_file.' does not exist!');
}

 根据 URL 下载图片
function imagefromURL($image,$rename)
{
$ch = curl_init($image);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_BINARYTRANSFER,1);
$rawdata=curl_exec ($ch);
curl_close ($ch);
$fp = fopen($rename,'w');
fwrite($fp, $rawdata); 
fclose($fp);
}

```


***
#### 确定任意图片的主导颜色
```
function dominant_color($image)
{
$i = imagecreatefromjpeg($image);
for ($x=0;$x<imagesx($i);$x++) {
    for ($y=0;$y<imagesy($i);$y++) {
        $rgb = imagecolorat($i,$x,$y);
        $r   = ($rgb >> 16) & 0xFF;
        $g   = ($rgb >>  & 0xFF;
        $b   = $rgb & 0xFF;
        $rTotal += $r;
        $gTotal += $g;
        $bTotal += $b;
        $total++;
    }
}
$rAverage = round($rTotal/$total);
$gAverage = round($gTotal/$total);
$bAverage = round($bTotal/$total);
}

/**
     * RGB转 十六进制
     * @param $rgb RGB颜色的字符串 如：rgb(255,255,255);
     * @return string 十六进制颜色值 如：#FFFFFF
     */
    function RGBToHex($rgb){
        $regexp = "/^rgb\(([0-9]{0,3})\,\s*([0-9]{0,3})\,\s*([0-9]{0,3})\)/";
        $re = preg_match($regexp, $rgb, $match);
        $re = array_shift($match);
        $hexColor = "#";
        $hex = array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F');
        for ($i = 0; $i < 3; $i++) {
            $r = null;
            $c = $match[$i];
            $hexAr = array();
            while ($c > 16) {
                $r = $c % 16;
                $c = ($c / 16) >> 0;
                array_push($hexAr, $hex[$r]);
            }
            array_push($hexAr, $hex[$c]);
            $ret = array_reverse($hexAr);
            $item = implode('', $ret);
            $item = str_pad($item, 2, '0', STR_PAD_LEFT);
            $hexColor .= $item;
        }
        return $hexColor;
    }
    /**
     * 十六进制 转 RGB
     */
    function hex2rgb($hexColor) {
        $color = str_replace('#', '', $hexColor);
        if (strlen($color) > 3) {
            $rgb = array(
                'r' => hexdec(substr($color, 0, 2)),
                'g' => hexdec(substr($color, 2, 2)),
                'b' => hexdec(substr($color, 4, 2))
            );
        } else {
            $color = $hexColor;
            $r = substr($color, 0, 1) . substr($color, 0, 1);
            $g = substr($color, 1, 1) . substr($color, 1, 1);
            $b = substr($color, 2, 1) . substr($color, 2, 1);
            $rgb = array(
                'r' => hexdec($r),
                'g' => hexdec($g),
                'b' => hexdec($b)
            );
        }
        return $rgb;
    }
```

***
#### laravel 测试过的一些方法
```
        // $user=new User();
        // $user->name="1234567333";
        // $user->password="1234";
        // $user->balance=11.22;
        // $user->save();//->delete();

        // dd($user);
        // dd(User::all());
        // var_dump(User::where('balance','>', 60)
        //        ->orderBy('balance', 'desc')
        //        ->take(2)
        //        ->get());
        // var_dump(User::where('balance','>', 60)
        //     ->take(1)->update(['balance' => 99]));//传递给 update 方法的参数必须是一个数组
        // var_dump(User::where('balance','>', 60)
        //        ->count());

        // $flight = User::create(['name' => 'Flight1w1','balance'=>'34.21','password'=>"aa"]);
        // 
        // var_dump(User::where('name','Flight1w1')->delete());//hard delete
        // var_dump(BookHistory::where('user_id',1)->delete());//当有deleted_at 和use SoftDeletes;是soft delete、参见->forceDelete();
        // var_dump(User::where('name','Flight1w1')->delete());//hard delete
        // echo $user[0]->id;
        // var_dump(User::find(1)->bookhistory->device_id);//不包含delete_at不为null的
        // 
        // var_dump(Auth::user());同样效果
        // $request->user() returns an instance of the authenticated user...
        // echo session('user_id');
            // var_dump(Auth::guard('web')->check());
        // 
        // 
        // $value = Cache::remember('key', 1, function() {//更便捷
        //     return 88;
        //     // return DB::table('users')->get();
        // });

        // Cache::increment('key',1);
        // return Cache::get('key',999);

    // var_dump(Auth::guard('admin')->loginUsingId(1)) ;
    // var_dump(Auth::guard('admin')->check()) ;
    // var_dump(Auth::guard('web')->check()) ;

    $model=Bikelock::where('lat','<=',$arr['left-top']["lat"])
            ->where('lat','>=',$arr['right-bottom']["lat"])
            ->where('lng','>=',$arr['left-top']["lng"])
            ->where('lng','<=',$arr['right-bottom']["lng"])
            ->where('status_lock','0');
        if ($client_no)
            $model=$model->where('device_id','like',$client_no.'%');
        $bikelocks=$model->orderByRaw('( ABS(lat -'.$lat.')+ABS(lng -'.$lng.') )')->take($limit)->get(['device_id','status_book','status_lock','lat','lng','electricity']);


```

***
#### laravel Eloquent 获取数据库个别字段
```
1 $users = User::all(['name']);
2 $admin_users = User::where('role', 'admin')->get(['id','device_id as aaa']);
3 $user = User::find($user_id, ['name']);

$fileUploadVoteRecords=FileUploadVoteRecord::where(['openid'=>$openid])->get()->toarray();
        $fileUploadVoteRecords=array_pluck($fileUploadVoteRecords,'file_upload_id');
```

***
#### laravel 服务容器 个人理解
```
服务容器就好比一个带有DI的高级的工厂模式，而工厂一般都需要一个接口规范，比如你这个Email作为通知用户的一种手段的话
，可以规范出一个通知的接口，而短信也可能作为一种通知的手段，这个时候，就可以用到服务容器了，再用到的地方只要用IoC去注入通知的接口
，然后再容器里去绑定具体的实现，就可以达到解耦的效果，随时可以切换通知的手段
```

***
#### laravel 缓存查询
```
【eloquent里没有此方法】
$users = DB::table('users')->remember(10)->get();
在本例中,查询的结果将为十分钟被缓存。查询结果缓存时,不会对数据库运行,结果将从默认的缓存加载驱动程序指定您的应用程序。
如果您使用的是支持缓存的司机,还可以添加标签来缓存:
$users = DB::table('users')->cacheTags(array('people', 'authors'))->remember(10)->get();

eloquent还是要使用
$a = Cache::remember(env('KEY_CACHE_RECOMMEND_ACTIVITY'), env('KEY_CACHE_RECOMMEND_ACTIVITY_TIME'), function() {
        return Article::where('is_recommend','1')
            ->where('ispublished','1')
            ->with('columns')->withCount('collections')
            ->orderBy('id', 'desc')
            ->take(10)->get();
         });
```

***
#### laravel 数据库加锁
```
    public function t()
    {
            $model = Merchant::where('id', 5)->lockForUpdate()->first();
            sleep(15);
//        $model->increment('balance');//实测不commit也一样要等函数执行完毕才执行t2
        return $this->toJson(0,'',$model->balance);
    }
public function t2()
    {
        $model = Merchant::where('id', 5)->lockForUpdate()->first();
        $model->increment('balance');
        return $this->toJson(0,'',$model->balance);//确实在t执行完才执行t2接口的返回
    }


```

***
#### laravel Eloquent 只获取第一个对象的方法
```
$merchant=Merchant::where('openid',$re_openid)->first();
```

***
####  laravel Eloquent date filtering
```
1 $users = User::all(['name']);
2 $admin_users = User::where('role', 'admin')->get(['id','device_id as aaa']);
3 $user = User::find($user_id, ['name']);
```

***
####  laravel Eloquent Retrieve random rows
```
$questions = Question::orderByRaw('RAND()')->take(10)->get();

select * from cmf_posts where 1=1 order by RAND()
```

***
#### laravel router dispatch
```
$request = Request::create('/api/cars/' . $id . '?fields=id,color', 'GET');
$response = json_decode(Route::dispatch($request)->getContent());
```

***
#### laravel header 获取
```
$access_token = Request::header('Authorization');
```

***
#### laravel 依赖注入的时候传递参数
```
熟悉Laravel人都知道Laravel的Service Provider，但是如果要注入的类需要初始化参数呢？这个时候可以通过ServiceProvider中的register来绑定实现。

public function register()
{
    $this->app->bind('Bloom\Security\ChannelAuthInterface', function()
    {
        $request = $this->app->make(Request::class);
        $guard   = $this->app->make(Guard::class);

        return new ChannelAuth($request->input('channel_name'), $guard->user());
    });
}
```

***
#### laravel share cookie between domains
```
// app/Http/Middleware/EncryptCookies.php
protected $except = [
    'shared_cookie'

];

Cookie::queue('shared_cookie', 'my_shared_value', 10080, null, '.example.com');
```

***
#### laravel Eloquent 专题，，一个个贴太累了
```
Simple incrementing & Decrementing

$customer = Customer::find($customer_id);
$loyalty_points = $customer->loyalty_points + 50;
$customer->update(['loyalty_points' => $loyalty_points]);

// adds one loyalty point

Customer::find($customer_id)->increment('loyalty_points', 50);
// subtracts one loyalty point

Customer::find($customer_id)->decrement('loyalty_points', 50);


updateOrCreate
1、Model:
    protected $fillable = [
        'id', 'title', 'abstract', 'content', 'cover', 'author', 'istop', 'column_id', 'jump_link', 'ispublished',
        'view_times', 'lat', 'lng', 'location_cn', 'city', 'province', 'begin_at', 'end_at', 'limit_person_num', 'price', 'is_recommend',
    ];

2、
$a=Article::updateOrCreate(['id'=> $article_id],$arr);
//如果存在id 为 $article_id ，则update $arr，否则create  $arr
public function create_activity($version,Request $request){
        $arr = $request->all();
        $title=$request->input('title');
        $article_id=$request->input('article_id','0');
        if (!$this->checkAllArgsExist($title))
            return $this->toJson('参数不全');

        $a=Article::updateOrCreate(['id'=> $article_id],$arr);
        return $this->toJson(0,$arr,$a);
    }
```

***
#### laravel Eloquent having raw
```
SELECT *, COUNT(*) FROM products GROUP BY category_id HAVING count(*) > 1;

DB::table('products')
    ->select('*', DB::raw('COUNT(*) as products_count'))
    ->groupBy('category_id')
    ->having('products_count', '>', 1)
    ->get();
Product::groupBy('category_id')->havingRaw('COUNT(*) > 1')->get();

$emails = Email::select('username', DB::raw('count(*) as total')) ->groupBy('username') ->get(); 
```


***
#### laravel Eloquent 联合查询,with 解决N+1问题
```
在Model中创建：
    public function bookhistory()
    {
        return $this->hasOne('App\BookHistory');
        // return $this->hasOne('App\BookHistory','user_id','id');
    }
然后with('bookhistory'):
// var_dump(Bike::find(1)->bikelock);
        $bike=Bike::where('bike_id',$bike_id)->take(1)->with('bikelock')->get();//记得这里返回的是数组
        if ($bike && $bike[0]->bikelock) {
            return $this->toJson(0,'',$bike[0]->bikelock);
        }


        $user=Auth::user()->with('merchant')->get();
    $user=Auth::user()->merchant;

 Eager loading with nested resource
有时，你希望一次性地获取资源对应的relation，并且可能希望嵌套的relation也能获取，比如，一本书Book属于一个author,一个author又有对应的contacts信息，你希望一次性获取一本书对应的作者以及作者对应的联系信息.可以通过以下方法一次性搞定（使用dot语法！！！）：
$books = App\Book::with('author.contacts')->get();

$c=Collection::where('id',33)->with('articles.columns')->first();

Eager loading with nested resource and selected columns
有时，你希望一次性地获取资源对应的relation，并且可能希望嵌套的relation也能获取，并且限制两层relation对应需要选择的字段(减少网络传输，提高性能)比如，一本书Book属于一个author,一个author又有对应的contacts信息，你希望一次性获取一本书对应的作者（name,id字段）以及作者对应的联系信息（address,user_id字段）.可以通过以下方法一次性搞定（使用dot语法！！！）：
$books = App\Book::with(['author'=>function($q){
 $q->select(['id','name']);
}, 'author.contacts'=>function($q){
 $q->select(['address','user_id']; // 注意user_id字段是必选的哦，因为这是user和address表的外键！
})->get();


many2many

class Article extends BaseModel
{

    protected $hidden = [
        'password',
    ];
    public function tags()
    {
        return $this->belongsToMany('App\Tag');
        //return $this->belongsToMany('App\Tag')->withTimestamps(); //带时间戳 created_at之类的
    }

}

class Tag extends BaseModel
{

    protected $hidden = [
        'password',
    ];

    public function articles()
    {
        return $this->belongsToMany('App\Article');
    }

}


class ArticleTag extends BaseModel
{

    protected $hidden = [
        'password',
    ];
}

三个表：articles , tags , article_tag

$article = Article::find(1);
//return $this->toJson(0,'',$article);
return $this->toJson(0,'',$article->tags);

$tag = Tag::where('name','tag2')->first();
return $this->toJson(0,'',$tag->articles);



Eager Loading Multiple Relationships
Sometimes you may need to eager load several different relationships in a single operation. To do so, just pass additional arguments to the with method:

$books = App\Book::with('author', 'publisher')->get();

Nested Eager Loading
To eager load nested relationships, you may use "dot" syntax. For example, let's eager load all of the book's authors and all of the author's personal contacts in one Eloquent statement:

$books = App\Book::with('author.contacts')->get();


Constraining Eager Loads

Sometimes you may wish to eager load a relationship, but also specify additional query constraints for the eager loading query. Here's an example:

$users = App\User::with(['posts' => function ($query) {
    $query->where('title', 'like', '%first%');
}])->get();
In this example, Eloquent will only eager load posts where the post's title column contains the word first. Of course, you may call other query builder methods to further customize the eager loading operation:

$users = App\User::with(['posts' => function ($query) {
    $query->orderBy('created_at', 'desc');
}])->get();
以此引出一下写法
class BaseModel extends Model
{
    public function scopeWithCertain($query, $relation, Array $columns)
    {
        return $query->with([$relation => function ($query) use ($columns){
            $query->select(array_merge(['id'], $columns));
        }]);
    }
}
$car_list=Car::where('merchant_id',$user->merchant_id)->withCertain('admin',['name','admin_role_type'])->get();
        return $this->toJson(0,'',$car_list);

用户--》关联商户--》关联地区
$query = app(User::class)->newQuery();
        $query->whereNotNull('merchant_id')->with(['merchant'=>function ($queryx){
            $queryx->with('province')->with('city')->with('county');
        }]);

用户--》关联商户--》关联地区
                --》关联设备数withCount，（Merchant模型需要
    public function car(){
        return $this->belongsTo('App\Car','id','merchant_id');
    }
    ）
$query = app(User::class)->newQuery();
        $query->whereNotNull('merchant_id')->with(['merchant'=>function ($queryx){
            $queryx->with('province')->with('city')->with('county')->withCount('car');
        }]);

You may add the "counts" for multiple relations as well as add constraints to the queries:

$posts = Post::withCount(['votes', 'comments' => function ($query) {
    $query->where('content', 'like', 'foo%');
}])->get();

echo $posts[0]->votes_count;
echo $posts[0]->comments_count;
```


***
#### 通用hover 样式
```
.card-view:hover{
  -webkit-animation: mlsh 0.5s ease 0s forwards;
    animation: mlsh 0.5s ease 0s forwards;
    -ms-animation: mlsh 0.5s ease 0s forwards;
    -moz-animation: mlsh 0.5s ease 0s forwards;
    -o-animation: mlsh 0.5s ease 0s forwards;
}

@-webkit-keyframes mlsh {
0% {
  opacity:1; transform-origin:50% 50%; transform: scale(1,1);-webkit-transform: translateY(0px);
  }
100% {
  transform-origin:50% 50%; transform: scale(1,1); opacity:1; box-shadow:0px 0px 20px #999; z-index:2;-webkit-transform: translateY(-2px);
  }
}

    box-shadow: 0 0 30px rgba(0,0,0,.1);
    -webkit-transform: translateY(-2px);
    transform: translateY(-2px);
```

***
#### 通用card view 样式
```
.card-view{
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}
```


***
#### 发送短信验证码记得加个type，
```
注册要判断用户是否已经注册，找回判断用户未注册
不正确就不要发短信，省钱
```


***
#### uuid 
```
     /**
     * 最长32位的 uuid
     * @author bajian
     * @param len
     * @return uuid
     */
function uuid($len=32){
    $charid = md5(uniqid(rand(), true));
    if ($len<32) {
       return substr($charid, 0, $len);
    }
    return $charid;
}
// echo uuid(22);
怕重复还可以按实际情况做一重exist的查询
```


***
#### 防止mysql 重复插入 
```
INSERT INTO marks (NAME,subject1,mark) (SELECT * FROM (SELECT 'kirito','maths',100) AS t WHERE NOT EXISTS (SELECT NAME FROM marks WHERE NAME='kirito' AND subject1='maths' LIMIT 1))


```

***
#### 移动端经验
```
禁止保存或拷贝图像

通常当你在手机或者pad上长按图像 img ，会弹出选项 存储图像 或者 拷贝图像，如果你不想让用户这么操作，那么你可以通过以下方法来禁止：

img {
    -webkit-touch-callout: none;
}
需要注意的是，该方法只在 iOS 上有效。

取消touch高亮

在移动设备上，所有设置了伪类 :active 的元素，默认都会在激活状态时，显示高亮框，如果不想要这个高亮，那么你可以通过以下方法来禁止：

.xxx {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
还有个outline

禁止选中内容

如果你不想用户可以选中页面中的内容，那么你可以禁掉：

html {
    -webkit-user-select: none;
}


如果想同时关闭电话和邮箱识别，可以把它们写到一条 meta 内，代码如下：
<meta name="format-detection" content="telephone=no,email=no" />

关闭iOS键盘首字母自动大写

在iOS中，默认情况下键盘是开启首字母大写的功能的，如果业务不想出现首字母大写，可以这样：

<input type="text" autocapitalize="off" />

关闭iOS输入自动修正

在iOS中，默认输入法会开启自动修正输入内容的功能，如果不需要的话，可以这样：

<input type="text" autocorrect="off" />

```

***
#### nginx access_log 设置buffer
```
access_log /data/wwwlogs/bxjtest.snewfly.com_nginx.log combined buffer=2k;

```
***
#### linux服务器杀毒/肉鸡解决
```
https://www.cnblogs.com/IPYQ/p/6791256.html
https://www.iyunv.com/thread-237251-1-1.html
/opt/clamav/bin/clamscan -r --bell -i / -l /opt/clamav/logs/freshclam.log

结果并没有扫描出肉鸡脚本，最终的解决办法：
发现服务器没有装iptables
http://blog.csdn.net/ronmy/article/details/63297541
安装并关闭除了自己用的几个端口以外的端口
```

***
#### PHP trait 
```
就是代码块的继承
当前类成员覆盖trait的成员,trait覆盖基类的成员

通过逗号分隔，在 use 声明列出多个 trait，可以都插入到一个类中。
trait Hello {
    public function sayHello() {
        echo 'Hello ';
    }
}

trait World {
    public function sayWorld() {
        echo 'World';
    }
}

class MyHelloWorld {
    use Hello, World;
    public function sayExclamationMark() {
        echo '!';
    }
}

$o = new MyHelloWorld();
$o->sayHello();
$o->sayWorld();
$o->sayExclamationMark();//Hello World!

如果两个 trait 都插入了一个同名的方法，如果没有明确解决冲突将会产生一个致命错误。



```


***
#### 备忘，省得每次都查
```
iptables -I INPUT -p tcp -m tcp --dport 3306 -j ACCEPT
iptables -I INPUT -p tcp -m tcp --dport 8585 -j ACCEPT

比如允许IP 2.3.4.5访问则可以
iptables -I INPUT -s 2.3.4.5 -p tcp -j ACCEPT

iptables -L -n

端口 不允许外网ip ，阿里云--云服务器--安全组

保存设置
service iptables save
将当前规则保存至配置文件中，该操作将执行iptables初始化脚本，脚本运行/sbin/iptables-save程序并更新当前的iptables，原来的配置文件保存为iptables.save。
2.一般我们可以指定保存的配置文件iptables-save > 配置文件名
如果想恢复某个配置则执行iptables-restore < 配置文件名

-A INPUT -j REJECT --reject-with icmp-host-prohibited
-A FORWARD -j REJECT --reject-with icmp-host-prohibited
# 这两条的意思是在INPUT表和FORWARD表中拒绝所有其他不符合上述任何一条规则的数据包。并且发送一条host prohibited的消息给被拒绝的主机。

service iptables status
```

***
#### redis 允许外网链接
```
1、禁止所有的redis请求
iptables -I INPUT -p TCP --dport 6379 -j DROP
2、开放给某IP访问请求,如192.168.5.100：
iptables -I INPUT -s 192.168.5.100 -p TCP --dport 6379 -j ACCEPT
然后将/etc/redis/redis.conf中的bind注释掉 【关键】
重启redis，ok！

测试链接：
redis-cli -h zhjy.wechat.hzsb365.com 
报错分析
Could not connect to Redis at xxx: No route to host(防火墙没设置白名单)
Could not connect to Redis at xxx: Connection refus(redis bind没注释掉)
参考了：
http://www.04007.cn/article/151.html
http://blog.csdn.net/hel12he/article/details/46911159
http://www.2cto.com/database/201502/376288.html

有时候为了安全起见，redis一般都是监听127.0.0.1 但是有时候又有同网段能连接的需求，当然可以绑定0.0.0.0 用iptables来控制访问权限，或者设置redis访问密码来保证数据安全

设置密码：
/etc/redis.conf中，打开配置文件找到并打开注释，再重启生效，或者配置热修改`config set requirepass my_redis  `
#requirepass foobared  
密码登录：
redis-cli -h 127.0.0.1 -p 6379 -a foobared  
```

***
#### mysql 修改host
```
mysql -u root –p
mysql>use mysql;
mysql>update user set host = '%' where user = 'root';
mysql>select host, user from user;

```

***
#### 将制定元素置于可视区内。在listview，scrollview非常有价值
```
setTimeout(()=>{
          let e=document.getElementsByClassName('season_selected')[0]
          e&&e.scrollIntoViewIfNeeded()
        },10)
```


***
#### flex布局总结

 ============================================================
   flex：定义布局为盒模型
   flex-v：盒模型垂直布局
   flex-1：子元素占据剩余的空间
   flex-align-center：子元素垂直居中
   flex-pack-center：子元素水平居中
   flex-pack-justify：子元素两端对齐
   兼容性：ios 4+、android 2.3+、winphone8+
   ============================================================ 
.flex{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}
.flex-v{-webkit-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}
.flex-1{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;}
.flex-align-center{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;}
.flex-pack-center{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;}
.flex-pack-justify{-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;}


>http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool
###container 属性
>flex-direction属性决定主轴的方向（即项目的排列方向）。
row（默认值）：主轴为水平方向，起点在左端。
row-reverse：主轴为水平方向，起点在右端。
column：主轴为垂直方向，起点在上沿。
column-reverse：主轴为垂直方向，起点在下沿。

>flex-wrap属性定义，如果一条轴线排不下，如何换行。
flex-wrap: nowrap | wrap | wrap-reverse;

>justify-content属性定义了项目在主轴上的对齐方式。
flex-start（默认值）：左对齐
flex-end：右对齐
center： 居中
space-between：两端对齐，项目之间的间隔都相等。
space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。


>align-items属性定义项目在交叉轴上如何对齐。
flex-start：交叉轴的起点对齐。
flex-end：交叉轴的终点对齐。
center：交叉轴的中点对齐。
baseline: 项目的第一行文字的基线对齐。
stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

###item 属性
>order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
.item {
  order: <integer>;
}

>align-self: center; 垂直居中！！非常有用
>align-self: flex-end; 底部对齐

>flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
.item {
  flex-grow: <number>; /* default 0 */
}

> flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
!!!!该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。
>可以用来控制剩余空间，如下：怎么让这个input占满除了左边，剩余的宽度呢。。
```js
  #loginForm .name{
    position: relative;
    height: 2.7rem;/* 108px */
    border-bottom: 2px solid #999;
    display: flex;
  }
  #loginForm .name>img{
    width: 1.45rem;/* 58px */
    height: 1.825rem;/* 73px */
    margin-left: .5rem;/* 20px */
    flex: none;
  }
    #loginForm input{
    margin-left: 1.575rem;/* 63px */
    height: 1.375rem;/* 55px */
    flex: auto;
    margin-top: 4px;
  }

.item{
    order: <integer>;
    /*排序：数值越小，越排前，默认为0*/
 
    flex-grow: <number>; /* default 0 */
    /*放大：默认0（即如果有剩余空间也不放大，值为1则放大，2是1的双倍大小，以此类推）*/
 
    flex-shrink: <number>; /* default 1 */
    /*缩小：默认1（如果空间不足则会缩小，值为0不缩小）*/
 
    flex-basis: <length> | auto; /* default auto */
    /*固定大小：默认为0，可以设置px值，也可以设置百分比大小*/
 
    flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
    /*flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto，*/
 
    align-self: auto | flex-start | flex-end | center | baseline | stretch;
    /*单独对齐方式：自动（默认） | 顶部对齐 | 底部对齐 | 居中对齐 | 上下对齐并铺满 | 文本基线对齐*/
}
```


###建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。
#### 一个简单的例子
```js
.tab-title-container{
    position: relative;
    display: table;
    margin: 0 auto;
    list-style: none;
    border-bottom: 1px solid #dddddd;
    display: -webkit-flex;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
}
.tab-title{
    height: 35px;
    line-height: 35px;
    position: relative;
    text-align: center;
    cursor: pointer;
    outline-style: none;
    flex: 1;
}


X5兼容写法

  .item-container{
    overflow: scroll;
    white-space:nowrap;
    position: relative;
    display: inline-flex;/* UC写法 */
    display: -webkit-box;
    display: -moz-box;
    display: -o-box;
    display: -ms-flexbox;
    display: flex;

    margin: .5rem 0px 0rem .5rem;/* 40px */
  }
  .item{
    display: block;
    padding: .75rem;/* 30px */
    background: #fff;
    margin-right: .35rem;/* 14px */
    font-weight: bold;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }

更多可参考AL框架seedsui layout页面


.flex-wrp{
  display: flex;
}

/* 垂直排列 flex-direction: row | row-reverse | column | column-reverse;*/
.flex-column{
  flex-direction:  column !important;
}


/* 右边对齐 justify-content: flex-start | flex-end | center | space-between | space-around;*/
.flex-align-right{
  justify-content: flex-end !important;
  align-items: flex-end !important;
}

.flex-tab{
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: stretch;
}

.flex-item{
  flex-grow: 1;
  text-align: center;
}

.flex-item-verticl-center{
  align-self: center;
}

.flex-item-fixed{
  flex: 1 0 0;
}

.flex-container{
  display: flex;
}

/* 垂直并水平居中 */
.flex-container-verticle-center{
  justify-content:center;
  align-items:center;
}

/* 垂直居中 */
.flex-container-verticle{
  align-items:center;
}


vue中可以使用兼容库 "flex.css": "^1.1.6",解决Android4.3等老浏览器导致的问题
```



***
#### 在 _onTouchMove中this变为此this
```
this._onTouchMove = this._onTouchMove.bind(this);
```

***
#### nginx 控制上传文件大小
```
http{} 加上
client_max_body_size 5m;

要是以php运行的话，这个大小client_max_body_size
要和php.ini中的如下值的最大值差不多或者稍大，
这样就不会因为提交数据大小不一致出现错误。
post_max_size = 5M
upload_max_filesize = 5M
APACHE 好像是LimitRequestBody 
```

***
#### SecureCRT中文乱码解决方法
```
http://jingyan.baidu.com/article/948f59245be128d80ff5f9aa.html

在显示的“窗口和文本外观”中找到“字符编码”。
把“字符编码”设置为“UTF-8”.
```


***
#### ios系统中元素被触摸时产生的半透明灰色遮罩怎么去掉
```
a,button,input,textarea{-webkit-tap-highlight-color: rgba(0,0,0,0;)} 
还有个outline
```
***

***
#### 消除transition闪屏
```
.css{ /*设置内嵌的元素在 3D 空间如何呈现：保留 3D*/ -webkit-transform-style: preserve-3d; /*（设置进行转换的元素的背面在面对用户时是否可见：隐藏）*/ -webkit-backface-visibility: hidden; }
```
***

#### 屏幕旋转的事件和样式
```
window.onorientationchange = function(){ 
switch(window.orientation){ 
case -90: 
case 90: alert("横屏:" + window.orientation); 
break; 
case 0: 
case 180: 
alert("竖屏:" + window.orientation); 
break; 
} } 

```

***
#### 2>&1 linux命令详解
```
     command >out.file 2>&1 &
    是将标准出错重定向 2到标准输出 1，这里的标准输出已经重定向到了out.file文件，即将标准出错也输出到out.file文件中。最后一个& 是让该命令在后台执行。

command > filename 把把标准输出重定向到一个新文件中
command >> filename 把把标准输出重定向到一个文件中(追加)
command 1 > fielname 把把标准输出重定向到一个文件中
command > filename 2>&1 把把标准输出和标准错误一起重定向到一个文件中
command 2 > filename 把把标准错误重定向到一个文件中
command 2 >> filename 把把标准输出重定向到一个文件中(追加)
command >> filename 2>&1 把把标准输出和标准错误一起重定向到一个文件中(追加)
command < filename > filename2把command命令以filename文件作为标准输入，以filename2文件作为标准输出
command < filename 把command命令以filename文件作为标准输入
command << delimiter 把从标准输入中读入，直至遇到delimiter分界符
command <&m 把把文件描述符m作为标准输入
command >&m 把把标准输出重定向到文件描述符m中
command <&- 把关闭标准输入
```

***
#### jquery serialize 通过序列化表单值，创建 URL 编码文本字符串
```
var query  = $('.search-form').find('input').serialize();

$("div").text($("form").serialize());
```

***
#### ssh登录远程服务器
```
ssh root@123.57.82.164
 q0930720099
```


***
#### 快速加减的做法
```
        let order = await this.model("order").where({user_id: this.user.uid, pay_status: 1}).getField('order_amount');
        let orderTotal = eval(order.join("+"));
```

***
#### mysql配置相关查看
```
查看mysql全局变量，可以直接用SQLyog查看：工具---信息
mysqladmin variables -uxsk -p
查看MySQL配置文件路径及相关配置
mysqld --verbose --help |grep -A 1 'Default options'
```

***
#### Illegal mix of collations (latin1_swedish_ci,IMPLICIT) and (utf8_general_ci,
```
  SET collation_connection = 'utf8_general_ci'

then for your databases

  ALTER DATABASE db CHARACTER SET utf8 COLLATE utf8_general_ci

  ALTER TABLE table CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci

MySQL sneaks swedish in there sometimes for no sensible reason.
```

***
#### 严格模式主要有以下限制。
```
变量必须声明后再使用
函数的参数不能有同名属性，否则报错
不能使用with语句
不能对只读属性赋值，否则报错
不能使用前缀0表示八进制数，否则报错（新的八进制 literal 写法是 0o 前缀，如 0o10 就是 8。在 strict 模式下也是可用的。）
不能删除不可删除的属性，否则报错
不能删除变量delete prop，会报错，只能删除属性delete global[prop]
eval不会在它的外层作用域引入变量
eval和arguments不能被重新赋值
arguments不会自动反映函数参数的变化
不能使用arguments.callee
不能使用arguments.caller
禁止this指向全局对象 就是禁止this默认绑定
不能使用fn.caller和fn.arguments获取函数调用的堆栈
增加了保留字（比如protected、static和interface）
```

***
#### jquery ajaxForm表单提交
```

<form id="formToUpdate" method="post" enctype="multipart/form-data">
                        <span class="fileName">点击添加模板</span>
                        <input name="file"  type="file" class="fileSumit" id="fileload"/>
                      </form>

$("#formToUpdate").ajaxSubmit({
                url:"/jxhd/school/student/addByFile/",
                type:"POST", 
                dataType:"json",
                data:{                  
       
                },
                success:function(data){
                    console.log(data)                    
                },
                error:function(){
                    alert("发生异常错误");
                }
                });
```
***
#### js技巧
```
3.玩转数字 除了上一节介绍的之外，这里有更多的处理数字的技巧 
0xFF; // Hex declaration, returns 255 
020; // Octal declaration, returns 16 （新的八进制 literal 写法是 0o 前缀，如 0o10 就是 8。在 strict 模式下也是可用的。）
1e3; // Exponential, same as 1 * Math.pow(10,3), returns 1000 
(1000).toExponential(); // Opposite with previous, returns 1e3 
(3.1415).toFixed(3); // Rounding the number to string, returns "3.142"


//说明嵌套循环中break跳出所有循环
/*  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      console.log('j',j,'i',i);
      if (j==2) break;
    }
  }*/
// 有的时候，循环中又嵌套了循环，你可能想在循环中退出，则可以用标签： 

// outerloop:  
// for (var iI=0;iI<5;iI++) {  
//  console.log('iI',iI);
//     if (iI==3) {  
//         // Breaks the outer loop iteration  
//         break outerloop;  
//     }  
      
//     innerloop:  
//     for (var iA=0;iA<5;iA++) {  
//      console.log('iA',iA,'iI',iI);
//         if (iA==2) {  
//             // Breaks the inner loop iteration  
//             break innerloop;  
//         }  
  
//     }  
// }
```

***
#### 99%的人都理解错了HTTP中GET与POST的区别
```
GET和POST还有一个重大区别，简单的说：
GET产生一个TCP数据包；POST产生两个TCP数据包。

长的说：
对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）；
而对于POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok（返回数据）。

也就是说，GET只需要汽车跑一趟就把货送到了，而POST得跑两趟，第一趟，先去和服务器打个招呼“嗨，我等下要送一批货来，你们打开门迎接我”，然后再回头把货送过去。

因为POST需要两步，时间上消耗的要多一点，看起来GET比POST更有效。因此Yahoo团队有推荐用GET替换POST来优化网站性能。但这是一个坑！跳入需谨慎。为什么？
1. GET与POST都有自己的语义，不能随便混用。
2. 据研究，在网络环境好的情况下，发一次包的时间和发两次包的时间差别基本可以无视。而在网络环境差的情况下，两次包的TCP在验证数据包完整性上，有非常大的优点。
3. 并不是所有浏览器都会在POST中发送两次包，Firefox就只发送一次。
```

***
#### php 空对象
```
$obj=(object)null;
$obj=(object)[];

$data = new stdClass();
$data->statusCode = '172004';
var_dump($data);
```
***
#### service init.d 重启后不再/再启动
```
chkconfig httpd off              #开机重启后，apache服务不再启动

```
***
#### SQLyog 设置CURRENT_TIMESTAMP
```
在默认里填
CURRENT_TIMESTAMP

ALTER TABLE  `li_wx_user` ADD  `update_time` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ;

```
***
#### 随机数 （值得学习的思维）
```js
var generateRandomAlphaNum=function (len) {
        var rdmString = '';
        for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
        return rdmString.substr(0, len);
    };

var generateRandomAlphaNum=function(a){for(var b="";b.length<a;b+=Math.random().toString(36).substr(2));return b.substr(0,a)};
```

***
#### 将增删改查cookie操作都用一个函数搞定
```js
var myCookie=function (cookieName, cookieValue, day) {
        var readCookie = function (name) {
            var arr,
                reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)'),
                matched = document.cookie.match(reg);
            if(arr = matched) {
                return unescape(arr[2]);
            } else {
                return null;
            }
        };
        var setCookie = function (name, value, time) {
            var Days = time || 30;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
        };
        if (cookieName && cookieValue) {
            //set cookie
            setCookie(cookieName, cookieValue, day);
        } else if (cookieName && $.isNull(cookieValue)) {
            //delete cookie
            setCookie(cookieName, '', -1);
        } else if (cookieName) {
            //read cookie
            return readCookie(cookieName);
        }
    };
```

***
#### js timeUtil 时间格式化函数
```js
压缩版
var timeUtil={parseTime:function(format,timeStamp){var date=new Date(timeStamp||Date.now()),o={"M+":date.getMonth()+1,"D+":date.getDate(),"h+":date.getHours(),"m+":date.getMinutes(),"s+":date.getSeconds(),"S":date.getMilliseconds()},format=format||"YYYY-MM-DD hh:mm:ss";if(/(Y+)/.test(format)){format=format.replace(RegExp.$1,(date.getFullYear()+"").substr(4-RegExp.$1.length))}for(var k in o){if(new RegExp("("+k+")").test(format)){format=format.replace(RegExp.$1,RegExp.$1.length==1?o[k]:("00"+o[k]).substr((""+o[k]).length))}}return format},getTimeShow:function(time_str){var now=new Date();var date=new Date(time_str);var inter=parseInt((now.getTime()-date.getTime())/1000/60);if(inter==0){return"刚刚"}else{if(inter<60){return inter.toString()+"分钟前"}else{if(inter<60*24){return parseInt(inter/60).toString()+"小时前"}else{if(now.getFullYear()==date.getFullYear()){return this.parseTime("MM-DD hh:mm:ss",time_str)}else{return this.parseTime("YY-MM-DD hh:mm:ss",time_str)}}}}}};

    var timeUtil={
      parseTime:function (format,timeStamp) {//format可空，默认YYYY-MM-DD hh:mm:ss，timeStamp可空，默认当前时间
      //timeUtil.parseTime('YYYY-MM-DD hh:mm:ss',new Date().getTime()) ->"2016-08-03 16:14:12"
      if ((timeStamp+'').length==10) {
        timeStamp=timeStamp*1000
    }
        var date = new Date(timeStamp||Date.now()),
        o = {
            'M+' : date.getMonth() + 1, //month 
            'D+' : date.getDate(), //day 
            'h+' : date.getHours(), //hour 
            'm+' : date.getMinutes(), //minute 
            's+' : date.getSeconds(), //second 
            'S' : date.getMilliseconds() //millisecond 
        },
        format=format||'YYYY-MM-DD hh:mm:ss';

        if(/(Y+)/.test(format)) {
            format = format.replace(RegExp.$1, 
                (date.getFullYear() + '').substr(4 - RegExp.$1.length)); 
        } 

        for(var k in o) {
            if (new RegExp('('+ k +')').test(format)) {
                format = format.replace(RegExp.$1, 
                    RegExp.$1.length == 1 ? o[k] : ('00'+ o[k]).substr((''+ o[k]).length)); 
            }
        }
        return format; 
    },
    getTimeShow:function(time_str){
            var now = new Date();
            var date = new Date(time_str);//兼容性问题'-'=>'/'
            //计算时间间隔，单位为分钟
            var inter = parseInt((now.getTime() - date.getTime())/1000/60);
            if(inter == 0){
                return "刚刚";
            }
            //多少分钟前
            else if(inter < 60){
                return inter.toString() + "分钟前";
            }
            //多少小时前
            else if(inter < 60*24){
                return parseInt(inter/60).toString() + "小时前";
            }
            //本年度内，日期不同，取日期+时间  格式如  06-13 22:11
            else if(now.getFullYear() == date.getFullYear()){
                return this.parseTime('MM-DD hh:mm:ss',time_str);
            }
            else{
                return this.parseTime('YY-MM-DD hh:mm:ss',time_str);
            }
        },
    getZeroTs:function (){//返回当天0点时间戳，13位数
            var today = new Date();
            today.setHours(0);
            today.setMinutes(0);
            today.setSeconds(0);
            today.setMilliseconds(0);
            return today.valueOf();
          }
    };

//压缩
function getZeroTs(){var a=new Date;return a.setHours(0),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0),a.valueOf()}
    console.log(timeUtil.parseTime('YYYY-MM-DD hh:mm:ss',new Date().getTime()));
    console.log(timeUtil.parseTime());
    console.log(timeUtil.parseTime('YY-MM-DD hh:mm:ss',Date.now()));
    console.log(timeUtil.getTimeShow(new Date().getTime()));//刚刚
    console.log(timeUtil.getTimeShow(new Date().getTime()-60*1000));//1分钟前
    console.log(timeUtil.getTimeShow(new Date().getTime()-10*60*1000));//10分钟前
    console.log(timeUtil.getTimeShow(new Date().getTime()-100*60*1000));//1小时前
    console.log(timeUtil.getTimeShow(new Date().getTime()-1000*60*1000));//16小时前
    console.log(timeUtil.getTimeShow(new Date().getTime()-10000*60*1000));//08-02 11:54:29
    console.log(timeUtil.getTimeShow(new Date().getTime()-1000000*60*1000));//14-09-14 23:56:48
```

***
#### gzip指令
```
http://www.kuqin.com/shuoit/20160805/352716.html

1、gzip压缩
gzip a.txt

2、解压
gunzip a.txt.gz
gzip -d a.txt.gz

3、bzip2压缩
bzip2 a

4、解压
bunzip2 a.bz2
bzip2 -d a.bz2

5、打包：将指定文件或文件夹
tar -cvf bak.tar  ./aaa
将/etc/password追加文件到bak.tar中(r)
tar -rvf bak.tar /etc/password

6、解压
tar -xvf bak.tar

7、打包并压缩(重要的事情说三遍!!!)
tar -zcvf a.tar.gz  aaa/

8、解包并解压缩(重要的事情说三遍!!!)
tar  -zxvf  a.tar.gz
解压到/usr/下
tar  -zxvf  a.tar.gz  -C  /usr

9、查看压缩包内容
tar -ztvf a.tar.gz
zip/unzip

10、打包并压缩成bz2
tar -jcvf a.tar.bz2

11、解压bz2
tar -jxvf a.tar.bz2

```

***
#### js 模块开发规范
```
原文链接：http://caibaojian.com/toutiao/6194
模块
模块应该以 ! 开始。这样确保了当一个不好的模块忘记包含最后的分号时，在合并代码到生产环境后不会产生错误。详细说明
文件应该以驼峰式命名，并放在同名的文件夹里，且与导出的名字一致。
增加一个名为 noConflict() 的方法来设置导出的模块为前一个版本并返回它。
永远在模块顶部声明 'use strict';。
//code from http://caibaojian.com/toutiao/6194
// fancyInput/fancyInput.js

!function (global) {
  'use strict';

  var previousFancyInput = global.FancyInput;

  function FancyInput(options) {
    this.options = options || {};
  }

  FancyInput.noConflict = function noConflict() {
    global.FancyInput = previousFancyInput;
    return FancyInput;
  };

  global.FancyInput = FancyInput;
}(this);

```
***
#### 解决 PHPExcel 长数字串显示为科学计数  
```
    for ($i=0; $i < $count; $i++) {
      $index=strval($i+2);
      $objPHPExcel->setActiveSheetIndex(0)
      ->setCellValueExplicit('A'.$index, $arr[$i]->student_id,'s')
      ->setCellValue('B'.$index, $arr[$i]->name)
      ->setCellValue('C'.$index, $arr[$i]->gender)
      ->setCellValue('D'.$index, $arr[$i]->className)
      ->setCellValueExplicit('E'.$index, $arr[$i]->device_id,'s');
    }
ref:http://blog.163.com/tfz_0611_go/blog/static/20849708420146172398214/
```

***
#### 解决 PHPExcel 导出csv Mac显示不出中文 
```
echo chr(239).chr(187).chr(191);// 加上bom头，系统自动默认为UTF-8编码


    private function exportFile($objPHPExcel,$filename='export.csv',$type='CSV')
    {
        header("Content-type:application/vnd.ms-excel;charset=utf-8");
//        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment;filename="'.$filename.'"');
        header('Cache-Control: max-age=0');

        header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
        header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
        header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
        header ('Pragma: public'); // HTTP/1.0

        echo chr(239).chr(187).chr(191);// 加上bom头，系统自动默认为UTF-8编码

        if ($type != 'CSV')
            $type=$type!='xls'?'Excel2007':'Excel5';
        $objWriter = IOFactory::createWriter($objPHPExcel, $type);
        $objWriter->save('php://output');
        exit;
    }

```

***
#### PHPExcel 设置宽度  
```
    $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth('12');
    $objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth('12');
    $objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth('15');

ref:http://blog.sina.com.cn/s/blog_92ca585801011lqs.html
```

#### sublime插件推荐
```
Sublime Text3 插件：DocBlockr与javascript注释规范
http://www.ithao123.cn/content-719950.html

php snippets
Nodejs
PHP Code Sniffer
PHP Code Beautidfier
rem-unit
SublimeCodeIntel
vue-hightlight

```

#### sublime编译运行php
```
一、将PHP安装目录放如环境变量PATH
二、添加PHP的build system

1）进入如下菜单：


2）弹出内容如下：

{
    "cmd": ["make"]
}
修改为：

{ 
    "cmd": ["php", "$file"],
    "file_regex": "php$", 
    "selector": "source.php" 
}
3）保存在默认的目录下即可，注意修改文件名为 php.sublime-build 。

执行快捷键为Ctrl+B。
http://blog.csdn.net/xxhsu/article/details/30757229

```


***
#### sublime 自定义代码片段
```
http://www.bluesdream.com/blog/sublime-text-snippets-function.html
例如：
<!-- 
<snippet>
     <content>
     <![CDATA[
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <!--ie渲染引擎-->
    <!--忽略电话号码和email识别-->
    <meta name="format-detection" content="telephone=no" />
    <meta name="format-detection" content="email=no" />
    <!--当网站添加到主屏幕快速启动方式，将网站添加到主屏幕快速启动方式-->
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <!--隐藏ios上的浏览器地址栏-->
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <!-- UC默认竖屏 ，UC强制全屏 -->
    <meta name="full-screen" content="yes">
    <meta name="browsermode" content="application">
    <!-- QQ强制竖屏 QQ强制全屏 -->
    <meta name="x5-orientation" content="portrait">
    <meta name="x5-fullscreen" content="true">
    <meta name="x5-page-mode" content="app">
    <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,minimal-ui">

  <title>$1</title>
     <!-- <link rel="stylesheet" href="index.css">  -->
  <style type="text/css">
  body{-webkit-text-size-adjust: 100%!important;}
  </style>
</head>

<body>

<script type="text/javascript">
                
</script>
</body>

</html>
     ]]>
     </content>
     <tabTrigger>html</tabTrigger>
     <description>templ</description>
     <scope>text.html</scope>
</snippet>  -->
<!-- 
<snippet>
     <content>
     <![CDATA[
     try{
     ${1}
     }catch(e){
     
     }
     ]]>
     </content>
     <tabTrigger>try</tabTrigger>
     <description>try/catch</description>
     <scope>source.js</scope>
</snippet> -->

方法注释（//+shift）
<!-- 
<snippet>
     <content>
     <![CDATA[
     /**
     * ${1}
     * @author bajian
     * @param  
     * @return 
     */]]>
     </content>
     <tabTrigger>//</tabTrigger>
     <description>/*@*/</description>
     <scope>source.js</scope>
</snippet>
 -->

switch
<!-- 
<snippet>
     <content>
     <![CDATA[
  switch (variable) {
    case 'value':
        
        break;
    
    default:
        
        break;
}]]>
     </content>
     <tabTrigger>swi</tabTrigger>
     <description>switch</description>
     <scope>source.js</scope>
</snippet>
 -->
```

***
#### 当运用了闭包后，全局作用域内的方法没法调用闭包内的函数时候，可以用观察者模式，在闭包内监听
```
闭包内：
$(document).on('refreshAttendance',function(e,search){
if (search) {
getAttendanceByDate(B_util.refreshDate(),function(){
$('#btn_name_first_search').trigger('click')
});
}else{
getAttendanceByDate(B_util.refreshDate());
}
})
全局：
        B_util.resign=function(studentId,search){
            if (!studentId) return;
            var ct=studentId=='all'?'请老师核实，所有学生是否已到校？':'请老师核实，该学生是否已到校？';
            A.confirm(ct,function(){
                A.showMask();
                myajax.post(B_url.resign_attendance,{studentID:studentId},function(data){
                    A.hideMask();
                    if (data.code==0) {
                        A.showToast('处理成功');
                        delete B_user.cacheAttendance[B_util.refreshDate()];
                        B_user.cacheSearch={};
                        $(document).trigger('refreshAttendance',search);//关键
                    }
                },'',function(){
                    A.hideMask();
                });
            });
        }

});

```

***
#### js陷阱题 js面试题
```
typeof NaN
"number"


<script type="text/javascript"> 
var aColors = ["red", "green", "blue"]; 
alert(typeof aColors[0]); //output "string" 
alert(aColors[0] instanceof String); //output "false"; 
</script> 

你要区分string 与 String的区别 
aColors[0] 是 string值类型， 当然不是String的实例啦。参考下面代码 
var aColors = ["red", "green", "blue"]; 
aColors[0]= new String("1") 
alert(typeof aColors[0]); //output "Object" 
alert(aColors[0] instanceof String); //output "true";


var val = 'smtg';
console.log('Value is ' + (val === 'smtg') ? 'Something' : 'Nothing');
//Something


var name = 'World!';
(function () {
    if (typeof name === 'undefined') {
        var name = 'Jack';
        console.log('Goodbye ' + name);
    } else {
        console.log('Hello ' + name);
    }
})();
//Goodbye Jack（原因请看本read me中的另一个地方。。。有讲这个作用域问题）


function showCase(value) {
    switch(value) {
    case 'A':
        console.log('Case A');
        break;
    case 'B':
        console.log('Case B');
        break;
    case undefined:
        console.log('undefined');
        break;
    default:
        console.log('Do not know!');
    }
}
showCase(new String('A'));
//Do not know! 原因同第一题


function showCase2(value) {
    switch(value) {
    case 'A':
        console.log('Case A');
        break;
    case 'B':
        console.log('Case B');
        break;
    case undefined:
        console.log('undefined');
        break;
    default:
        console.log('Do not know!');
    }
}
showCase2(String('A'));
//Case A（String(x) does not create an object but does return a string, i.e. typeof String(1) === "string" ）//true   typeof new String(1) //"object"


function isOdd(num) {
    return num % 2 == 1;
}
function isEven(num) {
    return num % 2 == 0;
}
function isSane(num) {
    return isEven(num) || isOdd(num);
}
var values = [7, 4, '13', -9, Infinity];
values.map(isSane);
//[true, true, true, false, false] （Infinity % 2 gives NaN, -9 % 2 gives -1 (modulo operator keeps sign so it's result is only reliable compared to 0)）


parseInt(3, 8)//3
parseInt(3, 2)//NaN
parseInt(3, 0)//3

Array.isArray( Array.prototype )//true

[]==[]//false （两个object类型的，除非指针相同）


'5' + 3//'53'
'5' - 3//2

1 + - + + + - + 1//2
-+1和+-1等于-1，所以
1 + - + ( - + 1)等于2
1 + - + - - + 1等于 1-1等于0
1 + - + + + - + 1等于 1-（-1）等于2


var ary = Array(3);
ary[0]=2
ary.map(function(elem) { return '1'; });
//["1", undefined × 2]（The result is ["1", undefined × 2], as map is only invoked for elements of the Array which have been initialized. ）


var a = 111111111111111110000,
    b = 1111;
a + b;
//111111111111111110000（Lack of precision for numbers in JavaScript affects both small and big numbers. ）


Number.MIN_VALUE > 0//true（Number.MIN_VALUE is the smallest value bigger than zero, -Number.MAX_VALUE gets you a reference to something like the most negative number. ）


[1 < 2 < 3, 3 < 2 < 1]//[true, true] （This is parsed as (1 < 2) < 3 and (3 < 2) < 1. Than it's implicit conversions at work: true gets intified and is 1, while false gets intified and becomes 0. ）


2 == [[[2]]]//true（both objects get converted to strings and in both cases the resulting string is "2" ）


3.toString()
3..toString()
3...toString()
//error, "3", error（3.x is a valid syntax to define "3" with a mantissa（尾数） of x, toString is not a valid number, but the empty string is. ）
//收获: 3.5.toString() -> '3.5' 


(function(){
  var x = y = 1;
})();
console.log(y);//1（y没用var定义，被提升为全局变量，卧槽，定义的时候要注意了，不要贪图方便）
console.log(x);//Uncaught ReferenceError: x is not defined


var a = /123/,
    b = /123/;
a == b//false
a === b//false（regular expression objects）


var a = [1, 2, 3],
    b = [1, 2, 3],
    c = [1, 2, 4]
a ==  b
a === b
a >   c
a <   c//false, false, false, true（Arrays are compared lexicographically with > and <, but not with == and === ）


function foo() { }
var oldName = foo.name;
foo.name = "bar";
[oldName, foo.name]//["foo", "foo"]（收获; 函数的name是只读属性,赋值无效,但不抛出异常. ）


function f() {}
var parent = Object.getPrototypeOf(f);
f.name // ?
parent.name // ?
typeof eval(f.name) // ?
typeof eval(parent.name) //  ?
//"f", "Empty", "function", error（The function prototype object is defined somewhere, has a name, can be invoked, but it's not in the current scope. ）


var lowerCaseOnly =  /^[a-z]+$/;
[lowerCaseOnly.test(null), lowerCaseOnly.test()]
//[true, true] （要通过开发的角度去看问题。。。获取不到参数的参数就是undefined）
the argument is converted to a string with the abstract ToString operation, so it is "null" and "undefined". 


[,,,].join(", ")//", , " （JavaScript allows a trailing（蔓延的） comma （逗号） when defining arrays, so that turns out to be an array of three undefined. ）
[,,,].length//3
[0,0,0,].length//3
[0,0,0,''].length//4
[0,0,0,undefined].length//4


var a = {class: "Animal", name: 'Fido'};
a.class//error class是保留字


var a = new Date("epoch")//"Invalid Date", 


var min = Math.min(), max = Math.max()
min < max//false，反过来了,
Math.max()返回参数中最大的值。如果没有参数，则返回 -Infinity。
如果有某个参数为 NaN，或是不能转换成数字的非数字值，则返回 NaN。
Math.min(),没有参数，则返回 Infinity。
【要和Number.MAX_VALUE Number.MIN_VALUE 区别开】

function captureOne(re, str) {
  var match = re.exec(str);
  return match && match[1];
}
var numRe  = /num=(\d+)/ig,
    wordRe = /word=(\w+)/i,
    a1 = captureOne(numRe,  "num=1"),//1
    a2 = captureOne(wordRe, "word=1"),//1
    a3 = captureOne(numRe,  "NUM=2"),//null,索引到第二个，所以不存在，为null
    a4 = captureOne(wordRe,  "WORD=2");//2
[a1 === a2, a3 === a4]//[true, false]
因为第一个正则有一个 g 选项 它会‘记忆’他所匹配的内容, 等匹配后他会从上次匹配的索引继续, 而第二个正则不会,


if ('http://giftwrapped.com/picture.jpg'.match('.gif')) {
  'a gif file'
} else {
  'not a gif file'
}
//a gif file（String.prototype.match silently converts the string into a regular expression, without escaping it, thus the '.' becomes a metacharacter matching '/'. 正确match('\.gif')）



function foo(a) {
    var a;//因为只有声明没有赋值，所以js不会重新初始化，就比如 var a=666;var a; console.log(a)//666
    return a;
}
function bar(a) {
    var a = 'bye';
    return a;
}
[foo('hello'), bar('hello')]//["hello", "bye"] 变量提升。。原因请看本read me中的另一个地方。。。http://www.cnblogs.com/damonlan/archive/2012/07/01/2553425.html
(function(){
    var a='One';
    var b='Two';
    var c='Three';
})()
实际上它是这样子的：
(function(){
    var a,b,c;
    a='One';
    b='Two';
    c='Three';
})()

摘自http://javascript-puzzlers.herokuapp.com/号称js8级。。。我第一次只对了19题QAQ


不利用临时变量,交换两个变量的值
1、数组
a=b=[1,2]; a=a[0];b=b[1];

2、异或
a = a ^ b
b = b ^ a
a = a ^ b

$a=3;
$b=4;
$a=$a^$b;
$b=$b^$a;
$a=$a^$b;
var_dump($a);
var_dump($b);

3、php函数
list($a, $b) = [$b, $a];


```

***
#### php设置error_reporting(E_ALL) 还是无效的原因
```
ini文件配置问题。

ini_set('display_errors','On');
error_reporting(E_ALL);
```

***
#### mysql 占用CPU过大的解决
```
尝试:发现重启后就降低了，过段时间又99%了。探究应该是缓存的问题，将tmp_table_size从18M修改成150M
[mysqld] 
tmp_table_size=150M 

show processlist;可以查看哪些语句常驻
```


***
#### 给项目添加POST参数的日志
```

if ($_SERVER['REQUEST_METHOD']=='POST')
    Log::debug($_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'],$_POST);

GET可以直接交给nginx设置，但是post参数就不能了（按百度设置了啥query_...参数的也无效，奇怪，有成功的麻烦告诉我）
设置buffer可以优化写入日志

    server {
listen 80;
server_name test.wechat.hzsb365.com;
access_log /data/wwwlogs/test.wechat.hzsb365.com_nginx.log combined buffer=10k;
index index.html index.htm index.php;
include /usr/local/nginx/conf/laravel.conf;
root /home/hgx/hzsbTest/public;


location ~ [^/]\.php(/|$) {
    #fastcgi_pass remote_php_ip:9000;
    fastcgi_pass unix:/dev/shm/php-cgi.sock;
    fastcgi_index index.php;
    include fastcgi.conf;
    }
location ~ .*\.(gif|jpg|jpeg|png|bmp|swf|flv|ico)$ {
    expires 30d;
    access_log off;
    }
location ~ .*\.(js|css)?$ {
    expires 7d;
    access_log off;
    }
}

```


#### webAPP中若要让软键盘弹出的时候某些按钮不跟着上浮，就必须保持它与表单的position都为relative，不能是absolute fixed之类的


***
#### [算法]求出所有给出的数的排列组合
```
//求出所有给出的数的排列组合
//个人解法，仅供参考，无标准答案
$arr=[1,2,3,4,5,6,7,8,9,10];
$subArr=[];

collect($subArr,join(',',$arr));
foreach ($arr as $key => $value) {
    collect($subArr,$value);
}

$len=count($arr);
    for($i=0;$i<$len;$i++){
        for ($j=0; $j <$len ; $j++) { 
            toSpliceFromOffset($arr,$i,$subArr,$j);
        }
    }

print_r($subArr);
//array_splice(array,start,length,array)
function toSpliceFromOffset($arr,$i,&$subArr,$offset){
        array_splice($arr,$i,1);
        collect($subArr,join(',',$arr));
        if (count($arr)>2) {
            toSpliceFromOffset($arr,$offset,$subArr,$offset-1);
        }
}

function collect(&$subArr,$pushArrString){
    foreach ($subArr as $key => $value) {
        if ($value===$pushArrString) {
            return;
        }
    }
    array_push($subArr,$pushArrString);
}

```

***
#### https和http同步session
```
https域登录，获得sessionid，然后重定向到http,get请求里带上sessionid（加密），http域写入sessionid，重定向到http域登录成功页
http://www.gy0929.com/wz/1312.html
//可以参考B站的登录，原理大致相同
```

***
#### visibility hidden
```

<a style="visibility: hidden;" href="">bajian2</a><!-- 占位hidden， 可应用于清楚浮动 -->
<!-- display none 是不占位的 -->
```

***
#### setTimeout传参数
```
var timer = setTimeout(function (timerInstance, timeoutId) {
    timerInstance.clear(timeoutId);
    fn();
  }, delay, this, id);
```
***
#### sql 高级查询汇总 
```
一个用户有多个兴趣和资源，需要去根据某用户这两个属性给全部人匹配度排序。。（加权）
SELECT SUM(t.h_sum),t.user_id FROM (SELECT COUNT(*) *20 AS h_sum,user_id FROM hobbies WHERE h_id IN (1,2,3) GROUP BY user_id UNION ALL SELECT COUNT(*) *80 AS h_sum,user_id FROM resource WHERE r_id IN (1,2,3) GROUP BY user_id) AS t GROUP BY t.user_id
【UNION ALL 需要两次查询的字段一致】【in后加上order by field可以按in的顺序排序】

——MySQL多表查询合并结果和内连接查询
1、使用union和union all合并两个查询结果：select 字段名 from tablename1 union select 字段名 from tablename2;
注意这个操作必须保证两张表字段相同，字段数据类型也相同。另外，使用union的时候会去除重复(相同)的记录，而union all则不会。

So here is an example in mysql.

SELECT * FROM my_table UNION ALL SELECT * FROM my_table WHERE id IN (1,2)
Then if you are using Laravel's eloquent like I am use this.

$queryh = HobbyUser::select(DB::raw('count(*) * 20 as h_sum'),'user_id')
$query = Class::whereIn('id', $array);
Class::where('id','>=',0)->unionAll($query)->get();

                $offset=($page-1) * $per_page;
                $hobby_ids=array_pluck(DB::select('select hobby_id  from hobby_user where user_id='.$user->id),'hobby_id');
                $resource_ids=array_pluck(DB::select('select resource_id  from resource_user where user_id='.$user->id),'resource_id');

                if (!count($hobby_ids) && !count($resource_ids))
                    return $this->toJson('请先完善 兴趣爱好 或者 资源 ');
                $user_ids=DB::select('SELECT t.user_id FROM (SELECT COUNT(*) *20 AS h_sum,user_id FROM hobby_user WHERE hobby_id IN ('.join(',',$hobby_ids).') GROUP BY user_id UNION ALL SELECT COUNT(*) *80 AS h_sum,user_id FROM resource_user WHERE resource_id IN ('.join(',',$resource_ids).') GROUP BY user_id) AS t GROUP BY t.user_id ORDER BY  t.h_sum DESC limit '.$offset.','.$per_page);
                $userlist=[];
                foreach ($user_ids as $user_idx){
                    $userlist[]=User::where('id',$user_idx->user_id)->with('hobbies')->with('resources')
                        ->with(['resume'=>function ($queryx){
                            $queryx->with('education_exprience')->with('work_exprience');
                        }])->first();
                }
                $this->calDistant($userlist,$user->lat,$user->lng);
                return $this->toJson(0,'',$userlist);
===================================


http://aoxueshou.blog.163.com/blog/static/1002357142013817515604/
http://www.cnblogs.com/yubinfeng/archive/2010/11/02/1867386.html

使用rand()抽样调查，随机抽取2个员工，查看其资料
mysql> select * from emp order by rand() limit 2;

查询结果的字段联合和重新命名
mysql> select concat(emp_id," ",emp_name) from emp;

统计男女职工数目：（GROUP BY语句分类）
mysql> select emp_sex,count(*) from emp group by emp_sex;

查询班级信息，统计班级学生人数
SELECT *,(SELECT COUNT(*) FROM manager_student WHERE class_id=manager_class.`id`) AS studentnum FROM manager_class 

查询某学校的所有班级及每个班级的学生人数
SELECT *,(SELECT COUNT(*) FROM manager_student WHERE class_id=manager_class.`id`) AS studentnum FROM manager_class WHERE manager_class.`school_id`=30

查询某学校的所有班级及每个班级的学生人数及指定日期的出勤人数
SELECT *,(SELECT COUNT(DISTINCT b.`device_id`)num  FROM manager_student a  RIGHT JOIN xsk_attendance b ON a.`device_id`=b.device_id WHERE class_id=manager_class.`id` AND DATE_FORMAT(b.time,'%Y-%m-%d') ='2016-05-26')attandanceNum,(SELECT COUNT(*) FROM manager_student WHERE class_id=manager_class.`id`) AS studentnum FROM manager_class WHERE manager_class.`school_id`=30


1. 查找出符合条件的记录, 按user_id asc, create_time desc 排序;
select ord.user_id, ord.money, ord.create_time from orders ord where ord.user_id > 0 and create_time > 0 order by user_id asc , create_time desc
2. 将(1)中记录按user_id分组, group_concat(money);
select t.user_id, group_concat( t.money ) moneys from (select ord.user_id, ord.money, ord.create_time from orders ord where ord.user_id > 0 and create_time > 0 order by user_id asc , create_time desc) t group by user_id
user_id moneys
  1      100,50
  2      200,100
[group_concat()函数需要与group by语句在一起使用，才能得到需要的效果,
自定义分隔符：select id,group_concat(name separator ';') from aa group by id;
自定义排序：select id,group_concat(name order by name desc) from aa group by id;  
去除冗余name：select id,group_concat(distinct name) from aa group by id;  ]

3. 这时, 如果用户有多个消费记录, 就会按照时间顺序排列好, 再利用 subString_index 函数进行切分即可
select t.user_id, substring_index(group_concat( t.money ),',',1) lastest_money from (select ord.user_id, ord.money, ord.create_time from orders ord where ord.user_id > 0 and create_time > 0 order by user_id asc , create_time desc) t group by user_id ;

mysql replace用法 
1.replace into 
REPLACE INTO table1 (fileId,pName) VALUES ('8','222'),('6','bb')
此语句的作用是向表table中插入两条记录。如果主键fileId为1或2不存在 

mysql数据库replace、regexp的用法 http://www.jb51.net/article/27997.htm
特别注意中文的话：
SELECT * FROM table1 a WHERE a.`city` REGEXP '(呵){2}'

善用mysql的时间函数
UPDATE `xsk_command` SET `begin_time`=DATE_ADD(now(),INTERVAL 10 SECOND), send_times = 0 WHERE id=
```

***
#### 一些复杂的sql记录
```
每次查询limit个老师（一个老师含多个班级）
SELECT a.*,b.`name`,b.`password`,b.`nickname`,b.`note` AS subject,c.`name` AS class  FROM manager_class_teacher a INNER JOIN manager_admin b ON a.`admin_id`=b.`id` LEFT JOIN manager_class c ON a.class_id=c.`id` WHERE a.admin_id IN ( SELECT * FROM( SELECT DISTINCT admin_id FROM manager_class_teacher WHERE school_id=? LIMIT ?,?)AS t)
$re=$this->queryTeacherSql($_SESSION['admin_school_id'],$start,$limit);
      $listCount=count($re);
      $list=[];
      for ($i=0; $i <$listCount ; $i++) {
        $t=new TeacherBean();
        $t->name=$re[$i]->name;
        $t->id=$re[$i]->admin_id;
        $t->nickname=$re[$i]->nickname;
        $t->password=$re[$i]->password;
        $t->subject=$re[$i]->subject;
        $t->classes=[['id'=>$re[$i]->class_id,'name'=>$re[$i]->class]];
        for ($j=$i; $j <$listCount-1 ; $j++) { 
          if ($re[$j]->admin_id==$re[$j+1]->admin_id) {
            $i++;
            array_push($t->classes, ['id'=>$re[$j+1]->class_id,'name'=>$re[$j+1]->class]);
          }else{
            break;
          }
        }
        array_push($list, $t);
      }
按关键字查，还得拉取出其他班级的
SELECT 
  a.*,
  b.`name`,
  b.`password`,
  b.`nickname`,
  b.`note` AS SUBJECT,
  c.`name` AS class 
FROM
  manager_class_teacher a 
  INNER JOIN manager_admin b 
    ON a.`admin_id` = b.`id` 
  LEFT JOIN manager_class c 
    ON a.class_id = c.`id` 
WHERE a.`admin_id` IN 
  (SELECT 
    * 
  FROM
    (SELECT DISTINCT 
      manager_class_teacher.`admin_id` 
    FROM
      manager_class_teacher 
      INNER JOIN manager_admin 
        ON manager_class_teacher.`admin_id` = manager_admin.`id` 
      LEFT JOIN manager_class 
        ON manager_class_teacher.class_id = manager_class.`id` 
    WHERE manager_class_teacher.school_id = 30 
      AND (
        manager_admin.`name` LIKE '%徐小航%' 
        OR manager_class.`name` LIKE '%测试二班%' 
        OR manager_admin.`note` LIKE '%徐小航%' 
        OR manager_admin.`nickname` LIKE '%测试二班%'
      )) AS tt)


```


***
#### 获取运行脚本的目录（也可用于require的模块中）
```
console.log(require('path').dirname(process.argv[1]));
```


***
#### 事件的委托处理（Event Delegation）
```
javascript的事件模型，采用"冒泡"模式，也就是说，子元素的事件会逐级向上"冒泡"，成为父元素的事件。
利用这一点，可以大大简化事件的绑定。比如，有一个表格（table元素），里面有100个格子（td元素），现在要求在每个格子上面绑定一个点击事件（click），请问是否需要将下面的命令执行100次？
　　$("td").on("click", function(){
　　　　$(this).toggleClass("click");
　　});
回答是不需要，我们只要把这个事件绑定在table元素上面就可以了，因为td元素发生点击事件之后，这个事件会"冒泡"到父元素table上面，从而被监听到。
因此，这个事件只需要在父元素绑定1次即可，而不需要在子元素上绑定100次，从而大大提高性能。这就叫事件的"委托处理"，也就是子元素"委托"父元素处理这个事件。
　　$("table").on("click", "td", function(){
　　　　$(this).toggleClass("click");
　　});
更好的写法，则是把事件绑定在document对象上面。
　　$(document).on("click", "td", function(){
　　　　$(this).toggleClass("click");
　　});
如果要取消事件的绑定，就使用off()方法。
　　$(document).off("click", "td");

```

***
#### h:i格式可以直接比大小
```
"15:46">"23:00"
false
```

***
#### 语义版本号分为X.Y.Z三位
```
语义版本号分为X.Y.Z三位，分别代表主版本号、次版本号和补丁版本号。当代码变更时，版本号按以下原则更新。
+ 如果只是修复bug，需要更新Z位。
+ 如果是新增了功能，但是向下兼容，需要更新Y位。
+ 如果有大变动，向下不兼容，需要更新X位。
```
***
#### mysql 字符串数字排序
```
return DB::connection('jxhd')->select('SELECT a.`student_id` AS studentID,a.`name` AS studentName,b.`type`,b.`time` AS datetime FROM manager_student a LEFT JOIN xsk_attendance b ON a.`device_id`=b.`device_id` AND DATE_FORMAT(b.time,\'%Y-%m-%d\') =? WHERE a.`class_id`=? GROUP BY a.`name` ORDER BY (studentID+0) ASC',[$date,$class_id]);
http://www.111cn.net/database/mysql/55179.htm

```

***
#### Table的“min-height”属性
```
需要对table元素里的td设置min-height属性，设置都没有效果。

对于table元素，如th、td来说，

使用height属性就等效于min-height属性了，
```

***
#### JavaScript中字符串与Unicode编码的互相转换
```
code = 'a'.charCodeAt(0); // 97
String.fromCharCode(97)//a
```

***
#### mysql中having的用法
```
http://jingyan.baidu.com/article/425e69e6ddeebdbe14fc1678.html
mysql中，当我们用到聚合函数，如sum，count后，又需要筛选条件时，having就派上用场了，因为WHERE是在聚合前筛选记录的，having和group by是组合着用的，下面通过实例介绍下用法

http://www.jb51.net/article/32562.htm
二、 显示每个地区的总人口数和总面积．仅显示那些面积超过1000000的地区 
SELECT region, SUM(population), SUM(area)FROM bbc GROUP BY region HAVING SUM(area)>1000000 
在这里，我们不能用where来筛选超过1000000的地区，因为表中不存在这样一条记录。相反，having子句可以让我们筛选成组后的各组数据 


```
***
#### viewport模板——通用
```
<!-- <!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
  <meta content="yes" name="apple-mobile-web-app-capable">
  <meta content="black" name="apple-mobile-web-app-status-bar-style">
  <meta content="telephone=no" name="format-detection">
  <meta content="email=no" name="format-detection">
  <title></title>
  <link rel="stylesheet" href="index.css"> 
  <style type="text/css">
  body{-webkit-text-size-adjust: 100%!important;}
  </style>
</head>

<body>

<script type="text/javascript">
                
</script>
</body>

</html> -->

```

***
#### webkit表单元素的默认外观怎么重置
```
通用
.css{-webkit-appearance:none;}

```

***
#### 数组和对象都是引用传递
```
b=c=[];
[]
b.push(333); console.log(c)
[333]
但是delete b后，c还在


typeof []

"object"
typeof {}

"object"
typeof 'A'
"string"
```

***
#### 欣赏别人的写法
```

    var createDots = function(){
      var _index = $scroller.index($slide.filter('.active'));_index = _index<0?0:_index;
      $el.children('.dots').remove();     
      var arr = [];
      arr.push('<div class="dots">');
      for(var i=0;i<slideNum;i++){
        arr.push('<div class="dotty"></div>');
      }
      arr.push('</div>');
      $dots = $(arr.join('')).appendTo($el).addClass(sliderOpts.dots).find('.dotty');
      $($dots.get(_index)).addClass('active');
    };
```


```
:nth-child(n) 选择器匹配属于其父元素的第 N 个子元素，不论元素的类型。
nth-of-type(n)可以筛选元素类型：如 p:nth-of-type(2) { color: red; }
nth-child快速实现table相间色 :nth-child(odd) 与 :nth-child(even) 


```

***
#### 去掉点击后控件的outline
```
outline-style: none;
```

***
#### 预加载资源
```
  <link rel="prefetch" href="/src/modules/composer/resize.js?v=6e953938-9cd1-4442-8be8-9e95d39203dd" />
```

***
#### 获取文件大小
```
//jQ版float ,kb
function getFileSize(id){
  return $('#'+id)[0].files[0].size/1000
}
//js版float ,kb
function getFileSize(id){
  return document.getElementById(id).files[0].size/1000
}
file对象
lastModified: 1463472739374
lastModifiedDate: Tue May 17 2016 16:12:19 GMT+0800 (中国标准时间)
name: "家校互动-教师微信端2.0.zip"
size: 7898422
type: ""
webkitRelativePath: ""
```

***
#### text-align:center
```
 6、text-align:center 在块元素中用text-align来设置其中的文本对齐样式，这里设置为居中。其实text-align属性会影响到一个元素中所有内联内容的对齐样式，不仅仅是文本。还要记住，text-aligh属性只能用于块元素（重点），如果直接用于内联元素（如<img>）就没有作用了。text-aligh属性值也可继承。例如<div>元素中的所有文本都在其他块元素中，如<h2>、<p>.但现在他们的对齐样式都改变了。这是因为这些块元素继承了<div>的text-align属性。区别是，不是<div>直接影响标题和段落（这些都是块元素）中的文本对齐样式，而是标题和段落继承了text-align属性值"center"，使它们自己的内容居中了。但是谨记并非所有的属性都是可以默认继承的，所以这并不会对所有的属性都起作用。


```

***
#### 修改输入框placeholder文字默认颜色-webkit-input-placeholder
```
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
    color: #f00;
}
```
***
#### mysql查詢數據存儲位置
```
show global variables like "%datadir%";
```
***
#### span文字居中可以调节line-height

***
#### JS计算2个标准格式时间字符串的差 时间差
```
 
/*
 * 计算时间差 2个标准格式时间字符串的差(t1-t2)，如calStanderTimeDiff('2016-05-04 12:54:54','2016-05-04 12:54:14');
 * @return int 相差的秒数
 */
function calStanderTimeDiff(t1,t2){
  return (new Date(t1)-new Date(t2))/1000;
  //return Math.abs(new Date(t1)-new Date(t2))/1000;
}
```
***
#### JS 保留小数点后X位（四舍五入）返回值的是字符串
```
(4.5).toFixed(1)
"4.5"
(4.523).toFixed(1)
"4.5"
(4.553).toFixed(1)
"4.6"
(4.583).toFixed(1)
"4.6"
```

***
#### 微信下载app（任何附件）的方式（安卓唤起自带浏览器下载）
```
设置 header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
适用于融云和自己的服务器
详见wxdownload.php
```


***
#### 自定义android版confirm依赖AL框架
```
myConfirm('退出当前账号后不会删除任何历史数据，下次登录依然可以使用本账号。','取消','退出','',function(){
    alert(1);
  });
    /*
    * 自定义android版confirm依赖AL框架
    * @params content 内容
    * @params conceltext 取消按钮文字
    * @params confirmtext 确认按钮文字
    * @params concelcb 取消callback 可空。不需要close
    * @params confirmcb 确认callback 可空。不需要close
    */
    function myConfirm(content,conceltext,confirmtext,concelcb,confirmcb){
      conceltext=conceltext||'取消';
      confirmtext=confirmtext||'确认';
      var $popup = A.popup({
            html: '<div style="padding:24px 21px;font-size: 18px;background:#fff">'+content+'<div style="color:#616161"></div><div style="margin:26px 5px 48px 0px;"><a style="position:absolute;right:115px;color:#4f6692" href="javascript:;" id="concel">'+conceltext+'</a><a style="position:absolute;right:48px;color:#4f6692;" href="javascript:;" id="confirm">'+confirmtext+'</a></div></div>',
              css : {width:'70%'},
              pos : 'center',
              isBlock : true
          });
          $popup.popup.find('#concel').on(A.options.clickEvent, function(){
            concelcb&&concelcb();
            $popup.close();
          });
          $popup.popup.find('#confirm').on(A.options.clickEvent, function(){
            confirmcb&&confirmcb();
            $popup.close();
          });
    }
```

***
#### js 字符或字符串出现次数  
```
function countSubstr(str,substr){
           var count;
           var reg="/"+substr+"/gi";    //查找时忽略大小写
           reg=eval(reg);
           var result=str.match(reg)
           if(result==null){
                   count=0;
           }else{
                   count=result.length;
           }
           return count;//返回找到的次数
}
```

***
#### js replaceAll  
```
function replaceAll(str,target,replace){
           var reg="/"+target+"/g";    //查找时忽略大小写
           reg=eval(reg);
           return str.replace(reg,replace)
}

const replaceAll=(str,target,replace)=>{
        var reg="/"+target+"/g";    //查找时忽略大小写
        reg=eval(reg);
        return str.replace(reg,replace)
    }
```

***
#### 让php执行shell
```
system() 输出并返回最后一行shell结果。
exec() 不输出结果，返回最后一行shell结果，所有结果可以保存到一个返回的数组里面。
passthru() 只调用命令，把命令的运行结果原样地直接输出到标准输出设备上。
```

***
#### grep多个关键字“与”和“或
```
或操作
grep -E '123|abc' filename

与操作
grep pattern1 files | grep pattern2

```

***
#### 解决apache下重定向不执行
```
public function auth_card_bxjtest()
  {
    $code=Input::get('code');
    if ($code) {
      header('Location:http://bxjtest.snewfly.com/auth_card?code='.Input::get('code')); 
    }else{
      header('Location:http://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2683432074892f86&redirect_uri=http://bxj.snewfly.com/auth_card_bxjtest&response_type=code&scope=snsapi_base&state=SUISHI');  
    }
    header('HTTP/1.1 301 Moved permanently');
      exit(); 
  }
```

```
<img name="yyy" id="i" src="">
不需要getElementById,直接yyy.src/i.src都不会报错的,但不建议这么使用
```

***
#### Jquery获取和修改img的src值的方法
```
$("#imgId")[0].src;
$("#imgId").attr('src',path); 

```

***
#### 当用curl下载文件的时候不能带\/这样的转义字符
```
//正确
$url='http://bxj242.snewfly.com/upload/wechat/card/voice/16-04-26/0.07610300146164359034.amr';
// 错误
$url='http:\/\/10.169.117.7:9090\/upload\/wechat\/card\/voice\/16-04-26\/0.07610300146164359034.amr';

```


***
#### Php函数前加@是什么意思  
```
@通常是用来抑制误输出的

```

***
#### PHP 获取post和get的全部参数
```
echo $_SERVER["QUERY_STRING"];//get

$data=file_get_contents('php://input');//post
laravel :
Input::all();或者：
$arr = $request->all();

如何访问Content-Type: application/x-www-form-urlencoded的post body内容？
$bodyContent = $request->getContent();
$decodedBody = json_decode($bodyContent);
```

***
#### CAP理论
```
CAP：任何分布式系统在可用性、一致性、分区容错性方面，不能兼得，最多只能得其二，因此，任何分布式系统的设计只是在三者中的不同取舍而已。
C（一致性）：所有的节点上的数据时刻保持同步
A（可用性）：每个请求都能接受到一个响应，无论响应成功或失败
P（分区容错）：系统应该能持续提供服务，即使系统内部有消息丢失（分区）

```

***
#### php获取毫秒级别的时间戳
```
    /**
     * 获取毫秒级别的时间戳
     */
      function getMillisecond()
    {
        //获取毫秒的时间戳
        $time = explode ( " ", microtime () );
        $time = $time[1] . ($time[0] * 1000);
        $time2 = explode( ".", $time );
        return $time2[0];
    }
```

***
#### 函数的作用域是在定义的时候创建的，而不是在执行的时候创建的
```
var aaa = "123";
(function(){alert(aaa); var aaa="456";})(1);
输出的结果是 ： undefined


var aaa = "123";
(function(){alert(aaa);})(1);
输出的结果是
123


这个简单的问题说明了

Jquery具有词法作用域
，函数的作用域是在定义的时候创建的，而不是在执行的时候创建的

如果运行上面的代码，返回的值会是`undefined`，而不是`’123’`。 就是说，在同一个变量作用域或者同一个函数内，只要有使用var声明变量jQuery的语句，就可以在函数中的任何位置访问它，包括在var语句之前。但是在这个例子中，没对这个变量进行初始化 ，所以返回的结果是 undefined
```

***
#### object->post和get的全部参数
```
function obj2param(obj){
            var param='?';
            if (obj instanceof Object) {
                for(var key in obj){
                    param+=key+'='+obj[key]+'&';
                }
            }
            if (param!=='?') {
                console.log(param);
                param=param.substring(0,param.length-1);
                return param;
            }
            return '';
        }

//用trim更简单。。
  private function ToUrlParams($urlObj)
  {
    $buff = "";
    foreach ($urlObj as $k => $v)
    {
      if($k != "sign"){
        $buff .= $k . "=" . $v . "&";
      }
    }
    
    $buff = trim($buff, "&");
    return $buff;
  }

  private function arrayToString($arr){
        $str='';
        foreach ($arr as $key => $value) {
            $str.=$key.'='.$value.'&';
        }
        return trim($str, '&');
    }

```


***
#### js 遍历object，array类似
```
a={"a":"b","c":"d"};for(var i in a){console.log(i+'='+a[i])}

```

***
#### JS 取文本中间
```
  /**
   * 取文本中间
   * @param str 原文本
   * @param left 左边文本
   * @param right 右边文本
   * @param 是否返回匹配文本包含左右边（可省略）
   * @return string 返回匹配文本
   */
function getStringMiddle(str,left,right,returnWhole) {
    var $=left+"([\\d\\D]*?)"+right;
    var pattern=new RegExp($,'g');
    var matches=pattern.exec(str);
    if(!matches) return '';
    if(returnWhole) return matches[0];
    return matches[1];
  }

```


***
#### jQuery 新增元素绑定方法 事件代理
```

$(document).on('click', '.banner-img', function () {
  Bn.showFigure(this.src);
    });
或者逐个新增的绑定
```

***
#### jQuery学习之prop和attr的区别示例介绍

```

http://www.jb51.net/article/43303.htm
总结：
.prop()方法应该被用来处理boolean attributes/properties以及在html(比如：window.location)中不存在的properties。其他所有的attributes(在html中你看到的那些)可以而且应该继续使用.attr()方法来进行操作。 

$('#lll').prop('disabled') //判断LLL元素是否含有disable


```

***
#### JS 用正则替换【全部】
```
content.replace(/\r\n|\n/g, '<br/>');
data=data.replace(/\d+-\d+-(\d\d) \d\d:\d\d:\d\d/g, "$1号");
```

***
#### js 数组的key value添加
```
var a=[];a['111']=11; a['22']=22222; a['111']
a.push(1111)//顺序添加 shift移除末尾

遍历：
var mycars = new Array()
mycars['1q1'] = "Saab"
mycars['q2'] = "Volvo"
mycars['q3'] = "BMW"

for (var x in mycars)
{
document.write(mycars[x]+x + "<br />")
}

var arr = [1,2,3,4];
arr.forEach(alert);

[].forEach(function(value,index,array){
 
　　　　//code something
 
　　});
```

***
#### AL 获取当前section和article的id
```

function getCurrentActiveSectionId() {
    return $('section.active').attr('id');
}

function getCurrentActionArticleId() {
    return $('#' + getCurrentActiveSectionId() + ' article.active').attr('id');
}

```

***
#### post和get的参数最好加上urlencode
```
http://binma85.iteye.com/blog/850042
echo urlencode('&');

```
***
#### mysql的ERROR 1129 (00000): is blocked because of many connection errors
```
whereis mysqladmin
/usr/bin/mysqladmin flush-hosts -uroot -psxxxxx
http://www.cnblogs.com/susuyu/archive/2013/05/28/3104249.html

```

[输入链接说明](http://)
[跨域访问的两种方式](http://blog.csdn.net/fdipzone/article/details/46390573/)
```
<?php
namespace App\Http\Controllers;

require('lib/ServerConfig.php');
use ServerConfig;
use Log;
use Input;
header('content-type:application:json;charset=utf8');  
header('Access-Control-Allow-Origin:*');  
header('Access-Control-Allow-Methods:POST');  
header('Access-Control-Allow-Headers:x-requested-with,content-type');  
class TestController extends BaseController{
  public function test()
  {
    // $callback=Input::get('callback');//jsonp
    // return $callback.'('.json_encode(['value']).')';
    return json_encode(['value'=>123]);
    // $cmd = Input::get('cmd');
    // if ($cmd == 'file') {
    //  Log::info($_FILES);
    // }
  }

}
```
[JS&JQ 获取节点的兄弟,父级,子级元素的方法](http://www.jb51.net/article/45372.htm)
[网页特效库](http://www.5iweb.com.cn/)
[百度地图圆形区域类](http://developer.baidu.com/map/reference/index.php?title=Class:%E8%A6%86%E7%9B%96%E7%89%A9%E7%B1%BB/Circle)

***
#### StrokeDashArray/
```
StrokeDashArray 描述Shape类型轮廓的虚线和间隔的样式，写法为StrokeDashArray="str"。str是虚线和间隙的值的集合，奇数项为虚线长度；偶数项为间隙长度。例如：StrokeDashArray="2,1",则表示虚线长度为2，间隔为1. StrokeDashArray="2" 则表示虚线和间隔都是2

```
[纯CSS实现帅气的SVG路径描边动画效果](http://www.zhangxinxu.com/wordpress/2014/04/animateion-line-drawing-svg-path-%E5%8A%A8%E7%94%BB-%E8%B7%AF%E5%BE%84/)
[超级强大的SVG SMIL animation动画详解](http://www.zhangxinxu.com/wordpress/2014/08/so-powerful-svg-smil-animation/)


***
#### 属性变化的动画效果
[属性变化的动画效果](http://www.dglives.com/effect/9%E7%A7%8D%E7%AE%80%E5%8D%95%E6%98%93%E7%94%A8%E7%9A%84css3%E8%BF%87%E6%B8%A1%E5%8A%A8%E7%94%BB%E6%95%88%E6%9E%9C)
```
参考anime.html
.anime{transition: all 1s ease;}
```

*** AL 动态添加的也可以绑定
#### 
```
//动态添加的也可以绑定
    $(document).on(A.options.clickEvent, '.control', function(){
      console.log('click');
    });
```

[酷炫的FAB](http://materialdesignblog.com/awesome-css-codepen-to-enhance-material-design-fab-button/)

[替换webview中js资源本地加载，提高速度](http://xunhou.me/webview-2/)
[jQuery.extend 函数详解](http://www.cnblogs.com/RascallySnake/archive/2010/05/07/1729563.html)

[js判断移动端是否安装某款app的多种方法](http://www.jb51.net/article/76585.htm)
但是，但是....还是有奇思淫巧滴，启动app需要的时间较长，js中断时间长，如果没安装，js瞬间就执行完毕。直接上代码吧！

***
#### 获取url参数
```
function getRequest() {
var url = location.search; //获取url中"?"符后的字串 
var theRequest = new Object();
if (url.indexOf("?") != -1) {
  var str = url.substr(1);
  strs = str.split("&");
  for(var i = 0; i < strs.length; i ++) {
    theRequest[strs[i].split("=")[0]]=decodeURIComponent(strs[i].split("=")[1]);
  }
}
return theRequest;
}

压缩后
function getRequest(){var c,d,a=location.search,b=new Object;if(-1!=a.indexOf("?"))for(c=a.substr(1),strs=c.split("&"),d=0;d<strs.length;d++)b[strs[d].split("=")[0]]=decodeURIComponent(strs[d].split("=")[1]);return b}

在js中可以使用escape(), encodeURL(), encodeURIComponent()，三种方法都有一些不会被编码的符号：
escape()：@ * / +
encodeURL()：! @ # $& * ( ) = : / ; ? + '
encodeURIComponent()：! * ( ) '
 通过对三个函数的分析，我们可以知道：escape()除了 ASCII 字母、数字和特定的符号外，对传进来的字符串全部进行转义编码，因此如果想对URL编码，最好不要使用此方法。而encodeURI() 用于编码整个URI,因为URI中的合法字符都不会被编码转换。encodeURIComponent方法在编码单个URIComponent（指请求参 数）应当是最常用的，它可以讲参数中的中文、特殊字符进行转义，而不会影响整个URL。


window.location.href：获取完整url的方法：,即scheme://host:port/path?query#fragment
window.location.protocol：获取rul协议scheme
window.location.host：获取host
window.location.port：获取端口号
window.location.pathname：获取url路径
window.location.search：获取参数query部分，注意此处返回的是?query
window.location.hash：获取锚点，#fragment

用法
otherDevice();
function otherDevice(){
  if (GetRequest()['otherDevice']=='1') {
    myAlert('您的账号已在其他设备登录,如果不是本人登录，请使用App修改密码');
  };
}
```


[html中hr的各种样式使用](http://jingyan.baidu.com/article/af9f5a2d37342c43140a4500.html)

***
#### jquery 获取元素id（任何属性）和AL获取当前section和article
```
$('section.active').attr("id")

$('#section_cardcenter article.active').attr("id")
```


* [高性能JavaScript：加载和运行](http://ilanever.com/article/detail.do?id=264#page-catalog-4)
* [JS中的prototype](http://www.cnblogs.com/yjf512/archive/2011/06/03/2071914.html)
* [JS 进阶 闭包，作用域链，垃圾回收，内存泄露](http://segmentfault.com/a/1190000002778015)
* [Javascript 面向对象编程（一）：封装](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html)


***
#### AL Toggle获取状态 和设置
```

//@return 1=true,0=false
function getIsToggleActive(toggleId){
  if ($('#'+toggleId).hasClass('active')) {
    return 1;
  }
  return 0;
}

setToggleState('toggle_school_manage',flag);

/*
* @param toggleId 元素id
* @param state 是否需要选中 0/1
* 设置toggle state
*/
function setToggleState(toggleId,state){
  var isToggleActive=getIsToggleActive(toggleId);
  if (state==0) {
    if (isToggleActive==1) {
      $('#'+toggleId).removeClass('active');
    }
  }else{
    if (!isToggleActive) {
      $('#'+toggleId).addClass('active');
    }
  }
}

```

***
#### AL select选择问题
```
基本都是没法100%宽度导致点不到
select {width: 100%}

```

***
#### document.createElement()用法
见createElement.html
[document.createElement()用法](http://www.jb51.net/article/34740.htm)

[GPS转百度坐标](http://developer.baidu.com/map/index.php?title=webapi/guide/changeposition)


***
#### 微信内下载app提示在其他浏览器打开
```

http://caibaojian.com/weixin-tip.html

Demo
http://7xkaou.com2.z0.glb.qiniucdn.com/MMBAppDL3.html

判断是否微信浏览器高效方法
B_util.is_weixin=(navigator.userAgent.toLowerCase()).match(/MicroMessenger/i) == "micromessenger";
```

***
#### php插入数组的简便方法
```
$arr=[];
for ($i=0; $i <5 ; $i++) { 
    $arr[]=$i;
}
print_r($arr);

```
***
#### shell脚本参数
```
shell脚本参数可以任意多，但只有前9各可以被访问，使用shift命令可以改变这个限制。参数从第一个开始，在第九个结束。
$0 程序名字
$n 第n个参数值，n=1..9 
$* 所有命令行参数
$@        所有命令行参数,如果它被包含在引号里,形如”$@”,则每个参数也各自被引号包括
$# 命令行参数个数 
$$ 当前进程的进程ID(PID)
$!  最近后台进程的进程ID 
$?  最近使用命令的退出状态

```

***
#### nginx负载均衡
```
http://www.cnblogs.com/liping13599168/archive/2011/04/15/2017369.html

远程地址带上密码
http://yourname:password@git.oschina.net/name/project.git

```
***
#### setTimeout延时0毫秒的作用
```
http://www.cnblogs.com/winner/archive/2008/11/15/1334077.html
http://www.cnblogs.com/silin6/p/4333999.html
1、实现javascript的异步；


```

***
#### git操作总结
```
sourcetree
重置的话：
选中分支，右键--重置当前分支至此次提交

抛弃当前修改，
选中分支，右键--检出--勾选 丢弃所有更改

安装git
sudo apt-get install git-core

初始化建库
git init /home/git/myRep.git

远端客户端拉取一份
git clone root@120.24.49.37:/home/hgx/node/mytest

git config --global  user.email "313066164@qq.com"
git config --global user.name "bajian"
config --global  receive.denyCurrentBranch "warn"

提交所有修改过的
git add .
Commit 并附加说明
git commit -m "changes to some-file"

查看提交版本
git log

如果提交后，服务器代码没变，说明分支不对！！
git checkout master

如果远程服务器代码没变，可以试着git log后git checkout 到别的版本再试试切回来

查看当前状态
git status 

err:
git: Your branch and 'origin/master' have diverged
git fetch origin
git reset --hard origin/master
```

***
#### git push 免输入密码
```
http://my.oschina.net/silentboy/blog/217766
```


***
#### data-scroll="verticle|horizontal|scroll":刷新
```
      //当scroll初始化会进入此监听
$('#index_article').on('scrollInit', function(){
    var scroll = A.Scroll(this);//已经初始化后不会重新初始化，但是可以得到滚动对象
    //监听滚动到顶部事件，可以做一些逻辑操作
    scroll.on('scrollTop', function(){
        A.showToast('滚动到顶部');
        scroll.refresh(); //如果scroll区域dom有改变，需要刷新一下此区域
    });
    //监听滚动到底部事件，可以做一些逻辑操作
    scroll.on('scrollBottom', function(){
        A.showToast('滚动到底部');
        scroll.refresh(); //如果scroll区域dom有改变，需要刷新一下此区域，
    });
});
     

```



***
#### 有空可以瞧瞧的前端资源教程
```
http://www.shejidaren.com/category/css/css-learn
```


***
#### html5 audio
```

html5 audio音频播放全解析
http://www.open-open.com/lib/view/open1407401112973.html

html5 touch事件实现触屏页面上下滑动(一)
http://www.cnblogs.com/leinov/p/3701951.html

项目中demo原型在html5_audio目录中

```


***
#### bone首页也要带上page out 的class，否则返回会错版
```
  <div  id="pageHome" class="page out" >
```

***
#### bone ajax加载 需要 data-ajax="false"  且href="qrcode/wifisettings.html" 为相对同域名路径
```
        <div style="margin: 8px"><a href="qrcode/wifisettings.html" data-ajax="false"  type="button" style=" -webkit-border-radius:7px;" class="am-btn am-btn-secondary am-btn-block ">伴学机配置wifi</a></div>
     
```


***
#### 字符串转json对象
```
var json='{"code":"S000000","data":[{"deviceId":"ss333322$$222","pages":500,"timecost":3600,"ts":"2015-12-01","warning":50,"words":30000},{"deviceId":"ss333322$$222","pages":500,"timecost":3600,"ts":"2015-12-02","warning":50,"words":30000}],"msg":""}';
var obj = eval("("+json+")");
obj.code;

json转string：json2
http://www.json.org/js.html

jq版互转（推荐）
http://blog.sina.com.cn/s/blog_667ac0360102ecem.html
json字符串转json对象：jQuery.parseJSON(jsonStr);
json对象转json字符串：JSON.stringify(jsonObj);
```


***
#### js刷新当前页面
```
location.reload() 
微信浏览器内不适用，需要url有变化（加随机数）才能刷新成功
```


***
#### 不允许bone ajax加载bug data-ajax="false" 
```
<a style="float: right;margin: 1px" class="am-btn-sm am-btn-danger" data-ajax="false" href="http://lamp.snewfly.com/hzsb_login_page_zhihui">
        <i class="am-icon-exchange am-text-default"></i>
        切换账号
      </a>

```

***
#### php 编码检测和转换
```
        // $cha=mb_detect_encoding($re);
        // var_dump($cha);//string(5) "UTF-8"
        // $re = iconv($cha,"GB2312",$re);//转成GB2312

```
***
#### nginx 静态文件 跨域 nginx跨域
```
add_header 'Access-Control-Allow-Origin' '*';
```

***
#### 特殊字符过滤 防止xss
```

  B_util.wordFilter=function(t){
    t=t.replace(/\&/g,'&amp;');
    t=t.replace(/\"/g,'&quot;');
    t=t.replace(/\</g,'&lt;');
    t=t.replace(/\>/g,'&gt;');
    return t.replace(/\'/g,'&#39;');
  }
//高级写法
<!--     escapeHtml(str){
    let htmlMaps = {
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }
    return (str + '').replace(/[<>'"]/g, function(a){
      return htmlMaps[a];
    });
  } -->
用途：
<!-- <div id="rrr"></div> -->

  <script type="text/javascript">
    var t="ceshi 特殊符号\n“\\\"\\'”‘’，。、！@￥%……&~（*&（*&~!@$%^&^%&*&(*bKJH\n啥啥啥\nceshi 特殊符号\n“\\\"\\'”‘’，。、！@￥%……&~（*&（*&~!@$%^&^%&*&(*bKJH\n啥啥啥\n“”\\\"\\\"\\\"\\\"\\\";;\\'\\'\\'\\'\\',..\/，。，。、‘；’";
    // t=encodeURIComponent(t);
    t=t.replace(/\&/g,'&amp;');
    t=t.replace(/\"/g,'&quot;');
    t=t.replace(/\</g,'&lt;');
    t=t.replace(/\>/g,'&gt;');
    t=t.replace(/\'/g,'&#39;');
    rrr.innerHTML='<span id="r" data-content="'+t+'">'+t+'</span>';
    console.log(r.dataset.content);
  </script>
```

***
#### js 和php版正则匹配替换
```
js:
var string = '{"code":"S000000","data":[{"deviceId":"ss333322$$222","pages":500,"timecost":3600,"ts":"2015-12-01","warning":50,"words":30000},{"deviceId":"ss333322$$222","pages":500,"timecost":3600,"ts":"2015-12-02","warning":50,"words":30000}],"msg":""}'; string.replace(/\d+-\d+-/g,'');
string.replace(/(\d+-\d+)-/g,'');//g匹配全部，string.replace(/(\d+-\d+)-/,'');//匹配第一个就结束

---------------------------------------------
name = '{"code":"S000000","msg":"操作成功","data":[{"deviceId":"5142521630344243c400003222840507","words":800,"pages":2,"timecost":120,"warning":2,"ts":"2015-12-19 14:40:52"},{"deviceId":"5142521630344243c400003222840507","words":1200,"pages":3,"timecost":120,"warning":3,"ts":"2015-12-20 10:32:01"}],"extra":""}';

uw=name.replace(/\d+-\d+-\d\d \d\d:\d\d:\d\d/g, function(word){//只替换掉修改的部分，然后整个name完整输出
console.log(word)//2015-12-19 14:40:52、2015-12-20 10:32:01
  return word[8]+word[9];}
  );document.write (uw);
-------------------------------------------
  改进
  name = '{"code":"S000000","msg":"操作成功","data":[{"deviceId":"5142521630344243c400003222840507","words":800,"pages":2,"timecost":120,"warning":2,"ts":"2015-12-19 14:40:52"},{"deviceId":"5142521630344243c400003222840507","words":1200,"pages":3,"timecost":120,"warning":3,"ts":"2015-12-20 10:32:01"}],"extra":""}';

uw=name.replace(/\d+-\d+-(\d\d) \d\d:\d\d:\d\d/g, "$1");

document.write (uw);
---------------------------------------------
    var str="中华人民共和国，中华人民共和国";   

 var newstr=str.replace(/(人)民(共)/g,"<font color=red>$1</font>aa<font color=red>$2</font>");   

document.write(newstr);
-----------------------------------------

php:
$string = '{"code":"S000000","data":[{"deviceId":"ss333322$$222","pages":500,"timecost":3600,"ts":"2015-12-01","warning":50,"words":30000},{"deviceId":"ss333322$$222","pages":500,"timecost":3600,"ts":"2015-12-02","warning":50,"words":30000}],"msg":""}';
$pattern = '/\d+-\d+-/i';
$replacement = '';
echo preg_replace($pattern, $replacement, $string);

```

***
#### 并发编程（四）：也谈谈数据库的锁机制
```
http://www.2cto.com/database/201403/286730.html
```

***
#### mysql in 按顺序ORDER BY FIELD 和not in 包含null（子查询）
```
SELECT * FROM t_userinfo WHERE userphone IN ('13714876874','18609944488') ORDER BY FIELD(userphone ,'13714876874','18609944488')
select * from test_in_orderby where id in (3,5,1) order by field(id,3,5,1)
出来的顺序就是指定的顺序了
LARAVEL 中对应: join(',',[1,2,3])可以数组转字符串
Person::whereIn('id',$idsarray)->orderByRaw(DB::raw("FIELD(id, ${idsorderstr})"))->get();

SELECT COUNT(DISTINCT name) FROM CVE WHERE name NOT IN (SELECT cveID FROM cve_sig WHERE cveID IS NOT NULL) 

http://www.jb51.net/article/25639.htm
```

***
#### CSS3 transition 属性
```
http://www.w3chtml.com/css3/properties/transition/transition.html
```

***
#### CSS3中动画属性transform、transition和animation属性的区别
```
http://www.jb51.net/css/496935.html
总结：
小部分直觉化思维的人（包括我）认为transform属性是动画属性。而恰恰相反，transform属性是静态属性，一旦写到style里面，将会直接显示作用，无任何变化过程。
transition属性是一个简单的动画属性，非常简单非常容易用。可以说它是animation的简化版本，是给普通做简单网页特效用的
Animation 在官方的Introduction上介绍这个属性是transition属性的扩展。但是这个简单的介绍里面包含了不简单的东西：keyframes。
```

***
#### 
```
http://www.ituring.com.cn/article/48461

单页应用程序（SPA）一般比较复杂，往往包含数以万计行数的js代码，这些代码至少分布在几十个甚至成百上千的模块中，如果我们也在主界面就加载它们，载入时间会非常难以接受。
算了，我们还是用最简单的方式了，就是动态创建script标签，然后设置src，添加到document.head里，然后监听它们的完成事件，做后续操作。真的很简单，因为我们的框架不需要考虑那么多种情况，不需要AMD，不需要require那么麻烦，用这框架的人必须按照这里的原则写。

Javascript 装载和执行
http://coolshell.cn/articles/9749.html#jtss-tsina

function loadjs(jsurl){
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.src = jsurl;
      document.getElementsByTagName('head')[0].appendChild(s);
    }
    function loadimg(url){
      var s = document.createElement("img");
      s.height= 0;
      s.width= 0;
      s.src = url;
      document.getElementsByTagName('body')[0].appendChild(s);
    }

function loadjs(script_filename,scriptId) {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', script_filename);
    script.setAttribute('id', scriptId);
 
    script_id = document.getElementById(scriptId);
    if(script_id){//删除重复id的
        document.getElementsByTagName('head')[0].removeChild(scriptId);
    }
    document.getElementsByTagName('head')[0].appendChild(script);
}

//压缩版
  function loadjs(a,b){var c=document.createElement("script");c.setAttribute("type","text/javascript"),c.setAttribute("src",a),c.setAttribute("id",b),script_id=document.getElementById(b),script_id&&document.getElementsByTagName("head")[0].removeChild(b),document.getElementsByTagName("head")[0].appendChild(c)}
  
  loadjs('http://lamp.snewfly.com/static/js/bonezhihui.js','bonezhihui');

增强版：增加回调功能
function loadjs(script_filename,scriptId,callback) {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', script_filename);
    script.setAttribute('id', scriptId);
 
    script_id = document.getElementById(scriptId);
    if(script_id){//删除重复id的
        document.getElementsByTagName('head')[0].removeChild(scriptId);
    }
    
    script.onload = function(){
        if (callback!=undefined) {
          callback();
        }
      
    };
    document.getElementsByTagName('head')[0].appendChild(script);
}

压缩后
function loadjs(a,b,c){var d=document.createElement("script");d.setAttribute("type","text/javascript"),d.setAttribute("src",a),d.setAttribute("id",b),script_id=document.getElementById(b),script_id&&document.getElementsByTagName("head")[0].removeChild(b),d.onload=function(){void 0!=c&&c()},document.getElementsByTagName("head")[0].appendChild(d)}



    function loadCss(url,id){
    var cssTag = document.getElementById(id);
    var head = document.getElementsByTagName('head').item(0);
    if(cssTag) head.removeChild(cssTag);
    css = document.createElement('link');
    css.href = url;
    css.rel = 'stylesheet';
    css.type = 'text/css';
    css.id = id;
    head.appendChild(css);
}
压缩后：
function loadCss(a,b){var c=document.getElementById(b),d=document.getElementsByTagName("head").item(0);c&&d.removeChild(c),css=document.createElement("link"),css.href=a,css.rel="stylesheet",css.type="text/css",css.id=b,d.appendChild(css)}

用法举例：

    var bajian=new B();
    function B() {
        this.toast = function(str){
          alert(str);
        };
    }

    bajian.toast('测试一下');
      loadCss('http://7xkaou.com2.z0.glb.qiniucdn.com/toast.min.css','toastcss');
  loadjs('http://7xkaou.com2.z0.glb.qiniucdn.com/toast.min.js','toastjs',function(){
      bajian.toast=function(str){
    var options = {
            title: str,
            type: 'success',
            position: 'bottom',
            duration: 5000,
            mobile: true
        };
    $toast.show(options);
  }

    bajian.toast('测试一下');
  });

```

***
#### mobilebone.js-mobile移动web APP单页切换骨架
```
http://www.zhangxinxu.com/wordpress/2014/10/mobilebone-js-mobile-web-app-core/
```

***
#### jq模拟链接被点击（或者按钮）
```
链接只能用：$('#go123').get(0).click();

按钮可以：$('#btn_login').get(0).click();或者$('#btn_login').click();

trigger 事件

```

***
#### php cli接收键盘输入数据
```
 $a=fgets(STDIN);//接收键盘数据
 echo $a;
```

***
#### js 反射
```
见jsreflect.html
http://blog.csdn.net/liuzizi888/article/details/6632434

```

***
#### 封装AM Alert框
```
HTML:

  <button
  id="btn_myAlert"
  style="display: none;"
  type="button"
  class="am-btn am-btn-primary"
  data-am-modal="{target: '#my-alert',closeViaDimmer: 0}">
  Alert
</button>

<div class="am-modal am-modal-alert" tabindex="-1" id="my-alert">
  <div class="am-modal-dialog">
    <div class="am-modal-hd">温馨提示</div>
    <div class="am-modal-bd" id="myAlert_value">

    </div>
    <div class="am-modal-footer">
      <span class="am-modal-btn">确定</span>
    </div>
  </div>
</div>

JS:
function myAlert(value){

  $("#myAlert_value").html(value);
  $('#btn_myAlert').click();
}

```



***
#### 封装AM confirm框
```
HTML:

  <div class="am-modal am-modal-confirm" tabindex="-1" id="my-confirm">
    <div class="am-modal-dialog">
      <div id="myConfirm_title" class="am-modal-hd">标题</div>
      <div id="myConfirm_content" class="am-modal-bd">
        内容
      </div>
      <div class="am-modal-footer">
        <span class="am-modal-btn" data-am-modal-cancel>取消</span>
        <span class="am-modal-btn" data-am-modal-confirm>确定</span>
      </div>
    </div>
  </div>

JS:
    $('#btn_login').click(function(){
      myConfirm('这是标题','内容。。。。',myconfirmCallback);
    });

      /*
        * 
        * 封装一个AM框架的confirm窗口
        * @param title 标题
        * @param content 内容
        * @param confirmCallback 确认回调 不可空
        * @param cancelCallback 取消回调 可空
        * @param closeViaDimmer 0不可，1可。默认0
        */
        function myConfirm(title,content,confirmCallback,cancelCallback,closeViaDimmer){
          $("#myConfirm_title").html(title);
          $("#myConfirm_content").html(content);
          if (closeViaDimmer==undefined||closeViaDimmer==0) {
            closeViaDimmer=0;
          }else{
            closeViaDimmer=1;
          }
          if (confirmCallback==undefined) {
            return;
          }

          $('#my-confirm').modal({
            relatedTarget: this,
            closeViaDimmer: closeViaDimmer,
            onConfirm: function(options) {
              confirmCallback(options);
            },
            onCancel: function(){
              if (cancelCallback!=undefined) {
                cancelCallback();
              }
            }
          });
        }

        function myconfirmCallback(){
          var $link = $(this.relatedTarget).prev('a');
          var msg = $link.length ? '1你要删除的链接 ID 为 ' + $link.data('id') :
          '1确定了，但不知道要整哪样';
          alert(msg);
        }


```

***
#### jq判断元素是否存在某类
```
$(selector).hasClass(class);
$('#toggle_attendance').addClass('active');
$('#toggle_attendance').removeClass('active');
toggleClass

```

***
#### php回调函数
```
mixed call_user_func_array ( callable $callback , array $param_arr )
http://www.nowamagic.net/librarys/veda/detail/1509 延伸阅读
http://myceo.blog.51cto.com/2340655/725411/
```

***
#### AL框架中radio
```

      <form class="form-group">
        <div class="card">
          <ul class="listitem" id="select_switch">
            <li >可否关机</li>
            <li class="nopadding ">
              <a data-role="radio">
                <label width="100%" for="closerdo1" class="black" >可关</label>
                <input checked="true" type="radio" name="switch" id="closerdo1" value="1">
              </a>
            </li>
            <li class="nopadding noborder">
              <a data-role="radio">
                <label width="100%" for="closerdo2" class="black" >不可关</label>
                <input type="radio" name="switch" id="closerdo2" value="0">
              </a>
            </li>
          </ul>
        </div> 
      </form>
```


***
#### table遍历和删除
```
//遍历 整个table每行没咧
function GetInfoFromTable(tableid) {
    var tableInfo = "";
    var tableObj = document.getElementById(tableid);
    for (var i = 0; i < tableObj.rows.length; i++) {    //遍历Table的所有Row
        for (var j = 0; j < tableObj.rows[i].cells.length; j++) {   //遍历Row中的每一列
            tableInfo += tableObj.rows[i].cells[j].innerText;   //获取Table中单元格的内容
            tableInfo += "   ";
        }
        tableInfo += "\n";
    }
    return tableInfo;
} GetInfoFromTable("tb_re");

//删除某一行
 function deleteRow(tableid) {
    var tableInfo = "";
    var tableObj = document.getElementById(tableid);
    for (var i = 0; i < tableObj.rows.length; i++) {    //遍历Table的所有Row
        
            tableInfo= tableObj.rows[i].cells[3].innerText;   //获取Table中单元格的内容
            if(tableInfo=="0"){ tableObj.deleteRow(i);i--;}
    }
    return tableInfo;
} 

```


***
#### delete  js delete可以删除对象属性及变量
http://www.jb51.net/article/54247.htm
***
#### 验证码发送
```
var btn_sendSMS_obj=$('#btn_sendSMS');//发送验证码的对象
var wait=0;//等待时间 

//验证码计数君
function count() {
if (wait == 0) { 
btn_sendSMS_obj.removeAttr("disabled"); 
btn_sendSMS_obj.text("发送验证码");//改变按钮中value的值 
} else { 
btn_sendSMS_obj.attr("disabled", true);//倒计时过程中禁止点击按钮 
btn_sendSMS_obj.text(wait + "秒");//改变按钮中value的值 
wait--;
setTimeout('count()',1000);
}
} 
```
***

#### 弹出数字键盘

```
<input id="phone" type="tel" class="am-form-field" placeholder="手机号" >
或者
<input id="user" type="text" placeholder="昵称" pattern="^[0-9]{20}$" title="昵称" value="bajian" required/>

```

***
#### ul listview删除全部不需要遍历再remove，可以直接将整个ul内html只为空
```
var ul=$('#lv_device'); ul.html('');//先清空ul
```

```
jQuery(document).ready(function($) {  
});

$(function(){
  
})
```

***
jqm用
```
$(document).on("pageinit","#pagePhone",function(){
$('#sendSMS').click(function(){
sendSMS();
});
});

```

***
#### jQuery常用方法一览
http://www.cnblogs.com/linzheng/archive/2010/10/14/1851816.html

***
html中 id绝对不能相同，不然很容易造成某些不易察觉的错误

***
#### 常见jq属性操作
```
$('#submitMyRec').attr("disabled", true);

$('#divSubMyRec').hide();

var cid=$('#CID').val();

$('#myRecNum').text(data.msg+'个'); 

$('#recList').append(content);

$('#bindPhone').removeAttr('href');
```

***
#### jquery ajax 带header
```
$.ajax({
      type:"POST",
      url:"https://api.coinvc.com/api/v2/project/subscribe",
      headers:{
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization":'Bearer '+token,
      },
      data:{
        id:pid,
        amount:num
      },
      success: function(data){
        console.log('success',JSON.stringify(data));
      },
      error: function(data){
        console.error(JSON.stringify(data));

      }
    });
```

***
```
function time() {
  if (wait == 0) { 
  o.removeAttr("disabled"); 
  o.text("点击发送短信验证码");//改变按钮中value的值 
  } else { 
  o.attr("disabled", true);//倒计时过程中禁止点击按钮 
  o.text(wait + "秒后重新获取验证码");//改变按钮中value的值 
  wait--;
  setTimeout('time()',1000);
  }
} 
```


***
#### 表单只能输入整数
```
onkeyup="value=value.replace(/[^\d]/g,'')" 
<input type="text" name="Money" id="Money" placeholder="输入整数提现金额" onkeyup="value=value.replace(/[^\d]/g,'')"  >

<input type="number" name="Money" id="Money" placeholder="输入整数提现金额2"  >
```
***
#### jq xml解析并运用
```

//经纬度转实际地址
function card_getGeoReverse(Lat,Lng,OrgiLat,OrgiLng,IsGps){
if (Lat!='' && Lng!='' && OrgiLat!='' && OrgiLng!='' && IsGps!='') {
$.ajax({
url:"/card_getGeoReverse?r="+Math.random()+'&orgiLat='+OrgiLat+'&orgiLng='+OrgiLng+'&lat='+Lat+'&lng='+Lng+'&isGps='+IsGps,
type:"get",
dataType: "xml",
success: function (data) {
if($(data).find('Code').text()=='200'){
var address=$(data).find('Address').text();
if (address!='') {
card_last_location=address;
$('#last_location').html(address);
}

}else{
A.showToast('错误码：'+$(data).find('Code').text()+" "+$(data).find('Info').text());
}
},
error: function (msg) {
A.showToast('网络错误');
}
});
}

}
```

***
#### 百度地图相关
```
//当数组为空时定位到深圳
function ShenZhen () {
map.centerAndZoom("深圳", 12);  
}

/*function refresh(){
$('#dingwei').click();
}*/

/*
* @param GPS 中文地理位置
*/
function LocalMap (lng,lat,GPS) {
map.clearOverlays();
lng = parseFloat(lng) + 0.01185;//经度校正
lat = parseFloat(lat) + 0.00328;//纬度校正
map.setZoom(17);
map.panTo(new BMap.Point(parseFloat(lng),parseFloat(lat)), 17);
map.enableScrollWheelZoom(true);
var opts = {
width : 250,     // 信息窗口宽度
height: 80,     // 信息窗口高度
title : "所在位置" , // 信息窗口标题
enableMessage:true//设置允许信息窗发送短息
};
var point = new BMap.Point(parseFloat(lng),parseFloat(lat)); //创建一个坐标点
var marker = new BMap.Marker(point);  // 创建标注
var content = GPS;
map.addOverlay(marker);               // 将标注添加到地图中
marker.setAnimation(BMAP_ANIMATION_BOUNCE); //标记点跳动效果    
if(content ==""){

var geoc = new BMap.Geocoder();
// var point = new BMap.Point(parseFloat(lng),parseFloat(lat));
geoc.getLocation(point,function  (rs) {
var addComp = rs.addressComponents;
var content = addComp.province +
addComp.city +
addComp.district +
addComp.street +
addComp.streetNumber;
$("#weizhi").replaceWith('<li id="weizhi">所在位置：' + content + '附近</li>');
addClickHandler(content,marker);
})
} else {
addClickHandler(content,marker); //如果数据库存在位置信息则调用数据库的位置信息
}


function addClickHandler(content,marker){
marker.addEventListener("click",function(e){
openInfo(content,e)}
);
}
function openInfo(content,e){
var p = e.target;
var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
var infoWindow = new BMap.InfoWindow(content+"附近",opts);  // 创建信息窗口对象 
map.openInfoWindow(infoWindow,point); //开启信息窗口
}
}
```

***
#### 别人问我的正则问题
```
1、
https://coding.net/u/LDCN/p/LD/git/tree/master/1C4088BA/trunk/DesomodGaren
可能长这样
https://coding.net/u/LDCN/p/LD/git/tree/master/DesomodGaren
可能长这样

LDCN，LD，DesomodGare是我要的
LDCN，LD，DesomodGare，1C4088BA这几个位置的内容不是固定的
解决：
https://coding.net/u/(.*?)/p/(.*?)/git/tree/master/(.*/trunk/)?(.*)

2、
$str='每天在1：03发送消息：哈哈';
$re='';
preg_match('#(每天)?在([^时]*)(时)?发送(消息)?：(.*)#',$str,$re);
print_r($re);

$str='在1：03时发送：哈哈';
$re='';
preg_match('#(每天)?在([^时]*)(时)?发送(消息)?：(.*)#',$str,$re);
print_r($re);

$str='在1：03发送：哈哈';
$re='';
preg_match('#(每天)?在([^时]*)(时)?发送(消息)?：(.*)#',$str,$re);
print_r($re);


3、a.lua,AAAa.lua,B.lua,a.lua,c.lua,a.lua 我想匹配a.lua但不包含AAAa.lua之类的
(?:,|^)(a\.lua)


```

***
#### AL框架中listview之类的DOM操作后要refresh下，否则scroller会出问题
```
//一般当Article为refresh组件的时候，都是通过监听refresh初始化事件（refreshInit）而不是监听articleload或者articleshow事件，因为前者通常比后者晚触发，所以如果需要异步加载数据可能会出现refresh组件尚未初始化的情况，所以一般建议在refreshInit中执行注入等操作。
//当refresh初始化会进入此监听
首先：设置 article的data-scroll="pullup"如：<article data-role="article" id="article_cardcenter" data-scroll="pullup" class="active" style="top:44px;bottom:50px;">
其次：
$('#article_cardcenter').on('refreshInit', function(){
var refresh = A.Refresh(this);
//监听下拉刷新事件，可以做一些逻辑操作，当data-scroll="pullup"时无效
refresh.on('pulldown', function(){
$('#content').prepend('<li><div class="text">下拉刷新的内容</div></li>');
refresh.refresh();//当scroll区域有dom结构变化需刷新
});
//监听上拉刷新事件，可以做一些逻辑操作，当data-scroll="pulldown"时无效
refresh.on('pullup', function(){
$('#content').append('<li><div class="text">上拉刷新的内容</div></li>');
refresh.refresh();//当scroll区域有dom结构变化需刷新
});
});

```


***
#### AL:section间传参数,注意.html?，没有#
```
var li='<li href="section_device_main.html?id=1" data-toggle="section"><div class="img appimg"><img class="am-circle" src="http://mhfm4.us.cdndm5.com/19/18034/20150409110918_180x240_10.jpg" width="60px" height="60px" /></div><i class="icon-color-blue ricon iconfont iconline-arrow-right"></i><div class="text">设备Aa<small>已关机<br/>电量 | 音量</small></div> </li>';


$('#article_device_main').on('articleshow', function(){//设备详情每次展示调用
var params = A.Component.params('#section_device_main');//获取所有参数，这里必须是section和data-toggle类型一致。都是article的话就必须是article
A.showToast('参数id的值为：'+params.id);
});
```


***
#### 真机web调试
```
https://github.com/jieyou/remote_inspect_web_on_real_device?utm_campaign=email_admin&utm_source=trigger-email&utm_medium=email#%E8%B0%83%E8%AF%95android-app%E9%87%8C%E7%9A%84webview
```

***
#### AL框架中点击事件不要使用JQ的，手机上会出先点击难以捕捉问题。使用框架自带的：
```
//选择头像
$('.head-img').on(A.options.clickEvent, function(){
var t=$(this);
if(previewSelected){
previewSelected.css("border","0px");
}
t.css("border","solid 1px #3779D0");
previewSelected=t;
// document.getElementById("iconInfos").value=t.attr("src").substring(11);

return false;
});
```

***
#### 返回当前十位时间戳 string
```
function getCurTs(){return (Date.now()+'').substr(0,10);}
parseInt(Date.now()/1000)

```


***
#### web 融云使用
```
//初始化，传入key
RongIMClient.init(RongKey);
//监听在线状态
RongIMClient.setConnectionStatusListener({
onChanged: function (status) {
// alert("status"+status);
if (status==RongIMClient.ConnectionStatus.CLOSURE) {
// myAlert('您已离线，请检查您的网络');
var showmsg=getShowCommand('<span class="am-icon-remove"> </span>&nbsp;您已离线，请检查您的网络并重新打开','danger');
$('#picMsgContainer').html(showmsg);
timeoutHandler=setTimeout("closeShowCommand()",SHOWMSG_TIME);
myAlert('您已离线，请检查您的网络并重新打开');
}else if(status==RongIMClient.ConnectionStatus.OTHER_DEVICE_LOGIN){
myAlert('您的账号已在其他设备登录');
window.location="http://lamp.snewfly.com/hzsb_login_page?otherDevice=1";
};
}
});
//监听消息接收
RongIMClient.getInstance().setOnReceiveMessageListener({
//接收消息
onReceived: function (data) {

var con=eval('('+data.getContent()+')');
if (localStorage.getItem(LS_LastReceiveTime)>con.ts) {
return;
};
localStorage.setItem(LS_LastReceiveTime,con.ts);

if (data.getContent()!='' && data.getExtra()=='img') {
var obj=eval('('+data.getContent()+')');
changeImg(obj.url,obj.username);
if (PlayAudioTip=="1") {
playAudioTip();
};
}else if(data.getContent()!='' && data.getExtra()=='audio'){
//音频

var obj=eval('('+data.getContent()+')');
writeToChatLog (obj.url,'text-user',obj.username,obj.ts);
if (PlayAudioTip=="1") {
playAudioTip();
};

if (!isAudioLiveOpen) {//没打开
notReadTimes++;
$('#badge_not_read').html(notReadTimes);
$('#badge_not_read').css('display','inline');
}else{//打开着的（这里可不写）
notReadTimes=0;
$('#badge_not_read').html(notReadTimes);
$('#badge_not_read').css('display','none');
}

}else if(data.getContent()!='' && data.getExtra()=='cancel'){
//拒绝拍照

var obj=eval('('+data.getContent()+')');
var showmsg=getShowCommand(obj.username+'拒绝拍照','danger');
$('#picMsgContainer').html(showmsg);
timeoutHandler=setTimeout("closeShowCommand()",SHOWMSG_TIME);
if (PlayAudioTip=="1") {
playAudioTip();
};
}

}
});
//融云链接
RongIMClient.connect(RongToken, {
onSuccess: function (x) {

},
onError: function (x) {
console.log(x);

}
});
//发送消息
ins = RongIMClient.getInstance();
//定义 content等
var   s = document.getElementById("send"), t = document.getElementById("type");
s.onclick = function () {
if (DeviceId=="") {
myAlert(BindTips);
return;
}

var con = RongIMClient.ConversationType.setValue('4');//只使用私聊

var msg=toMsg('123');
var content=RongIMClient.TextMessage.obtain(msg || Date.now());
content.setExtra("smallpic");

//发送消息
ins.sendMessage(con, DeviceId, content, null, {
onSuccess: function () {
var showmsg=getShowCommand('<span class="am-icon-rocket"> </span>&nbsp;指令发送成功','success');
$('#picMsgContainer').html(showmsg);
timeoutHandler=setTimeout("closeShowCommand()",SHOWMSG_TIME);

}, onError: function () {
var showmsg=getShowCommand('<span class="am-icon-remove"> </span>&nbsp;指令发送失败','danger');
$('#picMsgContainer').html(showmsg);
timeoutHandler=setTimeout("closeShowCommand()",SHOWMSG_TIME);
}
});
};


```

***
#### highchart使用
```
/**
* @param data，欲处理原始数据
**/
function handlerChartData(myData,title){

var array = myData.split("T");
var x = array[1];
x = eval("("+x+")");
data = array[2];
data = eval("("+data+")");
drawChart(data,x,title);
}

/**
* @param data，数据 格式（）
* @param x，日期 格式（）
* @param title，标题栏
**/
function drawChart(data,x,title){
$('#drawDiv').css('display','inline');
var enmu='';//单位
if (QueryType==1) {
enmu='页';
}else if (QueryType==2) {
enmu='个';
}else if (QueryType==3) {
enmu='分钟';
}
//QueryType=1;//1=pages，2=words，3=learnts学习时间
chart = new Highcharts.Chart({
chart: {
renderTo: 'drawDiv',
defaultSeriesType: 'spline',
events: {
}
},
title: {
text: title,
x: -20 //center
},
subtitle: {
text: '',
x: -20
},
xAxis: {
categories: x,
gridLineWidth: 1, //设置网格宽度为1 
lineWidth: 1,  //基线宽度 
labels:{y:20}  //x轴标签位置：距X轴下方26像素
},
yAxis: {
title: {
text: '' //左侧边栏
},
min:0,
lineWidth: 1, //基线宽度 
plotLines: [{
value: 0,
width: 1,
color: '#808080'
}]
},
tooltip: {
valueSuffix: enmu
},
//设置图例
legend: {
enabled:false //去掉图例
},
//右下角不显示LOGO 
credits: { 
enabled: false   
},
series:data
});
}
```


***
#### jq <div> \span 赋值 input
```
$('#sp').val();//
$('#sp').html();

jQuery获取多种input值的方法
http://blog.sina.com.cn/s/blog_70491fc60100t5kw.html

```


***
#### 获取选中的单选按钮
```
<label class="label-right" id="radio_group_sex">
	<a href="#" data-role="radio">
		<input type="radio" checked="true" name="sex" id="male" style="left:0;right:auto;" value="男" />
		<label for="male" class="black">男&nbsp;</label>
	</a>
	<a href="#" data-role="radio">
		<input type="radio" name="sex" id="female" style="left:0;right:auto;" value="女" />
		<label for="female" class="black">女&nbsp;</label>
	</a>
</label>

$('#radio_group_sex input[name="sex"]:checked').val();//效率不高
var volume=$('#select_volume').find('input[name="volume"]:checked').val();//效率高

```


***
#### select 默认提示设置&禁止选择
```
<div data-role="select" class="card noborder nopadding">
	<select placeholder="选择按键3号码">
		<option value="" selected="true" disabled="true">选择按键3号码</option>
		<option>15814776561</option>
		<option>13714876874</option>
	</select>
</div>


```

***
#### al中不要出现href="#",这会变成返回上一页的
```
直接不要写href
<a data-role="radio">
  <input type="radio" name="sex" id="female" value="女" />
  <label for="female" class="black">女&nbsp;&nbsp;</label>
</a>


```

***
#### jq设置radio选中，
```
$('#male').prop("checked",true);
不要用下面的，会出毛病的
$('#male').attr("checked",true);

```
***
#### 设置 获取元素自定义属性
```
  img.setAttribute('mId','bajianid');
  img.getAttribute('mId');
  //或者 img.attributes['mId'].nodeValue

  data-X
  dataset
```

***
#### JS中的假值
```
 false null undefined 0 '' (空字符串) NaN
 除了这 6 个外，其它均为“真” ，包括对象、数组、正则、函数等。注意 '0'、'null'、'false'、{}、[],-1也都是真值  。

自制口诀：0闹非数字是未定义的空字符串是错的

```

***
#### 自定义一个select添加器
```
ace chosen update:
$('#select_province').trigger("chosen:updated")

var select=$('#mySelect') ;//选择框对象jq
var select=document.getElementById('select_1');/;//选择框对象js

/*
* 自定义一个select添加器 jq版
* @param select 选择器对象
* @param value 值
* @param name 展示的名字
*/
function addSelect(select,value,name){
select.append('<option value="' + value +'"> ' + name + '</option>');
}

/*
* 自定义一个select添加器 js版
* @param select 选择器对象
* @param value 值
* @param text 展示的名字
*/
function addSelect(select,value,text){
var varItem = new Option(text, value);      
select.options.add(varItem);   
}

```


***
#### 如果select选项中存在指定text，将其设置为选中
```

        /*
        * 如果select选项中存在指定text，将其设置为选中 js版//也可以改成指定value
        * @return boolean true 设置成功，false 不存在
        *简便方法：var objSelect=document.getElementById(id);
        *           objSelect.value = objItemText;
        */
        function setSelectedItem(objSelect,objItemText){
          for (var i = 0; i < objSelect.options.length; i++) {
            if (objSelect.options[i].text == objItemText) {
              objSelect.options[i].selected = true;
              return true;
            }
          }
          return false;
        }

        /*
        * AM框架版（需刷新）
        */
         function setSelectedItem(id,objItemText){
                    var objSelect=document.getElementById(id);
                    objSelect.value = objItemText;
                    $('#'+id).trigger('changed.selected.amui');
        }


      /*
        * 如果select选项中存在指定text，将其设置为选中 AM版
        * @return boolean true 设置成功，false 不存在
        */
        function setSelectedItem(id,objItemText){
          var objSelect=document.getElementById(id);
          for (var i = 0; i < objSelect.options.length; i++) {
            if (objSelect.options[i].text == objItemText) {
              $('#'+id).find('option').eq(i).attr('selected', true);
              return true;
            }
          }
          return false;
        }


```


***
#### 判断select选项中 是否存在Value="paraValue"的Item
```

        /*
        * 判断select选项中 是否存在Value="paraValue"的Item js版
        * @return boolean true 存在，false 不存在
        */
        function jsSelectIsExitItem(objSelect, objItemValue) {
          var isExit = false;
          for (var i = 0; i < objSelect.options.length; i++) {
            if (objSelect.options[i].value == objItemValue) {
              isExit = true; 
              break; 
            }
          }
          return isExit;  
        } 

```


***
#### 判断select选项中 是否存在Value="paraValue"的Item
```

        /*
        * 获得选中的index
        * @param id select的id
        */
        function getCurrentSelectedIndex(id){
          if (id==undefined) {
            id='mySelect';
          }
          return document.getElementById(id).selectedIndex;
        }

        /*
        * 获得选中的value
        * @param id select的id
        */
        function getCurrentSelectedValue(id){
          if (id==undefined) {
            id='mySelect';
          }
          return document.getElementById(id).value;
        }

        /*
        * 获得选中的text weiceshi
        * @param id select的id
        */
        function getCurrentSelectedValue(id){
          if (id==undefined) {
            id='mySelect';
          }
          return document.getElementById(id).options[getCurrentSelectedIndex(id)].text;
        }



```


***
#### select操作大全
```
http://www.cnblogs.com/Herist/archive/2007/09/24/903890.html

判断select选项中 是否存在Value="paraValue"的Item 
向select选项中 加入一个Item 
从select选项中 删除一个Item 
删除select中选中的项 
修改select选项中 value="paraValue"的text为"paraText" 
设置select中text="paraText"的第一个Item为选中 
设置select中value="paraValue"的Item为选中 
得到select的当前选中项的value 
得到select的当前选中项的text 
得到select的当前选中项的Index 
清空select的项 
js 代码
// 1.判断select选项中 是否存在Value="paraValue"的Item        
function jsSelectIsExitItem(objSelect, objItemValue) {        
    var isExit = false;        
    for (var i = 0; i < objSelect.options.length; i++) {        
        if (objSelect.options[i].value == objItemValue) {        
            isExit = true;        
            break;        
        }        
    }        
    return isExit;        
}         
   
// 2.向select选项中 加入一个Item        
function jsAddItemToSelect(objSelect, objItemText, objItemValue) {        
    //判断是否存在        
    if (jsSelectIsExitItem(objSelect, objItemValue)) {        
        alert("该Item的Value值已经存在");        
    } else {        
        var varItem = new Option(objItemText, objItemValue);      
        objSelect.options.add(varItem);     
        alert("成功加入");     
    }        
}        
   
// 3.从select选项中 删除一个Item        
function jsRemoveItemFromSelect(objSelect, objItemValue) {        
    //判断是否存在        
    if (jsSelectIsExitItem(objSelect, objItemValue)) {        
        for (var i = 0; i < objSelect.options.length; i++) {        
            if (objSelect.options[i].value == objItemValue) {        
                objSelect.options.remove(i);        
                break;        
            }        
        }        
        alert("成功删除");        
    } else {        
        alert("该select中 不存在该项");        
    }        
}    
   
   
// 4.删除select中选中的项    
function jsRemoveSelectedItemFromSelect(objSelect) {        
    var length = objSelect.options.length - 1;    
    for(var i = length; i >= 0; i--){    
        if(objSelect[i].selected == true){    
            objSelect.options[i] = null;    
        }    
    }    
}      
   
// 5.修改select选项中 value="paraValue"的text为"paraText"        
function jsUpdateItemToSelect(objSelect, objItemText, objItemValue) {        
    //判断是否存在        
    if (jsSelectIsExitItem(objSelect, objItemValue)) {        
        for (var i = 0; i < objSelect.options.length; i++) {        
            if (objSelect.options[i].value == objItemValue) {        
                objSelect.options[i].text = objItemText;        
                break;        
            }        
        }        
        alert("成功修改");        
    } else {        
        alert("该select中 不存在该项");        
    }        
}        
   
// 6.设置select中text="paraText"的第一个Item为选中        
function jsSelectItemByValue(objSelect, objItemText) {            
    //判断是否存在        
    var isExit = false;        
    for (var i = 0; i < objSelect.options.length; i++) {        
        if (objSelect.options[i].text == objItemText) {        
            objSelect.options[i].selected = true;        
            isExit = true;        
            break;        
        }        
    }              
    //Show出结果        
    if (isExit) {        
        alert("成功选中");        
    } else {        
        alert("该select中 不存在该项");        
    }        
}        
   
// 7.设置select中value="paraValue"的Item为选中    
document.all.objSelect.value = objItemValue;    
       
// 8.得到select的当前选中项的value    
var currSelectValue = document.all.objSelect.value;    
       
// 9.得到select的当前选中项的text    
var currSelectText = document.all.objSelect.options[document.all.objSelect.selectedIndex].text;    
       
// 10.得到select的当前选中项的Index    
var currSelectIndex = document.all.objSelect.selectedIndex;    
       
// 11.清空select的项    
document.all.objSelect.options.length = 0;  

```

***
#### 删除指定index的数组元素
```
splice(index,num) //index 从1开始
arr=[1,2,3,4,5]
arr.splice(1);//[2, 3, 4, 5] 删除指定index及前面的数组元素,返回剩余的数组

arr.splice(3,1) //[4]
```

***
#### js支持类似重载的调用方法 不定参数个数。也可以通过arguments 数组变量获取全部参数
```
	function myfun(arg1,arg2,arg3){
		alert("in");
		alert(arg3);
	}
myfun();
myfun("arg1");
myfun("arg1","arg2");
myfun("arg1","arg2","arg2");
myfun("arg2","arg2","arg2","arg2");

```

***
#### js 回调函数
```
http://blog.csdn.net/lulei9876/article/details/8494337

function a(callback)   
{      
   alert("我是parent函数a！，准备调用回调函数");   
     
    if (callback==d) {//判断有无参数
    	callback('{"a":"b"}');   
    }else{
    	callback();  
    }
}   
function b(){   
alert("我是回调函数b");   
  
}   
function c(){   
alert("我是回调函数c");   
  
}

function d(params){
	alert("回调函数，带参数："+params);
}   
  
function test()   
{   
    a(b);   
   a(c);  
   a(d);
}   
  
```

***
#### php 保存同时上传多个文件
```
// print_r($_FILES);
// exit();Array
/*(
[mFile] => Array
(
[name] => face_cache.png
[type] => image/png
[tmp_name] => /tmp/phpfZM1gc
[error] => 0
[size] => 949898
)

[mFile1] => Array
(
[name] => 123.png
[type] => image/png
[tmp_name] => /tmp/phpcAkfjB
[error] => 0
[size] => 2886
)

)*/
$host='http://guixuan.snewfly.com/';
$return='';
foreach ($_FILES as $key => $value) {
if ($value["size"]<1000000) {//1MB
$name=$value["name"];
// 将文件移动到新的文件路径
move_uploaded_file($value['tmp_name'], $name);
$return.=$host.$name.';';
}
}
return $this->get_json(1,'成功','',$return);

```
