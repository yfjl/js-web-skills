<?php

/**
 * FileUtil
 * @author bajian
 */
class FileUtil
{


	/**
	 * @param string $name
	 * @param string $size 限制文件大小单位byte 1000=1kb
	 * @return [state,saveDir] '-1','文件不存在' \'-2','文件大小不符合要求' \'-3','文件格式不符合要求'
	 */
	public static function saveFile($name,$size,$saveDir,$saveName='',$matchSuff='')
	{
		header("Content-Type:text/html;charset=utf-8");
		if (!isset($_FILES[$name])) return -1;
		$file=$_FILES[$name];
		$file_size=$file['size'];
		if ($file_size>$size||$file_size<=0) return -2;
		if ($matchSuff!='') {
			if(!strpos($file['name'], $matchSuff)) return -3;
		}
		if (!$saveName)
		    $saveName='r'.time().mt_rand(1,999999);
		$dir=$saveDir.$saveName;
		// move_uploaded_file($file['tmp_name'],$dir);
		// var_dump($file);
		$sExtension = substr($file['name'], (strrpos($file['name'], '.') + 1));//找到扩展名
		$dir=$dir.'.'.$sExtension;
		move_uploaded_file($file['tmp_name'],$dir);
		// move_uploaded_file($file["tmp_name"], iconv("utf-8","gb2312",$dir));  //解决windows编码问题，不好解决跨平台问题，只好重命名了
		return [file_exists($dir)?1:-4,$dir];
	}

	public static function creatXlsxDir()
	{
		$dirDate = date('Y-m-d',$_SERVER['REQUEST_TIME']);

		$dir='upload'.DIRECTORY_SEPARATOR.'xlsx'.DIRECTORY_SEPARATOR.$dirDate;
		if(!is_dir($dir))
		    mkdir($dir,0777,true);

		return $dir.DIRECTORY_SEPARATOR;
	}

	public static function createImgDir()
	{
		$dirDate = date('Y-m-d',$_SERVER['REQUEST_TIME']);

		$dir='upload'.DIRECTORY_SEPARATOR.'img'.DIRECTORY_SEPARATOR.$dirDate;
		if(!is_dir($dir)) mkdir($dir,0777,true);

		return $dir.DIRECTORY_SEPARATOR;
	}
	public static function createCommonDir($name='file')
	{
		$dirDate = date('Y-m-d',$_SERVER['REQUEST_TIME']);

		$dir='upload'.DIRECTORY_SEPARATOR.$name.DIRECTORY_SEPARATOR.$dirDate;
		if(!is_dir($dir)) mkdir($dir,0777,true);

		return $dir.DIRECTORY_SEPARATOR;
	}
}