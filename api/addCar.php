<?php
    $goods_id = $_POST['goods_id'];
    $user = $_POST['user'];
    $goods_num = $_POST['goods_num'];

    $con = mysqli_connect('localhost','root','123456','user');



    $sql = "SELECT *  FROM `car` WHERE `user` = '$user' AND `goods_id` = '$goods_id' AND `goods_num` = '$goods_num'";

    $res = mysqli_query($con,$sql);

    if(!$res){
        die('数据库链接错误' . mysqli_error($con));
    }
    $row = mysqli_fetch_assoc($res);

    if(!$row){
        // 说明不存在 这个用户名对应的这个条goods_id
        // 把这条数据添加到购物车表
        $addSql = "INSERT INTO `car` VALUES (null, '$user', '$goods_id', '$goods_num')";

        $addRes = mysqli_query($con,$addSql);
        if(!$addRes){
            die('数据库链接错误' . mysqli_error($con));
        }
        print_r(json_encode(array('code'=>$addRes,"msg"=>"添加成功"),JSON_UNESCAPED_UNICODE));
    }else{

        $goods_num = ++$row['goods_num'];
        $updat = "UPDATE `car` SET `goods_num` = '$goods_num' WHERE `user` = '$user' AND `goods_id` = '$goods_id'";

        $updataRes = mysqli_query($con,$updat);

         if(!$updataRes){
            die('数据库链接错误' . mysqli_error($con));
        }
        print_r(json_encode(array('code'=>$updataRes,"msg"=>"添加成功"),JSON_UNESCAPED_UNICODE));
        
        
    }
?>