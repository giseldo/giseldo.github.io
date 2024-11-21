---
title: 'Groq vs Grok'
date: '2024-11-21'
draft: false
tags: ["Large Language Models"]
---

Groq e Grok são duas coisas distintas, desenvolvidas por empresas diferentes, com características e finalidades específicas:

Geralmente quando nos referimos ao [Groq](https://groq.com/) (com Q), estamos nos referindo a uma fornecedora de infraestrutura para inferência em modelos de LLM diversos. 
Esta empresa vende um serviço de inferência mais rápida do que seus concorrentes para modelos disponíveis abertamente, como Llama 3.1 da Meta, o Gemma do Google, ou o Mixtral
Já [Grok](https://x.ai/) é comumente utilizado em referência ao chatbot da empresa X (twitter). 

É muito comum que a desenvolvedora de um modelo de LLM, forneca uma interface para o usuário conversar com o seu modelo em forma de um chatbot,  
e também fornecer uma API, ou playground, para quem deseja integrar a solução em suas aplicações. 
Assim é o [ChatGPT](https://chatgpt.com/), da empresa OpenAI. A empresa cobra 100 R$ para disponibilizar para os assinatnes acesso completo aos recursos do seu chatbot, inclusive o recurso de SearchGPT, uma busca na web com o ChatGPT. Já para  para a API/playground da OpenAI a modalidade de cobrança é pague-pelo-uso. Veja na **Figura 1** uma imagem do chatbot da OpenAI e na **Figura 2** o playground da OpenAI. 

{{< columns >}}
**Figura 1** - Chatbot da OpenAI
![ChatGPT chatbot interface](https://github.com/user-attachments/assets/d5f1caa9-ad37-4891-9a66-8121f6b54dce)
Fonte: o autor
{{< column >}}
**Figura 2** - PlayGround OpenAI
![PlayGround OpenAI](https://github.com/user-attachments/assets/46bf1931-62b5-4c51-a3b5-e9e1e246fd08)
Fonte: o Autor
{{< endcolumns >}}

o Groq  usa  uma versão do LLama da Meta em seu [Chatbot Groq](https://groq.com/#), porém sua estrutura é mais focada na [API/playground Groq](https://console.groq.com/playground) que funciona no formato pague-pelo-uso. o Chatbot Groq também consome os mesmos créditos pague-pelo-uso, não tendo uma assinatura aparte, como no caso do chatbot do ChatGPT. Veja na **Figura 3** o chatbot do Groq e na **Figura 4** o Playground do Groq. Note que no chatbot do Groq não exite o recurso de histórico como no ChatGPT.

{{< columns >}}
**Figura 3** - Chatbot do Groq
![image](https://github.com/user-attachments/assets/3c6efe44-9598-4353-a81c-1b5602c0a243)
Fonte: o Autor
{{< column >}}
**Figura 4** - Playground do Groq
![image](https://github.com/user-attachments/assets/d3729b18-02b6-46b2-a7a2-46a5db54c1c7)
Fonte: o Autor
{{< endcolumns >}}

O Grok (com K) chatbot está disponível para quem tem o acesso premium do twitter, enquanto que a [API Grok](https://console.x.ai/)) pode ser acessada na forma pague-pelo-uso, inclusive o Grok está oferecendo este ano 25 R$ para quem deseja testar o serviço, ou seja, é possível utilizar a API do Grok sem desembolsar nada neste momento. Porém o Grok não tem um playGround avançado, logo,  para usar a API do Grok é necessário utilizar uma ferramenta ou código externo, por exemplo: LLM Studio (https://lmstudio.ai/), JAM, ou GPT4ALL. Veja na **Figura 5** o chatbot do Grok  na **Figura 6** o Playground do Grok.

{{< columns >}}
**Figura 5** - Chatbot do Grok 
![image](https://github.com/user-attachments/assets/72a03f4b-5870-42f3-89d8-b7fd122c31ab)
Fonte: [tweetdelete](https://tweetdelete.net/pt/recursos/grok-ai-xs-latest-artificial-intelligence-chatbot/)
{{< column >}}
**Figura 6** - Playground do Grok 
![image](https://github.com/user-attachments/assets/306afcae-d203-4a87-ab11-8f03ce87df56)
Fonte: o Autor
{{< endcolumns >}}

## Resumo

**Groq**:
- **Desenvolvedora**: Groq Inc., fundada em 2016.
- **Características**: Destaca-se pela velocidade na geração de respostas factuais e citadas, produzindo centenas de palavras em menos de um segundo. Utiliza um chip ASIC personalizado, denominado Unidade de Processamento de Linguagem (LPU), que dispensa o uso de GPUs tradicionais, permitindo a geração de aproximadamente 500 tokens por segundo. 
- **Aplicações**: Projetado para executar modelos de linguagem de grande porte (LLMs) e outras aplicações de IA generativa com alta eficiência e baixa latência.

**Grok**:
- **Desenvolvedora**: xAI, empresa de inteligência artificial fundada por Elon Musk.
- **Características**: Descrito como um chatbot "bem-humorado", com senso de humor sarcástico e politicamente incorreto, inspirado na série de livros "Guia do Mochileiro das Galáxias". Integra-se diretamente à plataforma X (antigo Twitter), oferecendo respostas atualizadas em tempo real e contextualizadas com os trending topics e posts em alta na rede social. 
- **Aplicações**: Voltado para interações informais e engajamento de usuários na plataforma X, fornecendo respostas rápidas e contextualizadas com o conteúdo da rede social.

**Principais diferenças**:
- **Desenvolvedora**: Groq é da Groq Inc.; Grok é da xAI, de Elon Musk.
- **Foco**: Groq prioriza velocidade e eficiência em aplicações de IA generativa; Grok enfatiza interações informais com humor, integrando-se ao X.
- **Tecnologia**: Groq utiliza um chip ASIC personalizado (LPU) para processamento rápido; Grok baseia-se em modelos de linguagem com acesso em tempo real ao conteúdo do X.

Apesar das semelhanças nos nomes, Groq e Grok são soluções de IA com propósitos e funcionalidades distintas, atendendo a diferentes necessidades no campo da inteligência artificial. 

Deixe um comentário e até o próximo post.

Referências
-  https://groq.com/
-  https://x.ai/
-  https://getstream.io/blog/best-local-llm-tools/
