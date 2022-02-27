$(function() {
    // 点击去注册显示注册页面
    $('.link-reg').on('click', function() {
        $('.login').hide();
        $('.reg').show()
    })

    // 点击去登录显示登录页面
    $('.link-login').on('click', function() {
        $('.login').show();
        $('.reg').hide()
    })

    //自定义密码效验规则
    layui.form.verify({
        // 校验密码
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 确认密码的校验  形参 value 指的是用户输入的确认密码的值
        repwd: function(value) {
            if ($('.pwd').val() != value) {
                return '两次密码不一致'
            }
        }
    })


    // 监听注册事件
    $('#zhuce').on('submit', function(e) {
        e.preventDefault();
        console.log('cesi');
        $.post('/api/reg', { username: $('.uname').val(), password: $('.pwd').val() }, function(reg) {
            if (reg.status !== 0) {
                return layui.layer.msg(reg.message);
            }
            layui.layer.msg('注册成功');
            // 模拟人的点击行为  直接跳转至登录界面
            $('.link-login').click();
        });
    });


    //监听登录事件
    $('#denglu').on('submit', function(e) {
        e.preventDefault();
        $.post('/api/login',
            $(this).serialize(),
            function(res) {
                if (res.status !== 0) {
                    console.log(res.message);
                    return layui.layer.msg('登录失败');
                }
                layui.layer.msg('登录成功');
                // console.log(res.token);
                // 将登录成功得到的 token 字符串 保存到 localStorage 中
                localStorage.setItem('token', res.token);
                //登录成功后，跳转至后台主页
                location.href = './index.html';
            });
    })
})