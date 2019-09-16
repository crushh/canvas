var windor_width= window.screen.width;
var window_height= window.screen.height;
var radius=8;
var margin_top=60;
var margin_left=30;

//var endTime=new Date();
//endTime.setTime(endTime.getTime()+3600*1000);
var curShowTimeSeconds=0;

//动画小球
var balls=[];
const colors=["#FA8072","#FFE4E1","#FF6347","#DB7093","#FFF0F5"];

console.log(balls);

window.onload=function(){
	//自适应

	windor_width=document.body.clientWidth;
	window_height=document.body.clientHeight;
	

	margin_left=Math.round(windor_width/10);
	radius=Math.round(windor_width*4/5/108)-1;
	margin_top=Math.round(window_height/5);

    var canvas=document.getElementById('canvas');
    var context=canvas.getContext('2d');

    canvas.width=windor_width;
    canvas.height=window_height;


 curShowTimeSeconds=getCurrentShowTimeSeconds();

//处理绘制过程 自定义render函数 传入我们获得的绘图的上下环境
 
setInterval( //设置间隔自动执行函数
	function () {
		render(context);
		update();

	},
	50
	);

}

function update(){
	var nextShowTimeSeconds=getCurrentShowTimeSeconds();

	var nextHours=parseInt(nextShowTimeSeconds/3600);
	var nextMinutes=parseInt((nextShowTimeSeconds-nextHours*3600)/60);
	var nextSeconds=nextShowTimeSeconds%60;

	var curhours=parseInt(curShowTimeSeconds/3600);
	var curminutes=parseInt((curShowTimeSeconds-curhours*3600)/60);
	var curseconds=curShowTimeSeconds%60;

	if(nextSeconds!=curseconds){
		//时钟两位数
		if(parseInt(curhours/10)!=parseInt(nextHours/10)){
			addBells(margin_left+0,margin_top,parseInt(curhours/10));
		}
		if(parseInt(curhours%10)!=parseInt(nextHours%10)){
			addBells(margin_left+15*(radius+1),margin_top,parseInt(curhours%10));
		}
		//分钟

		if(parseInt(curminutes/10)!=parseInt(nextMinutes/10)){
			addBells(margin_left+39*(radius+1),margin_top,parseInt(curminutes/10));
		}
		if(parseInt(curminutes%10)!=parseInt(nextMinutes%10)){
			addBells(margin_left+54*(radius+1),margin_top,parseInt(curminutes%10));
		}

		//秒钟
		if(parseInt(curseconds/10)!=parseInt(nextSeconds/10)){
			addBells(margin_left+78*(radius+1),margin_top,parseInt(curseconds/10));
		}
		if(parseInt(curseconds%10)!=parseInt(nextSeconds%10)){
			addBells(margin_left+93*(radius+1),margin_top,parseInt(curseconds%10));
		}
		
		curShowTimeSeconds=nextShowTimeSeconds;

	}

updateBalls();
}

//小球物理运动轨迹
function updateBalls(){
	for(var i=0;i<balls.length;i++){
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g
			if(balls[i].y>=window_height-radius){
				balls[i].y=window_height-radius;
				balls[i].vy=-balls[i].vy*0.75;//摩擦系数0.75
				
				
			}
	}
	//将在屏幕内的小球保留在cnt
var cnt=0;
for(var i=0;i<balls.length;i++)
	if(balls[i].x+radius>0&&balls[i].x-radius<windor_width)
		balls[cnt++]=balls[i]

	while(balls.length>cnt){
		balls.pop();
	
}
}

function addBells(x,y,num){

	for(var i=0;i<digit[num].length;i++)
       for (var j=0;j<digit[num][i].length;j++)
       	if(digit[num][i][j]==1){
       		var aBall={
       			x:x+j*2*(radius+1)+(radius+1),
       			y:y+i*2*(radius+1)+(radius+1),
       			g:1.5+Math.random(),
       			vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
       			//Math.ceil向上取整 math.pow(数字，数字的幂次方) vx的速度是正4或负4
       			vy:-5,
       			color:colors[Math.floor(Math.random()*colors.length)]

       			//floor 下取整 
       		}
       		balls.push(aBall);

       	}


}



//动态的时间 倒计时
function getCurrentShowTimeSeconds(){
	var curTime=new Date();
	//var ret=endTime.getTime()-curTime.getTime();
	//ret=Math.round(ret/1000) //将毫秒转为秒并转化为整数

	//return ret>=0?ret:0;
	var ret=curTime.getHours()*3600+
	curTime.getMinutes()*60+curTime.getSeconds();
	return ret;
}


function render(cxt){
	cxt.clearRect(0,0,windor_width,window_height);//对整个矩形刷新




	var hours=parseInt(curShowTimeSeconds/3600);
	var minutes=parseInt((curShowTimeSeconds-hours*3600)/60);
	var seconds=parseInt(curShowTimeSeconds%60);

	renderDigit(margin_left,margin_top,parseInt(hours/10),cxt);
	renderDigit(margin_left+15*(radius+1),margin_top,parseInt(hours%10),cxt);
	//因为我们数组是7*10的规格 所以是7*2*（r+1） 又为了和右侧数字有空位所以再＋1px
	
	//绘制冒号
    renderDigit(margin_left+30*(radius+1),margin_top,10,cxt);

    //绘制分钟
    //因为冒号是4*10的规格 所以是30+4*2+1=39开始绘制分钟 39+15=54
    renderDigit(margin_left+39*(radius+1),margin_top,parseInt(minutes/10),cxt);
	renderDigit(margin_left+54*(radius+1),margin_top,parseInt(minutes%10),cxt);
	

    //绘制冒号
    renderDigit(margin_left+69*(radius+1),margin_top,10,cxt);
	
    //绘制秒钟
	renderDigit(margin_left+78*(radius+1),margin_top,parseInt(seconds/10),cxt);
	renderDigit(margin_left+93*(radius+1),margin_top,parseInt(seconds%10),cxt);
//绘制动画小球

	for(var i=0;i<balls.length;i++){
		cxt.fillStyle=balls[i].color;

		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y,radius,0,2*Math.PI,true);
		cxt.closePath();

		cxt.fill();
	}


}


//小圆球的绘制
function renderDigit(x,y,num,cxt){
	cxt.fillStyle="	#2E8B57";
	for (var i = 0;i<digit[num].length;i++)

		for (var j = 0;j<digit[num][i].length;j++)
			if(digit[num][i][j]==1){
				cxt.beginPath();
				cxt.arc(x+j*2*(radius+1)+(radius+1),y+i*2*(radius+1)+(radius+1),radius,0,2*Math.PI)
				cxt.closePath();

				cxt.fill();
			}


}