/**@type{HTMLCanvasElement} */
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

const button = document.querySelector('button')

var rangeslider = document.getElementById("sliderRange");
var output = document.getElementById("demo");
output.innerHTML = rangeslider.value;

let canvasPosition = canvas.getBoundingClientRect()

let pause=false

let swooshAudio= new Audio()
swooshAudio.src='swoosh.mp3'

let backgroundAudio= new Audio()
backgroundAudio.src='happyDay.mp3'

let auto=false
let size = 200
let equation=[]
let slope=0
let tiny=0.0000000001
// let idx=0
let width=1/70
let x=-1
let y=-(x^2)
let prevX=x
let prevY=y

let mouseX=0
let mouseY=0

let gameFrame=0

let slider_value=90

let xTiny1=0
let yTiny1=0
let xTiny2=0
let yTiny2=0

let xScaledleft=0
let yScaledleft=0
let xScaledright=0
let yScaledright=0

let mode=1

let PointX
let PointY

let findX=0
let findY=0

ctx.moveTo(x,y)

let panX=0

let scale=100
let speed=4


let convScale=scale/tiny
rangeslider.oninput = function() { 
    output.innerHTML = this.value; 
    slider_value=this.value

  } 

function gameLoop(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    equation.splice(0, equation.length)
    drawAxis()
    drawFunction()
    derivative()
    drawStatistics()
    drawOptions()
    if(pause==false){gameFrame++}
    backgroundAudio.play()
    requestAnimationFrame(gameLoop)
}

function drawOptions(){
    ctx.font = '40px Charcoal';
    ctx.fillStyle='#DBF7FF'
    ctx.beginPath()
    if(mouseX<380){
        if(mouseY<300){
            panX+=0.2*(-30-panX)
        }else{
            panX+=0.2*(-400-panX)
        }
    }else{
        panX+=0.2*(-400-panX)
    }
    ctx.roundRect(panX+30,-5, 350,130,30)
    ctx.fill()
    ctx.beginPath()
    ctx.fillStyle='lightblue'
    ctx.roundRect((panX)+40,10, 330,100,30)
    ctx.font = '30px Charcoal';

    ctx.fill()


    ctx.beginPath()
    ctx.fillStyle='black'
    
    ctx.font = '20px Charcoal';

    ctx.fillText('Move your mouse around',panX+60,40,999)

    ctx.fillText('and find the slope of',panX+60,65,999)

    ctx.fillText('the function at that point.',panX+60,90,999)






}

function drawStatistics(){
    // ctx.fillStyle='#00C9FF'
    ctx.fillStyle='lightgray'
    // ctx.roundRect(0,canvas.height,350,-300)
    ctx.beginPath()
    // ctx.roundRect(-30,canvas.height+30, 380,-330,30)
    // ctx.fill()
    ctx.fillStyle='black'
    ctx.font = '40px Charcoal';
    ctx.fillText('X:',0,780,900000)
    ctx.fillText('Y:',0,830,900000)
    ctx.fillText('Slope:',0,880,900000)
    ctx.font = '30px Charcoal';
    ctx.fillText(PointX,50,780,900000)
    ctx.fillText(Math.round(450-PointY),50,830,900000)
    ctx.fillText((Math.round((-slope*100))/100),110,880,900000)


}

function drawAxis(){
    ctx.beginPath()
    ctx.strokeStyle='lightgrey'
    ctx.lineWidth=2
    ctx.moveTo(0,canvas.height/2)
    ctx.lineTo(canvas.width,canvas.height/2)
    ctx.stroke()
    ctx.moveTo(canvas.width/2,0)
    ctx.lineTo(canvas.width/2,canvas.height)
    ctx.stroke()
    
}

