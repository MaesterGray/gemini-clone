  const messages =[{
    category:'directions',
    prompt:'Suggest beautiful places to see on an upcoming road trip'
},{
    category:'ideas',
    prompt:'Briefly summarize the concept: urban planning'
},{
    category:'message',
    prompt:'Brainstorm bonding activities for our work retreat'
},{
    category:'programming',
    prompt:'Tell me about React js and React native'
},]

function transformTextToHtml(inputText:string) {
    // Replace text between double asterisks with bold tags
    let transformedText = inputText.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    // Replace newlines with break tags
    transformedText = transformedText.replace(/##(.*?)\n/g, '<b>$1</b><br>');
    transformedText = transformedText.replace(/\n/g, '<br>');
    return transformedText;
  }
  

export {messages,transformTextToHtml}