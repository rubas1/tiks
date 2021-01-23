import {observable, makeObservable, action} from 'mobx'
import axios from 'axios'
const apiKey = 'AIzaSyDLv6Zg_G1WuzvGeZ1VwhlEbYdYtk4vGSQ'
const PORT = 8080

export default class MapsStore{

    constructor(){
        this.mapOpened = false
        this.nearPlaces = []
        // this.nearPlacesNumber = 0 // The number of places the user wants us to show
        this.radius = 1000
        this.currentLocation = {
            lat: 0,
            lng: 0
        }
        this.searchInput = {
            location: "",
            category: ""
        }
        this.taskSearchBy = "category"
        this.showPlacesPopup = false

        makeObservable(this, {
            mapOpened: observable,
            nearPlaces: observable,
            // nearPlacesNumber: observable,
            radius: observable,
            currentLocation: observable,
            searchInput: observable,
            taskSearchBy: observable,
            showPlacesPopup: observable,
            openMap: action,
            closeMap: action,
            updatePlacesNumber: action,
            radiusUpdated: action,
            getCurrentLocation: action,
            getNearPlacesByCategory: action,
        })
    }

    openMap = () => this.mapOpened = true

    closeMap = () => this.mapOpened = false

    updatePlacesNumber = (number) => this.nearPlaces.slice(0, number)

    radiusUpdated = async () => await this.getNearPlacesByCategory()

    async getCurrentLocation(){
        let response = await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`)
        this.currentLocation = {lat: response.data.location.lat, lng: response.data.location.lng}
    }

    async getNearPlacesByCategory(){
        await this.getCurrentLocation()
        let places = await axios.post(`http://localhost:${PORT}/nearPlacesByCategory`, {lat: this.currentLocation.lat, lng: this.currentLocation.lng, radius: this.radius, category: this.searchInput.category})
        places.data.forEach(p => {
            this.nearPlaces.push({id: p.place_id, name: p.name, location: p.geometry.location, opened: p.opening_hours ? p.opening_hours : "", imgUrl: null, rating: p.rating})})
        if(this.nearPlaces){
            this.showPlacesPopup = true
        }
    }
}
