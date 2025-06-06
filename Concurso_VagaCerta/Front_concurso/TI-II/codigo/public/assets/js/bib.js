async function carregarLivros() {
    try {
        const response = await fetch('http://localhost:3000/livros', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const livros = await response.json();

        const listaLivros = document.getElementById('lista-livros');

        listaLivros.innerHTML = '';

        livros.forEach(livro => {
            const livroElement = document.createElement('div');
            livroElement.classList.add('livro');
            livroElement.innerHTML = `
                <h3>${livro.titulo}</h3>
                <p><strong>Matéria:</strong> ${livro.materia}</p>
                <p><strong>versao:</strong> ${livro.versao}</p>
                <p><strong>Descrição:</strong> ${livro.autor}</p>
                <p><strong>Link:</strong> <a href="${livro.link}" target="_blank">Clique aqui</a></p>
                <div class="botoes">
                    <button class="botao" onclick="excluirLivro(${livro.id})">Excluir</button>
                    <button class="botao" onclick="editarLivro(${livro.id}, '${livro.titulo}', '${livro.materia}', '${livro.versao}', '${livro.autor}')">Editar</button>
                </div>
            `;
            listaLivros.appendChild(livroElement);
        });
    } catch (error) {
        console.error('Erro ao carregar o JSON:', error);
    }
}

async function carregarLivros() {
    try {
        const response = await fetch('http://localhost:3000/livros', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const livros = await response.json();

        const listaLivros = document.getElementById('lista-livros');

        listaLivros.innerHTML = '';

        livros.forEach(livro => {
            const livroElement = document.createElement('div');
            livroElement.classList.add('livro');
            livroElement.innerHTML = `
                <h3>${livro.titulo}</h3>
                <p><strong>Matéria:</strong> ${livro.materia}</p>
                <p><strong>versao:</strong> ${livro.versao}</p>
                <p><strong>Descrição:</strong> ${livro.autor}</p>
                <p><strong>Link:</strong> <a href="${livro.link}" target="_blank">Clique aqui</a></p>
                <div class="botoes">
                    <button class="botao" onclick="excluirLivro(${livro.id})">Excluir</button>
                    <button class="botao" onclick="editarLivro(${livro.id}, '${livro.titulo}', '${livro.materia}', '${livro.versao}', '${livro.autor}')">Editar</button>
                </div>
            `;
            listaLivros.appendChild(livroElement);
        });
    } catch (error) {
        console.error('Erro ao carregar o JSON:', error);
    }
}

async function cadastrarLivro(event) {
    event.preventDefault();
    const id = document.getElementById('livro-id').value;
    const titulo = document.getElementById('titulo-livro').value;
    const materia = document.getElementById('materia-livro').value;
    const versao = document.getElementById('versao-livro').value;
    const autor = document.getElementById('autor-livro').value;
    const link = document.getElementById('link-livro').value;

    let novoId = 1;
    try {
        const response = await fetch('http://localhost:3000/livros', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const livros = await response.json();
        if (livros.length > 0) {
            const maxId = Math.max(...livros.map(livro => parseInt(livro.id)));
            novoId = maxId + 1;
        }
    } catch (error) {
        console.error('Erro ao buscar o maior ID:', error);
    }

    const novoLivro = {
        id: id ? parseInt(id) : novoId,
        titulo: titulo,
        materia: materia,
        versao: versao,
        autor: autor,
        link: link
    };

    let method = 'POST';
    let url = 'http://localhost:3000/livros';
    if (id) {
        method = 'PUT';
        url += `/${id}`;
    }

    try {
        await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoLivro)
        });
        carregarLivros();
    } catch (error) {
        console.error('Erro ao salvar o livro:', error);
    }

    document.getElementById('livro-id').value = '';
    document.getElementById('titulo-livro').value = '';
    document.getElementById('materia-livro').value = '';
    document.getElementById('versao-livro').value = '';
    document.getElementById('autor-livro').value = '';
    document.getElementById('link-livro').value = '';
}

async function excluirLivro(id) {
    try {
        await fetch(`http://localhost:3000/livros/${id}`, {
            method: 'DELETE'
        });
        carregarLivros();
    } catch (error) {
        console.error('Erro ao excluir o livro:', error);
    }
}

function editarLivro(id, titulo, materia, versao, autor, link) {
    document.getElementById('livro-id').value = id;
    document.getElementById('titulo-livro').value = titulo;
    document.getElementById('materia-livro').value = materia;
    document.getElementById('versao-livro').value = versao;
    document.getElementById('autor-livro').value = autor;
    document.getElementById('link-livro').value = link;
}

window.onload = carregarLivros;

async function excluirLivro(id) {
    try {
        await fetch(`http://localhost:3000/livros/${id}`, {
            method: 'DELETE'
        });
        carregarLivros();
    } catch (error) {
        console.error('Erro ao excluir o livro:', error);
    }
}

function editarLivro(id, titulo, materia, versao, autor) {
    document.getElementById('livro-id').value = id;
    document.getElementById('titulo-livro').value = titulo;
    document.getElementById('materia-livro').value = materia;
    document.getElementById('versao-livro').value = versao;
    document.getElementById('autor-livro').value = autor;
}

window.onload = carregarLivros;


