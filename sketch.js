/*
** Mandelbrot Set
* Cristian Rojas Cardenas, April 2022
* Algorithm based on the tutorial of Daniel Shiffman.
* See the video here: 
* https://www.youtube.com/watch?v=6z7GQewK-Ks
* 
* The algorithm operates under a grid of complex numbers, the width representing
* the real axis and the height the imaginary axis. The algorithm loops over the 
* points in the grid to operate the next function:
* 
* 					Z0 = 0
* 					Zn+1 = Zn^2 + c
* 
* This function is computed a set number of iterations to generate the value of 
* each point (pixel), the calculation is initialized with Z null and c equal to 
* the point in complex form. For instance, if we are in the pixel (a, b)
* 					
*                     Z0 = 0    c = a + i*b
*                     Z1 = a + i*b                          a+b>x?
*                     Z2 = (a^2 – b^2) +i*(2*a*b) + c		a+b>x?
*                     Z3 = …..
* 
* The mandelbrot function continues being applied until it reaches the infinity 
* value, depending on the number of iterations required to reach the infinity 
* value (x) is selected the area for which the pixel belongs. For this 
* implementation, the infinity value is set to 16. 
* 
*/


let settings = { 
    Generate: function(){ init(); },
    max_iterations: 100,
    gray_scale: false,
}

function gui(){
    // Adding the GUI menu
    var gui = new dat.GUI();
    gui.width = 150;
    gui.add(settings,'Generate');
    gui.add(settings,'max_iterations', 10, 1000).step(1);
    gui.add(settings,'gray_scale');
}


function setup(){
    gui();
    createCanvas(720, 400);
    pixelDensity(1);
    init();
}



function init(){
    background(0);
    colors = {};
    if(!settings.gray_scale) colors[settings.max_iterations] = {r:0, g:0, b:0}
    loadPixels();
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) { 
            n =  maldelbrot(i, j);
            color = getColor(n);
            setPixels(i, j, color);
        }
    }
    updatePixels();
}

function draw(){}

function maldelbrot(i, j){

    // The grid reference is translated and scaled
    var a = map(i, 0, width, -2.5, 1.5);
    var b = map(j, 0, height, -1.5, 1.5);

    // C takes the value of the current point
    var ca = a;
    var cb = b;

    // Iterations counter
    var n = 0;

    while (n < settings.max_iterations){

        // Z^2
        var real = a*a - b*b;
        var imag = 2*a*b;

        // Zn+1 = Zn + c
        a = real + ca;
        b = imag + cb;

        // The process continues until it reachs the infinity value set as 16.
        // The area that points belong depends on how fast it reachs the infinity
        // value 
        if (abs(a + b) > 16){
            break;
        }
        n++;
    }

    return n
}

function getColor(n){
    var area = n;

    if(settings.gray_scale){
        var bright = map(n, 0, settings.max_iterations, 0, 1);
        bright = map(sqrt(bright), 0, 1, 0, 255);
        color = {r:bright, g:bright, b:bright};
    } 
    else{
        if (area in colors) color = colors[area];
        else{ 
            color = {r:random(0,255), g:random(0,255), b:random(0,255)};
            colors[area] = color;
        }    
    }

    return color;
}

function setPixels(i, j, color){
    var pixel = 4*(i + j*width);
    pixels[pixel] = color.r;
    pixels[pixel+1] = color.g;
    pixels[pixel+2] = color.b;
    pixels[pixel+3] = 255;
}

