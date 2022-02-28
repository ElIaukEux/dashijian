$(function() {
    // 自定义校验规则
    layui.form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samepwd: function(value) {
            if ($('#oldpwd').val() == value) {
                return '新旧密码不能一致'
            }
        },
        repwd: function(value) {
            if (value !== $('#newPwd').val()) {
                return "两次密码不一致"
            }
        }
    })


    // 修改密码函数
    $('.layui-form').on('submit', function(e) {
        // console.log('hhh');
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败！');
                }
                layui.layer.msg('更新密码成功！');
                // 清空表单
                $('.layui-form')[0].reset();
            }
        });
    });
})