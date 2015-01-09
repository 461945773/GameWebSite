var matchingGame = {};
matchingGame.deck = [
    'cardAK', 'cardAK',
    'cardAQ', 'cardAQ',
    'cardAJ', 'cardAJ',
    'cardBK', 'cardBK',
    'cardBQ', 'cardBQ',
    'cardBJ', 'cardBJ',
];

$(function() {
    matchingGame.deck.sort(shuffle);

    for (var i = 0; i < 11; i++) {
        $(".card:first-child").clone().appendTo("#cards");
    }
    $("#cards").children().each(function(index) {
        $(this).css({
            "left": ($(this).width() + 20) * (index % 4),
            "top": ($(this).height() + 20) * Math.floor(index / 4)
        });

        var pattern = matchingGame.deck.pop();
        $(this).find(".back").addClass(pattern);
        $(this).attr("data-pattern", pattern);
        $(this).click(selectCard);
    });
});

function selectCard() {
    // we do nothing if there are already two card flipped.
    if ($(".card-flipped").size() > 1) {
        return;
    }

    // add the class "card-flipped".
    // the browser will animate the styles between current state and card-flipped state.
    $(this).addClass("card-flipped");

    // check the pattern of both flipped card 0.7s later.
    if ($(".card-flipped").size() == 2) {
        setTimeout(checkPattern, 700);
    }
}

function checkPattern() {
    if (isMatchPattern()) {
        $(".card-flipped").removeClass("card-flipped").addClass("card-removed");
        // delete the card DOM node after the transition finished.
        $(".card-removed").bind("webkitTransitionEnd", removeTookCards);
    } else {
        $(".card-flipped").removeClass("card-flipped");
    }
}


function shuffle() {
    return 0.5 - Math.random();
}

function removeTookCards() {
    $(".card-removed").remove();
}

// a function to check if the flipped card match the pattern.
function isMatchPattern() {
    var cards = $(".card-flipped");
    var pattern = $(cards[0]).data("pattern");
    var anotherPattern = $(cards[1]).data("pattern");
    return (pattern == anotherPattern);
}

function removeTookCards() {
    $(".card-removed").remove();
}

// a function to check if the flipped card match the pattern.
function isMatchPattern() {
    var cards = $(".card-flipped");
    var pattern = $(cards[0]).data("pattern");
    var anotherPattern = $(cards[1]).data("pattern");
    return (pattern == anotherPattern);
}