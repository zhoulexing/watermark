
const config = {
    angle: 15, // 水印倾斜程度
    font: '微软雅黑 18px', // 字体
    color: '#96a3b0', // 字体颜色
    initX: 20, // 起始X位置
    initY: 20, // 起始Y位置
    width: 120, // 字体宽度
    height: 80, // 字体高度
};


/*
* 通过canvas生成水印
* */
export default function watermark(text, settings) {
    settings = settings || config;
    
    const pageWidth = document.documentElement.clientWidth;
    const pageHeight = document.documentElement.clientHeight;
    const cvs = createCanvas(pageWidth, pageHeight, { width: `${ pageWidth }px`, height: `${ pageWidth }px` });
    const ctx = cvs.getContext('2d');
   
    drawRect(ctx, pageWidth, pageHeight);
    fillText(ctx, text, pageWidth, pageHeight);
    const imgUrl = canvas2Picture(cvs);
    document.body.style = `background-image: url(${ imgUrl });background-repeat: no-repeat;background-attachment: fixed;background-position: 0 0;background-size: 100% 100%;`;
}

// 创建canvas对象
function createCanvas(width, height, styles) {
    const dom = document.createElement('canvas');
    dom.width = width;
    dom.height = height;
    if(typeof styles === 'object') {
        Object.keys(styles).forEach(key => {
            dom.style[key] = styles[key];
        });
        return dom;
    }
}

// 给canvas设置背景图片
function drawImage(ctx, imgUrl, width, height) {
    const img = new Image();
    img.src = imgUrl;
    const promise = new Promise((resolve, reject) => {
        img.onload = () => {
            ctx.drawImage(img, 0, 0, width, height);
            resolve();
        };
        img.onerror = () => {
            reject();
        }
    });
    return promise;
}

// 给canvas设置一个背景
function drawRect(ctx, width, height) {
    ctx.fillStyle = '#011a33';
    ctx.fillRect(0, 0, width, height);
}

// 给canvas设置文字
function fillText(ctx, text, width, height) {
    const textCvs = createCanvas(settings.width, settings.height, { width: `${ settings.width }px`, height: `${ settings.height }px` });
    const textCtx = textCvs.getContext('2d');
    textCtx.fillStyle = settings.color;
    textCtx.font = settings.font;
    textCtx.rotate(-(settings.angle*Math.PI/180));
    textCtx.fillText(text, settings.initX, settings.initY);
    
    const pat = ctx.createPattern(textCvs, 'repeat');
    ctx.fillStyle = pat;
    ctx.fillRect(0, 0, width, height);
}

// 将canvas转化成图片
function canvas2Picture(cvs, type = 'png') {
    let imageUrl = cvs.toDataURL(type);
    imageUrl = imageUrl.replace(fixType(type), 'image/octet-stream');
    return imageUrl;
}

// 固定类型
function fixType(type) {
    type = type.toLowerCase().replace(/jpg/i, 'jpeg');
    let r = type.match(/png|jpeg|bmp|gif/)[0];
    return 'image/' + r;
}

