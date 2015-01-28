<?php
header("Location: this-page.php?status=thanks") 
$name = $_POST['name'];
$from = 'From: wesite'; 
$to      = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['subject'];
$headers = 'From: webmaster@qixty.com' . "\r\n" .
'Reply-To: bruno.quintela.bastos@gmail.com' . "\r\n" .
'X-Mailer: PHP/' . phpversion();

$body = "From: $name\n E-Mail: $email\n Message:\n $message";

$send = mail ($to, $subject, $body, $from)

// this will help you to get the status mail sent or not
if($send) :
   echo "<p>Email sent</p>";
else :
    echo "<p>Email sending failed</p>";
endif;
?>