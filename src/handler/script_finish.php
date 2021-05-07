<?php
 
$data['Name'] = $_POST['userName'];
$data['Mail'] = $_POST['userEmail'];
$data['Phone number'] = $_POST['userNumber'];
$data['Country'] = $_POST['userCountry'];
$data['Question-1'] = $_POST['quizFirst'];
$data['Question-2'] = $_POST['quizSecond'];
$data['Question-3'] = $_POST['quizThird'];
$data['Question-4'] = $_POST['quizFourth'];
 
echo json_encode($data);
exit;
?>