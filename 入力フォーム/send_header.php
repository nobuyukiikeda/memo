<?php

if (preg_match("/yourmail@gmail.com/", $_POST["mail"])) {
	exit("");
}

mb_language("Japanese");
mb_internal_encoding("UTF-8");

$referer = $_SERVER["HTTP_REFERER"];
$url = '許可する遷移前アドレス';
if(!strstr($referer,$url)){
	header( "Location: ./send_miss.php" ) ;
	exit;
}

$name = $_POST["name"];

$message = "ウェブサイトよりお問い合わせがありました。\n\n名前：" . $name;

if (empty($name) || empty($phone)) {
	header( "Location: ./send_miss.php" ) ;
	exit;
} elseif(empty($mail) || empty($txt)) {
	header( "Location: ./send_miss.php" ) ;
	exit;
} else {
	if (!mb_send_mail("送信先メールアドレス", "ウェブサイトよりお問い合わせです。", $message, "From: " . $mail . "\r\n")) {
		exit("メールの送信に失敗しました。");
	}
}

?>