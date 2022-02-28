// $(function() {
//获取用户基本信息函数


function getUserIfm() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token1') || ''
        // },
        success: function(res) {
            // console.log(res);
            if (res.status !== 0) {
                layui.layer.msg('获取信息失败');
                location.href = './login.html'
            }
            //调用渲染头像函数
            setTouxiang(res);
        },
        // 无论 Ajax 是否请求成功都会调用 complete
        // complete: function(res) {
        //     console.log(res);

        // }
    });
}

// 渲染用户头像和用户名
function setTouxiang(res) {
    //获取用户名
    let uname = res.data.nickname || res.data.username;
    //设置用户名
    $('#welcome').html('欢迎&nbsp;&nbsp;' + uname);
    //设置头像
    if (res.user_pic !== null) {
        // console.log(res.data.user_pic);
        $('.layui-nav-img').attr('src', res.data.user_pic).show();
        // console.log($('.layui-nav-img')[0].src);
        $('.text-tx').hide();
    } else {
        $('.layui-nav-img').hide();
        $('.text-tx').html(uname.substring(0, 1).toUpperCase()).show();

    }
}
// console.log('cs');
$(function() {

    //点击退出按钮 弹出提示框
    $('#exitBtn').on('click', function() {
        console.log('ok');
        // console.log('ok');
        layui.layer.confirm('确定退出登录吗', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 清空 localStorage 里的信息
            localStorage.removeItem('token');
            // 跳转至登录界面
            location.href = './login.html';
            layer.close(index);
        });
    });
})

// 调用获取用户信息的函数
getUserIfm();
// });