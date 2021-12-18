responses = [];
$('.que').each(function(idx) {
  let container = $(this);
  let parent = container.prevAll('h4').first().text();
	let match = /Attempt number (\d+) for (.+)$/.exec(parent);
  let attempt = +match[1], name = match[2];
  let essay = (
    container.find('textarea.qtype_essay_response').val()
    || container.find('div.qtype_essay_response').text()
    || container.find('.answer input').val()
    );
  responses.push({name, attempt, essay});
});
copy(JSON.stringify(responses))

/*
headerMatch = document.querySelector("[role=main] > h3").textContent.match(/Grading question (\d+): (.+)/);
copy(JSON.stringify({
  questionNum: +headerMatch[1],
  questionTitle: headerMatch[2],
  responses
}))
*/