function drawFunction(){



    if(mode==1){
        width=1/slider_value
        for(let i = -canvas.width;i<canvas.width;i++){

            x=i+canvas.width/2
            y=700-(i)*(i)*width
    
            equation.push(i^2)  
            ctx.strokeStyle='blue'
            ctx.lineWidth=5
            ctx.beginPath()
            ctx.moveTo(i-1+canvas.width/2,700-(i-1)*(i-1)*width)
            ctx.lineTo(x,y)
            ctx.stroke()
            
        
        }
    }else{
        if(mode==2){
            width=slider_value
            for(let i = -canvas.width;i<canvas.width;i++){

                x=i+canvas.width/2
                y=-sin(i/60)*width+450
        
                equation.push(i^2)  
                ctx.strokeStyle='blue'
                ctx.lineWidth=5
                ctx.beginPath()
                ctx.moveTo((i-1)+canvas.width/2,(-sin((i-1)/60)*width)+450)
                ctx.lineTo(x,y)
                ctx.stroke()
                
            
            }
        }else{
            if(mode==3){
                width=1/(slider_value*450)
                for(let i = -canvas.width;i<canvas.width;i++){
        
                    x=i+canvas.width/2
                    y=450-(i)*(i)*(i)*width
            
                    equation.push(i^3)  
                    ctx.strokeStyle='blue'
                    ctx.lineWidth=5
                    ctx.beginPath()
                    ctx.moveTo(i-1+canvas.width/2,450-(i-1)*(i-1)*(i-1)*width)
                    ctx.lineTo(x,y)
                    ctx.stroke()
                    
                
                }
            }
        }
    }






}

function derivative(){
    ctx.strokeStyle='#FF0000'
    if(pause==false){
        if (auto) {
            findX=(gameFrame*speed%1600)-800
        } else {
            findX=mouseX-(canvas.width/2)
        }
    }

    x=findX
    y=f(x)
    slope=findSlope(x,tiny)
    xScaledleft=x-scale
    yScaledleft=y-(slope*scale)
    xScaledright=x+scale
    yScaledright=y+(slope*scale)
    PointX=x
    PointY=y
    drawTriangle()


function f(x){
    if(mode==1){
        return(700-(x**2*width))
    }else{
        if(mode==2){
            return(450-sin(x/60)*width)
        }else{
            if(mode==3){
                return(450-(x**3)*width)
            }
        }
    }
}

function findSlope(x,h){
    return((f(x+(h/2))-f(x-(h/2)))/h)
}

    ctx.strokeStyle='black'
    ctx.beginPath()
    ctx.arc(PointX+canvas.width/2,PointY,5,0,2*Math.PI,false)
    
    ctx.fill()

}

function drawTriangle(){
    ctx.beginPath()
    ctx.strokeStyle='red'
    ctx.moveTo(x+canvas.width/2,y)
    ctx.lineTo(xScaledright+canvas.width/2,yScaledright)
    ctx.moveTo(x+canvas.width/2,y)
    ctx.lineTo(xScaledleft+canvas.width/2,yScaledleft)
    ctx.stroke()
    ctx.beginPath()
    ctx.strokeStyle='#1FFF00'
    // ctx.strokeStyle='green'
    ctx.moveTo(xScaledleft+canvas.width/2,yScaledleft)
    ctx.lineTo(xScaledright+canvas.width/2,yScaledleft)
    ctx.moveTo(xScaledright+canvas.width/2,yScaledleft)
    ctx.lineTo(xScaledright+canvas.width/2,yScaledright)
    ctx.stroke()

    ctx.beginPath()
    ctx.font = '20px Verdana';
    ctx.fillText(('1.00e-10'),(xScaledright-scale)+canvas.width/2,yScaledleft)
    ctx.fillText(((Math.abs(Math.round(slope*tiny*1000000000000))/1000000000000)),(xScaledright)+canvas.width/2,PointY)

    console.log(-(slope*tiny)/tiny)


}

function sqrt(x){
    Math.sqrt(x)
}


function sin(x){
    return(Math.sin(x))
}

function cos(x){
    return(Math.cos(x))
}

function toFixed(x) {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split('e-')[1]);
      if (e) {
          x *= Math.pow(10,e-1);
          x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
          e -= 20;
          x /= Math.pow(10,e);
          x += (new Array(e+1)).join('0');
      }
    }
    return x;
  }

window.addEventListener('mousemove',function(e){
    mouseX=e.x-canvasPosition.left
    mouseY=e.y-canvasPosition.top
    })

window.addEventListener('keyup',function(e){
    if(e.key=='ArrowRight'){
        mode++
        mode=1+(mode%3)
        swooshAudio.play()
    }
    if(e.key==' '){
        if (pause) {
            pause=false
        } else {
            pause=true
        }
    }
})

button.addEventListener('click',function(e){
    if(auto){
        auto=false
    }else{
        auto=true
    }
})



gameLoop();
