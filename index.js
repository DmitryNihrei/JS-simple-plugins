let fruits = [
  { id: 1, title: "Apples", price: 20, img: "https://place-hold.it/300x200" },
  { id: 2, title: "Oranges", price: 30, img: "https://place-hold.it/300x200" },
  { id: 3, title: "Mango", price: 40, img: "https://place-hold.it/300x200" },
]

function _createCards(fruits) {
  const row = document.getElementsByClassName("row")[0]
  if (fruits.length === 0) {
    return document.createElement("div")
  }
  fruits.forEach((fruit) => {
    const card = document.createElement("div")
    card.classList.add("col")
    card.insertAdjacentHTML(
      "afterbegin",
      `
    <div class="card" style="width: 18rem">
      <img src="${fruit.img}" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">${fruit.title}</h5>
        <p class="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio, nihil aspernatur?</p>
        <button class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Look for price</button> 
        <button class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Delete</button>
      </div>
    </div>
    `
    )
    row.appendChild(card)
    return card
  })
}

const modal = $.modal({
  title: "Modal Window",
  closable: true,
  content: `
    <p>The text i entered</p>
    <p>The text i entered</p>
  `,
  width: "400px",
  footerButtons: [
    {
      text: "Ok",
      type: "primary",
      handler() {
        console.log("primary button clicked")
        modal.close()
      },
    },
    {
      text: "Cancel",
      type: "danger",
      handler() {
        console.log("danger button clicked")
        modal.close()
      },
    },
  ],
})

const cards = _createCards(fruits)

const createModalPrice = $.modal({
  title: "Price",
  closable: true,
  content: ``,
  width: "300px",
  footerButtons: [
    {
      text: "Ok",
      type: "primary",
      handler() {
        console.log("primary button clicked")
        createModalPrice.close()
      },
    },
  ],
})

// const confirmModal = $.modal({
//   title: "Are you sure you want to delete this card?",
//   closable: true,
//   width: "400px",
//   footerButtons: [
//     {
//       text: "Close",
//       type: "secondary",
//       handler() {
//         console.log("primary button clicked")
//         confirmModal.close()
//       },
//     },
//     {
//       text: "Delete",
//       type: "danger",
//       handler() {
//         console.log("primary button clicked")
//         confirmModal.close()
//       },
//     },
//   ],
// })

// const deleteCard = $.confirm({
//   title: "Are you sure?",
//   content: `<p>deleting</p>`,
// })
//   .then(() => {
//     console.log("remove")
//   })
//   .catch(() => {
//     console.log("cancel")
//   })

document.addEventListener("click", (event) => {
  event.preventDefault()
  const btntype = event.target.dataset.btn
  const id = +event.target.dataset.id
  const fruit = fruits.find((f) => f.id === id)

  if (btntype === "price") {
    createModalPrice.setContent(`
      <p>${fruit.title} price: ${fruit.price}</p>
    `)
    createModalPrice.open()
  } else if (btntype === "remove") {
    $.confirm({
      title: "Are you sure you want to delete this card?",
      content: `<p>Deleting ${fruit.title}</p>`,
    })
      .then(() => {
        fruits = fruits.filter((f) => f.id !== id)
        document.getElementsByClassName("row")[0].innerHTML = ""
        _createCards(fruits)
      })
      .catch(() => {
        console.log("cancel")
      })
    // confirmModal.setContent(`
    //   <p>dalete ${fruit.title}?</p>
    // `)
    // confirmModal.open()
  }
})
