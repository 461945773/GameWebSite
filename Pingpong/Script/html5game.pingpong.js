var KEY = {
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83
}

var pingpong = {
    scoreA: 0,
    scoreB: 0
}
pingpong.pressedKeys = [];
pingpong.ball = {
    speed: 5,
    x: 150,
    y: 100,
    directionX: 1,
    directionY: 1,
    count: 0
}

$(function() {
    pingpong.timer = setInterval(gameloop, 30);
    $(document).keydown(function(e) {
        pingpong.pressedKeys[e.which] = true;
    });
    $(document).keyup(function(e) {
        pingpong.pressedKeys[e.which] = false;
    });
});

function setSpeed() {
    if ($("#speed").val() != "")
        pingpong.ball.speed = $("#speed").val();
}

function gameloop() {
    movePaddles();
    moveBall();
}

function movePaddles() {
    if (pingpong.pressedKeys[KEY.UP]) {
        var top = parseInt($("#paddleB").css("top"));
        if (top > 0) {
            $("#paddleB").css("top", top - 5);
        }
    }
    if (pingpong.pressedKeys[KEY.DOWN]) {
        var top = parseInt($("#paddleB").css("top"));
        if (top < 130) $("#paddleB").css("top", top + 5);
    }
    if (pingpong.pressedKeys[KEY.W]) {
        var top = parseInt($("#paddleA").css("top"));
        if (top > 0) $("#paddleA").css("top", top - 5);
    }
    if (pingpong.pressedKeys[KEY.S]) {
        var top = parseInt($("#paddleA").css("top"));
        if (top < 130) $("#paddleA").css("top", top + 5);
    }
}
pingpong.ball.nextX = function() {
    return pingpong.ball.speed * pingpong.ball.directionX + pingpong.ball.x;
}
pingpong.ball.nextY = function() {
    return pingpong.ball.y + pingpong.ball.speed * pingpong.ball.directionY;
}

function moveBall() {
    var playgroundHeight = parseInt($("#playground").height());
    var playgroundWidth = parseInt($("#playground").width());
    var ball = pingpong.ball;

    if (ball.y + ball.speed * ball.directionY > playgroundHeight) {
        ball.directionY = -1;
    }
    if (ball.y + ball.speed * ball.directionY < 0) {
        ball.directionY = 1;
    }
    if (ball.x + ball.speed * ball.directionX > playgroundWidth) {
        ball.x = 250;
        ball.y = 100;
        $("#ball").css({
            "left": ball.x,
            "top": ball.y
        });
        ball.directionX = -1;
        pingpong.scoreA++;
        $("#scoreA").html(pingpong.scoreA);
        ball.speed = 0;
        ball.count = 0;
        setTimeout(function() {
            ball.speed = 5;
        }, 500);
    }
    if (ball.x + ball.speed * ball.directionX < 0) {
        ball.x = 150;
        ball.y = 100;
        $("#ball").css({
            "left": ball.x,
            "top": ball.y
        });
        ball.directionX = 1;
        pingpong.scoreB++;
        $("#scoreB").html(pingpong.scoreB);
        ball.speed = 0;
        ball.count = 0;
        setTimeout(function() {
            ball.speed = 5;
        }, 500);
    }
    var paddleAx = parseInt($("#paddleA").css("left")) + parseInt($("#paddleA").css("width"));
    var paddleAYBottom = parseInt($("#paddleA").css("top")) + parseInt($("#paddleA").css("height"));
    var paddleAYTop = parseInt($("#paddleA").css("top"));
    if (ball.nextX() <= paddleAx && ball.x >= paddleAx) {
        if (ball.nextY() <= paddleAYBottom && ball.nextY() >= paddleAYTop) {
            ball.directionX = 1;
            ball.count++;
        }
    }
    var paddleBx = parseInt($("#paddleB").css("left")) - 1 / 2 * parseInt($("#paddleB").css("width"));
    var paddleBYBottom = parseInt($("#paddleB").css("top")) + parseInt($("#paddleB").css("height"));
    var paddleBYTop = parseInt($("#paddleB").css("top"));
    if (ball.nextX() >= paddleBx && ball.x <= paddleBx) {
        if (ball.nextY() <= paddleBYBottom && ball.nextY() >= paddleBYTop) {
            ball.directionX = -1;
            ball.count++;
        }
    }
    if (ball.count >= 3) {
        ball.speed++;
        ball.count = 0;
    }
    $("#showspeed").html(ball.speed);
    ball.x += ball.speed * ball.directionX;
    ball.y += ball.speed * ball.directionY;
    $("#ball").css({
        "left": ball.x,
        "top": ball.y
    });
}