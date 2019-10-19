
/**  
 * Отрисовать баркод для татуировки клона в element  
 * @param cloneInfo {CloneInfo} - информация о клоне  
 * @param element {HTMLDivElement} - div с фиксированным размером  
 *     148x156 пикселей, в который будет отрисовываться баркод  
 */  
function renderBarcode(cloneInfo, element) {  
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    let setState = s=>ctx.fillStyle = s?"rgb(0,0,0)":"rgb(255,255,255)";
    canvas.width = 148;
    canvas.height = 156;
    setState(true);
    ctx.fillRect(0,0,148,156);
    setState();
    ctx.fillRect(3,3, 142, 150);
    let drawbit = (state, point)=>{setState(state);ctx.fillRect(...point,8,8);};
    let data = (cloneInfo.sex == "male"?"1":"0") + (cloneInfo.id + cloneInfo.name.padEnd(26, " ")).split("").map(c=>c.charCodeAt()).map(n=>n.toString(2).padStart(8,"0")).join("");
    let csum = new Array(17).fill(0);
    for(let i = 0, x=0; i<18; i++){
        for (let j = 0; j<17 && x<data.length; j++, x++){
            let n = +data[x];
            drawbit(n, [6+8*j, 6+8*i]);
            csum[j] += n;
            if (x == data.length-1 && i!=17) data += csum.map(s=>s%2).join("");
        }
    }


    element.appendChild(canvas);
}

renderBarcode({  
    "sex": "female",  
    "id": "0owrgqqwfw",  
    "name": "Dazdraperma Petrovna"  
}, document.querySelector("#barcode"));
