$(function() {

    // 初始化富文本编辑器
    initEditor();

    initCate();
    //定义加载文章分类的方法
    function initCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    layui.layer.msg('初始化文章列表失败！');
                }
                // 调用模板引擎渲染 下拉菜单
                let htmlstr = template('cate_list', res);
                $('#cate_sel').html(htmlstr);

                layui.form.render(); //重新渲染表单
            }
        });
    }


    // 裁剪图片 js
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 1.3 创建裁剪区域
    $image.cropper(options)



    // 选择图片按钮
    $('#chose_btn').on('click', function() {
        $('#file').click();
    });

    // 检测用户是否上传文件
    $('#file').on('change', function(e) {
        // console.log(e);
        if (e.target.files <= 0) {
            return layui.layer.msg('请选择文件');
        }


        var file = e.target.files[0] //拿到文件
        var newImgURL = URL.createObjectURL(file) //根据选择的文件，创建一个对应的 URL 地址：
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    });
    // 定义文章的发布状态
    let art_statu = '已发布';
    $('#art_sta2').on('click', function() {
        art_statu = '草稿'
        console.log(art_statu);
    });

    let fd = null;
    // 为表单添加 提交事件 快速创建 formdate 格式的数据
    $('#form_pub').on('submit', function(e) {
        e.preventDefault();
        // console.log('ok');
        fd = new FormData($(this)[0]);
        // 给fd中添加文章提交状态
        fd.append('state', art_statu);
        // fd.forEach(function(v, k) {
        //     console.log(k, v);
        // });

        // 将裁剪后的图片，输出为文件
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作

                // 将裁剪的文件存入 fd
                fd.append('cover_img', blob);

                // 调用发表文章函数
                artPublish(fd);
            })
    });

    function artPublish(fd) {
        $.ajax({
            method: 'post',
            url: '/my/article/add',
            data: fd,
            //注意：如果向服务器提交的是FormData格式的数据，必须添加以下两个配置项
            contentType: false,
            processData: false,
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('发布文章失败！');
                }
                layui.layer.msg('发布文章成功！');
                location.href = '../article/art_list.html';
            }
        });
    }
})