<?php
    //注册
    //获取数据
    $user = $_POST['user']; 
    $pass = $_POST['password'];

    //连接数据库
    $con = mysqli_connect('localhost','root','123456','user');

    $sql = "SELECT * FROM `user` WHERE `user` = '$user'";
   
   

    $res = mysqli_query($con,$sql);

    if(!$res){

        die('数据库链接失败' . mysqli_error($con));
    }

    $row = mysqli_fetch_assoc($res);

    //如果row有数据时，表明用户名存在
    if($row){
        print_r('用户名已存在,请 <a href="../html/login.html">登录</a>');
    }else{
        $sql = "INSERT INTO `user` (`user`,`password`) VALUES('$user','$pass')";
        $res1 = mysqli_query($con,$sql);
        
        header('location:../html/login.html');
    }
    
?>