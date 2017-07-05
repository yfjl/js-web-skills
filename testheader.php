<?php

for ($i=0; $i <100 ; $i++) { 
	echo 'header qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchuheader qian de shuchu';
}

// 缓存
// 当执行输出的时候，比如 echo,print。输出并没有立即送给 web server， 而是将数据写入 php buffer。php output_buffering 机制好处当然提升性能。其实 php 文件最终在浏览器上显示，走过3个缓冲阶段： php buffer=》web server buffer=》browser buffer。 最后显示到浏览器

// 默认情况下，php buffer 是开启的，而且该 buffer 默认值是4096，即4 kb。你可以通过在php.ini配置文件中找到output_buffering配置


// 服务器会缓存输出，虽然你使用了echo / print 但在那个时候服务器还没有将这些内容作为HTTP报文输出，这个时候仍可以有机会修改HTTP头。如果只想验证下header官网定义的不得在任何输出之前输出引发错误，可以在header之前输出一个绝对超过缓存大小的HTTP内容就好了。
header('Content-type:text/html;charset=utf-8');
header("Cache-Control: no-cache");
ob_flush();
flush();
echo 'header qian de shuchu';