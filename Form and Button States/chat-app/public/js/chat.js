const socket = io()
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = document.querySelector('input')
const $messageFormButton = document.querySelector('button')
const $sendLocationButton = document.querySelector("#send-location")

socket.on('message', (message) => {
    console.log(message)
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    $messageFormButton.setAttribute("disabled", "disabled")

    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, error => {
        $messageFormButton.removeAttribute("disabled")
        $messageFormInput.value = ""
        $messageFormInput.focus()

        if (!message)
            return alert("Mensagem vazio. Digite sua mensagem")

        if (error)
            return console.log(error)

        console.log("The message was delivered!")
    })
})

document.querySelector("#send-location").addEventListener("click", () => {
    $sendLocationButton.setAttribute("disabled", "disabled")
    if (!navigator.geolocation)
        return alert("Geolocation is not supported by your browser")

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit("sendLocation", {            
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            $sendLocationButton.removeAttribute("disabled")
            console.log('Location shared!')
        })
    })
})