// https://viacep.com.br
// https://www.youtube.com/watch?v=Pi6wkdU2vR4&ab_channel=hcode

// https://developers.google.com/maps/documentation/javascript/examples/
// https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform
// https://developers.google.com/maps/documentation/javascript/examples/marker-simple#maps_marker_simple-javascript

// https://www.devmedia.com.br/como-utilizar-a-google-geocoding-api-para-obter-enderecos/36751
// https://www.youtube.com/watch?v=rJcD0cQ6H8k&ab_channel=CodingMindBrasil
// https://imasters.com.br/back-end/google-maps-api

// CHAVE API GOOGLE MAPS: AIzaSyAvxhlLOjoWKUzoDdnO9H6JRO7quBjW3no
// https://www.google.com/maps/embed/v1/place?key=AIzaSyAvxhlLOjoWKUzoDdnO9H6JRO7quBjW3no&q=Eiffel+Tower,Paris+France

const cep = document.querySelector('#cep')

const btnSearch = document.querySelector('.search')
btnSearch.addEventListener('click', errorMessage)

const emptyFleld = document.querySelector('.empty-message')

console.log(cep.value);

function errorMessage() {
    if(cep.value === '') {
        emptyFleld.classList.remove('d-none')
    }
}

const showData = (result) => {
    for (const field in result) {
        if (document.querySelector('#' + field)) {
            document.querySelector('#' + field).value = result[field]
        }
    }

    const logradouro = result.logradouro

    function mapa() {
        const contentaMapa = document.querySelector('.mapa')
        
        btnSearch.classList.add('disabled')
        cep.setAttribute('readonly', true)
        emptyFleld.classList.add('d-none')

        contentaMapa.innerHTML = `
        <iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAvxhlLOjoWKUzoDdnO9H6JRO7quBjW3no&q=${logradouro},Brasil" frameborder="0"></iframe>
        <a class="btn btn-secondary mb-5" id="research">Nova procura</a>
        `

    }
    mapa()
    
}

cep.addEventListener('blur', (e) => {

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
        .catch(e => console.log('Erro: ' + e, message))
})


