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
*                     Z1 = a + i*b                          
*                     Z2 = (a^2 – b^2) +i*(2*a*b) + c		
*                     Z3 = …..
* 
* For some complex numbers (Z), the Mandelbrot function is bounded, and it converges
* after several iterations, this set of numbers is the Mandelbrot set. Then, we can
* choose a value to measure the level of convergence for each Z value, this number 
* is called the infinity value. The Mandelbrot function is applied until it reaches 
* the infinity value, then the number of iterations required to reach the infinity 
* value (x) determines the area to which the pixel belongs. For this implementation, 
* the infinity value is set to 16.
* 
*/

let c1;
let c2;


let settings = { 
    Generate: function(){ init(); },
    max_iterations: 100,
    infinity_value: 16,
    gray_scale: false,
    
}

function gui(){
    // Adding the GUI menu
    var gui = new dat.GUI();
    gui.width = 150;
    gui.add(settings,'Generate');
    gui.add(settings,'max_iterations', 10, 200).step(1);
    gui.add(settings,'infinity_value', 1, 100).step(1);
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

    c1 = color(0, 0, 139);
    c2 = color(255, 255, 255);
    
    
    loadPixels();
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) { 
            n =  maldelbrot(i, j);
            n_color = getColor(n);
            setPixels(i, j, n_color.levels);
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
        if (dist(a, b, 0, 0) > settings.infinity_value){
            break;
        }
        n++;
    }

    return n
}

function getColor(n){

    var factor = map(n, 0, settings.max_iterations, 0, 1);
    if(settings.gray_scale){
        bright = map(sqrt(factor), 0, 1, 0, 255);
        n_color = color(bright, bright, bright);
    } 
    else{
        if(n==settings.max_iterations) n_color = color(0, 0, 0);
        else n_color = lerpColor(c2, c1, 1/(8**factor));
    }

    return n_color;
}

function setPixels(i, j, color){
    var pixel = 4*(i + j*width);
    pixels[pixel] = color[0];
    pixels[pixel+1] = color[1];
    pixels[pixel+2] = color[2];
    pixels[pixel+3] = 255;
}

