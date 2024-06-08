function transformTextToHtml(inputText:string) {
  // Replace text between double asterisks with bold tags
  let transformedText = inputText.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  // Replace newlines with break tags
  transformedText = transformedText.replace(/##(.*?)\n/g, '<b>$1</b><br>');
  transformedText = transformedText.replace(/\n/g, '<br>');
  return transformedText;
}



import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai"
  import {SECRET_GEMINI_API_KEY} from '$env/static/private'
import { json } from "@sveltejs/kit";
  const genAI = new GoogleGenerativeAI(SECRET_GEMINI_API_KEY);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro-latest",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];
  
  async function run(prompt:string) {
    const chatSession = model.startChat({
      generationConfig,
      safetySettings,
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage(prompt);
    return (result.response.text());
  }
  
export async function POST({request}){
    let result;
    const prompt = await request.json()
    try{
         result = await run(prompt)
         result = transformTextToHtml(result)
    }catch(err){
      console.log(err)
    return json({staus:'search failed'})

    }
    return json({result},{status:200})
}