<?php
    $user = $_GET['user'];
    $id = $_GET['goods_id'];

    $con = mysqli_connect('localhost','root','123456','user');

    $sql = "DELETE FROM `car` WHERE `user` = '$user' AND `goods_id`='$id'";


    $res = mysqli_query($con,$sql);


    if(!$res){
        die('数据库链接错误' . mysqli_error($con));
    }

    print_r(json_encode(array('code'=>$res,'msg'=>'删除成功'),JSON_UNESCAPED_UNICODE));
?>