allComments = JSON.parse(prompt("paste comments JSON here: "));

allStudents = new Set(allComments.map(x => x.Name))
console.log(allComments, allStudents)

function getGrade(name) {
  for (let row of allComments) {
    if (name == row['Name']) {
      allStudents.delete(name);
      return row;
    }
  }
  console.warn("Missing student:", name)
  return {"Score": "", "Comments": ""};
}

$('input[name$="-mark"]').each(function(idx) {
  let elt = $(this);
  let container = elt.parents('.que');
  let parent = container.prevAll('h4').first().text();
	let name = /Attempt number \d+ for (.+)$/.exec(parent)[1];
  let grade = getGrade(name);
  elt.val(grade['Score']);
  let editor = container.find('.editor_atto_content');
  if (editor.length != 1) {
    console.warn("Failed to find editor " + name);
  }
  editor.html(grade['comments'])
})

console.log(allStudents)

setTimeout(function() { $('.icon.fa-code').click(); }, 1*1000);
setTimeout(function() { $('.icon.fa-code').click(); }, 5*1000);
