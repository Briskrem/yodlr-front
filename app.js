const $register = $('#register')
const $administration = $('#administration')
const $homepage = $('#homepage')
const $registerButton = $('.register-button')
const $adminButton = $('.admin-button')


getUsers()


$('#REG').on('click', showReg)
$('#ADMIN').on('click', showAdmin)
$('#HOME').on('click', showHome)
$registerButton.on('click', getRegData)
$adminButton.on('click', getUser)


function showReg(){
    $homepage.hide()
    $administration.hide()
    $register.show()
}

function showAdmin(){
    $homepage.hide()
    $register.hide()
    $administration.show()
}

function showHome(){
    $homepage.show()
    $register.hide()
    $administration.hide()
}

async function getUsers(){
    $administration.hide()
    $register.hide()
    let resp = (await axios.get('http://localhost:3000/users')).data
    resp.forEach(usr => {
        let element = 
        `
        <div>
            <h2>${usr.firstName} ${usr.lastName}</h2>
            <h3>email: ${usr.email}</h3>
            <h3>state: ${usr.state}</h3>
        </div>
        `
        $homepage.append(element)
    })
}

async function getRegData(e){
    e.preventDefault()
    console.log('hey')
    let firstName = $('input[name="firstname"]').val()
    let lastName = $('input[name="lastname"]').val()
    let email = $('input[name="email"]').val()
    let state = $('input[name="state"]').val()

    let url = 'http://localhost:3000/users'
    let data = {email, firstName, lastName, state}
    let method ='POST'

    let resp = await axios({url, method, data})
    console.log(resp)
    location.reload()
}

async function getUser(e){
    e.preventDefault()
    let userId = $('input[name="user_id"]').val()

    let url = `http://localhost:3000/users/${userId}` 
    let method ='GET'

    let resp = (await axios({url, method})).data
    console.log(resp)

    let element = 
        `
            <div>
                <h1>id: ${resp.id}</h1>
                <h2>${resp.firstName} ${resp.lastName}</h2>
                <h3>email: ${resp.email}</h3>
                <h3>state: ${resp.state}</h3>
            </div>
        `

    $administration.append(element)
}



