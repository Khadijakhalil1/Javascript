<?php
$host = 'localhost';
$user = 'useraname';
$pass = '';
$db = 'test';
$conn = mysql_connect($host,$user,$pass,$db)
if(!$conn)
{
    die('Error connect: ' . mysql_error());
}echo'not connect';
?>