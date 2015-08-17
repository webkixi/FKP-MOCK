/**
 * Created by Administrator on 2015/2/9.
 */
$(function(){


    $(".section1 .main").addClass('playing');
        $("#pageBox").fullpage({
            slidesColor: ['#0075D1', '#C2E5FF', '#FDF6E1', '#E9E9E9', '#F3F3F3', '#F9F3DC'],
            anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6'],
            menu: '#menu',
            'onLeave':function(direction,index){
				$("#theme").find("li").activeFade(direction,index);
            },

            afterLoad:function(anchorLink,index){
                afterdiv(index);
            }


        })


    if(navigator.appName!="Netscape")
    {
        if(window.confirm('您当前的浏览器不能正常浏览当前页面！将为您跳转到普通版？')){
            //alert("确定");
            window.location.href="ordinary.html";
        }else{
            //alert("取消");
            return false;
        }
    }

$(".project").click(function(){
    var project_panel1 = $(".project_panel1");
    var project_panel2 = $(".project_panel2");
    var project_panel3 = $(".project_panel3");
    if($(this).hasClass("project_panel2")){
        project_panel2.removeClass("project_panel2").addClass("project_panel1");
        project_panel3.removeClass("project_panel3").addClass("project_panel2");
        project_panel1.removeClass("project_panel1").addClass("project_panel3");
    }
    if($(this).hasClass("project_panel3")){
        project_panel2.removeClass("project_panel2").addClass("project_panel3");
        project_panel3.removeClass("project_panel3").addClass("project_panel1");
        project_panel1.removeClass("project_panel1").addClass("project_panel2");
    }
})

})

function afterdiv(i){

    if(i==$(".section ").length){
        setTimeout(function(){
            $("#myEmail").animate({
                top:0
            },1000);
        },1500)
    }
}

 $.fn.extend({
	activeFade:function(direction,index){
        var _this = $(this);
        var prev = _this.eq(direction-1);
        var next = _this.eq(index-1);
        prev.fadeOut(500,function(){
            prev.removeClass("active");
        })
        next.fadeIn(500,function(){next.addClass("active")});
        $(".playing").removeClass("playing");
        $(".fp-section").eq(index-1).find(".main").addClass("playing");
	}
 })
