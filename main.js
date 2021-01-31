let flocks = [];

let flockCount = 100;

function setup()
{
    createCanvas(400, 400);
    for (var i = 0; i < flockCount; i++)
    {
        flocks.push(new Flock(new p5.Vector(random(0, width), random(0, height))));
    }
}

function draw()
{
    background(100);
    strokeWeight(5);
    stroke(235, 171, 52);
    flocks.forEach((flock, i) =>
    {
        flock.update();
        flock.draw();
    });
}