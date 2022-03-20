server
  service = tudo que é regra de negócio ou processamento
  controller = intermediar a camada de apresentação e a camada de negócio
  routes = camada de apresentação
  server = responsável por criar os servidor (mas não instância)
  index = instância o servidor e expõe para a web (lado da infraestrutura)
  config = tudo que for estático do projeto

client
  service = tudo que é regra de negocio ou processamento
  controller = é o intermedio entre a view e o service
  view = tudo que é elemento HTML (visualização)
  index = Factory  = quem inicializa tudo
