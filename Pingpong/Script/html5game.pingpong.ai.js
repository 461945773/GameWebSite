var KEY = {
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83
}



keyEvent = {
    UP: function() {
        pingpong.pressedKeys[KEY.DOWN] = false;
        pingpong.pressedKeys[KEY.UP] = true;
    },

    DOWN: function() {
        pingpong.pressedKeys[KEY.UP] = false;
        pingpong.pressedKeys[KEY.DOWN] = true;
    },

    W: function() {
        pingpong.pressedKeys[KEY.S] = false;
        pingpong.pressedKeys[KEY.W] = true;
    },

    S: function() {
        pingpong.pressedKeys[KEY.W] = false;
        pingpong.pressedKeys[KEY.S] = true;
    }
}

function expectPos(e) {
    var LookAheadDistance = Math.abs(pingpong.ball.x - parseInt($(e).css("left")));
    if (e == "#paddleA") {
        LookAheadDistance -= parseInt($("#paddleA").width());
    }
    var Pos = pingpong.ball.y + LookAheadDistance * pingpong.ball.directionY;
    Pos = rebound(Pos);
    return Pos;
}

function rebound(Pos) {
    var loop = true;
    while (loop) {
        loop = false;
        if (Pos < 0) {
            Pos = Math.abs(Pos);
            loop = true;
        }
        if (Pos > parseInt($("#playground").height())) {
            Pos = 2 * parseInt($("#playground").height()) - Pos;
            loop = true;
        }
    }
    return Pos
}

function highExPos(e) {
    if (e == "#paddleA") {
        if (pingpong.ball.directionX == 1) {
            var dy = pingpong.ball.directionY;
                var LookAheadDistance = Math.abs(pingpong.ball.x - parseInt($(e).css("left")));
                LookAheadDistance -= parseInt($("#paddleA").width());
                var pos = pingpong.ball.y + LookAheadDistance * pingpong.ball.directionY;
            if(pos<0||pos>parseInt($("#playground").height()))dy = -dy;
            var Pos = expectPos("#paddleB") + dy * (parseInt($("#paddleB").css("left")) - parseInt($("#paddleA").css("left")) - parseInt($("#paddleA").width()));
        } else {
            var Pos = expectPos("#paddleA");
        }
    }
    if (e == "#paddleB") {
        if (pingpong.ball.directionX == -1) {
                var dy = pingpong.ball.directionY;
                var LookAheadDistance = Math.abs(pingpong.ball.x - parseInt($(e).css("left")));
                var pos = pingpong.ball.y + LookAheadDistance * pingpong.ball.directionY;
            if(pos<0||pos>parseInt($("#playground").height()))dy = -dy;
            var Pos = expectPos("#paddleA") + dy * (parseInt($("#paddleB").css("left")) - parseInt($("#paddleA").css("left")) - parseInt($("#paddleA").width()));
        } else {
            var Pos = expectPos("#paddleB");
        }
    }
    Pos = rebound(Pos);
     console.log(e,pingpong.ball.directionX,Pos);
    return Pos;
}

function AiA() {
    if (parseInt($("#paddleA").css("top")) + 1 / 2 * parseInt($("#paddleA").height()) >= highExPos("#paddleA") - 2.5 && parseInt($("#paddleA").css("top")) + 1 / 2 * parseInt($("#paddleA").height()) <= highExPos("#paddleA") + 2.5) {
        pingpong.pressedKeys[KEY.W] = false;
        pingpong.pressedKeys[KEY.S] = false;
    } else if (parseInt($("#paddleA").css("top")) + 1 / 2 * parseInt($("#paddleA").height()) > highExPos("#paddleA") + 2.5) {
        keyEvent.W();
    } else {
        keyEvent.S();
    }
}

function AiB() {
    if (parseInt($("#paddleB").css("top")) + 1 / 2 * parseInt($("#paddleB").height()) >= highExPos("#paddleB") - 2.5 && parseInt($("#paddleB").css("top")) + 1 / 2 * parseInt($("#paddleB").height()) <= highExPos("#paddleB") + 2.5) {
        pingpong.pressedKeys[KEY.UP] = false;
        pingpong.pressedKeys[KEY.DOWN] = false;
    } else if (parseInt($("#paddleB").css("top")) + 1 / 2 * parseInt($("#paddleB").height()) > highExPos("#paddleB") + 2.5) {
        keyEvent.UP();
    } else {
        keyEvent.DOWN();
    }
}

function AI() {
    if($("#AIA").is(":checked"))AiA();
    if($("#AIB").is(":checked"))AiB();
}
$(function() {
    var aiTimer = setInterval(AI, 30);
});