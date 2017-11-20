<?php

/**
 * summary
 */
class Tool  
{
    //静态变量保存全局实例
    private static $_instance = null;
    
    //私有构造函数，防止外界实例化对象
    private function __construct() {
    }

    //私有克隆函数，防止外办克隆对象
    private function __clone() {
    }

    //静态方法，单例统一访问入口
    public static function getInstance() {
        if (is_null ( self::$_instance ) || isset ( self::$_instance )) {
            self::$_instance = new self ();
        }
        return self::$_instance;
    }

    public function test(){
        echo 'in test';
        return 111;
    }

    public static function __callStatic($method, $arguments)
    {
        $instance=static::getInstance();
        return call_user_func_array(array($instance,$method),$arguments);
    }


}

echo Tool::test();

