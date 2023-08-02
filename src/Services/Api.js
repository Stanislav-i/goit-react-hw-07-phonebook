const BASE_URL = 'https://64ca5755700d50e3c704be7e.mockapi.io/contacts/';

export const fetchContactsData = async () => {
    const data = await fetch(BASE_URL, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        })
               
    return data;
}

export const addContactData = async newContact => {
  const data = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    // Send your data in the request body as JSON
    body: JSON.stringify(newContact),
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
  });

  return data;
};

export const deleteContactData = async (id) => {
  const data = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
  });

  return data;
};