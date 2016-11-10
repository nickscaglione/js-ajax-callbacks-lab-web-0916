function handlebarsSetup() {
  //put any handlebars setup in here
  Handlebars.registerPartial("userDetails", $("#user-details-partial").html())
  Handlebars.registerPartial("commits", $("#commits-partial").html())

}

$(document).ready(function (){
  handlebarsSetup()
});


function searchRepositories() {

  let searchTerms = $('input#searchTerms').val()

  $.get( "https://api.github.com/search/repositories", { q: searchTerms })
  .done(function(data) {
    showRepositories(data)
  })

}

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function showRepositories(data) {
  let repos = data.items
  let src = document.getElementById("user-details-partial").innerHTML
  let template = Handlebars.compile(src)
  let repoList = template(repos)

  document.getElementById("results").innerHTML = repoList
}

function showCommits(url) {
  $.get(`${url}/commits`)
  .done(function(commits) {

    let src = document.getElementById("commits-partial").innerHTML
    let template = Handlebars.compile(src)
    let commitsList = template(commits)

    document.getElementById("details").innerHTML = commitsList
  })
}
