Title: Redes Neurais - Primeiro Contato
Date: 2024-10-21
Category: Blog
Tags: Redes Neurais, Aprendizagem de Máquina
Authors: Giseldo Neo
Summary: Um primeiro contato com redes neurais

As redes neurais são utilizadas em diversas aplicações. De forma resumida elas são inspiradas no funcionamento do cérebro humano, compostas por diversos nós interconectados e organizados em camadas. Elas funcionam como um meio de aprendizado a partir da análise de exemplos de treinamento, permitindo a realização de tarefas complexas. Sendo Redes Neurais uma sub-área da aprendizagem de máquina, grande parte dos conceitos de aprendizagem de máquina são utilizados na preparação de uma rede neural (veja na Figura 1).

![Alt Text]({static}/images/ia.png)
Figura 1 - Sub-áreas da Inteligência Artificial


# Previsão

Realizar uma previsão, no contexto da inteligência artificial, significa utilizar um modelo ou um conjunto de dados existentes para estimar ou inferir um valor futuro ou desconhecido. A previsão é baseada em padrões identificados em dados passados ou exemplos conhecidos, e o objetivo é fornecer uma estimativa ou decisão sobre novos dados ou eventos futuros.

Por exemplo, ao treinar um modelo preditivo com imagens de gatos e cachorros, o modelo pode, posteriormente, prever se uma nova imagem contém um gato ou um cachorro, mesmo sem ter visto essa imagem específica antes. Outro exemplo seria em previsão de demanda, onde um modelo pode prever quantos produtos serão vendidos em uma loja com base em dados históricos de vendas. Veja na Figura 2 e Figura 3 a imagem de um gato e um cahorro, com um modelo preditivo podemos advinhar se a foto contem um gato ou um cachorro, nesse caso é bem simples, mas existem fotos mais difícieis de identificar.

<img src="{static}/images/blog/cat.jpg" width=20% align="center"></br>
Figura 2 - Um gato</br>
Fonte: Imagem de <a href="https://pixabay.com/pt/users/ty_swartz-617282/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=551554">Ty Swartz</a> por <a href="https://pixabay.com/pt//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=551554">Pixabay</a>

<img src="{static}/images/blog/dog.jpg" width=20% align="center"></br>
Figura 3 - Um cachorro</br>
Fonte: Imagem de <a href="https://pixabay.com/pt/users/vlaaitje-1637107/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1047521">Ilona Krijgsman</a> por <a href="https://pixabay.com/pt//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1047521">Pixabay</a>

A precisão da previsão depende da qualidade dos dados, do modelo utilizado e de quão bem o modelo foi treinado e ajustado.

# Rede Neural

Os dados fornecidos a uma rede neural variam de acordo com o caso de uso. Em um sistema de reconhecimento de objetos, por exemplo, a rede pode ser alimentada com milhares de imagens rotuladas de carros, casas e outros objetos. 

Muitas das redes neurais seguem um padrão conhecido como feed-forward, em que os dados são sempre processados na mesma direção, sem retornos aos nós anteriores. Cada nó na rede recebe entradas, que são multiplicadas por pesos específicos e ajustadas por um valor adicional chamado "bias", que pode ser ajustado durante o treinamento. O resultado desse cálculo é submetido a uma função de ativação, como a ReLU, que introduz não-linearidade ao modelo, permitindo uma maior flexibilidade na tomada de decisões.

Durante o treinamento, os pesos e as biases são inicialmente configurados com valores aleatórios e, com base nos resultados das saídas, esses parâmetros são ajustados para melhorar o desempenho da rede. Esse processo continua até que a rede alcance uma perda (erro) suficientemente baixa, garantindo consistência nos resultados. A perda é uma métrica que quantifica o quão distante a saída da rede está do resultado correto.

# Linha do tempo

Á seguir uma linha do tempo resumida destancando os principais avanços em redes neurais.

* 1943 - Modelo de Neurônio Artificial (McCulloch e Pitts): Warren McCulloch e Walter Pitts propuseram o primeiro modelo matemático de um neurônio, baseando-se no funcionamento dos neurônios biológicos.

* 1958 - Perceptron (Frank Rosenblatt): Frank Rosenblatt desenvolveu o perceptron, uma das primeiras redes neurais artificiais. Esse modelo é capaz de aprender pesos a partir de dados de entrada e foi visto como um avanço na época.

* 1969 - Crítica ao Perceptron (Minsky e Papert): Marvin Minsky e Seymour Papert publicaram o livro Perceptrons, que destacava as limitações do perceptron, especialmente a incapacidade de resolver problemas linearmente inseparáveis. Isso resultou em um declínio no interesse pelas redes neurais por alguns anos.

* 1986 - Backpropagation e Renascimento das Redes Neurais: A redescoberta do algoritmo de backpropagation por Geoffrey Hinton, David Rumelhart e Ronald Williams marcou um novo renascimento no campo das redes neurais. Esse algoritmo permitiu a atualização eficiente dos pesos em redes de múltiplas camadas (deep learning), resolvendo limitações anteriores.

* 1990s - Redes Neurais Convolucionais (Yann LeCun): Yann LeCun introduziu as redes neurais convolucionais (CNNs), que mostraram grande eficácia em tarefas de reconhecimento de padrões, especialmente em imagens.

* 1997 - LSTMs (Hochreiter e Schmidhuber): Sepp Hochreiter e Jürgen Schmidhuber desenvolveram as Long Short-Term Memory (LSTM), um tipo de rede neural recorrente que consegue lidar melhor com dados sequenciais e dependências de longo prazo, superando limitações das redes recorrentes tradicionais.

* 2006 - Aprendizado Profundo (Deep Learning): Geoffrey Hinton e colaboradores publicaram trabalhos que mostravam como redes neurais profundas poderiam ser treinadas de forma eficaz usando novas técnicas, o que marcou a ascensão do deep learning.

* 2012 - AlexNet e Revolução no Reconhecimento de Imagens: A rede AlexNet, desenvolvida por Alex Krizhevsky e Geoffrey Hinton, venceu a competição ImageNet, demonstrando o poder do deep learning em reconhecimento de imagens e levando a um aumento no interesse e na aplicação comercial das redes neurais profundas.

* 2014 - Redes Gerativas Adversárias (GANs): Ian Goodfellow e colegas introduziram as redes gerativas adversárias (GANs), uma inovação que permitiu a criação de modelos gerativos poderosos, usados para gerar imagens, vídeos e outros tipos de dados.

* 2020 - Transformers e Aprendizado de Linguagem: O modelo Transformer, introduzido em 2017 por Vaswani e outros, revolucionou o processamento de linguagem natural, culminando no desenvolvimento de modelos como o GPT, BERT, entre outros, que são amplamente utilizados para tarefas de geração e compreensão de texto.

