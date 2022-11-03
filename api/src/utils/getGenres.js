const { Genres } = require("../db");
const { getOrders } = require("./getOrders");
const { getAllBooksAdmin } = require("./getAllBooksAdmin");

async function getGenres({ sort }) {
  try {
    let genresDb = await Genres.findAll();
    let allCarts = await getOrders({
      sort: "status-Z-A",
      searchValue: ""
    })
    let allBooks = await getAllBooksAdmin({
      sort: "name-A-Z",
      searchValue: ""
    })

    if (!genresDb.length) return { messageError: "No se encontraron géneros" };

    let allGenres = genresDb.map((genre) => genre.name);

    // -------------- ORDENAMIENTOS PARA PANEL DE CATEGORÍAS -----------------
    if (!sort) sort = "name-A-Z";
    sort === "name-A-Z" && allGenres.sort((a, b) => a.localeCompare(b));
    sort === "name-Z-A" && allGenres.sort((b, a) => a.localeCompare(b));

    if (sort === "proc-min-max" || sort === "proc-max-min") {
      let allGenresOrdered = []
      let quantitySalesProcessing = {};
      if (allCarts && !allCarts.messageError && allCarts.length) {
        allCarts.forEach(cart => {
          if (cart.status === "Procesando") {
            cart.Books.forEach(book => {
              book.Genres.forEach(genre => {
                quantitySalesProcessing[genre.name] = (quantitySalesProcessing[genre.name] || 0) + 1;
              })
            })
          }
        });
        let orderArray = []
        for (const key in quantitySalesProcessing) {
          orderArray.push({ name: key, quantity: quantitySalesProcessing[key] })
        }

        if (sort === "proc-min-max") {
          orderArray.sort((a, b) => a.quantity - b.quantity)
          orderArray.forEach(g => allGenresOrdered.push(g.name))
          allGenres.forEach(g => {
            if (!allGenresOrdered.includes(g)) {
              allGenresOrdered.unshift(g)
            }
          })
        }
        if (sort === "proc-max-min") {
          orderArray.sort((b, a) => a.quantity - b.quantity)
          orderArray.forEach(g => allGenresOrdered.push(g.name))
          allGenres.forEach(g => {
            if (!allGenresOrdered.includes(g)) {
              allGenresOrdered.push(g)
            }
          })
        }
      }
      return allGenresOrdered
    }
    if (sort === "end-min-max" || sort === "end-max-min") {
      let allGenresOrdered = []
      let quantitySalesFinished = {};
      if (allCarts && !allCarts.messageError && allCarts.length) {
        allCarts.forEach(cart => {
          if (cart.status === "Entregado") {
            cart.Books.forEach(book => {
              book.Genres.forEach(genre => {
                quantitySalesFinished[genre.name] = (quantitySalesFinished[genre.name] || 0) + 1;
              })
            })
          }
        });
        let orderArray = []
        for (const key in quantitySalesFinished) {
          orderArray.push({ name: key, quantity: quantitySalesFinished[key] })
        }

        if (sort === "end-min-max") {
          orderArray.sort((a, b) => a.quantity - b.quantity)
          orderArray.forEach(g => allGenresOrdered.push(g.name))
          allGenres.forEach(g => {
            if (!allGenresOrdered.includes(g)) {
              allGenresOrdered.unshift(g)
            }
          })
        }
        if (sort === "end-max-min") {
          orderArray.sort((b, a) => a.quantity - b.quantity)
          orderArray.forEach(g => allGenresOrdered.push(g.name))
          allGenres.forEach(g => {
            if (!allGenresOrdered.includes(g)) {
              allGenresOrdered.push(g)
            }
          })
        }
      }
      return allGenresOrdered
    }
    if (sort === "books-min-max" || sort === "books-max-min") {
      let allGenresOrdered = []
      let quantityBooksGenre = {};
      if (allBooks && !allBooks.messageError && allBooks.length) {
        allBooks.forEach(book => {
          book.Genres.forEach(genre => {
            quantityBooksGenre[genre.name] = (quantityBooksGenre[genre.name] || 0) + 1;
          })
        })

        let orderArray = []
        for (const key in quantityBooksGenre) {
          orderArray.push({ name: key, quantity: quantityBooksGenre[key] })
        }

        if (sort === "books-min-max") {
          orderArray.sort((a, b) => a.quantity - b.quantity)
          orderArray.forEach(g => allGenresOrdered.push(g.name))
          allGenres.forEach(g => {
            if (!allGenresOrdered.includes(g)) {
              allGenresOrdered.unshift(g)
            }
          })
        }

        if (sort === "books-max-min") {
          orderArray.sort((b, a) => a.quantity - b.quantity)
          orderArray.forEach(g => allGenresOrdered.push(g.name))
          allGenres.forEach(g => {
            if (!allGenresOrdered.includes(g)) {
              allGenresOrdered.push(g)
            }
          })
        }
      }

      return allGenresOrdered
    }
    // -------------- ORDENAMIENTOS PARA PANEL DE CATEGORÍAS -----------------

    return allGenres;
  } catch (error) {
    return { messageError: "Error" };
  }
}

module.exports = {
  getGenres,
};
