const game = JSGL.DefaultGame.Create({ grid: new JSGL.Vector2(8, 6)}, { backgroundColor: 'darkgrey' }, 1);

const zwykleJaja = ['multitasker', 'glutton'];
const mocneJaja = ['bull', 'mutant'];

game.LoadResource('image', 'multitasker', 'Multitasker.png');

class Jajo extends JSGL.Sprite {
    Start(event){
        this.texture = game.GetImage('multitasker');
        this.transform.set(game.GetRandomPosition());
        this.transform.position.y = -2 * Math.random();
    }
    OnMouseClick(event){
        game.DestroyGameObjectByRef(this);
        game.AddGameObject(new Jajo());
    }
    Update(event){
        this.transform.translate(new JSGL.Vector2(0, 1).multiply(event.deltaTime));
        this.transform.eulerAngles += 50 * event.deltaTime;
        if(this.transform.position.y > 7){
            game.DestroyGameObjectByRef(this);
            game.AddGameObject(new Jajo());
        }
    }
}

function stworzJajo(){
    const jajo = new Jajo();
    game.AddGameObject(jajo);
}

game.on('draw', (event) => {
    event.renderer.fill('white');
});

game.on('keyUp', (event) => {
    if(event.input.isKeyUp('s')){
        game.timeScale -= 0.1;
    }
    if(event.input.isKeyUp('w')){
        game.timeScale += 0.1;
    }
    game.timeScale = JSGL.Clamp(game.timeScale, 0, 1);
});

game.LoadGameAndStart().then(() => {
    setTimeout(() => {
        stworzJajo();
        stworzJajo();
        stworzJajo();
    }, 1);
    setInterval(() => {
        stworzJajo();
    }, 7000);
});