/**
 * Created by 7 on 2016/4/17.
 */
$(function(){
    //作品展示
    var oShowBox=$('#showBox');
    var oShowList=$('#showList');
    var oPrev=$('#showBox .prev');
    var oNext=$('#showBox .next');
    var aList=$('#showBox li');
    var bReady=false;
    var timer=null;

    var aClass=[];
    for(var i=0;i<aList.length;i++){
        aClass[i]=aList[i].className;
    }
    oPrev.click(function(){
        if(bReady)return;
        bReady=true;
        aClass.push(aClass.shift());
        tab();
    });
    oNext.click(function(){
        if(bReady)return;
        bReady=true;
        aClass.unshift(aClass.pop());
        tab();
    });

    function tab(){
        for(var i=0;i<aList.length;i++){
            aList[i].className=aClass[i];
        }
        aList.on('transitionend',function(){
            bReady=false;
        });
    }

    clearInterval(timer);
    timer=setInterval(function(){
        aClass.unshift(aClass.pop());
        tab();
    },2000);

    oShowBox.mouseover(function(){
        clearInterval(timer);
    });
    oShowBox.mouseout(function(){
        timer=setInterval(function(){
            aClass.unshift(aClass.pop());
            tab();
        },2000);
    });

    //点击发送
    var oSend=$('#send');
    oSend.click(function(){
        alert('发送成功！我会及时回复您的^_^');
    });
});
