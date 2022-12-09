# geo-service

# setup init:
 node: v16.18.1
 npm: 8.19.2
 	
# install dependencies:
npm install -g nodemon
npm install

# started application:
npm run dev

# file environment:
.env

# WARNING: 
  
 * Os valores dos endereços são separados por ; entre eles ex: (http://localhost:5000/geocoding?address=A;B;C) 
 * ao utilizar o serviço de geocoding(geoapify) não sei o quanto esse serviço é preciso, mas foi o que eu consegui estudar de uma maneira rápida e fazer as chamdas para obter os retornos, porém ele acaba retorando mais do que um results[] na consulta de acordo com o endereço enviado. Não sei se em outros serviços acontece o mesmo, mas uma solução paliativa foi sempre pegar as coordenadas(latitude e longitude) da primeira posição do array[0](nem sempre pegando a latitute e longitute da primeira posição, batia com o endereço fazendo a pesquisas diretamente la no google maps.) e utilizo-os para realizar o calculo entre os endereços, podendo haver uma divergência entre os valores.

 * está sem os testes unitários no momento, pois não consegui concluí-los. 
 * par de endereços mais próximos e par de endereços mais distantes, não obtive o entendimento dessa regra.


 A api construida é capaz de: 

 - retorna um objeto contendo uma lista de objetos dos endereços, juntamente com sua latitude e longitute apos pesquisar na api de terceiros(geocoding)
 - retona também no mesmo objeto, uma lista entre as distâncias dos endereços enviados na requisição ex: (A+B ; A+C e B+C) 

