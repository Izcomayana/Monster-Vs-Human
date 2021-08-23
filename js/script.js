new Vue ({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function () {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack: function () {
      var damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage

      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits Monster for ' + damage
      });
      
      if (this.winCheck()) {
        return;
      }

      this.monsterAttacks();
    },
    specialAttack: function () {
      var damage = this.calculateDamage(5, 20);
      this.monsterHealth -= damage

      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits Monster HARD for ' + damage
      });

      if (this.winCheck()) {
        return;
      }

      this.monsterAttacks();
    },
    heal: function () {
      if (this.playerHealth <= 90) {
         this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: 'Player heals for 10'
      });

      this.monsterAttacks();
    },
    giveUp: function () {
      this.gameIsRunning = false; 
    },
    monsterAttacks: function () {
      var damage = this.calculateDamage(5, 15);
      this.playerHealth -= damage;
      this.winCheck();

      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits Player for ' + damage
      });
    },
    calculateDamage: function (min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    winCheck: function () {
      if (this.monsterHealth <= 0) {
        if (confirm('You Won! Start New Game?')) {
          this.startGame();
        } else{
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm('You Lost! Start New Game?')) {
          this.startGame();
        } else{
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    }
  }
});