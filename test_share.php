<?php
define('BR', "\n");
// define('HOST', "http://share.com/");
define('HOST', "http://sdp.hzsb365.com/");
// $arr=[['company'=>'思路飞扬','job'=>'后台开发','time_begin'=>'2017-01','time_end'=>'至今','work_content'=>'主要负责XXX工作'],['company'=>'思路飞扬2','job'=>'后台开发2','time_begin'=>'2016-01','time_end'=>'2017-01','work_content'=>'主要负责XXX工作']];
// $arr=[['school'=>'深圳大学','major'=>'通信工程','graduated_at'=>'2017-08','education'=>'本科']];
// echo json_encode($arr,JSON_UNESCAPED_UNICODE);
// echo time();
// $content=json_encode(['from_user_id'=>123,'nickname'=>'hehehe','real_name'=>'黄桂旋','headimgurl'=>'https://XXXXX','timestamp'=>1503910813,'content'=>'你猜猜我是谁？'],JSON_UNESCAPED_UNICODE);
// echo json_encode([['id'=>1,'name'=>'唱歌','type'=>0],['id'=>null,'name'=>'读书','type'=>1]],JSON_UNESCAPED_UNICODE);

// var_dump(json_decode((json_decode('{"content":"{\"from_user_id\":123,\"nickname\":\"hehehe\",\"real_name\":\"黄桂旋\",\"headimgurl\":\"https:\\\/\\\/XXXXX\",\"timestamp\":1503910813,\"content\":\"你猜猜我是谁？\"}","extra":"0101001"}'))->content));
// {"code":-1,"msg":[{"h_sum":120,"user_id":1},{"h_sum":100,"user_id":3}
// ,{"h_sum":80,"user_id":4}],"data":""}
// h ttp://share.com/
// http://share.com/

$headers=[];
// $access_token='6caa60c138e66827cfce45eb5d624d2c';//local 158
// $access_token='515be6f5e5bf05e8614f271f313c77f6';//local 137
// $access_token='afe43814607bb0cc2d536277f11d28d6';//SDP 13714876874
$access_token='f55147d3c2602209caad0861fc425286';//SDP 
$headers[] = 'Authorization: '.$access_token;

// login();
function login()
{
$sms_code='215235';
$platform='android';
$phone='15814776561';
$sign=sha1($openid.$secret);
echo http_request(HOST.'api/v1/user/login', compact('phone','sms_code','platform'));
}
// register();
function register()
{
    $invitation_code='153320';
    $platform='android';
    $phone='17665465431';
    $sms_code='315471';
    $a=http_request(HOST.'api/v1/user/register', compact('invitation_code','sms_code','platform','phone'));
    // var_dump(json_decode($a));
    echo $a;
}

// pwd_reset();
function pwd_reset()
{
    $sms_code='xcx';
    $phone='13714875555';
    $password='123456';
echo http_request(HOST.'api/v1/user/pwd_reset', compact('sms_code','phone','password'));
}

// send_sms('17665465431',0);//register
// send_sms('15814776561',1);//login
function send_sms($phone,$type)
{
echo http_request(HOST.'api/v1/sms/send', compact('type','phone','password'));
}

// change_phone($access_token);
function change_phone($access_token)
{
    $sms_code='xcx';
    $phone='13714875556';
    $openid='o4ugXtwanykZPmdiyN4iTA0L6uxx';
echo http_request(HOST.'api/v1/user/change_phone', compact('sms_code','phone','access_token'));
}

// real_name_auth($access_token);
function real_name_auth($access_token)
{
    $real_name='黄桂旋';
    $idcard='445281199912121119';
echo http_request(HOST.'api/v1/user/real_name_auth', compact('real_name','idcard','access_token'));
}


// info($headers);
function info($headers)
{
echo http_request(HOST.'api/v1/user/info', compact('car_license_number','brand','model','vin_suf','en_suf','access_token'),$headers);
}

userlist($headers);
function userlist($headers)
{
    $order_by='mix';
    $lat='22.720368';
    $lng='114.224357';
    // $order_by='latest';
    // $order_by='distance';
    $page='1';
    $per_page='10';
echo http_request(HOST.'api/v1/user/list', compact('order_by','lat','per_page','page','lng','access_token'),$headers);
}

// search_userlist($headers);
function search_userlist($headers)
{
    $search_value='黄';
    $search_type='';
    // $order_by='distance';
    $page='1';
    $per_page='10';
echo http_request(HOST.'api/v1/user/search_list', compact('search_value','search_type','per_page','page','en_suf','access_token'),$headers);
}

// invitation($headers);
function invitation($headers)
{
    $order_by='mix';
    // $order_by='latest';
    // $order_by='distance';
    $page='1';
    $per_page='10';
echo http_request(HOST.'api/v1/user/invitation', compact('order_by','brand','per_page','page','en_suf','access_token'),$headers);
}

