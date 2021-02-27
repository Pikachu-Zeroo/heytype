<?php
    // 去数据库中比配数据，是否有传递的用户名和密码
    $con = mysqli_connect('localhost','root','123456','user');

    //登录
    $user = $_POST['user']; 
    $pass = $_POST['password'];



    // 整体SQL语句用双引号引起来，字段 和 表明用反引号引起来，字符串和变量用单引号，数字直接写
    $sql = "SELECT *  FROM `user` WHERE `user` = '$user' AND `password` = '$pass'";
    
    $res = mysqli_query($con,$sql);

    if (!$res) {
    die('error for mysql: ' . mysqli_error());
  }

  $row = mysqli_fetch_assoc($res);

  if (!$row) {
    // 没有匹配的数据 登录失败
    echo json_encode(array(
      "code" => 0,
      "message" => "登录失败"
    ));
  } else {
    // 有匹配的数据 登录成功
    echo json_encode(array(
      "code" => 1,
      "message" => "登录成功"
    ));
  }
?>