// JavaScript code to fetch and render Markdown content
fetch('quiz.md')
  .then(response => response.text())
  .then(markdown => {
    const markdownContent = marked(markdown);
    document.getElementById('markdown-content').innerHTML = markdownContent;
  });
