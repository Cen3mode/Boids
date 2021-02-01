let flocks = [];

let flockCount = 50;

let showCG;
let showSF;
let showAF;
let showCF;

function setup()
{
    createCanvas(400, 400);

    let showCG = createCheckbox("Show CG", false);
    let showSF = createCheckbox("Show separetion force", false);
    let showAF = createCheckbox("Show alignment force", false);
    let showCF = createCheckbox("Show cohesion force", false);

    for (var i = 0; i < flockCount; i++)
    {
        flocks.push(new Flock(new p5.Vector(random(0, width), random(0, height)), new p5.Vector(random(-1, 1), random(-1, 1)), showCG, showSF, showAF, showCF));
    }
}

function draw()
{
    background(100);
    strokeWeight(1);
    stroke(235, 171, 52);
    flocks.forEach((flock, i) =>
    {
        flocks.forEach((other, j) =>
        {
            if (j != i)
            {
                flock.inRange(other);
            }
        });

        flock.update();
        flock.draw();
    });
}