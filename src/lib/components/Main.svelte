<script lang='ts'>
    import {ImagePlus, SendHorizontal,CodeXml,MessageSquare,Lightbulb,Compass, Mic } from 'lucide-svelte';
    import { messages } from "$lib/utils";
    let {prompt,getModelResponse,fetching,resultReady,recentPrompt,modelResponse}:{prompt:string,getModelResponse:(prompt:string)=>void,fetching:boolean,resultReady:boolean,recentPrompt:string,modelResponse:string} = $props()
</script>


{#snippet Card(object)}

<div class=" card h-[200px] p-[15px] border-[10px] border-[#f0f4f9] relative bg-[#f0f4f9] rounded-[20px] cursor-pointer hover:bg-[#dfe4ea] hover:border-[#dfe4ea]" onclick={()=>{getModelResponse(object.prompt)}}>
    <p class=' text-[#585858] font-[17px] '>{object.prompt}</p>
 
      <div class=" w-[35px] p-[5px] absolute bg-white rounded-full bottom-[10px] right-[10px] "> 
        {#if object.category === 'directions'}
         <Compass/>
         {:else if object.category === 'ideas'}
         <Lightbulb/>
         {:else if object.category === 'message'}
        <MessageSquare/>
        {:else}
        <CodeXml/>
    {/if}
    </div>
</div>

{/snippet}

<div class=" main flex-1 min-h-[100vh] relative pb-[15vh] ">
   
    {#if fetching||resultReady}
        <div class=" result py-0 px-[5%] max-h-[70vh] overflow-y-scroll  ">
            <div class=" result-title my-[40px] mx-0 flex items-center gap-[20px]">
                <img class=" w-[40px] rounded-[50%] " src="/profile.jpg" alt="">
                <p>{recentPrompt}</p>
            </div>
            <div class=" result-data flex items-start gap-[20px]">
                <img  class=" w-[40px] rounded-[50%]" src='/geminiLogo.png' alt='' >
                {#if resultReady===true && fetching===false}
                <p class=" text-[17px] font-[300] leading-[1.8]">{@html modelResponse}</p>
                {:else if fetching===true && resultReady === false}
                    <div class=" loader flex flex-col w-full gap-[10px]">
                        <hr class=" rounded-[4px] border-none bg-[#f6f748] bg-gradient-to-r from-[#9ed7ff] via-[#ffffff] to-[#9ed7ff] bg-[-800px_0px] h-[20px]">
                        <hr class=" rounded-[4px] border-none bg-[#f6f748] bg-gradient-to-r from-[#9ed7ff] via-[#ffffff] to-[#9ed7ff] bg-[-800px_0px] h-[20px]">
                        <hr class=" rounded-[4px] border-none bg-[#f6f748] bg-gradient-to-r from-[#9ed7ff] via-[#ffffff] to-[#9ed7ff] bg-[-800px_0px] h-[20px]">
                        
                    </div>
                {/if}
            </div>
        </div>
    {:else}
    <div class="nav flex items-center justify-between text-[22px] p-[20px] text-[#af9b9b]">
        <p>Gemini</p>
        <img class=" w-[40px] rounded-[50%]" src="/profile.jpg" alt="">
    </div>

    <div class=" main-container max-w-[900px] m-auto">
        <div class="greet my-[50px] mx-[0px] text-[56px] text-[#c4c7c5] p-[20px] font-[500] leading-tight">
            <p><span class=" bg-gradient-to-tr from-[#4b90ff] to-[#ff5546] bg-clip-text text-transparent">Hello there </span></p>
            <p>How can I help you today?</p>
        </div>

        <div class="cards grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-[15px] p-[20px]">
            {#each messages as object}
                {@render Card(object)} 
            {/each}
            </div>
        </div>
    {/if}
    

        <div class=" absolute  w-screen flex flex-col items-center bottom-0  py-0  px-[20px] m-auto ">
            <div class="search-box flex items-center justify-between gap-[20px] bg-[#f0f4f9] sm:py-[10px] sm:px-[20px] rounded-[50px] py-[10px] px-[5px] w-full sm:w-[70%] ">
                <input class="  flex-none w-[150px] sm:flex-1 bg-transparent border-none outline-none p-[8px] font-[18px] " type="text"  bind:value={prompt} placeholder=" Enter a prompt here"/>
                <div class=" flex items-center sm:gap-[15px] gap-[5px]">
                    <div class=" sm:w-[24px] w-[20px]"><ImagePlus/></div>
                    <div class=" sm:w-[24px] w-[20px]"><Mic/></div>
                  {#if prompt !== ''}
                  <div class=" w-[24px] cursor-pointer" onclick={()=>getModelResponse(prompt)}><SendHorizontal/></div>
                  {/if}  
                </div>
            </div>
            <p class=" text-[13px] my-[15px] mx-auto text-center font-[300]"> Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps</p>
        </div>
    </div>
