/*
** Mandelbrot Set
* Cristian Rojas Cardenas, April 2022
* 
    Z0 = 0
    Zn+1 = Zn^2 + c

*/


function setup(){
    createCanvas(720, 400);
    pixelDensity(1);
    loadPixels();
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            
            var a = map(i, 0, width, -2, 2);
            var b = map(j, 0, height, -2, 2);

            var ca = a;
            var cb = b;

            var n = 0;

            while (n < 100){
                var real = a*a - b*b;
                var imag = 2*a*b;

                a = real + ca;
                b = imag + cb;

                var real = a*a - b*b;
                var imag = 2*a*b;

                a = real + ca;
                b = imag + cb;
                
                if (abs(a + b) > 16){
                    break;
                }
                n++;
            }
            

            var bright = 0;
            if (n==100){
                bright=255;
            }


            var pixel = 4*(i + j*width);
            pixels[pixel] = bright;
            pixels[pixel+1] = bright;
            pixels[pixel+2] = bright;
            pixels[pixel+3] = 255;
        }
    }
    updatePixels();
}

function draw(){

}