<?php 
	$data = @file_get_contents("http://www.youtube.com/get_video_info?video_id=".$_REQUEST['videoId']);
	echo ($data);
 ?>