<template>
   <div class="sign-canvas">
       
        <canvas
                id="canvas"
               
                width="600"
                height="400"
                @mousedown="canvasDown($event)"
                @mousemove="canvasMove($event)"
                @mouseup="canvasUp()"
                @mouseleave="canvasLeave()"
                ref="canvas"
        >
            抱歉，您的浏览器暂不支持canvas元素
        </canvas>
        <div class="sign-btn">
            <div class="clear" @click="clear">
                清空
            </div>
            <div class="save" @click="save">
                保存
            </div>
            <button v-on:click="doprint()">打印pdf</button>
        </div>
        <div id="div_print">
           <p style="margin-botton:10px"> sdfsdfsdfsdfsdfsd</p>
           <p style="margin-botton:10px"> sdfsdfsdfsdfsdfsd</p>
           <p style="margin-botton:10px"> sdfsdfsdfsdfsdfsd</p>
           <p style="margin-botton:10px"> sdfsdfsdfsdfsdfsd</p>
           <p style="margin-botton:10px"> sdfsdfsdfsdfsdfsd</p>
           <img :src="imgurl" alt="" crossorigin="anonymous">
           <!-- <img src="http://images.cnblogs.com/cnblogs_com/html5test/359114/r_test.jpg" alt=""> -->
           <p style="margin-botton:10px"> sdfsdfsdfsdfsdfsd</p>
           <p style="margin-botton:10px"> sdfsdfsdfsdfsdfsd</p>
           <p style="margin-botton:10px"> sdfsdfsdfsdfsdfsd</p>
           <p style="margin-botton:10px"> sdfsdfsdfsdfsdfsd</p>
           <p style="margin-botton:10px"> sdfsdfsdfsdfsdfsd</p>
           
            
        <!-- <img :src="imgurl" alt="" style="background:#ccc" > -->
            
        </div>
    </div>

</template>

<script>
//
// import html2Canvas from 'html2canvas'
// import JsPDF from 'jspdf'
//
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
import htmlToPdf from '@/js/pdf.js'

export default {
  data() {
    return {
      htmlTitle:"newpdf",
        imgurl:"#imgurl",
        title:"mypdf",
         printObj: {
              id: "imgurl",
              popTitle: 'good print',
              extraCss: 'https://www.google.com,https://www.google.com',
              extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
            }

    };
  },
  mounted() {
      this.show();
      this.addPicture();

  },
  methods: {
    show() {
      this.canvas = this.$refs.canvas; // 指定canvas
      this.ctx = this.canvas.getContext("2d"); // 设置2D渲染区域
      this.ctx.lineWidth = 5; // 设置线的宽度
    },
    canvasDown(e) {
      this.canvasMoveUse = true;
      const canvasX =
        e.clientX - e.target.offsetLeft + document.documentElement.scrollLeft;
      const canvasY =
        e.clientY - e.target.offsetTop + document.documentElement.scrollTop;
      this.ctx.beginPath(); // 移动的起点
      this.ctx.moveTo(canvasX, canvasY);
    },
    canvasMove(e) {
      // 只在移动是进行绘制图线
      if (this.canvasMoveUse) {
        const t = e.target;
        let canvasX;
        let canvasY;
        canvasX =
          e.clientX - t.offsetLeft + document.documentElement.scrollLeft;
        canvasY = e.clientY - t.offsetTop + document.documentElement.scrollTop;
        this.ctx.lineTo(canvasX, canvasY);
        this.ctx.stroke();
      }
    },
    canvasUp() {
      this.canvasMoveUse = false;
    },
    canvasLeave() {
      this.canvasMoveUse = false;
    },
    clear() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    },
    save() {
      const imgBase64 = this.$refs.canvas.toDataURL();
      this.imgurl=imgBase64
      
    },
    // 放入图片
    addPicture(){
      var cvs = document.getElementById("canvas");
        var imgObj = new Image();
        // img.setAttribute('crossOrigin', 'anonymous');
        // imgObj.src = "../assets/logo.png";
        // debugger
        // imgObj.src = "http://139.9.44.85:8098/party/fileData/20190902112513_W020190830618793589150.jpg";
        imgObj.src = "http://images.cnblogs.com/cnblogs_com/html5test/359114/r_test.jpg";
        //待图片加载完后，将其显示在canvas上
        imgObj.onload = function(){ //onload必须使用
                var ctx = cvs.getContext('2d');
                ctx.drawImage(this, 0, 0,cvs.offsetWidth,cvs.offsetHeight);
        }

    },
    
      handleDown () {
        htmlToPdf.downloadPDF('imgurl', 'mypdf')
      }
  }
};
</script>

<style lang="less" >
#imgurl{
    height: 300px;
    width: 500px;
}
 .sign-canvas{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 20px 30px;
        overflow: auto;
    }
    .sign-canvas canvas{
        background-color: #e0e3e5;
    }
    .sign-btn {
        display: flex;
        margin:20px 0;
    }
    .sign-btn div {
        width: 175px;
        text-align: center;
        height: 70px;
        line-height: 70px;
        color: #FFFFFF;
    }
    .sign-btn div:active {
        background-color: #CCCCCC;
        color: #333333;
    }
    .sign-btn .clear {
        background-color: #FF8F58;
    }
    .sign-btn .save {
        background-color: #0599D7;
         
        
    }

</style>
