
//setup socket connection

var socket = io.connect('http://localhost:5999');

/* Game namespace */
var game = {

    network : {
        "login" : function () {
            var username = $('#username').val();
            var password = $('#pass').val();
            socket.emit('login', username, password);
        },
    },

    // an object where to store game information
    data : {
        username : null,
        socketid : null,
    },


    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(960, 540, {wrapper : "screen", scale : "auto", scaleMethod : "stretch"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // add "#debug" to the URL to enable the debug Panel
        if (me.game.HASH.debug === true) {
          window.onReady(function () {
            me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
          });
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        //gravity free
        me.sys.gravity = 0;

        // set and load all resources.
        // (this will also automatically switch to the loading screen)
        me.loader.preload(game.resources, this.loaded.bind(this));

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },

    // Run on game resources loaded.
    "loaded" : function () {


        //on connect, create a new user and prompt for username

        socket.on('connect', function(){
          socket.emit('confirmConnection', socket.id);
          console.log(socket.id)
        });

        me.state.set(me.state.MENU, new game.LoginScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());

        // add our player entity in the entity pool
        me.pool.register("mainPlayer", game.PlayerEntity);

        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");

        // Start the game.
        me.state.change(me.state.MENU);
    }
};
