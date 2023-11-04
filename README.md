## Informações do projeto

Trabalho Prático: Etapa 1 - Teste de Software

Integrantes : Gabriel Cerqueira,Giovanni Gontijo,Rafael Nascimento




Sistema de Gerenciamento de Mailings



Visão Geral:
O Sistema de Gerenciamento de Mailings é uma plataforma projetada para coletar e administrar possíveis clientes de qualquer empreendimento digital. Além disso, integra um sistema de autenticação com gestão de tokens JWT para controlar o acesso dos usuários à plataforma de mailings. As mailings são caracterizadas por campos como nome, e-mail, telefone, verificação de e-mail, perfil no Instagram, status, ativo e identificador único (_id). O sistema também disponibiliza vários serviços para recuperar as mailings armazenadas e gerenciar os usuários. Os usuários são definidos por atributos como nome, e-mail, senha e identificador ativo (_id).



Funcionalidades Principais:
Recolhimento de Clientes:
O sistema permite a coleta de informações de possíveis clientes provenientes de qualquer empreendimento digital. As informações coletadas incluem:
Nome (name)
Endereço de E-mail (email)
Número de Telefone (phone)
Verificação de E-mail (emailVerified)
Perfil no Instagram (instagram)
Status (status)
Ativo (active)
Identificador Único (ID - _id)
Sistema de Autenticação:
O sistema possui um mecanismo de autenticação que permite aos usuários autenticarem-se para acessar as funcionalidades da plataforma.
Gerenciamento de Tokens JWT:
Para garantir a segurança e o controle de acesso, o sistema utiliza tokens JWT (JSON Web Tokens) para autenticar e autorizar os usuários na plataforma.
Gerenciamento de Mailings:
Os usuários podem realizar diversas operações relacionadas às mailings, incluindo:
Adicionar novas mailings
Visualizar todas as mailings armazenadas
Buscar mailings por ID
Atualizar informações de mailings
Remover mailings
Controle de Status das Mailings:
Cada mailing possui um status que indica seu estado atual, proporcionando uma visão rápida sobre o progresso ou a situação de cada contato.
Gerenciamento de Usuários:
O sistema permite criar e administrar usuários com os seguintes dados:
Nome (name)
Endereço de E-mail (email)
Senha (password)
Identificador Ativo (active_id)





Tecnologias: 

NestJS é um framework para construção de aplicativos back-end escaláveis e eficientes em Node.js. Ele utiliza as melhores práticas de arquitetura e design de software para oferecer uma estrutura sólida e organizada para o desenvolvimento de aplicações server-side. O NestJS combina as características do Node.js com conceitos de programação orientada a objetos, injeção de dependências e padrões de design bem estabelecidos, proporcionando uma experiência de desenvolvimento robusta e produtiva.
Principais Características do NestJS:
Arquitetura Modular: O NestJS promove a criação de aplicações bem estruturadas, divididas em módulos, controladores e serviços, facilitando a escalabilidade e manutenção.
Injeção de Dependências: Utiliza um sistema de injeção de dependências para gerenciar e organizar as dependências entre os diferentes componentes da aplicação.
Suporte TypeScript: O NestJS é escrito em TypeScript, o que oferece um sistema de tipos forte e facilita a detecção de erros em tempo de desenvolvimento.
Middleware e Filtros: Permite a implementação de middleware e filtros para manipular solicitações HTTP, validações e processamentos antes de chegar aos controladores.
Documentação Automática: Oferece uma ferramenta integrada para gerar documentação automática da API com base nos decorators usados nos controladores.




Link do repositório:
https://github.com/gabcerqueira/tp1-testes-de-software

Ultima Build CI/CD:
https://github.com/gabcerqueira/tp1-testes-de-software/actions/runs/6751921204/job/18356671292


<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).


