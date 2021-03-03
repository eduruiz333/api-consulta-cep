let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: -23.5475,
            lng: -46.63611
        },
        zoom: 8,
    });
}