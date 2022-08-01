//ENDPOINTS
const endpointContacts = 'http://localhost:3005/v1/contacts';
const endpointCompanies = 'http://localhost:3005/v1/companies';
const endpointRegions = 'http://localhost:3005/v1/regions';
const endpointCountries = 'http://localhost:3005/v1/countries';
const endpointCities = 'http://localhost:3005/v1/cities';
const endpointPreferences = 'http://localhost:3005/v1/preferences';

//TEMPLATES
const container = document.getElementById('container');
const templateContacts = document.getElementById('templateContacts');
const templateNewContact = document.getElementById('templateNewContact');
const templateCompanies = document.getElementById('templateCompanies');
const templateNewCompany = document.getElementById('templateNewCompany');
const templateRegion = document.getElementById('templateRegion');
const templateNewRegion = document.getElementById('templateNewRegion');
const templateNewCountry = document.getElementById('templateNewCountry');
const templateNewCity = document.getElementById('templateNewCity');

// FUNCIONES AUXILIARES
const showContent = (template) => {
  const clon = template.content.cloneNode(true);
  container.appendChild(clon);
};
const removeNode = (node) => {
  while (node.lastChild) {
    node.lastChild.remove();
  }
};
const removeElement = (element) => {
  element.remove();
};
const removeLastElementChild = () => {
  container.lastElementChild.remove();
};
let orden;
function sortName(prop) {
  if (orden == undefined || orden == true) {
    contacts.sort((a, b) => (a[prop] > b[prop]) ? 1 : ((b[prop] > a[prop] ? -1 : 0)));
    orden = false;
  } else {
    contacts.sort((a, b) => (a[prop] > b[prop]) ? -1 : ((b[prop] > a[prop] ? 1 : 0)));
    orden = true;
  }
  removeLastElementChild(container);
  showContent(templateContacts);
  renderAllContacts();
}

// VISTA CONTACTOS
let contacts = [];
const getAllContacts = () => {
  axios.get(endpointContacts, { headers: { Authorization: token } })
    .then(response => {
      contacts = response.data.contacts;
      renderAllContacts();
    })
    .catch(error => console.log(error));
};

