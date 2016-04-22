/**
 *  @ Author: 智能社-strive
 *  @ Date: 2016/4/19.
 */
function DieFish(type){
    this.type=type;
    this.x=0;
    this.y=0;
    this.cur=0;
    this.rotate=0;
    this.change();
}
DieFish.prototype.draw=function(gd){
    var w=FISH_SIZE[this.type].w;
    var h=FISH_SIZE[this.type].h;

    gd.save();

    gd.translate(this.x,this.y);
    gd.rotate(d2a(this.rotate));
    if(this.rotate>=90 && this.rotate<270){
        gd.scale(1,-1);
    }
    gd.drawImage(
        JSON['fish'+this.type],
        0,4*h+this.cur*h,w,h,
        -w/2,-h/2,w,h
    );

    gd.restore();
};
DieFish.prototype.change=function(){
    setInterval(function(){
        this.cur++;
        if(this.cur==4)this.cur=0;
    }.bind(this),30);
};

