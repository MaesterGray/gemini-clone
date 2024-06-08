<script lang='ts'>
    import Sidebar from "$lib/components/Sidebar.svelte";
    import Main from "$lib/components/Main.svelte";
	import { json } from "@sveltejs/kit";

    let prompt = $state('')
    let fetching = $state(false)
    let prevPrompts:string[] = $state([])
    let recentPrompt = $state('')
    let modelResponse = $state('')
    let resultReady = $state(false)
    let errorOccured = $state(false)

    function typingEffect(index:number,nextWord:string){
    setTimeout(()=>{
        modelResponse = modelResponse +' '+ nextWord
    },50*index)
}

    $effect(()=>{
        if (resultReady) {
            prompt=''
        }
    })
     const getModelResponse = async (prompt:string)=>{
        modelResponse=''
        fetching = true
        resultReady = false
        recentPrompt=prompt
         prevPrompts.push(recentPrompt)
         
        let request = await fetch('/ai-server',{
            method:'POST',
            body:JSON.stringify(prompt),
            headers:{
		'content-type': 'application/json'

            }
        })
        try {
           
            let response = await request.json()
           let  responseArray = response.result.split(' ')
            fetching = false
            resultReady=true
            
            for (let i = 0; i < responseArray.length; i++) {
                const nextWord =  responseArray[i]   
                    typingEffect(i,nextWord)
        }
        } catch (error) {
            errorOccured = true
            fetching = false
            console.log(error)
        }
    }
</script>


    <main class=" flex min-h-screen ">
    <Sidebar action={getModelResponse} recent={prevPrompts} reset={()=>{ fetching=false;resultReady=false;modelResponse=''}}/>
    <Main getModelResponse={getModelResponse} prompt={prompt} fetching={fetching} resultReady={resultReady} modelResponse={modelResponse} recentPrompt={recentPrompt}/>
    
    
    
</main>
