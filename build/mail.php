<?php
// Файлы phpmailer
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

// Переменные, которые отправляет пользователь
$name = $_POST['name'];
$surname = $_POST['surname'];
$email = $_POST['contact-info'];
$text = $_POST['text-message'];
$file = $_FILES['myfile'];
$isVisited = $_POST['isVisited'];

// Формирование самого письма
$title = "Coffe inda House - Форма обратной связи";
$body = "
<h2>Новое письмо</h2>
<b>Имя:</b> $name<br>
<b>Фамилия:</b> $surname<br>
<b>$contact:</b> $email<br><br>
<b>Посещал заведение Coffe inda House:</b> $isVisited<br>
<b>Сообщение:</b><br>$text
";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    $mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'smtp.yandex.ru'; // SMTP сервера вашей почты
    $mail->Username   = 'zavadskijmaxim@yandex.by'; // Логин на почте
    $mail->Password   = 'vomwbhkhpbufhluh'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('zavadskijmaxim@yandex.by', 'Coffee inda House - Mail Server'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('coffee.inda.house@yandex.by');  

    if (!empty($file['name'][0])) {
        for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
            $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
            $filename = $file['name'][$ct];
            if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
                $mail->addAttachment($uploadfile, $filename);
                $rfile[] = "Файл $filename прикреплён";
            } else {
                $rfile[] = "Не удалось прикрепить файл $filename";
            }
        }   
    }
    // Отправка сообщения
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;    
    
    // Проверяем отравленность сообщения
    if ($mail->send()) {$result = "success";} 
    else {$result = "error";}
    
    } catch (Exception $e) {
        $result = "error";
        $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
    }
// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);
