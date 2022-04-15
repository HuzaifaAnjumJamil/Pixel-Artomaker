//initial reference
let container = document.querySelector('.container');
let gridButton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");

//Event objects
let events = {
    mouse : {
        down : "mousedown",
        move : "mousemove",
        up : "mouseup",
    },
    touch : {
        down : "touchstart",
        move : "touchmove",
        up : "touchend",
    },
};

let deviceType = "";

//initially draw and erase would be false
let draw = false;
let erase = false;

//detect touch devices
const isTouchDevice = () => {
    try {
        //we try to create TouchEvent objects
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    }
    catch (e) {
        deviceType = "mouse";
        return false;
    }
};

isTouchDevice();

//create grid
gridButton.addEventListener("click", () => {
    //initially clear the gride would
    container.innerHTML = "";
    //count variable for genrating unique ids
    let count = 0;
    //loop for creating rows
    for(let i = 0; i < gridHeight.value; i++){
        count += 2;
        //creating row div
        let div = document.createElement("div");
        div.classList.add("gridRow");
        //create columns
        for(let j = 0; j < gridWidth.value; j++){
            count += 2;
            let col = document.createElement("div");
            col.classList.add("gridCol");
            //we need unique ids for all columns(for touch screen devices)
            col.setAttribute("id", `gridCol${count}`);
            //for eg if deviceType = "mouse" the statement for that event would be events[mouse]}}  and for touch devices it would be events[touch]
              
            col.addEventListener(events[deviceType].down, () => {
                //user starts drawing
                draw = true;
                //if user wants to erase
                if(erase){
                    col.style.backgroundColor = "transparent";
                }
                else {
                    col.style.backgroundColor = colorButton.value;
                }
            });

            col.addEventListener(events[deviceType].move, (e) => {
                /* elementFromPoint returns the elemet at x,y coordinates */
                let elementId = document.elementFromPoint(
                    !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY : e.touches[0].clientY
                    ).id;
                    //checks if the element is a gridCol
                    checker(elementId);
                });
            col.addEventListener(events[deviceType].up, () => {
                draw = false;
            });
            div.appendChild(col);

        }
        container.appendChild(div);
    }
});
function checker(elementId){
    let gridColums = document.querySelectorAll(".gridCol");
    //llop through all boxes and check if the id matches
    gridColums.forEach(element => {
        //if id matches then color
        if(elementId == element.id){
            if(draw && !erase){
                element.style.backgroundColor = colorButton.value;
            } else if (draw && erase){
                element.style.backgroundColor = "transparent";
            }
        }
    });
}

//clear grid
clearGridButton.addEventListener("click", () => {
    container.innerHTML = "";

});
//erase button
eraseBtn.addEventListener("click", () => {
    erase = true;
});
//paint button
paintBtn.addEventListener("click", () => {
    erase = false;
});
//change width
gridWidth.addEventListener("input", () => {
    widthValue.innerHTML = gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
});
//change height
gridHeight.addEventListener("change", () => {
    heightValue.innerHTML = gridHeight.value;
});

window.onload = () => {
    gridWidth.value = 0;
    gridHeight.value = 0;
};
