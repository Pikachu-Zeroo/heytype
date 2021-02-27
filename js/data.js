function getData(){
    ajax({
        url:'../api/getdata.php',
        callback:function(res){
            res = JSON.parse(res);
            render(res);
            Render(res);
            Render1(res);
            Render2(res);
            Render3(res);
        }
    });
    
    
   
}
getData();

function render(data){
    
    
    fun.forEach(item => {
        item.onmouseover = function(){
            oppoBox.style.display = 'block';  
            let name = this.className;
            let str = '';
            var res = [];
            var res =  data.filter(function(item,index,arr){
                return data[index].goods_type == name;
            });
                res.forEach((item,index)=> {
                str += `
                
                        <li class="liBox"><a href="../html/detail.html?id=${item.goods_id}">
                            <div class="img"><img src="${item.goods_big_logo}" alt=""></div> 
                            <p class="p">${item.goods_name}</p>
                        </a></li>
                `
                });
            ulBox.innerHTML = str;
        }
    })


}    

function Render(data){
    let str1 = '';
    let str2 = `<li class="big"><a href="../html/detail.html?id=1">
                    <div class="font">
                        <p>Reno5 Pro+ 星河入梦</p>
                        <p>￥3999</p>
                    </div>
                    </a></li>`
    var res = [];
    var res =  data.filter(function(item,index,arr){
        return data[index].goods_type == 'oppo fun';
    });            
    res.forEach((item,index)=> {
        str1 += `
        <li class="small"><a href="../html/detail.html?id=${item.goods_id}">
            <img src="${item.goods_big_logo}" alt="">
            <div class="font">
                    <p>${item.goods_name}</p>
                    <p>￥${item.goods_price}</p>
            </div>
        </a></li>
        `
    });
    OPPObox.innerHTML = str2 + str1;
}

function Render1(data){
    let str1 = '';
    var res = [];
    var res =  data.filter(function(item,index,arr){
        return data[index].goods_type == 'oneplus fun';
    });            
    res.forEach((item,index)=> {
        str1 += `
        <li class="small"><a href="../html/detail.html?id=${item.goods_id}">
            <img src="${item.goods_big_logo}" alt="">
            <div class="font">
                    <p>${item.goods_name}</p>
                    <p>￥${item.goods_price}</p>
            </div>
        </a></li>
        `
    });
    OnePlusbox.innerHTML =  str1;
}

function Render2(data){
    let str1 = '';
    let str2 = `<li class="big"><a href="../html/detail.html?id=3">
                    <div class="font">
                        <p>真我V15 锦鲤色</p>
                        <p>￥1399</p>
                    </div>
                </a></li>`
    var res = [];
    var res =  data.filter(function(item,index,arr){
        return data[index].goods_type == 'realme fun';
    });            
    res.forEach((item,index)=> {
        str1 += `
        <li class="small"><a href="../html/detail.html?id=${item.goods_id}">
            <img src="${item.goods_big_logo}" alt="">
            <div class="font">
                    <p>${item.goods_name}</p>
                    <p>￥${item.goods_price}</p>
            </div>
        </a></li>
        `
    });
    Realmebox.innerHTML = str2 + str1;
}

function Render3(data){
    shard.forEach(item =>{
    

    item.onmouseover = function(){
        for(i = 0;i < shard.length;i++){
            shard[i].firstChild.classList.remove('active');
        }
        let name = this.className;
        let str = '';
        var res = [];
        var res =  data.filter(function(item,index,arr){
            return data[index].goods_type1 == name;
        });
            res.forEach((item,index)=> {
            str += `
            
            <li class="small"><a href="../html/detail.html?id=${item.goods_id}">
            <img src="${item.goods_big_logo}" alt="">
            <div class="font">
                    <p>${item.goods_name}</p>
                    <p>￥${item.goods_price}</p>
            </div>
        </a></li>
            `
            });
        hardbox.innerHTML = str;
        this.firstChild.classList.add('active');

    }


})


}





let fun = document.querySelectorAll('.fun');
let oneplus = document.querySelector('.oneplus');
let oppoBox = document.querySelector('.oppoBox');
let ulBox = document.querySelector('.ulBox');
let OPPObox = document.querySelector('.OPPObox');
let OnePlusbox = document.querySelector('.OnePlusbox');
let Realmebox = document.querySelector('.Realmebox');
let shard = document.querySelectorAll('.hardnav li');
let hardbox = document.querySelector('.hardbox');












oppoBox.onmouseover = function(){
    oppoBox.style.display = 'block';  
    
    oppoBox.onmouseout = function(){
        oppoBox.style.display = 'none'; 
    }

}



