// CEP Paulista: 01310-100

// ARROW FUNCTIONS CONST DECLARATIONS

const loadMap = (e) => {
    let search = cep.value.replace('-', '')

    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }

    fetch(`https://viacep.com.br/ws/${search}/json/`, options)
        .then(response => {
            response.json()
                .then(data => showData(data))
        })
        .catch(e => invalid())
}

const reset = () => {
    cep.value = ''
    cep.readOnly = false;
    cep.focus()
    btnSearch.classList.remove('disabled')
    locationDatas.classList.add('d-none')
    btnResearch.classList.add('d-none')
    contentaMapa.innerHTML = ''
}

const errorMessage = () => {
    if (cep.value === '') {
        emptyFleld.classList.remove('d-none')
        emptyFleld.innerHTML = 'CEP inválido'
        cep.value = ''
        cep.focus()
    }
}

const invalid = () => {
    emptyFleld.classList.remove('d-none')
    emptyFleld.innerHTML = 'CEP inválido'
    cep.value = ''
    cep.focus()
}

const showData = (result) => {
    for (const field in result) {
        if (document.querySelector('#' + field)) {
            document.querySelector('#' + field).value = result[field]
        }
    }

    (mapa = () => {
        const logradouro = result.logradouro

        btnSearch.classList.add('disabled')
        cep.setAttribute('readonly', true)
        emptyFleld.classList.add('d-none')
        locationDatas.classList.remove('d-none')
        btnResearch.classList.remove('d-none')
        contentaMapa.innerHTML = ` <iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAvxhlLOjoWKUzoDdnO9H6JRO7quBjW3no&q=${logradouro},Brasil" frameborder="0"></iframe> `
    })()
}

// CONST AND LISTENERS DECLARATIONS

const cep = document.querySelector('#cep')
cep.focus()

const btnSearch = document.querySelector('.search')
btnSearch.addEventListener('click', errorMessage)

const btnResearch = document.querySelector('.research')
btnResearch.addEventListener('click', reset)

const contentaMapa = document.querySelector('.mapa')
const emptyFleld = document.querySelector('.empty-message')
const locationDatas = document.querySelector('.hidden-content')

cep.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        btnSearch.click();
    }
})

const onlyNumbers = (text) => {
    text = text.replace(/[^0-9]/g, '');
    cep.value = text;
}

btnSearch.addEventListener('click', loadMap)