// send_msg($headers);
function send_msg($headers)
{
    $user_id='2';
    // $order_by='latest';
    // $order_by='distance';
    $content='哈哈哈';
echo http_request(HOST.'api/v1/user/send_msg', compact('user_id','content','per_page','page','en_suf','access_token'),$headers);
}

// edit_info($headers);
function edit_info($headers)
{
    $fields=json_encode(['nickname'=>'bajianx','sex'=>2,'phone'=>66666]);
echo http_request(HOST.'api/v1/user/edit_info', compact('fields','brand','model','vin_suf','en_suf','access_token'),$headers);
}

// hobby_public_list($headers);
function hobby_public_list($headers)
{
    $fields=json_encode(['nickname'=>'bajianx','sex'=>2,'phone'=>66666]);
echo http_request(HOST.'api/v1/hobby/public_list', compact('fields','brand','model','vin_suf','en_suf','access_token'),$headers);
}

// resource_public_list($headers);
function resource_public_list($headers)
{
    $fields=json_encode(['nickname'=>'bajianx','sex'=>2,'phone'=>66666]);
echo http_request(HOST.'api/v1/resource/public_list', compact('fields','brand','model','vin_suf','en_suf','access_token'),$headers);
}


// save_hobby($headers);
function save_hobby($headers)
{
    $fields='[{"id":1,"name":"唱歌","type":0},{"id":null,"name":"读书","type":1}]';
echo http_request(HOST.'api/v1/user/save_hobby', compact('fields','brand','model','vin_suf','en_suf','access_token'),$headers);
}


// save_resource($headers);
function save_resource($headers)
{
    $fields='[{"id":1,"name":"区块链","type":0},{"id":null,"name":"教育板块","type":1}]';
echo http_request(HOST.'api/v1/user/save_resource', compact('fields','brand','model','vin_suf','en_suf','access_token'),$headers);
}

// listcar($access_token);
function listcar($access_token)
{
    $car_license_number='粤AY94T2';
echo http_request(HOST.'api/v1/car/list', compact('car_license_number','brand','model','vin_suf','en_suf','access_token'));
}


// unbind($access_token);
function unbind($access_token)
{
    $car_id='1';
echo http_request(HOST.'api/v1/car/unbind', compact('car_id','access_token'));
}

// user_consume();
function user_consume()
{
    $order_id='546465a41';
    $money='5';
    $nonce='20';
    $timestamp=time();
    $car_license_number='粤AY94T2';
    $user_id='1';
    $reader_device_id='12345667888';
    $secret='sd546dfspzs';

    $signature=md5( $car_license_number.$user_id.$order_id.$money.$nonce.$timestamp.$secret );
echo http_request(HOST.'api/v1/charge/user_consume', compact('signature','user_id','reader_device_id','order_id','money','nonce','timestamp','car_license_number'));
}

// user_charge();
function user_charge()
{
    $order_id='1aa223';
    $money='200';
    $nonce='20';
    $timestamp=time();
    $car_license_number='粤AY94T2';
    $user_id='o4ugXtwanykZPmdiyN4iTA0L6u08';
    $reader_device_id='12345667888';
    $secret='sd546dfspzs';

    $signature=md5( $user_id.$order_id.$money.$nonce.$timestamp.$secret );
echo http_request(HOST.'api/v1/charge/charge', compact('signature','user_id','reader_device_id','order_id','money','nonce','timestamp','car_license_number'));
}


// echo getRand(30, 2);
/** 
     * 获取随机数 
     * @param number $len 随机数的位数 
     * @param number $type 取值范围 1表示数字 2小写字母 3数字小写混合 4大写字母 
     * @return string 
     */  
     function getRand($len = 30, $type = 3)  
    {  
        $str = '';  
        $max = - 1;  
          
        if (! $type) {  
            $type = 3;  
        }  
          
        if ($type & 1) {  
            $str .= '1234567890';  
            $max += 10;  
        }  
          
        if ($type & 2) {  
            $str .= 'abcdefghijklmnopqrstuvwxyz';  
            $max += 26;  
        }  
          
        if ($type & 4) {  
            $str .= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';  
            $max += 26;  
        }  
          
        $rand = '';  
        for ($i = 0; $i < $len; $i ++) {  
            $rand .= $str[rand(0, $max)];  
        }  
          
        return $rand;  
    }  


function http_request($url, $data = null,$headers=[])
{
    // $headers[] = 'Accept-Language: zh-CN,zh;q=0.8';
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
    curl_setopt($curl,CURLOPT_USERAGENT,'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36');
    if (count($headers)) 
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    if (!empty($data)){
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    }
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $output = curl_exec($curl);
    curl_close($curl);
    return $output;
}

