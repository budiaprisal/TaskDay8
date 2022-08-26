const { response } = require("express");
const express = require("express");

const app = express();
const port = 8000;

app.set("view engine", "hbs"); //set view engine
app.use("/assets", express.static(__dirname + "/assets")); //patch foldea assets
app.use(express.urlencoded({ extended: false }));

//fungsi menampung data

let isLogin = true;
let dataBlog = [];

app.get("/", function (request, response) {
  let data = dataBlog.map(function (res) {
    return {
      ...res,
      author: "budi aprisal",
      postAt: getFullTime(res.postAt),
      duration1: getDistanceTime(res.postAt),
    };
  });

  response.render("home", { dataBlog: data });
});
app.get("/contact", function (request, response) {
  response.render("contact");
});
//GETTTTTTTT AMBIL DATA
app.get("/add-project", function (request, response) {
  console.log(dataBlog);

  response.render("add-project", { isLogin, dataBlog });
});

//GETTTTTTTT MENAMPILKAN DATA
app.post("/add-project", function (request, response) {
  // console.log(request.body);
  let title = request.body.inputTitle;
  let content = request.body.inputContent;
  let sdate = request.body.StartDate;
  let edate = request.body.EndDate;
  let node = request.body.Nodejs;
  let react = request.body.react;
  let reacteurope = request.body.reacteurope;
  let js = request.body.js;
  let blog = {
    title,
    content,
    sdate,
    edate,
    node,
    react,
    reacteurope,
    js,
    duration: getime(sdate, edate),
    postAt: new Date(),
  };

  dataBlog.push(blog);

  response.redirect("/");
});

app.get("/blog-detail/:id", function (request, response) {
  let id = request.params.id;
  // console.log(id);

  response.render("blog-detail", {
    id,
    title: "selamat datang",
    content: "lorem ipsumasdasdasd",
    author: "budi aprisal",
    postAt: "18 agustus 2022",
  });
});

app.get("/edit-blog/:index", function (request, response) {
  let index = request.params.index;

  let data = {
    title: dataBlog[index].title,
    content: dataBlog[index].content,
  };

  response.render("edit-blog", { index, data });
});

app.post("/edit-blog/:index", function (request, response) {
  let index = request.params.index;

  dataBlog[index].title = request.body.inputTitle;
  dataBlog[index].content = request.body.inputContent;

  response.redirect("/");
});

app.get("/delete-blog/:index", function (request, response) {
  // console.log(request.params);
  let index = request.params.index;
  console.log(index);
  dataBlog.splice(index, 1);

  response.redirect("/");
});

app.listen(port, function () {
  console.log("server running on port ${port}");
});

function getime(start, end) {
  let sdate = new Date(start);
  let esdate = new Date(end);
  let time = Math.abs(esdate - sdate);
  let days = Math.floor(time / (1000 * 60 * 60 * 24));
  return `${days} hari`;
}

function getFullTime(time) {
  let month = ["Januari", "Febuari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"];

  let date = time.getDate();
  let monthIndex = time.getMonth();
  let year = time.getFullYear();

  let hours = time.getHours();
  let minutes = time.getMinutes();

  if (hours < 10) {
    hours = "0" + hours;
  } else if (minutes < 10) {
    minutes = "0" + minutes;
  }

  // 12 Agustus 2022 09.04
  let fullTime = `${date} ${month[monthIndex]} ${year} ${hours}:${minutes} WIB`;
  // console.log(fullTime);
  return fullTime;
}

function getDistanceTime(time) {
  let timeNow = new Date();
  let timePost = time;

  let distance = timeNow - timePost;
  // console.log(distance);

  let milisecond = 1000; // 1 detik 1000 milisecond
  let secondInHours = 3600; // 1 jam sama dengan 3600 detik
  let hoursInDay = 24; // 1 hari 24 jam

  let distanceDay = Math.floor(distance / (milisecond * secondInHours * hoursInDay));
  let distanceHours = Math.floor(distance / (milisecond * 60 * 60));
  let distanceMinutes = Math.floor(distance / (milisecond * 60));
  let distanceSeconds = Math.floor(distance / milisecond);

  if (distanceDay > 0) {
    return `${distanceDay} day ago`;
  } else if (distanceHours > 0) {
    return `${distanceHours} hours ago`;
  } else if (distanceMinutes > 0) {
    return `${distanceMinutes} minutes ago`;
  } else {
    return `${distanceSeconds} seconds ago`;
  }
}
