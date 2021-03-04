//Load all important features into variables*/
const form = document.forms[0]
const sname = form.sname
const suburb = form.suburb
const postcode= form.postcode
const dob = form.dob
const type = form.type
const heating = form.heating
const aircon = form.aircon
const pool = form.pool
const sandpit = form.sandpit
const output = form.output

function render() {
  //Perform input sanitisation
  console.log("Rendering...")
  if (sname.value.length <3 || sname.value.length>50) {
    output.value = "Please input a valid street name"
    return
  }

  if (suburb.value.length <3 || suburb.value.length>50) {
    output.value = "Please input a valid suburb"
    return
  }

  if (postcode.value.length != 4 || isNaN(postcode.value)) {
    output.value = "Please input a valid postcode"
    return
  }

  //Date.parse() wants MM/DD/YYYY so I had to swap the day and month so that it satisfies both the assignment req and the function req
  let date = dob.value
  let split = date.split("/")
  date = `${split[1]}/${split[0]}/${split[2]}`

  if (/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/.test(date) == false || Date.parse(date) == NaN) {
    output.value = "Please enter a valid date of birth"
    return
  }

  //calculate age
  let d = new Date()
  let age = d.getFullYear() - split[2]
  if ((parseInt(split[1]) > d.getMonth()+1) || (parseInt(split[1])==d.getMonth()+1 && parseInt(split[0]) > d.getDay())) {
    age--
  }
  
  //calculate the number of features
  let f = []
  if (heating.checked==true) {
    f.push("heating")
  }
  if (aircon.checked==true) {
    f.push("air conditioning")
  }
  if (pool.checked==true) {
    f.push("a pool")
  }
  if (sandpit.checked==true) {
    f.push("a sandpit")
  }

  //determine feature list for output string
  let features = "No Features"
  if (f.length==1) {
    features = f[0]
  } else if (f.length >1 ) {
    features=""
    for (let i = 0; i< f.length-1; i++) {
      features = features+`${f[i]}, `
    }
    features=features+`and ${f[f.length-1]}`
  }

  //generate output string
  let out = `Your are ${age} years old, and your address is ${sname.value} St, ${suburb.value}, ${postcode.value}, Australia. Your building is [a|an] ${type.value}, and it has ${features}`

  output.value=out
}

function selectall() {
  console.log("Select All...")
  if (heating.checked == true && aircon.checked == true && pool.checked == true && sandpit.checked == true) {
    //Deselect All
    heating.checked = false
    aircon.checked = false
    pool.checked = false
    sandpit.checked = false
    form.selectall.textContent="Select All"
  } else {
    //Select All
    heating.checked = true
    aircon.checked = true
    pool.checked = true
    sandpit.checked = true
    form.selectall.textContent="Deselect All"
  }

  render()
}

function reset() {
  console.log("Resetting...")
  sname.value=""
  suburb.value=""
  postcode.value=""
  dob.value=""

  type.value="Apartment"

  heating.checked = false
  aircon.checked = false
  pool.checked = false
  sandpit.checked = false

  output.value=""
}

//setup event listeners for all necessary render events
form.sname.addEventListener("blur", render)
form.suburb.addEventListener("blur", render)
form.postcode.addEventListener("blur", render)
form.dob.addEventListener("blur", render)

form.type.addEventListener("change", render)
form.heating.addEventListener("change", render)
form.aircon.addEventListener("change", render)
form.pool.addEventListener("change", render)
form.sandpit.addEventListener("change", render)

form.selectall.addEventListener("click", selectall)
form.reset.addEventListener("click", reset)