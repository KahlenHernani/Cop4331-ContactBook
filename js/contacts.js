/*
  FAKE DATABASE
  This simulates future API JSON data
*/

let contacts = [

  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "phone": "123-456-7890",
    "email": "john@gmail.com"
  },

  {
    "id": 2,
    "firstName": "Sarah",
    "lastName": "Smith",
    "phone": "555-123-9999",
    "email": "sarah@gmail.com"
  },

  {
    "id": 3,
    "firstName": "Michael",
    "lastName": "Brown",
    "phone": "777-888-9999",
    "email": "michael@gmail.com"
  }

];

const contactList =
  document.getElementById("contactList");

const searchInput =
  document.getElementById("searchInput");

/*
  LIVE SEARCH
*/

searchInput.addEventListener("input", renderContacts);

/*
  INITIAL LOAD
*/

renderContacts();

/*
  DISPLAY CONTACTS
*/

function renderContacts()
{
  const searchText =
    searchInput.value.toLowerCase();

  contactList.innerHTML = "";

  const filteredContacts =
    contacts.filter(contact =>
    {
      return (
        contact.firstName
          .toLowerCase()
          .includes(searchText)

        ||

        contact.lastName
          .toLowerCase()
          .includes(searchText)

        ||

        contact.phone
          .includes(searchText)

        ||

        contact.email
          .toLowerCase()
          .includes(searchText)
      );
    });

  filteredContacts.forEach(contact =>
  {
    const card =
      document.createElement("div");

    card.classList.add("contact-card");

    card.innerHTML = `
      <h3>
        ${contact.firstName}
        ${contact.lastName}
      </h3>

      <p>📞 ${contact.phone}</p>

      <p>✉️ ${contact.email}</p>

      <div class="card-buttons">

        <button
          class="edit-btn"
          onclick="editContact(${contact.id})"
        >
          Edit
        </button>

        <button
          class="delete-btn"
          onclick="deleteContact(${contact.id})"
        >
          Delete
        </button>

      </div>
    `;

    contactList.appendChild(card);
  });
}

/*
  ADD CONTACT
*/

function addContact()
{
  const firstName =
    document.getElementById("firstName").value;

  const lastName =
    document.getElementById("lastName").value;

  const phone =
    document.getElementById("phone").value;

  const email =
    document.getElementById("email").value;

  if(
    firstName === "" ||
    lastName === "" ||
    phone === "" ||
    email === ""
  )
  {
    alert("Please fill out all fields.");
    return;
  }

  const newContact = {

    "id": Date.now(),

    "firstName": firstName,

    "lastName": lastName,

    "phone": phone,

    "email": email
  };

  contacts.push(newContact);

  renderContacts();

  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";

  alert("Contact Added!");
}

/*
  DELETE CONTACT
*/

function deleteContact(id)
{
  contacts =
    contacts.filter(contact =>
      contact.id !== id
    );

  renderContacts();
}

/*
  EDIT CONTACT
*/

function editContact(id)
{
  const contact =
    contacts.find(contact =>
      contact.id === id
    );

  const newPhone =
    prompt(
      "Enter new phone number:",
      contact.phone
    );

  if(newPhone !== null)
  {
    contact.phone = newPhone;
  }

  renderContacts();
}

/*
  LOGOUT
*/

function logout()
{
  window.location.href = "index.html";
}