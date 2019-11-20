function printPage() {  
  
} 

export default{
      install (Vue, options) {
        Vue.prototype.unchangeweb= function () {
                //获取当前页的html代码  
        var bodyhtml = window.document.body.innerHTML;  
        //设置打印开始区域、结束区域  
        var startFlag = "<!--startprint-->";  
        var endFlag = "<!--endprint-->";  
        // 要打印的部分  
        var printhtml = bodyhtml.substring(bodyhtml.indexOf(startFlag),   
                bodyhtml.indexOf(endFlag));  
        // 生成并打印ifrme  
        var f = document.getElementById('res'); 
        debugger
        f.contentDocument.write(printhtml);
        f.contentDocument.close();
        f.contentWindow.print();
        }
      }
    }