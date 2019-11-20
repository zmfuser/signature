import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';
import $ from 'jquery'
function downloadPDF(file_id, file_title){
    const title = file_title
    const Dom_height = $('#' + file_id).height() //获取要截取的dom元素内容高度
    const outer_height = $('#' + file_id).outerHeight() //获取dom元素的外部高度
    const window_height = window.screen.availHeight //窗口高度
    // console.log($('#' + file_id).height())
    html2canvas(document.querySelector('#' + file_id), {
      allowTaint: true,
      // height: window.screen.availHeight,
      height: Dom_height < window_height ? window_height : outer_height, //canvas画布的具体高度
      /*以上这个高度非常重要，如果dom内容高度在窗口高度内的话，那就用窗口高度，
      确保把当前页的内容都截取，如果超过一页，那就用外部高度*/
      windowHeight: document.getElementById(file_id).scrollHeight, 
      y: window.pageYOffset - 30 //页面在垂直方向的滚动距离
    }).then( (canvas)=>{
        var contentWidth = canvas.width;
        var contentHeight = canvas.height;
        //一页pdf显示html页面生成的canvas高度;
        var pageHeight = contentWidth / 592.28 * 841.89;
        //未生成pdf的html页面高度
        var leftHeight = contentHeight;
        //页面偏移
        var position = 0;
        //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        var imgWidth = 595.28;
        var imgHeight = 595.28/contentWidth * contentHeight;
        var pageData = canvas.toDataURL('image/jpeg', 1.0);
        var pdf = new JsPDF('', 'pt', 'a4');
        //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        //当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
            //在pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置在pdf中显示；
            pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
            // pdf.addImage(pageData, 'JPEG', 20, 40, imgWidth, imgHeight);
        } else {    // 分页
            while(leftHeight > 0) {
                pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
                leftHeight -= pageHeight;
                position -= 841.89;
                //避免添加空白页
                if(leftHeight > 0) {
                    pdf.addPage();
                }
            }
        }
        //可动态生成
        pdf.save(pdfName);
    })
}
export default {
    downloadPDF
}
