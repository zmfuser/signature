<template>
  <div class="sign-canvas">
    <canvas
      id="canvas"
      width="350"
      height="400"
     
      ref="canvas"
    >抱歉，您的浏览器暂不支持canvas元素</canvas>
    <div class="sign-btn">
      <div class="clear" @click="canvasUndo">back</div>
      <div class="clear" @click="canvasRedo">next</div>
      <!-- <div class="save" @click="save">保存</div> -->
      <!-- <button v-on:click="doprint()">打印pdf</button> -->
    </div>
  </div>
</template>

<script>
//
// import html2Canvas from 'html2canvas'
// import JsPDF from 'jspdf'
//
import html2Canvas from "html2canvas";
import JsPDF from "jspdf";
import htmlToPdf from "@/js/pdf.js";

export default {
  data() {
    return {
      htmlTitle: "newpdf",
      imgurl: "#imgurl",
      title: "mypdf",
      printObj: {
      
        myCanvas:"",
        ctx :"",
        canvasWidth :"",
        canvasHeight :"",
        canvasHistory :"",
        step :"",
        last:[]
      }
    };
  },
  mounted() {
    this.install();
    // this.addPicture();
     window.addEventListener("touchmove",function(e){
        console.log('test')
        e.preventDefault()
    },{passive: false})
  },
  methods: {
    install() {
        let _this=this;
        var myCanvas = document.querySelector("#canvas");
        var ctx =myCanvas.getContext("2d");
        this.canvasWidth = 200;
        this.canvasHeight = 200;
        this.canvasHistory = [];
        this.step = -1;
        myCanvas.ontouchmove = function(e) {
        // console.log(e.touches[0].pageX, e.touches[0].pageY);
        // console.log(e.offsetX);
        if (this.last != null) {
          ctx.beginPath();
          ctx.moveTo(this.last[0], this.last[1]);
          ctx.lineTo(e.touches[0].pageX, e.touches[0].pageY - 78.6);

          ctx.stroke();
          // debugger
        }
        // 第一次触发这个函数，只做一件事，把当前 鼠标的 x , y 的位置记录下来
        // 做下一次 线段的 起始点。
        this.last = [e.touches[0].pageX, e.touches[0].pageY - 78.6];
      };
      myCanvas.ontouchend = function() {
        // canvas.ontouchmove=null
        _this.canvasDraw(myCanvas);
        this.last = null;
      };
    },
    // 变量定义

    // 绘制方法
    canvasDraw(myCanvas) {
      this.step++;
      if (this.step < this.canvasHistory.length) {
        this.canvasHistory.length = this.step; // 截断数组
      }
      // 执行绘制的相关操作（如绘制图片、线条等）
      // ...
      // ...
      this.canvasHistory.push(myCanvas.toDataURL()); // 添加新的绘制到历史记录
    },
    // 撤销方法
    canvasUndo() {
       var myCanvas = document.querySelector("#canvas");
        var ctx =myCanvas.getContext("2d");
      if (this.step >= 0) {
        this.step--;
       ctx.clearRect(0, 0, myCanvas.width,myCanvas.height);
        let canvasPic = new Image();
        
        canvasPic.src = this.canvasHistory[this.step];
        console.log(this.step,this.canvasHistory[this.step])
        //  Img.src = this.result;
        canvasPic.onload = function() {
          // 根据 图片的 宽高 来 设置canvas 宽和高
          // this.canvas.width = Img.width;
          // this.canvas.height = Img.height;
          ctx.drawImage(
            canvasPic,
            0,
            0,
            myCanvas.width, myCanvas.height,
            
          );
        };
        // canvasPic.addEventListener("load", () => {
        //   ctx.drawImage(canvasPic, 0, 0);
        // });
      } else {
        console.log("不能再继续撤销了");
      }
    },
    // 反撤销方法
    canvasRedo() {
      var myCanvas = document.querySelector("#canvas");
        var ctx =myCanvas.getContext("2d");
      if (this.step < this.canvasHistory.length - 1) {
        this.step++;
        // let canvasPic = new Image();
        ctx.clearRect(0, 0, myCanvas.width,myCanvas.height);
        let canvasPic = new Image();
        
        canvasPic.src = this.canvasHistory[this.step];
     
        canvasPic.onload = function() {
          
          ctx.drawImage(
            canvasPic,
            0,
            0,
            myCanvas.width, myCanvas.height,
            
          );
        };
      } else {
        console.log("已经是最新的记录了");
      }
    }
  }
};
</script>

<style lang="less" >
#imgurl {
  height: 300px;
  width: 500px;
}
.sign-canvas {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: auto;
}
.sign-canvas canvas {
  background-color: #e0e3e5;
}
.sign-btn {
  display: flex;
  margin: 20px 0;
}
.sign-btn div {
  width: 175px;
  text-align: center;
  height: 70px;
  line-height: 70px;
  color: #ffffff;
}
.sign-btn div:active {
  background-color: #cccccc;
  color: #333333;
}
.sign-btn .clear {
  background-color: #ff8f58;
}
.sign-btn .save {
  background-color: #0599d7;
}
</style>
