let reg = /id=(\d+)/;
if (!reg.test(location.search)) {
    location.href = '../html/heytype.html'
}
let id = reg.exec(location.search)[1];
let detailBox = document.querySelector('.detailBox');
// 根据id获取数据
pAjax({
    url: '../api/getdetail.php',
    data: {
        id
    }
}).then(res => {
    res = JSON.parse(res);
    renderHtml(res.detail);
    
})

function getData(){
    ajax({
        url:'../api/getdata.php',
        callback:function(res){
            res = JSON.parse(res);
            render(res);
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

function renderHtml(data) {
    detailBox.innerHTML = `
    <div class="list">
    <div class="swiperbox"> 
        <div class="swiper-container gallery-top">
            <div class="swiper-wrapper" >
                <div class="swiper-slide""><img src="${data.goods_small_logo1}" alt="" ></div>
                <div class="swiper-slide" ><img src="${data.goods_small_logo2}" alt="" ></div>
                <div class="swiper-slide" ><img src="${data.goods_small_logo3}" alt=""></div>
                <div class="swiper-slide" ><img src="${data.goods_small_logo4}" alt=""></div>
                <div class="swiper-slide" ><img src="${data.goods_small_logo5}" alt=""></div>
                <div class="swiper-slide" ><img src="${data.goods_small_logo6}" alt=""></div>
            </div>  
        </div>

        <div class="swiper-container gallery-thumbs">
            <div class="swiper-wrapper">
                    <div class="swiper-slide""><img src="${data.goods_small_logo1}" alt=""></div>
                    <div class="swiper-slide" ><img src="${data.goods_small_logo2}" alt=""></div>
                    <div class="swiper-slide" ><img src="${data.goods_small_logo3}" alt=""></div>
                    <div class="swiper-slide" ><img src="${data.goods_small_logo4}" alt=""></div>
                    <div class="swiper-slide" ><img src="${data.goods_small_logo5}" alt=""></div>
                    <div class="swiper-slide" ><img src="${data.goods_small_logo6}" alt=""></div>
            </div>
        </div>
    </div> 

    

            <div class="detail">
                <h4>${data.goods_name}</h4>
                ${data.goods_text}
                <p class="price">￥${data.goods_price}</p>
                <section class="product-support">
                        商品支持：
                        <a class="oc-icon oc-iconfont-ohuabeipay" style="cursor: default;">花呗分期3/6/12期</a>  <a title="以旧换新" target="_blank" data-tj="store|products|recycle|link" href="https://yihuan.oppo.com/static/index.html#/?channelId=100003&amp;utm_source=opposhop&amp;utm_medium=products">以旧换新</a>              
                </section>
                <section class="select">
                    <p>选择数量</p>
                    <div class="selectbox"><button class="reduce">-</button> <input type="num" value="1" class="num">  <button class="add">+</button></div>
                </section>

                <section class="buying-btn">
                        <button id="addCar">加入购物车</button>
                        <button id="goCar">查看购物车</button>
                </section>
            </div>


    </div>

    <section>${data.goods_produce}</section>

`
let swiper2 = new Swiper('.gallery-thumbs', {
    slidesPerView: 6,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
});

let swiper1 = new Swiper('.gallery-top', {
    loop: true,
    loopedSlides: 6,
    thumbs: {
        swiper: swiper2
    },
   
});

var num = document.querySelector('.num');

detailBox.onclick = function () {

    let e = window.event;

    if(e.target.className == 'reduce'){
        num.value--;
        if(num.value <= 1 ){
            num.value = 1
        }
    }
    if(e.target.className == 'add'){
        num.value++;
    }
    


    if (e.target.id == 'goCar') {
        location.href = '../html/car.html'
    }

    if (e.target.id == 'addCar') {
        


        let login = getCookie('login');
        if (!login) {
            alert('没有登录请到登录页面进行登录');
            localStorage.setItem('url', location.href);
            location.href = '../html/login.html';
            return
        }

        // 发添加购物车的ajax请求
        pAjax({
            url: '../api/addCar.php',
            type: 'post',
            data: {
                'goods_id': id,
                'user': login,
                'goods_num':num.value
            }
        }).then(function (res) {
            console.log(res);
            alert('添加购物车成功');
        })
    }
}

}

let fun = document.querySelectorAll('.fun');
let oppoBox = document.querySelector('.oppoBox');
let ulBox = document.querySelector('.ulBox');
oppoBox.onmouseover = function(){
    oppoBox.style.display = 'block';  
    
    oppoBox.onmouseout = function(){
        oppoBox.style.display = 'none'; 
    }

}



