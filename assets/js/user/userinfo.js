$(function() {
    // 表单验证
    layui.form.verify({
        nicheng: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    });
    // 获取用户的基本信息
    function initUserIfm() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取信息失败');
                }
                // console.log(res);
                layui.form.val('userForm', res.data);
            },
        });
    }

    // 调用获取用户信息的函数
    initUserIfm();

    // 重置表单
    $('#btnReset').on('click', function(e) {
        //阻止 按钮默认重置行为
        e.preventDefault();
        initUserIfm();
    });

    // 提交表单信息
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('提交失败！');
                }
                // initUserIfm();
                layui.layer.msg('更新成功！');

                // 调用 index页面的换头像方法
                window.parent.getUserIfm();
            }
        });
    });
});