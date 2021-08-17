let JsPDF = document.createElement("script");
JsPDF.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js';
document.body.appendChild(JsPDF);
JsPDF.onload = function () {  
    let pdf = new jsPDF();  
    var height = pdf.internal.pageSize.getHeight();
    let elements = document.getElementsByTagName("img");
    for (let ith_image in elements) {
        let img = elements[ith_image];
        if (!/^blob:/.test(img.src)) continue;
        let canvas = document.createElement('canvas');
        let context = canvas.getContext("2d");  
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height); 
        let imgData = canvas.toDataURL("image/jpeg", 1.0);   
        pdf.addImage(imgData, 'JPEG', 0, height/3.5);  // You can manipulate these params to change the pdf page -> height and width 
        pdf.addPage(); 
    }
    var pageCount = pdf.internal.getNumberOfPages();
    pdf.deletePage(pageCount) 
    pdf.save("File_Name.pdf");
};
