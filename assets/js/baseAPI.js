// 每次调用 $.get() $.post $.ajax() 的时候，会先调用 $.ajaxPrefilter这个函数 ，在这个函数中，可以拿到我们给 ajax 提供的配置对象
$.ajaxPrefilter(function(options) {
    // 再发起真正的 Ajax 请求前 统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    console.log(options.url);
});