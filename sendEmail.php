<?php
require_once 'lib/PHPMailer/PHPMailerAutoload.php';

//$errormessage = "Error Message";
// Get Form Data
$name = $_POST["name"];
$email = $_POST["email"];
$comments = $_POST["comments"];
$phonenumber = $_POST["phonenumber"];
// Create SMTP Settings
$m= new PHPMailer();
$m->isSMTP();
$m->SMTPAuth = true;
//$m->SMTPDebug = 2;
$m->Host = 'a2plcpnl0434.prod.iad2.secureserver.net';
$m->Username = 'hr@1pointsys.com';
$m->Password='****';
$m->SMTPSecure = 'ssl';
$m->Port = 465;

$msg = "New contact us request...</br>";
$msg .= "<b>Name:</b> " .$name. "</br> " .
 "<b>Email Address:</b> " .$email. "</br> ".
 "<b>Phone Number:</b> " .$phonenumber. "</br> ".
 "<b>Comments:</b> " . $comments . "</br>";
$msg = wordwrap($msg,100);


// Prepare Email
$m->From = $email;
$m->FromName = $name;
$m->addReplyTo($email,$name);
$m->addAddress('hr@1pointsys.com','HR');
$m->Subject='New Contact Request';
$m->Body=$msg;
$m->AltBody='This is Body';
//var_dump($m->send());
if($m->send()){
    echo 'Contact Request successfully sent!';
}
else
{
    //echo $m->ErrorInfo;
    //error_log("You messed up!", 3, "/log/my-errors.log");

    echo 'Error occured while sending contact request. Please try again. If the problem continues please send the contact request to hr@1pointsys.com';
}
?>
