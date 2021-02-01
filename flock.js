let vectorThickness = 1;

let range = 20;

let speed = 2;

let alignmentLimit = 0.009;
let separationLimit = 0.007;
let cohesionLimit = 0.007;

class Flock
{
    constructor(_pos = new p5.Vector(), _vel = new p5.Vector(), showCG, showSF, showAF, showCF)
    {
        this.pos = _pos;
        this.vel = _vel;
        this.acc = new p5.Vector();

        this.showCG = showCG;
        this.showSF = showSF;
        this.showAF = showAF;
        this.showCF = showCF;

        this.flockmates = [];
    }

    inRange(otherFlock)
    {
        if (this.pos.dist(otherFlock.pos) < range)
        {
            this.flockmates.push(otherFlock);
        }
    }

    update()
    {

        let centerOfMass = createVector();
        let desiredDirection = createVector();

        this.flockmates.forEach((flockmate, i) =>
        {
            let separation = p5.Vector.sub(this.pos, flockmate.pos);

            separation.limit(separationLimit);

            if (this.showSF.checked())
            {
                push()
                translate(this.pos.x, this.pos.y);
                strokeWeight(vectorThickness);
                stroke(104, 171, 247)
                line(0, 0, separation.x * 5000, separation.y * 5000);
                translate(separation.x * 5000, separation.y * 5000);
                rotate(separation.heading() - PI / 2);
                triangle(0, 3, -2, -1, 2, -1);
                pop()
            }

            this.acc.add(separation);

            centerOfMass.add(flockmate.pos);
            desiredDirection.add(flockmate.vel);
        });

        if (this.flockmates.length != 0)
        {
            centerOfMass.div(this.flockmates.length);
            desiredDirection.div(this.flockmates.length);
        }

        if (this.showCG.checked())
        {
            strokeWeight(6);
            stroke(0);
            point(centerOfMass.x, centerOfMass.y);
        }

        let cohesion = createVector();
        let alignment = createVector();

        if (this.flockmates.length != 0)
        {
            cohesion = p5.Vector.sub(centerOfMass, this.pos);
            cohesion.limit(cohesionLimit);

            alignment = p5.Vector.sub(desiredDirection, this.vel);
            alignment.setMag(speed);
            alignment.limit(alignmentLimit);

            if (this.showCF.checked())
            {
                stroke(255, 0, 0);
                push();
                strokeWeight(vectorThickness);
                translate(this.pos.x, this.pos.y);
                line(cohesion.x * 5000, cohesion.y * 5000, 0, 0);
                translate(cohesion.x * 5000, cohesion.y * 5000);
                rotate(cohesion.heading() - PI / 2);
                triangle(0, 3, -2, -1, 2, -1);
                pop();
            }

            if (this.showAF.checked())
            {
                push();
                translate(this.pos.x, this.pos.y);
                strokeWeight(vectorThickness);
                stroke(204, 84, 255);
                line(0, 0, alignment.x * 5000, alignment.y * 5000);
                translate(alignment.x * 5000, alignment.y * 5000);
                rotate(alignment.heading() - PI / 2);
                triangle(0, 3, -2, -1, 2, -1);
                pop();
            }

            this.acc.add(alignment);
            this.acc.add(cohesion);
        }


        this.vel.add(this.acc);
        this.vel.limit(speed);
        this.pos.add(this.vel);
        if (this.pos.x > width)
        {
            this.pos.x -= width;
        }
        else if (this.pos.x < 0)
        {
            this.pos.x += width;
        }
        else if (this.pos.y > height)
        {
            this.pos.y -= height;
        }
        else if (this.pos.y < 0)
        {
            this.pos.y += height;
        }
        this.acc.mult(0);
        this.flockmates = [];
    }

    draw()
    {
        push();
        strokeWeight(2);
        stroke(235, 171, 52);
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading() - PI / 2);
        triangle(0, 10, -5, -5, 5, -5);
        pop();
    }
}