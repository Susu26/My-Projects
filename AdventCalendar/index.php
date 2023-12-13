<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Creepster&family=DM+Sans:ital,opsz,wght@0,9..40,100;0,9..40,200;0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,100;1,9..40,200;1,9..40,300;1,9..40,400;1,9..40,500;1,9..40,600&family=Rubik+Vinyl&family=Zilla+Slab:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./style.css">
    <script src="./js/arrayData.js" defer></script>
    <script src="./js/script.js" defer></script>
    <title>Advent-Calendar</title>
</head>

<body onmouseenter="play()">


        <audio loop= 'true'>
            <source src="./music/backgroundMusic.mp3" type="audio/mp3">
        </audio>

    <div id="sticky-btn" onclick="toggle()">
                <span>?</span>
    </div>

    <div id="Popup">
        <div id="sticky-btn2" onclick="toggle()">
            <span>X</span>
        </div>
        <center><h1>WHAT IS THIS CALENDAR ABOUT?</h1></center>
        <p>Step into a world of enchantment and whimsy with our Ghibli Advent Calendar! Behind each door lies a cinematic masterpiece from the renowned Studio Ghibli, ready to transport you to fantastical realms filled with magic, friendship, and unforgettable journeys. Unwrap the joy of spirited adventures, heartwarming tales, and breathtaking animation as you countdown to the holidays. Whether you're captivated by the charm of Totoro, embarking on a magical quest with Howl's Moving Castle, or diving into the underwater wonders of Ponyo, each film promises a delightful escape into the imagination. Let the spirit of Ghibli illuminate your holiday season, one film at a time, creating memories that will linger long after the final door is opened. Get ready to rediscover the joy of storytelling and animation with the Ghibli Advent Calendar – where every day is a new portal to a world of cinematic wonder!</p>
    </div>

   

    <div class="snow"></div>
    
    <div id="containerWhole">
       

        <h1 id="header" >Ghibli Magic in Advent</h1>
    
        <div class="container" id="gridContainer">
        
        </div>

        <div id=Popup2></div>
        
    </div>

    

    </body>
</html>
