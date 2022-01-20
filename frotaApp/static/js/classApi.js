/* CLASS EMPREDI == */
function classApi(){
	
	/* VARIÁVEIS PADRÕES DO SISTEMA == */
	this.urlWebservice = 'http://apinortetrac.provisorio.ws';
	this.time_pos_sync_ep = 1650;
	this.time_auto_sync_ep = (15*1000);
	this.div_loading_ep = '<div class="div_loading_ep"><img src="img/loading.gif" /></div>';
	
	/* INFORMAÇÕES DO SISTEMA OPERACIONAL  == */
	this.sistema_os_ep = function(){

        /* COLETANDO DADOS DO NAVEGADOR == */
	    var dds_nav_ep = window.navigator;
        var info_nav_ep = dds_nav_ep.userAgent;
        var sys_os_ep = '';

        /* SYSTEMA OPERACIONAL == */
        if(info_nav_ep.search(/(Windows)/ig) >= 0){
            sys_os_ep = 'Windows';
        } else if(info_nav_ep.search(/(Android)/ig) >= 0){
            sys_os_ep = 'Android';
        } else if(info_nav_ep.search(/(iPod)/ig) >= 0){
            sys_os_ep = 'iPod';
        } else if(info_nav_ep.search(/(iPhone)/ig) >= 0){
            sys_os_ep = 'iPhone';
        } else if(info_nav_ep.search(/(iPad)/ig) >= 0){
            sys_os_ep = 'iPad';
        }

        return sys_os_ep;

	}
	
	/* CALCULAR BYTES JSON == */
	this.calc_bytes_json_ep = function(json){
		
		var json = JSON.stringify(json);
		var bytes = json.length;
		
		if(bytes < 1024){
			bytes = bytes+' Bytes';
		} else if((bytes >= 1024) && (bytes < (1024*1024))){
			bytes = (bytes/1204).toFixed(2)+' Kb';
		} else if((bytes >= (1024*1024)) && (bytes < (1024*1024*1024))){
			bytes = (bytes/(1024*1024)).toFixed(2)+' Mb';
		} else if(bytes >= (1024*1024*1024)){
			bytes = (bytes/(1024*1024*1024)).toFixed(2)+' Gb';
		}
		
		console.log(bytes);
		
		return bytes;
		
	}
		
	/* PROCESSAR BOTÃO VOLTAR == */
	this.bnt_voltar_pg_ep = function(){
		
		window.onpopstate = function(event){
			
			/* LER SESSÃO STORAGE DE FUNÇÕES == */
			var funcoes_pg_ep = sessionStorage.getItem('funcoes_pg_ep');
			if(funcoes_pg_ep){
				
				/* COLETAR DADOS == */
				funcoes_pg_ep = eval('('+funcoes_pg_ep+')');
				var qnt_funcoes_pg_ep = funcoes_pg_ep.length;
				
				if(qnt_funcoes_pg_ep > 0){
					
					var funcao_pg_ep = funcoes_pg_ep[0];
					
					/* EXECUTAR FUNÇÃO NA MEMÓRIA == */
					eval(funcao_pg_ep);
					
					/* REMOVER FUNÇÃO == */
					classApi.funcoes_session_storage_rem_ep(funcao_pg_ep);
					
				}
				
			}
			
		}
		
	}
	
	/* LIMPAR FUNÇÕES DO SESSION STORAGE == */
	this.funcoes_session_storage_limpar_ep = function(){
	
		sessionStorage.removeItem('funcoes_pg_ep');
		
	}
	
	/* ADICIONAR FUNÇÕES AO SESSION STORAGE == */
	this.funcoes_session_storage_add_ep = function(funcao_ep){
		
		/* CHECAR SE ELEMENTO EXISTE == */
		function checar_funcao_ep(funcoes_pg_ep, funcao_ep){
			
			var resultado_ep = 0;
			var qnt_funcoes_pg_ep = funcoes_pg_ep.length;
			
			for(var i=0;i<qnt_funcoes_pg_ep;i++){
				
				var funcao_pg_ep = funcoes_pg_ep[i];
				
				if(funcao_pg_ep == funcao_ep){
					resultado_ep = 1;
				}
				
			}
			
			return resultado_ep;
			
		}
		
		/* COLETAR INFORMAÇÕES DA SESSÃO == */
		var funcoes_pg_ep = sessionStorage.getItem('funcoes_pg_ep');
		if(funcoes_pg_ep){
			funcoes_pg_ep = eval('('+funcoes_pg_ep+')');
		} else {
			funcoes_pg_ep = Array();
		}
		
		/* PROCESSAR DADOS == */
		var qnt_funcoes_pg_ep = funcoes_pg_ep.length;
		if(qnt_funcoes_pg_ep == 0){
			funcoes_pg_ep.push(funcao_ep);	
		} else {
			
			var checar_funcao_ep = checar_funcao_ep(funcoes_pg_ep, funcao_ep);
			if(checar_funcao_ep == 0){
				funcoes_pg_ep.unshift(funcao_ep);
			}
			
		}
		
		/* CONVERTER EM STRING == */
		funcoes_pg_ep = JSON.stringify(funcoes_pg_ep);
		
		/* SALVAR NA SESSÃO == */
		sessionStorage.setItem('funcoes_pg_ep', funcoes_pg_ep);
		
	}
	
	/* REMOVER FUNÇÕES AO SESSION STORAGE == */
	this.funcoes_session_storage_rem_ep = function(funcao_ep){
		
		var funcoes_pg_ep = sessionStorage.getItem('funcoes_pg_ep');
		if(funcoes_pg_ep){
			
			funcoes_pg_ep = eval('('+funcoes_pg_ep+')');
			funcoes_pg_ep_temp = Array();
			var qnt_funcoes_pg_ep = funcoes_pg_ep.length;
			
			for(var i=0;i<qnt_funcoes_pg_ep;i++){
				
				var funcao_pg_ep = funcoes_pg_ep[i];
				
				if(funcao_pg_ep != funcao_ep){
					funcoes_pg_ep_temp.push(funcao_pg_ep);
				}
				
			}
			
			/* CONVERTER EM STRING == */
			funcoes_pg_ep = JSON.stringify(funcoes_pg_ep_temp);
			
			/* SALVAR NA SESSÃO == */
			sessionStorage.setItem('funcoes_pg_ep', funcoes_pg_ep);
			
		} else {
		
			console.log('NÃO EXISTEM FUNÇÕES REGISTRADAS...');
			
		}
		
	}
	
	/* CONFIG URL == */
	this.config_url_ep = function(json){
		
		/* COLETAR DADOS == */
		var objeto_json_ep = json.objeto_json_ep;
		var funcao_ep = objeto_json_ep.funcao_ep;
		var titulo_ep = document.title;
		var url_ep = json.url_ep;
		var tipo_ep = '';
		if(json.tipo_ep){tipo_ep = json.tipo_ep;}
		
		/* PROCESSAR SESSION-STORAGE DE EVENTOS == */
		this.funcoes_session_storage_add_ep(funcao_ep);
		
		/* APLICAR A URL == */
		if(tipo_ep == 'replaceState'){
			history.replaceState({}, titulo_ep, url_ep);
		} else {
			history.pushState({}, titulo_ep, url_ep);
		}
		
	}

	/* INCIAR GPS == */
	this.gps_iniciar_ep = function(){

	    var sistema_os_ep = classApi.sistema_os_ep();

        if(sistema_os_ep.search(/(Android|android)/ig) >= 0){

			if(window.ANDROID){
				ANDROID.gps_iniciar_ep_app();
			}
			
		 } else {

			console.log('PROCESSO "INICIAR GPS" APENAS PARA DISPOSITIVOS...');

		 }

	}

	/* PARAR GPS == */
    this.gps_parar_ep = function(){

        var sistema_os_ep = classApi.sistema_os_ep();

        if(sistema_os_ep.search(/(Android|android)/ig) >= 0){

			if(window.ANDROID){
				ANDROID.gps_parar_ep_app();
			}
				
         } else {

            console.log('PROCESSO "PARAR GPS" APENAS PARA DISPOSITIVOS...');

         }

    }

    /* FULLSCREEN == */
    this.fullscreen_ep = function(status){

        var sistema_os_ep = classApi.sistema_os_ep();

        if(sistema_os_ep.search(/(Android|android)/ig) >= 0){

			if(window.ANDROID){
				ANDROID.fullscreen_ep_app(status);
			}
			
         } else {

            console.log('PROCESSO "FULLSCREEN" APENAS PARA DISPOSITIVOS...');

         }

    }

    /* TROCAR COR DO STATUS BAR == */
    this.trocar_cor_status_bar_ep = function(tipo, cor){

        var sistema_os_ep = classApi.sistema_os_ep();

        if(sistema_os_ep.search(/(Android|android)/ig) >= 0){

			if(window.ANDROID){
				ANDROID.trocar_cor_status_bar_ep_app(tipo, cor);
			}
			
         } else {

            console.log('PROCESSO "TROCAR COR STATUS BAR" APENAS PARA DISPOSITIVOS...');

         }


    }

    /* INFORMAÇÕES DO GPS == */
    this.gps_info_ep = function(){

        var sistema_os_ep = classApi.sistema_os_ep();
        var json_gps_ep = '';

        if(sistema_os_ep.search(/(Android|android)/ig) >= 0){

			if(window.ANDROID){
				json_gps_ep = ANDROID.gps_info_ep_app();
				json_gps_ep = eval('('+json_gps_ep+')');
			}
			
         } else {

            console.log('PROCESSO "INFORMAÇÕES DO GPS" APENAS PARA DISPOSITIVOS...');

         }

        return json_gps_ep;

    }
	
	/* CRIAR PASTA DO CLIENTE NO DISPOSITIVO == */
	this.login_ep_app =  function(json_post_ep){
		
		var sistema_os_ep = classApi.sistema_os_ep();
		
		if(sistema_os_ep.search(/(Android|android)/ig) >= 0){
			
			if(window.ANDROID){
				ANDROID.login_ep_app(json_post_ep);
			}
			
		 } else {
			
			console.log('PROCESSO APENAS PARA DISPOSITIVOS...');
			
		 }
		
	}
	
	/* SALVAR ANEXOS NOS DISPOSITIVOS DO CLIENTE == */
	this.salvar_anexos_cm_vi_app = function(json_post_ep){
		
		var sistema_os_ep = classApi.sistema_os_ep();
		
		if(sistema_os_ep.search(/(Android|android)/ig) >= 0){
			
			if(window.ANDROID){
				ANDROID.salvar_anexos_cm_vi_app(json_post_ep);
			}
			
		 } else {
			
			envio_arqs_cm_vi_wk();
			console.log('PROCESSO APENAS PARA DISPOSITIVOS...');
			
		 }
		
	}
	
	/* CÓDIGO DO PEDIDO EM URL == */
	this.cod_pd_url_ep =  function(url_ep){
		
		var url_ep = String(url_ep);
		var leng_url_ep = url_ep.length;
		var pos_url_ep = url_ep.lastIndexOf('?');
		var cod_pd = url_ep.substr((pos_url_ep+1));
		
		return cod_pd;
		
	}
	
	/* LOOP DE OPÇÕES == */
	this.select_quantidade_ep = function(id_ele, quantidade){
		
		/* PROCESSAR DADOS == */
		if(!quantidade){
			quantidade = 15;	
		} else {
			quantidade = Number(quantidade);	
		}
		
		/* VARIÁVEIS == */
		var opcoes_select = '';
		
		/* LOOP DE DADOS == */
		for(var i=0;i<quantidade;i++){
		
			opcoes_select = opcoes_select+'<option value="'+i+'">'+i+'</option>';
			
		}
		
		var select_ep = '<select id="'+id_ele+'" name="'+id_ele+'">'+opcoes_select+'</select>';
		
		return select_ep;
		
	}
	
	/* FORMATAR STRINGS == */
	this.formata_strings_ep = function(valor, tipo){
		
		if(valor){
		
			if(tipo == 'cnpj'){
				
				valor = valor.replace(/\D/g,'');
				valor = valor.replace(/\D/g,"");                   
				valor = valor.replace(/^(\d{2})(\d)/,"$1.$2");     
				valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3"); 
				valor = valor.replace(/\.(\d{3})(\d)/,".$1/$2");
				valor = valor.replace(/(\d{4})(\d)/,"$1-$2");
				
			} else if(tipo == 'cpf'){
				
				valor = valor.replace(/\D/g,'');
				valor = valor.replace(/\D/g,"");
				valor = valor.replace(/(\d{3})(\d)/,"$1.$2");
				valor = valor.replace(/(\d{3})(\d)/,"$1.$2");
				valor = valor.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
				
			} else if(tipo == 'telefone'){
				
				valor = valor.replace(/\D/g,'');
				var qnt_valor = valor.length;
				if(qnt_valor <= 10){
					valor = valor.replace(/^(\d\d)(\d)/g,"($1) $2");
					valor = valor.replace(/(\d{4})(\d)/,"$1-$2");
				} else {
					valor = valor.replace(/^(\d\d)(\d)/g,"($1) $2");
					valor = valor.replace(/(\d{5})(\d)/,"$1-$2");
				}
				
			} else if(tipo == 'cep'){
				
				valor = valor.replace(/\D/g,'');
				valor = valor.replace(/D/g,"");
				valor = valor.replace(/^(\d{5})(\d)/,"$1-$2");
				
			} else if(tipo == 'data'){
				
				valor = valor.replace(/\D/g,'');
				valor = valor.replace(/(\d{2})(\d)/,"$1/$2");
				valor = valor.replace(/(\d{2})(\d)/,"$1/$2");
				
			} else if(tipo == 'hora'){
				
				valor = valor.replace(/\D/g,'');
				valor = valor.replace(/(\d{2})(\d)/,"$1:$2");
				valor = valor.replace(/(\d{2})(\d)/,"$1:$2");
				
			} else if(tipo == 'numeros_int'){
				
				/*Numeros inteiros == */
				valor = Number(valor.replace(/\D/ig, ''))+0;
				
			}
		
		}
		
		return valor;
		
	}
	
	/* PROCESSAR CAMPOS INPUTS, TEXTOS E ETC == */
	this.formata_campos_ep = function(elemento, tipo){
		
		/* CHAVES DO TECLADO == */
		if(window.event){
			
			var keycode = event.keyCode;
			if(String(keycode).search(/(8|27|37|38|39|40)/ig) >= 0){
				return false;
			}
		
		} else {
			
			var keycode = elemento.event;
			if(String(keycode).search(/(8|27|37|38|39|40)/ig) >= 0){
				return false;
			}
			
		}
		
		/* PROCESSOS == */
		setTimeout(function(){
			
			if(tipo == 'cnpj'){
			
				$(elemento).attr('maxlength' , '18');
				var valor_elemento = elemento.value;
				var valor = valor_elemento.replace(/\D/g,'');
				valor = valor.replace(/\D/g,"");                   
				valor = valor.replace(/^(\d{2})(\d)/,"$1.$2");     
				valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3"); 
				valor = valor.replace(/\.(\d{3})(\d)/,".$1/$2");
				valor = valor.replace(/(\d{4})(\d)/,"$1-$2");
				elemento.value = valor;
				
			} else if(tipo == 'cpf'){
				
				$(elemento).attr('maxlength' , '14');
				var valor_elemento = elemento.value;
				var valor = valor_elemento.replace(/\D/g,'');
				valor = valor.replace(/\D/g,"");
				valor = valor.replace(/(\d{3})(\d)/,"$1.$2");
				valor = valor.replace(/(\d{3})(\d)/,"$1.$2");
				valor = valor.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
				elemento.value = valor;
				
			} else if(tipo == 'telefone'){
				
				$(elemento).attr('maxlength', '15');
				var valor_elemento = elemento.value;
				var valor = valor_elemento.replace(/\D/g,'');
				var qnt_valor = valor.length;
				if(qnt_valor <= 10){
					valor = valor.replace(/^(\d\d)(\d)/g,"($1) $2");
					valor = valor.replace(/(\d{4})(\d)/,"$1-$2");    
					elemento.value = valor;
				} else {
					valor = valor.replace(/^(\d\d)(\d)/g,"($1) $2");
					valor = valor.replace(/(\d{5})(\d)/,"$1-$2");    
					elemento.value = valor;
				}
				
			} else if(tipo == 'cep'){
				
				$(elemento).attr('maxlength' , '9');
				var valor_elemento = elemento.value;
				var valor = valor_elemento.replace(/\D/g,'');
				valor = valor.replace(/D/g,"");
				valor = valor.replace(/^(\d{5})(\d)/,"$1-$2");
				elemento.value = valor;
				
			} else if(tipo == 'data'){
				
				$(elemento).attr('maxlength' , '10');
				var id_elemento = elemento.id;
				var valor_elemento = elemento.value;
				var valor = valor_elemento.replace(/\D/g,'');
				valor = valor.replace(/(\d{2})(\d)/,"$1/$2");
				valor = valor.replace(/(\d{2})(\d)/,"$1/$2");
				elemento.value = valor;
				
			} else if(tipo == 'hora'){
				
				$(elemento).attr('maxlength' , '8');
				var id_elemento = elemento.id;
				var valor_elemento = elemento.value;
				var valor = valor_elemento.replace(/\D/g,'');
				valor = valor.replace(/(\d{2})(\d)/,"$1:$2");
				valor = valor.replace(/(\d{2})(\d)/,"$1:$2");
				elemento.value = valor;
				
			} else if(tipo == 'numeros_int'){
				
				/*Numeros inteiros == */
				var valor_elemento = elemento.value;
				var valor = Number(valor_elemento.replace(/\D/ig, ''))+0;
				elemento.value = valor;
				
			}
			
		}, 300);
		
	}
	
	/*Retorna informa��o sobre o elemento == */
	this.info_elemento_ep = function(elemento){
		
		if(!elemento){return false;}
		
		var left = 0;
		var top = 0;
		var width = elemento.offsetWidth;
		var height = elemento.offsetHeight;
		var parent = elemento.offsetParent;
		
		if(parent){
			do{
				left += elemento.offsetLeft;
				top += elemento.offsetTop;
			} while(elemento = elemento.offsetParent);
		}
		
	    return {left:left, top:top, width:width, height:height};
	    
	}
	
	/* OPEN MENU MAIS == */
	this.open_menu_mais_lp_ep = function(status, elemento, html){
		
		if(status == 'open'){
			
			/* ELEMENTO CLICK == */
			var info_elemento_ep = classApi.info_elemento_ep(elemento);
			var left = Number(info_elemento_ep.left);
			var top = Number(info_elemento_ep.top);
			var width = Number(info_elemento_ep.width);
			var height = Number(info_elemento_ep.height);
			
			/* PROCESSAR DIV == */
			var menu_mais_html_lp_ep = document.getElementById('menu_mais_html_lp_ep');
			
			if(!menu_mais_html_lp_ep){
				
				menu_mais_html_lp_ep = '<div class="menu_mais_html_lp_ep" id="menu_mais_html_lp_ep"> '+html+' </div> <div class="menu_mais_lp_ep" id="menu_mais_lp_ep"> <div class="div_alpha_ep" onclick="classApi.open_menu_mais_lp_ep('+"'close'"+')"></div> </div>';
				$('body').append(menu_mais_html_lp_ep);
				
				/* COLETANDO INFORMA��ES == */
				var lar_win_ep = $(window).width();
				var alt_win_ep = $(window).height();
				var lar_div_ep = $('#menu_mais_html_lp_ep .div_html_ep').width();
				var alt_div_ep = $('#menu_mais_html_lp_ep .div_html_ep').height();
				
				var posx = ((left-160)+width);
				var posy = (top-10);
				
				$('.menu_mais_html_lp_ep, .menu_mais_lp_ep').css({'display':'block'});
				$('.menu_mais_html_lp_ep').css({'left':posx+'px', 'top':posy+'px' });
				
			}
			
		} else if(status == 'close'){
			
			$('.menu_mais_html_lp_ep').slideUp('fast', function(event){
				$('.menu_mais_lp_ep').slideUp('fast', function(){
					$('.menu_mais_html_lp_ep, .menu_mais_lp_ep').remove();
				});									   
			});
			
		}
		
	}
	
	/* GERAR ID DE CONTE�DO == */
	this.gerar_id_cont_ep = function(){
		var time = new Date();
		time = time.getTime();
		return time;
	}
	
	/* CALCULAR BYTES == */
	this.calc_bytes_ep = function(bytes, tipo){
		
		if(bytes < 1024){
			bytes = bytes+' Bytes';
		} else if((bytes >= 1024) && (bytes < (1024*1024))){
			bytes = (bytes/1204).toFixed(2)+' Kb';
		} else if((bytes >= (1024*1024)) && (bytes < (1024*1024*1024))){
			bytes = (bytes/(1024*1024)).toFixed(2)+' Mb';
		} else if(bytes >= (1024*1024*1024)){
			bytes = (bytes/(1024*1024*1024)).toFixed(2)+' Gb';
		}
		
		return bytes;
		
	}
	
	/* DESTACA SOMENTE N�MEROS == */
	this.somente_nr_ep = function(string_ent){
		
		if(string_ent){	
		
			var tp_string_ent = typeof(string_ent);
			if(tp_string_ent == 'object'){
				
				var elemento = string_ent;
				var valor_string_ent = Number($(elemento).val().replace(/\D/ig, '').replace('', '0'))+0;
				$(elemento).val(valor_string_ent);
				
			} else if(tp_string_ent == 'string'){
				
			}
			
		}
		
	}
	
	this.data_ep = function(json){
	
		var formato_data = 'd/m/Y';
		if(json.formato_data){formato_data = json.formato_data;}
		var input_time = '';
		if(json.input_time){input_time = json.input_time;}
	
		if(input_time){
			input_time = input_time.split(' ');
			var intervalo = Number(input_time[0]);
			var tipo_intervalo = input_time[1];
		} else {
			var intervalo = 0;
			var tipo_intervalo = '';
		}
		
		var array_mes_digito = Array('01','02','03','04','05','06','07','08','09','10','11','12');
		var data = new Date();
		
		if((tipo_intervalo == 'dia') || (tipo_intervalo == 'dias')){
			data.setDate(data.getDate() + intervalo);
		}
		if((tipo_intervalo == 'mes') || (tipo_intervalo == 'meses')){
			data.setMonth(data.getMonth() + intervalo);
		}
		if((tipo_intervalo == 'ano') || (tipo_intervalo == 'anos')){
			data.setFullYear(data.getFullYear() + intervalo);
		}
		if((tipo_intervalo == 'hora') || (tipo_intervalo == 'horas')){
			data.setHours(data.getHours() + intervalo);
		}
		if((tipo_intervalo == 'minuto') || (tipo_intervalo == 'minutos')){
			data.setMinutes(data.getMinutes() + intervalo);
		}
		if((tipo_intervalo == 'segundo') || (tipo_intervalo == 'segundos')){
			data.setSeconds(data.getSeconds() + intervalo);
		}
		
		var dia = data.getDate();
		if(dia < 10){dia = '0'+dia;}
		var mes = data.getMonth();
		mes = array_mes_digito[mes];
		var ano = data.getFullYear();
		var hora = data.getHours();
		if(hora < 10){hora = '0'+hora;}
		var minutos = data.getMinutes();
		if(minutos < 10){minutos = '0'+minutos;}
		var segundos = data.getSeconds();
		if(segundos < 10){segundos = '0'+segundos;}
		var time = data.getTime();
		var array_data = new Array('Y'+ano , 'm'+mes , 'd'+dia , 'H'+hora , 'i'+minutos , 's'+segundos);
		
		formato_data = formato_data.split('');
		var quantidade_formato_data = formato_data.length;
		var data_formatada = '';
		
		for(i=0;i<formato_data.length;i++){
			var parametro = formato_data[i];
			var busca_paramentro = parametro.search(/[YmdHis]/g);
			if(busca_paramentro>=0){
				for(d=0;d<array_data.length;d++){
					var busca_array_data = array_data[d].search(parametro);
					if(busca_array_data >= 0){
						parametro = array_data[d].replace(/\D/g , '');
					}
				}
			}
			data_formatada = data_formatada+''+parametro;
		}
		
		return data_formatada;
	
	}
	
	/* CONVERTE DATAS == */
	this.converte_data_ep = function(json){
		
		var data = '';
		var tipo = '';
		
		if(json.data){data = json.data;}
		if(json.tipo){tipo = json.tipo;}
		
		data = data.substr(0, 10);
		data = data.split(/\/|-/g);
		var quantidade_data = data.length;
		var data_temp = Array();
		
		if(tipo != 'data_js'){
		
			for(d=0;d<quantidade_data;d++){
				var valor_array = data[d];
				if((tipo == 'pt-br') || (!tipo)){
					data_temp.push(valor_array);
				} else if(tipo == 'en'){
					data_temp.unshift(valor_array);
				}
			}
			
			data = data_temp.toString().replace(/\,/g, '-');
		
		} else if(tipo == 'data_js'){
			
			data_temp.push(data[1]);
			data_temp.push(data[0]);
			data_temp.push(data[2]);
			
			data = data_temp.toString().replace(/\,/g, '/');
			
		}
		
		return data;
		
	}
	
	/* ESCAPA CARACTERES == */
	this.escapa_caracteres_sqlite_ep = function(string){

		if(string){
        	string = string.replace(/(')/ig, "''");
		} else {
			string = '';
		}
		
		return string;

    }
	
	/* PROCESSAR NOME DE ARQUIVO == */
	this.processar_nome_aq = function(nome_aq, limite_leng_nome_aq){
		
		var nome_aq = nome_aq;
		var limite_leng_nome_aq = limite_leng_nome_aq;
		var leng_nome_aq = Number(nome_aq.length);
		
		if(leng_nome_aq > limite_leng_nome_aq){
		
			var pri_nome_aq = nome_aq.substr(0, (leng_nome_aq-4));
			var leng_pri_nome_aq = Number(pri_nome_aq.length);
			
			if(leng_pri_nome_aq > limite_leng_nome_aq){
				var pri_nome_aq = nome_aq.substr(0, limite_leng_nome_aq);
			}
			
			var ult_nome_aq = nome_aq.substr((leng_nome_aq-4), 4);
			nome_aq = pri_nome_aq+'..'+ult_nome_aq;
		
		}
		
		return nome_aq;
		
	}
	
	/* AJUSTAR DIV_BOX_EP AO TAMANHO DA TELA == */
	this.ajustar_tamanho_box_ep = function (status, time_close_interval){
		
		sts_ajustar_tamanho_box_ep = '';
	
		if(status == 'open'){
		
			sts_ajustar_tamanho_box_ep = setInterval(function(){
			
				/* COLETANDO INFORMA��ES == */
				var lar_win_ep = $(window).width();
				var alt_win_ep = $(window).height();
				alt_win_ep = (alt_win_ep-43);
				
				$('.div_box_ep .div_iframe .div').css({'height':alt_win_ep+'px'});
			
			}, 1000);
			
			if(time_close_interval){
				
				setTimeout(function(){
					clearInterval(sts_ajustar_tamanho_box_ep);
				}, time_close_interval);
				
			}
			
		} else if(status == 'close'){
		
			clearInterval(sts_ajustar_tamanho_box_ep);
		
		}
	
	}
	
	/* DIV LOADING == */
	this.loading_full_screen_ep = function(status, json){
		
		if(status == 'open'){
			
			/* COLETANDO DADOS == */
			var titulo_al = 'CARREGANDO...';
			var texto_al = '';
			var html_al = '';
			var time_close_al = 0;

			/* LEGENDAS DO ALERTA == */
			if(json){

			    if(json.titulos_al){
			        var titulos_al = json.titulos_al;
				    if(titulos_al.titulo_al){titulo_al = '<div class="div_titulo">'+titulos_al.titulo_al+'</div>';}
				    if(titulos_al.texto_al){texto_al = '<div class="div_texto">'+titulos_al.texto_al+'</div>';}
				    if(titulos_al.html_al){html_al = '<div class="div_html">'+titulos_al.html_al+'</div>';}
				}

				/* PROCESSAR FULLSCREEN == */
				if(json.fullscreen_al){

				    if(json.fullscreen_al > 0){
                        this.fullscreen_ep('open');
                    }

				}

			}

            var div_loading_full_screen_ep = document.getElementById('div_loading_full_screen_ep');
			
			if(!div_loading_full_screen_ep){
				
				div_loading_full_screen_ep = '<div class="div_loading_full_screen_ep" id="div_loading_full_screen_ep"> <div class="div_alpha_ep"></div> <div class="div_loading_ep"> <div><img src="img/loading.gif" /></div> '+titulo_al+' </div> </div>';
				$('body').append(div_loading_full_screen_ep);
				
				var lar_win_ep = $(window).width();
				var alt_win_ep = $(window).height();
				var lar_div_ep = $('#div_loading_full_screen_ep .div_loading_ep').width();
				var alt_div_ep = $('#div_loading_full_screen_ep .div_loading_ep').height();
				
				var posx = (lar_win_ep-lar_div_ep)/2;
				var posy = ((alt_win_ep/2)-alt_div_ep);
				
				$('#div_loading_full_screen_ep .div_loading_ep').css({'top':posy+'px', 'left':posx+'px'});
				
			}
		
		} else {

			if(json){

			    /* PROCESSAR FULLSCREEN == */
                if(json.fullscreen_al){

                    if(json.fullscreen_al == '0'){
                        this.fullscreen_ep('close');
                    }

                }

			}

			var div_loading_full_screen_ep = document.getElementById('div_loading_full_screen_ep');

			if(div_loading_full_screen_ep){
				$(div_loading_full_screen_ep).remove();
			}
			
		}
			
	}
	
	/* DIV ALERTA LOADING == */
	this.alerta_full_screen_ep = function(status, json){

		if(status == 'open'){
			
			/* COLETANDO DADOS == */
			var titulo_al = '';
			var titulo_al_replace = '';
			var texto_al = '';
			var texto_al_replace = '';
			var html_al = '';
			var html_al_replace = '';
			var time_close_al = 0;
			var efeito_close_al = '';
			var fullscreen_al = '';
			
			/* LEGENDAS DO ALERTA == */
			if(json.titulos_al){
				var titulos_al = json.titulos_al;
				if(titulos_al.titulo_al){
					titulo_al = '<div class="div_titulo">'+titulos_al.titulo_al+'</div>';
					titulo_al_replace = titulos_al.titulo_al;
				}
				if(titulos_al.texto_al){
					texto_al = '<div class="div_texto">'+titulos_al.texto_al+'</div>';
					texto_al_replace = titulos_al.titulo_al;
				}
				if(titulos_al.html_al){
					html_al = '<div class="div_html">'+titulos_al.html_al+'</div>';
					html_al_replace = titulos_al.html_al;
				}
			}

			/* PROCESSAR FULLSCREEN == */
			if(json.fullscreen_al){

                fullscreen_al = json.fullscreen_al;

			    if(fullscreen_al > 0){

			        this.fullscreen_ep('open');

			    }

			}
			
			if(json.efeito_close_al){
				efeito_close_al = json.efeito_close_al;	
			}
			
			/* TIME PARA FECHAR ALERTA == */
			if(json.time_close_al){
				
				var time_close_al = json.time_close_al;
				
				setTimeout(function(event){
					classApi.alerta_full_screen_ep('close', {efeito_close_al:efeito_close_al, fullscreen_al:fullscreen_al});
				}, time_close_al);
				
			}
			
			/* PROCESSAR DIV == */
			var div_alerta_full_screen_ep = document.getElementById('div_alerta_full_screen_ep');
			
			if(!div_alerta_full_screen_ep){
				
				div_alerta_full_screen_ep = '<div class="div_alerta_full_screen_ep" id="div_alerta_full_screen_ep"> <div class="div_alpha_ep"></div> <div class="div_loading_ep"> '+titulo_al+texto_al+html_al+' </div> </div>';
				$('body').append(div_alerta_full_screen_ep);
				
				var lar_win_ep = $(window).width();
				var alt_win_ep = $(window).height();
				var lar_div_ep = $('#div_alerta_full_screen_ep .div_loading_ep').width();
				var alt_div_ep = $('#div_alerta_full_screen_ep .div_loading_ep').height();
				
				var posx = (lar_win_ep-lar_div_ep)/2;
				var posy = ((alt_win_ep/2)-alt_div_ep);
				if(posy < 0){posy = 15;}
				
				if(alt_div_ep > alt_win_ep){alt_div_ep = (alt_win_ep-(posy*2));}
				
				$('#div_alerta_full_screen_ep .div_loading_ep').css({'top':posy+'px', 'left':posx+'px', 'height':alt_div_ep+'px'});
				$('#div_alerta_full_screen_ep .div_loading_ep .div_html').css({'height':alt_div_ep+'px'});
				
			} else {
				
				$('#div_alerta_full_screen_ep .div_titulo').html(titulo_al_replace);
				$('#div_alerta_full_screen_ep .div_texto').html(texto_al_replace);
				$('#div_alerta_full_screen_ep .div_html').html(html_al_replace);
				
			}
			
		} else if(status == 'close'){
			
			var efeito_close_al = '';
			var fullscreen_al = '';

			if(json){
			
				if(json.efeito_close_al){
					efeito_close_al = json.efeito_close_al;	
				}

                /* CLOSE FULLSCREEN == */
				if(json.fullscreen_al){

                    fullscreen_al = json.fullscreen_al;

                }
				
			}
			
			if(efeito_close_al == 'fadeOut'){
				
				$('#div_alerta_full_screen_ep .div_loading_ep').fadeOut('fast', function(event){

				    $('#div_alerta_full_screen_ep').fadeOut('fast', function(){

				        $(this).remove();

				        if(json.fullscreen_al == '0'){
                            this.fullscreen_ep('close');
                        }

					});
				});
			
			} else {

				if(fullscreen_al == '0'){
                    this.fullscreen_ep('close');
                }

				$('#div_alerta_full_screen_ep').remove();
				
			}
			
		}
		
	}
	
	/* DIV ALERTA LOADING == */
	this.alerta_full_screen_ep2 = function(status, json){
		
		if(status == 'open'){
			
			/* COLETANDO DADOS == */
			var titulo_al = '';
			var titulo_al_replace = '';
			var texto_al = '';
			var texto_al_replace = '';
			var html_al = '';
			var html_al_replace = '';
			var time_close_al = 0;
			var efeito_close_al = '';
			var fullscreen_al = '';
			
			/* LEGENDAS DO ALERTA == */
			if(json.titulos_al){
				var titulos_al = json.titulos_al;
				if(titulos_al.titulo_al){
					titulo_al = '<div class="div_titulo">'+titulos_al.titulo_al+'</div>';
					titulo_al_replace = titulos_al.titulo_al;
				}
				if(titulos_al.texto_al){
					texto_al = '<div class="div_texto">'+titulos_al.texto_al+'</div>';
					texto_al_replace = titulos_al.titulo_al;
				}
				if(titulos_al.html_al){
					html_al = '<div class="div_html">'+titulos_al.html_al+'</div>';
					html_al_replace = titulos_al.html_al;
				}
			}
			
			/* PROCESSAR FULLSCREEN == */
			if(json.fullscreen_al){

                fullscreen_al = json.fullscreen_al;

			    if(fullscreen_al > 0){

			        this.fullscreen_ep('open');

			    }

			}
			
			if(json.efeito_close_al){
				efeito_close_al = json.efeito_close_al;	
			}
			
			/* TIME PARA FECHAR ALERTA == */
			if(json.time_close_al){
				
				var time_close_al = json.time_close_al;
				
				setTimeout(function(event){
					classApi.alerta_full_screen_ep2('close', {efeito_close_al:efeito_close_al, fullscreen_al:fullscreen_al});
				}, time_close_al);
				
			}
			
			/* PROCESSAR DIV == */
			var div_alerta_full_screen_ep = document.getElementById('div_alerta_full_screen_ep');
			
			if(!div_alerta_full_screen_ep){
				
				div_alerta_full_screen_ep = '<div class="div_alerta_full_screen_ep" id="div_alerta_full_screen_ep"> <div class="div_alpha_ep"></div> <div class="div_loading_ep"> '+titulo_al+texto_al+html_al+' </div> </div>';
				$('body').append(div_alerta_full_screen_ep);
				
				var lar_win_ep = $(window).width();
				var alt_win_ep = $(window).height();
				var lar_div_ep = $('#div_alerta_full_screen_ep .div_loading_ep').width();
				var alt_div_ep = $('#div_alerta_full_screen_ep .div_loading_ep').height();
				
				var posx = (lar_win_ep-lar_div_ep)/2;
				var posy = ((alt_win_ep/2)-alt_div_ep);
				if(posy < 0){posy = 15;}
				
				if(alt_div_ep > alt_win_ep){alt_div_ep = (alt_win_ep-(posy*2));}
				
				$('#div_alerta_full_screen_ep .div_loading_ep').css({'top':posy+'px', 'left':posx+'px', 'height':alt_div_ep+'px'});
				$('#div_alerta_full_screen_ep .div_loading_ep .div_html').css({'height':alt_div_ep+'px'});
				
			} else {
				
				$('#div_alerta_full_screen_ep .div_titulo').html(titulo_al_replace);
				$('#div_alerta_full_screen_ep .div_texto').html(texto_al_replace);
				$('#div_alerta_full_screen_ep .div_html').html(html_al_replace);
				
			}
			
		} else if(status == 'close'){
			
			var efeito_close_al = '';
			var fullscreen_al = '';

			if(json){
			
				if(json.efeito_close_al){
					efeito_close_al = json.efeito_close_al;	
				}

                /* CLOSE FULLSCREEN == */
				if(json.fullscreen_al){

                    fullscreen_al = json.fullscreen_al;

                }
				
			}
			
			if(efeito_close_al == 'fadeOut'){
				
				$('#div_alerta_full_screen_ep .div_loading_ep').fadeOut('fast', function(event){

				    $('#div_alerta_full_screen_ep').fadeOut('fast', function(){

						classApi.trocar_cor_status_bar_ep('voltar');
				        $(this).remove();

				        if(json.fullscreen_al == '0'){
                            this.fullscreen_ep('close');
                        }

					});
				});
			
			} else {


				if(fullscreen_al == '0'){
                    this.fullscreen_ep('close');
                }

				$('#div_alerta_full_screen_ep').remove();
				
			}
			
		}
		
	}
	
	/* DIV WINDOW FULLSCREEN == */
	this.window_full_screen_ep = function(status, json){
		
		if(status == 'open'){
			
			/* COLETANDO DADOS == */
			var html_dl = '';
			var time_close_dl = 0;
			var cor_status_bar_dl = '';
			var fullscreen_dl = '';
			window_full_screen_ep_open = 1;
			timeinterval_window_fullscreen_ep = '';

			/* LEGENDAS DO ALERTA == */
			if(json.attr_dl){

				var attr_dl = json.attr_dl;
				if(attr_dl.html_dl){html_dl = '<div class="div_inner_html_ep">'+attr_dl.html_dl+'</div>';}

			}

			/* PŔOCESSAR COR DO STATUS BAR == */
			if(json.cor_status_bar_dl){
			    cor_status_bar_dl = json.cor_status_bar_dl;
			}

			/* PROCESSAR FULLSCREEN == */
			if(json.fullscreen_al){

			    fullscreen_dl = json.fullscreen_al;

			}

			/* TIME PARA FECHAR ALERTA == */
			if(json.time_close_dl){
				
				var time_close_dl = json.time_close_dl;
				
				setTimeout(function(event){
					classApi.dialogo_full_screen_ep('close');
				}, time_close_dl);
				
			}

			/* TROCAR COR DO STATUS BAR == */
			if(cor_status_bar_dl){
                this.trocar_cor_status_bar_ep('trocar', cor_status_bar_dl);
			}

            /* FULLSCREEN - HABILITAR == */
			if(fullscreen_dl > 0){
			    this.fullscreen_ep('open');
			}

			/* PROCESSAR DIV == */
			var div_window_fullscreen_ep = document.getElementById('div_window_fullscreen_ep');
			
			if(!div_window_fullscreen_ep){
				
				div_window_fullscreen_ep = '<div class="div_window_fullscreen_ep" id="div_window_fullscreen_ep"> <div class="div_alpha_ep" onclick="classApi.dialogo_full_screen_ep('+"'close'"+')"></div> <div class="div_html_ep"> '+html_dl+' </div> </div>';
				$('body').append(div_window_fullscreen_ep);
				
				/* COLETANDO INFORMA��ES == */
				var lar_win_ep = $(window).width();
				var alt_win_ep = $(window).height();
				var lar_div_ep = $('#div_window_fullscreen_ep .div_html_ep').width();
				var alt_div_ep = $('#div_window_fullscreen_ep .div_html_ep').height();
				
				/* DEFINIR POSI��O DA DIV DIALOGO == */
				var posx = 0;
				var posy = 0;
				
				if(alt_div_ep > alt_win_ep){alt_div_ep = (alt_win_ep-(posy*2));}
				
				$('#div_window_fullscreen_ep .div_html_ep').css({'top':posy+'px', 'left':posx+'px', 'height':alt_win_ep+'px'});
				$('#div_window_fullscreen_ep .div_html_ep .div_inner_html_ep').css({'height':alt_div_ep+'px'});
				
				/* DEFINIR POSI��O DE ELEMENTOS TOP E BOTTOM == */
				var alt_div_bnts_dl_ep = $('#div_window_fullscreen_ep .div_html_ep .div_bnts_dl_ep').height();
				var pos_rodape_ep = (alt_win_ep-(alt_win_ep-(alt_div_ep+posy)))-alt_div_bnts_dl_ep;
				
				$('#div_window_fullscreen_ep .div_html_ep .cab_dl_ep').css({'position':'fixed', 'width':lar_div_ep+'px', 'left':posx+'px'});
				$('#div_window_fullscreen_ep .div_html_ep .div_bnts_dl_ep').css({'position':'fixed', 'width':lar_div_ep+'px', 'height':alt_div_bnts_dl_ep+'px', 'left':posx+'px', 'top':pos_rodape_ep+'px'});
				
			}
			
			/* PORCESSAR SCRIPTS == */
			timeinterval_window_fullscreen_ep = setInterval(function(){
				
				/* COLETANDO INFORMA��ES == */
				var lar_win_ep = $(window).width();
				var alt_win_ep = $(window).height();
				var lar_div_ep = $('#div_window_fullscreen_ep .div_html_ep').width();
				var alt_div_ep = $('#div_window_fullscreen_ep .div_html_ep .div_inner_html_ep div:first-child').height();
				
				var posx = 0;
				var posy = 0;
				
				if(alt_div_ep > alt_win_ep){alt_div_ep = (alt_win_ep-(posy*2));}
				
				$('#div_window_fullscreen_ep .div_html_ep').css({'top':posy+'px', 'left':posx+'px', 'height':alt_win_ep+'px'});
				$('#div_window_fullscreen_ep .div_html_ep .div_inner_html_ep').css({'height':alt_div_ep+'px'});
				
				/* DEFINIR POSI��O DE ELEMENTOS TOP E BOTTOM == */
				var alt_div_bnts_dl_ep = $('#div_window_fullscreen_ep .div_html_ep .div_bnts_dl_ep').height();
				var pos_rodape_ep = (alt_win_ep-(alt_win_ep-(alt_div_ep+posy)))-alt_div_bnts_dl_ep;
				
				$('#div_window_fullscreen_ep .div_html_ep .cab_dl_ep').css({'position':'fixed', 'width':lar_div_ep+'px', 'left':posx+'px'});
				$('#div_window_fullscreen_ep .div_html_ep .div_bnts_dl_ep').css({'position':'fixed', 'width':lar_div_ep+'px', 'height':alt_div_bnts_dl_ep+'px', 'left':posx+'px', 'top':pos_rodape_ep+'px'});
				
				/* ENCERRAR SCRIPT == */
				if(window_full_screen_ep_open == 0){
					clearTimeout(timeinterval_window_fullscreen_ep);
				}
				
			}, 100);
			
		} else if(status == 'close'){
			
			window_full_screen_ep_open = 0;
			
			$('#div_window_fullscreen_ep .div_html_ep').fadeOut('fast', function(event){

			    classApi.fullscreen_ep('close');
			    
				$('#div_window_fullscreen_ep').fadeOut('fast', function(){
					$(this).remove();
				});

			});			
			
		}
		
	}
	
	/* DIV WINDOW FULLSCREEN 2 == */
	this.window_full_screen_ep2 = function(status, json){
		
		if(status == 'open'){
			
			/* COLETANDO DADOS == */
			var html_dl = '';
			var time_close_dl = 0;
			var cor_status_bar_dl = '';
			var fullscreen_dl = '';
			window_full_screen_ep_open2 = 1;
			timeinterval_window_fullscreen_ep2 = '';

			/* LEGENDAS DO ALERTA == */
			if(json.attr_dl){

				var attr_dl = json.attr_dl;
				if(attr_dl.html_dl){html_dl = '<div class="div_inner_html_ep">'+attr_dl.html_dl+'</div>';}

			}

			/* PŔOCESSAR COR DO STATUS BAR == */
			if(json.cor_status_bar_dl){
			    cor_status_bar_dl = json.cor_status_bar_dl;
			}

			/* PROCESSAR FULLSCREEN == */
			if(json.fullscreen_al){

			    fullscreen_dl = json.fullscreen_al;

			}

			/* TIME PARA FECHAR ALERTA == */
			if(json.time_close_dl){
				
				var time_close_dl = json.time_close_dl;
				
				setTimeout(function(event){
					classApi.dialogo_full_screen_ep('close');
				}, time_close_dl);
				
			}

			/* TROCAR COR DO STATUS BAR == */
			if(cor_status_bar_dl){
                this.trocar_cor_status_bar_ep('trocar', cor_status_bar_dl);
			}

            /* FULLSCREEN - HABILITAR == */
			if(fullscreen_dl > 0){
			    this.fullscreen_ep('open');
			}

			/* PROCESSAR DIV == */
			var div_window_fullscreen_ep2 = document.getElementById('div_window_fullscreen_ep2');
			
			if(!div_window_fullscreen_ep2){
				
				div_window_fullscreen_ep2 = '<div class="div_window_fullscreen_ep2" id="div_window_fullscreen_ep2"> <div class="div_alpha_ep" onclick="classApi.dialogo_full_screen_ep('+"'close'"+')"></div> <div class="div_html_ep"> '+html_dl+' </div> </div>';
				$('body').append(div_window_fullscreen_ep2);
				
				/* COLETANDO INFORMA��ES == */
				var lar_win_ep = $(window).width();
				var alt_win_ep = $(window).height();
				var lar_div_ep = $('#div_window_fullscreen_ep2 .div_html_ep').width();
				var alt_div_ep = $('#div_window_fullscreen_ep2 .div_html_ep').height();
				
				/* DEFINIR POSI��O DA DIV DIALOGO == */
				var posx = 0;
				var posy = 0;
				
				if(alt_div_ep > alt_win_ep){alt_div_ep = (alt_win_ep-(posy*2));}
				
				$('#div_window_fullscreen_ep2 .div_html_ep').css({'top':posy+'px', 'left':posx+'px', 'height':alt_win_ep+'px'});
				$('#div_window_fullscreen_ep2 .div_html_ep .div_inner_html_ep').css({'height':alt_div_ep+'px'});
				
				/* DEFINIR POSI��O DE ELEMENTOS TOP E BOTTOM == */
				var alt_div_bnts_dl_ep = $('#div_window_fullscreen_ep2 .div_html_ep .div_bnts_dl_ep').height();
				var pos_rodape_ep = (alt_win_ep-(alt_win_ep-(alt_div_ep+posy)))-alt_div_bnts_dl_ep;
				
				$('#div_window_fullscreen_ep2 .div_html_ep .cab_dl_ep').css({'position':'fixed', 'width':lar_div_ep+'px', 'left':posx+'px'});
				$('#div_window_fullscreen_ep2 .div_html_ep .div_bnts_dl_ep').css({'position':'fixed', 'width':lar_div_ep+'px', 'height':alt_div_bnts_dl_ep+'px', 'left':posx+'px', 'top':pos_rodape_ep+'px'});
				
			}
			
			/* PORCESSAR SCRIPTS == */
			timeinterval_window_fullscreen_ep2 = setInterval(function(){
				
				/* COLETANDO INFORMA��ES == */
				var lar_win_ep = $(window).width();
				var alt_win_ep = $(window).height();
				var lar_div_ep = $('#div_window_fullscreen_ep2 .div_html_ep').width();
				var alt_div_ep = $('#div_window_fullscreen_ep2 .div_html_ep .div_inner_html_ep div:first-child').height();
				
				var posx = 0;
				var posy = 0;
				
				if(alt_div_ep > alt_win_ep){alt_div_ep = (alt_win_ep-(posy*2));}
				
				$('#div_window_fullscreen_ep2 .div_html_ep').css({'top':posy+'px', 'left':posx+'px', 'height':alt_win_ep+'px'});
				$('#div_window_fullscreen_ep2 .div_html_ep .div_inner_html_ep').css({'height':alt_div_ep+'px'});
				
				/* DEFINIR POSI��O DE ELEMENTOS TOP E BOTTOM == */
				var alt_div_bnts_dl_ep = $('#div_window_fullscreen_ep2 .div_html_ep .div_bnts_dl_ep').height();
				var pos_rodape_ep = (alt_win_ep-(alt_win_ep-(alt_div_ep+posy)))-alt_div_bnts_dl_ep;
				
				$('#div_window_fullscreen_ep2 .div_html_ep .cab_dl_ep').css({'position':'fixed', 'width':lar_div_ep+'px', 'left':posx+'px'});
				$('#div_window_fullscreen_ep2 .div_html_ep .div_bnts_dl_ep').css({'position':'fixed', 'width':lar_div_ep+'px', 'height':alt_div_bnts_dl_ep+'px', 'left':posx+'px', 'top':pos_rodape_ep+'px'});
				
				/* ENCERRAR SCRIPT == */
				if(window_full_screen_ep_open2 == 0){
					clearTimeout(timeinterval_window_fullscreen_ep2);
				}
				
			}, 100);
			
		} else if(status == 'close'){
			
			window_full_screen_ep_open2 = 0;
			
			$('#div_window_fullscreen_ep2 .div_html_ep').fadeOut('fast', function(event){

			    classApi.fullscreen_ep('close');
			    
				$('#div_window_fullscreen_ep2').fadeOut('fast', function(){
					$(this).remove();
				});

			});			
			
		}
		
	}
	
	/* DIV DIALOGO == */
	this.dialogo_full_screen_ep = function(status, json){
		
		if(status == 'open'){
			
			/* COLETANDO DADOS == */
			var html_dl = '';
			var time_close_dl = 0;
			var cor_status_bar_dl = '';
			var fullscreen_dl = '';
			var lar_dl = '';
			var alt_dl = '';
			
			dialogo_full_screen_ep_open = 1;
			timeinterval_dialogo_full_screen_ep = '';

			/* LEGENDAS DO ALERTA == */
			if(json.attr_dl){

				var attr_dl = json.attr_dl;
				if(attr_dl.html_dl){html_dl = '<div class="div_inner_html_ep">'+attr_dl.html_dl+'</div>';}
				
				if(attr_dl.lar_dl){
					lar_dl = attr_dl.lar_dl;
				}
				
				if(attr_dl.alt_dl){
					alt_dl = attr_dl.alt_dl;
				}
				
			}
			
			/* PŔOCESSAR COR DO STATUS BAR == */
			if(json.cor_status_bar_dl){
			    cor_status_bar_dl = json.cor_status_bar_dl;
			}

			/* PROCESSAR FULLSCREEN == */
			if(json.fullscreen_al){
			    fullscreen_dl = json.fullscreen_al;
			}
			
			/* TIME PARA FECHAR ALERTA == */
			if(json.time_close_dl){
				
				var time_close_dl = json.time_close_dl;
				
				setTimeout(function(event){
					classApi.dialogo_full_screen_ep('close');
				}, time_close_dl);
				
			}

			/* TROCAR COR DO STATUS BAR == */
			if(cor_status_bar_dl){
                this.trocar_cor_status_bar_ep('trocar', cor_status_bar_dl);
			}

            /* FULLSCREEN - HABILITAR == */
			if(fullscreen_dl > 0){
			    this.fullscreen_ep('open');
			}

			/* PROCESSAR DIV == */
			var div_dialogo_ep = document.getElementById('div_dialogo_ep');
			
			if(!div_dialogo_ep){
				
				div_dialogo_ep = '<div class="div_dialogo_ep" id="div_dialogo_ep"> <div class="div_alpha_ep" onclick="classApi.dialogo_full_screen_ep('+"'close'"+')"></div> <div class="div_html_ep"> '+html_dl+' </div> </div>';
				$('body').append(div_dialogo_ep);
				
				/* COLETANDO INFORMA��ES == */
				var lar_win_ep = $(window).width();
				var alt_win_ep = $(window).height();
				var lar_div_ep = $('#div_dialogo_ep .div_html_ep').width();
				var alt_div_ep = $('#div_dialogo_ep .div_html_ep').height();
				
				/* DEFINIR POSI��O DA DIV DIALOGO == */
				var posx = (lar_win_ep-lar_div_ep)/2;
				var posy = ((alt_win_ep/2)-alt_div_ep);
				if(posy < 0){posy = 20;}
				
				if(alt_div_ep > alt_win_ep){alt_div_ep = (alt_win_ep-(posy*2));}
				
				/* JSON CSS == */
				var json_css_ep = {'top':posy+'px', 'left':posx+'px', 'height':alt_div_ep+'px'};
				var json_css_cab_dl_ep = {'position':'fixed', 'width':lar_div_ep+'px', 'left':posx+'px'};
				
				if(lar_dl.length > 0){
					$.extend(json_css_ep, {'width':lar_dl});
					$.extend(json_css_cab_dl_ep, {'width':lar_dl});
				}
				
				if(alt_dl.length  > 0){
					$.extend(json_css_ep, {'height':alt_dl});
				}
				
				$('#div_dialogo_ep .div_html_ep').css(json_css_ep);
				$('#div_dialogo_ep .div_html_ep .div_inner_html_ep').css({'height':alt_div_ep+'px'});
				
				/* DEFINIR POSI��O DE ELEMENTOS TOP E BOTTOM == */
				var alt_div_bnts_dl_ep = $('#div_dialogo_ep .div_html_ep .div_bnts_dl_ep').height();
				var pos_rodape_ep = (alt_win_ep-(alt_win_ep-(alt_div_ep+posy)))-alt_div_bnts_dl_ep;
				
				$('#div_dialogo_ep .div_html_ep .cab_dl_ep').css(json_css_cab_dl_ep);
				$('#div_dialogo_ep .div_html_ep .div_bnts_dl_ep').css({'position':'fixed', 'width':lar_div_ep+'px', 'height':alt_div_bnts_dl_ep+'px', 'left':posx+'px', 'top':pos_rodape_ep+'px'});
				
				/* MOSTRAR BOX INNER == */
				setTimeout(function(){
					$('#div_dialogo_ep .div_html_ep').fadeIn('fast');
				}, 100);
				
			}
			
			/* PORCESSAR SCRIPTS == */
			timeinterval_dialogo_full_screen_ep = setInterval(function(){
				
				/* COLETANDO INFORMA��ES == */
				var lar_win_ep = $(window).width();
				var alt_win_ep = $(window).height();
				var lar_div_ep = $('#div_dialogo_ep .div_html_ep').width();
				var alt_div_ep = $('#div_dialogo_ep .div_html_ep .div_inner_html_ep div:first-child').height();
				
				var posx = (lar_win_ep-lar_div_ep)/2;
				var posy = ((alt_win_ep/2)-alt_div_ep);
				if(posy < 0){posy = 20;}
				
				if(alt_div_ep > alt_win_ep){alt_div_ep = (alt_win_ep-(posy*2));}
				
				$('#div_dialogo_ep .div_html_ep').css({'top':posy+'px', 'left':posx+'px', 'height':alt_div_ep+'px'});
				$('#div_dialogo_ep .div_html_ep .div_inner_html_ep').css({'height':alt_div_ep+'px'});
				
				/* DEFINIR POSI��O DE ELEMENTOS TOP E BOTTOM == */
				var alt_div_bnts_dl_ep = $('#div_dialogo_ep .div_html_ep .div_bnts_dl_ep').height();
				var pos_rodape_ep = (alt_win_ep-(alt_win_ep-(alt_div_ep+posy)))-alt_div_bnts_dl_ep;
				
				$('#div_dialogo_ep .div_html_ep .cab_dl_ep').css({'position':'fixed', 'width':lar_div_ep+'px', 'left':posx+'px'});
				$('#div_dialogo_ep .div_html_ep .div_bnts_dl_ep').css({'position':'fixed', 'width':lar_div_ep+'px', 'height':alt_div_bnts_dl_ep+'px', 'left':posx+'px', 'top':pos_rodape_ep+'px'});
				
				/* ENCERRAR SCRIPT == */
				if(dialogo_full_screen_ep_open == 0){
					clearTimeout(timeinterval_dialogo_full_screen_ep);
				}
				
			}, 100);
			
		} else if(status == 'close'){
			
			dialogo_full_screen_ep_open = 0;
			
			$('#div_dialogo_ep .div_html_ep').fadeOut('fast', function(event){

			    classApi.fullscreen_ep('close');
			    classApi.trocar_cor_status_bar_ep('voltar');

				$('#div_dialogo_ep').fadeOut('fast', function(){
					$(this).remove();
				});

			});			
			
		}
		
	}
	
	/* DIV DIALOGO2 == */
	this.dialogo_full_screen_ep2 = function(status, json){
		
		if(status == 'open'){
			
			/* COLETANDO DADOS == */
			var html_dl = '';
			var lar_dl = '';
			var alt_dl = '';
			var time_close_dl = 0;
			
			dialogo_full_screen_ep_open2 = 1;
			timeinterval_dialogo_full_screen_ep2 = '';
			
			/* LEGENDAS DO ALERTA == */
			if(json.attr_dl){
				var attr_dl = json.attr_dl;
				if(attr_dl.html_dl){html_dl = '<div class="div_inner_html_ep">'+attr_dl.html_dl+'</div>';}
				
				if(attr_dl.lar_dl){
					lar_dl = attr_dl.lar_dl;
				}
				
				if(attr_dl.alt_dl){
					alt_dl = attr_dl.alt_dl;
				}
				
			}
			
			/* TIME PARA FECHAR ALERTA == */
			if(json.time_close_dl){
				
				var time_close_dl = json.time_close_dl;
				
				setTimeout(function(event){
					classApi.dialogo_full_screen_ep('close');
				}, time_close_dl);
				
			}
			
			/* PROCESSAR DIV == */
			var div_dialogo_ep = document.getElementById('div_dialogo_ep2');
			
			if(!div_dialogo_ep){
				
				div_dialogo_ep = '<div class="div_dialogo_ep2" id="div_dialogo_ep2"> <div class="div_alpha_ep" onclick="classApi.dialogo_full_screen_ep2('+"'close'"+')"></div> <div class="div_html_ep"> '+html_dl+' </div> </div>';
				$('body').append(div_dialogo_ep);
				
				/* COLETANDO INFORMA��ES == */
				var lar_win_ep = $(window).width();
				var alt_win_ep = $(window).height();
				var lar_div_ep = $('#div_dialogo_ep2 .div_html_ep').width();
				var alt_div_ep = $('#div_dialogo_ep2 .div_html_ep').height();
				
				/* DEFINIR POSI��O DA DIV DIALOGO == */
				var posx = (lar_win_ep-lar_div_ep)/2;
				var posy = ((alt_win_ep/2)-alt_div_ep);
				if(posy < 0){posy = 20;}
				
				if(alt_div_ep > alt_win_ep){alt_div_ep = (alt_win_ep-(posy*2));}
				
				/* JSON CSS == */
				var json_css_ep = {'top':posy+'px', 'left':posx+'px', 'height':alt_div_ep+'px'};
				var json_css_cab_dl_ep = {'position':'fixed', 'width':lar_div_ep+'px', 'left':posx+'px'};
				
				if(lar_dl.length > 0){
					$.extend(json_css_ep, {'width':lar_dl});
					$.extend(json_css_cab_dl_ep, {'width':lar_dl});
				}
				
				if(alt_dl.length  > 0){
					$.extend(json_css_ep, {'height':alt_dl});
				}
				
				$('#div_dialogo_ep2 .div_html_ep').css(json_css_ep);
				$('#div_dialogo_ep2 .div_html_ep .div_inner_html_ep').css({'height':alt_div_ep+'px'});
				
				/* DEFINIR POSI��O DE ELEMENTOS TOP E BOTTOM == */
				var alt_div_bnts_dl_ep = $('#div_dialogo_ep2 .div_html_ep .div_bnts_dl_ep').height();
				var pos_rodape_ep = (alt_win_ep-(alt_win_ep-(alt_div_ep+posy)))-alt_div_bnts_dl_ep;
				
				$('#div_dialogo_ep2 .div_html_ep .cab_dl_ep').css({'position':'fixed', 'width':lar_div_ep+'px', 'left':posx+'px'});
				$('#div_dialogo_ep2 .div_html_ep .div_bnts_dl_ep').css({'position':'fixed', 'width':lar_div_ep+'px', 'height':alt_div_bnts_dl_ep+'px', 'left':posx+'px', 'top':pos_rodape_ep+'px'});
				
				/* MOSTRAR BOX INNER == */
				setTimeout(function(){
					$('#div_dialogo_ep2 .div_html_ep').fadeIn('fast');
				}, 100);
				
			}
			
			/* PORCESSAR SCRIPTS == */
			timeinterval_dialogo_full_screen_ep2 = setInterval(function(){
				
				/* COLETANDO INFORMA��ES == */
				var lar_win_ep = $(window).width();
				var alt_win_ep = $(window).height();
				var lar_div_ep = $('#div_dialogo_ep2 .div_html_ep').width();
				var alt_div_ep = $('#div_dialogo_ep2 .div_html_ep .div_inner_html_ep div:first-child').height();
				
				var posx = (lar_win_ep-lar_div_ep)/2;
				var posy = ((alt_win_ep/2)-alt_div_ep);
				if(posy < 0){posy = 20;}
				
				if(alt_div_ep > alt_win_ep){alt_div_ep = (alt_win_ep-(posy*2));}
				
				$('#div_dialogo_ep2 .div_html_ep').css({'top':posy+'px', 'left':posx+'px', 'height':alt_div_ep+'px'});
				$('#div_dialogo_ep2 .div_html_ep .div_inner_html_ep').css({'height':alt_div_ep+'px'});
				
				/* DEFINIR POSI��O DE ELEMENTOS TOP E BOTTOM == */
				var alt_div_bnts_dl_ep = $('#div_dialogo_ep2 .div_html_ep .div_bnts_dl_ep').height();
				var pos_rodape_ep = (alt_win_ep-(alt_win_ep-(alt_div_ep+posy)))-alt_div_bnts_dl_ep;
				
				$('#div_dialogo_ep2 .div_html_ep .cab_dl_ep').css({'position':'fixed', 'width':lar_div_ep+'px', 'left':posx+'px'});
				$('#div_dialogo_ep2 .div_html_ep .div_bnts_dl_ep').css({'position':'fixed', 'width':lar_div_ep+'px', 'height':alt_div_bnts_dl_ep+'px', 'left':posx+'px', 'top':pos_rodape_ep+'px'});
				
				/* ENCERRAR SCRIPT == */
				if(dialogo_full_screen_ep_open2 == 0){
					clearTimeout(timeinterval_dialogo_full_screen_ep2);
				}
				
			}, 100);
			
		} else if(status == 'close'){
			
			dialogo_full_screen_ep_open2 = 0;
			
			$('#div_dialogo_ep2 .div_html_ep').fadeOut('fast', function(event){
				$('#div_dialogo_ep2').fadeOut('fast', function(){
					$(this).remove();
				});									   
			});			
			
		}
		
	}
	
	/* DIV DIALOGO2 == */
	this.dialogo_full_screen_ep3 = function(status, json){
		
		if(status == 'open'){
			
			/* COLETANDO DADOS == */
			var html_dl = '';
			var time_close_dl = 0;
			var add_class_dl = '';
			var lar_dl = '';
			var alt_dl = '';
			
			dialogo_full_screen_ep_open3 = 1;
			timeinterval_dialogo_full_screen_ep3 = '';
			
			/* LEGENDAS DO ALERTA == */
			if(json.attr_dl){
				var attr_dl = json.attr_dl;
				if(attr_dl.html_dl){html_dl = '<div class="div_inner_html_ep">'+attr_dl.html_dl+'</div>';}
				
				if(attr_dl.add_class_dl){
					add_class_dl = attr_dl.add_class_dl;
				}
				
				if(attr_dl.lar_dl){
					lar_dl = attr_dl.lar_dl;
				}
				
				if(attr_dl.alt_dl){
					alt_dl = attr_dl.alt_dl;
				}
				
			}
			
			/* TIME PARA FECHAR ALERTA == */
			if(json.time_close_dl){
				
				var time_close_dl = json.time_close_dl;
				
				setTimeout(function(event){
					classApi.dialogo_full_screen_ep('close');
				}, time_close_dl);
				
			}
			
			/* PROCESSAR DIV == */
			var div_dialogo_ep = document.getElementById('div_dialogo_ep3');
			
			if(!div_dialogo_ep){
				
				div_dialogo_ep = '<div class="div_dialogo_ep3" id="div_dialogo_ep3"> <div class="div_alpha_ep" onclick="classApi.dialogo_full_screen_ep2('+"'close'"+')"></div> <div class="div_html_ep"> '+html_dl+' </div> </div>';
				$('body').append(div_dialogo_ep);
				
				/* COLETANDO INFORMA��ES == */
				var lar_win_ep = $(window).width();
				var alt_win_ep = $(window).height();
				var lar_div_ep = $('#div_dialogo_ep3 .div_html_ep').width();
				var alt_div_ep = $('#div_dialogo_ep3 .div_html_ep').height();
				
				/* DEFINIR POSI��O DA DIV DIALOGO == */
				var posx = (lar_win_ep-lar_div_ep)/2;
				var posy = ((alt_win_ep/2)-alt_div_ep);
				if(posy < 0){posy = 20;}
				
				if(alt_div_ep > alt_win_ep){alt_div_ep = (alt_win_ep-(posy*2));}
				
				/* MODITICAR ATRIBUTOS == */
				if(add_class_dl.length > 0){
					$('#div_dialogo_ep3 .div_html_ep').addClass(add_class_dl);
				}
				
				/* JSON CSS == */
				var json_css_ep = {'top':posy+'px', 'left':posx+'px', 'height':alt_div_ep+'px'};
				var json_css_cab_dl_ep = {'position':'fixed', 'width':lar_div_ep+'px', 'left':posx+'px'};
				
				if(lar_dl.length > 0){
					$.extend(json_css_ep, {'width':lar_dl});
					$.extend(json_css_cab_dl_ep, {'width':lar_dl});
				}
				
				if(alt_dl.length  > 0){
					$.extend(json_css_ep, {'height':alt_dl});
				}
				
				$('#div_dialogo_ep3 .div_html_ep').css(json_css_ep);
				$('#div_dialogo_ep3 .div_html_ep .div_inner_html_ep').css({'height':alt_div_ep+'px'});
				
				/* DEFINIR POSI��O DE ELEMENTOS TOP E BOTTOM == */
				var alt_div_bnts_dl_ep = $('#div_dialogo_ep3 .div_html_ep .div_bnts_dl_ep').height();
				var pos_rodape_ep = (alt_win_ep-(alt_win_ep-(alt_div_ep+posy)))-alt_div_bnts_dl_ep;
				
				$('#div_dialogo_ep3 .div_html_ep .cab_dl_ep').css(json_css_cab_dl_ep);
				$('#div_dialogo_ep3 .div_html_ep .div_bnts_dl_ep').css({'position':'fixed', 'width':lar_div_ep+'px', 'height':alt_div_bnts_dl_ep+'px', 'left':posx+'px', 'top':pos_rodape_ep+'px'});
				
				/* MOSTRAR BOX INNER == */
				setTimeout(function(){
					$('#div_dialogo_ep3 .div_html_ep').fadeIn('fast');
				}, 100);
				
			}
			
			/* PORCESSAR SCRIPTS == */
			timeinterval_dialogo_full_screen_ep3 = setInterval(function(){
				
				/* COLETANDO INFORMA��ES == */
				var lar_win_ep = $(window).width();
				var alt_win_ep = $(window).height();
				var lar_div_ep = $('#div_dialogo_ep3 .div_html_ep').width();
				var alt_div_ep = $('#div_dialogo_ep3 .div_html_ep .div_inner_html_ep div:first-child').height();
				
				var posx = (lar_win_ep-lar_div_ep)/2;
				var posy = ((alt_win_ep/2)-alt_div_ep);
				if(posy < 0){posy = 20;}
				
				if(alt_div_ep > alt_win_ep){alt_div_ep = (alt_win_ep-(posy*2));}
				
				$('#div_dialogo_ep3 .div_html_ep').css({'top':posy+'px', 'left':posx+'px', 'height':alt_div_ep+'px'});
				$('#div_dialogo_ep3 .div_html_ep .div_inner_html_ep').css({'height':alt_div_ep+'px'});
				
				/* DEFINIR POSI��O DE ELEMENTOS TOP E BOTTOM == */
				var alt_div_bnts_dl_ep = $('#div_dialogo_ep3 .div_html_ep .div_bnts_dl_ep').height();
				var pos_rodape_ep = (alt_win_ep-(alt_win_ep-(alt_div_ep+posy)))-alt_div_bnts_dl_ep;
				
				$('#div_dialogo_ep3 .div_html_ep .cab_dl_ep').css({'position':'fixed', 'width':lar_div_ep+'px', 'left':posx+'px'});
				$('#div_dialogo_ep3 .div_html_ep .div_bnts_dl_ep').css({'position':'fixed', 'width':lar_div_ep+'px', 'height':alt_div_bnts_dl_ep+'px', 'left':posx+'px', 'top':pos_rodape_ep+'px'});
				
				/* ENCERRAR SCRIPT == */
				if(dialogo_full_screen_ep_open3 == 0){
					clearTimeout(timeinterval_dialogo_full_screen_ep3);
				}
				
			}, 100);
			
		} else if(status == 'close'){
			
			dialogo_full_screen_ep_open3 = 0;
			
			$('#div_dialogo_ep3 .div_html_ep').fadeOut('fast', function(event){
				$('#div_dialogo_ep3').fadeOut('fast', function(){
					$(this).remove();
				});									   
			});			
			
		}
		
	}
	
	/* CONFIGURA��O DA BASE DE DADOS == */
	this.conectBd = function(configTabelas){

		/* VARI�VEIS == */
		var nomeBd = 'agenda';
		var versaoBd = '2.0';
		var tituloBd = 'BANCO DE DADOS AGENDA';
		var tamanhoBd = (2*1024*1024);
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
	
	/* PROCESSAR ESTOQUE == */
	this.processar_est_ep = function(cod_pd, sql){
		
		sql.executeSql("SELECT * FROM pedidos_pd WHERE cod_pd='"+cod_pd+"'", [], function (sql, resultados){
			
			var total_pd = resultados.rows.length;
			
			alert(total_pd);
			
		});
		
	}
	
	/* CHECK LOGIN == */
	this.check_login_ep = function (){
		
		/* CHECAR SE TEM SUPORTE PARA WEBSTORAGE == */
		if(typeof(Storage) !== "undefined") {
			
			var json_ep_post = localStorage.getItem('json_ep');
			if(json_ep_post){
				var json_ep = eval('('+json_ep_post+')');
			} else {
				var json_ep = {total_ep:0, prot_site_ep:0, prot_usu_ep:0, foto_ep:'', nome_ep:''};
			}
			
		} else {
			var json_ep = {total_ep:0, prot_site_ep:0, prot_usu_ep:0, foto_ep:'', nome_ep:''};
		}
		
		return json_ep;
		
	}
	
	/* TRANSI��O DE P�GINA == */
	this.transicao_page_ep = function(json){
		
		var efeito_ep = 'fadeOut';
		if(json.efeito_ep){efeito_ep = json.efeito_ep;}
		var velocidade_ep = 'fast';
		if(json.velocidade_ep){velocidade_ep = json.velocidade_ep;}
		var funcao_ep = '';
		if(json.funcao_ep){funcao_ep = json.funcao_ep;}
		
		if(efeito_ep == 'fadeIn'){
		
			$('.div_alpha_white_ep').fadeIn(velocidade_ep, function(event){
				eval(funcao_ep);
			});
		
		} else if(efeito_ep == 'fadeOut'){
			
			$('.div_alpha_white_ep').fadeOut(velocidade_ep, function(event){
				eval(funcao_ep);
			});
			
		} else {
			eval(funcao_ep);
		}
		
	}
	
	/* SAIR LOGIN == */
	this.sairLogin = function (){
		
		/* CONEX�O COM O BANCO DE DADOS == */
		var conectBd = classApi.conectBd();
		
		/* LIMPANDO TABELAS DO BANCO DE DADOS == */
		conectBd.transaction(function(sql){
			
			/* ZERAR BANCO DE DADOS == */
			sql.executeSql('DROP TABLE clientes');
			sql.executeSql('DROP TABLE visitas');
			
			/* LIMPANDO LOCAL STORAGE == */
			localStorage.removeItem('json_ep');
			localStorage.removeItem('tp_login_ep');
			localStorage.removeItem('json_usu_ep', '');
			localStorage.removeItem('json_ma_pr', '');
			localStorage.removeItem('time_query_pr', '');
			localStorage.removeItem('time_query_pd', '');
			localStorage.removeItem('time_query_mn', '');
			localStorage.removeItem('usus_importados_ep', '');
			localStorage.removeItem('json_dw_live_ca', '0');
			localStorage.removeItem('json_dw_live_pd', '0');
			localStorage.removeItem('json_dw_live_pr', '0');
			
			/* REDIRECIONAR PARA P�GINA DE LOGIN == */
			classApi.transicao_page_ep({efeito_ep:'fadeIn', velocidade_ep:'normal', funcao_ep:'window.location.href = "login.html"'});
			
		});
		
	}
	
	/* CONFIG MENU HORIZONTAL == */
	this.config_menu_horizontal_ep = function(menu_ep, velocidade_ep){
		
		if(!velocidade_ep){velocidade_ep = 300;}
		
		/* ANALISAR WINDOW == */
		var lar_window_ep = window.innerWidth;
		var alt_window_ep = window.innerHeight;
		
		/* ANALISAR ABAS DO MENU E EDITAR LARGURA == */
		var abas_menu_sup_ep = $(menu_ep+' .div_menu_ep ul li');
		var qnt_abas_menu_sup_ep = abas_menu_sup_ep.length;
		var lar_menu_ep = 5;
		
		for(var i=0;i<qnt_abas_menu_sup_ep;i++){
			
			var li_aba_ep = abas_menu_sup_ep[i];
			var id_aba_ep = $(li_aba_ep).attr('id');
			var info_aba_ep = classApi.info_elemento_ep(li_aba_ep);
			var lar_aba_ep = info_aba_ep.width;
			var left_aba_ep = info_aba_ep.left;
			
			lar_menu_ep += lar_aba_ep;
			
		}
		//alert(lar_menu_ep)
		$(menu_ep+' .div_menu_ep ul').css({'width':lar_menu_ep+'px'});
		
		/* ADICIONAR EVENTOS AS ABAS == */
		abas_menu_sup_ep.click(function(){
			
			var info_aba_ep = classApi.info_elemento_ep(this);
			var lar_aba_ep = info_aba_ep.width;
			var left_aba_ep = info_aba_ep.left;
			var top_aba_ep = info_aba_ep.top;
			var soma_lar_left_aba_ep = (lar_aba_ep+left_aba_ep);
			
			var scroll_aba_ep = (left_aba_ep-lar_aba_ep)+25;
			$(menu_ep+' .div_menu_ep').animate({scrollLeft:scroll_aba_ep}, velocidade_ep);
			
		});
		
	}
	
	/* CONFIG MENU LATERAL GERENTE == */
	this.config_menu_lateral_ep = function(id_li_selecionado, nivel_menu){
		
		var menu_lateral = '<div class="div_alpha_menu_lateral_ep"></div> <menu class="menu_lateral_ep" id="menu_lateral_ep"><ul> <li id="pg_inicial"> <a href="index.html"> <img src="img/icon_home.png" /> </a> <a href="index.html" class="a">PRINCIPAL</a></li>  <li id="dados_login"> <a href="dados_login_cliente.html"> <img src="img/icon_profile.png" /> </a> <a href="dados_login_cliente.html" class="a">MEU LOGIN</a></li> <li id="usuarios"> <a href="usuarios.html"> <img src="img/icon_help.png" /> </a> <a href="usuarios.html" class="a">USUÁRIOS</a></li> <li id="contas"> <a href="contas.html"> <img src="img/icon_help.png" /> </a> <a href="contas.html" class="a">CONTAS</a></li> <li id="veiculos"> <a href="veiculos.html"> <img src="img/icon_help.png" /> </a> <a href="veiculos.html" class="a">VEÍCULOS</a></li> <li id="veiculos_controle"> <a href="veiculos_controle.html"> <img src="img/icon_help.png" /> </a> <a href="veiculos_controle.html" class="a">CONTROLE DE VEICULOS</a></li> <li id="veiculos_abastecimento"> <a href="veiculos_abastecimento.html"> <img src="img/icon_help.png" /> </a> <a href="veiculos_abastecimento.html" class="a">ABASTECIMENTO</a></li> <li id="despesas"> <a href="despesas.html"> <img src="img/icon_help.png" /> </a> <a href="despesas.html" class="a">DESPESAS</a></li> <li id="relatorios"> <a href="relatorios.html"> <img src="img/icon_help.png" /> </a> <a href="relatorios.html" class="a">RELAT&Oacute;RIOS</a></li> <li> <li> <a href="confirmar_logoff.html"> <img src="img/icon_logout.png" /></a> <a href="confirmar_logoff.html" class="a">LOGOFF</a></li></ul></menu>';
			
		$('.include_menu_lateral').html(menu_lateral);
		
		/* SELECIONAR MENU LATERAL == */
		if(id_li_selecionado){
			
			$('.include_menu_lateral ul li').removeClass('li_selecionado');
			$('.include_menu_lateral ul #'+id_li_selecionado).addClass('li_selecionado');
			
		}
		
	}
	
	/* CONFIG MENU LATERAL OPERADOR == */
	this.config_menu_lateral_operador_ep = function(id_li_selecionado){
		
		var menu_lateral1 = '<div class="div_alpha_menu_lateral_ep"></div> <menu class="menu_lateral_ep" id="menu_lateral_ep"><ul> <li id="dados_login"> <a href="dados_login.html"> <img src="img/icon_help.png" /> </a> <a href="dados_login.html" class="a">MEU LOGIN</a></li> <li id="maquinas_vi"> <a href="maquinas_vi_operador.html"> <img src="img/icon_help.png" /> </a> <a href="maquinas_vi_operador.html" class="a">M&Aacute;QUINAS</a></li> <li onClick="classApi.sair_login_ep()"> <a href="#"> <img src="img/icon_logout.png" /></a> <a href="#" class="a">LOGOFF</a></li></ul></menu>';
			
		$('.include_menu_lateral').html(menu_lateral1);
		
		/* SELECIONAR MENU LATERAL == */
		if(id_li_selecionado){
			
			$('.include_menu_lateral ul li').removeClass('li_selecionado');
			$('.include_menu_lateral ul #'+id_li_selecionado).addClass('li_selecionado');
			
		}
		
	}
	
	/* OPEN MENU LATERAL == */
	this.open_menu_lateral_ep = function(){
		
		if(!window.sts_open_menu_lateral_ep){sts_open_menu_lateral_ep = 0;}
		
		if(sts_open_menu_lateral_ep == 0){
			
			$('.div_alpha_menu_lateral_ep').css({'display':'block'});
			$('.menu_lateral_ep').animate({left:0}, 100);
			
			sts_open_menu_lateral_ep = 1;

			/* CONFIGURAR URL == */
            var json = {objeto_json_ep:{funcao_ep:"classApi.open_menu_lateral_ep()"}, url_ep:'?open-menu-app'};
            classApi.config_url_ep(json);
			
		} else if(sts_open_menu_lateral_ep == 1){
			
			$('.div_alpha_menu_lateral_ep').css({'display':'none'});
			$('.menu_lateral_ep').animate({left:'-225px'}, 100);
			
			sts_open_menu_lateral_ep = 0;
			
		}
		
	}
	
	/* SELECIONAR MENU == */
	this.select_menu_lateral_ep = function(){
		
		$('.menu_lateral_ep li').click(function(event){
												
			$('.menu_lateral_ep li').removeClass('li_selecionado');
			$(this).addClass('li_selecionado');
												
		});
		
	}
	
	/* SINCRONIZAR STATUS DE ANDAMENTO DE VISITAS == */
	this.sync_andamento_vi_pp_ep = function(json){
		
		conect_bd_ep.transaction(function(sql){
										  
			var cod_vi_pp = json.cod_vi_pp;
			var funcao_ep = '';
			
			if(json.funcao_ep){funcao_ep = json.funcao_ep;}
					
			/* CHECAR QUANTIDADE DE PROPOSTAS == */
			sql.executeSql("SELECT * FROM propostas_pp WHERE cod_vi_pp='"+cod_vi_pp+"'", [], function (sql, resultados){
				
				var total_pp = resultados.rows.length;
				
				var total_rascunho_pp = 0;
				var total_finalizado_pp = 0;
				var total_neg_fechado_pp = 0;
				var total_neg_perdido_pp = 0;
				var total_excluido_pp = 0;
				
				var andamento_vi = 0;
				var sts_vi = 'visita';
				
				var campo_sts_vi = '';
				
				for(var i=0;i<total_pp;i++){
								
					var cod_pp = resultados.rows.item(i)[['cod_pp']];
					var sts_pp = resultados.rows.item(i)[['sts_pp']];
					var excluido_pp = resultados.rows.item(i)[['excluido_pp']];
					
					if(excluido_pp == 0){
								
						if(sts_pp == 'finalizado'){
							total_finalizado_pp += 1;
						} else if(sts_pp == 'neg_fechado'){
							total_neg_fechado_pp += 1;
						} else if(sts_pp == 'neg_perdido'){
							total_neg_perdido_pp += 1;
						} else {
							total_rascunho_pp += 1;
						}
						
					} else {
						total_excluido_pp += 1;
					}
				
				}
				
				if((total_rascunho_pp > 0) || (total_finalizado_pp > 0)){
					andamento_vi = 1;
				} else if(total_neg_fechado_pp > 0){
					sts_vi = 'neg_fechado';
				} else if(total_neg_perdido_pp > 0){
					sts_vi = 'neg_perdido';
				}
				
				if(sts_vi){campo_sts_vi = ", sts_vi='"+sts_vi+"'";}
				
				/* ATUALIZAR SQL == */
				
				sql.executeSql("UPDATE visitas_vi SET andamento_vi='"+andamento_vi+"' "+campo_sts_vi+" WHERE cod_vi='"+cod_vi_pp+"'");
				
				/* EXECUTAR FUN��ES == */
				if(funcao_ep){
					new funcao_ep;
				}
				
			});
			
		});
		
	}
	
	/* DOWNLOAD DE CLIENTES DO SERVIDOR */
	this.download_ca_live = function(json_post, json){
		
		/* COLETANDO DADOS == */
		var tp_api_ep = 'clientes_ep';
		var prot_usu_ca = '';
		var tipo_ca = '';
		var only_prot_usu_ca = '';
		var cliente_ca = '';
		var time_query_usu_ca = '';
		var excluido_ca = '';
		var pagina_ca = 0;
		var limite_lp_ca = 50;
		
		if(json_post){
			if(json_post.only_prot_usu_ca){only_prot_usu_ca = json_post.only_prot_usu_ca;}
			if(json_post.tipo_ca){tipo_ca = json_post.tipo_ca;}
			if(json_post.prot_usu_ca){prot_usu_ca = json_post.prot_usu_ca;}
			if(json_post.cliente_ca){cliente_ca = json_post.cliente_ca;}
			if(json_post.time_query_usu_ca){time_query_usu_ca = json_post.time_query_usu_ca;}
			if(json_post.pagina_ca){pagina_ca = json_post.pagina_ca;}
			if(json_post.limite_lp_ca){limite_lp_ca = json_post.limite_lp_ca;}
			if(json_post.excluido_ca){excluido_ca = json_post.excluido_ca;}
		}
		
		/* COLETANDO DADOS == */
		var funcao_ep = '';
		var funcao_erro_ep = '';
		
		if(json){
			if(json.funcao_ep){funcao_ep = json.funcao_ep;}
			if(json.funcao_erro_ep){funcao_erro_ep = json.funcao_erro_ep;}
		}
		
		/* CONECTAR COM O SERVIDOR == */
		$.post('http://api.empredi.com.br/pedidos', {tp_api_ep:tp_api_ep, tipo_ca:tipo_ca, prot_site_ep:prot_site_ep, prot_usu_ep:prot_usu_ca, only_prot_usu_ca:only_prot_usu_ca, time_update_ep:time_query_usu_ca, cliente_ca:cliente_ca, excluido_ca:excluido_ca, pagina_ep:pagina_ca, limite_lp_ep:limite_lp_ca}, function(json){
			
			/* PROCESSAR RESULTADOS DA LIVE == */
			var json_ca = json;
			var json_dw_live_ca = JSON.stringify(json_ca);
			var total_ca = json_ca.total_ca;
			
			/* SETAR TOTAL_CA_DW == */
			localStorage.setItem('json_dw_live_ca', json_dw_live_ca);
			
			/* PROCESSAR FUNÇÃO DE DOWNLOAD == */
			if(total_ca > 0){
			
				json_ca_dw = json_ca;
				json_ca_dw.time_query_ca = ''; /* RETIRAR TIME DA CONSULTA == */
				
				classApi.services_sync_ep({tipo_ep:'download_clientes_ep', funcao_ep:funcao_ep, funcao_erro_ep:funcao_erro_ep});
			
			} else {
				
				/* EXECUTAR FUN��ES == */
				if(funcao_ep){
					new funcao_ep;
				}
				
			}
			
		}).fail(function(){
									
			/* EXECUTAR FUN��ES DE ERRO == */
			if(funcao_erro_ep){
				new funcao_erro_ep;
			}
			
		});
		
	}
	
	/* DOWNLOAD DE PEDIDOS DO SERVIDOR */
	this.download_pd_live = function(json_post, json){
		
		/* COLETANDO DADOS == */
		var tp_api_ep = 'pedidos_pd_ep';
		var prot_usu_pd = '';
		var prot_cliente_pd = '';
		var cod_pd = '';
		var cods_pd = '';
		var cod_pd_pd = '';
		var cliente_pd = '';
		var sts_pd = '';
		var excluido_pd = '';
		var check_est_pr_pd = '';
		var querys_pd = '';
		var time_query_pd = '';
		var valor_time_query_pd = '';
		var pagina_pd = 0;
		var limite_lp_pd = 50;
		
		if(json_post){
			if(json_post.prot_usu_pd){prot_usu_pd = json_post.prot_usu_pd;}
			if(json_post.prot_cliente_pd){prot_cliente_pd = json_post.prot_cliente_pd;}
			if(json_post.cod_pd){cod_pd = json_post.cod_pd;}
			if(json_post.cods_pd){cods_pd = json_post.cods_pd;}
			if(json_post.cod_pd_pd){cod_pd_pd = json_post.cod_pd_pd;}
			if(json_post.cliente_pd){cliente_pd = json_post.cliente_pd;}
			if(json_post.sts_pd){sts_pd = json_post.sts_pd;}
			if(json_post.excluido_pd){excluido_pd = json_post.excluido_pd;}
			if(json_post.check_est_pr_pd){check_est_pr_pd = json_post.check_est_pr_pd;}
			if(json_post.querys_pd){querys_pd = json_post.querys_pd;}
			if(json_post.time_query_pd){time_query_pd = json_post.time_query_pd;}
			if(json_post.valor_time_query_pd){valor_time_query_pd = json_post.valor_time_query_pd;}
			if(json_post.pagina_pd){pagina_pd = json_post.pagina_pd;}
			if(json_post.limite_lp_pd){limite_lp_pd = json_post.limite_lp_pd;}
		}
		
		/* COLETANDO DADOS == */
		var funcao_ep = '';
		var funcao_erro_ep = '';
		
		if(json){
			if(json.funcao_ep){funcao_ep = json.funcao_ep;}
			if(json.funcao_erro_ep){funcao_erro_ep = json.funcao_erro_ep;}
		}
		
		/* CONECTAR COM O SERVIDOR == */
		$.post('http://api.empredi.com.br/pedidos', {tp_api_ep:tp_api_ep, prot_site_ep:prot_site_ep, prot_usu_ep:prot_usu_pd, prot_cliente_pd:prot_cliente_pd, cod_pd:cod_pd, cods_pd:cods_pd, cod_pd_pd:cod_pd_pd, cliente_pd:cliente_pd, sts_pd:sts_pd, excluido_pd:excluido_pd, check_est_pr_pd:check_est_pr_pd, querys_pd:querys_pd, time_update_ep:time_query_pd, pagina_ep:pagina_pd, limite_lp_ep:limite_lp_pd}, function(json){
			
			/* PROCESSAR RESULTADOS DA LIVE == */
			var json_pd = json;
			var json_dw_live_pd = JSON.stringify(json_pd);
			var total_pd = json_pd.total_pd;
			
			classApi.calc_bytes_json_ep(json_pd);
			
			/* SETAR TOTAL_CA_DW == */
			localStorage.setItem('json_dw_live_pd', json_dw_live_pd);
			
			/* PROCESSAR FUNÇÃO DE DOWNLOAD == */
			if(total_pd > 0){
			
				if(!window.json_pd_dw){
					json_pd_dw = json_pd;
				} else if(!window.json_pd_dw2){
					json_pd_dw2 = json_pd;
				} else if(!window.json_pd_dw3){
					json_pd_dw3 = json_pd;
				} else if(!window.json_pd_dw4){
					json_pd_dw4 = json_pd;
				}
				
				/* DEFINE VALOR DO TIME DE SINCRONIZAÇÃO == */
				if(valor_time_query_pd){
					json_pd_dw.time_query_pd = valor_time_query_pd; /* RETIRAR TIME DA CONSULTA == */	
				}
				
				classApi.services_sync_ep({tipo_ep:'download_pedidos_pd', funcao_ep:funcao_ep, funcao_erro_ep:funcao_erro_ep});
			
			} else {
				
				/* EXECUTAR FUN��ES == */
				if(funcao_ep){
					new funcao_ep;
				}
				
			}
			
		}).fail(function(){
									
			/* EXECUTAR FUN��ES DE ERRO == */
			if(funcao_erro_ep){
				new funcao_erro_ep;
			}
			
		});
		
	}
	
	/* DOWNLOAD DE PRODUTOS DO SERVIDOR == */
	this.download_pr_live = function(json_post, json){
		
		/* COLETANDO DADOS == */
		var tp_api_ep = 'produtos_pr_ep';
		var cod_pr = '';
		var time_query_pr = '';
		var valor_time_query_pr = '';
		var pagina_pr = 0;
		var limite_lp_pr = 50;
		
		if(json_post){
			if(json_post.cod_pr){cod_pr = json_post.cod_pr;}
			if(json_post.time_query_pr){time_query_pr = json_post.time_query_pr;}
			if(json_post.valor_time_query_pr){valor_time_query_pr = json_post.valor_time_query_pr;}
			if(json_post.pagina_pr){pagina_pr = json_post.pagina_pr;}
			if(json_post.limite_lp_pr){limite_lp_pr = json_post.limite_lp_pr;}
		}
		
		/* COLETANDO DADOS == */
		var funcao_ep = '';
		var funcao_erro_ep = '';
		
		if(json){
			if(json.funcao_ep){funcao_ep = json.funcao_ep;}
			if(json.funcao_erro_ep){funcao_erro_ep = json.funcao_erro_ep;}
		}
		
		/* CONECTAR COM O SERVIDOR == */
		$.post('http://api.empredi.com.br/pedidos', {tp_api_ep:tp_api_ep, prot_site_ep:prot_site_ep, cod_pr:cod_pr, time_query_pr:time_query_pr, valor_time_query_pr:valor_time_query_pr, pagina_pr:pagina_pr, limite_lp_pr:limite_lp_pr}, function(json){
			
			/* PROCESSAR RESULTADOS DA LIVE == */
			var json_pr = json;
			var json_dw_live_pr = JSON.stringify(json_pr);
			var dados_pr = json_pr.dados_pr;
			var total_pr = dados_pr.total_pr;
			
			/* SETAR TOTAL_CA_DW == */
			localStorage.setItem('json_dw_live_pr', json_dw_live_pr);
			
			/* PROCESSAR FUNÇÃO DE DOWNLOAD == */
			if(total_pr > 0){
			
				json_pr_dw = json_pr;
				
				/* DEFINE VALOR DO TIME DE SINCRONIZAÇÃO == */
				if(valor_time_query_pr){
					json_pr_dw.time_query_pr = valor_time_query_pr; /* RETIRAR TIME DA CONSULTA == */	
				}
				
				classApi.services_sync_ep({tipo_ep:'download_produtos_ep', funcao_ep:funcao_ep, funcao_erro_ep:funcao_erro_ep});
			
			} else {
				
				/* EXECUTAR FUN��ES == */
				if(funcao_ep){
					new funcao_ep;
				}
				
			}
			
		}).fail(function(){
									
			/* EXECUTAR FUN��ES DE ERRO == */
			if(funcao_erro_ep){
				new funcao_erro_ep;
			}
			
		});
		
	}
	
	/* CONSULTAR DOCUMENTO ONLINE == */
	this.consultar_doc_ca_ep = function(valor, json){
		
		/* VARIAÁVEIS == */
		var tp_api_ep = 'consultar_doc_ca_ep';
		var doc_ca = valor;
		var funcao_ep = '';
		var funcao_erro_ep = '';
		
		if(json){
			if(json.funcao_ep){funcao_ep = json.funcao_ep;}
		}
		
		if(json){
			if(json.funcao_erro_ep){funcao_erro_ep = json.funcao_erro_ep;}
		}
		
		/* CONECTAR COM O SERVIDOR == */
		$.post('http://api.empredi.com.br/pedidos', {tp_api_ep:tp_api_ep, prot_site_ep:prot_site_ep, doc_ca:doc_ca}, function(json_ca){
			
			var json_ca = json_ca;
			localStorage.setItem("info_consultar_doc_ca", JSON.stringify(json_ca));
			
			if(funcao_ep){
				new funcao_ep;
			}
			
		}).fail(function(event){
			
			if(funcao_erro_ep){
				new funcao_erro_ep;
			}
			
		});
		
	}
	
	/* SINCRONIZA��O DO SISTEMA == */
	this.services_sync_ep = function(json){
		
		/* COLETANDO DADOS == */
		var tipo_ep = '';
		var json_post_ep = '';
		var funcao_ep = '';
		var funcao_erro_ep = '';
		
		/* CHECAR LOGIN == */
		var json_login_ep = classApi.check_login_ep();
		var prot_site_ep = json_login_ep.prot_site_ep;
		var prot_usu_ep = json_login_ep.prot_usu_ep;
		var tp_login_ep = json_login_ep.tipo_ep;
		
		if(json){
			if(json.tipo_ep){tipo_ep = json.tipo_ep;}
		}
		
		if(json){
			if(json.json_post_ep){json_post_ep = json.json_post_ep;}
		}
		
		if(json){
			if(json.funcao_ep){funcao_ep = json.funcao_ep;}
		}
		
		if(json){
			if(json.funcao_erro_ep){funcao_erro_ep = json.funcao_erro_ep;}
		}
		
		/* DOWNLOAD DE USUÁRIOS == */
		function update_usuarios_ep(json_post_ep){
			
			json_ca_dw = json_post_ep;
			
			download_usuarios_ep();
			
		}
		
		/* DOWNLOAD DE USU�RIOS == */
		function download_usuarios_ep(){
			
			/* NECESS�RIO QUE A FUN��O SEJA RECURSIVA POR CONTA DO LOOP DE USU�RIOS == */
			if(window.json_ca_dw){
				
				/* CONEX�O COM O BANCO DE DADOS == */
				conect_bd_ep.transaction(function(sql){
				
					var json_ca = json_ca_dw;
					var time_query_ca = json_ca.time_query_ca;
					var total_ca = json_ca.total_ca;
					var loop_ca = json_ca.loop_ca;
					var qnt_loop_ca = loop_ca.length;
					
					localStorage.setItem('time_query_usu_ca', time_query_ca);
					
					if(qnt_loop_ca > 0){
					
						for(var i=0;i<1;i++){
							
							var prot_ca = loop_ca[i].prot_ca;
							
							/* CHECAR SE OS DADOS EXISTEM == */
							sql.executeSql("SELECT * FROM usuarios_ep WHERE prot_ca='"+prot_ca+"'", [], function (sql, resultados){
								
								var total_ca_bd = resultados.rows.length;
								
								var json_ca_post = '';
								var pos_prot_ca_loop_ca = -1;
								
								for(var b=0;b<total_ca_bd;b++){
									
									/* RETORNANDO DADOS DO BANCO DE DADOS == */
									var prot_ca_bd = resultados.rows.item(b)[['prot_ca']];
									
									/* REFAZ O LOOP DE DADOS == */
									for(var c=0;c<qnt_loop_ca;c++){
									
										var loop_ca_lp = loop_ca[c];
										var prot_ca = loop_ca[c].prot_ca;
										
										if(prot_ca == prot_ca_bd){
											
											json_ca_post = loop_ca_lp;
											pos_prot_ca_loop_ca = c;
											
										}
										
									}
									
								}
								
								/* REMOVE O ITEM DO LOOP_VI == */
								if(pos_prot_ca_loop_ca >= 0){
									
									loop_ca.splice(pos_prot_ca_loop_ca, 1);
									json_ca.loop_ca = loop_ca;
									json_ca_dw = json_ca;
									
									/* CHAMA A FUN��O NOVAMENTE PARA INSERIR OU ATUALIZAR == */
									download_usuarios_ep();
									
								} else {
									
									json_ca_post = loop_ca[0];
									loop_ca.splice(0, 1);
									json_ca.loop_ca = loop_ca;
									json_ca_dw = json_ca;
									
									/* CHAMA A FUN��O NOVAMENTE PARA INSERIR OU ATUALIZAR == */
									download_usuarios_ep();
									
								}
								
								/* RETORNANDO DADOS DO VETOR SELECIONADO == */
								var prot_ca = json_ca_post.prot_ca;
								var prot_site_ca = json_ca_post.prot_site_ca;
								var tipo_ca = json_ca_post.tipo_ca;
								var foto_ca = json_ca_post.foto_ca;
								var nome_ca = classApi.escapa_caracteres_sqlite_ep(json_ca_post.nome_ca);
								var time_ca = json_ca_post.time_ca;
								var excluido_ca = json_ca_post.excluido_ca;
								
								if(total_ca_bd == 0){
									
									/* INSERIR DADOS == */
									sql.executeSql("INSERT INTO usuarios_ep (prot_ca, prot_site_ca, tipo_ca, foto_ca, nome_ca, time_ca, excluido_ca) VALUES('"+prot_ca+"', '"+prot_site_ca+"', '"+tipo_ca+"', '"+foto_ca+"', '"+nome_ca+"', '"+time_ca+"', '"+excluido_ca+"')");
									
								} else {
									
									/* ATUALIZAR DADOS == */
									sql.executeSql("UPDATE usuarios_ep SET tipo_ca='"+tipo_ca+"', foto_ca='"+foto_ca+"', nome_ca='"+nome_ca+"', excluido_ca='"+excluido_ca+"' WHERE prot_ca='"+prot_ca+"'");
									
								}
								
							});
							
						}
						
					} else {
					
						/* CRIAR ARQUIVO DE USU�RIOS == */
						if(total_ca > 0){
							
							sql.executeSql("SELECT * FROM usuarios_ep ORDER BY nome_ca ASC", [], function (sql, resultados){
								
								var total_ca = resultados.rows.length;
								var loop_ca = Array();
								
								for(var c=0;c<total_ca;c++){
									
									/* RETORNANDO DADOS DO BANCO DE DADOS == */
									var prot_ca = resultados.rows.item(c)[['prot_ca']];
									var prot_site_ca = resultados.rows.item(c)[['prot_site_ca']];
									var tipo_ca = resultados.rows.item(c)[['tipo_ca']];
									var foto_ca = resultados.rows.item(c)[['foto_ca']];
									var nome_ca = resultados.rows.item(c)[['nome_ca']];
									var time_ca = resultados.rows.item(c)[['time_ca']];
									var excluido_ca = resultados.rows.item(c)[['excluido_ca']];
									
									/* ATUALIZAR DADOS DE LOGIN == */
									if(prot_ca == prot_usu_ep){
								
										/* ATUALIZAR OS DADOS DE LOGIN == */
										json_login_ep.foto_ep = foto_ca;
										json_login_ep.nome_ep = nome_ca;
										var json_login_ep_post = JSON.stringify(json_login_ep);
										localStorage.setItem('json_ep', json_login_ep_post);	
										
									}
									
									var loop_ca_lp = {prot_ca:prot_ca, prot_site_ca:prot_site_ca, tipo_ca:tipo_ca, foto_ca:foto_ca, nome_ca:nome_ca, time_ca:time_ca, excluido_ca:excluido_ca};
									loop_ca.push(loop_ca_lp);
									
								}
								
								var json_ca = JSON.stringify({total_ca:total_ca, loop_ca:loop_ca});
								localStorage.setItem('json_usu_ep', json_ca);
								
								/* EXECUTAR FUN��ES DE RETORNO == */
								if(funcao_ep){
									new funcao_ep;
								}
							
								/* DELETAR VARI�VEL == */
								delete json_ca_dw;
								
							});
							
						} else {
					
							/* EXECUTAR FUN��ES DE RETORNO == */
							if(funcao_ep){
								new funcao_ep;
							}
						
							/* DELETAR VARI�VEL == */
							delete json_ca_dw;
						
						}
						
					}
				
				});
				
			} else {
				
				/* CONECTAR A API == */
				var tp_api_ep = 'usuarios_ep';
				var time_query_usu_ca = localStorage.getItem('time_query_usu_ca');
				
				$.post('http://api.empredi.com.br/pedidos', {tp_api_ep:tp_api_ep, prot_site_ep:prot_site_ep, prot_usu_ep:prot_usu_ep, time_update_ep:time_query_usu_ca}, function(json){
					
					json_ca_dw = json;
					
					download_usuarios_ep();
					
				}).fail(function(){
									
					/* EXECUTAR FUN��ES DE ERRO == */
					if(funcao_erro_ep){
						new funcao_erro_ep;
					}
					
				});
				
			}
			
		}
		
		/* IMPORTAR USUARIOS DO ARQUIVO JSON == */
		function importar_bd_usuarios_json_ep(){
		
			var usus_importados_ep = localStorage.getItem('usus_importados_ep');
			
			if(!usus_importados_ep){
				
				conect_bd_ep.transaction(function(sql){
												  
					var json_usu_ep = localStorage.getItem('json_usu_ep');
					json_usu_ep = eval('('+json_usu_ep+')');
					var loop_ca  = json_usu_ep.loop_ca;
					var qnt_loop_ca = loop_ca.length;
					
					for(var i=0;i<qnt_loop_ca;i++){
						
						var json_ca = loop_ca[i];
						
						check_importar_bd_usuarios_json_ep(sql, json_ca);
						
					}
					
					localStorage.setItem('usus_importados_ep', '1');
												  
				});
				
			}
		
		}
		
		/* CHECK IPORTAR USU�RIOS == */
		function check_importar_bd_usuarios_json_ep(sql, json_ca){
			
			var prot_ca = json_ca.prot_ca;
			var prot_site_ca = json_ca.prot_site_ca;
			var tipo_ca = json_ca.tipo_ca;
			var foto_ca = json_ca.foto_ca;
			var nome_ca = classApi.escapa_caracteres_sqlite_ep(json_ca.nome_ca);
			var time_ca = json_ca.time_ca;
			var excluido_ca = json_ca.excluido_ca;
			
			/* CHECAR SE OS DADOS EXISTEM == */
			sql.executeSql("SELECT * FROM usuarios_ep WHERE prot_ca='"+prot_ca+"'", [], function (sql, resultados){
			
				var total_ca = resultados.rows.length;
			
				if(total_ca == 0){
									
					/* INSERIR DADOS == */
					sql.executeSql("INSERT INTO usuarios_ep (prot_ca, prot_site_ca, tipo_ca, foto_ca, nome_ca, time_ca, excluido_ca) VALUES('"+prot_ca+"', '"+prot_site_ca+"', '"+tipo_ca+"', '"+foto_ca+"', '"+nome_ca+"', '"+time_ca+"', '"+excluido_ca+"')");
					
				} else {
					
					/* ATUALIZAR DADOS == */
					sql.executeSql("UPDATE usuarios_ep SET tipo_ca='"+tipo_ca+"', foto_ca='"+foto_ca+"', nome_ca='"+nome_ca+"', excluido_ca='"+excluido_ca+"' WHERE prot_ca='"+prot_ca+"'");
					
				}
			
			});
			
		}
		
		/* DOWNLOAD CLIENTES == */
		function download_clientes_ep(){
		
			if(window.json_ca_dw){
				
				conect_bd_ep.transaction(function(sql){
				
					var json_ca = json_ca_dw;
					var time_query_ca = json_ca.time_query_ca;
					var total_ca = json_ca.total_ca;
					
					/* CHECAR ELEMENTOS == */
					if(json_ca.loop_ca){
						
						var loop_ca = json_ca.loop_ca;
						var qnt_loop_ca = loop_ca.length;
						
					} else {
						var qnt_loop_ca = 0;
					}
					
					/* ATUALIZAR TIME DE CONSULTA == */
					if(time_query_ca.length > 0){
						localStorage.setItem('time_query_ca', time_query_ca);
					}
					
					if(qnt_loop_ca > 0){
						
						for(var i=0;i<1;i++){
						
							var id_ca = loop_ca[i].id_ca;
							var prot_ca = loop_ca[i].prot_ca;
							
							/* CHECAR VISITAS == */
							sql.executeSql("SELECT * FROM clientes_ca WHERE prot_ca='"+prot_ca+"'", [], function (sql, resultados){
							
								var total_ca_bd = resultados.rows.length;
							
								var json_ca_post = '';
								var pos_prot_ca_loop_ca = -1;
								
								for(var b=0;b<json_ca_post;b++){
									
									/* RETORNANDO DADOS DO BANCO DE DADOS == */
									var prot_ca_bd = resultados.rows.item(b)[['prot_ca']];
									
									/* REFAZ O LOOP DE DADOS == */
									for(var v=0;v<qnt_loop_ca;v++){
									
										var loop_ca_lp = loop_ca[v];
										var prot_ca = loop_ca[v].prot_ca;
										
										if(prot_ca == prot_ca_bd){
											
											json_ca_post = loop_ca_lp;
											pos_prot_ca_loop_ca = v;
											
										}
										
									}
									
								}
								
								/* REMOVE O ITEM DO LOOP_VI == */
								if(pos_prot_ca_loop_ca >= 0){
									
									loop_ca.splice(pos_prot_ca_loop_ca, 1);
									json_ca.loop_ca = loop_ca;
									json_ca_dw = json_ca;
									
									/* CHAMA A FUN��O NOVAMENTE PARA INSERIR OU ATUALIZAR == */
									download_clientes_ep();
									
								} else {
									
									json_ca_post = loop_ca[0];
									loop_ca.splice(0, 1);
									json_ca.loop_ca = loop_ca;
									json_ca_dw = json_ca;
									
									/* CHAMA A FUN��O NOVAMENTE PARA INSERIR OU ATUALIZAR == */
									download_clientes_ep();
									
								}
								
								var id_ca = json_ca_post.id_ca;
								var prot_ca = json_ca_post.prot_ca;
								var prot_site_ca = json_ca_post.prot_site_ca;
								var prot_usu_ca = json_ca_post.prot_usu_ca;
								var prot_usus_ca = json_ca_post.prot_usus_ca;
								var prot_cliente_ca = json_ca_post.prot_cliente_ca;
								var ordem_ca = 0;
								var cod_ca = json_ca_post.cod_ca;
								var tipo_ca = json_ca_post.tipo_ca;
								var classificacao_ca = json_ca_post.classificacao_ca;
								var tp_pessoa_ca = json_ca_post.tp_pessoa_ca;
								var razao_social_ca = classApi.escapa_caracteres_sqlite_ep(json_ca_post.razao_social_ca);
								var nome_fantasia_ca = classApi.escapa_caracteres_sqlite_ep(json_ca_post.nome_fantasia_ca);
								var cnpj_ca = classApi.escapa_caracteres_sqlite_ep(json_ca_post.cnpj_ca);
								var insc_estadual_ca = classApi.escapa_caracteres_sqlite_ep(json_ca_post.insc_estadual_ca);
								var insc_municipal_ca = classApi.escapa_caracteres_sqlite_ep(json_ca_post.insc_municipal_ca);
								var cargo_ca = classApi.escapa_caracteres_sqlite_ep(json_ca_post.cargo_ca);
								var nome_ca = classApi.escapa_caracteres_sqlite_ep(json_ca_post.nome_ca);
								var cpf_ca = classApi.escapa_caracteres_sqlite_ep(json_ca_post.cpf_ca);
								var email_ca = classApi.escapa_caracteres_sqlite_ep(json_ca_post.email_ca);
								var email_nf_ca = classApi.escapa_caracteres_sqlite_ep(json_ca_post.email_nf_ca);
								var sexo_ca = classApi.escapa_caracteres_sqlite_ep(json_ca_post.sexo_ca);
								var data_nascimento_ca = classApi.escapa_caracteres_sqlite_ep(json_ca_post.data_nascimento_ca);
								var telefone1_ca = json_ca_post.telefone1_ca;
								var telefone2_ca = json_ca_post.telefone2_ca;
								var celular1_ca = json_ca_post.celular1_ca;
								var celular2_ca = json_ca_post.celular2_ca;
								var preferencias_ca = json_ca_post.preferencias_ca;
								var endereco_ca = classApi.escapa_caracteres_sqlite_ep(json_ca_post.endereco_ca);
								var n_endereco_ca = classApi.escapa_caracteres_sqlite_ep(json_ca_post.n_endereco_ca);
								var complemento_ca = classApi.escapa_caracteres_sqlite_ep(json_ca_post.complemento_ca);
								var bairro_ca = classApi.escapa_caracteres_sqlite_ep(json_ca_post.bairro_ca);
								var cep_ca = classApi.escapa_caracteres_sqlite_ep(json_ca_post.cep_ca);
								var cidade_ca = classApi.escapa_caracteres_sqlite_ep(json_ca_post.cidade_ca);
								var estado_ca = classApi.escapa_caracteres_sqlite_ep(json_ca_post.estado_ca);
								var time_ca = json_ca_post.time_ca;
								var time_atualizado_ca = json_ca_post.time_atualizado_ca;
								var time_cm_ca = json_ca_post.time_cm_ca;
								var excluido_ca = json_ca_post.excluido_ca;
								var sync_ca = 1;
								
								if(total_ca_bd == 0){
								
									/* SALVAR CLIENTES == */
									sql.executeSql("INSERT INTO clientes_ca(prot_ca, prot_site_ca, prot_usu_ca, prot_usus_ca, ordem_ca, cod_ca, tipo_ca, tp_pessoa_ca, razao_social_ca, nome_fantasia_ca, cnpj_ca, insc_estadual_ca, insc_municipal_ca, cargo_ca, nome_ca, cpf_ca, email_ca, email_nf_ca, sexo_ca, data_nascimento_ca, telefone1_ca, telefone2_ca, celular1_ca, celular2_ca, preferencias_ca, endereco_ca, n_endereco_ca, complemento_ca, bairro_ca, cep_ca, cidade_ca, estado_ca, time_ca, excluido_ca, sync_ca) VALUES('"+prot_ca+"', '"+prot_site_ca+"', '"+prot_usu_ca+"', '"+prot_usus_ca+"', '"+ordem_ca+"', '"+cod_ca+"', '"+tipo_ca+"', '"+tp_pessoa_ca+"', '"+razao_social_ca+"', '"+nome_fantasia_ca+"', '"+cnpj_ca+"', '"+insc_estadual_ca+"', '"+insc_municipal_ca+"', '"+cargo_ca+"', '"+nome_ca+"', '"+cpf_ca+"', '"+email_ca+"', '"+email_nf_ca+"', '"+sexo_ca+"', '"+data_nascimento_ca+"', '"+telefone1_ca+"', '"+telefone2_ca+"', '"+celular1_ca+"', '"+celular2_ca+"', '"+preferencias_ca+"', '"+endereco_ca+"', '"+n_endereco_ca+"', '"+complemento_ca+"', '"+bairro_ca+"', '"+cep_ca+"', '"+cidade_ca+"', '"+estado_ca+"', '"+time_ca+"', '"+excluido_ca+"', '"+sync_ca+"')");
								
								
								} else {
									
									/* ATUALIZAR DADOS == */
									sql.executeSql("UPDATE clientes_ca SET prot_usu_ca='"+prot_usu_ca+"', prot_usus_ca='"+prot_usus_ca+"', ordem_ca='"+ordem_ca+"', cod_ca='"+cod_ca+"', tipo_ca='"+tipo_ca+"', classificacao_ca='"+classificacao_ca+"', tp_pessoa_ca='"+tp_pessoa_ca+"', razao_social_ca='"+razao_social_ca+"', nome_fantasia_ca='"+nome_fantasia_ca+"', cnpj_ca='"+cnpj_ca+"', insc_estadual_ca='"+insc_estadual_ca+"', insc_municipal_ca='"+insc_municipal_ca+"', cargo_ca='"+cargo_ca+"', nome_ca='"+nome_ca+"', cpf_ca='"+cpf_ca+"', email_ca='"+email_ca+"', email_nf_ca='"+email_nf_ca+"', sexo_ca='"+sexo_ca+"', data_nascimento_ca='"+data_nascimento_ca+"', preferencias_ca='"+preferencias_ca+"', telefone1_ca='"+telefone1_ca+"', telefone2_ca='"+telefone2_ca+"', celular1_ca='"+celular1_ca+"', celular2_ca='"+celular2_ca+"', endereco_ca='"+endereco_ca+"', n_endereco_ca='"+n_endereco_ca+"', complemento_ca='"+complemento_ca+"', bairro_ca='"+bairro_ca+"', cep_ca='"+cep_ca+"', cidade_ca='"+cidade_ca+"', estado_ca='"+estado_ca+"', time_atualizado_ca='"+time_ca+"', excluido_ca='"+excluido_ca+"', sync_ca='"+sync_ca+"' WHERE prot_ca='"+prot_ca+"' AND sync_ca=1", []);
									
								}
								
							});
							
						}
						
					} else {
						
						/* EXECUTAR FUN��ES DE ERRO == */
						if(funcao_ep){
							new funcao_ep;
						}
						
						/* DELETAR VARI�VEL == */
						delete json_ca_dw;
						
					}
					
				});
				
			} else {
			
				/* CONECTAR A API == */
				var tp_api_ep = 'clientes_ep';
				var time_query_ca = localStorage.getItem('time_query_ca');
				var prot_usu_ep = '';
				
				$.post('http://api.empredi.com.br/pedidos', {tp_api_ep:tp_api_ep, prot_site_ep:prot_site_ep, time_update_ep:time_query_ca}, function(json){
				
					/* CRIAR VARI�VEL == */
					json_ca_dw = json;
					
					/* CHAMAR NOVAMENTE A FUN��O DE DOWNLOAD == */
					download_clientes_ep();
					
				}).fail(function(){
									
					/* EXECUTAR FUN��ES DE ERRO == */
					if(funcao_erro_ep){
						new funcao_erro_ep;
					}
					
				});
				
			}
			
		}
		
		/* CHECK ENVIAR CLIENTES == */
		function check_enviar_clientes_ep(){
		
			conect_bd_ep.transaction(function(sql){
				
				sql.executeSql("SELECT * FROM clientes_ca WHERE sync_ca='0' LIMIT 1", [], function (sql, resultados){
																																			
					var total_ca_bd = resultados.rows.length;
					
					if(total_ca_bd > 0){
						
						for(var i=0;i<total_ca_bd;i++){
						
							/* COLETANDO DADOS == */
							var prot_ca = resultados.rows.item(i)[['prot_ca']];
							var prot_usu_ca = resultados.rows.item(i)[['prot_usu_ca']];
							var prot_usus_ca = resultados.rows.item(i)[['prot_usus_ca']];
							var cod_ca = resultados.rows.item(i)[['cod_ca']];
							var tipo_ca = resultados.rows.item(i)[['tipo_ca']];
							var classificacao_ca = resultados.rows.item(i)[['classificacao_ca']];
							var tp_pessoa_ca = resultados.rows.item(i)[['tp_pessoa_ca']];
							var razao_social_ca = resultados.rows.item(i)[['razao_social_ca']];
							var nome_fantasia_ca = resultados.rows.item(i)[['nome_fantasia_ca']];
							var cnpj_ca = resultados.rows.item(i)[['cnpj_ca']];
							var insc_estadual_ca = resultados.rows.item(i)[['insc_estadual_ca']];
							var insc_municipal_ca = resultados.rows.item(i)[['insc_municipal_ca']];
							var cargo_ca = resultados.rows.item(i)[['cargo_ca']];
							var nome_ca = resultados.rows.item(i)[['nome_ca']];
							var cpf_ca = resultados.rows.item(i)[['cpf_ca']];
							var email_ca = resultados.rows.item(i)[['email_ca']];
							var email_nf_ca = resultados.rows.item(i)[['email_nf_ca']];
							var sexo_ca = resultados.rows.item(i)[['sexo_ca']];
							var data_nascimento_ca = resultados.rows.item(i)[['data_nascimento_ca']];
							var preferencias_ca = resultados.rows.item(i)[['preferencias_ca']];
							var telefone1_ca = resultados.rows.item(i)[['telefone1_ca']];
							var telefone2_ca = resultados.rows.item(i)[['telefone2_ca']];
							var celular1_ca = resultados.rows.item(i)[['celular1_ca']];
							var celular2_ca = resultados.rows.item(i)[['celular2_ca']];
							var endereco_ca = resultados.rows.item(i)[['endereco_ca']];
							var n_endereco_ca = resultados.rows.item(i)[['n_endereco_ca']];
							var complemento_ca = resultados.rows.item(i)[['complemento_ca']];
							var bairro_ca = resultados.rows.item(i)[['bairro_ca']];
							var cep_ca = resultados.rows.item(i)[['cep_ca']];
							var cidade_ca = resultados.rows.item(i)[['cidade_ca']];
							var estado_ca = resultados.rows.item(i)[['estado_ca']];
							var produtos_ca = resultados.rows.item(i)[['produtos_ca']];
							var time_ca = resultados.rows.item(i)[['time_ca']];
							var time_atualizado_ca = resultados.rows.item(i)[['time_atualizado_ca']];
							var excluido_ca = resultados.rows.item(i)[['excluido_ca']];
							var tipo_nf_ca = resultados.rows.item(i)[['tipo_nf_ca']];
							var prot_usu_rg_nf_ca = resultados.rows.item(i)[['prot_usu_rg_nf_ca']];
							
							/* CRIAR JSON DE DADOS == */
							var json_ca = {prot_ca:prot_ca, prot_usu_ca:prot_usu_ca, prot_usus_ca:prot_usus_ca, cod_ca:cod_ca, tipo_ca:tipo_ca, classificacao_ca:classificacao_ca, tp_pessoa_ca:tp_pessoa_ca, razao_social_ca:razao_social_ca, nome_fantasia_ca:nome_fantasia_ca, cnpj_ca:cnpj_ca, insc_estadual_ca:insc_estadual_ca, insc_municipal_ca:insc_municipal_ca, nome_ca:nome_ca, cpf_ca:cpf_ca, email_ca:email_ca, email_nf_ca:email_nf_ca, sexo_ca:sexo_ca, data_nascimento_ca:data_nascimento_ca, preferencias_ca:preferencias_ca, telefone1_ca:telefone1_ca, telefone2_ca:telefone2_ca, celular1_ca:celular1_ca, celular2_ca:celular2_ca, endereco_ca:endereco_ca, n_endereco_ca:n_endereco_ca, complemento_ca:complemento_ca, bairro_ca:bairro_ca, cep_ca:cep_ca, cidade_ca:cidade_ca, estado_ca:estado_ca, produtos_ca:produtos_ca, time_ca:time_ca, time_atualizado_ca:time_atualizado_ca, excluido_ca:excluido_ca, tipo_nf_ca:tipo_nf_ca, prot_usu_rg_nf_ca:prot_usu_rg_nf_ca};
							
							check_enviar_contatos_clientes_ep(sql, prot_ca, json_ca);
										
						}
						
					} else {
					
						/* EXECUTAR FUN��ES DE ERRO == */
						if(funcao_ep){
							new funcao_ep;
						}
						
					}
					
				});
				
			});
			
		}
		
		/* CHECK ENVIAR CONTATOS == */
		function check_enviar_contatos_clientes_ep(sql, prot_ca, json_ca){
			
			/* PROCESSAR CONTATOS == */
			sql.executeSql("SELECT * FROM contatos_ca WHERE prot_ca_ca='"+prot_ca+"' AND excluido_ca=0 ORDER BY ordem_ca ASC", [], function (sql, resultados){
	
				var total_ca = resultados.rows.length;
				var loop_co_ca = Array();
				
				for(var c=0;c<total_ca;c++){
				
					/* COLETANDO DADOS == */
					var prot_co_ca = resultados.rows.item(c)[['prot_co_ca']];
					var prot_ca_ca = resultados.rows.item(c)[['prot_ca_ca']];
					var cargo_ca = resultados.rows.item(c)[['cargo_ca']];
					var nome_ca = resultados.rows.item(c)[['nome_ca']];
					var email_ca = resultados.rows.item(c)[['email_ca']];
					var sexo_ca = resultados.rows.item(c)[['sexo_ca']];
					var data_nascimento_ca = resultados.rows.item(c)[['data_nascimento_ca']];
					var cpf_ca = resultados.rows.item(c)[['cpf_ca']];
					var telefone1_ca = resultados.rows.item(c)[['telefone1_ca']];
					var telefone2_ca = resultados.rows.item(c)[['telefone2_ca']];
					var celular1_ca = resultados.rows.item(c)[['celular1_ca']];
					var celular2_ca = resultados.rows.item(c)[['celular2_ca']];
					var preferencias_ca = resultados.rows.item(c)[['preferencias_ca']];
					var time_ca = resultados.rows.item(c)[['time_ca']];
					var excluido_ca = resultados.rows.item(c)[['excluido_ca']];
					
					var loop_co_lp = {prot_co_ca:prot_co_ca, prot_ca_ca:prot_ca_ca, cargo_ca:cargo_ca, nome_ca:nome_ca, email_ca:email_ca, sexo_ca:sexo_ca, data_nascimento_ca:data_nascimento_ca, cpf_ca:cpf_ca, telefone1_ca:telefone1_ca, telefone2_ca:telefone2_ca, celular1_ca:celular1_ca, celular2_ca:celular2_ca, preferencias_ca:preferencias_ca, time_ca:time_ca, excluido_ca:excluido_ca};
					loop_co_ca.push(loop_co_lp);
					
				}
				
				json_ca.total_co_ca = total_ca;
				json_ca.loop_co_ca = loop_co_ca;
				
				enviar_clientes_ep(json_ca);
				
			});
			
		}
		
		/* ENVIAR CLIENTES == */
		function enviar_clientes_ep(json_ca){
		
			/* ATUALIZAR DADOS == */
			var tp_api_ep = 'salvar_cliente_ep';
			var json_post_ep = JSON.stringify({json_post_ep:json_ca});
			
			$.post('http://api.empredi.com.br/pedidos', {tp_api_ep:tp_api_ep, prot_site_ep:prot_site_ep, prot_usu_ep:prot_usu_ep, json_post_ep:json_post_ep}, function(json){
			
				/* CONEX�O COM O BANCO DE DADOS == */
				conect_bd_ep.transaction(function(sql){
			
					var json_ca = json;
					var loop_ca = json_ca.loop_ca;
					var qnt_loop_ca = loop_ca.length;
					
					for(var i=0;i<qnt_loop_ca;i++){
						
						var prot_ca = loop_ca[i].prot_ca;
						var sync_ca = 1;
						
						sql.executeSql("UPDATE clientes_ca SET ordem_ca=0, sync_ca='"+sync_ca+"' WHERE prot_ca='"+prot_ca+"'");
						
					}
				
					check_enviar_clientes_ep();
				
				});
			
			}).fail(function(event){
				
				/* EXECUTAR FUN��ES DE ERRO == */
				if(funcao_erro_ep){
					new funcao_erro_ep;
				}
				
			});
		
		}
		
		/* DOWNLOAD DE PEDIDOS == */
		function download_pedidos_pd(){
			
			if(window.json_pd_dw){
				var json_pd_dw_sl = window.json_pd_dw;
			} else if(window.json_pd_dw2){
				var json_pd_dw_sl = window.json_pd_dw2;
			} else if(window.json_pd_dw3){
				var json_pd_dw_sl = window.json_pd_dw3;
			} else if(window.json_pd_dw4){
				var json_pd_dw_sl = window.json_pd_dw4;
			}
			
			if(json_pd_dw_sl){
				
				conect_bd_ep.transaction(function(sql){
					
					var json_pd = json_pd_dw_sl;
					var time_query_pd = json_pd.time_query_pd;
					var total_pd = json_pd.total_pd;
					
					/* CHECAR ELEMENTOS == */
					if(json_pd.loop_pd){
						
						var loop_pd = json_pd.loop_pd;
						var qnt_loop_pd = loop_pd.length;
						
					} else {
						var qnt_loop_pd = 0;
					}
					console.log(qnt_loop_pd);
					/* ATUALIZAR TIME DE CONSULTA == */
					if(time_query_pd.length > 0){
						localStorage.setItem('time_query_pd', time_query_pd);
					}
					
					if(qnt_loop_pd > 0){
						
						for(var i=0;i<1;i++){
						
							var id_pd = loop_pd[i].id_pd;
							var cod_pd = loop_pd[i].cod_pd;
							
							/* CHECAR VISITAS == */
							sql.executeSql("SELECT * FROM pedidos_pd WHERE cod_pd='"+cod_pd+"'", [], function (sql, resultados){
							
								var total_pd_bd = resultados.rows.length;
							
								var json_pd_post = '';
								var pos_cod_pd_loop_pd = -1;
								
								for(var b=0;b<json_pd_post;b++){
									
									/* RETORNANDO DADOS DO BANCO DE DADOS == */
									var cod_pd_bd = resultados.rows.item(b)[['cod_pd']];
									
									/* REFAZ O LOOP DE DADOS == */
									for(var v=0;v<qnt_loop_pd;v++){
									
										var loop_pd_lp = loop_pd[v];
										var cod_pd = loop_pd[v].cod_pd;
										
										if(cod_pd == cod_pd_bd){
											
											json_pd_post = loop_pd_lp;
											pos_cod_pd_loop_pd = v;
											
										}
										
									}
									
								}
								
								/* REMOVE O ITEM DO LOOP_VI == */
								if(pos_cod_pd_loop_pd >= 0){
									
									loop_pd.splice(pos_cod_pd_loop_pd, 1);
									json_vi.loop_vi = loop_pd;
									json_vi_dw = json_pd;
									
									/* CHAMA A FUN��O NOVAMENTE PARA INSERIR OU ATUALIZAR == */
									download_pedidos_pd();
									
								} else {
									
									json_pd_post = loop_pd[0];
									loop_pd.splice(0, 1);
									json_pd.loop_pd = loop_pd;
									json_pd_dw = json_pd;
									
									/* CHAMA A FUN��O NOVAMENTE PARA INSERIR OU ATUALIZAR == */
									download_pedidos_pd();
									
								}
								
								/* DADOS DO CLIENTE == */
								var id_pd = json_pd_post.id_pd;
								var cod_pd = json_pd_post.cod_pd;
								var cod_pd_pd = json_pd_post.cod_pd_pd;
								var vs_pd = json_pd_post.vs_pd;
								var ordem_pd = 0;
								var pg_pedido_pd = json_pd_post.pg_pedido_pd;
								var prot_site_pd = json_pd_post.prot_site_pd;
								var prot_usu_pd = json_pd_post.prot_usu_pd;
								var prot_usu_rg_pd = json_pd_post.prot_usu_rg_pd;
								var prot_usu_ent_pd = json_pd_post.prot_usu_ent_pd;
								var prot_cliente_pd = json_pd_post.prot_cliente_pd;
								var cod_ca_pd = json_pd_post.cod_ca_pd;
								var tp_pessoa_pd = classApi.escapa_caracteres_sqlite_ep(json_pd_post.tp_pessoa_pd);
								var razao_social_pd = classApi.escapa_caracteres_sqlite_ep(json_pd_post.razao_social_pd);
								var nome_fantasia_pd = classApi.escapa_caracteres_sqlite_ep(json_pd_post.nome_fantasia_pd);
								var cnpj_pd = classApi.escapa_caracteres_sqlite_ep(json_pd_post.cnpj_pd);
								var insc_estadual_pd = classApi.escapa_caracteres_sqlite_ep(json_pd_post.insc_estadual_pd);
								var insc_municipal_pd = classApi.escapa_caracteres_sqlite_ep(json_pd_post.insc_municipal_pd);
								var nome_pd = classApi.escapa_caracteres_sqlite_ep(json_pd_post.nome_pd);
								var cpf_pd = classApi.escapa_caracteres_sqlite_ep(json_pd_post.cpf_pd);
								var email_pd = classApi.escapa_caracteres_sqlite_ep(json_pd_post.email_pd);
								var email_nf_pd = classApi.escapa_caracteres_sqlite_ep(json_pd_post.email_nf_pd);
								var telefone1_pd = classApi.escapa_caracteres_sqlite_ep(json_pd_post.telefone1_pd);
								var telefone2_pd = classApi.escapa_caracteres_sqlite_ep(json_pd_post.telefone2_pd);
								var celular1_pd = classApi.escapa_caracteres_sqlite_ep(json_pd_post.celular1_pd);
								var celular2_pd = classApi.escapa_caracteres_sqlite_ep(json_pd_post.celular2_pd);
								var endereco_pd = classApi.escapa_caracteres_sqlite_ep(json_pd_post.endereco_pd);
								var n_endereco_pd = classApi.escapa_caracteres_sqlite_ep(json_pd_post.n_endereco_pd);
								var complemento_pd = classApi.escapa_caracteres_sqlite_ep(json_pd_post.complemento_pd);
								var bairro_pd = classApi.escapa_caracteres_sqlite_ep(json_pd_post.bairro_pd);
								var cep_pd = classApi.escapa_caracteres_sqlite_ep(json_pd_post.cep_pd);
								var cidade_pd = classApi.escapa_caracteres_sqlite_ep(json_pd_post.cidade_pd);
								var estado_pd = classApi.escapa_caracteres_sqlite_ep(json_pd_post.estado_pd);
								var titulos_pr_pd = classApi.escapa_caracteres_sqlite_ep(json_pd_post.titulos_pr_pd);
								var data_prev_entrega_pd = json_pd_post.data_prev_entrega_pd;
								var data_entrega_pd = json_pd_post.data_entrega_pd;
								var sts_pd = json_pd_post.sts_pd;
								var data_nf_pd = json_pd_post.data_nf_pd;
								var n_nf_pd = json_pd_post.n_nf_pd;
								var nf_pd = json_pd_post.nf_pd;
								var time_pd = json_pd_post.time_pd;
								var time_sts_pd = json_pd_post.time_sts_pd;
								var time_cm_pd = json_pd_post.time_cm_pd;
								var time_atualizado_pd = json_pd_post.time_atualizado_pd;
								var time_update_pd = json_pd_post.time_update_pd;
								var excluido_pd = json_pd_post.excluido_pd;
								var sync_pd = 1;
								
								/* PROCESSAR IMPRESSÃO DE PEDIDO == */
								var pd_impresso_pd = json_pd_post.pd_impresso_pd;
								var prot_usu_pd_impresso_pd = json_pd_post.prot_usu_pd_impresso_pd;
								
								/* CONDIÇOES DO PEDIDO == */
								/* FORMAS DO PAGAMENTO == */
								var cod_forma_pagamento_pd = json_pd_post.cod_forma_pagamento_pd;
								var titulo_forma_pagamento_pd = classApi.escapa_caracteres_sqlite_ep(json_pd_post.titulo_forma_pagamento_pd);
								
								/* CONDIÇAO DE PAGAMENTO == */
								var cod_cond_pagamento_pd = json_pd_post.cod_cond_pagamento_pd;
								var titulo_cond_pagamento_pd = classApi.escapa_caracteres_sqlite_ep(json_pd_post.titulo_cond_pagamento_pd);
								
								/* FRETE == */
								var cod_frete_pd = json_pd_post.cod_frete_pd;
								var titulo_frete_pd = classApi.escapa_caracteres_sqlite_ep(json_pd_post.titulo_frete_pd);
								var valor_frete_pd = json_pd_post.valor_frete_pd;
								
								/* TRANSPORTADOR == */
								var cod_transportador_pd = json_pd_post.cod_transportador_pd;
								var titulo_transportador_pd = classApi.escapa_caracteres_sqlite_ep(json_pd_post.titulo_transportador_pd);
							
								/* OBSERVAÇÃO == */
								var observacao_pd = classApi.escapa_caracteres_sqlite_ep(json_pd_post.observacao_pd);
								
								/* PRODUTOS ADICIONADOS AO PEDIDO == */
								var valor_pd = json_pd_post.valor_pd;
								var total_pr_pd = json_pd_post.total_pr_pd;
								var valor_total_pr_pd = json_pd_post.valor_total_pr_pd;
								var loop_pr_pd = json_pd_post.loop_pr_pd;
		
								var qnt_loop_pr_pd = loop_pr_pd.length;
								var loop_pr_pd_temp = Array();
								
								for(var p=0;p<qnt_loop_pr_pd;p++){
								
									var cod_pr = loop_pr_pd[p].cod_pr;
									var cod_pr_pr = loop_pr_pd[p].cod_pr_pr;
									var cod_pr_pr_pr = loop_pr_pd[p].cod_pr_pr_pr;
									var cod_ca_pr = loop_pr_pd[p].cod_ca_pr;
									var cod_ma_pr = loop_pr_pd[p].cod_ma_pr;
									var foto_pr = loop_pr_pd[p].foto_pr;
									var titulo_pr = loop_pr_pd[p].titulo_pr;
									var texto_pr = loop_pr_pd[p].texto_pr;
									var valor_pr = loop_pr_pd[p].valor_pr;
									var quantidade_pr = loop_pr_pd[p].quantidade_pr;
									var valor_total_pr = loop_pr_pd[p].valor_total_pr;
									var excluido_pr = 0;
									
									var array_pr_lp = {cod_pr:cod_pr, cod_pr_pr:cod_pr_pr, cod_pr_pr_pr:cod_pr_pr_pr, cod_ca_pr:cod_ca_pr, cod_ma_pr:cod_ma_pr, foto_pr:foto_pr, titulo_pr:titulo_pr, texto_pr:texto_pr, valor_pr:valor_pr, quantidade_pr:quantidade_pr, valor_total_pr:valor_total_pr, excluido_pr:excluido_pr};
									loop_pr_pd_temp.push(array_pr_lp);
								
								}
								
								var loop_pr_pd_post = JSON.stringify(loop_pr_pd_temp);
								
								/* LOOP DE COMENTÁRIOS == */
								var loop_cm_pd = json_pd_post.loop_cm_pd;
								var qnt_loop_cm_pd = loop_cm_pd.length;
								
								for(var c=0;c<qnt_loop_cm_pd;c++){

									var json_cm = loop_cm_pd[c];
									download_pedidos_pd_cm(sql, json_cm);
																		
								}
								
								if(total_pd_bd == 0){
								
									/* SALVAR DADOS == */
									sql.executeSql("INSERT INTO pedidos_pd (id_pd, cod_pd, cod_pd_pd, vs_pd, ordem_pd, pg_pedido_pd, prot_usu_pd, prot_usu_rg_pd, prot_usu_ent_pd, prot_cliente_pd, cod_ca_pd, tp_pessoa_pd, razao_social_pd, nome_fantasia_pd, cnpj_pd, insc_estadual_pd, insc_municipal_pd, nome_pd, cpf_pd, email_pd, email_nf_pd, telefone1_pd, telefone2_pd, celular1_pd, celular2_pd, endereco_pd, n_endereco_pd, complemento_pd, bairro_pd, cep_pd, cidade_pd, estado_pd, data_prev_entrega_pd, data_entrega_pd, time_pd, time_sts_pd, time_cm_pd, time_atualizado_pd, time_update_pd, cod_forma_pagamento_pd, titulo_forma_pagamento_pd, cod_cond_pagamento_pd, titulo_cond_pagamento_pd, cod_frete_pd, titulo_frete_pd, valor_frete_pd, cod_transportador_pd, titulo_transportador_pd, observacao_pd, valor_pd, total_pr_pd, valor_total_pr_pd, loop_pr_pd, titulos_pr_pd, sts_pd, data_nf_pd, n_nf_pd, nf_pd, pd_impresso_pd, prot_usu_pd_impresso_pd, excluido_pd, sync_pd) VALUES('"+id_pd+"', '"+cod_pd+"', '"+cod_pd_pd+"', '"+vs_pd+"', '"+ordem_pd+"', '"+pg_pedido_pd+"', '"+prot_usu_pd+"', '"+prot_usu_rg_pd+"', '"+prot_usu_ent_pd+"', '"+prot_cliente_pd+"', '"+cod_ca_pd+"', '"+tp_pessoa_pd+"', '"+razao_social_pd+"', '"+nome_fantasia_pd+"', '"+cnpj_pd+"', '"+insc_estadual_pd+"', '"+insc_municipal_pd+"', '"+nome_pd+"', '"+cpf_pd+"', '"+email_pd+"', '"+email_nf_pd+"', '"+telefone1_pd+"', '"+telefone2_pd+"', '"+celular1_pd+"', '"+celular2_pd+"', '"+endereco_pd+"', '"+n_endereco_pd+"', '"+complemento_pd+"', '"+bairro_pd+"', '"+cep_pd+"', '"+cidade_pd+"', '"+estado_pd+"', '"+data_prev_entrega_pd+"', '"+data_entrega_pd+"', '"+time_pd+"', '"+time_sts_pd+"', '"+time_cm_pd+"', '"+time_atualizado_pd+"', '"+time_update_pd+"', '"+cod_forma_pagamento_pd+"', '"+titulo_forma_pagamento_pd+"', '"+cod_cond_pagamento_pd+"', '"+titulo_cond_pagamento_pd+"', '"+cod_frete_pd+"', '"+titulo_frete_pd+"', '"+valor_frete_pd+"', '"+cod_transportador_pd+"', '"+titulo_transportador_pd+"', '"+observacao_pd+"', '"+valor_pd+"', '"+total_pr_pd+"', '"+valor_total_pr_pd+"', '"+loop_pr_pd_post+"', '"+titulos_pr_pd+"', '"+sts_pd+"', '"+data_nf_pd+"', '"+n_nf_pd+"', '"+nf_pd+"', '"+pd_impresso_pd+"', '"+prot_usu_pd_impresso_pd+"', '"+excluido_pd+"', '"+sync_pd+"')");
									
								} else {
									
									/* ATUALIZAR DADOS == */
									sql.executeSql("UPDATE pedidos_pd SET prot_usu_ent_pd='"+prot_usu_ent_pd+"', prot_cliente_pd='"+prot_cliente_pd+"', ordem_pd='"+ordem_pd+"', cod_ca_pd='"+cod_ca_pd+"', razao_social_pd='"+razao_social_pd+"', nome_fantasia_pd='"+nome_fantasia_pd+"', cnpj_pd='"+cnpj_pd+"', insc_estadual_pd='"+insc_estadual_pd+"', insc_municipal_pd='"+insc_municipal_pd+"', nome_pd='"+nome_pd+"', cpf_pd='"+cpf_pd+"', email_pd='"+email_pd+"', email_nf_pd='"+email_nf_pd+"', telefone1_pd='"+telefone1_pd+"', telefone2_pd='"+telefone2_pd+"', celular1_pd='"+celular1_pd+"', celular2_pd='"+celular2_pd+"', endereco_pd='"+endereco_pd+"', n_endereco_pd='"+n_endereco_pd+"', complemento_pd='"+complemento_pd+"', bairro_pd='"+bairro_pd+"', cep_pd='"+cep_pd+"', cidade_pd='"+cidade_pd+"', estado_pd='"+estado_pd+"', data_prev_entrega_pd='"+data_prev_entrega_pd+"', data_entrega_pd='"+data_entrega_pd+"', cod_forma_pagamento_pd='"+cod_forma_pagamento_pd+"', titulo_forma_pagamento_pd='"+titulo_forma_pagamento_pd+"', cod_cond_pagamento_pd='"+cod_cond_pagamento_pd+"', titulo_cond_pagamento_pd='"+titulo_cond_pagamento_pd+"', cod_frete_pd='"+cod_frete_pd+"', titulo_frete_pd='"+titulo_frete_pd+"', valor_frete_pd='"+valor_frete_pd+"', cod_transportador_pd='"+cod_transportador_pd+"', titulo_transportador_pd='"+titulo_transportador_pd+"', titulos_pr_pd='"+titulos_pr_pd+"', total_pr_pd='"+total_pr_pd+"', valor_total_pr_pd='"+valor_total_pr_pd+"', loop_pr_pd='"+loop_pr_pd_post+"', valor_pd='"+valor_pd+"', sts_pd='"+sts_pd+"', data_nf_pd='"+data_nf_pd+"', n_nf_pd='"+n_nf_pd+"', nf_pd='"+nf_pd+"', pd_impresso_pd='"+pd_impresso_pd+"', prot_usu_pd_impresso_pd='"+prot_usu_pd_impresso_pd+"', time_pd='"+time_pd+"', time_sts_pd='"+time_sts_pd+"', time_cm_pd='"+time_cm_pd+"', time_atualizado_pd='"+time_atualizado_pd+"', time_update_pd='"+time_update_pd+"', excluido_pd='"+excluido_pd+"', sync_pd='"+sync_pd+"' WHERE cod_pd='"+cod_pd+"' AND sync_pd=1");
									
								}
							
							});
							
						}
						
					} else {
						
						/* EXECUTAR FUN��ES DE ERRO == */
						if(funcao_ep){
							new funcao_ep;
						}
						
						/* DELETAR VARI�VEL == */
						if(window.json_pd_dw){
							delete json_pd_dw;
						} else if(window.json_pd_dw2){
							delete json_pd_dw2;
						} else if(window.json_pd_dw3){
							delete json_pd_dw3;
						} else if(window.json_pd_dw4){
							delete json_pd_dw4;
						}
						
					}
					
				});
				
			} else {
				
				/* CONECTAR A API == */
				var tp_api_ep = 'pedidos_pd_ep';
				var time_query_pd = localStorage.getItem('time_query_pd');
				
				$.post('http://api.empredi.com.br/pedidos', {tp_api_ep:tp_api_ep, prot_site_ep:prot_site_ep, time_update_ep:time_query_pd}, function(json){
				
					/* CRIAR VARI�VEL == */
					if(!window.json_pd_dw){
						json_pd_dw = json;	
					} else if(!window.json_pd_dw2){
						json_pd_dw2 = json;
					} else if(!window.json_pd_dw3){
						json_pd_dw3 = json;
					} else if(!window.json_pd_dw4){
						json_pd_dw4 = json;
					}
					
					/* CHAMAR NOVAMENTE A FUN��O DE DOWNLOAD == */
					download_pedidos_pd();
					
				}).fail(function(){
									
					/* EXECUTAR FUN��ES DE ERRO == */
					if(funcao_erro_ep){
						new funcao_erro_ep;
					}
					
				});
				
			}
			
		}
		
		/* DOWNLOAD DE COMENTÁRIOS DOS PEDIDOS == */
		function download_pedidos_pd_cm(sql, json_cm){
			
			/* RETORNANDO DADOS == */
			var id_cm = json_cm.id_cm;
			var ordem_cm = 0;
			var cod_cm = json_cm.cod_cm;
			var prot_usu_cm = json_cm.prot_usu_cm;
			var prot_site_cm = json_cm.prot_site_cm;
			var cod_pd_cm = json_cm.cod_pd_cm;
			var tipo_cm = json_cm.tipo_cm;
			var tp_contato_vi_cm = json_cm.tp_contato_vi_cm;
			var txt_cm = classApi.escapa_caracteres_sqlite_ep(json_cm.txt_cm);
			var time_cm = json_cm.time_cm;
			var sync_cm = '1';
			var lido_cm = '1';
			var temp_cm = '0';
			var excluido_cm = json_cm.excluido_cm;
			
			/* CONSULTAR DADOS */
			sql.executeSql("SELECT * FROM pedidos_pd_cm WHERE cod_cm='"+cod_cm+"'", [], function (sql, resultados){
																																			
				var total_cm_bd = resultados.rows.length;
				
				if(total_cm_bd == 0){
					
					/* SALVAR DADOS == */
					sql.executeSql("INSERT INTO pedidos_pd_cm (ordem_cm, cod_cm, prot_usu_cm, prot_site_cm, cod_pd_cm, tipo_cm, tp_contato_vi_cm, txt_cm, time_cm, sync_cm, lido_cm, temp_cm, excluido_cm) VALUES('"+ordem_cm+"', '"+cod_cm+"', '"+prot_usu_cm+"', '"+prot_site_cm+"', '"+cod_pd_cm+"', '"+tipo_cm+"', '"+tp_contato_vi_cm+"', '"+txt_cm+"', '"+time_cm+"', '"+sync_cm+"', '"+lido_cm+"', '"+temp_cm+"', '"+excluido_cm+"')");
					
				} else {
				
					/* ATUALIZAR DADOS == */
					sql.executeSql("UPDATE pedidos_pd_cm SET txt_cm='"+txt_cm+"', excluido_cm='"+excluido_cm+"', sync_cm='"+sync_cm+"' WHERE cod_cm='"+cod_cm+"'");
					
				}
				
			});
			
		}
		
		/* DOWNLOAD DE MAQUINAS == */
		function check_enviar_pedidos_pd(){
			
			conect_bd_ep.transaction(function(sql){
				
				sql.executeSql("SELECT * FROM pedidos_pd WHERE sync_pd='0' LIMIT 1", [], function (sql, resultados){
																																			
					var total_pd_bd = resultados.rows.length;
					
					if(total_pd_bd > 0){
						
						for(var i=0;i<total_pd_bd;i++){
					
							/* DADOS DO CLIENTE == */
							var id_pd = resultados.rows.item(i)[['id_pd']];
							var cod_pd = resultados.rows.item(i)[['cod_pd']];
							var cod_pd_pd = str_pad(resultados.rows.item(i)[['cod_pd_pd']], 6, '0', 'STR_PAD_LEFT');
							var vs_pd = resultados.rows.item(i)[['vs_pd']];
							var prot_usu_pd = resultados.rows.item(i)[['prot_usu_pd']];
							var prot_usu_rg_pd = resultados.rows.item(i)[['prot_usu_rg_pd']];
							var pg_pedido_pd = resultados.rows.item(i)[['pg_pedido_pd']];
							var prot_cliente_pd = resultados.rows.item(i)[['prot_cliente_pd']];
							var cod_ca_pd = resultados.rows.item(i)[['cod_ca_pd']];
							var tp_pessoa_pd = resultados.rows.item(i)[['tp_pessoa_pd']];
							var razao_social_pd = resultados.rows.item(i)[['razao_social_pd']];
							var nome_fantasia_pd = resultados.rows.item(i)[['nome_fantasia_pd']];
							var cnpj_pd = resultados.rows.item(i)[['cnpj_pd']];
							var insc_estadual_pd = resultados.rows.item(i)[['insc_estadual_pd']];
							var insc_municipal_pd = resultados.rows.item(i)[['insc_municipal_pd']];
							var nome_pd = resultados.rows.item(i)[['nome_pd']];
							var cpf_pd = resultados.rows.item(i)[['cpf_pd']];
							var email_pd = resultados.rows.item(i)[['email_pd']];
							var email_nf_pd = resultados.rows.item(i)[['email_nf_pd']];
							var telefone1_pd = resultados.rows.item(i)[['telefone1_pd']];
							var telefone2_pd = resultados.rows.item(i)[['telefone2_pd']];
							var celular1_pd = resultados.rows.item(i)[['celular1_pd']];
							var celular2_pd = resultados.rows.item(i)[['celular2_pd']];
							var endereco_pd = resultados.rows.item(i)[['endereco_pd']];
							var n_endereco_pd = resultados.rows.item(i)[['n_endereco_pd']];
							var complemento_pd = resultados.rows.item(i)[['complemento_pd']];
							var bairro_pd = resultados.rows.item(i)[['bairro_pd']];
							var cep_pd = resultados.rows.item(i)[['cep_pd']];
							var cidade_pd = resultados.rows.item(i)[['cidade_pd']];
							var estado_pd = resultados.rows.item(i)[['estado_pd']];
							var titulos_pr_pd = resultados.rows.item(i)[['titulos_pr_pd']];
							var sts_pd = resultados.rows.item(i)[['sts_pd']];
							var acao_estoque_pd = resultados.rows.item(i)[['acao_estoque_pd']];
							var data_nf_pd = resultados.rows.item(i)[['data_nf_pd']];
							var n_nf_pd = resultados.rows.item(i)[['n_nf_pd']];
							var nf_pd = resultados.rows.item(i)[['nf_pd']];							
							var time_pd = resultados.rows.item(i)[['time_pd']];
							var time_sts_pd = resultados.rows.item(i)[['time_sts_pd']];
							var time_cm_pd = resultados.rows.item(i)[['time_cm_pd']];
							var time_atualizado_pd = resultados.rows.item(i)[['time_atualizado_pd']];
							var time_update_pd = resultados.rows.item(i)[['time_update_pd']];
							var excluido_pd = resultados.rows.item(i)[['excluido_pd']];
							var sync_pd = resultados.rows.item(i)[['sync_pd']];

							/* VALOR PEDIDO == */
							var valor_pd = resultados.rows.item(i)[['valor_pd']];
							var data_prev_entrega_pd = resultados.rows.item(i)[['data_prev_entrega_pd']];
							var data_entrega_pd = resultados.rows.item(i)[['data_entrega_pd']];
							
							/* FORMA DE PAGAMENTO  == */
							var cod_forma_pagamento_pd = resultados.rows.item(i)[['cod_forma_pagamento_pd']];
							var titulo_forma_pagamento_pd = resultados.rows.item(i)[['titulo_forma_pagamento_pd']];
						
							/* CONDIÇOES DE PAGAMENTO == */
							var cod_cond_pagamento_pd = resultados.rows.item(i)[['cod_cond_pagamento_pd']];
							var titulo_cond_pagamento_pd = resultados.rows.item(i)[['titulo_cond_pagamento_pd']];
							
							/* FRETE == */
							var cod_frete_pd = resultados.rows.item(i)[['cod_frete_pd']];
							var titulo_frete_pd = resultados.rows.item(i)[['titulo_frete_pd']];
							var valor_frete_pd = resultados.rows.item(i)[['valor_frete_pd']];
							
							/* TRANSPORTADOR == */
							var cod_transportador_pd = resultados.rows.item(i)[['cod_transportador_pd']];
							var titulo_transportador_pd = resultados.rows.item(i)[['titulo_transportador_pd']];
						
							/* OBSERVAÇOES == */
							var observacao_pd = resultados.rows.item(i)[['observacao_pd']];
							
							/* PRODUTOS == */
							var valor_pd = resultados.rows.item(i)[['valor_pd']];
							var total_pr_pd = resultados.rows.item(i)[['total_pr_pd']];
							var valor_total_pr_pd = resultados.rows.item(i)[['valor_total_pr_pd']];
							var loop_pr_pd = resultados.rows.item(i)[['loop_pr_pd']];

							/* INFORMAÇÕES DO SISTEMA == */
							var lat_long_gps_pd = resultados.rows.item(i)[['lat_long_gps_pd']];
							var sys_opr_gps_pd = resultados.rows.item(i)[['sys_opr_gps_pd']];
							var lat_long_gps_edit_pd = resultados.rows.item(i)[['lat_long_gps_edit_pd']];
							var sys_opr_gps_edit_pd = resultados.rows.item(i)[['sys_opr_gps_edit_pd']];
							
							/* TIPO DE NOTIFICAÇÃO == */
							var tipo_nf_pd = resultados.rows.item(i)[['tipo_nf_pd']];
							var prot_usu_rg_nf_pd = resultados.rows.item(i)[['prot_usu_rg_nf_pd']];
							
							var json_pd = {cod_pd:cod_pd, cod_pd_pd:cod_pd_pd, vs_pd:vs_pd, prot_usu_pd:prot_usu_pd, prot_usu_rg_pd:prot_usu_rg_pd, pg_pedido_pd:pg_pedido_pd, prot_cliente_pd:prot_cliente_pd, cod_ca_pd:cod_ca_pd, tp_pessoa_pd:tp_pessoa_pd, razao_social_pd:razao_social_pd, nome_fantasia_pd:nome_fantasia_pd, cnpj_pd:cnpj_pd, insc_estadual_pd:insc_estadual_pd, insc_municipal_pd:insc_municipal_pd, nome_pd:nome_pd, cpf_pd:cpf_pd, email_pd:email_pd, email_nf_pd:email_nf_pd, telefone1_pd:telefone1_pd, telefone2_pd:telefone2_pd, celular1_pd:celular1_pd, celular2_pd:celular2_pd, endereco_pd:endereco_pd, n_endereco_pd:n_endereco_pd, complemento_pd:complemento_pd, bairro_pd:bairro_pd, cep_pd:cep_pd, cidade_pd:cidade_pd, estado_pd:estado_pd, titulos_pr_pd:titulos_pr_pd, sts_pd:sts_pd, acao_estoque_pd:acao_estoque_pd, data_nf_pd:data_nf_pd, n_nf_pd:n_nf_pd, nf_pd:nf_pd, time_pd:time_pd, time_sts_pd:time_sts_pd, time_cm_pd:time_cm_pd, time_atualizado_pd:time_atualizado_pd, time_update_pd:time_update_pd, valor_pd:valor_pd, data_prev_entrega_pd:data_prev_entrega_pd, data_entrega_pd:data_entrega_pd, cod_forma_pagamento_pd:cod_forma_pagamento_pd, titulo_forma_pagamento_pd:titulo_forma_pagamento_pd, cod_cond_pagamento_pd:cod_cond_pagamento_pd, titulo_cond_pagamento_pd:titulo_cond_pagamento_pd, cod_frete_pd:cod_frete_pd, titulo_frete_pd:titulo_frete_pd, valor_frete_pd:valor_frete_pd, cod_transportador_pd:cod_transportador_pd, titulo_transportador_pd:titulo_transportador_pd, observacao_pd:observacao_pd, valor_pd:valor_pd, total_pr_pd:total_pr_pd, valor_total_pr_pd:valor_total_pr_pd, loop_pr_pd:loop_pr_pd, excluido_pd:excluido_pd, lat_long_gps_pd:lat_long_gps_pd, sys_opr_gps_pd:sys_opr_gps_pd, lat_long_gps_edit_pd:lat_long_gps_edit_pd, sys_opr_gps_edit_pd:sys_opr_gps_edit_pd, tipo_nf_pd:tipo_nf_pd, prot_usu_rg_nf_pd:prot_usu_rg_nf_pd};
							
							/* CHECAR COMENTÁRIOS A ENVIAR == */
							check_enviar_cm_pd(sql, json_pd);
						
						}
						
					} else {
					
						/* EXECUTAR FUN��ES DE ERRO == */
						if(funcao_ep){
							new funcao_ep;
						}
						
					}
					
				});
				
			});
			
		}
		
		/* CHECK ENVIAR COMENTÁRIOS == */
		function check_enviar_cm_pd(sql, json_pd){
			
			sql.executeSql("SELECT * FROM pedidos_pd_cm WHERE sync_cm='0'", [], function (sql, resultados){
																																			
				var total_cm_bd = resultados.rows.length;
				var loop_cm_pd = Array();
				
				if(total_cm_bd > 0){
					
					for(var i=0;i<total_cm_bd;i++){
						
						var prot_site_cm = resultados.rows.item(i)[['prot_site_cm']];
						var prot_usu_cm = resultados.rows.item(i)[['prot_usu_cm']];
						var cod_cm = resultados.rows.item(i)[['cod_cm']];
						var cod_pd_cm = resultados.rows.item(i)[['cod_pd_cm']];
						var txt_cm = resultados.rows.item(i)[['txt_cm']];
						var tipo_cm = resultados.rows.item(i)[['tipo_cm']];
						var time_cm = resultados.rows.item(i)[['time_cm']];
						
						var loop_cm_lp = {prot_site_cm:prot_site_cm, prot_usu_cm:prot_usu_cm, cod_cm:cod_cm, cod_pd_cm:cod_pd_cm, txt_cm:txt_cm, tipo_cm:tipo_cm, time_cm:time_cm};
						loop_cm_pd.push(loop_cm_lp);
						
					}
					
				}
				
				/* AJUSTAR JSON DE PEDIDOS == */
				json_pd.total_cm_pd = total_cm_bd;
				json_pd.loop_cm_pd = loop_cm_pd;
				
				/* ENVIAR PEDIDOS == */
				enviar_pedidos_pd(json_pd);
					
			});
			
		}
		
		/* ENVIAR PEDIDOS == */
		function enviar_pedidos_pd(json_pd){
			
			/* COLETAR DADOS == */
			var tp_api_ep = 'salvar_pedidos_pd_ep';
			var json_post_ep = JSON.stringify({json_post_ep:json_pd});
			
			$.post('http://api.empredi.com.br/pedidos', {tp_api_ep:tp_api_ep, prot_site_ep:prot_site_ep, prot_usu_ep:prot_usu_ep, json_post_ep:json_post_ep}, function(json){
								
					/* CONEX�O COM O BANCO DE DADOS == */
					conect_bd_ep.transaction(function(sql){
					
						var json_pd = json;
						var time_query_pd = json_pd.time_query_pd;
						var loop_pd = json_pd.loop_pd;
						var qnt_loop_pd = loop_pd.length;
						
						for(var i=0;i<qnt_loop_pd;i++){
							
							var cod_pd = loop_pd[i].cod_pd;
							var cod_pd_pd = loop_pd[i].cod_pd_pd;
							var sync_pd = 1;
							
							sql.executeSql("UPDATE pedidos_pd SET ordem_pd=0, acao_estoque_pd='', cod_pd_pd='"+cod_pd_pd+"', sync_pd='"+sync_pd+"' WHERE cod_pd='"+cod_pd+"'");
							sql.executeSql("UPDATE pedidos_pd_cm SET sync_cm='"+sync_pd+"' WHERE cod_pd_cm='"+cod_pd+"'");
							
						}
						
						check_enviar_pedidos_pd();
					
					});
					
				}).fail(function(event){
	
					/* EXECUTAR FUN��ES DE ERRO == */
					if(funcao_erro_ep){
						new funcao_erro_ep;
					}
					
				});
			
		}
		
		/* DOWNLOAD DE PRODUTOS == */
		function download_produtos_ep(){
		
			if(window.json_pr_dw){
				
				var json_pr = json_pr_dw;
				var time_query_pr = json_pr.time_query_pr;
				
				localStorage.setItem('time_query_pr', time_query_pr);
				
				/* MARCAS == */
				import_marcas_pr = function(){
					
					/* MARCAS == */
					var dados_ma_pr = json_pr.dados_ma_pr;
					var json_ma_pr = dados_ma_pr;
					var json_ma_pr_post = JSON.stringify(json_ma_pr);
					var total_ma = dados_ma_pr.total_ma;
					
					/* SETAR MARCAS == */
					localStorage.setItem('json_ma_pr', json_ma_pr_post);
					
					if(total_ma > 0){
					
						conect_bd_ep.transaction(function(sql){
												
							var loop_ma = json_ma_pr.loop_ma;
							var qnt_loop_ma = loop_ma.length;
							
							for(var i=0;i<qnt_loop_ma;i++){
							
								var json = loop_ma[i];
								check_import_marcas_pr(sql, json);
							
							}
							
							new importar_categorias_pr;
						
						});
					
					} else {
						new importar_categorias_pr;
					}
					
				}
				
				/* CATEGORIAS == */
				importar_categorias_pr = function(){
				
					/* MARCAS == */
					var dados_ca_pr = json_pr.dados_ca_pr;
					var json_ca_pr = dados_ca_pr;
					var total_ca = json_ca_pr.total_ca;
					
					if(total_ca > 0){
					
						conect_bd_ep.transaction(function(sql){
						
							var loop_ca = json_ca_pr.loop_ca;
							var qnt_loop_ma = loop_ca.length;
						
							for(var i=0;i<qnt_loop_ma;i++){
							
								var json = loop_ca[i];
								check_importar_categorias_pr(sql, json);
							
							}
							
							new import_produtos_pr;
							
						});
					
					} else {
						new import_produtos_pr;
					}
				
				}
				
				/* PRODUTOS == */
				import_produtos_pr = function(){
				
					/* PRODUTOS == */
					var dados_pr = json_pr.dados_pr;
					var json_pr_pr = dados_pr;
					var total_pr = json_pr_pr.total_pr;
				
					if(total_pr > 0){
					
						conect_bd_ep.transaction(function(sql){
						
							var loop_pr = json_pr_pr.loop_pr;
							var qnt_loop_pr = loop_pr.length;
							
							for(var i=0;i<qnt_loop_pr;i++){
							
								var json = loop_pr[i];
								check_import_produtos_pr(sql, json);
							
							}
							
						});
					
					}
					
					delete import_marcas_pr;
					delete importar_categorias_pr;
					delete import_produtos_pr;
					
					/* EXECUTAR FUN��ES DE ERRO == */
					if(funcao_ep){
						new funcao_ep;
					}
				
				}
				
				/* CHEMAR PRIMEIRA FUNÇÃO DA IMPORTAÇÃO == */
				new import_marcas_pr;
				
			} else {
				
				var tp_api_ep = 'produtos_pr_ep';
				var time_query_pr = localStorage.getItem('time_query_pr');
				var sync_ma_pr = 1;
				var sync_ca_pr = 1;
				
				$.post('http://api.empredi.com.br/pedidos', {tp_api_ep:tp_api_ep, prot_site_ep:prot_site_ep, prot_usu_ep:prot_usu_ep, sync_ma_pr:sync_ma_pr, sync_ca_pr:sync_ca_pr, time_update_ep:time_query_pr}, function(json){
				
					/* CRIAR VARI�VEL == */
					json_pr_dw = json;
				
					/* CHAMAR NOVAMENTE A FUNÇÃO DE DONWLOAD == */
					download_produtos_ep();
					
				}).fail(function(event){
					
					/* EXECUTAR FUN��ES DE ERRO == */
					if(funcao_erro_ep){
						new funcao_erro_ep;
					}
					
				});
				
			}
			
		}
		
		/* CHECAR IMPORTAÇÃO DE MARCAS == */
		function check_import_marcas_pr(sql, json){
			
			/* COLETANDO DADOS == */
			var id_ma = json.id_ma;
			var cod_ma = json.cod_ma;
			var titulo_ma = classApi.escapa_caracteres_sqlite_ep(json.titulo_ma);
			var texto_ma = classApi.escapa_caracteres_sqlite_ep(json.texto_ma);
			var time_ma = json.time_ma;
			var time_atualizado_ma = json.time_atualizado_ma;
			var publicar_ma = json.publicar_ma;
			var excluido_ma = json.excluido_ma;
			var sync_ma = 1;
			
			/* CHECAR REGISTRO == */
			sql.executeSql("SELECT * FROM produtos_pr_ma WHERE cod_ma='"+cod_ma+"'", [], function (sql, resultados){
																																			
				var total_ma_bd = resultados.rows.length;
				
				if(total_ma_bd == 0){
				
					/* INSERIR DADOS == */
					sql.executeSql("INSERT INTO produtos_pr_ma (id_ma, cod_ma, titulo_ma, texto_ma, time_ma, time_atualizado_ma, publicar_ma, excluido_ma, sync_ma) VALUES('"+id_ma+"', '"+cod_ma+"', '"+titulo_ma+"', '"+texto_ma+"', '"+time_ma+"', '"+time_atualizado_ma+"', '"+publicar_ma+"', '"+excluido_ma+"', '"+sync_ma+"')");
					
				} else {
				
					/* ATUALIZAR DADOS == */
					sql.executeSql("UPDATE produtos_pr_ma SET titulo_ma='"+titulo_ma+"', texto_ma='"+texto_ma+"', time_atualizado_ma='"+time_atualizado_ma+"', publicar_ma='"+publicar_ma+"', excluido_ma='"+excluido_ma+"', sync_ma='"+sync_ma+"' WHERE cod_ma='"+cod_ma+"'");
					
				}
				
			});
			
		}
		
		/* CHECK IMPORTAÇÃO DE CATEGORIAS == */
		function check_importar_categorias_pr(sql, json){
			
			/* COLETANDO DADOS == */
			var id_ca = json.id_ca;
			var cod_ca = json.cod_ca;
			var titulo_ca = classApi.escapa_caracteres_sqlite_ep(json.titulo_ca);
			var texto_ca = classApi.escapa_caracteres_sqlite_ep(json.texto_ca);
			var time_ca = json.time_ca;
			var time_atualizado_ca = json.time_atualizado_ca;
			var publicar_ca = json.publicar_ca;
			var excluido_ca = json.excluido_ca;
			var sync_ca = 1;
			
			/* CHECAR REGISTRO == */
			sql.executeSql("SELECT * FROM produtos_pr_ca WHERE cod_ca='"+cod_ca+"'", [], function (sql, resultados){
																																			
				var total_ca_bd = resultados.rows.length;
				
				if(total_ca_bd == 0){
				
					/* SALVAR DADOS == */
					sql.executeSql("INSERT INTO produtos_pr_ca (id_ca, cod_ca, titulo_ca, texto_ca, time_ca, time_atualizado_ca, publicar_ca, excluido_ca, sync_ca) VALUES('"+id_ca+"', '"+cod_ca+"', '"+titulo_ca+"', '"+texto_ca+"', '"+time_ca+"', '"+time_atualizado_ca+"', '"+publicar_ca+"', '"+excluido_ca+"', '"+sync_ca+"')");
					
				} else {
					
					/* ATUALIZAR DADOS == */
					sql.executeSql("UPDATE produtos_pr_ca SET titulo_ca='"+titulo_ca+"', texto_ca='"+texto_ca+"', time_atualizado_ca='"+time_atualizado_ca+"', publicar_ca='"+publicar_ca+"', excluido_ca='"+excluido_ca+"', sync_ca='"+sync_ca+"' WHERE cod_ca='"+cod_ca+"'");
					
				}
				
			});
			
		}
		
		/* CHECAR IMPORTAÇÃO DE PRODUTOS == */
		function check_import_produtos_pr(sql, json){
			
			/* COLETANDO DADOS == */
			var id_pr = json.id_pr;
			var cod_pr = json.cod_pr;
			var cod_pr_pr = json.cod_pr_pr;
			var cod_ca_pr = json.cod_ca_pr;
			var cod_ma_pr = json.cod_ma_pr;
			var ordem_pr = json.ordem_pr;
			var titulo_pr = classApi.escapa_caracteres_sqlite_ep(json.titulo_pr);
			var resumo_pr = classApi.escapa_caracteres_sqlite_ep(json.resumo_pr);
			var texto_pr = classApi.escapa_caracteres_sqlite_ep(json.texto_pr);
			var cod_ncm_pr = classApi.escapa_caracteres_sqlite_ep(json.cod_ncm_pr);
			var unid_med_pr = classApi.escapa_caracteres_sqlite_ep(json.unid_med_pr);
			var valor_pr = json.valor_pr;
			var qnt_est_pr = json.qnt_est_pr;
			var publicar_pr = json.publicar_pr;
			var time_pr = json.time_pr;
			var time_atualizado_pr = json.time_atualizado_pr;
			var excluido_ca_pr = json.excluido_ca_pr;
			var excluido_pr = json.excluido_pr;
			var temp_pr = json.temp_pr;
			var sync_pr = 1;
			
			var loop_ft_pr = json.loop_ft_pr;
			var loop_ft_pr_post = JSON.stringify(loop_ft_pr);
			
			/* CHECAR REGISTRO == */
			sql.executeSql("SELECT * FROM produtos_pr WHERE cod_pr='"+cod_pr+"'", [], function (sql, resultados){
																																			
				var total_pr_bd = resultados.rows.length;
				
				if(total_pr_bd == 0){
				
					/* SALVAR DADOS == */
					sql.executeSql("INSERT INTO produtos_pr (id_pr, cod_pr, cod_pr_pr, cod_ca_pr, cod_ma_pr, ordem_pr, titulo_pr, resumo_pr, texto_pr, cod_ncm_pr, unid_med_pr, valor_pr, qnt_est_pr, loop_ft_pr, publicar_pr, time_pr, time_atualizado_pr, excluido_ca_pr, excluido_pr, temp_pr, sync_pr) VALUES('"+id_pr+"', '"+cod_pr+"', '"+cod_pr_pr+"', '"+cod_ca_pr+"', '"+cod_ma_pr+"', '"+ordem_pr+"', '"+titulo_pr+"', '"+resumo_pr+"', '"+texto_pr+"', '"+cod_ncm_pr+"', '"+unid_med_pr+"', '"+valor_pr+"', '"+qnt_est_pr+"', '"+loop_ft_pr_post+"', '"+publicar_pr+"', '"+time_pr+"', '"+time_atualizado_pr+"', '"+excluido_ca_pr+"', '"+excluido_pr+"', '"+temp_pr+"', '"+sync_pr+"')");
					
				} else {
					
					/* ATUALIZAR DADOS == */
					sql.executeSql("UPDATE produtos_pr SET cod_pr_pr='"+cod_pr_pr+"', cod_ma_pr='"+cod_ma_pr+"', ordem_pr='"+ordem_pr+"', titulo_pr='"+titulo_pr+"', resumo_pr='"+resumo_pr+"', texto_pr='"+texto_pr+"', cod_ncm_pr='"+cod_ncm_pr+"', unid_med_pr='"+unid_med_pr+"', valor_pr='"+valor_pr+"', qnt_est_pr='"+qnt_est_pr+"', loop_ft_pr='"+loop_ft_pr_post+"', publicar_pr='"+publicar_pr+"', time_pr='"+time_pr+"', time_atualizado_pr='"+time_atualizado_pr+"', excluido_ca_pr='"+excluido_ca_pr+"', excluido_pr='"+excluido_pr+"', temp_pr='"+temp_pr+"', sync_pr='"+sync_pr+"' WHERE cod_pr='"+cod_pr+"'");
					
				}
				
			});
			
		}
		
		/* DOWNLOAD CONDIÇÕES DOS PEDIDOS == */
		function download_pedidos_conds_ep(){
			
			if(window.json_cd_dw){
				
				conect_bd_ep.transaction(function(sql){
					
					var json_cd = json_cd_dw;
					var time_query_cd = json_cd.time_query_cd;
					var total_cd = json_cd.total_cd;
					
					/* CHECAR ELEMENTOS == */
					if(json_cd.loop_cd){
						
						var loop_cd = json_cd.loop_cd;
						var qnt_loop_cd = loop_cd.length;
						
					} else {
						var qnt_loop_cd = 0;
					}
					
					/* ATUALIZAR TIME DE CONSULTA == */
					if(time_query_cd.length > 0){
						localStorage.setItem('time_query_cd', time_query_cd);
					}
					
					if(qnt_loop_cd > 0){
						
						for(var i=0;i<1;i++){
							
							var cod_cd = loop_cd[i].cod_cd;
							
							/* CHECAR VISITAS == */
							sql.executeSql("SELECT * FROM pedidos_pd_conds WHERE cod_cd='"+cod_cd+"'", [], function (sql, resultados){
								
								var total_cd_bd = resultados.rows.length;
								
								var json_cd_post = '';
								var pos_cod_cd_loop_cd = -1;
								
								for(var b=0;b<json_cd_post;b++){
									
									/* RETORNANDO DADOS DO BANCO DE DADOS == */
									var cod_cd_bd = resultados.rows.item(b)[['cod_cd']];
									
									/* REFAZ O LOOP DE DADOS == */
									for(var v=0;v<qnt_loop_cd;v++){
									
										var loop_cd_lp = loop_cd[v];
										var cod_cd = loop_cd[v].cod_cd;
										
										if(cod_cd == cod_cd_bd){
											
											json_cd_post = loop_cd_lp;
											pos_cod_cd_loop_cd = v;
											
										}
										
									}
									
								}
								
								/* REMOVE O ITEM DO LOOP_VI == */
								if(pos_cod_cd_loop_cd >= 0){
									
									loop_cd.splice(pos_cod_cd_loop_cd, 1);
									json_cd.loop_cd = loop_cd;
									json_cd_dw = json_cd;
									
									/* CHAMA A FUN��O NOVAMENTE PARA INSERIR OU ATUALIZAR == */
									download_pedidos_conds_ep();
									
								} else {
									
									json_cd_post = loop_cd[0];
									loop_cd.splice(0, 1);
									json_cd.loop_cd = loop_cd;
									json_cd_dw = json_cd;
									
									/* CHAMA A FUN��O NOVAMENTE PARA INSERIR OU ATUALIZAR == */
									download_pedidos_conds_ep();
									
								}
								
								var id_cd = json_cd_post.id_cd;
								var cod_cd = json_cd_post.cod_cd;
								var tipo_cd = json_cd_post.tipo_cd;
								var titulo_cd = json_cd_post.titulo_cd;
								var time_cd = json_cd_post.time_cd;
								var excluido_cd = json_cd_post.excluido_cd;
								
								if(total_cd_bd == 0){
									
									/* SALVAR DADOS == */
									sql.executeSql("INSERT INTO pedidos_pd_conds (id_cd, cod_cd, tipo_cd, titulo_cd, time_cd, excluido_cd) VALUES('"+id_cd+"', '"+cod_cd+"', '"+tipo_cd+"', '"+titulo_cd+"', '"+time_cd+"', '"+excluido_cd+"')");
									
								} else {
									
									/* ATUALIZAR DADOS == */
									sql.executeSql("UPDATE pedidos_pd_conds SET tipo_cd='"+tipo_cd+"',  titulo_cd='"+titulo_cd+"', excluido_cd='"+excluido_cd+"' WHERE cod_cd='"+cod_cd+"'", []);
									
								}
								
							});
							
						}
						
					} else {
						
						/* EXECUTAR FUN��ES DE ERRO == */
						if(funcao_ep){
							new funcao_ep;
						}
						
						/* DELETAR VARI�VEL == */
						delete json_cd_dw;
						
					}
					
				});
				
			} else {
				
				var tp_api_ep = 'pedidos_pd_conds_ep';
				var time_query_cd = localStorage.getItem('time_query_cd');
				
				$.post('http://api.empredi.com.br/pedidos', {tp_api_ep:tp_api_ep, prot_site_ep:prot_site_ep, time_query_ep:time_query_cd}, function(json){
					
					/* CRIAR VARI�VEL == */
					json_cd_dw = json;
					
					/* CHAMAR NOVAMENTE A FUN��O DE DOWNLOAD == */
					download_pedidos_conds_ep();
					
				}).fail(function(){
									
					/* EXECUTAR FUN��ES DE ERRO == */
					if(funcao_erro_ep){
						new funcao_erro_ep;
					}
					
				});

				
			}
			
		}
		
		/* FUNÇÃO PARA ENVIAR MENSAGENS AO SERVIDOR == */
		function check_enviar_mensagens_mn(){
			
			conect_bd_ep.transaction(function(sql){
				
				sql.executeSql("SELECT * FROM mensagens_mn WHERE sync_mn='0' LIMIT 1", [], function (sql, resultados){
																																			
					var total_mn_bd = resultados.rows.length;
					
					if(total_mn_bd > 0){
						
						for(var i=0;i<total_mn_bd;i++){
					
							/* DADOS DO CLIENTE == */
							var id_mn = resultados.rows.item(i)[['id_mn']];
							var cod_mn = resultados.rows.item(i)[['cod_mn']];
							var prot_site_mn = resultados.rows.item(i)[['prot_site_mn']];
							var prot_cliente_mn = resultados.rows.item(i)[['prot_cliente_mn']];
							var prot_usu_mn = resultados.rows.item(i)[['prot_usu_mn']];
							var titulo_mn = resultados.rows.item(i)[['titulo_mn']];
							var texto_mn = resultados.rows.item(i)[['texto_mn']];
							var time_mn = resultados.rows.item(i)[['time_mn']];
							var time_cm_mn = resultados.rows.item(i)[['time_cm_mn']];
							var time_update_mn = resultados.rows.item(i)[['time_update_mn']];
							var excluido_mn = resultados.rows.item(i)[['excluido_mn']];
							var sync_mn = resultados.rows.item(i)[['sync_mn']];
							
							/* INFORMAÇÕES DO SISTEMA == */
							var lat_long_gps_mn = resultados.rows.item(i)[['lat_long_gps_mn']];
							var sys_opr_gps_mn = resultados.rows.item(i)[['sys_opr_gps_mn']];
							var lat_long_gps_edit_mn = resultados.rows.item(i)[['lat_long_gps_edit_mn']];
							var sys_opr_gps_edit_mn = resultados.rows.item(i)[['sys_opr_gps_edit_mn']];
							
							var json_mn = {cod_mn:cod_mn, prot_site_mn:prot_site_mn, prot_cliente_mn:prot_cliente_mn, prot_usu_mn:prot_usu_mn, titulo_mn:titulo_mn, texto_mn:texto_mn, lat_long_gps_mn:lat_long_gps_mn, sys_opr_gps_mn:sys_opr_gps_mn, lat_long_gps_edit_mn:lat_long_gps_edit_mn, sys_opr_gps_edit_mn:sys_opr_gps_edit_mn, time_mn:time_mn, time_cm_mn:time_cm_mn, time_update_mn:time_update_mn, excluido_mn:excluido_mn, sync_mn:sync_mn};
							
							/* CHECAR COMENTÁRIOS A ENVIAR == */
							check_enviar_cm_mn(sql, json_mn);
						
						}
						
					} else {
					
						/* EXECUTAR FUN��ES DE ERRO == */
						if(funcao_ep){
							new funcao_ep;
						}
						
					}
					
				});
				
			});
			
		}
		
		/* CHECK ENVIAR COMENTÁRIOS == */
		function check_enviar_cm_mn(sql, json_mn){
			
			sql.executeSql("SELECT * FROM mensagens_mn_cm WHERE sync_cm='0'", [], function (sql, resultados){
																																			
				var total_cm_bd = resultados.rows.length;
				var loop_cm_mn = Array();
				
				if(total_cm_bd > 0){
					
					for(var i=0;i<total_cm_bd;i++){
						
						var prot_site_cm = resultados.rows.item(i)[['prot_site_cm']];
						var prot_usu_cm = resultados.rows.item(i)[['prot_usu_cm']];
						var cod_cm = resultados.rows.item(i)[['cod_cm']];
						var cod_mn_cm = resultados.rows.item(i)[['cod_mn_cm']];
						var txt_cm = resultados.rows.item(i)[['txt_cm']];
						var tipo_cm = resultados.rows.item(i)[['tipo_cm']];
						var time_cm = resultados.rows.item(i)[['time_cm']];
						
						var loop_cm_lp = {prot_site_cm:prot_site_cm, prot_usu_cm:prot_usu_cm, cod_cm:cod_cm, cod_mn_cm:cod_mn_cm, txt_cm:txt_cm, tipo_cm:tipo_cm, time_cm:time_cm};
						loop_cm_mn.push(loop_cm_lp);
						
					}
					
				}
				
				/* AJUSTAR JSON DE PEDIDOS == */
				json_mn.total_cm_mn = total_cm_bd;
				json_mn.loop_cm_mn = loop_cm_mn;
				
				/* ENVIAR PEDIDOS == */
				enviar_mensagens_mn(json_mn);
					
			});
			
		}
		
		/* ENVIAR MENSAGENS == */
		function enviar_mensagens_mn(json_mn){
			
			/* COLETAR DADOS == */
			var tp_api_ep = 'salvar_mensagens_mn_ep';
			var json_post_ep = JSON.stringify({json_post_ep:json_mn});
			
			$.post('http://api.empredi.com.br/pedidos', {tp_api_ep:tp_api_ep, prot_site_ep:prot_site_ep, prot_usu_ep:prot_usu_ep, json_post_ep:json_post_ep}, function(json){
								
				/* CONEX�O COM O BANCO DE DADOS == */
				conect_bd_ep.transaction(function(sql){
				
					var json_mn = json;
					var time_query_mn = json_mn.time_query_mn;
					var loop_mn = json_mn.loop_mn;
					var qnt_loop_mn = loop_mn.length;
					
					for(var i=0;i<qnt_loop_mn;i++){
						
						var cod_mn = loop_mn[i].cod_mn;
						var sync_mn = 1;
						
						sql.executeSql("UPDATE mensagens_mn SET ordem_mn=0, sync_mn='"+sync_mn+"' WHERE cod_mn='"+cod_mn+"'");
						sql.executeSql("UPDATE mensagens_mn_cm SET sync_cm='"+sync_mn+"' WHERE cod_mn_cm='"+cod_mn+"'");
						
					}
					
					check_enviar_mensagens_mn();
				
				});
				
			}).fail(function(event){

				/* EXECUTAR FUN��ES DE ERRO == */
				if(funcao_erro_ep){
					new funcao_erro_ep;
				}
				
			});
			
		}
		
		/* PROCESSAR FUN��ES == */
		if(tipo_ep == 'update_usuarios_ep'){
			update_usuarios_ep(json_post_ep);
		} else if(tipo_ep == 'importar_bd_usuarios_json_ep'){
			importar_bd_usuarios_json_ep();
		} else if(tipo_ep == 'download_usuarios_ep'){
			download_usuarios_ep();
		} else if(tipo_ep == 'download_clientes_ep'){
			download_clientes_ep();
		} else if(tipo_ep == 'enviar_clientes_ep'){
			check_enviar_clientes_ep();
		} else if(tipo_ep == 'download_pedidos_pd'){
			download_pedidos_pd();
		} else if(tipo_ep == 'enviar_pedidos_pd'){
			check_enviar_pedidos_pd();
		} else if(tipo_ep == 'download_pedidos_conds_ep'){
			download_pedidos_conds_ep();
		} else if(tipo_ep == 'enviar_mensagens_mn'){
			check_enviar_mensagens_mn();
		} else if(tipo_ep == 'download_produtos_ep'){
			download_produtos_ep();
		}
				
	}
	
}