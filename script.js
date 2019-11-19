let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

let mousePosition = {
    x: undefined,
    y: undefined
}

const maxRadius = 40;
const colorPalette = ['#C85B6C', '#FE7568', '#FCCA6C', '#9EDBCC', '#548FCC'];

document.addEventListener('mousemove', event => {
    mousePosition.x = event.x;
    mousePosition.y = event.y;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log('asdasdasdasdas');
    init();
});

class Circle {
    constructor(props) {
        this.x = props.x;
        this.y = props.y;
        this.dx = props.dx;
        this.dy = props.dy;
        this.radius = props.radius;
        this.minRadius = props.radius;
        this.color = props.color;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    update() {
        this.draw(); 
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        if(mousePosition.x - this.x < 50 && mousePosition.x - this.x > -50 &&
            mousePosition.y - this.y < 50 && mousePosition.y - this.y > -50
            ) {
                if(this.radius <= maxRadius) {
                    this.radius++;
                }
        } else if(this.radius > this.minRadius) {
            this.radius--;
        }
    }
}

let circleArray = [];

function init() {
    circleArray = [];
    for(let i=0; i<1000; i++) {
        circleArray.push(new Circle({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            dx: Math.random() * 3,
            dy: Math.random() * 3,
            radius: Math.random() * 4 + 2 ,
            color: colorPalette[Math.round(Math.random() * colorPalette.length)]
        }));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    circleArray.forEach(circle => {
        circle.update();
    });
}

init();
animate();