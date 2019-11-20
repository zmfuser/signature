<template>
  <div class="sign-canvas">
    <div id="res"></div>
    <canvas id="canvas" width="375" height="500">您的破浏览器不兼容，请升级！</canvas>
    <div class="sign-btn">
      <!-- <div class="clear" @click="clear">
                清空
      </div>-->
      <div class="clear" @click="canvasUndo">back</div>
      <div class="clear" @click="canvasRedo">next</div>
      <div class="save" @click="save">保存</div>
      <button v-on:click="doprint()">打印pdf</button>
      <button v-on:click="getPdf()">keep打印pdf</button>
      
    </div>
  </div>
</template>

<script>
//
// import html2Canvas from 'html2canvas'
// import JsPDF from 'jspdf'
//

export default {
  data() {
    return {
      last: null,
      canvas: "",
      ctx: "",
      imgbase64url:
        "data:image/jpg;base64,R0lGODlhjACMAPAAAAAAAP///ywAAAAAjACMAEAI/wADCBxIsKDBgwgTKlzIsKHDhxAXAphIsaLFixgzXjSokSLDjQU7ihyp0SHIiBItclQZkiXBkwNhokQoM2FNki5j5qQpEuVNnB5bVjS5MwDQoC+LHs34UenSlUMb1pwpFKnOqBB/YqV6cGrXpWC1WhUodiLUsGi5ptzKk63UnhHBnmU602tSt3MBNO24t6Rao0WJHs1r96pfhSN9Pq0buKpZx2EV44Vc+K/lv2X1UnbqNnNlw2jlYm58dyzgyZchE4Zb+nHW0K5Ba2492yZp1Zv54qadePfD3rxv016te/jaw785I29rmjnswaNRywZuW3rq69iza9/Ovbt3qs8j5/9u7pts+MV9Y5uHbhwx6+Sd0csWbFp0+/lxlas/DTQv/f324Rcce9XVJ9965BF3Hl33IQigfgu+9913mU1o4VfW8bdfehhJ1t94G75FoIMdHsdggSf+R5KKHqaoYYkNvthibc7BmF+Gnh0oYoLTCcdVhB+q9VmFFn4244xGgmhjjSwqSeRrsPlXHoY8xhggiRwmaaWEVIYoJXZDQpjjiNcBiZNlYZL55YVstunmm3DG6Z6ZXFLHpJNmNgkmhGtiOSWaPvq5Z3yEGliolz8GKiOeh9LY5ZI7PkhmkmMut2iMHPb5op2XmujolZ0KCp+hpJ7556MKulipqXOWuuKpmgL/2uiRsCaaoaipPTmqpFUyduumdPI55arBypmdrsYmexmyypbpo5Y9/jqgpZzqiaKjsSqZpaKtItottrXi+mialtKKZJ1cpgrutN6Omy6qN1KL7qzxtlstvFDKW5yA/FpbI7SYDvucudcC3Ky/oQJL75b7Hnwnw/q6qq6KwXJ7babhOivtrusWbDGJ9wacrZAfK9yruuS2Ky6oBoenacodQ8xqvyarWjKnIQs8qZjznqztzxizCynMLfOMo6IGB30x0NEGeWzJSj/cNK9pbVdxw772CurIDnft9ddghy322GSXbfbZ3V0dsYsvqw3pv25P7CnKeUbqNtVv63y3z0nP/6033lyDhzTUfsv8qbCD8k34t20vTLOsijeK87PvMs6oxHbT7TjcG6+sI6VGrx1zzaM37rS4UoPcM+D1Hi756qUnzDLiHJs+M+r4Tj007QgTy2zqpDPrcuG6/5676lj7XjnNs/+q/ObBL+/5zs4vvrTI1z8eXeQ+58u69653X3vmT0MfdcKQqxw9kLaHj/fdFMf9t/v0w2+3/Ya3jz/awPfN/4XG+1+zAijAjBUNa9tKnvRspbWbLVBzrvIf8YCXQPEhT3R9g9n55PYtCeJugwakHAKZJrjOaQ97H9RdBdVnuXMpcIRCW2HshJbBzy0wZxdkYfEI17xykdBdJtza8f/uF7rvnTB7nOOeDnNYP96hb4JAVOIMVfhDAlLwhwjTn45AGMMiiTCCW4QiByn0xfeFsYUeM+HZhAc7LaoRTmx8Iea6WLY4is6NUtxfCRtoPqvt7Y0olJ31wKfHrNnLidzx4BBl6EIfBjKFe1wi6RrJtoxB0pBTZCIl8/ZIQVLPguu7Ywir9zo5SnJ4+RPjEHt4yoHNj4vzm1wpRUnIIsbueXPcYR87aMve2XCWNgsi7EAHzN0dDYZInKQq8RhMPjoymTh8IjON6cxKolGTy7Rk684ny9AkcpCLjKUtoxnJTJLvmsqk4QMxWUiCJdGaR+Sl2tI3OiF2EoILoqcMNVgOwH76858ADahAB4qQgAAAOw=="
    };
  },
  mounted() {
    // 初始化
    this.install();
    // this.installCanvas();
    window.addEventListener("touchmove",function(e){
        console.log('test')
        e.preventDefault()
    },{passive: false})
  },
  methods: {
    installCanvas() {
      // 获取 canvas 对象
      var canvas = document.getElementById("canvas");
      // 获取绘图环境
      var ctx = canvas.getContext("2d");

      canvas.ontouchmove = function(e) {
        console.log(e.touches[0].pageX, e.touches[0].pageY);
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
      canvas.ontouchend = function() {
        // canvas.ontouchmove=null
        this.last = null;
      };
      
    },
    // 1 base64转文件流
    base64Tofile(baseurl) {
      let arr = baseurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {
        type: mime
      });
    },
    //2 绘制图片
    drawImg(baseurl) {
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      var filedata = this.base64Tofile(baseurl);
      var readFile = new FileReader();

      readFile.readAsDataURL(filedata);
      console.log(readFile);
      // 图片读取成功
      readFile.onload = function() {
        // 结果
        console.log(this.result);
        // this.result;
        // 第一种方法
        var Img = new Image();
        Img.src = this.result;
        Img.onload = function() {
          // 根据 图片的 宽高 来 设置canvas 宽和高
          // this.canvas.width = Img.width;
          // this.canvas.height = Img.height;
          ctx.drawImage(
            Img,
            0,
            0,
            canvas.width, canvas.height,
            
          );
        };
      };
    },
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
      _this.drawImg(this.imgbase64url);
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
      if (this.step > 0) {
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
      if (this.step < this.canvasHistory.length-1 ) {
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
    },

    clear() {},
    save() {
      var canvas = document.getElementById("canvas");
      var saveImage = canvas.toDataURL("image/png");
      document.getElementById("res").innerHTML =
        '<img src="' + saveImage + '">';
    }
  }
};
</script>

<style lang="less" >
@media print{
    #res{
        width: 100%;
        height: 100%;
    }
}
.sign-canvas {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0;
  overflow: hidden;
}
.sign-canvas canvas {
  background-color: #e0e3e5;
}
.sign-btn {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  // margin:20px 0;
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
