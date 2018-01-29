// GUI Elements called as HTML over canvas

// Login Form at title screen

game.guiMenu = me.Renderable.extend({
  init : function (w, h, x, y, type) {

        switch (type){
          case "login":
            contents = "<p>Please Sign In</p><input id='username' type='text' placeholder='username'></input><br><input id='pass' type='password' placeholder='password'></input><br><input type='button' value='Login' onclick='game.network.login()'></input>"
            break;
        }

        this.$menuBox = $("<div class='menu " + type + "'>" + contents + "</div>").css({
            "left" : x,
            "top" : y,
            "width" : w,
            "height" : h
        });

        $("#screen").append(this.$menuBox);
    },

    destroy : function () {
        this.$menuBox.remove();
    }
})
