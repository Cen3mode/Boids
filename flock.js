class Flock
{
    constructor(_pos = new p5.Vector(), _vel = new p5.Vector(), _acc = new p5.Vector())
    {
        this.pos = _pos;
        this.vel = _vel;
        this.acc = _acc;
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