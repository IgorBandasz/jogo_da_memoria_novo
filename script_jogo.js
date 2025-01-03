import { getJogador, salvarPontuacao } from "./database.js"

// Elemento principal da grade
const grade = document.getElementById("grade");

//Pega o nível e o nickname
const nivel = parseInt(sessionStorage.getItem('nivel'));
const nickname = sessionStorage.getItem('nickname');

//nomes das imagens
const cartas = [
    "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "a10", "a11", "a12",
];

let cartasNivel = [];
//pega a lista de cartas
switch(nivel){
    case 1: cartasNivel = cartas.slice(0, 6); break;
    case 2: cartasNivel = cartas.slice(0, 9); break;
    case 3: cartasNivel = cartas.slice(0, 12); break; 
}

//Duplica os pares
cartasNivel = cartasNivel.concat(cartasNivel);

// Embaralha as cartas
const cartasEmbaralhadas = cartasNivel.sort(() => 0.5 - Math.random());

// Cria os elementos das cartas
let cartasViradas = [];
let pares = 0;
let venceu = false;

//const jogador = await getJogador(nickname);

cartasEmbaralhadas.forEach((item) => {
    //Crio uma div que será a minha carta
    const card = document.createElement("div");
    card.classList.add("carta");

    //Crio uma imagem como a parte da frente da carta
    const img = document.createElement("img");
    img.src = 'imagens/' + item + '.jpg';
    img.classList.add("imagem");

    //Crio uma imagem como a parte de trás da carta
    const capa = document.createElement("img");
    capa.src = 'imagens/capa1.jpg';
    capa.classList.add("capa");

    //Adiciono na div da carta a foto da frente e a de trás
    card.appendChild(img);
    card.appendChild(capa);   

    // Adiciona o evento de clique a carta
    card.addEventListener("click", (objeto, ev) => {
        
        if (cartasViradas.length === 2) {
            return; // Evita cliques redundantes
        }

        if (card.classList.contains("virada")) {
            card.classList.remove("virada");

            for (let elemento of card.children) {
                elemento.classList.remove("virada");
            }
            return
        }

        card.classList.add("virada");
       
        for (let elemento of card.children) {
            elemento.classList.add("virada");
        }
        
        cartasViradas.push(card);

        // Verifica se duas cartas estão viradas
        if (cartasViradas.length === 2) {
            verificaCarta();
        }
    });

    grade.appendChild(card);
});

// Função para verificar correspondência
function verificaCarta() {
    //Pego as cartas viradas que armazenei
    const [carta1, carta2] = cartasViradas;

    //Por ordem o primeiro filho da div da carta é aparte da frente da carta então pego as imagem das 2 cartas
    var img1 = carta1.children[0]
    var img2 = carta2.children[0]

    //verifico se apontam para a mesma imagem
    if (img1.src === img2.src) {
        // Correspondência encontrada
        cartasViradas = [];
        pares++;

        if (pares === cartasEmbaralhadas.length / 2) {
            venceu = true;
            
            salvarPontuacao(nickname, nivel, tempoRestante);

            alert("Parabéns! Você venceu! Tempo restante: " + tempoRestante);
        }
    } else {
        // Não houve correspondência
        setTimeout(() => {
            carta1.classList.remove("virada");
            carta2.classList.remove("virada");
            
            cartasViradas = [];
            
            for (let elemento of carta1.children) {
                elemento.classList.remove("virada");
            }
            for (let elemento of carta2.children) {
                elemento.classList.remove("virada");
            }
        }, 800);
    }
}

var tempoRestante = 1000;

function iniciarTimer(duracaoMiliSegundos) {
    tempoRestante = duracaoMiliSegundos;

    const timer = setInterval(() => {
        const h2 = document.getElementById('tempo');
        h2.textContent = `Tempo restante: ${tempoRestante / 100}`;        

        if (tempoRestante <= 0 || venceu == true) {
            clearInterval(timer); // Para o timer
            console.log("O tempo acabou!");
        } else {
            tempoRestante--;
        }
    }, 10); // Executa a cada 1 centésimo de segundo
}

iniciarTimer(10000)