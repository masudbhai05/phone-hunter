const loadPhones = async (searchText, limitData) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data)
    displayPhones(data.data, limitData);
}

const displayPhones = (phones, limitData) => {
    // display 10 phones only
    const showAll = document.getElementById('show-all');
    if (phones.length > 10 && limitData) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none')
    }
    else {
        showAll.classList.add('d-none')
    }
    // display Not fuond phose 
    const displayMessege = document.getElementById('not-found-message');
    if (phones.length === 0) {
        displayMessege.classList.remove('d-none');
    }
    else {
        displayMessege.classList.add('d-none');
    }

    // load data
    const phonesConatiner = document.getElementById('phones-container');
    phonesConatiner.innerHTML = '';
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card w-75 p-3">
            <img src="${phone.image}" class="card-img-top w-75  mx-auto" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                to additional content. This content is a little bit longer.</p>
                <button onclick="loadDetailsPhone('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loadDetails">
                    Details
                </button>
            </div>
        </div>
        `
        phonesConatiner.appendChild(phoneDiv);
    });
    toggleSpinner(false);
}

const searchProcess = limitData => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, limitData);
    toggleSpinner(true);
}

document.getElementById('search-btn').addEventListener('click', function () {
    searchProcess(10);
})

document.getElementById('search-field').addEventListener('keydown', function (event) {
    if (event.key == 'Enter') {
        searchProcess(10);
    }
})
const toggleSpinner = isLoading => {
    const spinnerLoading = document.getElementById('load-spinner');
    if (isLoading) {
        spinnerLoading.classList.remove('d-none');
    }
    else {
        spinnerLoading.classList.add('d-none')
    }
}

document.getElementById('btn-show-all').addEventListener('click', function () {
    searchProcess()
})

const loadDetailsPhone = async id => {
    url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json()
    // console.log(data)
    displayPhoneDetails(data.data)
}

const displayPhoneDetails = phone => {
    // console.log(phone)
    const phoneTitle = document.getElementById('loadDetailsTitle');
    phoneTitle.innerText = phone.name;
    const detailsBody = document.getElementById('details-body');
    detailsBody.innerHTML = `
    <p>Brand : ${phone.brand}</p>
    <p>Chipset : ${phone.mainFeatures ? phone.mainFeatures.chipSet : 'Not found'}</p>
    <p>Display size : ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'Not found'}</p>
    <p>Memory : ${phone.mainFeatures ? phone.mainFeatures.memory : 'Not found'}</p>
    <p>USB : ${phone.others ? phone.others.USB : 'Not found'}</p>
    `;

}

// loadPhones('apple')