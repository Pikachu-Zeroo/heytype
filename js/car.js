let login = getCookie('login');
if (!login) {
    localStorage.setItem('url', location.href);
    location.href = '../html/login.html';
}
class Car{
    constructor(ele, user) {
        this.ele = document.querySelector(ele);
        this.user = user;
        this.info = {
            number: 0,
            totalPrice: 0
        };
        this.init();
    }

    init(){
        this.shp = document.querySelector('.shopList');
        this.total = document.querySelector('.tol-price');
        this.number = document.querySelector('.shop-num');
        this.getData();

        this.ele.onclick = (e) => {
            let target = e.target;
            this.id = target.getAttribute('idx');
            if (target.classList.contains('checked')) {
                
                this.data.forEach(item => {
                    if (item.goods_id == this.id) {
                        item.is_select = target.checked;
                    }
                })
                this.calculation();
            }

            if(target.classList.contains('reduce')){
                this.reduce();
            }

            if (target.classList.contains('add')) {
                this.add();
            }

            if (target.classList.contains('del')) {
                this.remove(this.id);
               
                
            }

            if (target.classList.contains('settle')) {
                // 结算，把勾选的数据删除
                // 数据中is_select = true 这些数据被删除
                // 过滤is_select = true的这些数据，然后循环的去发送ajax请求

                let deleteData = this.data.filter(item => {
                    return item.is_select == true;
                })

                deleteData.forEach(item => {
                    this.remove(item.goods_id)
                })
            }

            




        }
    }

    async getData() {
        let data = await pAjax({
            url: '../api/getCardata.php',
            data: {
                user: this.user
            }
        });
        this.data = JSON.parse(data);
        // 因为获取的数据 默认 is_select = '0'
        // 先处理数据的is_select 的值变为 false
        this.data.forEach(item => {
            item.is_select = false;
        })
        this.render()
    }

    render(){
        this.calculation();
        let str = '';
        this.data.forEach(item=> {
            
            str += `
            <ul class="shp-row">
                <li class="select">
                            <input type="checkbox" ${item.is_select ? "checked" :''} class="checked" idx="${item.goods_id}">    
                        </li>
                        <li class="image">
                            <a href="../html/detail.html?id=${item.goods_id}" title="${item.goods_name}">
                                <img src="${item.goods_big_logo}" alt="">
                            </a></li>
                        <li class="title">
                            <a href="../html/detail.html?id=${item.goods_id}">${item.goods_name}</a>
                        </li>
                        <li class="price">
                            <span>￥${item.goods_price}</span>
                        </li>
                        <li class="increase">
                                <div class="selectbox">
                                    <button class="reduce" idx="${item.goods_id}">-</button>
                                    <input type="num" value="${item.goods_num}" class="num">
                                    <button class="add"    idx="${item.goods_id}">+</button>
                                </div>
                        </li>
                        <li class="delete">
                            <span  idx="${item.goods_id}" class="del"> &times;</span>
                </li>
            </ul>
            `
        });
        this.shp.innerHTML = str;
    }

    calculation(){

        // 过滤出所选的商品
        this.selectData = this.data.filter(item => {
            return item.is_select == true;
        });

        // 计算所选商品的数量 和价格
        this.info.number = this.selectData.reduce((pre, cur) => {
            return pre + cur.goods_num * 1;
        }, 0);

        this.info.totalPrice = this.selectData.reduce((pre, cur) => {
            return pre + cur.goods_num * parseFloat(cur.goods_price)
        }, 0)

        this.number.innerHTML = this.info.number;
        this.total.innerHTML = '￥' + this.info.totalPrice;
    }

    reduce(){
        let num = this.data.find(item => {
            return item.goods_id == this.id;
        }).goods_num

        if (num <= 1) {
            alert('商品数量最小为1')
            return
        }
        //先修改数据库中数据，当数据库中的数据修改成功之后在修改 this.data中数据 
        pAjax({
            url: '../api/updataCar.php',
            data: {
                'goods_id': this.id,
                'goods_num': --num,
                'user': this.user
            }
        }).then(res => {
            res = JSON.parse(res);
            
            if (res.code) {
                this.data.forEach(item => {
                    if (item.goods_id == this.id) {
                        item.goods_num = num;
                        this.render();
                    }
                })
            }
        })
    }

    add(){
        let num = this.data.find(item => {
            return item.goods_id == this.id;
        }).goods_num;
        pAjax({
            url: '../api/updataCar.php',
            data: {
                'goods_id': this.id,
                'goods_num': ++num,
                'user': this.user
            }
        }).then(res => {
            res = JSON.parse(res);
            if (res.code) {
                this.data.forEach(item => {
                    if (item.goods_id == this.id) {
                        item.goods_num = num;
                        this.render();
                    }
                })
            }
        })
    }

    remove(id) {
        // 发送ajax请求 需要传递 用户和goods_id过去
        pAjax({
            url: '../api/deleteCar.php',
            data: {
                'user': this.user,
                'goods_id': id
            }
        }).then(res => {
            res = JSON.parse(res);
            if (res.code) {
                // 把this.data中的这条数据删除 然后在渲染 this.render();
                this.data = this.data.filter(item => {
                    return item.goods_id != id;
                })
                this.render();
            }
        })
    }
}
new Car('.Car', login);