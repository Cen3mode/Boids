let range = 20;

class Flock
{
    constructor(_pos = new p5.Vector(), _vel = new p5.Vector(), _acc = new p5.Vector())
    {
        this.pos = _pos;
        this.vel = _vel;
        this.acc = _acc;
    }

    inRange(otherFlock)
    {
        if (this.pos.dist(otherFlock.pos))
        {
            let separation = new p5.Vector().sub(otherFlock.pos, this.pos);
        }
    }

    update()
    {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    draw()
    {
        point(this.pos.x, this.pos.y);
    }
}