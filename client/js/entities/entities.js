/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend({

    /**
     * constructor
     */
    init:function (x, y, settings) {
        // call the constructor
        this._super(me.Entity, 'init', [x, y , settings]);

        this.body.setVelocity(2, 2);

        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        this.travelDir = 'down'

        this.alwaysUpdate = true;

        this.renderable.addAnimation("walk_u", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
        this.renderable.addAnimation("walk_l", [9, 10, 11, 12, 13, 14, 15, 16, 17]);
        this.renderable.addAnimation("walk_d", [18, 19, 20, 21, 22, 23, 24, 25, 26]);
        this.renderable.addAnimation("walk_r", [27, 28, 29, 30, 31, 32, 33, 34, 35]);

        this.renderable.addAnimation("stand_u", [0]);
        this.renderable.addAnimation("stand_l", [9]);
        this.renderable.addAnimation("stand_d", [18]);
        this.renderable.addAnimation("stand_r", [27]);

        this.renderable.setCurrentAnimation("stand_d");

    },

    /**
     * update the entity
     */
    update : function (dt) {

        if(me.input.isKeyPressed('left')) {
          this.body.vel.x -= this.body.accel.x * me.timer.tick;
          this.travelDir = 'left';
        } else if(me.input.isKeyPressed('right')) {
          this.body.vel.x += this.body.accel.x * me.timer.tick;
          this.travelDir = 'right'
        } else {
          this.body.vel.x = 0;
        }

        if(me.input.isKeyPressed('up')) {
          this.body.vel.y -= this.body.accel.y * me.timer.tick;
          this.travelDir = 'up';
        } else if(me.input.isKeyPressed('down')) {
          this.body.vel.y += this.body.accel.y * me.timer.tick;
          this.travelDir = 'down';
        } else {
          this.body.vel.y = 0;
        }

        if(this.body.vel.y != 0 || this.body.vel.x != 0){
          if(this.travelDir == 'left' && !this.renderable.isCurrentAnimation('walk_l')){
            this.renderable.setCurrentAnimation('walk_l')
          }
          if(this.travelDir == 'up' && !this.renderable.isCurrentAnimation('walk_u')){
            this.renderable.setCurrentAnimation('walk_u')
          }
          if(this.travelDir == 'right' && !this.renderable.isCurrentAnimation('walk_r')){
            this.renderable.setCurrentAnimation('walk_r')
          }
          if(this.travelDir == 'down' && !this.renderable.isCurrentAnimation('walk_d')){
            this.renderable.setCurrentAnimation('walk_d')
          }
        }

        if(this.body.vel.y == 0 && this.body.vel.x == 0){
          if(this.travelDir == 'left'){
            this.renderable.setCurrentAnimation('stand_l')
          }
          if(this.travelDir == 'up'){
            this.renderable.setCurrentAnimation('stand_u')
          }
          if(this.travelDir == 'right'){
            this.renderable.setCurrentAnimation('stand_r')
          }
          if(this.travelDir == 'down'){
            this.renderable.setCurrentAnimation('stand_d')
          }
        }

        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

   /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision : function (response, other) {
        // Make all other objects solid
        return true;
    }
});
