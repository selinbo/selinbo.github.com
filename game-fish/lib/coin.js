/**
 *  @ Author: 智能社-strive
 *  @ Date: 2016/4/19.
 */
function Coin(type){
    this.type=type;
    this.x=0;
    this.y=0;
    this.cur=0;
    this.move();
}
Coin.prototype.draw=function(gd){
    gd.save();

    switch (this.type){
        case 1:
        case 2:
        case 3:
            gd.translate(this.x,this.y);
            gd.drawImage(
                JSON['coinAni1'],
                0,this.cur*60,60,60,
                -30,-30,60,60
            );
            break;
        case 4:
        case 5:
            gd.translate(this.x,this.y);
            gd.drawImage(
                JSON['coinAni2'],
                0,this.cur*60,60,60,
                -30,-30,60,60
            );
            break;
    }

    gd.restore();
};
Coin.prototype.move=function(){
    //转
    setInterval(function(){
        this.cur++;
        if(this.cur==10)this.cur=0;
    }.bind(this),30);

    //收钱
    setInterval(function(){
        this.x+=(50-this.x)/10;
        this.y+=(650-this.y)/10;
    }.bind(this),30);
};
