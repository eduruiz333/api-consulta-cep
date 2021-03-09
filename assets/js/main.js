// CEP Paulista: 01310-100
// ARROW FUNCTIONS CONST DECLARATIONS

const onlyNumbers = (text) => {
    text = text.replace(/[^0-9]/g, '');
    cep.value = text;
}

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

const showData = (result) => {
    for (const field in result) {
        if (document.querySelector('#' + field)) {
            document.querySelector('#' + field).value = result[field]
        }
    }

    (map = () => {
        searchResult.classList.add('expand')
        const logradouro = result.logradouro
        contentaMap.innerHTML = ` <iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAvxhlLOjoWKUzoDdnO9H6JRO7quBjW3no&q=${logradouro},Brasil" frameborder="0"></iframe> `
        cep.setAttribute('readonly', true)
        btnSearch.classList.add('disabled','btn-secondary')
        btnSearch.classList.remove('btn-success')
        emptyFleld.classList.add('d-none')
        btnResearch.classList.remove('btn-secondary', 'disabled')
        btnResearch.classList.add('btn-info')
    })()
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

const reset = () => {
    const allFields = document.querySelectorAll('.form-control')

    allFields.forEach((allFields) => {
        // console.log(allFields.value)
        allFields.value = ''
    })
    
    cep.readOnly = false;
    cep.focus()

    btnSearch.classList.remove('disabled', 'btn-secondary')
    btnSearch.classList.add('btn-success')
    btnResearch.classList.remove('btn-info')
    btnResearch.classList.add('disabled', 'btn-secondary')
}

// CONST AND LISTENERS DECLARATIONS

const cep = document.querySelector('#cep')
cep.focus()

const btnSearch = document.querySelector('.search')
btnSearch.addEventListener('click', errorMessage)

const btnResearch = document.querySelector('.research')
btnResearch.addEventListener('click', reset)

const contentaMap = document.querySelector('.map')
const emptyFleld = document.querySelector('.empty-message')

const searchResult = document.querySelector('.search-result')

cep.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault()
        btnSearch.click()
    }
})

btnSearch.addEventListener('click', loadMap)