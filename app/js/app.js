// Enemies our player must avoid
var Enemy = function() {
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = 0;
    this.speed = 0;
};

Enemy.prototype.tracks = [58, 141, 224];
Enemy.prototype.restart = function() {
    this.speed = Math.floor(Math.random()*100) + 200;
    this.y = this.tracks[Math.floor(Math.random()*3)];
    this.x = -100;
    return this;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;
    this.collisions();
    if (this.x >= 501) this.restart();
};

Enemy.prototype.height = 70;
Enemy.prototype.width = 80;

Enemy.prototype.collisions = function() {
    // check if collision exists
    if (Math.abs(Math.max(this.x, this.x + this.width, player.x, player.x + player.width) - Math.min(this.x, this.x + this.height, player.x, player.x + player.width)) <= this.width + player.width &&
        Math.abs(Math.max(this.y, this.y + this.height, player.y, player.y + player.height) - Math.min(this.y, this.y + this.width, player.y, player.y + player.height)) <= this.height + player.height
    ) {
        player.fail();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.wins = 0;
    this.fails = 0;
    Player.prototype.reset.call(this);
};

Player.prototype.height = 80;
Player.prototype.width = 70;

//set timeout before game reload
Player.prototype.update = function(){
    if (this.y <= 0 && !this.isSuccess) {
        this.isSuccess = true;
        var self = this;
        setTimeout(function () {
            self.success();
        }, 500);
    }
};

Player.prototype.success = function(){
    this.wins++;
    this.reset();
};

Player.prototype.fail = function(){
    this.fails++;
    this.reset();
};

Player.prototype.reset = function(){
    this.x = 200;
    this.y = 390;
    this.isSuccess = false;
};

Player.prototype.render = function(){
    ctx.fillStyle = '#fff';
    ctx.fillRect(0,0,505,50);
    ctx.fillStyle = '#00f';
    ctx.font = 'bold 20px Arial';
    ctx.fillText("Wins: " + this.wins, 20, 20);
    ctx.fillStyle = '#F00';
    ctx.fillText("Fails: " + this.fails, 20, 40);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction){
    var move_x_len = 100;
    var move_y_len = 83;
    var min_x = 0;
    var min_y = 0;
    var max_x = 400;
    var max_y = 380;
    if (direction === 'up') {
        if (this.y > min_y)
            this.y -= move_y_len;
    } else if (direction === 'down') {
        if (this.y < max_y)
            this.y += move_y_len;
    } else if (direction === 'left') {
        if (this.x > min_x)
            this.x -= move_x_len;
    } else if (direction === 'right') {
        if (this.x < max_x)
            this.x += move_x_len;
    }

    console.log(this);
};

var allEnemies = [
    new Enemy().restart(),
    new Enemy().restart(),
    new Enemy().restart()
];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});