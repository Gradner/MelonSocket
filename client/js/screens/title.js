game.LoginScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.levelDirector.loadLevel("login");

        this.loginForm = new game.guiMenu("250", "200", "40%", "40%", "login", 24);

        console.log(game.LoginScreen)

        socket.on('completeLogin', function (username, socketid){
          game.data.username = username;
          game.data.socketid = socketid;
          me.state.change(me.state.PLAY);
        })
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        this.loginForm.destroy(); // TODO
    },
});
