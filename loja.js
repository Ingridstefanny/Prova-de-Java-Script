// ===== 1. DADOS =====
// nomeLoja e o array produtos (Tarefa 1)
const nomeLoja = "Açaí da Xuru";
const produtos = [
    { nome: "Açaí Tradicional com Mousse de Morango", categoria: "Açaí com Mousse", preco: 15, quantidade: 50, vendidos: 13 },

    { nome: "Açaí Tradicional com Mousse de Maracujá", categoria: "Açaí com Mousse", preco: 15, quantidade: 50, vendidos: 7 },

    { nome: "Açaí Tradicional com Mousse de Limão", categoria: "Açaí com Mousse", preco: 15, quantidade: 50, vendidos: 10 },

    { nome: "Açaí Tradicional com Leite em Pó e Granulado", categoria: "Açaí com adicionais", preco: 15, quantidade: 60, vendidos: 20 },

    { nome: "Açaí com Leite Condensado e chocolate", categoria: "Açaí com adicionais", preco: 15, quantidade: 60, vendidos: 10 },

    { nome: "Açaí Tradicional com paçoca e castanha de cajú", categoria: "Açaí com adicionais", preco: 15, quantidade: 60, vendidos: 11 },

    { nome: "Açaí Tradicional com Calda de Chocolate e banana", categoria: "Açaí com frutas", preco: 16, quantidade: 65, vendidos: 29 },

    { nome: "Açaí Tradicional com Calda de Morango e Morango", categoria: "Açaí com frutas", preco: 15, quantidade: 65, vendidos: 31 },

    { nome: "Açaí Tradicional", categoria: "Açaí sem adicionais", preco: 13, quantidade: 70, vendidos: 30 }
];

    
// ===== 2. FUNÇÕES =====
// todas as funções das Tarefas 2 a 11
// listar, cadastrar, buscar, calcular, aplicar desconto, registrar vendas e gerar um relatório.

function listarProdutos(lista)
{
    for(let i = 0; i < lista.length; i++){
        console.log(`${i+1}. ${lista[i].nome} | ${lista[i].categoria} | R$ ${lista[i].preco} | ${lista[i].quantidade} un. | ${lista[i].vendidos} vendidos`);
    }
}

function cadastrarProduto(lista, nome, categoria, preco, quantidade){
    const novoProduto = {
        nome: formatarNome(nome),
        categoria: categoria,
        preco: preco,
        quantidade: quantidade,
        vendidos: 0
    }
    lista.push(novoProduto);
    return lista.length;
}

function calcularValorEstoque (lista){
    let acc = 0;
    let total;
    for(let i = 0; i < lista.length; i++){
        total = lista[i].preco * lista[i].quantidade + acc;
        acc = total;
    }
    return total;
}

function buscarProduto(lista, termo) {

    for (let i = 0; i < lista.length; i++) {

        if (lista[i].nome.toLowerCase().includes(termo.toLowerCase())) {
            return lista[i];
        }

    }

    return null;
}

function produtosEmFalta(lista, minimo) {
    const produtosFaltando = [];

    for (let i = 0; i < lista.length; i++) {

        if (lista[i].quantidade < minimo) {
            produtosFaltando.push(lista[i]);
        }
    }

    return produtosFaltando;
}

function aplicarDesconto(lista, categoria, percentual){
    let acc = 0;
    for(let i = 0; i < lista.length; i++){
        if(lista[i].categoria === categoria){
            lista[i].preco = lista[i].preco -(lista[i].preco * percentual / 100);

            acc++;
        }
    }

    return acc;
}

function registrarVenda(lista, nome, quantidade){
    const buscando = buscarProduto(lista, nome);
    if (buscando === null || buscando.quantidade < quantidade) {
        return false;
    }

    buscando.quantidade -= quantidade;
    buscando.vendidos += quantidade;

    return true;
}

