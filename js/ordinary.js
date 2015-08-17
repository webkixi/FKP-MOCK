/**
 * Created by Administrator on 2015/2/9.
 */
$(function(){

    $(".section1 .main").addClass('playing');
    $("#pageBox").fullpage({
        slidesColor: ['#0075D1', '#C2E5FF', '#FDF6E1', '#E9E9E9', '#F3F3F3', '#F9F3DC'],
        anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6'],
        menu: '#menu',
        'onLeave':function(direction,index){//滚动前
            onLeave(direction,index);
        },

        afterLoad:function(anchorLink,index){//滚动后
            afterdiv(index);
        }


    })

    //计算作品墙的相框位置
    var cards = $(".section3 .cards").children("li"),
        itemSize={
            width:165,
            height:115,
            marginTop:15,
            marginLeft:15
        }
    for(var i= 0,c=cards.length;i<c;i++){
        var l = i%5;
        var t = parseInt(i/5);
        cards.eq(i).attr({
            x:l*itemSize.width+itemSize.marginLeft,
            y:t*itemSize.height+itemSize.marginTop
        }).css({
            "top":t+600,
            "left":l*itemSize.width+itemSize.marginLeft
        });
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

});

function afterdiv(index){

    if(index==$(".section ").length){
        setTimeout(function(){
            $("#myEmail").animate({
                top:0
            },1000);
        },1500)
        $(".section4").find(".rocket").animate({top:"50%"},500,"swing");
        setTimeout(function(){
            $(".section4").find(".item ").fadeIn(1000);
        },500)
    }

    if(index==2){
        $(".section2 .skills_ul").children("li").each(function(i){
            var _this = $(this).show().animate({top:0},(300+100*(i/2)))
        })
    }

    if(index == 3){
        var cards = $(".section3 .cards").children("li");
        for(var a = 0;a<cards.length;a++){
            var itme = 300+100*a;
            cards.eq(a).animate({
                top:cards.eq(a).attr("y")
            },itme)
        }
    }
}

function  onLeave(direction,index){
    $("#theme").find("li").activeFade(direction,index);

    if(direction ==$(".section ").length){
        var rocket =  $(".section4").find(".rocket");
        rocket.animate({top:"-10%"},500,function(){
            rocket.css("top","120%")
        });
        $(".section4").find(".item ").fadeOut();
    }

    if(direction == 3){
        var cards = $(".section3 .cards").children("li");
        for(var a = 0;a<cards.length;a++){
            var itme = 300+100*a;
            cards.eq(a).animate({
                top:Math.ceil(cards.eq(a).attr("y"))+600
            },itme)
        }
    }

    if(direction==2){
        $(".section2 .skills_ul").children("li").each(function(i){
            var _this = $(this).hide().animate({top:120},(300+100*(i/2)))
        })
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
