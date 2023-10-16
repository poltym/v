<?php
$curl = curl_init();
curl_setopt_array($curl, [
  CURLOPT_URL => "https://api.baubuddy.de/index.php/login",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => json_encode(["username" => "365", "password" => "1"]),
  CURLOPT_HTTPHEADER => [
    "Authorization: Basic QVBJX0V4cGxvcmVyOjEyMzQ1NmlzQUxhbWVQYXNz",
    "Content-Type: application/json"
  ],
]);

$apiResponse = curl_exec($curl);

$data = json_decode($apiResponse, true); 

if (isset($data['oauth']['access_token'])) {
    
    $accessToken = $data['oauth']['access_token'];
    
    $userInfo = $data['userInfo'];
    $permissions = $data['permissions'];

    
} else {
    
    echo "Autorisation Error";
}



$apiUrl = 'https://api.baubuddy.de/dev/index.php/v1/tasks/select';

$curlSel = curl_init();
curl_setopt_array($curlSel, [
    CURLOPT_URL => $apiUrl,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer $accessToken", 
        "Content-Type: application/json"
    ],
]);

$response = curl_exec($curlSel);
$err = curl_error($curlSel);
curl_close($curlSel);

if ($err) {
    
    echo "Error connecting to API" . $err;
    
} else {
    
    echo $response;
}
?>
