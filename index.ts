const fs = require('fs')

const lerArquivo = (): unknown => {
    return JSON.parse(fs.readFileSync('./bd.json'));
}

const escreverArquivo = (dados: any): void => {
    fs.writeFileSync('./bd.json', JSON.stringify(dados));
}

type Endereco = {
    cep: string,
    rua: string,
    complemento?: string,
    bairro: string,
    cidade: string

}

type Usuario = {
    nome: string,
    email: string,
    cpf: string,
    profissao?: string,
    endereco: Endereco | null
}

const cadastrarUsuario = (dados: Usuario): Usuario => {
    const bd = lerArquivo() as Usuario[];
    bd.push(dados);
    escreverArquivo(bd);
    return dados;
}

const listarUsuarios = (filtro?: string): Usuario[] => {
    const bd = lerArquivo() as Usuario[];

    const usuarios = bd.filter(usuario => {
        if (filtro) {
            return usuario.profissao === filtro;
        }

        return usuario;
    });

    return usuarios;
}

const detalharUsuario = (cpf: string): Usuario => {
    const bd = lerArquivo() as Usuario[];
    const usuario = bd.find(usuario => {
        return usuario.cpf === cpf;
    });

    if (!usuario) {
        throw new Error('Usuario não encontrado');
    }

    return usuario;
}

const atualizarUsuario = (cpf: string, dados: Usuario) => {
    const bd = lerArquivo() as Usuario[];
    const usuario = bd.find(usuario => {
        return usuario.cpf === cpf;
    });

    if (!usuario) {
        throw new Error('Usuario não encontrado');
    }

    Object.assign(usuario, dados);

    escreverArquivo(bd);

    return dados;
}

const excluirUsuario = (cpf: string): Usuario => {
    const bd = lerArquivo() as Usuario[];
    const usuario = bd.find(usuario => {
        return usuario.cpf === cpf;
    });

    if (!usuario) {
        throw new Error('Usuario não encontrado');
    }

    const exclusao = bd.filter(usuario => {
        return usuario.cpf !== cpf;
    });

    escreverArquivo(exclusao);

    return usuario;
}


// const gabriel = cadastrarUsuario({
//     nome: 'Gabriel',
//     email: 'gabriel@Email.com',
//     cpf: '12345678900',
//     endereco: {
//         cep: '12345-678',
//         rua: 'Rua dos Bobos',
//         bairro: 'Centro',
//         cidade: 'Salvador'
//     }
// });

// const sergio = cadastrarUsuario({
//     nome: 'Sergio',
//     email: 'sergio@Email.com',
//     cpf: '12345678902',
//     profissao: 'Fisioterapeuta',
//     endereco: {
//         cep: '12345-678',
//         rua: 'Rua dos Bobos',
//         bairro: 'Centro',
//         cidade: 'Salvador'
//     }
// });

// const sergio = detalharUsuario('12345678900');

// atualizarUsuario('12345678902', {
//     nome: 'Sergio',
//     email: 'sergio@Email.com',
//     cpf: '12345678902',
//     profissao: 'backend',
//     endereco: {
//         cep: '12345-678',
//         rua: 'Rua dos Bobos',
//         bairro: 'Centro',
//         cidade: 'Salvador'
//     }
// });



const bd = listarUsuarios('Fisioterapeuta');
console.log(bd);