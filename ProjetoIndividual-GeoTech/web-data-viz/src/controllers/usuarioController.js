var usuarioModel = require("../models/usuarioModel");

function africa(req, res) {
    usuarioModel.africa()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json({ continente: resultado[0].qtd });
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.error(erro);
            res.status(500).json(erro);
        });
}

function asia(req, res) {
    usuarioModel.asia()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json({ continente: resultado[0].qtd });
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.error(erro);
            res.status(500).json(erro);
        });
}

function americaN(req, res) {
    usuarioModel.americaN()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json({ continente: resultado[0].qtd });
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.error(erro);
            res.status(500).json(erro);
        });
}

function americaS(req, res) {
    usuarioModel.americaS()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json({ continente: resultado[0].qtd });
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.error(erro);
            res.status(500).json(erro);
        });
}

function europa(req, res) {
    usuarioModel.europa()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json({ continente: resultado[0].qtd });
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.error(erro);
            res.status(500).json(erro);
        });
}

function oceania(req, res) {
    usuarioModel.oceania()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json({ continente: resultado[0].qtd });
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.error(erro);
            res.status(500).json(erro);
        });
}


function autenticar(req, res) {
    console.log('chegou no autenticar')
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        res.json({
                            idUsuario: resultadoAutenticar[0].idUsuario,
                            nome: resultadoAutenticar[0].nome,
                            email: resultadoAutenticar[0].email,
                            continente: resultadoAutenticar[0].continente
                        });

                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var continente = req.body.continenteServer;
    var telefone = req.body.telefoneServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (continente == undefined) {
        res.status(400).send("Seu continente está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, continente, telefone)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function mensagem(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var message = req.body.messageServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (message == undefined) {
        res.status(400).send("Sua mensagem está undefined!");
    }

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel.mensagem(nome, email, message)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao enviar mensagem! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function feedback(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var tipo = req.body.tipoServer
    var message = req.body.messageServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (tipo == undefined) {
        res.status(400).send("Seu tipode feedback está undefined!");
    } else if (message == undefined) {
        res.status(400).send("Sua mensagem está undefined!");
    }

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel.feedback(nome, email, tipo, message)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao enviar mensagem! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function memory1(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var id = req.body.idServer;
    var jogo = req.body.jogoServer

    // Faça as validações dos valores
    if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else if (jogo == undefined) {
        res.status(400).send("O jogo esta undefined!")
    }

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel.memory1(id, jogo)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao enviar mensagem! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function memory2(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var id = req.body.idServer;
    var jogo = req.body.jogoServer

    // Faça as validações dos valores
    if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else if (jogo == undefined) {
        res.status(400).send("O jogo esta undefined!")
    }

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel.memory2(id, jogo)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao enviar mensagem! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function pais(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var id = req.body.idServer;
    var jogo = req.body.jogoServer

    // Faça as validações dos valores
    if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else if (jogo == undefined) {
        res.status(400).send("O jogo esta undefined!")
    }

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel.pais(id, jogo)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao enviar mensagem! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function forca(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var id = req.body.idServer;
    var jogo = req.body.jogoServer

    // Faça as validações dos valores
    if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else if (jogo == undefined) {
        res.status(400).send("O jogo esta undefined!")
    }

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel.forca(id, jogo)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao enviar mensagem! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function flag(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var id = req.body.idServer;
    var jogo = req.body.jogoServer

    // Faça as validações dos valores
    if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else if (jogo == undefined) {
        res.status(400).send("O jogo esta undefined!")
    }

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel.flag(id, jogo)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao enviar mensagem! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function quiz(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var id = req.body.idServer;
    var jogo = req.body.jogoServer

    // Faça as validações dos valores
    if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else if (jogo == undefined) {
        res.status(400).send("O jogo esta undefined!")
    }

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel.quiz(id, jogo)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao enviar mensagem! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    autenticar,
    cadastrar,
    mensagem,
    feedback,
    memory1,
    memory2,
    pais,
    forca,
    flag,
    quiz,
    africa,
    asia,
    americaN,
    americaS,
    europa,
    oceania
}