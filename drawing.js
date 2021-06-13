let maincontainer = document.querySelector(".main_container");
let pencontainer = document.querySelector(".pen");
let allcontainer = document.querySelector(".allcontainer");
let maincolor = document.querySelector(".main");
let mousepointer = document.querySelector(".mousepointer");
let rubbercontainer = document.querySelector(".rubber");
let highlitercontainer = document.querySelector(".highliter");
let clearbutton = document.querySelector(".clear");
let savebutton = document.querySelector(".save");
let tool = maincontainer.getContext("2d");
let inputcontainer = document.querySelector(".input_container");
let myimage = document.querySelector("img");
maincontainer.height = window.innerHeight;
maincontainer.width = window.innerWidth;
let stickerarr = [];
let ispen = false;
let isrubber = false;
let ishighliter = false;
myimage.style.display = "none";
let pointervariable = false;
//to select  a color from color container
maincolor.style.backgroundColor = "black";
let colorsarr = document.querySelectorAll(".color")
for (let i = 0; i < colorsarr.length; i++) {
    colorsarr[i].addEventListener("click", function () {
        isrubber = false;
        pointervariable = false;
        let newcolor = colorsarr[i].classList[0];
        maincolor.style.backgroundColor = newcolor;
        tool.strokeStyle = newcolor;
        tool.fillStyle = newcolor;
    })
}
let imagevariable = false;
mousepointer.addEventListener("click", function () {
    imagevariable = true;
    if (imagevariable == true) {
        myimage.style.display = "block";
    }
    myimage.addEventListener("load", function (e) {
        tool.drawImage(myimage, e.clientX, e.clientY, myimage.width / 2, myimage.height / 2, 0, 0, 200, 300);
        myimage.style.display = "none";
    })
    maincontainer.addEventListener("mousedown", function (e) {
        myimage.addEventListener("load", function (e) {
            pointervariable = true;
            myimage.style.display = "none";
        })
    })
    maincontainer.addEventListener("mousemove", function (e) {

        if (pointervariable == true) {
            let x = e.clientX;
            let y = e.clientY;
            myimage.style.marginLeft = x + "px";
            myimage.style.marginTop = y + "px";
            myimage.style.display = "none";
        }

    })
    maincontainer.addEventListener("mouseup", function (e) {
        myimage.addEventListener("load", function (e) {
            pointervariable = true;
        })
        myimage.style.display = "none";
    })
})
let h,l;
// to make save button
savebutton.addEventListener("click", function (e) {
    for (let i = 0; i < stickerarr.length; i++) {
        let obj = stickerarr[i].getBoundingClientRect();
         h=obj.top;
         l=obj.left;
    }
   
    let url = maincontainer.toDataURL();
    let a = document.createElement("a");
    a.download = "file.png";
    a.href = url;
    a.click();
    a.remove();
    
    tool.drawImage(url,20,20);
})
//to draw in whitebaord and use pen 
pencontainer.addEventListener("click", function () {
    isrubber = false;
    ishighliter = false;
    pointervariable = false;
    myimage.style.display = "none";
    maincontainer.addEventListener("mousedown", function (e) {
        isrubber = false;
        ishighliter = false;
        tool.beginPath();
        tool.moveTo(e.clientX, e.clientY);
        ispen = true;
    })
    maincontainer.addEventListener("mousemove", function (e) {
        if (ispen == true && isrubber == false && pointervariable == false && ishighliter == false) {
            tool.lineWidth = 5;
            tool.lineTo(e.clientX, e.clientY);
            tool.stroke();
        }
    })
    maincontainer.addEventListener("mouseup", function (e) {
        ispen = false;
    })
})
// //for rubber
rubbercontainer.addEventListener("click", function (e) {
    ispen = false;
    ishighliter = false;
    pointervariable = false;
    myimage.style.display = "none";
    // isrubber = true;
    maincontainer.addEventListener("mousedown", function () {
        ispen = false;
        ishighliter = false;
        tool.beginPath();
        // tool.lineWidth = 10;
        tool.moveTo(e.clientX, e.clientY);
        isrubber = true;
    })
    maincontainer.addEventListener("mousemove", function (e) {
        if (isrubber == true && pointervariable == false && ispen == false && ishighliter == false) {
            tool.clearRect(e.clientX, e.clientY, 40, 40);
            tool.stroke();
        }
    })
    maincontainer.addEventListener("mouseup", function (e) {
        isrubber = false;
    })
})
highlitercontainer.addEventListener("click", function (e) {
    ispen = false;
    pointervariable = false;
    myimage.style.display = "none";
    isrubber = false;
    maincontainer.addEventListener("mousedown", function () {
        tool.beginPath();
        tool.lineWidth = 15;
        tool.moveTo(e.clientX, e.clientY);
        ishighliter = true;
    })
    maincontainer.addEventListener("mousemove", function (e) {
        if (ishighliter == true ) {
            tool.globalCompositeOperation = "multiply";
            tool.fillRect(e.clientX - 10, e.clientY - 10, 40, 40);
            tool.stroke();
        }
    })
    maincontainer.addEventListener("mouseup", function (e) {
        ishighliter = false;
    })
})
function gety(y) {
    let obj = inputcontainer.getBoundingClientRect();
    let he = obj.height;
    return y - he;
}
//new sticker to add
//to get size and color of the text sticker
let fsize;
let fontfamily;
let sizecontainer = document.querySelector(".font-size");
let fontfamilycontainer = document.querySelector(".font-family");
function myFunction() {
    fsize = sizecontainer.value;
    console.log(fsize);
}
//to get the font family of the sticker
function fontFunction() {
    fontfamily = fontfamilycontainer.value;

}
let flagy = false;
let stickercounter = 0;

