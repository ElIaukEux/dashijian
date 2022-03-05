$(function() {
    // 请求数据时的参数
    let q = {
        pagenum: 1, //页码值
        pagesize: 3, //每页显示多少条数据
        cate_id: '', //文章分类的 Id
        state: '' //文章的状态
    }

    // 定义时间补零的方法
    function buling(date) {
        if (date < 10) {
            return '0' + date
        } else {
            return date;
        }
    }
    // 定义时间过滤器
    template.defaults.imports.dataformat = function(data) {
        const dt = new Date(data);
        let y = dt.getFullYear();
        let m = dt.getMonth() + 1;
        let d = dt.getDate();

        let hh = dt.getHours();
        let mm = dt.getMinutes();
        let ss = dt.getSeconds();

        return `${y}-${buling(m)}-${buling(d)} ${buling(hh)}:${buling(mm)}:${buling(ss)}`
    }
    initTable();

    // 获取文章列表数据
    function initTable() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                // console.log(res)
                if (res.status !== 0) {
                    layui.layer.msg('获取文章列表失败！');
                }

                // 使用模板引擎渲染页面
                let htmlstr = template('model_list', res);
                $('tbody').html(htmlstr);

                // 调用渲染分页的方法
                renderPage(res.total);
            }
        });
    }
    initcate()
        // 获取列表分类
    function initcate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    layui.layer.msg('获取文章分类列表失败！');
                }
                let catestr = template('model_cate', res);
                $('#cateList').html(catestr);

                // 动态添加后需要调用layui.form.render重新渲染页面
                layui.form.render();
            }
        });
    }

    // 筛选功能
    $('#formCateList').on('submit', function(e) {
        e.preventDefault();
        // console.log(e);
        let cate_id = $('#cateList').val();
        let state = $('[name="state"]').val();
        q.state = state;
        q.cate_id = cate_id;
        initTable();
    });

    //定义渲染分页的方法
    function renderPage(total) {
        // 渲染分页结构
        layui.laypage.render({
            elem: 'pageBox', //分页容器id
            count: total, //总数据
            limit: q.pagesize, //显示几页数据
            curr: q.pagenum, //默认被选中的分页
            //自定义排版 参数的顺序会影响页面的显示顺序
            layout: ['count', 'limit', 'prev', 'page', 'next'],
            limits: [1, 2, 3, 5],
            //获取用户点击的页数
            //触发jump回调的方式有两种：
            //1.点击页码的时候，会触发jump回调
            //2.只要调用了laypage.render（）方法，就会触发jump回调
            jump: function(obj, first) {
                // 可以通过first的值，来判断是通过哪种方式，触发的jump回调
                //如果first的值为true，证明是方式2触发的
                //否则就是方式1触发的
                // console.log(obj.curr);
                //最新的条目数赋值
                q.pagesize = obj.limit;
                q.pagenum = obj.curr;
                // 页面加载时不执行
                if (!first) {
                    initTable();
                }
            }
        });
    }

    // 删除按钮的功能
    $('tbody').on('click', '.delBtn', function() {
        // 获取点击的当前中有多少个删除按钮
        var len = $(".delBtn").length;
        console.log(len);
        //获取文章的id
        let delid = $(this).attr('data-id');
        // console.log(delid);
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'get',
                url: '/my/article/delete/' + delid,
                success: function(res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layui.layer.msg('删除失败！');
                    }
                    layui.layer.msg('删除成功！');

                    //当数据删除完成后，需要判断当前这一页中，是否还有剩余的数据,如果没有剩余的数据了，则让页码值-1之后，
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
                    }

                    initTable();
                }
            });

            layer.close(index);
        });
    });
})