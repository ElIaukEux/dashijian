$(function() {

    initArtList();
    // 初始化文章的列表
    function initArtList() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function(res) {
                // console.log(res);
                // let data = res.data;
                let str = template('table', res);
                $('tbody').html(str);
            }
        });
    }

    // open的索引
    let indexAdd = null;
    // 添加按钮的功能
    $('#catebtn').on('click', function() {
        indexAdd = layui.layer.open({
            type: 1, //不显示默认的 确认按钮键
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#tan_add').html()
        });
    });

    // 监听 弹出框的提交事件  form_add本身不在页面 需要使用代理

    $('body').on('submit', '#form_add', function(e) {
        e.preventDefault();
        // console.log('ok');
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $('#form_add').serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    layui.layer.msg('添加文章分类失败！');
                }
                initArtList();
                layui.layer.msg('添加文章分类成功！');
                layui.layer.close(indexAdd);
            }
        });
    });

    let xiugaiIndex = null;
    //编辑框的功能
    $('#xiugai').on('click', '#xiugaijian', function() {
        xiugaiIndex = layui.layer.open({
            type: 1, //不显示默认的 确认按钮键
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#xiugai_form').html()
        });
        // 获取该弹出层的 Id
        let id = $(this).attr('data-Id');
        // console.log(id);

        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + id,
            success: function(res) {
                // console.log(res);
                // 快速添加元素
                layui.form.val('form_edit', res.data);
            }
        });
    });


    // 提交 修改后的信息
    $('body').on('submit', '#form_edit', function(e) {
        e.preventDefault();
        $.ajax({
            method: "post",
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    layui.layer.msg('更新分类失败！');
                }
                layui.layer.close(xiugaiIndex);
                layui.layer.msg('更新分类成功！');
                initArtList();

            }
        });
    });


    // 删除按钮功能
    $('body').on('click', '#delBtn', function() {
        let delId = $(this).attr('data-Id');
        layui.layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + delId,
                success: function(res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        layui.layer.msg('删除失败,' + res.message);
                    } else {
                        layui.layer.msg('删除成功！');
                        initArtList();
                    }
                }
            });

            layer.close(index);
        });
    })
});