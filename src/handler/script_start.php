<?php
 
$data['Name'] = $_POST['userName'];
$data['Mail'] = $_POST['userEmail'];
$data['Phone number'] = $_POST['userNumber'];
$data['Country'] = $_POST['userCountry'];
$data['Question-1'] = $_POST['quizFirst'];
 
echo json_encode($data);
exit;
?>