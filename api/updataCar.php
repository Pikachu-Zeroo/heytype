<?php
$id = $_GET['goods_id'];
    $num = $_GET['goods_num'];
    $user = $_GET['user'];

    $con = mysqli_connect('localhost','root','123456','user');

    $sql = "UPDATE `car` SET `goods_num` = '$num' WHERE `user`= '$user' AND `goods_id` = '$id'";

    $res = mysqli_query($con,$sql);

    if(!$res){
        die('数据库链接失败'  . mysqli_error($con));
    }

    print_r(json_encode(array('code'=>$res,'msg'=>'修改成功'),JSON_UNESCAPED_UNICODE));

?>