const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"

startGame();//chamar a funcção de iniciar o jogo

function startGame(){//função para iniciar o jogo

    inicializarCards(game.createCardsFromTechs());
//função que vai pegar o modelo das cartas e transformar em algo visual no HTML

}

function inicializarCards(cards){

    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = '';
    game.cards.forEach(card => {

        let cardElement = document.createElement('div');//criar um elemento para cada uma das cartas

        cardElement.id = card.id;//definir um id para esse elemento

        cardElement.classList.add(CARD);//adicionar a class="card" através do JS usando a constante CARD

        cardElement.dataset.icon = card.icon;//verificar se as cartas tem ícnones iguais

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard);//chamar a funçãod e virar a carta, através do evento de click

        gameBoard.appendChild(cardElement);//colocar a carta no tabuleiro

    })
}

function createCardContent(card, cardElement){//criar front e back das cartas

    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, elemento){//criar a face de cada lado da carta

    let cardElementFace = document.createElement('div');
    
    cardElementFace.classList.add(face);
    
    if(face == FRONT){//se a face for igual a FRONT, colocar img de ícone
    
        let iconElement = document.createElement('img');//criar a imagem do icon
        iconElement.classList.add(ICON);//adicionar a classe ICON
        iconElement.src = "./assets/images/" + card.icon + ".png";//endereço da imagem da carta
        cardElementFace.appendChild(iconElement);
    
    }else{//se não for igual a FRONT, colocar </> (usando o código "&lt/&gt")
    
        cardElementFace.innerHTML = "&lt/&gt"
    }
    elemento.appendChild(cardElementFace);
}

//createCardsFromTechs(techs);chamar a função de criar as cartas


function flipCard(){//função para virar a carta

    if(game.setCard(this.id)){
        
        this.classList.add('flip');
        if(game.secondCard){

            if( game.checkMatch()){
                game.clearCards();
                    setTimeout(() => {
                        if(game.checkGameOver()){
                            let gameOverLayer = document.getElementById('gameOver');
                            gameOverLayer.style.display = 'flex';
                        }
                    }, 500);
            }else{
                setTimeout(() => {       
                
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);
    
                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
                    game.unflipCards();
                }, 1000);
            };
        }
    }
}

function restart(){
   
    setTimeout(() => {       

        game.clearCards();
        startGame();
            let gameOverLayer = document.getElementById('gameOver');
            gameOverLayer.style.display = 'none';
    }, 500);
}









