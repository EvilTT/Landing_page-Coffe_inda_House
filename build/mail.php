<?php
$to = "mega.zava199@gmail.com";
$name = $_POST['name'];
$surname = $_POST['surname'];

$contact = $_POST['contact']; // no

$telOrEmal = $_POST['contact-info'];
$isVisited = $_POST['isVisited'];
$messageForm = $_POST['text-message'];
$pc = $_POST['privacy-policy'];

$message = '
<html>
<body>
<center>	
<table border=1 cellpadding=6 cellspacing=0 width=90% bordercolor="#DBDBDB">
 <tr><td colspan=2 align=center bgcolor="#E4E4E4"><b>Информация</b></td></tr>
 <tr>
  <td><b>Откуда</b></td>
  <td>Coffee inda House</td>
 </tr>
 <tr>
  <td><b>Адресат</b></td>
  <td>'.$name. $surname.'</td>
 </tr>
 <tr>
  <td><b>Контакты</b></td>
  <td>'.$telOrEmal.'</td>
 </tr>
 <tr>
  <td><b>Сообщение</b></td>
  <td>'.$messageForm.'</td>
 </tr>
 <tr>
  <td><b>Был у нас?</b></td>
  <td>'.$isVisited.'</td>
 </tr>
 <tr>
  <td><b>Ознакоплен с политикой конфиденциальности</b></b></td>
  <td>'.$pc.'</td>
 </tr>
</table>
</center>	
</body>
</html>
';
$subject = "Coffee inda house - Форма обратной связи связи";

$headers  = "Content-type: text/html; charset=utf-8\r\n";
$headers .= "From: Отправитель <from@example.com>\r\n";

$result = mail($to, $subject, $message, $headers);
print_r($result)
?>      