let x = document.querySelector('.x');
let o = document.querySelector('.o');
let boxes = document.querySelectorAll('.box');
let buttons = document.querySelectorAll('#buttons-container button');
let messageContainer = document.querySelector('#message');
let messageText = document.querySelector('#message p');
let secondPlayer;

//contador e jogadas
let player1 = 0;
let player2 = 0;

//adicionando evento de click aos box
for (let i = 0; i < boxes.length; i++) {
    //clicar  acaixa
    boxes[i].addEventListener('click', function(){

        let el = checkEl(player1, player2);

        // verifica se já tem x ou bola
        if (this.childNodes.length == 0) {
            
            clomeEl = el.cloneNode(true)

            this.appendChild(clomeEl)

            //computar jogada
            if( player1 == player2 ){
                player1 ++;
                if (secondPlayer == 'ia-player') {
                    computerPlay();
                    player2++;
                }
            }else{
                player2++;
            }

            //checar quem venceu
            checkinCondition();
        }

    })
}

// vê quem vai jogar
function checkEl(p1, p2){
    
    if(p1 == p2){
        el = x;

    }else{
        el = o;
    }

    return el;
}

// Escolher entre 2 players ou IA
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {

        secondPlayer =  buttons[i].getAttribute('id');

        for (let j = 0; j < buttons.length; j++) {
            buttons[j].style.display = 'none';
        }

        setTimeout(() => {

            let container = document.querySelector('#container')
            container.classList.remove('hide');
        }, 500)

    });
    
}

// Checar quem venceu
function checkinCondition() {
    
    let b1 = document.getElementById('block-1');
    let b2 = document.getElementById('block-2');
    let b3 = document.getElementById('block-3');
    let b4 = document.getElementById('block-4');
    let b5 = document.getElementById('block-5');
    let b6 = document.getElementById('block-6');
    let b7 = document.getElementById('block-7');
    let b8 = document.getElementById('block-8');
    let b9 = document.getElementById('block-9');

//checando vencedor
    let v = 'no';
    // partindo da primeira casa
    if (b1.childNodes.length > 0){
        let b1child = b1.childNodes[0].className;
        if (b2.childNodes.length > 0 && b3.childNodes.length > 0){
            let b2child = b2.childNodes[0].className;
            let b3child = b3.childNodes[0].className;
            if (b1child === b2child) {
                if (b1child === b3child) {
                    v = 'yes';
                    declareWinnner(b1child, v);
                }
            }
        }
        if (b4.childNodes.length > 0 && b7.childNodes.length > 0){
            let b4child = b4.childNodes[0].className;
            let b7child = b7.childNodes[0].className;
            if (b1child === b4child) {
                if (b1child === b7child) {
                    v = 'yes';
                v = 'yes';
                    declareWinnner(b1child, v);
                }
            }
        }
        if (b5.childNodes.length > 0 && b9.childNodes.length > 0){
            let b5child = b5.childNodes[0].className;
            let b9child = b9.childNodes[0].className;
            if (b1child === b5child) {
                if (b1child === b9child) {
                v = 'yes';
                    declareWinnner(b1child, v);
                }
            }
        }
    }
    // partindo da segunda casa
    if (b2.childNodes.length > 0) {
        let b2child = b2.childNodes[0].className;
        if (b5.childNodes.length > 0 && b8.childNodes.length > 0){
            let b5child = b5.childNodes[0].className;
            let b8child = b8.childNodes[0].className;
            if (b5child == b2child && b8child == b2child) {
                v = 'yes';
                declareWinnner(b2child, v);
            }
        }
    }
    // partindo da terceira casa
    if (b3.childNodes.length > 0) {
        let b3child = b3.childNodes[0].className;
        if (b5.childNodes.length > 0 && b7.childNodes.length > 0 ) {
            let b5child = b5.childNodes[0].className;
            let b7child = b7.childNodes[0].className;
            if (b5child == b3child && b7child == b3child) {
                v = 'yes';
                declareWinnner(b3child, v);
            }
        }
        if (b6.childNodes.length > 0 && b9.childNodes.length ) {
            let b6child = b6.childNodes[0].className;
            let b9child = b9.childNodes[0].className;
            if (b6child == b3child && b9child == b3child) {
                v = 'yes';
                declareWinnner(b3child, v);
            }
        }
    }
    // partindo da quarta casa
    if (b4.childNodes.length > 0) {
        let b4child = b4.childNodes[0].className;
        if (b5.childNodes.length > 0 && b6.childNodes.length > 0 ) {
            let b5child = b5.childNodes[0].className;
            let b6child = b6.childNodes[0].className;
            if (b5child == b4child && b6child == b4child) {
                v = 'yes';
                declareWinnner(b4child, v);
            }
        }
    }
    //partindo da setima casa
    if (b7.childNodes.length > 0) {
        let b7child = b7.childNodes[0].className;
        if (b8.childNodes.length > 0 && b9.childNodes.length > 0 ) {
            let b8child = b8.childNodes[0].className;
            let b9child = b9.childNodes[0].className;
            if (b8child == b7child && b9child == b7child) {
                v = 'yes';
                declareWinnner(b7child, v);
            }
        }
    }
    // deu velha
    let counter = 0;
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].childNodes[0] != undefined) {
            counter ++;
        }
    }

    if (counter == 9){
        declareWinnner(counter, v);
    }
}

// limpar o jogo, declara o vencedor atualiza o placar
function declareWinnner(winner, victory) {
    
    let scorboardX = document.querySelector('#scoreboard-1');
    let scorboardO = document.querySelector('#scoreboard-2');
    let msg = '';
    if (victory == 'yes'){
        if (winner == 'x') {
            scorboardX.textContent = parseInt(scorboardX.textContent) + 1;
            msg = 'Jogador 1 venceu.';
        } else if(winner == 'o'){
            scorboardO.textContent = parseInt(scorboardO.textContent) + 1;
            msg = 'Jogador 2 venceu.';
        }
    } else {
        msg = 'Deu velha.';
    }

    // Exibir mesnsagem
    messageText.innerHTML = msg;
    messageContainer.classList.remove('hide');

    //  Esconder mensagem
    setTimeout(() => {
        messageContainer.classList.add('hide');
    }, 3000)

    //zerar jogadas
    player1 = 0;
    player2 = 0;

    //remove X e O
    let boxesToRemove = document.querySelectorAll('.box div');
    for (let i = 0; i < boxesToRemove.length; i++) {
        boxesToRemove[i].parentNode.removeChild(boxesToRemove[i]);
    }
}

// Executar a lógica de da jogada do CPU
function computerPlay() {

    let cloneO = o.cloneNode(true);
    counter = 0;
    filled = 0;

    for (let i = 0; i < boxes.length; i++) {
        
        let randomNumber = Math.floor(Math.random()*5);

        // só preencher se estiver vasia
        if (boxes[i].childNodes.length == 0) {
            if (randomNumber <= 1) {
                boxes[i].appendChild(cloneO);
                counter++;
                break;
            }
        // Checando de qunatas estão preenchidas
        } else {
            filled++;
        }
    }

    if (counter == 0 && filled < 9) {
        computerPlay();
    }

}