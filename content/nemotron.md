Title: Modelo LLM Nemotron: Um primeiro contato
Date: 2024-10-22
Category: Blog
Tags: Redes Neurais, Aprendizagem de Máquina, Chatbots, LLM
Authors: Giseldo Neo
Summary: Um primeiro contato com o LLM Nemotron

Em julho de 2024, a Meta lançou o _Llama-3.1-70B_, um modelo de linguagem (LLM) open-source. Já em setembro a NVIDEA lançou o _Llama 3.1-Nemotron-51B-Instruct_ derivado do modelo da referência da Meta. Em seguida a NVIDIA lançou um modelo Llama 3.1 70b aprimorado chamado _Llama 3.1 nemotron-70b-instruct_.

O _nemotron-70b_ performou melhor em alguns testes comparativos com o GPT-4o. Nos testes ele liderou em desempenho geral e também se destacou nas categorias chat (_chat score_) e raciocínio (_reasoning score_).

Model	| Overall Score | Chat Score | Reasoning Score |
--------|---------------|------------|-----------------|
Llama 3.1 Nemotron-70B	| 94.1 | 97.5 |	98.1 |
Skywork-Reward-Gemma-2-27B | 93.8 |	95.8 | 96.1 |
TextEval-Llama3.1-70B | 93.5 | 94.1 |	96.4 |
GPT-4o	| 86.7 | 96.1 | 86.6 |

[Fonte: Bind AI](https://build.nvidia.com/nvidia/llama-3_1-nemotron-70b-instruct?snippet_tab=Node)


O Modelo pode ser testado em [build.nvidia.com](https://build.nvidia.com), especificamente [neste link](https://build.nvidia.com/nvidia/llama-3_1-nemotron-70b-instruct?snippet_tab=Node). A inscrição concede acesso a 100.000 chamadas de API gratuitas. Além disso ele está disponível para baixar no Hugging Face, mas haja poder de processamento para uma consulta a este modelo em uma PC de mesa.

Realizei algumas consultas no site da NVIDEAe a velocidade da resposta deixou muito a desejar em relação a quantidade de tokens por minuto. 

Um versão do Groq, que usa uma versão também customizada do Llama 3.1 70B, o _o_llama3-groq-70b-8192-tool-use-preview_, é muito mais veloz do que a disponibilizada no site da NVIDEA. Provavelmente o hardware da GROQ é bem mais poderoso. Porém, isto deve estar mais relacionado ao hardware do que ao modelo.

A arquitetura _transformer_ foi utilizada e é já uma velha conhecida. Ela permite que o modelo capture dependências de longo alcance no texto, tornando-o apto a compreender o contexto e a gerar respostas.

Outro recurso utilizado é o _Attention Multi-Head_ que permite que o modelo se concentre em diferentes partes da entrada simultaneamente, aprimorando sua capacidade de compreender consultas complexas e produzir resultados diferenciados.

Por fim, foi implementado no modelo, a _normalização de camadas_. Ela ajuda a estabilizar o treinamento e a melhorar as taxas de convergência, resultando em um aprendizado mais rápido e eficiente.

o modelo foi treinado em uma ampla gama de dados licenciados com a licença (CC-BY-4.0), que inclui livros, artigos e conteúdo da web. Ressaltando que o BY da licença exige que o crédito seja dado ao autor.

De acordo com a NVIDIA, o processo de treinamento do Llama 3.1 Nemotron-70B incluiu: 

* aprendizagem supervisionada 
* aprendizagem por reforço de feedback humano. 
* Modelagem de recompensa: usando técnicas de regressão de Bradley Terry e SteerLM, o modelo prevê a qualidade da resposta com base nas interações do usuário. Este mecanismo permite ajustar seus resultados de forma dinâmica, melhorando ao longo do tempo com base no feedback do mundo real.

Em relação a código a consulta ao modelo em python utiliza a mesma API do LLM da OpenAI (conforme pode ser visto no código abaixo). 

```Python
from openai import OpenAI

client = OpenAI(
  base_url = "https://integrate.api.nvidia.com/v1",
  api_key = ""
)

completion = client.chat.completions.create(
  model="nvidia/llama-3.1-nemotron-70b-instruct",
  messages=[{"role":"user","content":"What is machine learning?"}],
  temperature=0.5,
  top_p=1,
  max_tokens=1024,
  stream=True
)

for chunk in completion:
  if chunk.choices[0].delta.content is not None:
    print(chunk.choices[0].delta.content, end="")
```

Fontes consultadas:

[Bind AI Blog Pos](https://blog.getbind.co/2024/10/17/llama-3-1-nemotron-70b-is-it-better-for-coding-compared-to-gpt-4o-and-claude-3-5-sonnet/)

[CC-BY](https://creativecommons.org/share-your-work/cclicenses/)

[GROQ](https://console.groq.com/)

[NVIDEA Blog Post](https://developer.nvidia.com/blog/advancing-the-accuracy-efficiency-frontier-with-llama-3-1-nemotron-51b)