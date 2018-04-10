# ci-skills
CI框架知识点摘要

***
#### 
```
```

***
#### 处理多环境的配置文件
```
$_SERVER['CI_ENV'] 的值可以在 .htaccess 文件或 Apache 的配置文件中 使用 SetEnv 命令进行设置，Nginx 或其他 Web 服务器也有类似的设置方法。 或者你可以直接删掉这个逻辑，根据服务器的 IP 地址来设置该常量。

nginx conf中加入
fastcgi_param  CI_ENV  production;
fastcgi_param  CI_ENV  development;

http://codeigniter.org.cn/user_guide/general/environments.html

你可以根据当前的环境来加载不同的配置文件，index.php 文件中定义了 ENVIRONMENT 常量，在 处理多环境 中有更详细的介绍。
要创建特定环境的配置文件，新建或复制一个配置文件到 application/config/{ENVIRONMENT}/{FILENAME}.php 。
例如，要新建一个生产环境的配置文件，你可以：

新建目录 application/config/production/
将已有的 config.php 文件拷贝到该目录
编辑 application/config/production/config.php 文件，使用生产环境下配置
当你将 ENVIRONMENT 常量设置为 'production' 时，你新建的生产环境下的 config.php 里的配置将会加载。

你可以放置以下配置文件到特定环境的目录下：
默认的 CodeIgniter 配置文件
你自己的配置文件

CodeIgniter 总是先加载全局配置文件（例如，application/config/ 目录下的配置文件）， 然后再去尝试加载当前环境的配置文件。这意味着你没必要将所有的配置文件都放到特定环境的配置目录下， 只需要放那些在每个环境下不一样的配置文件就可以了。另外，你也不用拷贝所有的配置文件内容到 特定环境的配置文件中，只需要将那些在每个环境下不一样的配置项拷进去就行了。定义在环境目录下的配置项， 会覆盖掉全局的配置。

```


***
#### 获取配置值
```
$this->config->load('config', TRUE, TRUE);//第三个参数用于抑制错误信息，当配置文件不存在时，不会报错:
//$this->config->load('config', TRUE);//当配置文件不存在时，会报错:
echo $this->config->item('time_reference', 'config');


```

***
#### sql 转义查询
```

在提交数据到你的数据库之前，确保先对其进行转义是个非常不错的做法。 CodeIgniter 有三个方法来帮你做到这一点：
1、
$this->db->escape() 这个函数会检测数据类型，仅转义字符串类型的数据。 它会自动用单引号将你的数据括起来，你不用手动添加：
2、
$sql = "INSERT INTO table (title) VALUES(".$this->db->escape($title).")";
$this->db->escape_str() 这个函数忽略数据类型，对传入的数据进行转义， 这个方法并不常用，一般情况都是使用上面的那个方法。方法的使用代码如下：
3、
$sql = "INSERT INTO table (title) VALUES('".$this->db->escape_str($title)."')";
$this->db->escape_like_str() 这个函数用于处理 LIKE 语句中的字符串，
这样，LIKE 通配符（'%', '_'）可以被正确的转义。

```


***
#### ci apache 配置rewrite
```
1、
directory 中的AllowOverride All
    Require all granted
    是关键
<VirtualHost *:80>
    ServerAdmin ci.bajian.com
    DocumentRoot "/Applications/XAMPP/xamppfiles/code/server/ci"
    Options FollowSymLinks
    <Directory /Applications/XAMPP/xamppfiles/code/server/ci>  
        Options FollowSymLinks
    AllowOverride All
    Require all granted
    </Directory>  

    ServerName ci.bajian.com
    ServerAlias ci.bajian.com
    ErrorLog "logs/dummy-ci.bajian.com-error_log"
    CustomLog "logs/dummy-hci.bajian.com-access_log" common
</VirtualHost>

2、
创建htacess
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.php/$1 [L]
3、修改config中的成如下
$config['index_page'] = '';
```