const renderAllContacts = () => {
  contacts.forEach(contact => {
    let divContactRow = document.createElement('div');
    divContactRow.setAttribute('class', 'contacts__row');
    let divCheckbox = document.createElement('div');
    divCheckbox.setAttribute('class', 'checkbox');
    let inputCheckbox = document.createElement('input');
    inputCheckbox.setAttribute('type', 'checkbox');
    divCheckbox.appendChild(inputCheckbox);
    divContactRow.appendChild(divCheckbox);

    let divName = document.createElement('div');
    divName.setAttribute('class', 'name');
    let div1 = document.createElement('div');
    let img = document.createElement('img');
    img.setAttribute('src', './assets/images/contact.png');
    img.setAttribute('alt', 'imagen de contacto');
    div1.appendChild(img);
    divName.appendChild(div1);
    let div2 = document.createElement('div');
    let p1 = document.createElement('p');
    p1.textContent = `${contact.lastname} ${contact.name}`;
    let p2 = document.createElement('p');
    p2.textContent = `${contact.email}`;
    div2.appendChild(p1);
    div2.appendChild(p2);
    divName.appendChild(div2);
    divContactRow.appendChild(divName);

    let divCountry = document.createElement('div');
    divCountry.setAttribute('class', 'country');
    let p3 = document.createElement('p');
    p3.textContent = `${contact.country_name}`;
    let p4 = document.createElement('p');
    p4.textContent = `${contact.region_name}`;
    divCountry.appendChild(p3);
    divCountry.appendChild(p4);
    divContactRow.appendChild(divCountry);

    let divCompany = document.createElement('div');
    divCompany.setAttribute('class', 'company');
    let p5 = document.createElement('p');
    p5.textContent = `${contact.company_name}`;
    divCompany.appendChild(p5);
    divContactRow.appendChild(divCompany);

    divChannel = document.createElement('div');
    divChannel.setAttribute('class', 'channel');
    if (contact.preference_phone == 2) {
      let span = document.createElement('span');
      span.textContent = 'telefono';
      divChannel.appendChild(span);
    }
    if (contact.preference_linkedin == 2) {
      let span = document.createElement('span');
      span.textContent = 'linkedin';
      divChannel.appendChild(span);
    }
    if (contact.preference_facebook == 2) {
      let span = document.createElement('span');
      span.textContent = 'facebook';
      divChannel.appendChild(span);
    }
    if (contact.preference_twitter == 2) {
      let span = document.createElement('span');
      span.textContent = 'twitter';
      divChannel.appendChild(span);
    }
    if (contact.preference_instagram == 2) {
      let span = document.createElement('span');
      span.textContent = 'instagram';
      divChannel.appendChild(span);
    }
    divContactRow.appendChild(divChannel);

    let divOcupation = document.createElement('div');
    divOcupation.setAttribute('class', 'ocupation');
    let p6 = document.createElement('p');
    p6.textContent = `${contact.position}`;
    divOcupation.appendChild(p6);
    divContactRow.appendChild(divOcupation);

    let divInterest = document.createElement('div');
    divInterest.setAttribute('class', 'interest');
    let span = document.createElement('span');
    span.textContent = `${contact.interest}%`;
    divInterest.appendChild(span);
    let progress = document.createElement('progress');
    progress.setAttribute('max', '100');
    progress.setAttribute('value', `${contact.interest}`);
    divInterest.appendChild(progress);
    divContactRow.appendChild(divInterest);

    let divActions = document.createElement('div');
    divActions.setAttribute('class', 'actions');
    let button1 = document.createElement('button');
    button1.setAttribute('class', 'actions-edit');
    let i1 = document.createElement('i');
    i1.setAttribute('class', 'fas fa-pencil-alt');
    i1.addEventListener('click', () => {
      showContent(templateNewContact);
      const close = document.getElementById('close');
      close.addEventListener('click', () => {
        removeLastElementChild(container);
      });
      const name = document.getElementById('name-edit');
      name.value = `${contact.name}`;
      const lastname = document.getElementById('lastname-edit');
      lastname.value = `${contact.lastname}`;
      const position = document.getElementById('possition-edit');
      position.value = `${contact.position}`;
      const email = document.getElementById('email-edit');
      email.value = `${contact.email}`;
      let company = document.getElementById('company-edit');
      axios.get(endpointCompanies, { headers: { Authorization: token } })
        .then(response => {
          response.data.companies.forEach(comp => {
            let company = document.getElementById('company-edit');
            let option = document.createElement('option');
            option.setAttribute('value', `${comp.id_company}`);
            option.textContent = `${comp.name}`;
            if (contact.company_name == comp.name) {
              option.setAttribute('selected', 'selected');
            }
            company.appendChild(option);
          });
        })
        .catch(error => console.log(error));
      const region = document.getElementById('region-edit');
      axios.get(endpointRegions, { headers: { Authorization: token } })
        .then(response => {
          response.data.regions.forEach(reg => {
            let region = document.getElementById('region-edit');
            let option = document.createElement('option');
            option.setAttribute('value', `${reg.id_region}`);
            option.textContent = `${reg.name}`;
            if (contact.region_name == reg.name) {
              option.setAttribute('selected', 'selected');
            }
            region.appendChild(option);
          });
        })
        .catch(error => console.log(error));
      const country = document.getElementById('country-edit');
      axios.get(endpointCountries, { headers: { Authorization: token } })
        .then(response => {
          response.data.countries.forEach(coun => {
            const country = document.getElementById('country-edit');
            let option = document.createElement('option');
            option.setAttribute('value', `${coun.id_country}`);
            option.textContent = `${coun.name}`;
            if (contact.country_name == coun.name) {
              option.setAttribute('selected', 'selected');
            }
            country.appendChild(option);
          });
        })
        .catch(error => console.log(error));
      const city = document.getElementById('city-edit');
      axios.get(endpointCities, { headers: { Authorization: token } })
        .then(response => {
          response.data.cities.forEach(cit => {
            const city = document.getElementById('city-edit');
            let option = document.createElement('option');
            option.setAttribute('value', `${cit.id_city}`);
            option.textContent = `${cit.name}`;
            if (contact.city_name == cit.name) {
              option.setAttribute('selected', 'selected');
            }
            city.appendChild(option);
          });
        })
        .catch(error => console.log(error));
      const address = document.getElementById('adress-edit');
      address.value = `${contact.address}`;
      const interest = document.getElementById('interest');
      interest.value = `${contact.interest}`;
      const emailPreference = document.getElementById('email-edit');
      emailPreference.value = `${contact.email}`;
      const phone = document.getElementById('telephone-edit');
      phone.value = `${contact.phone}`;
      const phonePreference = document.getElementById('preference-telephone');
      axios.get(endpointPreferences, { headers: { Authorization: token } })
        .then(response => {
          response.data.preferences.forEach((pref, index) => {
            const phonePreference = document.getElementById('preference-telephone');
            let option = document.createElement('option');
            option.setAttribute('value', `${pref.id_preference}`);
            option.textContent = `${pref.name}`;
            if (index == 0) {
              option.setAttribute('selected', 'selected');
            }
            if (contact.preference_phone_name == pref.name) {
              option.setAttribute('selected', 'selected');
            }
            phonePreference.appendChild(option);
          });
        })
        .catch(error => console.log(error));
      const facebook = document.getElementById('facebook-edit');
      facebook.value = `${contact.facebook}`;
      const facebookPreference = document.getElementById('preference-facebook');
      axios.get(endpointPreferences, { headers: { Authorization: token } })
        .then(response => {
          response.data.preferences.forEach((pref, index) => {
            const facebookPreference = document.getElementById('preference-facebook');
            let option = document.createElement('option');
            option.setAttribute('value', `${pref.id_preference}`);
            option.textContent = `${pref.name}`;
            if (index == 0) {
              option.setAttribute('selected', 'selected');
            }
            if (contact.preference_facebook_name == pref.name) {
              option.setAttribute('selected', 'selected');
            }
            facebookPreference.appendChild(option);
          });
        })
        .catch(error => console.log(error));
      const twitter = document.getElementById('twitter-edit');
      twitter.value = `${contact.twitter}`;
      const twitterPreference = document.getElementById('preference-twitter');
      axios.get(endpointPreferences, { headers: { Authorization: token } })
        .then(response => {
          response.data.preferences.forEach((pref, index) => {
            const twitterPreference = document.getElementById('preference-twitter');
            let option = document.createElement('option');
            option.setAttribute('value', `${pref.id_preference}`);
            option.textContent = `${pref.name}`;
            if (index == 0) {
              option.setAttribute('selected', 'selected');
            }
            if (contact.preference_twitter_name == pref.name) {
              option.setAttribute('selected', 'selected');
            }
            twitterPreference.appendChild(option);
          });
        })
        .catch(error => console.log(error));
      const instagram = document.getElementById('instagram-edit');
      instagram.value = `${contact.instagram}`;
      const instagramPreference = document.getElementById('preference-instagram');
      axios.get(endpointPreferences, { headers: { Authorization: token } })
        .then(response => {
          response.data.preferences.forEach((pref, index) => {
            const instagramPreference = document.getElementById('preference-instagram');
            let option = document.createElement('option');
            option.setAttribute('value', `${pref.id_preference}`);
            option.textContent = `${pref.name}`;
            if (index == 0) {
              option.setAttribute('selected', 'selected');
            }
            if (contact.preference_instagram_name == pref.name) {
              option.setAttribute('selected', 'selected');
            }
            instagramPreference.appendChild(option);
          });
        })
        .catch(error => console.log(error));
      const linkedin = document.getElementById('linkedin-edit');
      linkedin.value = `${contact.linkedin}`;
      const linkedinPreference = document.getElementById('preference-linkedin');
      axios.get(endpointPreferences, { headers: { Authorization: token } })
        .then(response => {
          response.data.preferences.forEach((pref, index) => {
            const linkedinPreference = document.getElementById('preference-linkedin');
            let option = document.createElement('option');
            option.setAttribute('value', `${pref.id_preference}`);
            option.textContent = `${pref.name}`;
            if (index == 0) {
              option.setAttribute('selected', 'selected');
            }
            if (contact.preference_linkedin_name == pref.name) {
              option.setAttribute('selected', 'selected');
            }
            linkedinPreference.appendChild(option);
          });
        })
        .catch(error => console.log(error));
      const cancel = document.getElementById('cancel');
      cancel.addEventListener('click', () => {
        removeLastElementChild(container);
      });
      const save = document.getElementById('save');
      save.addEventListener('click', () => {
        let data = {
          name: name.value,
          lastname: lastname.value,
          email: email.value,
          address: address.value,
          phone: phone.value,
          preference_phone: phonePreference.value,
          linkedin: linkedin.value,
          preference_linkedin: linkedinPreference.value,
          facebook: facebook.value,
          preference_facebook: facebookPreference.value,
          twitter: twitter.value,
          preference_twitter: twitterPreference.value,
          instagram: instagram.value,
          preference_instagram: instagramPreference.value,
          position: position.value,
          interest: interest.value,
          id_company: company.value,
          id_city: city.value
        };
        axios.put(`${endpointContacts}/${contact.id_contact}`, data, { headers: { Authorization: token }, 'Content-Type': 'application / json' })
          .then(response => {
            removeNode(container);
            showContent(templateContacts);
            getAllContacts();
          })
          .catch(error => console.log(error));
      });
    });
    button1.appendChild(i1);
    divActions.appendChild(button1);

    let button2 = document.createElement('button');
    button2.setAttribute('class', 'actions-delete');
    let i2 = document.createElement('i');
    i2.setAttribute('class', 'far fa-trash-alt');
    i2.addEventListener('click', () => {
      axios.delete(`${endpointContacts}/${contact.id_contact}`, { headers: { Authorization: token } })
        .then(response => {
          removeLastElementChild(container);
          showContent(templateContacts);
          getAllContacts();
        })
        .catch(error => console.log(error));
    });
    button2.appendChild(i2);
    divActions.appendChild(button2);
    divContactRow.appendChild(divActions);

    divContactRow.addEventListener('click', (e) => {
    });

    contactsContainer.appendChild(divContactRow);
  });
};

const menuContacts = () => {
  showContent(templateContacts);
  getAllContacts();
};
menuContacts();