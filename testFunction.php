<?php


$foo=new Name();
$foo->showGet();//2
/**
* 
*/
class Name 
{
	

	public function get(){
		return 1;
	}

	public function showGet(){
		echo get();
	}
}


function get(){
	return 2;
}