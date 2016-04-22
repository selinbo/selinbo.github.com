/**
 *  @ Author: 智能社-strive
 *  @ Date: 2016/4/19.
 */
function Web(){
    this.x=0;
    this.y=0;
    this.scale=0.5;
}
Web.prototype.draw=function(gd){
    gd.save();

    gd.translate(this.x,this.y);
    gd.scale(this.scale,this.scale);
    gd.drawImage(
        JSON['web'],
        14,413,110,110,
        -55,-55,110,100
    );

    gd.restore();
};
