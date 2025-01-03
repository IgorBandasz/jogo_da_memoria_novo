import { buscarRanking } from "./database.js"

// Elemento principal da grade
const grade = document.getElementById("grade");

//Pega o nickname
const nickname = sessionStorage.getItem('nickname');

for (let index = 1; index <= 3; index++) {
    //Crio uma div que será a minha carta
    const card = document.createElement("div");
    card.classList.add("div_lista");

    //Crio uma imagem como a parte da frente da carta
    const lista = document.createElement("ol");
    lista.classList.add("lista");

    const ranking = await buscarRanking(index);

    let campo;
    switch (index) {
        case 1:
            campo = 'Fácil'; break;
        case 2:
            campo = 'Médio'; break;
        case 3:
            campo = 'Difícil'; break;
        default:
            break;
    }

    const titulo = document.createElement("li");
    titulo.classList.add("titulo_lista");
    titulo.textContent = campo;
    lista.appendChild(titulo); 

    ranking.forEach(jogador => {

        console.log(jogador)
        const item = document.createElement("li");
        item.classList.add("item_lista");
        item.textContent = jogador.nome + ' - ' + jogador.pontos;

        lista.appendChild(item); 
    });

    //Adiciono na div da carta a foto da frente e a de trás
    card.appendChild(lista); 

    grade.appendChild(card);
}

