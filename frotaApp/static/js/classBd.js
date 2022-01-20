
function classBd(){
/* CONFIGURA��O DA BASE DE DADOS == */
	this.conectBd = function(configTabelas){

		/* VARI�VEIS == */
                var nomeBd = 'agenda';
		var versaoBd = '2.0';
		var tituloBd = 'BANCO DE DADOS AGENDA';
		var tamanhoBd = (10*1024*1024);
		var conectBd = openDatabase(nomeBd, versaoBd, tituloBd, tamanhoBd);

		if(configTabelas == 1){

			/* CONFIGURANDO TABELAS == */
			conectBd.transaction(function(sql){
			
				/* CLIENTES == */
				sql.executeSql("CREATE TABLE IF NOT EXISTS clientes (_idCa INTEGER PRIMARY KEY AUTOINCREMENT, codCa TEXT, razao TEXT, fantasia TEXT, cnpj TEXT, nome TEXT, email TEXT, cpf TEXT, telefone TEXT, celular TEXT, endereco TEXT, numero TEXT, complemento TEXT, bairro TEXT, cep TEXT, cidade TEXT, sync INTEGER)");
				/* CLIENTES == */
				sql.executeSql("CREATE TABLE IF NOT EXISTS visitas (_idVi INTEGER PRIMARY KEY AUTOINCREMENT, codVi TEXT, cliente TEXT, servico TEXT, responsavel TEXT, descricao TEXT, status TEXT, data_atendimento NUMERIC, hora TEXT, reg_visita NUMERIC, sync INTEGER)");
                                /* Usuarios == */
				sql.executeSql("CREATE TABLE IF NOT EXISTS usuarios (_idUsuario INTEGER PRIMARY KEY AUTOINCREMENT, codUser TEXT, usuario TEXT, nomeUsuario TEXT, senha TEXT, funcaoUser TEXT, sync INTEGER)");
    
			});
			
		}
	
		/* RETORNANDO DADOS == */
		return conectBd;

	}
        
        
        function downloadClientes(){
                alert('Teste!!');
                $.post('http://3.17.23.138:8090/api-kronos/agenda/listarCliente.jsp', function (jsonCa) {

                    /* CONSULTAR INFORMAÇÕES == */
                    conectBd.transaction(function (sql) {

                        /* RETORNANDO DADOS == */
                        var totalCliente = jsonCa.totalCliente;
                        var loopBd = jsonCa.loopBd;
                        var qntLoopBd = loopBd.length;
                        for (var i = 0; i < qntLoopBd; i++) {

                            /* DADOS DO LOOP == */
                            var idCliente = loopBd[i].idCliente;
                            var nomeCliente = loopBd[i].nomeCliente;
                            /* VERIFICAR SE E ULTIMO REGISTRO == */
                            if (i == (qntLoopBd - 1)) {
                                var ultimoRg = 1;
                            } else {
                                var ultimoRg = 0;
                            }

                            /* CONVERTER DADOS == */
                            var codCa = idCliente;
                            var razao = nomeCliente;
                            var jsonCaLp = {codCa: codCa, razao: razao, ultimoRg: ultimoRg};
                            processarClientes(sql, jsonCaLp);
                        }

                    });
                })

            }
            /* PROCESSAR CLIENTES == */
            function processarClientes(sql, jsonCa) {

                /* RETORNANDO DADOS == */
                var codCa = jsonCa.codCa;
                var razao = jsonCa.razao;
                var ultimoRg = jsonCa.ultimoRg;
                /* CONSULTAR DADOS == */
                sql.executeSql("SELECT * FROM clientes WHERE codCa='" + codCa + "'", [], function (sql, resultados) {

                    var totalBd = resultados.rows.length;
                    if (totalBd == 0) {

                        /* SALVAR DADOS == */
                        sql.executeSql("INSERT INTO clientes (codCa, razao) VALUES('" + codCa + "', '" + razao + "')", [], function (sql, resultados) {

                        }, function (sql, erro) {
                            console.log(erro);
                        });
                    }

                    /* EXECULTA O LOOP DE CLIENTES == */
                    if (ultimoRg == 1) {
                        loopClientes();
                    }

                }, function (sql, erro) {
                    console.log(erro);
                });
            }
    }