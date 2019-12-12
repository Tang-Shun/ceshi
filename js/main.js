$(function(){
    //登录界面
    //改变选中的输入框前面logo的颜色
    var $login = $('.login');
    var $homepage = $('.homepage'); 
    var $username = $login.find('.loginmain input');
    $username[0].focus();
    $username.on('focus', function(){
        $(this).prev().css('color', 'rgb(73, 214, 219)')
    });
    $username.on('blur', function(){
        $(this).prev().css('color', '#999')
    });
    //判断输入是否为ljx或者ts
    var $portrait = $('.login .loginmain .rad .img1');
    var path = null;
    $username[0].oninput = function(){
        if($(this).val() == '刘加兴'){
            path = './img/2.png';
        }else if($(this).val() == '唐舜'){
            path = "./img/3.png";
        }else{
            path = "./img/1.png";
        }
        $portrait.attr('src', path);
    }
    //判断用户名和密码是否正确
    var $sure = $('.login .loginmain .bt1');
    var $word = $('.login .loginmain .word');
    var $man = $('.login .loginmain .man');
    $sure.on('click', function(){
        var password = $word.val();
        var useMan = $man.val(); 
        if(useMan == ''){
            alert('亲，请输入用户名哟！');
        }
        else if(password == ''){
            alert('亲，请输入密码哟！');
        }
        else if(useMan == '刘加兴' && password == 'ljx8023'){
            $login.hide();
            $homepage.show();
        }
        else if(useMan == '唐舜' && password == 'tsloveljx'){
            window.open('https://baike.baidu.com/item/%E6%83%85%E4%BE%A3/32429?fr=aladdin');
        }
        else{
            alert('亲，用户名或者密码错误哟！');
        }
    });

     //主页
    //获取id的函数封装
    function get(id){ return document.getElementById(id); }

    var $headMain = $('header .head .headMain');
    var $section = $('section');
    $headMain.find('div').on('click', function(){
        // 实现不同面板的转换 
        $headMain.find('div.active').removeClass('active');
        $section.find('.panel.active').removeClass('active');
        $(this).addClass('active');
        var hideChoose = $(this).attr('data-id');
        if(hideChoose == 2){
            startFigure();
        }else{
            stopFigure();
        }
        $('#' + hideChoose).addClass('active');
    });

    /* 背景音乐播放功能 begin */
    var audio = document.querySelector('#audio');
    var $headMusic = $('header .headMusic');
    var $suspend = $headMusic.find('.suspend');
    var $musicAnimation = $headMusic.find('.musicAnimation');
    // 播放和暂停
    //初始化默认打开网页播放背景音乐
    $suspend.on('click',function(){
        if(audio.paused){
            audio.play();
            $suspend.addClass('active');
            $musicAnimation.addClass('active');
        }else{
            audio.pause();
            $suspend.removeClass('active');
            $musicAnimation.removeClass('active');
        }
    });
    $('#audio').on('ended', function() {
        console.log("音频已播放完成");
        audio.play();
    })
    /* 背景音乐播放功能 end */

    /* 音量大小 begin */
    audio.volume = 0.6;//初始音量为60%
    $(document).keydown(function(e){
        var e = e || window.event;
        if(e.keyCode==77)  //按键 ASCII 码值  
        { 
            volumeCheck();
        }
    })
    
    var $horn = $suspend.next();
    var isDraging = false;
    var mousex = 0;
    get('horn_dot').addEventListener('mousedown',function(e){
        var e = e || window.event;
        mousex = e.pageX - get('horn_dot').offsetLeft;
        isDraging = true;
    });//音量
    document.onmousemove = function(e){
        var e = e || window.event;
        var move = 0;
        if(isDraging == true){//音量
            move = e.pageX - mousex;
            if(move<='-6'){
                move='-6';
            }
            var dot_t = document.querySelector('.horn_inner');
            var width_max_t = dot_t.offsetWidth;
            if(move>=width_max_t){
                move=width_max_t;
            }
            var cent_t = move/width_max_t*100;
            cent_t += '%';
            get('horn_progress').style.width = cent_t;
            var cent_Str_t = cent_t.replace("%","");
            cent_Str_t =cent_Str_t/100; 
            if(cent_Str_t < 0){cent_Str_t = 0;}
            audio.volume = cent_Str_t;
        }
    }
    document.onmouseup = function(){
        isDraging = false;
    }
    //实现音量开关功能
    $horn.on('click', volumeCheck);
    function volumeCheck(){
        if(audio.muted == false){
            $horn.addClass('active');
            audio.muted = true;
        }else{
            $horn.removeClass('active');
            audio.muted = false;
        }
    }
    /* 音量大小 end */


    //轮播图
    //初始化变量
    var pauseSpeed = 3000;
    var $showBox = $('.slideshow .showBox');
    var $show = $showBox.find('li');
    var $showChoose = $('.slideshow .showChoose');
    var $choose = $showChoose.find('li');
    var showLength = $show.length;
    var index = 0;//判断到第几张图片

    //每张图片写一段话
    var imgMeaning = ['1', '2', '3', '4' , '5', '6'];

    //图片轮播函数
    function GetRollForward(){//向右
        index++;
        getRoll();
        if(index >= showLength-1){
            index = -1;
        }
    }
    function GetRollBack(){//向左
        index--;
        if(index <= -1){
            index = showLength-1;
        }
        getRoll();
    }
    function GetRollToIt(){//跳跃
        stopFigure();//暂停轮播防止轮播图出现连续转换
        getRoll();
        if(index >= showLength-1){//最后一张到第一张的转换
            index = -1;//因为startFigure函数要++，所以这里为了不多加先--
        }
        startFigure();//转接成功后开始正常轮播
    }
    function getRoll(){//改变轮播图
        for(let i = 0; i<showLength; i++){
            let Name = Name2 = '';
            if(i == index){
                Name = 'now';
                Name2 = 'active';
                //给每张图片配置title文字
                $show[i].title = imgMeaning[index];
            } else if(i == index + 1 || (index == showLength - 1 && i == 0)){
                Name = 'after';
                $show[i].title = '下一张';
            } else if(i == index - 1 || (index == 0 && i == showLength - 1)){
                Name = 'before';
                $show[i].title = '上一张';
            }
            //改变图片
            if($show[i].className != Name){
                $show[i].className = Name;
            }
            //改变小按钮
            if($choose[i].className != Name2){
                $choose[i].className = Name2;
            }
        }
    }

    //图片点击控制前进后退
    $show.on('click', function(){
        var name = $(this).attr('class');
        if(name == 'after'){
            GetRollForward();
        }
        if(name == 'before'){
            GetRollBack();
        }
    });

    //点击下面的小按钮实现切换
    $choose.on('click', function(){
        if(index == -1){
            index = 0;
        }
        $choose[index].classList.remove('active');
        $(this).addClass('active');
        //将string类型的rel转换为number类型并复制给index
        index = parseInt($(this).attr('rel'));
        GetRollToIt();
    });

    //创建计时器函数来滚动轮播图
    var interval;
    function startFigure(){
        interval = setInterval(GetRollForward, pauseSpeed);
    }
    function stopFigure(){
        clearInterval(interval);
    }

    //鼠标移上去暂停，离开继续
    $show.on('mouseenter', stopFigure).on('mouseleave', startFigure);
});