let userId = 1;

$(function () {
  fetchPageData(userId);

  $('button:contains("Previous User")').on("click", () => {
    userId--;
    refetchPageData(userId);
  });

  $('button:contains("Next User")').on("click", () => {
    userId++;
    refetchPageData(userId);
  });

  $(".posts")
    .children("h3")
    .on("click", () => {
      $(".posts").children("ul").slideToggle();
    });

  $(".todos")
    .children("h3")
    .on("click", () => {
      $(".todos").children("ul").slideToggle();
    });
});

function fetchPageData(userId) {
  $.ajax({
    url: `https://dummyjson.com/users/${userId}`,
    success: (result) => {
      // User Info
      $("img").attr("src", result.image);
      $(".info__content").append(
        `<h1>${result.firstName + result.lastName}<h1/>`,
        `<p><span>Age: </span>${result.age}<p/>`,
        `<p><span>Email: </span>${result.email}<p/>`,
        `<p><span>Phone: </span>${result.phone}<p/>`
      );
      $(".posts").children("h3")[0].innerText = `${result.firstName}'s Posts`;
      $(".todos").children("h3")[0].innerText = `${result.firstName}'s To Dos`;
    },
  });

  // User Posts
  $.ajax({
    url: `https://dummyjson.com/users/${userId}/posts`,
    success: (result) => {
      const ul = $(".posts").children("ul");
      result.posts.forEach((post) => {
        ul.append(
          `<li>
            <h4>${post.title}</h4>
            <p>${post.body}</p>
            <span>${post.views}</span>
          </li>`
        );
      });
      $(".posts").on("click", "h4", function () {
        $("body").append(`
          <div class="overlay">
            <div class="modal">
            <h4>${$(this).text()}</h4>
            <p>${$(this).next().text()}</p>
            <p>Views: ${$(this).next().next().text()}</p>
            <button>Close Modal</button>
            </div>
          </div>`);
      });
      $("body").on("click", "button", function () {
        $(".overlay").remove();
      });
    },
  });

  // User Todos
  $.ajax({
    url: `https://dummyjson.com/users/${userId}/todos`,
    success: (result) => {
      const ul = $(".todos").children("ul")[0];
      result.todos.forEach(({ todo }) => {
        ul.innerHTML += `<li><h4>${todo}</h4></li>`;
      });
    },
  });
}

function refetchPageData(userId) {
  $(".info__content").empty();
  $(".posts").children("ul")[0].innerHTML = "";
  $(".todos").children("ul")[0].innerHTML = "";
  fetchPageData(userId);
}
