// 每次调用 $.get() $.post $.ajax() 的时候，会先调用 $.ajaxPrefilter这个函数 ，在这个函数中，可以拿到我们给 ajax 提供的配置对象
$.ajaxPrefilter(function(options) {
    // 再发起真正的 Ajax 请求前 统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    console.log(options.url);
    // 统一为有权限的接口 设置 header 请求头  indexOf方法可返回某个指定的字符串值在字符串中首次出现的位置 无则返回 -1
    if (options.url.indexOf('/my/') !== -1) {

        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 给每个ajax 添加 complete 
    options.complete = function(res) {
        if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败!') {
            localStorage.removeItem('token');
            location.href = './login.html';
        }
    }
});