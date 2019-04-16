export class Statistics {
    constructor(parent = document.body, width, height, imgSrc, alpha = 1, color = "white") {
        //      CANVAS
        this.canvas = document.createElement("canvas");
        this.canvas.style.height = height;
        this.canvas.style.width = width;
        this.canvas.style.position = "absolute";
        this.canvas.style.top = "0%";
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        //      CTX
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingQuality = "high";
        this.ctx.globalAlpha = alpha;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'bottom';




        //      OWN PROPERTYS
        this.parent = parent;
        this.x = this.canvas.width;
        this.y = Math.round(this.canvas.height / 2 * 1.1);
        // time position
        this.timeLeft = Math.round(this.x * .10);
        this.timeRight = Math.round(this.x * .35);
        // score position
        this.scoreLeft = Math.round(this.x * .41);
        this.scoreRight = Math.round(this.x * .6);
        //chances position
        this.chanceLeft = Math.round(this.x * .65);
        this.chanceRight = Math.round(this.x * .85);

        this.ms = "00";
        this.min = "00";
        this.date = undefined;
        this.score = 0;
        this.chance = 0;

        this.img = new Image();
        this.imgSrc = imgSrc;

        this.load = (src = this.imgSrc) => {
            // new img?
            this.imgSrc = src;
            this.img.src = src;
        };

        // appendTo()
        this.appendTo = (parent = this.parent) => {
            // new parent?
            this.parent = parent;
            // append with div
            this.parent.appendChild(this.canvas);
            // append statistic menu


            // CTX display table background
            this.load();
            this.render();

        };

        this.timer = () => {
            this.date = new Date();
        };

        this.update = () => {
            if (this.date) {
                this.ms = Math.abs(this.ms - this.date.getMinutes());
                console.log(Math.abs(this.ms - this.date.getMinutes()));

            }
        };
        this.render = () => {

            this.ctx.drawImage(this.img, 0, 0, this.x, this.canvas.height);
            this.ctx.font = "22px Courier";
            this.ctx.fillText("🕒" + this.min + ":" + this.ms, this.timeLeft, this.y, this.timeRight);
            this.ctx.fillText("★" + this.score, this.scoreLeft, this.y, this.scoreRight);
            this.ctx.fillText("⏳" + this.chance, this.chanceLeft, this.y, this.chanceRight);

            this.update();
            requestAnimationFrame(this.render);
        };



        console.log(this.canvas);
    }
}