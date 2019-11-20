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
            <div class="save" @click="getPdf" style="margin-left:2px" >
                打印pdf
            </div>
        </div>
        <img :src="imgurl" alt="" style="background:#ccc">
    </div>

</template>

<script>
//
// import html2Canvas from 'html2canvas'
// import JsPDF from 'jspdf'
//
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default {
  data() {
    return {
        imgurl:"",
        title:"mypdf",
    };
  },
  mounted() {
      this.show();

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
      console.log(imgBase64);
    },
     getPdf () {
      var title = this.title;
      html2Canvas(document.querySelector('#canvas'), {
        allowTaint: true
      }).then(function (canvas) {
        let contentWidth = canvas.width
        let contentHeight = canvas.height
        let pageHeight = contentWidth / 592.28 * 841.89
        let leftHeight = contentHeight
        let position = 0
        let imgWidth = 595.28
        let imgHeight = 592.28 / contentWidth * contentHeight
        let pageData = canvas.toDataURL('image/jpeg', 1.0)
        let PDF = new JsPDF('', 'pt', 'a4')
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        PDF.save(title + '.pdf')
      }
      )
    },
  }
};
</script>

<style lang="less" scoped>
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
        // height: 16px;
    }

</style>
