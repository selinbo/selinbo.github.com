/**
 *  @ Author: 智能社-strive
 *  @ Date: 2016/4/19.
 */


window.onload=function(){
    var oC=document.getElementById('c1');
    var gd=oC.getContext('2d');

    var out=50;
    var direction=[-out,out];
    var key=0.05;

    loadImg(resource,function(){
        //存放炮弹
        var arrBullet=[];
        //存放鱼
        var arrFish=[];
        //存放金币
        var arrCoin=[];
        //存放死鱼
        var arrDieFish=[];
        //存渔网
        var arrWeb=[];

        //炮
        var c=new Cannon(7);

        setInterval(function(){
            gd.clearRect(0,0,oC.width,oC.height);

            //鱼出来
            if(Math.random()<key){
                var f=new Fish(rnd(1,6));

                direction.sort(function(){
                    return Math.random()-0.5;
                });

                if(direction[0]<0){
                    f.rotate=rnd(-45,45);
                    f.x=-out;
                }else{
                    f.rotate=rnd(135,225);
                    f.x=oC.width+out;
                }
                f.y=rnd(100,oC.height-100);

                arrFish.push(f);
            }

            //画鱼
            for(var i=0; i<arrFish.length; i++){
                arrFish[i].draw(gd);
            }

            //画金币
            for(var i=0; i<arrCoin.length; i++){
                arrCoin[i].draw(gd);
            }
            //画死鱼
            for(var i=0; i<arrDieFish.length; i++){
                arrDieFish[i].draw(gd);
            }
            //画渔网
            for(var i=0; i<arrWeb.length; i++){
                arrWeb[i].draw(gd);

                arrWeb[i].scale+=0.05;

                if(arrWeb[i].scale>=1.2){
                    arrWeb.splice(i,1);
                    i--;
                }
            }



            //炮台
            gd.drawImage(
                JSON['bottom'],
                0,0,765,70,
                0,532,765,70
            );

            //画炮弹
            for(var i=0; i<arrBullet.length; i++){
                arrBullet[i].draw(gd);
            }

            //炮
            c.draw(gd);

            //检测子弹和鱼碰撞
            for(var i=0; i<arrFish.length; i++){
                for(var j=0; j<arrBullet.length; j++){
                    if(arrFish[i].isIn(arrBullet[j].x, arrBullet[j].y)){
                        var type=arrFish[i].type;
                        var x=arrFish[i].x;
                        var y=arrFish[i].y;
                        var rotate=arrFish[i].rotate;

                        //鱼死
                        arrFish.splice(i,1);
                        i--;
                        //子弹死
                        arrBullet.splice(j,1);
                        j--;

                        //生成金币
                        var coin=new Coin(type);
                        coin.x=x;
                        coin.y=y;
                        arrCoin.push(coin);

                        //生成死鱼
                        var dieFish=new DieFish(type);
                        dieFish.x=x;
                        dieFish.y=y;
                        dieFish.rotate=rotate;
                        arrDieFish.push(dieFish);

                        setTimeout(function(){
                            arrDieFish.splice(0,1);
                        },300);

                        //生成渔网
                        var web=new Web();
                        web.x=x;
                        web.y=y;
                        arrWeb.push(web);

                        //播放声音
                        var oA=new Audio();

                        oA.src='snd/coin.wav';

                        oA.play();
                    }
                }
            }

            //子弹出界，删除
            for(var i=0; i<arrBullet.length; i++){
                if(arrBullet[i].y<=-out || arrBullet[i].x<-out || arrBullet[i].x>oC.width+out || arrBullet[i].y>oC.height+out){
                    arrBullet.splice(i,1);
                    i--;
                }
            }
            //鱼出界，删除
            for(var i=0; i<arrFish.length; i++){
                if(arrFish[i].y<=-out || arrFish[i].x<-out || arrFish[i].x>oC.width+out || arrFish[i].y>oC.height+out){
                    arrFish.splice(i,1);
                    i--;
                }
            }
        },16);

        //点击转炮
        document.onclick=function(ev){
            //播放炮弹声音
            var oA=new Audio();
            oA.src='snd/cannon.mp3';
            oA.play();

            var a=ev.clientX-oC.offsetLeft- c.x;
            var b=ev.clientY-oC.offsetTop- c.y;

            var d=a2d(Math.atan2(b,a))+90;

            c.rotate=d;

            c.fireAction();

            //炮弹
            var bullet=new Bullet(c.type);
            bullet.x= c.x;
            bullet.y= c.y;
            bullet.rotate= c.rotate;
            arrBullet.push(bullet);
        };
    });
};