function formatarNome(texto){
   
    texto = texto.trim();

    let primeira = texto.charAt(0).toUpperCase();
    let restante = texto.slice(1).toLowerCase();

    return primeira + restante;
}

function converterParaJSON(lista) {
    return JSON.stringify(lista);
}

function lerJSON(texto) {
    return JSON.parse(texto);
}

function gerarRelatorio(nome, lista) {

    console.log(`===== RELATÓRIO: ${nome.toUpperCase()} =====`);

    console.log(`Produtos cadastrados: ${lista.length}`);

    console.log(`Valor total em estoque: R$ ${calcularValorEstoque(lista)}`);

    const faltando = produtosEmFalta(lista, 5);

    console.log(`Produtos com estoque baixo: ${faltando.length}`);

    for (let i = 0; i < faltando.length; i++) {
        console.log(`- ${faltando[i].nome} (${faltando[i].quantidade} un.)`);
    }
}


// ===== 3. PROGRAMA PRINCIPAL =====
// os testes: chamadas das funções e console.log
console.log("\n--- Tarefa 2: Listar os produto ---\n");
listarProdutos(produtos);

console.log("\n--- Tarefa 3: Cadastrar um produto ---\n");
const cadastrando = cadastrarProduto(produtos, "Açaí com Calda de Chocolate e Kiwii", "Açaí com frutas", 62, 0);

console.log(`Produto cadastrado! Agora a loja tem ${cadastrando} produtos`);

console.log("\n--- Tarefa 4: Valor do estoque ---\n");
const Valor = calcularValorEstoque(produtos);
console.log(`Valor do estoque: R$ ${Valor}`);

console.log("\n--- Tarefa 5: Buscar um produto ---\n");

const busca = buscarProduto(produtos, "MORANGO");

if (busca !== null) {
    console.log(`Encontrado: ${busca.nome} - R$ ${busca.preco}`);
} else {
    console.log("Produto não encontrado.");
}

const busca2 = buscarProduto(produtos, "Açaí Cremoso");

if (busca2 !== null) {
    console.log(`Encontrado: ${busca2.nome} - R$ ${busca2.preco}`);
} else {
    console.log("Produto não encontrado.");
}

console.log("\n--- Tarefa 6: Produtos em falta ---\n");
const faltando = produtosEmFalta(produtos, 60);
console.log(`Produtos com menos de 60 unidades: ${faltando.length}`);


console.log("\n--- Tarefa 7: Aplicar desconto ---\n");
const aplicando = aplicarDesconto(produtos, "Açaí com Mousse", 20);

const produto = buscarProduto(produtos, "Açaí Tradicional com Mousse de Morango");

console.log(`${aplicando} produtos receberam desconto.`);

if (produto !== null) {
    console.log(`Novo preço: R$ ${produto.preco}`);
}

console.log("\n--- Tarefa 8: Registrar uma venda ---\n");
const registrado = registrarVenda(
    produtos,
    "Açaí Tradicional com Leite em Pó e Granulado",
    31
);

if (registrado === true) {

    const vendido = buscarProduto(
        produtos,
        "Açaí Tradicional com Leite em Pó e Granulado"
    );

    console.log(`Venda realizada! ${vendido.nome}: ${vendido.quantidade} un. em estoque, ${vendido.vendidos} vendidos.`);

} else {
    console.log("Venda não realizada: estoque insuficiente ou produto inexistente.");
}

console.log("\n--- Tarefa 9:Formatar nome ---\n");
const formatacao = formatarNome("    aÇAÍ tradicional    ");
console.log(`${formatacao}`);

console.log("\n--- Tarefa 10: Salvar e recuperar em JSON ---\n");
const dadosJSON = converterParaJSON(produtos);

console.log(typeof dadosJSON);

const recuperados = lerJSON(dadosJSON);

console.log(`Itens recuperados: ${recuperados.length} | Primeiro: ${recuperados[0].nome}`);

console.log("\n--- Tarefa 11: Relatório final ---\n");
gerarRelatorio(nomeLoja, produtos);