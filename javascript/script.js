//JS

const inputText = document.querySelector('#nome')
const btnIniciar = document.querySelector('#btnIniciar')
const btnPlay = document.querySelector('#btnPlay')
const ultimaJogada = document.querySelector('#ultimajogada')
const tentativasRest = document.querySelector('#tentativas')
const refresh = document.querySelector('#refresh')
const refresh2 = document.querySelector('#refresh2')

let perguntas = document.querySelectorAll('#perguntas img')
let nomeJogador = localStorage.getItem('jogador')
let AleatoryNumber = []
let ultimajogadaNumber = ''
let pontuacaoJogadas = 0
let tentativasNumber = 0
let tiposPontos = 0

//Função Hide
function showHide(obj, action, ) {
    document.querySelector(obj).classList[action]('hide')
}

//Função de clicar para Iniciar e mudar para a tela do jogo
btnIniciar.addEventListener('click', () => {
    if (inputText.value != '') {
        localStorage.setItem('jogador', inputText.value)
    } else {
        alert('Insira o seu nome jogador!')
        return
    }
    showHide('#telaJogo', 'remove')
    showHide('#btnIniciar', 'add')
    showHide('#nome', 'add')
    showHide('#telaInicial', 'add')

    document.querySelector('#user').innerText = `Olá ${nomeJogador}, teste sua sorte!`;

    //Preparação para primeira rodada
    localStorage.removeItem('ultimajogadaNumber')
    localStorage.removeItem('number')
    ultimaJogada.innerText = `0 0 0`
    $('.box img').addClass('show-box')
    $('.box img').removeClass('hidden-box')
})

//Lógica dos numeros das imagens
function play() {
    perguntas.forEach((el, i) => {
        AleatoryNumber[i] = parseInt(Math.random() * 3) + 1
        el.src = `/images/number_${AleatoryNumber[i]}.png`
    })
    tentativasNumber++
    return AleatoryNumber
}

//Função do botão Play
btnPlay.addEventListener('click', () => {

    $('.box img').addClass('imgtelajogo')
    $('.box img').removeClass('imgtelajogoopen')

    // Caso exista ultimajogadaNumber no localstorage, carrega na varíavel
    localStorage.getItem('number') ?
        ultimajogadaNumber = localStorage.getItem('number') :
        ultimajogadaNumber = '0,0,0'
    // Preenche o span anterior
    if (ultimajogadaNumber != '') {
        ultimaJogada.innerText = `${ultimajogadaNumber[0]} ${ultimajogadaNumber[2]} ${ultimajogadaNumber[4]}`
    }

    // Roda o jogo e armazena valor
    localStorage.setItem('number', play())
    let number = localStorage.getItem('number')

    //Verifica quando acontece a pontuacao
    if (number == ultimajogadaNumber)
        tiposPontos = 2
    else if (number == '1,1,1' || number == '2,2,2' || number == '3,3,3')
        tiposPontos = 1
    tentativasRest.innerText = `${10 - tentativasNumber}`

    //Verifica a quantidade de tentativasNumber
    if (tentativasNumber > 10) {

        $('.modal').modal('show')
        $('#Regras').addClass('hide')
        $('#winLooser').removeClass('hide')

        showHide('#telaJogo', 'add')
        showHide('#user', 'add')

        //Verifica pontuação para escolher vitória ou derrota
        if (pontuacaoJogadas >= 3) {
            $('<p/>', {
                text: `Parabéns ${localStorage.getItem('jogador')}, você venceu!`,
                class: 'text-center'
            }).prependTo('#winLooser')
            document.querySelector('#winLooser img').src = '/images/winner.png'
            $(document).ready(function () {
                $(refresh).click(function () {
                    location.reload(true);
                });
            });
            $(document).ready(function () {
                $(refresh2).click(function () {
                    location.reload(true);
                });
            });
        } else {
            $('<p/>', {
                text: `Não foi dessa vez ${localStorage.getItem('jogador')}, tente novamente.`,
                class: 'text-center'
            }).prependTo('#winLooser')
            document.querySelector('#winLooser img').src = '/images/looser.jpg'
            $(document).ready(function () {
                $(refresh).click(function () {
                    location.reload(true);
                });
            });
            $(document).ready(function () {
                $(refresh2).click(function () {
                    location.reload(true);
                });
            });
        }
    }

    //Animação para mostrar um numero por vez por por tempo de carregamento
    setTimeout(function () {
        $('.box img').eq(0).removeClass('imgtelajogo')
        $('.box img').eq(0).addClass('imgtelajogoopen')
    }, 1000);
    setTimeout(function () {
        $('.box img').eq(1).removeClass('imgtelajogo')
        $('.box img').eq(1).addClass('imgtelajogoopen')
    }, 1250);
    setTimeout(function () {
        $('.box img').eq(2).removeClass('imgtelajogo')
        $('.box img').eq(2).addClass('imgtelajogoopen')
    }, 1500);

    //Depois de mostrar os 3 números, mostra a pontuação
    setTimeout(function () {
        if (tiposPontos == 1) {
            alert('Combinação de 3 números iguais. 1 Ponto!')
            pontuacaoJogadas += 1
        } else if (tiposPontos == 2) {
            alert('O mesmo número em sequencia! 2 Pontos!')
            pontuacaoJogadas += 2
        }
        document.querySelector('#pontuacao').innerText = `${pontuacaoJogadas}`
        tiposPontos = 0
    }, 2000);
})

//Trocar a cor do fundo
function changeColor(color) {
    document.body.style.background = color;
    // Marcar a cor ativa
    document.querySelectorAll('span').forEach(function (item) {
        item.classList.remove('active');
    })
    event.target.classList.add('active');
}

//Modal com as regras
window.onload = function () {
    $('#Regras').html("")
    $('#winLooser').addClass('hide')

    $('.modal').modal('show')
    $('#Regras').removeClass('hide')

    $('<h2/>', {
        text: 'Bem vindo!',
        class: 'mt-1 text-center',
    }).appendTo('#Regras')
    $('<h2/>', {
        text: 'Veja as regras abaixo.',
        class: 'mt-1 text-center',
    }).appendTo('#Regras')
    $('<h3/>', {
        id: 'regrast'
    }).appendTo('#Regras')
    $('<h3/>', {
        text: 'Se os três números forem iguais, marcam 01 ponto.',
        class: 'mt-5 text-center'
    }).appendTo('#regrast')
    $('<h3/>', {
        text: 'Se a sequencia atual for a mesma da sequencia anterior, marcam 02 pontos.',
        class: 'mt-5 text-center'
    }).appendTo('#regrast')
    $('<p/>', {
        text: 'Ao final de 10 tentativas, ganha o jogador que fizer mais de 03 pontos!',
        class: 'mt-5 text-center'
    }).appendTo('#Regras')
}