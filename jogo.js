

let frames = 0;
const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav';

const sprites = new Image();
sprites.src = './sprites.png';

const cv = document.querySelector('canvas');
const ctx = cv.getContext('2d');


const background = {
  spriteX: 390,
  spriteY: 0,
  width: 275,
  height: 204,
  x: 0,
  y: cv.height - 204,
  desenha() {
    ctx.fillStyle = '#70c5ce';
    ctx.fillRect(0,0, cv.width, cv.height)

    ctx.drawImage(
      sprites,
      background.spriteX, background.spriteY,
      background.width, background.height,
      background.x, background.y,
      background.width, background.height,
    );

    ctx.drawImage(
      sprites,
      background.spriteX, background.spriteY,
      background.width, background.height,
      (background.x + background.width), background.y,
      background.width, background.height,
    );
  },
};

// [Chao]
function d() {
  const chao = {
    spriteX: 0,
    spriteY: 610,
    width: 224,
    height: 112,
    x: 0,
    y: cv.height - 112,
    atualiza() {
      const movimentoDoChao = 1;
      const repeteEm = chao.width / 2;
      const movimentacao = chao.x - movimentoDoChao;
      
      chao.x = movimentacao % repeteEm;
    },
    desenha() {
      ctx.drawImage(
        sprites,
        chao.spriteX, chao.spriteY,
        chao.width, chao.height,
        chao.x, chao.y,
        chao.width, chao.height,
      );
  
      ctx.drawImage(
        sprites,
        chao.spriteX, chao.spriteY,
        chao.width, chao.height,
        (chao.x + chao.width), chao.y,
        chao.width, chao.height,
      );
    },
  };
  return chao;
}

function fazColisao(flappyBird, chao) {
  const flappyBirdY = flappyBird.y + flappyBird.height;
  const chaoY = chao.y;

  if(flappyBirdY >= chaoY) {
    return true;
  }

  return false;
}

function criaFlappyBird() {
  const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    width: 33,
    height: 24,
    x: 10,
    y: 50,
    pulo: 4.9,
    pula() {
      flappyBird.velocidade =  - flappyBird.pulo;

    },
    gravidade: 0.20,
    velocidade: 0,
    atualiza() {
      if(fazColisao(flappyBird, globais.chao)) {

        som_HIT.play();

        mudaParaTela(Telas.GAME_OVER);
        return;
      }
  
      flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
      flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },
    movimentos: [
      { spriteX: 0, spriteY: 0, }, 
      { spriteX: 0, spriteY: 26, }, 
      { spriteX: 0, spriteY: 52, }, 
      { spriteX: 0, spriteY: 26, }, 
    ],
    frameAtual: 0,
    atualizaOFrameAtual() {     
      const intervaloDeFrames = 10;
      const passouOIntervalo = frames % intervaloDeFrames === 0;

      if(passouOIntervalo) {
        const baseDoIncremento = 1;
        const incremento = baseDoIncremento + flappyBird.frameAtual;
        const baseRepeticao = flappyBird.movimentos.length;
        flappyBird.frameAtual = incremento % baseRepeticao
      }

    },
    desenha() {
      flappyBird.atualizaOFrameAtual();
      const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];

      ctx.drawImage(
        sprites,
        spriteX, spriteY,
        flappyBird.width, flappyBird.height, 
        flappyBird.x, flappyBird.y,
        flappyBird.width, flappyBird.height,
      );
    }
  }
  return flappyBird;  
}

const mensagemGetReady = {
  sX: 134,
  sY: 0,
  w: 174,
  h: 152,
  x: (cv.width / 2) - 174 / 2,
  y: 50,
  desenha() {
    ctx.drawImage(
      sprites,
      mensagemGetReady.sX, mensagemGetReady.sY,
      mensagemGetReady.w, mensagemGetReady.h,
      mensagemGetReady.x, mensagemGetReady.y,
      mensagemGetReady.w, mensagemGetReady.h
    );
  }
}

const mensagemGameOver = {
  sX: 134,
  sY: 153,
  w: 226,
  h: 200,
  x: (cv.width / 2) - 226 / 2,
  y: 50,
  desenha() {
    ctx.drawImage(
      sprites,
      mensagemGameOver.sX, mensagemGameOver.sY,
      mensagemGameOver.w, mensagemGameOver.h,
      mensagemGameOver.x, mensagemGameOver.y,
      mensagemGameOver.w, mensagemGameOver.h
    );
  }
}

