let user = document.querySelector("#user");
let password = document.querySelector("#password");
let form = document.querySelector(".form");
console.log(form);

form.onsubmit = function () {
    let e = window.event;
    e.preventDefault();
    pAjax({
        type: 'post',
        url: '../api/login.php',
        data: {
            user: user.value,
            password: password.value
        }
    }).then(res => {
        res = JSON.parse(res);
        if (res.code == 1) {
            // 登录成功存储 登录的状态
            setCookie('login', user.value);
            // 跳转页面 如果从购物车过来的时候登录成功去购物车页面
            // 否则就去到首页
            let url = localStorage.getItem('url');
            if (url) {
                location.href = url;
                // 登录成功的时候把url的这个localstorage值清除
                localStorage.removeItem('url');
            } else {
                location.href = '../html/heytype.html';
            }
        }
    })
}