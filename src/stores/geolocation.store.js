import { writable } from "svelte/store";

export const currentGeolocation = writable();

window.navigator.geolocation.watchPosition(await successCallback, errorCallback, {
    enableHighAccuracy: true,
});

function successCallback(pos) {
    currentGeolocation.set(pos?.coords);
}

function errorCallback(error) {
    console.log(error);
}