function criaCanos() {
  const canos = {
    width: 52,
    height: 400,
    chao: {
      spriteX: 0,
      spriteY: 169,
    },
    ceu: {
      spriteX: 52,
      spriteY: 169,
    },
    espaco: 80,
    desenha() {
      canos.pares.forEach(function(par) {
        const yRandom = par.y;
        const espacamentoEntreCanos = 90;
  
        const canoCeuX = par.x;
        const canoCeuY = yRandom; 

        ctx.drawImage(
          sprites, 
          canos.ceu.spriteX, canos.ceu.spriteY,
          canos.width, canos.height,
          canoCeuX, canoCeuY,
          canos.width, canos.height,
        )
        
        const canoChaoX = par.x;
        const canoChaoY = canos.height + espacamentoEntreCanos + yRandom; 
        ctx.drawImage(
          sprites, 
          canos.chao.spriteX, canos.chao.spriteY,
          canos.width, canos.height,
          canoChaoX, canoChaoY,
          canos.width, canos.height,
        )

        par.canoCeu = {
          x: canoCeuX,
          y: canos.height + canoCeuY
        }
        par.canoChao = {
          x: canoChaoX,
          y: canoChaoY
        }
      })
    },
    temColisaoComOFlappyBird(par) {
      const cabecaDoFlappy = globais.flappyBird.y;
      const peDoFlappy = globais.flappyBird.y + globais.flappyBird.height;
      
      if((globais.flappyBird.x + globais.flappyBird.width) >= par.x) {
        if(cabecaDoFlappy <= par.canoCeu.y) {
          return true;
        }

        if(peDoFlappy >= par.canoChao.y) {
          return true;
        }
      }
      return false;
    },
    pares: [],
    atualiza() {
      const passou100Frames = frames % 100 === 0;
      if(passou100Frames) {
        canos.pares.push({
          x: cv.width,
          y: -150 * (Math.random() + 1),
        });
      }



      canos.pares.forEach(function(par) {
        par.x = par.x - 2;

        if(canos.temColisaoComOFlappyBird(par)) {
          som_HIT.play();
          mudaParaTela(Telas.GAME_OVER);
        }

        if(par.x + canos.width <= 0) {
          canos.pares.shift();
        }
      });

    }
  }

  return canos;
}

function criaPlacar() {
  const placar = {
    pontuacao: 0,
    desenha() {
      ctx.font = '35px "VT323"';
      ctx.textAlign = 'right';
      ctx.fillStyle = 'white';
      ctx.fillText(`${placar.pontuacao}`, cv.width - 10, 35);      
    },
    atualiza() {
      const intervaloDeFrames = 20;
      const passouOIntervalo = frames % intervaloDeFrames === 0;

      if(passouOIntervalo) {
        placar.pontuacao = placar.pontuacao + 1;
      }
    }
  }
  return placar;
}


// 
// [Telas]
// 
const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela) {
  telaAtiva = novaTela;

  if(telaAtiva.inicializa) {
    telaAtiva.inicializa();
  }
}

const Telas = {
  INICIO: {
    inicializa() {
      globais.flappyBird = criaFlappyBird();
      globais.chao = d();
      globais.canos = criaCanos();
    },
    desenha() {
      background.desenha();
      globais.flappyBird.desenha();
      
      globais.chao.desenha();
      mensagemGetReady.desenha();
    },
    click() {
      mudaParaTela(Telas.JOGO);
    },
    atualiza() {
      globais.chao.atualiza();
    }
  }
};

Telas.JOGO = {
  inicializa() {
    globais.placar = criaPlacar();
  },
  desenha() {
    background.desenha();
    globais.canos.desenha();
    globais.chao.desenha();
    globais.flappyBird.desenha();
    globais.placar.desenha();
  },
  click() {
    globais.flappyBird.pula();
  },
  atualiza() {
    globais.canos.atualiza();
    globais.chao.atualiza();
    globais.flappyBird.atualiza();
    globais.placar.atualiza();
  }
};

Telas.GAME_OVER = {
  desenha() {
    mensagemGameOver.desenha();
  },
  atualiza() {
    
  },
  click() {
    mudaParaTela(Telas.INICIO);
  }
}

function loop() {

  telaAtiva.desenha();
  telaAtiva.atualiza();

  frames = frames + 1;
  requestAnimationFrame(loop);
}


window.addEventListener('click', function() {
  if(telaAtiva.click) {
    telaAtiva.click();
  }
});

mudaParaTela(Telas.INICIO);
loop();