let stickercontainer = document.querySelector(".stickercontainer");
let sticker = document.querySelector(".sticker");
let newstickers;
let addingsticker;
if (flagy == false) {
    sticker.addEventListener("click", function (e) {
        myimage.style.display = "none";
        flagy = true;
        stickercounter++;
        newstickers = document.createElement("input");
        newstickers.setAttribute("class", "newstickers");
        stickercontainer.appendChild(newstickers);
        addingsticker = document.createElement("div");
        addingsticker.setAttribute("class", "addingsticker");
        allcontainer.appendChild(addingsticker);
        //stickerarr.push(addingsticker);
        console.log(stickerarr);
        newstickers.addEventListener("keypress", function (e) {
            console.log(e.key);
            if (e.key == "Enter") {
                let textsticker = newstickers.value;

                addingsticker.innerText = textsticker;
                newstickers.style.display = "none";
                flagy = false;
                addingsticker.style.fontSize = fsize + "px";
                addingsticker.style.fontFamily = fontfamily;
                addingsticker.textOverflow = "ellipsis";
                stickercounter--;
                stickerarr.push(addingsticker);
                console.log(stickerarr);
            }
            // let flag = false;
            // let x = null;
            // let y = null;
            // addingsticker.addEventListener("mouseup", function (e) {
            //     flag = true;
            //     x = e.clientX;
            //     y = e.clientY
            //     let shiftX = e.clientX - addingsticker.getBoundingClientRect().left;
            //     let shiftY = e.clientY - addingsticker.getBoundingClientRect().top;
            //     moveAt(e.clientX, e.clientY);
            // })
            // addingsticker.addEventListener("mousemove", function (e) {
            //     // if (flag == true) {
            //     //     let xf = e.clientX;
            //     //     let yf = e.clientY ;
            //     //     let dx = xf - x;
            //     //     let dy = yf - y;
            //     //     let { top, left } = addingsticker.getBoundingClientRect();
            //     //     addingsticker.style.left = dx+left + "px";
            //     //     addingsticker.style.top =dy+top+ "px";
            //     //     x = xf;
            //     //     y = yf;
            //     // }
            //     moveAt(e.clientX, e.clientY);
            // })
            // addingsticker.addEventListener("mouseup", function (e) {
            //     flag = false;

            // })
            // function moveAt(pageX, pageY) {
            //     addingsticker.style.left = e.clientX - shiftX + 'px';
            //     addingsticker.style.top = e.clientY - shiftY + 'px';
            //  }
           let nr=[];

            //new logic
            let flag = false;
            addingsticker.addEventListener("click", function (e) {
                flag = true;
            })
            addingsticker.addEventListener("mousemove", function (e) {
                if (flag == true) {
                    let x = e.clientX;
                    let y = e.clientY;
                    addingsticker.style.left = x + "px";
                    addingsticker.style.top = y + "px";

                    addingsticker.addEventListener("click", function (e) {
                        flag = false;

                    })

                }
            })

        })
    })
}

//addingsticker.style.backgroundColor="newcolor";
//addingsticker.innerText="abgf";
// tool.clearRect(e.clientX-10, e.clientY-10, 200, 200);


//too make clear button
clearbutton.addEventListener("click", function (e) {
    for (let i = 0; i < stickerarr.length; i++) {
        stickerarr[i].style.display = "none";
    }
    newstickers.style.display = "none";
    tool.clearRect(0, 0, maincontainer.width, maincontainer.height);

})
